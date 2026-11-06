<template>
  <div>
    <DataTable
      :value="finance_list"
      tableStyle="min-width: 50rem"
      v-model:selection="selectedFinance"
      selectionMode="single"
      @row-click="financeSelection"
      :sortOrder="-1"
      sortField="Toplam"
      v-model:filters="filteredFinanceList"
      filterDisplay="row"
      @filter="financeFiltered($event)"
    >
      <Column
        field="Musteri"
        header="Müşteri"
        :showFilterMenu="false"
        :showClearButton="false"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="Toplam" header="Toplam Tutar">
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.Toplam) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(finance_list_total.total) }}
        </template>
      </Column>
    </DataTable>
    <Dialog
      v-model:visible="visible_finance_dialog"
      :header="header_finance_dialog"
      modal
    >
      <DataTable
        :value="finance_list_detail"
        tableStyle="min-width: 50rem"
        v-model:filters="filteredDetailList"
        filterDisplay="row"
        :sortOrder="1"
        sortField="Durum"
        :selection="selectedDetail"
        selectionMode="single"
        @row-click="detailSelected($event)"
      >
        <Column field="SiparisTarihi" header="Sipariş Tarihi">
          <template #body="slotProps">
            {{ dateToString(slotProps.data.SiparisTarihi) }}
          </template>
        </Column>
        <Column field="YuklemeTarihi" header="Yükleme Tarihi">
          <template #body="slotProps">
            {{ dateToString(slotProps.data.YuklemeTarihi) }}
          </template>
        </Column>
        <Column
          field="SiparisNo"
          header="Sipariş No"
          :showFilterMenu="false"
          :showClearButton="false"
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column field="Alis" header="Toplam Bedel">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.Alis) }}
          </template>
        </Column>

        <Column header="Ödeme Durumu">
          <template #body="slotProps">
            <Button
              :severity="slotProps.data.Durum ? 'success' : 'danger'"
              :label="slotProps.data.Durum ? 'Ödendi' : 'Ödenmedi'"
              :disabled="slotProps.data.Durum"
              :loading="paid_button_loading"
              @click="savePaid(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </Dialog>

    <Dialog
      v-model:visible="finance_order_detail_visible"
      :header="finance_order_detail_header"
      modal
    >
      <DataTable
        :value="finance_list_order_detail"
        tableStyle="min-width: 50rem"
      >
        <Column field="KategoriAdi" header="Kategori"></Column>
        <Column field="UrunAdi" header="Ürün"></Column>
        <Column field="YuzeyIslemAdi" header="Yüzey"></Column>
        <Column field="En" header="En"></Column>
        <Column field="Boy" header="Boy"></Column>

        <Column field="Kenar" header="Kenar"></Column>
        <Column field="Miktar" header="Miktar">
          <template #body="slotProps">
            {{ formatDecimal(slotProps.data.Miktar) }}
          </template>
        </Column>
        <Column field="AlisFiyati" header="Fiyat">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.AlisFiyati) }}
          </template>
        </Column>
        <Column field="Toplam" header="Toplam">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.Toplam) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(finance_list_detail_order_total) }}
          </template>
        </Column>
      </DataTable>
    </Dialog>
  </div>
</template>

<script>
import { FilterMatchMode } from "@primevue/core/api"

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
  data() {
    return {
      finance_list_detail_order_total: 0,
      finance_order_detail_header: "",
      finance_order_detail_visible: false,
      selectedDetail: null,
      filteredDetailList: {
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      filteredFinanceList: {
        Musteri: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      paid_button_loading: false,
      visible_finance_dialog: false,
      header_finance_dialog: "Finance",
      selectedFinance: null,

      finance_list: [],
      finance_list_total: {
        total: 0,
      },
      finance_list_detail: [],
      finance_list_detail_total: {},
      finance_list_order_detail: [],
    }
  },

  /*
   * NEDEN mounted() -- DIGER SAYFALARDAN FARKLI OLARAK useAsyncData DEGIL
   *
   * Pilottaki diger rapor sayfalari veriyi Pinia store'una cekiyor, bu
   * yuzden fetch'i dosya sonundaki <script setup> blogunda useAsyncData
   * ile cagirabiliyorlar. Bu sayfanin listesi ise store'da DEGIL, bileşenin
   * kendi data()'sinda duruyor (Nuxt 2'de de boyleydi) -- <script setup>
   * blogu Options API'nin `this`'ine erisemediginden fetch'i oraya tasimak
   * once listeyi store'a tasimayi gerektirirdi; bu, sayfanin kendi basina
   * yeterli olan yapisini gereksiz buyutur.
   *
   * created() yerine mounted() secildi: created() SSR'da da CALISIR, async
   * isi beklenmez ve liste BOS serialize edilir; hydration onu devralir,
   * created() bir daha calismaz, tablo bos kalir (bkz. commit 2afc877e3).
   * mounted() ise sunucuda HIC calismaz -- tek sefer, yalnizca istemcide
   * calisir ve fetch tam olmasi gereken yerde olur.
   *
   * Yukleme sayaci (shared store) bu sayfada hic kullanilmiyor, dolayisiyla
   * o commit'teki "sayac 1'de kalip spinner kilitleniyor" sorunu burada yok.
   */
  mounted() {
    this.fetchData()
  },

  methods: {
    detailSelected(event) {
      this.finance_order_detail_header = event.data.SiparisNo
      this.finance_list_detail_order_total = 0

      useApi()("/mekmer/new/finance/detail/order", {
        method: "POST",
        body: { Po: event.data.SiparisNo },
      })
        .then((res) => {
          this.finance_list_order_detail = res.list
          res.list.forEach((x) => {
            this.finance_list_detail_order_total += x.Toplam
          })
          this.finance_order_detail_visible = true
        })
    },

    financeFiltered(event) {
      this.finance_list_total.total = 0
      event.filteredValue.forEach((x) => {
        this.finance_list_total.total += x.Toplam
      })
    },

    savePaid(event) {
      if (!confirm("Gerçekten Kaydetmek İstiyor musunuz?")) return

      this.paid_button_loading = true

      useApi()("/mekmer/new/finance/paid/status", {
        method: "POST",
        body: {
          Tarih: toIsoDate(new Date()),
          KullaniciId: useCookie("userId").value,
          ...event,
        },
      })
        .then((res) => {
          if (!res.status) {
            useAppToast().error("Hata Oluştu.")
            this.paid_button_loading = false
            return
          }

          useAppToast().success("Başarıyla Kaydedildi.")

          return useApi()(`/mekmer/new/finance/list/detail/${event.MusteriID}`)
            .then((detail) => {
              this.finance_list_detail = detail.list
              this.fetchData()
              this.paid_button_loading = false
            })
        })
        /*
         * EKLENDI -- NUXT 2'DE EKSIKTI: iki istegin HICBIRINDE hata dali
         * yoktu. Istek reddedilirse (ag hatasi, 403, 500) .then hic
         * calismiyor, paid_button_loading EBEDIYEN true kaliyor ve dugme
         * donen spinner'da kilitleniyordu -- kullaniciya hicbir sey
         * soylenmeden. Pilotta pilot salt-okunur oldugu icin bu yol
         * KESIN tetikleniyor: readonly-guard bu POST'u 403 ile durduruyor
         * (asagidaki nota bakin), yani hata dali olmasa dugme her
         * denemede kalici olarak kilitlenirdi.
         */
        .catch((err) => {
          console.error("savePaid basarisiz:", err)
          useAppToast().error("Hata Oluştu.")
          this.paid_button_loading = false
        })
    },

    financeSelection(event) {
      useApi()(`/mekmer/new/finance/list/detail/${event.data.ID}`)
        .then((res) => {
          this.finance_list_detail = res.list
        })

      this.header_finance_dialog = event.data.Musteri
      this.visible_finance_dialog = true
    },

    fetchData() {
      this.finance_list_total = {
        total: 0,
      }

      useApi()("/mekmer/new/finance/list")
        .then((res) => {
          this.finance_list = res.list
          res.list.forEach((x) => {
            this.finance_list_total.total += x.Toplam
          })
        })
    },
  },
}
</script>

<!--
  pages/reports/mekmer/new-mekmer-finance.vue

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] import { FilterMatchMode } from "primevue/api"
         -> from "@primevue/core/api"
      PrimeVue 4'te `primevue/api` ALT PAKETI KALDIRILDI (node_modules'da
      boyle bir klasor yok) -- eski yol birakilsa Vite "Failed to resolve
      import" ile build'i dusururdu. Dizi degerleri ayni.

  [x] :selection.sync / :filters.sync / :visible.sync
         -> v-model:selection / v-model:filters / v-model:visible
      Nuxt 2'deki .sync Vue 3'te yok. (mark0002 commit c569066e5 bu
      modifier'i acik prop + update olayina ceviriyordu; Vue 3'teki dogru
      yazim v-model:<prop>.)

  [x] Sablon filter'lari fonksiyon cagrisina: `| formatPriceUsd`,
      `| dateToString`, `| formatDecimal` -> formatPriceUsd(...),
      dateToString(...), formatDecimal(...)
      Vue 3'te filter yok. Isimler app/plugins/formatters.ts ile
      globalProperties'e kayitli, Options API sablonundan gorulurler.

  [x] :class="... ? 'p-button-success' : 'p-button-danger'"
         -> :severity="... ? 'success' : 'danger'"
      PrimeVue 4'te p-button-<severity> siniflari KALDIRILDI; sinif olarak
      birakilsa dugme hata vermeden varsayilan (mavi) renkte kalirdi --
      "Ödendi" ile "Ödenmedi" GORSEL OLARAK AYIRT EDILEMEZ olurdu.

  [x] this.$axios -> useApi()
      DIKKAT -- GOVDE ERISIMI DEGISTI: $axios yanitta `res.data.list`
      veriyordu, useApi() $fetch tabanli oldugu icin govde DOGRUDAN
      donuyor -> `res.list`. Dort cagrinin hepsinde duzeltildi. Bu,
      derleme hatasi vermeyen sessiz bir fark: `res.data` undefined olur
      ve `.list` okumasi calisma aninda patlar.

  [x] this.$toast -> useAppToast()  (@nuxtjs/toast Nuxt 3'te yok)
  [x] js-cookie Cookies.get("userId") -> useCookie("userId").value
  [x] plugins/date -> date.dateToString(newdate) -> toIsoDate(new Date())
      Bu deger API'ye YAZILIYOR (Tarih alani), yani ISO bicimi "2026-10-02"
      olmali. Sablondaki dateToString ile AYNI DEGIL -- o gosterim icin
      "02-10-2026" uretir. Ayrinti: app/utils/dates.ts basindaki uyari.

  [x] created() -> mounted()   (gerekcesi mounted()'in ustunde)

  DUZELTILDI -- NUXT 2'DE BOZUK OLAN:
  [x] savePaid()'de hata dali yoktu -> dugme kalici spinner'da kilitleniyordu.
      Ayrinti .catch()'in ustundeki yorumda.

  KALDIRILDI -- OLU KOD:
  [x] mounted() {}            -- govdesi bostu (fetch artik burada).
  [x] financeDetailFiltered(event) {}  -- govdesi BOS bir no-op'tu; detay
      tablosundaki @filter baglamasi da onunla birlikte kaldirildi.
      Davranis ayni: olay zaten hicbir sey yapmiyordu.
  [x] async savePaid / async financeSelection -- govdelerinde `await` YOKTU,
      ikisi de .then zinciri kullaniyor. `async` yalnizca donus degerini
      Promise'e sariyordu, cagiran taraf (sablon @click) onu kullanmiyor.
  [x] data().finance_list_detail_total  -- HICBIR yerde okunmuyor/yazilmiyor
      (ne sablonda ne metotlarda). Nuxt 2'de de olu duruyordu.

  PILOTTA CALISMAYAN -- BILEREK:
      "Ödenmedi" dugmesi (POST /mekmer/new/finance/paid/status) pilotta
      403 alir: server/middleware/0.readonly-guard.ts yazma isteklerini
      durduruyor ve bu uc GERCEKTEN insert yapiyor
      (YeniMekmerOdemelerTB, api/index.js:19300). Bu beklenen davranis --
      pilot uretim veritabanina karsi calisiyor. Dugmeye basilinca artik
      "Hata Oluştu." toast'i cikar ve spinner cozulur.

      Buna karsin POST /mekmer/new/finance/detail/order yalnizca SELECT
      yapiyor (api/index.js:19315) -- POST olmasinin tek sebebi Po'yu
      govdede tasimak. Sayfanin detay diyalogu calisabilsin diye guard'in
      allowlist'ine eklendi.
-->
