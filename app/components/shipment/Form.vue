<template>
  <div>
    <div class="row mb-4">
      <div class="col">
        <FloatLabel>
          <AutoComplete
            v-model="selectedOrder"
            inputId="order"
            :suggestions="filteredOrders"
            optionLabel="SiparisNo"
            @complete="searchOrders($event)"
            @item-select="ordersSelected($event.value.SiparisNo)"
          />
          <label for="order">Orders</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <DatePicker
            v-model="forwardingDate"
            inputId="forwardingdate"
            dateFormat="dd/mm/yy"
          />
          <label for="forwardingdate">Shipment Date</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <InputText id="invoice" v-model="invoice" />
          <label for="invoice">Invoice No</label>
        </FloatLabel>
      </div>
      <div class="col">
        <div class="flex align-items-center">
          <Checkbox class="me-1" inputId="follow" v-model="follow" binary />
          <label for="follow"> Track </label>
        </div>
      </div>
      <div class="col">
        <div class="flex align-items-center">
          <RadioButton
            inputId="shipNormal"
            v-model="forwardingstatus"
            name="forwardingstatus"
            value="normal"
          />
          <label for="shipNormal" class="ml-2">Regular Shipment</label>
        </div>
        <div class="flex align-items-center">
          <RadioButton
            inputId="shipFast"
            v-model="forwardingstatus"
            name="forwardingstatus"
            value="fast"
          />
          <label for="shipFast" class="ml-2">Fast Shipment</label>
        </div>
      </div>
    </div>

    <!--
      Secili siparis icin eksik zorunlu evrak uyarisi. v-if ZORUNLU:
      selectedOrder baslangicta null ve panel prop'u String bekliyor.
    -->
    <div class="row mb-4" v-if="selectedOrder">
      <div class="col">
        <uploadMissingPanel :po="selectedOrder.SiparisNo" />
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-3">
        <Select
          v-model="selectedProduct"
          :options="sharedStore.getOrderProductionProductNormalList"
          optionLabel="Aciklama"
          placeholder="Select a Product"
          class="w-100"
          @change="productSelected($event)"
        />
      </div>
      <div class="col-3">
        <FloatLabel>
          <InputText
            id="orderamount"
            :value="shipmentStore.getShipmentAmount.order"
            disabled
          />
          <label for="orderamount">Order</label>
        </FloatLabel>
      </div>
      <div class="col-3">
        <FloatLabel>
          <InputText
            id="forwardamount"
            :value="shipmentStore.getShipmentAmount.production"
            disabled
          />
          <label for="forwardamount">Shipped</label>
        </FloatLabel>
      </div>
      <div class="col-3">
        <FloatLabel>
          <InputText
            id="remainderamount"
            :value="shipmentStore.getShipmentAmount.remainder"
            disabled
          />
          <label for="remainderamount">Remained</label>
        </FloatLabel>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col">
        <Button
          type="button"
          severity="success"
          class="w-100"
          label="Ship"
          @click="save"
          :disabled="save_button_disabled"
        />
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-4">
        <DataTable
          :value="shipmentStore.getShipmentProductionList"
          dataKey="ID"
          v-model:selection="selectedProducts"
          :scrollable="true"
          scrollHeight="400px"
          sortField="KasaNo"
          :sortOrder="1"
        >
          <Column
            selectionMode="multiple"
            headerStyle="width: 2rem"
            header="All"
            headerClass="tableHeader"
            bodyClass="tableBody"
          />
          <Column
            field="KasaNo"
            header="Crate No"
            headerClass="tableHeader"
            bodyClass="tableBody"
          />
          <Column
            field="Miktar"
            header="Amount"
            headerClass="tableHeader"
            bodyClass="tableBody"
          />
          <Column
            field="BirimAdi"
            header="Unit"
            headerClass="tableHeader"
            bodyClass="tableBody"
          />
        </DataTable>
      </div>

      <div class="col-1">
        <Button
          type="button"
          label="Send Crate"
          @click="sendingCrate"
          :disabled="sending_crate_button_disabled"
        />
      </div>

      <div class="col">
        <DataTable
          :value="shipmentStore.getShipmentSendProductionList"
          :scrollable="true"
          scrollHeight="400px"
        >
          <Column
            field="KasaNo"
            header="Crate No"
            headerClass="tableHeader"
            bodyClass="tableBody"
          />
          <Column
            field="UrunAdi"
            header="Product"
            headerClass="tableHeader"
            bodyClass="tableBody"
          >
            <template #footer>
              {{ shipmentStore.getShipmentSendProductionTotal.crate }}
            </template>
          </Column>
          <Column
            field="YuzeyIslemAdi"
            header="Surface"
            headerClass="tableHeader"
            bodyClass="tableBody"
          />
          <Column header="Size" headerClass="tableHeader" bodyClass="tableBody">
            <template #body="slotProps">
              {{
                slotProps.data.En +
                "x" +
                slotProps.data.Boy +
                "x" +
                slotProps.data.Kenar
              }}
            </template>
          </Column>
          <Column
            field="BirimAdi"
            header="Unit"
            headerClass="tableHeader"
            bodyClass="tableBody"
          />
          <Column
            field="Miktar"
            header="Amount"
            headerClass="tableHeader"
            bodyClass="tableBody"
          >
            <template #body="slotProps">
              {{ formatDecimal(slotProps.data.Miktar) }}
            </template>
            <template #footer>
              {{
                formatDecimal(
                  shipmentStore.getShipmentSendProductionTotal.amount,
                )
              }}
            </template>
          </Column>
          <Column
            field="TotalProduct"
            header="Total"
            headerClass="tableHeader"
            bodyClass="tableBody"
          >
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.TotalProduct) }}
            </template>
            <template #footer>
              {{
                formatPriceUsd(
                  shipmentStore.getShipmentSendProductionTotal.total,
                )
              }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import { useShipmentStore } from "~/stores/shipment"
import { useSharedStore } from "~/stores/shared"
import { useOrderStore } from "~/stores/order"
import { useSelectionStore } from "~/stores/selection"
import { toIsoDate } from "~/utils/dates"

export default {
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },

  computed: {
    shipmentStore() {
      return useShipmentStore()
    },
    sharedStore() {
      return useSharedStore()
    },
    orderStore() {
      return useOrderStore()
    },
    selectionStore() {
      return useSelectionStore()
    },
  },

  data() {
    return {
      selectedProducts: null,
      selectedOrder: null,
      filteredOrders: null,
      forwardingDate: null,
      invoice: null,
      follow: 0,
      forwardingstatus: "normal",
      selectedProduct: null,
      save_button_disabled: false,
      sending_crate_button_disabled: true,
    }
  },

  methods: {
    async ordersSelected(po) {
      this.sharedStore.setOrderProductionProductListNormal(po)
      this.clearForm()

      const control = await this.shipmentStore.setShipmentOrderControl(po)

      /*
       * DUZELTILDI -- YANIT GELMEZSE DUGMELER PASIF KALIYORDU.
       *
       * Nuxt 2'de store eylemi elle bir Promise'e sarilmisti ve .catch()
       * icermiyordu; istek hata verirse dis promise sonsuza kadar
       * beklemede kaliyor, buradaki .then() HIC calismiyordu. Sonuc:
       * "Ship" ve "Send Crate" dugmeleri pasif kaliyor ve kullanici
       * nedenini anlamiyordu. Store artik hatada null donuyor.
       */
      if (!control) {
        useAppToast().error(
          "Sipariş bilgisi alınamadı, tekrar deneyiniz...",
        )
        return
      }

      /*
       * TESLIM TURU 5/6/7 -> ek kontrol gerekmiyor.
       * Aksi halde navlun satis bilgisi aranıyor.
       *
       * DIKKAT: Nuxt 2'de bu if/else'in UC dalinin HEPSI ayni iki satiri
       * yaziyordu (save_button_disabled = false; sending_crate = false).
       * Yani dallanmanin tek islevsel etkisi TOAST gosterip
       * gostermemekti. Yapi sadelestirildi; DAVRANIS AYNI.
       */
      const needsFreight = ![5, 6, 7].includes(control.TeslimTurID)
      const freightMissing =
        control.NavlunSatis == 0 ||
        control.NavlunSatis == null ||
        control.NavlunSatis == "" ||
        control.NavlunSatis == undefined

      if (needsFreight && freightMissing) {
        useAppToast().error(
          "Navlun satış bilgisi girilmeli.Girdikten Sonra Sayfayı Yenileyiniz!",
        )
      }

      this.save_button_disabled = false
      this.sending_crate_button_disabled = false
    },

    /*
     * ordersSelected ve reset() icinde BIREBIR tekrar eden alan
     * sifirlamalari tek yerde toplandi.
     *
     * DUZELTILDI -- KASA LISTESI TEMIZLENMIYORDU.
     * Nuxt 2'de her iki yerde de su satir vardi:
     *
     *     this.getShipmentProductionList = []
     *
     * Bu bir COMPUTED'A ATAMA (mapGetters ile gelen getter). Computed'in
     * setter'i olmadigi icin Vue bunu YAPMAZ, yalnizca
     * "Computed property was assigned to but it has no setter" uyarisi
     * basar. Yani kasa listesi HIC temizlenmiyordu: baska bir siparis
     * secildiginde ONCEKI siparisin kasalari tabloda duruyor ve
     * secilebiliyordu.
     *
     * Dogru karsiligi store'daki setShipmentProductionDeleteList --
     * bilesen onu zaten sendingCrate() icinde kullaniyor. Burada da
     * cagriliyor.
     *
     * Ayni sekilde `this.getShipmentAmount.* = 0` getter uzerinden
     * state'e yaziyordu; yerine store eylemi (resetShipmentAmount).
     */
    clearForm() {
      this.forwardingDate = null
      this.invoice = null
      this.follow = null
      this.forwardingstatus = null
      this.selectedProduct = null
      this.selectedProducts = null

      this.shipmentStore.resetShipmentAmount()
      this.shipmentStore.setShipmentProductionDeleteList()
      this.shipmentStore.setShipmentSendProductionList()
      this.shipmentStore.setShipmentSendProductionTotalCrateReset()
    },

    /*
     * Secilen urunun tedarikcisinde satis fiyati var mi?
     *
     * DUZELTILDI -- TEDARIKCI BULUNAMAZSA PATLIYORDU:
     *     this.getSupplierList.find((x) => x.ID == payload.TedarikciID)
     *       .FirmaAdi
     * find() eslesme bulamazsa undefined doner ve `.FirmaAdi` TypeError
     * firlatir. Tedarikci listesi layout'tan geldigi icin henuz dolmamis
     * olabilir ya da tedarikci pasif/silinmis olabilir.
     *
     * NOT: Nuxt 2'de if/else'in IKI dali da ayni iki satiri yaziyordu;
     * tek fark toast'ti. Sadelestirildi, davranis ayni.
     */
    __getPriceControl(payload) {
      const priceMissing =
        payload.SatisFiyati == 0 ||
        payload.SatisFiyati == undefined ||
        payload.SatisFiyati == null ||
        payload.SatisFiyati == ""

      if (priceMissing) {
        const supplier = this.sharedStore.getSupplierList.find(
          (x) => x.ID == payload.TedarikciID,
        )
        const supplierName = supplier ? supplier.FirmaAdi : "Tedarikçi"

        useAppToast().error(
          `${supplierName} ürünlerine satış fiyati girilmeli.Girdikten Sonra Sayfayı Yenileyiniz!`,
        )
      }

      this.save_button_disabled = false
      this.sending_crate_button_disabled = false
    },

    reset() {
      this.selectedOrder = null
      this.clearForm()
    },

    /*
     * Nuxt 2'de save() BES KADEMELI ic ice if/else idi ve iki dalinda
     * (onay verilen / sevk turu secili) BIREBIR AYNI 25 satirlik kayit
     * blogu tekrar ediyordu. Dogrulamalar erken donuse cevrildi ve kayit
     * blogu tek yerde toplandi (submit).
     *
     * DOGRULAMA SIRASI VE MESAJLAR BIREBIR KORUNDU.
     */
    save() {
      /*
       * Bu kontrol TERS GORUNUYOR ama dogru: urun listesi BOSSA sevk
       * edilebilir. Liste, kasalar "Send Crate" ile gonderildikce
       * kuculuyor; bos olmasi "gonderilmemis urun kalmadi" demek.
       */
      if (this.sharedStore.getOrderProductionProductNormalList.length !== 0) {
        useAppToast().error(
          "Gönderilmemiş Ürünler Mevcut. Kontrol edip tekrar dene...",
        )
        return
      }

      this.save_button_disabled = true

      if (!this.selectedOrder) {
        useAppToast().error("Sipariş seçilmemiş, tekrar deneyiniz...")
        this.save_button_disabled = false
        return
      }

      if (!this.forwardingDate) {
        useAppToast().error("Sevkiyat tarihi girilmemiş, tekrar deneyiniz...")
        this.save_button_disabled = false
        return
      }

      if (
        this.invoice == "" ||
        this.invoice == " " ||
        this.invoice == null ||
        this.invoice == undefined
      ) {
        useAppToast().error("Fatura no girilmemiş, tekrar deneyiniz...")
        this.save_button_disabled = false
        return
      }

      const statusMissing =
        this.forwardingstatus == "" ||
        this.forwardingstatus == " " ||
        this.forwardingstatus == null ||
        this.forwardingstatus == undefined

      if (statusMissing) {
        /* confirm() tarayici modal'i -- Nuxt 2'den birebir korundu. */
        if (!confirm("Sevk türü seçilmemiş yine de sevk etmek istiyor musunuz?")) {
          this.save_button_disabled = false
          return
        }
      }

      this.submit()
    },

    async submit() {
      const data = this.shipmentStore.getShipmentSendProductionList
      const userId = useCookie("userId").value
      const shipDate = toIsoDate(this.forwardingDate)

      for (const item of data) {
        item.KullaniciId = userId
        item.Tarih = shipDate
        item.MusteriId = this.selectedOrder.MusteriID
        item.SiparisNo = this.selectedOrder.SiparisNo
      }

      const ok = await this.shipmentStore.setShipmentSave({
        data,
        MusteriID: this.selectedOrder.MusteriID,
        SiparisNo: this.selectedOrder.SiparisNo,
        FaturaNo: this.invoice,
        YuklemeTarihi: shipDate,
        SevkStatus: this.forwardingstatus,
        Takip: this.follow,
        KullaniciAdi: useCookie("username").value,
        mail: useCookie("mail").value,
      })

      if (ok) {
        useAppToast().success("Başarıyla Sevk Edildi")

        /*
         * ACTION ADI DUZELTILDI: `setOrderList` order store'da TANIMLI
         * DEGIL -- orada yalnizca `MUT_setOrderList(payload)` mutation'i
         * ve `setOrderProductionList()` gibi yukleyici action'lar var.
         *
         * Eski hali TypeError firlatiyordu ve hata BU SATIRDA oldugu
         * icin altindaki iki satir HIC CALISMIYORDU:
         *   - save_button_disabled = false  -> "Sevk Et" butonu basarili
         *     sevkiyattan sonra DEVRE DISI kaliyordu
         *   - reset()                       -> form temizlenmiyordu
         * Yani kullanici basarili bir sevkiyattan sonra sayfayi
         * yenilemek zorunda kaliyordu.
         *
         * Dogru action, bu ekranin verisini yukleyen action'in aynisi:
         * pages/operation/shipment.vue de `setOrderProductionList()`
         * cagiriyor (order.ts:274) ve liste `orderList`e yaziliyor.
         */
        this.orderStore.setOrderProductionList()
        this.save_button_disabled = false
        this.reset()
      } else {
        useAppToast().error("Sevk Edilemedi")
        this.save_button_disabled = false
      }
    },

    sendingCrate() {
      /*
       * DUZELTILDI -- KASA SECILMEDEN BASILIRSA PATLIYORDU.
       * Store eylemi `for (const item of products)` ile donuyordu ve
       * selectedProducts null baslatiliyor -> "products is not iterable".
       * Kontrol store tarafina eklendi (setShipmentSendingProduction);
       * burada ayrica selectedProduct kontrolu var cunku asagidaki iki
       * cagri onun ID'sini okuyor.
       */
      if (!this.selectedProduct) {
        useAppToast().error("Ürün seçilmelidir.")
        return
      }

      this.shipmentStore.setShipmentSendingProduction(this.selectedProducts)
      this.shipmentStore.setShipmentProductionDeleteList()
      this.selectionStore.setSelectionProductionProductDelete(
        this.selectedProduct.ID,
      )
      this.sharedStore.MUT_setShipmentDropProducts(this.selectedProduct.ID)

      this.sending_crate_button_disabled = true
      this.selectedProducts = null
    },

    productSelected(event) {
      this.shipmentStore.setShipmentAmount(event.value)
      this.sending_crate_button_disabled = false
      this.__getPriceControl(event.value)
    },

    searchOrders(event) {
      if (event.query.length == 0) {
        this.filteredOrders = this.orders
        return
      }

      this.filteredOrders = this.orders.filter((x) =>
        x.SiparisNo.toLowerCase().startsWith(event.query.toLowerCase()),
      )
    },
  },
}
</script>

<style scoped>
@media screen and (max-width: 576px) {
  .row {
    clear: both;
    display: block;
    width: 100%;
  }
  .col {
    clear: both;
    display: block;
    width: 100%;
  }
  .col-4 {
    clear: both;
    display: block;
    width: 100%;
  }
  .col-1 {
    clear: both;
    display: block;
    width: 100%;
  }
}
</style>

<!--
  components/shipment/Form.vue   (Nuxt 2: components/shipment/form.vue)

  Etiket adi <ShipmentForm>. Nuxt 2'de ad `shipmentForm` idi
  (plugins/components.js:250, ELLE kayit).

  DUZELTILDI -- KASA LISTESI HIC TEMIZLENMIYORDU:

  [x] Nuxt 2'de ordersSelected() ve reset() icinde su satir vardi:
          this.getShipmentProductionList = []
      Bu bir COMPUTED'A ATAMA (mapGetters getter'i). Computed'in setter'i
      olmadigi icin Vue bunu YAPMAZ, yalnizca "Computed property was
      assigned to but it has no setter" uyarisi basar.

      Somut sonucu: baska bir siparis secildiginde ONCEKI siparisin kasa
      listesi tabloda DURUYOR ve secilebiliyordu -- yani yanlis siparise
      ait kasalar sevke eklenebiliyordu. Dogru karsiligi store'daki
      setShipmentProductionDeleteList (bilesen onu sendingCrate() icinde
      zaten kullaniyor).

  [x] `this.getShipmentAmount.* = 0` getter UZERINDEN state'e yaziyordu.
      Getter nesneyi referansla dondurdugu icin calisiyordu ama store'un
      disindan state'e yazmak demekti. Yerine resetShipmentAmount()
      eylemi (bu commit'te store'a eklendi).

  [x] `v-model="getShipmentAmount.order"` (uc input) -> `:value=`
      Uc alan da `disabled`, yani salt gosterim; v-model bir GETTER'in
      alanina yazmaya calisiyordu. `:value` dogru ve ayni gorunumu
      veriyor.

  DUZELTILDI -- SESSIZ PATLAMALAR:

  [x] __getPriceControl, `getSupplierList.find(...).FirmaAdi` okuyordu.
      find() bulamazsa undefined doner -> TypeError. Tedarikci listesi
      layout'tan geldigi icin henuz dolmamis olabilir ya da tedarikci
      pasif/silinmis olabilir.

  [x] sendingCrate(), hicbir kasa secilmeden basildiginda store'daki
      `for (const item of products)` dongusu "products is not iterable"
      firlatiyordu (selectedProducts null baslatiliyor). Kontrol store'a
      ve bilesene eklendi.

  [x] setShipmentOrderControl / setShipmentSave elle `new Promise`'e
      sarilmis ve .catch()'siz oldugu icin istek hatasinda dis promise
      SONSUZA KADAR beklemede kaliyordu: ne toast, ne dugmelerin geri
      acilmasi. Store tarafinda duz async'e cevrildi; burada da
      kontrol ediliyor.

  SADELESTIRILDI -- DAVRANIS AYNI:

  [x] save() BES KADEMELI ic ice if/else idi ve IKI dalinda BIREBIR AYNI
      25 satirlik kayit blogu tekrar ediyordu (onay verilen dal ve sevk
      turu secili dal). Dogrulamalar erken donuse cevrildi, kayit blogu
      submit() icinde tek yerde toplandi. Dogrulama SIRASI ve MESAJLARI
      birebir korundu.

  [x] ordersSelected icindeki UC dalli if/else'in HEPSI ayni iki satiri
      yaziyordu; tek islevsel fark toast gosterip gostermemekti.
      __getPriceControl'daki iki dal icin de ayni durum.

  [x] ordersSelected ve reset() icinde birebir tekrar eden alan
      sifirlamalari clearForm() icinde toplandi.

  DIGER ZORUNLU DONUSUMLER:

  [x] mapGetters -> shipmentStore / sharedStore / orderStore /
      selectionStore. DIKKAT -- getter'lar DORT AYRI store'a dagilmis:
        getShipmentAmount / ...ProductionList / ...SendProductionList /
        ...SendProductionTotal   -> shipment (BU COMMIT'TE eklendi)
        getOrderProductionProductNormalList, getSupplierList,
        MUT_setShipmentDropProducts, setOrderProductionProductListNormal
                                  -> shared
        setOrderList              -> order
        setSelectionProductionProductDelete -> selection (BU COMMIT'TE,
                                  KISMI -- bkz. app/stores/selection.ts)
      Vuex'te tum moduller tek isim uzayini paylastigi icin bu dagilim
      gorunmuyordu.

  [x] this.$store.commit("setShipmentDropProducts", id)
         -> sharedStore.MUT_setShipmentDropProducts(id)
      COMMIT, yani MUTATION kastediliyor. shared.js'te ayni ad hem action
      hem mutation; pilotta mutation MUT_ onekini almis durumda.

  [x] <Calendar> -> <DatePicker>,  <Dropdown> -> <Select>
  [x] AutoComplete field -> optionLabel  (v4'te `field` prop'u YOK)
  [x] <span class="p-float-label"> -> <FloatLabel>  (yedi yerde)
  [x] p-button-success -> severity="success";
      p-button-primary SILINDI (Button'un varsayilani)
  [x] :selection + @update:selection -> v-model:selection
  [x] Checkbox/RadioButton'da id -> inputId
      PrimeVue'da `id` KOK SARMALAYICIYA gider, ic <input> ogesine
      DEGIL -- yani <label for="follow"> / for="normal" / for="fast"
      hicbir girdiye baglanmiyordu.
  [x] RadioButton id'leri normal/fast -> shipNormal/shipFast
      "normal" ve "fast" fazla genel adlar; sayfada baska bir ogeyle
      cakisma riskini kaldirmak icin oneklendi. Radyo VALUE'lari
      ("normal"/"fast") DEGISMEDI.
  [x] class="mr-1" -> class="me-1"   (Bootstrap 5 adi; depo BS 5.3.2
      vendor'luyor, `mr-*` BS4 adi ve hicbir sey yapmiyordu)
  [x] :value="'normal'" -> value="normal"  (gereksiz ifade baglamasi)
  [x] plugins/date -> utils/dates (toIsoDate)
  [x] js-cookie Cookies.get -> useCookie
  [x] <Column ...></Column> -> <Column ... />

  KALDIRILDI -- OLU KOD:
  [x] methods.__getFreightControl -- GOVDESI BOS ve hicbir yerden
      cagrilmiyor.
  [x] data.orderamount / forwardamount / remainderamount -- uc input
      getter'lara bagli, bu alanlar hic okunmuyor/yazilmiyor.
  [x] data.sendCrateList -- hicbir yerde gecmiyor.

  DIKKAT -- KASITLI OLARAK DEGISTIRILMEDI:

      setShipmentSave'in donus degeri MAIL'in sonucunu yansitiyor: kayit
      basarili ama mail basarisizsa false doner ve kullanici "Sevk
      Edilemedi" gorur -- oysa sevk KAYDEDILMISTIR. Yaniltici ama Nuxt
      2'deki davranis bu; mail sonucunu kayit sonucundan ayirmak ayri bir
      karar.

      Tutarlar store'da DIZGE olarak duruyor (.toFixed(4)). Yalnizca
      gosterildikleri icin sorun cikmiyor; ayrinti stores/shipment.ts
      icindeki notta.

      `follow` alani 0 ile baslatiliyor ama clearForm() null yaziyor.
      Checkbox binary ikisini de "secili degil" olarak yorumluyor;
      Nuxt 2 davranisi korundu.
-->
