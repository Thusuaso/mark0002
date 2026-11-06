<template>
  <Dialog
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    header="Divide"
    modal
    :style="{ width: '95%' }"
    :breakpoints="{ '1199px': '95vw', '575px': '98vw' }"
  >
    <!--
      PO ONIZLEMESI: numaralari sunucu uretiyor (GET .../po-preview/:po).
      Istemci artik hic numara hesaplamiyor -- gerekcesi <script>'te.
    -->
    <div class="row mb-3">
      <div class="col">
        <div class="p-3 border-round surface-100">
          <span class="font-bold">{{ productionModel.SiparisNo }}</span>
          <span class="mx-2">&rarr;</span>
          <Tag severity="success" :value="poPreview.giden || '...'" class="mr-2" />
          <span class="mr-2">(gönderilen)</span>
          <Tag severity="warn" :value="poPreview.kalan || '...'" class="mr-2" />
          <span>(kalan)</span>
        </div>
      </div>
    </div>

    <h3 class="text-center m-auto">Products</h3>

    <div class="row mb-3">
      <div class="col">
        <Select
          v-model="selectedProduct"
          :options="orderStore.getOrderProductionDivideList"
          optionLabel="Urun"
          placeholder="Select a Product"
          @change="changeSelectedProduct($event)"
        />
      </div>
    </div>

    <div class="row" v-if="selectedProduct">
      <div class="col">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Supplier</th>
              <th scope="col">Category</th>
              <th scope="col">Product</th>
              <th scope="col">Surface</th>
              <th scope="col">Width</th>
              <th scope="col">Height</th>
              <th scope="col">Thickness</th>
              <th scope="col">Unit</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{{ selectedProduct.FirmaAdi }}</th>
              <td>{{ selectedProduct.KategoriAdi }}</td>
              <td>{{ selectedProduct.UrunAdi }}</td>
              <td>{{ selectedProduct.YuzeyIslemAdi }}</td>
              <td>{{ selectedProduct.En }}</td>
              <td>{{ selectedProduct.Boy }}</td>
              <td>{{ selectedProduct.Kenar }}</td>
              <td>{{ selectedProduct.BirimAdi }}</td>
              <td>{{ formatDecimal(selectedProduct.Miktar) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="row" v-if="selectedProduct">
      <div class="col">
        <CustomInput
          :value="productRow.gonderilen"
          text="Outgoing"
          @onInput="setGonderilen($event)"
        />
      </div>
      <div class="col">
        <CustomInput
          :value="productRow.kalan"
          text="Remainder"
          @onInput="setKalan($event)"
        />
      </div>
      <div class="col flex align-items-center">
        <!--
          Miktarin korundugunu ANINDA gosterir. Nuxt 2'de tek geri bildirim,
          "fazla" girildiginde cikan alert()'ti; EKSIK girilince hicbir sey
          soylenmiyordu (bkz. <script>).
        -->
        <Tag v-if="productRowBalanced" severity="success" value="✓ miktar tam" />
        <Tag
          v-else
          severity="danger"
          :value="`fark: ${formatDecimal(productRowDifference)}`"
        />
      </div>
    </div>

    <div class="row mt-2" v-if="selectedProduct">
      <div class="col">
        <Button
          type="button"
          severity="success"
          class="w-100"
          :label="editingExistingRow ? 'Update' : 'Add'"
          :disabled="!productRowBalanced"
          @click="saveProductRow"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          severity="secondary"
          class="w-100"
          label="Clear"
          @click="clearProductRow"
        />
      </div>
    </div>

    <div class="row mt-3">
      <div class="col">
        <DataTable
          :value="divideRows"
          responsiveLayout="scroll"
          v-model:selection="selectedDivideRow"
          selectionMode="single"
          @row-click="divideRowSelected($event)"
        >
          <Column field="urunAdi" header="Product"></Column>
          <Column field="musteriAciklama" header="Desc."></Column>
          <Column field="urunBirimId" header="Unit">
            <template #body="slotProps">
              {{ unitLabel(slotProps.data.urunBirimId) }}
            </template>
          </Column>
          <Column field="miktar" header="Total">
            <template #body="slotProps">
              {{ formatDecimal(slotProps.data.miktar) }}
            </template>
          </Column>
          <Column field="gonderilen" header="Outgoing">
            <template #body="slotProps">
              {{ formatDecimal(slotProps.data.gonderilen) }}
            </template>
          </Column>
          <Column field="kalan" header="Remainder">
            <template #body="slotProps">
              {{ formatDecimal(slotProps.data.kalan) }}
            </template>
          </Column>
          <Column header="">
            <template #body="slotProps">
              <Button
                type="button"
                severity="danger"
                text
                label="Remove"
                @click="removeProductRow(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <!--
      Listeye hic girmeyen urunler: sunucu bunlari KALAN siparise tasiyor.
      Nuxt 2'de bu urunler hicbir yerde gorunmuyordu ve silinen PO'da
      asili kaliyordu (bkz. api/index.js, divide ucu, not [8]).
    -->
    <div class="row mt-2" v-if="untouchedProducts.length">
      <div class="col">
        <Message severity="info" :closable="false">
          Listeye eklenmeyen {{ untouchedProducts.length }} ürün tamamen
          <b>{{ poPreview.kalan || "kalan" }}</b> siparişine taşınacak:
          {{ untouchedProducts.map((x) => x.Urun).join(", ") }}
        </Message>
      </div>
    </div>

    <hr />
    <h3 class="text-center m-auto">Order</h3>

    <!--
      BEDELLER: Nuxt 2'de 9 alan icin 18 ayri CustomInput ve ustune iki
      ayri ozet tablosu ELLE yazilmisti (~200 satir sablon). Tek tablodan
      uretiliyor; yeni bir bedel alani eklemek icin tek satir yetiyor ve
      alanin ozet/denge kontrolune girmesi unutulamiyor.
    -->
    <div class="row" v-for="field in MONEY_FIELDS" :key="field.source">
      <div class="col-12 col-md-3 flex align-items-center">
        <span class="font-bold">{{ field.label }}</span>
        <span class="ml-2">{{ formatPriceUsd(originalAmount(field)) }}</span>
      </div>
      <div class="col">
        <CustomInput
          :value="shares[field.giden]"
          text="Outgoing"
          @onInput="setShare(field, 'giden', $event)"
        />
      </div>
      <div class="col">
        <CustomInput
          :value="shares[field.kalan]"
          text="Remainder"
          @onInput="setShare(field, 'kalan', $event)"
        />
      </div>
      <div class="col-12 col-md-2 flex align-items-center">
        <Tag
          v-if="amountBalanced(field)"
          severity="success"
          value="✓"
        />
        <Tag
          v-else
          severity="danger"
          :value="`fark: ${formatPriceUsd(amountDifference(field))}`"
        />
      </div>
    </div>

    <br />

    <div class="row" v-if="!allBalanced">
      <div class="col">
        <Message severity="warn" :closable="false">
          Bölme için her satırın gönderilen + kalan toplamı orijinal değere
          eşit olmalı. Dengelenmeyen satırlar kırmızı işaretli.
        </Message>
      </div>
    </div>

    <!--
      HATA BLOGU: sunucu hatayi hangi ASAMADA oldugunu soyleyerek donuyor
      (urun tasima asamasinda hangi SATIR ve hangi URUN oldugu dahil).
      Burada kalici olarak gosteriliyor -- toast 3 saniyede kaybolup
      kullaniciya "Bölme başarısız"dan baska bir sey birakmiyordu.
    -->
    <div class="row" v-if="failure">
      <div class="col">
        <Message severity="error" :closable="false">
          <div v-if="failure.step">
            <b>Hata adımı:</b> {{ failure.step }}
          </div>
          <div v-if="failure.satir">
            <b>Satır:</b> {{ failure.satir }}
            <span v-if="failure.urun">&mdash; {{ failure.urun }}</span>
          </div>
          <div>{{ failure.message }}</div>
          <div v-if="failure.geriAlindi" class="mt-2">
            İşlem geri alındı: veritabanında <b>hiçbir değişiklik olmadı</b>,
            sipariş bölünmemiş durumda. Düzeltip yeniden deneyebilirsiniz.
          </div>
        </Message>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <Button
          type="button"
          severity="success"
          class="w-100"
          label="Divide"
          :loading="saving"
          :disabled="!allBalanced || saving"
          @click="divideProduct"
        />
      </div>
    </div>
  </Dialog>
</template>

<script>
import { useOrderStore } from "~/stores/order"
import { toIsoDate } from "~/utils/dates"

/*
 * Paylastirilan bedeller: tek tanim, hem sablon hem denge kontrolu hem de
 * sunucuya giden govde buradan uretiliyor.
 *
 * `source` SiparislerTB kolonundan gelen ORIJINAL deger (productionModel),
 * `giden` / `kalan` ise sunucuya gonderilen pay alanlarinin adi.
 *
 * MalBedeli LISTEYE YENI EKLENDI: modelde kalanMalBedeli/gidenMalBedeli
 * alanlari zaten vardi ama ekranda karsiligi YOKTU ve sunucuya hic
 * gitmiyordu -- MalBedeli kolonuna bunun yerine siparisin ID'si
 * yaziliyordu (ayrinti: api/index.js divide ucu, not [5]).
 */
const MONEY_FIELDS = [
  { label: "Prepayment", source: "Pesinat", giden: "gidenPesinat", kalan: "kalanPesinat" },
  { label: "Goods Amount", source: "MalBedeli", giden: "gidenMalBedeli", kalan: "kalanMalBedeli" },
  { label: "Freight Selling", source: "NavlunSatis", giden: "gidenNavlunSatis", kalan: "kalanNavlunSatis" },
  { label: "Freight Buying", source: "NavlunAlis", giden: "gidenNavlunAlis", kalan: "kalanNavlunAlis" },
  { label: "Detail 1 Selling", source: "DetayTutar_1", giden: "gidenDetaySatis_1", kalan: "kalanDetaySatis_1" },
  { label: "Detail 1 Buying", source: "DetayAlis_1", giden: "gidenDetayAlis_1", kalan: "kalanDetayAlis_1" },
  { label: "Detail 2 Selling", source: "DetayTutar_2", giden: "gidenDetaySatis_2", kalan: "kalanDetaySatis_2" },
  { label: "Detail 2 Buying", source: "DetayAlis_2", giden: "gidenDetayAlis_2", kalan: "kalanDetayAlis_2" },
  { label: "Detail 3 Selling", source: "DetayTutar_3", giden: "gidenDetaySatis_3", kalan: "kalanDetaySatis_3" },
  { label: "Detail 3 Buying", source: "DetayAlis_3", giden: "gidenDetayAlis_3", kalan: "kalanDetayAlis_3" },
]

/* Kurus artiklarini dengesizlik saymamak icin esik. */
const EPSILON = 0.001

const UNIT_LABELS = { 1: "sqm", 2: "pcs", 3: "mt" }

const emptyProductRow = () => ({
  id: 0,
  urunAdi: "",
  siparisno: "",
  tedarikciId: 0,
  urunKartId: 0,
  urunBirimId: 0,
  miktar: 0,
  gonderilen: 0,
  kalan: 0,
  satisFiyat: 0,
  alisFiyati: 0,
  uretimAciklama: "",
  musteriAciklama: "",
  siraNo: 0,
  ton: 0,
  adet: 0,
})

/*
 * useApi() BIR $fetch ORNEGI -- `.get` / `.post` / `.delete` METOTLARI YOK.
 *
 * useApi() govdesi `return $fetch.create({...})` (app/composables/useApi.ts).
 * $fetch.create CAGRILABILIR bir fonksiyon dondurur; axios gibi metot
 * tasiyan bir nesne DEGIL. Bu yuzden `useApi().get(url)` cagrisi
 *     TypeError: (intermediate value)().get is not a function
 * firlatiyordu -- sayfa acilisinda, mounted() icinde.
 *
 * Dogru kullanim:
 *     useApi()(url)                               // GET
 *     useApi()(url, { method: "POST", body })     // POST
 *     useApi()(url, { method: "DELETE" })         // DELETE
 *
 * Yanit sekli DEGISMIYOR: $fetch govdeyi dogrudan donduruyor, yani
 * cagri yerlerindeki `res.list` / `res.status` okumalari aynen gecerli.
 * (useLegacyApi() ise axios'u taklit edip `{ data, status }` sariyor --
 * bu sayfalar o sarmalayiciyi beklemiyor, dolayisiyla ona cevirmek
 * `res.list` okumalarini bozardi.)
 */
export default {
  props: {
    visible: { type: Boolean, required: true },
    productionModel: { type: Object, required: true },
  },

  emits: ["update:visible", "divided"],

  data() {
    return {
      MONEY_FIELDS,
      selectedProduct: null,
      selectedDivideRow: null,
      productRow: emptyProductRow(),
      editingExistingRow: false,
      divideRows: [],
      shares: {},
      poPreview: { giden: "", kalan: "" },
      saving: false,
      failure: null,
    }
  },

  computed: {
    orderStore() {
      return useOrderStore()
    },

    productRowDifference() {
      return (
        Number(this.productRow.gonderilen) +
        Number(this.productRow.kalan) -
        Number(this.productRow.miktar)
      )
    },

    productRowBalanced() {
      return Math.abs(this.productRowDifference) < EPSILON
    },

    /*
     * Listeye hic eklenmemis urunler. Sunucu bunlari kalan siparise
     * tasiyor; burada yalnizca kullaniciya GOSTERILIYOR.
     */
    untouchedProducts() {
      const handled = new Set(this.divideRows.map((row) => row.id))
      return this.orderStore.getOrderProductionDivideList.filter(
        (product) => !handled.has(product.UrunId)
      )
    },

    allBalanced() {
      const everyAmount = MONEY_FIELDS.every((field) => this.amountBalanced(field))
      const everyRow = this.divideRows.every(
        (row) =>
          Math.abs(
            Number(row.gonderilen) + Number(row.kalan) - Number(row.miktar)
          ) < EPSILON
      )
      return everyAmount && everyRow
    },
  },

  watch: {
    /*
     * Diyalog her acilista sifirlanir. Nuxt 2'de bolme modeli SAYFA
     * duzeyinde (Vuex) tutuldugu icin bir onceki bolmeden kalan degerler
     * bir sonraki diyalogda duruyordu.
     */
    visible(isOpen) {
      if (isOpen) this.reset()
    },
  },

  methods: {
    unitLabel(id) {
      return UNIT_LABELS[id] || ""
    },

    originalAmount(field) {
      return Number(this.productionModel[field.source]) || 0
    },

    amountDifference(field) {
      return (
        Number(this.shares[field.giden] || 0) +
        Number(this.shares[field.kalan] || 0) -
        this.originalAmount(field)
      )
    },

    amountBalanced(field) {
      return Math.abs(this.amountDifference(field)) < EPSILON
    },

    /*
     * Bir paya deger girildiginde KARSI PAY otomatik tamamlanir
     * (orijinal - girilen). Kullanici isterse onu da elle degistirebilir;
     * denge gostergesi her durumda gercegi soyler.
     */
    setShare(field, side, value) {
      const other = side === "giden" ? field.kalan : field.giden
      const key = side === "giden" ? field.giden : field.kalan

      this.shares[key] = value
      this.shares[other] = Number(
        (this.originalAmount(field) - value).toFixed(2)
      )
    },

    setGonderilen(value) {
      this.productRow.gonderilen = value
      this.productRow.kalan = Number(
        (Number(this.productRow.miktar) - value).toFixed(4)
      )
    },

    setKalan(value) {
      this.productRow.kalan = value
      this.productRow.gonderilen = Number(
        (Number(this.productRow.miktar) - value).toFixed(4)
      )
    },

    reset() {
      this.selectedProduct = null
      this.selectedDivideRow = null
      this.productRow = emptyProductRow()
      this.editingExistingRow = false
      this.divideRows = []
      this.saving = false
      this.failure = null

      /*
       * Paylar sifirdan baslamaz: TAMAMI GIDEN tarafa yazilir. Bolmelerin
       * buyuk cogunlugu bedelleri oldugu gibi giden siparise birakiyor;
       * boylece kullanici yalnizca degistirmek istedigi satira dokunuyor
       * ve 20 alanin hepsini elle doldurmak zorunda kalmiyor. Her alan
       * basta DENGEDE oldugu icin "Divide" dugmesi de aninda aktif.
       */
      const shares = {}
      for (const field of MONEY_FIELDS) {
        shares[field.giden] = this.originalAmount(field)
        shares[field.kalan] = 0
      }
      this.shares = shares

      this.loadPoPreview()
      this.loadProducts()
    },

    loadPoPreview() {
      this.poPreview = { giden: "", kalan: "" }

      useApi()(`/order/divide/po-preview/${this.productionModel.SiparisNo}`)
        .then((res) => {
          if (res.status) {
            this.poPreview = { giden: res.giden, kalan: res.kalan }
          } else {
            useAppToast().error("PO numarası hesaplanamadı.")
          }
        })
        .catch((err) => {
          console.error("po-preview basarisiz:", err)
          useAppToast().error("PO numarası hesaplanamadı.")
        })
    },

    loadProducts() {
      this.orderStore.setOrdersProductsDivideList(this.productionModel.SiparisNo)
    },

    changeSelectedProduct(event) {
      const product = event.value

      this.editingExistingRow = this.divideRows.some(
        (row) => row.id === product.UrunId
      )

      const existing = this.divideRows.find((row) => row.id === product.UrunId)

      if (existing) {
        /* Zaten eklenmis urun yeniden secildi -> mevcut satir duzenleniyor. */
        this.productRow = { ...existing }
        return
      }

      this.productRow = {
        id: product.UrunId,
        urunAdi: product.Urun,
        siparisno: product.SiparisNo,
        tedarikciId: product.TedarikciID,
        urunKartId: product.UrunKartID,
        urunBirimId: product.UrunBirimID,
        miktar: Number(product.Miktar) || 0,

        /*
         * Varsayilan: TAMAMI GIDIYOR. Nuxt 2'de ikisi de 0 basliyordu ve
         * 0+0, miktara esit olmadigi icin satir en basta GECERSIZDI.
         */
        gonderilen: Number(product.Miktar) || 0,
        kalan: 0,

        satisFiyat: Number(product.SatisFiyati) || 0,
        alisFiyati: Number(product.AlisFiyati) || 0,
        uretimAciklama: product.UretimAciklama,
        musteriAciklama: product.MusteriAciklama,
        siraNo: product.SiraNo,
        ton: product.Ton,
        adet: product.Adet,
      }
    },

    /*
     * Ekle ve Guncelle ayni islem: ayni urun icin ikinci bir satir
     * OLUSMAZ, var olan satir degisir.
     *
     * Nuxt 2'de "Add" kosulsuz push ediyordu -- ayni urun iki kez
     * eklenince sunucu onu iki kez bolmeye calisiyordu. "Update" ise
     * findIndex ile ariyor, bulamazsa (-1) splice(-1, 1, ...) yaparak
     * LISTENIN SON SATIRINI, yani BASKA BIR URUNU eziyordu.
     */
    saveProductRow() {
      if (!this.productRowBalanced) return

      const row = { ...this.productRow }
      const index = this.divideRows.findIndex((item) => item.id === row.id)

      if (index === -1) {
        this.divideRows.push(row)
      } else {
        this.divideRows.splice(index, 1, row)
      }

      this.clearProductRow()
    },

    clearProductRow() {
      this.selectedProduct = null
      this.selectedDivideRow = null
      this.productRow = emptyProductRow()
      this.editingExistingRow = false
    },

    removeProductRow(row) {
      const index = this.divideRows.findIndex((item) => item.id === row.id)
      if (index !== -1) this.divideRows.splice(index, 1)
      this.clearProductRow()
    },

    divideRowSelected(event) {
      /*
       * Satira tiklayinca duzenlemeye alinir. Nuxt 2'de bu islem
       * giden_po / kalan_po alanlarini KOPYALAMIYORDU; ardindan "Update"
       * basilinca o satir bos PO ile kaydediliyor ve urun HICBIR
       * siparise bagli olmayacak sekilde yaziliyordu. PO artik satirda
       * hic tutulmuyor (sunucu uretiyor), yani bu hata yapisal olarak
       * imkansiz.
       */
      this.productRow = { ...event.data }
      this.editingExistingRow = true

      this.selectedProduct =
        this.orderStore.getOrderProductionDivideList.find(
          (product) => product.UrunId === event.data.id
        ) || null
    },

    /*
     * Hatayi EKRANDA BIRAKIR. Toast 3 saniyede kayboluyor ve "hangi
     * asamada, hangi satirda" bilgisi okunmadan gidiyordu; diyalog da
     * acik kaldigi icin kullanici neyi duzeltecegini goremiyordu.
     * Mesaj, kullanici degeri degistirene veya yeniden denemeye basana
     * kadar duruyor.
     */
    showFailure(res) {
      this.failure = {
        step: (res && res.step) || "",
        satir: res && res.satir,
        urun: res && res.urun,
        message: (res && res.message) || "Bölme başarısız.",
        geriAlindi: !res || res.geriAlindi !== false,
      }

      useAppToast().error(this.failure.message)
    },

    divideProduct() {
      if (!this.allBalanced) return

      this.saving = true
      this.failure = null

      const model = this.productionModel

      const order = {
        /*
         * siparisno_giden / siparisno_kalan ARTIK GONDERILMIYOR: numarayi
         * sunucu uretiyor. Nuxt 2'de ayni ek hesabi UC AYRI YERDE elle
         * tekrarlaniyordu (siparis icin divideProduct()'ta, urun icin
         * changeSelectedProduct()'ta, ayrica waiting.vue'da ikisinin
         * kopyasi) ve hesap "bulundugun ek + 1" oldugu icin ayni numarayi
         * ikinci kez uretebiliyordu. Ayrinti: api/index.js divide ucu,
         * not [7].
         */
        siparisno: model.SiparisNo,
        siparisTarihi: toIsoDate(model.SiparisTarihi),
        odemeTurId: model.OdemeTurID,
        teslimTurId: model.TeslimTurID,
        musteriId: model.MusteriID,
        navlunFirma: model.NavlunFirma,
        /*
         * SAAT DAHIL: KayitTarihi bir datetime kolonu. toIsoDate() yalnizca
         * gun verir ("2026-10-08") ve kayit saati sifirlanirdi. Nuxt 2 de
         * burada Date nesnesi gonderip tam ISO damgasini yaziyordu.
         */
        kayitTarihi: new Date().toISOString(),
        kullaniciId: useCookie("userId").value,
        siparisDurumId: model.SiparisDurumID,
        uretimAciklama: model.UretimAciklama,
        sevkiyatAciklama: model.SevkiyatAciklama,
        finansAciklama: model.FinansAciklama,
        odemeAciklama: model.OdemeAciklama,
        TahminiYuklemeTarihi: toIsoDate(model.TahminiYuklemeTarihi),
        vade: model.Vade ? toIsoDate(model.Vade) : "",
        ulke: model.UlkeAdi,
        komisyon: model.Komisyon,
        detayAciklama_1: model.DetayAciklama_1,
        detayMekmarNot_1: model.DetayMekmarNot_1,
        detayAciklama_2: model.DetayAciklama_2,
        detayMekmarNot_2: model.DetayMekmarNot_2,
        detayAciklama_3: model.DetayAciklama_3,
        detayMekmarNot_3: model.DetayMekmarNot_3,
        siparisSahibi: model.SiparisSahibi,
        evrakGideri: model.EvrakGideri,
        konteynerAyrinti: model.KonteynerAyrinti,
        ulkeId: model.UlkeId,
        faturaKesimTurId: model.FaturaKesimTurID,
        depo_yukleme: model.depo_yukleme,
        operasyon: model.Operasyon,
        finansman: model.Finansman,
        iade: model.Iade,
        sigortaTutar: model.sigorta_Tutar,
        sigortaTutarSatis: model.sigorta_tutar_satis,

        ...this.shares,
      }

      this.orderStore
        .setDivide({ order, product: this.divideRows })
        .then((res) => {
          this.saving = false

          if (!res || !res.status) {
            this.showFailure(res)
            return
          }

          useAppToast().success(
            `Bölündü: ${res.siparisno_giden} (gönderilen) + ${res.siparisno_kalan} (kalan)`
          )

          if (res.kalanaTasinanListeDisiUrun > 0) {
            useAppToast().warn(
              `${res.kalanaTasinanListeDisiUrun} ürün listede yoktu, tamamı ${res.siparisno_kalan} siparişine taşındı.`
            )
          }

          this.$emit("update:visible", false)
          this.$emit("divided", res)
        })
        .catch((err) => {
          this.saving = false

          /*
           * $fetch 2xx olmayan yanitta FIRLATIR; sunucunun govdesi
           * err.data icinde kaliyor. Govde varsa (400 -> dogrulama hatasi)
           * asamayi oradan okuyoruz; yoksa gercek bir ag/yetki hatasi var.
           */
          console.error("divide basarisiz:", err)

          if (err && err.data && (err.data.message || err.data.step)) {
            this.showFailure(err.data)
            return
          }

          const kod = (err && err.statusCode) || 0
          this.failure = {
            step: "sunucuya ulasma",
            message:
              kod === 403
                ? "İstek pilotun salt-okunur kilidi tarafından durduruldu (403). " +
                  "Bölme veritabanına yazdığı için kilit açılmadan çalışmaz."
                : `Sunucuya ulaşılamadı${kod ? ` (HTTP ${kod})` : ""}: ${
                    (err && err.message) || "bilinmeyen hata"
                  }`,
            geriAlindi: true,
          }
          useAppToast().error(this.failure.message)
        })
    },
  },
}
</script>

<!--
  app/components/order/DivideDialog.vue  -- YENI DOSYA

  NEDEN VAR: bolme diyalogu orders/production.vue ve orders/waiting.vue
  icinde BIREBIR IKI KOPYA halinde duruyordu (sablon ~360 satir, metotlar
  ~210 satir; ikisi arasindaki tek fark yorum satirlariydi -- diff ile
  dogrulandi). Iki kopya bagimsiz degisebildigi icin bir tarafta
  duzeltilen hata digerinde kaliyordu. Artik tek yer.

  BU DOSYADA KAPATILAN HATALAR (hepsi Nuxt 2'den devralinmisti):

  [1] PO numarasini istemci hesapliyordu, UC AYRI KOPYADA ve
      "bulundugun ek + 1" kuraliyla -- ikinci bolmede VAR OLAN bir
      numarayi yeniden uretiyordu. Numara artik yalnizca sunucuda,
      "tum parcalarin en buyugu + 1" olarak uretiliyor ve diyalogda
      yazmadan once gosteriliyor.

  [2] divideOrderSelected() satiri duzenlemeye alirken giden_po/kalan_po
      alanlarini kopyalamiyordu; "Update" sonrasi urun BOS PO ile
      kaydediliyordu. PO artik satirda hic tutulmuyor.

  [3] "Update" findIndex ile satiri bulamazsa splice(-1, 1, row) ile
      LISTENIN SON SATIRINI eziyordu (baska bir urunu). Ekle/Guncelle
      tek yola indirildi, -1 durumu ayrica ele aliniyor.

  [4] "Add" kosulsuz push ediyordu -> ayni urun iki kez eklenebiliyordu.
      Artik ayni urun icin ikinci satir olusmuyor.

  [5] kalanToplam / gidenToplam YALNIZCA urun secilirken, o anda 0 olan
      miktarlarla hesaplaniyordu ve kullanici miktari yazdiktan sonra bir
      daha HESAPLANMIYORDU -- SatisToplam veritabanina 0 olarak gidiyordu.
      Toplam artik istemcide hic tasinmiyor: sunucu miktar * satisFiyat
      olarak kendisi hesapliyor.

  [6] kullaniciId = event.value.MusteriAciklama  (kopyala-yapistir hatasi)
      -- kullanici kimligi alanina musteri aciklamasi METNI yaziliyordu.
      Artik useCookie("userId").

  [7] malBedeli = productionModel.SiparisId -- para kolonuna siparis ID'si.
      MalBedeli artik digerleri gibi paylastirilan bir bedel
      ("Goods Amount" satiri).

  [8] Miktar dogrulamasi yalnizca "fazla" durumuna bakiyordu
      (kalan + gonderilen > miktar -> alert). EKSIK girilince uyari yoktu
      ve urun miktarinin bir kismi sessizce kayboluyordu. Artik tam
      esitlik sart; fark ekranda surekli gorunuyor ve dengelenmeden
      "Divide" dugmesi acilmiyor.

  [9] Bedeller icin 20 alanin hepsi elle doldurulmak zorundaydi ve 0
      baslangici dengeyi bozuyordu. Artik tamami giden tarafa onceden
      yazili; bir paya deger girilince karsi pay otomatik tamamlaniyor.

  [10] Diyalog kapanip yeniden acildiginda onceki bolmenin degerleri
      (Vuex'te sayfa duzeyinde tutuldugu icin) duruyordu. Durum artik
      bilesene ait ve her acilista sifirlaniyor.

  SABLONDA: 9 bedel alani icin 18 CustomInput + iki ozet tablosu
  (~200 satir) MONEY_FIELDS tablosundan uretilen tek v-for'a indi.
-->
