<template>
  <div>
    <div class="row mt-4 mb-4">
      <div class="col">
        <FloatLabel>
          <DatePicker
            v-model="workerman_date"
            inputId="workerman_date"
            dateFormat="dd/mm/yy"
            @date-select="workermanDateSelected($event)"
          />
          <label for="workerman_date">Date</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <AutoComplete
            id="supplier"
            v-model="selectedSupplier"
            :suggestions="filteredSupplier"
            optionLabel="FirmaAdi"
            @complete="searchSupplier($event)"
            @item-select="supplierSelected($event)"
          />
          <label for="supplier">Supplier</label>
        </FloatLabel>
      </div>
      <div class="col">
        <CustomInput
          :value="form.Tutar"
          text="Price"
          :disabled="false"
          @onInput="form.Tutar = $event"
        />
      </div>
    </div>

    <div class="row mt-4 mb-4">
      <div class="col">
        <FloatLabel>
          <Textarea id="description" v-model="form.Aciklama" rows="5" class="w-100" />
          <label for="description">Explanation</label>
        </FloatLabel>
      </div>
    </div>

    <div class="row mt-4 mb-4">
      <div class="col">
        <Button type="button" severity="success" class="w-100" label="Save" @click="process" />
      </div>
      <div class="col">
        <Button
          type="button"
          severity="danger"
          class="w-100"
          label="Delete"
          :disabled="deleted_button_disabled"
          @click="deleteForm"
        />
      </div>
    </div>

    <div class="row mt-4 mb-4">
      <div class="col">
        <DataTable
          :value="list"
          v-model:selection="selectedWorkerman"
          selectionMode="single"
          @row-click="workermanSelected($event)"
        >
          <Column field="Tarih" header="Date">
            <template #body="slotProps">
              {{ dateToString(slotProps.data.Tarih) }}
            </template>
          </Column>
          <Column field="FirmaAdi" header="Supplier" />
          <Column field="Tutar" header="Price">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.Tutar) }}
            </template>
          </Column>
          <Column field="Aciklama" header="Description" />
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
// [1] import date from "plugins/date" -> adlandirilmis yardimcilar
import { toIsoDate, fromIsoDate } from "~/utils/dates"
import { useOrderStore } from "~/stores/order"

export default {
  props: {
    list: {
      type: Array,
      required: false,
    },
    model: {
      type: Object,
      required: false,
    },
    supplier: {
      type: Array,
      required: true,
    },
    productId: {
      type: Number,
      required: true,
    },
    po: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      /*
       * [2] `model` PROP'UNUN YERINE YEREL KOPYA -- bu gecisin bu
       * dosyadaki en onemli degisikligi.
       *
       * Vue 2 kodu `this.model = event.data` yaziyordu, yani prop'un
       * KENDISINE atama yapiyordu. Vue 2 bunu yalnizca uyariyla geciyordu
       * ve calisiyordu; Vue 3'te prop'lar shallowReadonly oldugu icin bu
       * atama BASARISIZ olur -> tabloda bir satir secildiginde form
       * DOLMAZ. (Bu, konsolda uyari verdigi icin sessiz degil, ama
       * uyariyi kacirip "secim calismiyor" diye aramak kolay.)
       *
       * Ustelik prop'un kendisi dogrudan store state'i
       * (:model="getOrderProductWorkermanModel"), yani eski kod
       * `this.model.Tutar = 0` ile Pinia/Vuex state'ini aksiyon disinda
       * degistiriyordu.
       *
       * Yerel kopya ikisini de cozuyor. Prop degistiginde (store modeli
       * sifirlandiginda) watch ile yeniden tohumlaniyor, boylece
       * kaydetme sonrasi temizlenme akisi korunuyor.
       */
      form: { ...(this.model ?? {}) },

      selectedSupplier: null,
      filteredSupplier: null,
      workerman_date: null,
      selectedWorkerman: null,
      deleted_button_disabled: true,
    }
  },

  computed: {
    orderStore() {
      return useOrderStore()
    },
  },

  watch: {
    model: {
      handler(next) {
        this.form = { ...(next ?? {}) }
      },
      deep: false,
    },
  },

  methods: {
    workermanSelected(event) {
      this.deleted_button_disabled = false
      this.form = { ...event.data }
      this.selectedSupplier = this.supplier.find((x) => x.ID == event.data.TedarikciID)
      // [1] date.stringToDate -> fromIsoDate ("2026-10-02" -> Date)
      this.workerman_date = fromIsoDate(event.data.Tarih)
      this.form.SiparisNo = this.po
      this.form.UrunKartId = this.productId
    },

    deleteForm() {
      /* Yikici islem -- onay. Metin: app/utils/confirm.ts */
      if (!confirmAction()) return

      this.deleted_button_disabled = true
      this.selectedSupplier = null
      this.workerman_date = null
      this.form.UrunKartId = this.productId
      this.form.SiparisNo = this.po
      // [3] $store.dispatch(...) -> Pinia store action'i
      this.orderStore.setProductionProductWorkermanDelete(this.form)
      this.form.Tutar = 0
      this.form.Aciklama = ""
    },

    /*
     * Eksik alanlari SIRAYLA soruyor ve ilk eksikte duruyor: tarih yoksa
     * yalnizca tarihi sorar, varsa tedarikciye bakar, ... Birebir
     * korundu -- ic ice if'ler sadelestirilmedi cunku sira anlamli:
     * kullaniciya en fazla BIR onay kutusu cikiyor.
     */
    process() {
      if (!this.deleted_button_disabled) {
        this.update()
        return
      }

      if (!this.workerman_date) {
        if (confirm("Tarih eksik yinede kaydedilsin mi ?")) this.save()
      } else if (!this.selectedSupplier) {
        if (confirm("Tedarikçi eksik yinede kaydedilsin mi ?")) this.save()
      } else if (this.form.Tutar == 0) {
        if (confirm("Tutar eksik yinede kaydedilsin mi ?")) this.save()
      } else if (this.form.Aciklama == "") {
        if (confirm("Açıklama eksik yinede kaydedilsin mi?")) this.save()
      } else {
        this.save()
      }
    },

    update() {
      this.form.Aciklama = this.__stringCharacterChange(this.form.Aciklama)
      this.form.SiparisEkstraGiderTurID = 1
      this.form.UrunKartId = this.productId
      this.form.SiparisNo = this.po
      this.orderStore.setProductionProductWorkermanUpdate(this.form)
      this.resetAfterWrite()
    },

    save() {
      this.form.Aciklama = this.__stringCharacterChange(this.form.Aciklama)
      this.form.SiparisEkstraGiderTurID = 1
      this.form.UrunKartId = this.productId
      this.form.SiparisNo = this.po
      this.orderStore.setProductionProductWorkermanSave(this.form)
      this.resetAfterWrite()
    },

    /* save() ve update() sonundaki birebir ayni dort satir. */
    resetAfterWrite() {
      this.selectedSupplier = null
      this.workerman_date = null
      this.form.Tutar = 0
      this.form.Aciklama = ""
    },

    /*
     * Tek tirnagi ikiye katliyor -- yani SQL kacisi ISTEMCIDE yapiliyor.
     * Birebir korundu (davranis degisikligi yapmamak icin) ama bu bir
     * guvenlik sorunu: asil cozum api/ tarafinda parametreli sorgu
     * kullanmak. Istemcideki kacis atlanabilir/asilabilir.
     */
    __stringCharacterChange(event) {
      const data = String(event ?? "").split("'")
      let value = ""
      data.forEach((x) => {
        value += x + "''"
      })
      return value.substring(0, value.length - 2)
    },

    workermanDateSelected(event) {
      // [1] date.dateToString -> toIsoDate (API'ye yazilan bicim)
      this.form.Tarih = toIsoDate(event)
    },

    supplierSelected(event) {
      this.form.TedarikciID = event.value.ID
      this.form.TedarikciAdi = event.value.FirmaAdi
    },

    searchSupplier(event) {
      this.filteredSupplier =
        event.query.length === 0
          ? this.supplier
          : this.supplier.filter((s) =>
              s.FirmaAdi.toLowerCase().startsWith(event.query.toLowerCase()),
            )
    },
  },
}
</script>

<!--
  components/orders/forms/workerman.vue
    -> app/components/orderDetail/WorkermanForm.vue

  DOSYA YOLU: Nuxt 2'de `orderDetailWorkermanForm` adiyla global kayitli;
  yol o adi uretecek sekilde secildi. 8 sayfa bu etiketi kullaniyor.

  ZORUNLU degisiklikler:
  [1] import date from "../../../plugins/date" -> ~/utils/dates
      date.dateToString(event)       -> toIsoDate(event)    (API'ye YAZARKEN)
      date.stringToDate(event.Tarih) -> fromIsoDate(...)    (okurken)
      DIKKAT: sablondaki dateToString ise GOSTERIM surumu
      (formatters.js, "02-10-2026"). Iki fonksiyon ayni ada sahipti ve
      ciktilari birbirinin tersiydi; bkz. app/utils/dates.ts basindaki not.
  [2] `model` prop'una atama -> yerel `form` kopyasi. Ayrinti data()
      icindeki notta. Vue 3'te prop'a atama BASARISIZ olur, yani birebir
      tasinsa tablo satiri secimi formu doldurmazdi.
  [3] this.$store.dispatch("setProductionProductWorkerman*") ->
      useOrderStore() action'lari.
  [4] <Calendar> -> <DatePicker>
      PrimeVue 4'te yeniden adlandirildi. 4.5.5'te `Calendar` hala
      kullanilabilir durumda ama deprecated; yeni adi kullaniliyor.
  [5] AutoComplete: field="FirmaAdi" -> optionLabel="FirmaAdi"
      `field` prop'u v4'te KALDIRILDI. Birebir tasinsa oneri listesi
      nesneleri "[object Object]" olarak gorunurdu.
  [6] class="p-button-success/danger" -> severity="success"/"danger"
      (w-100 sinifi korundu)
  [7] :selection + @update:selection -> v-model:selection
  [8] Bos <Column ...></Column> ciftleri self-closing yapildi.

  SADELESTIRILDI (davranis ayni):
  - process() ic ice if zinciri early-return + else-if'e cevrildi; sira ve
    "en fazla bir onay" davranisi korundu.
  - save()/update() sonundaki ayni dort satir resetAfterWrite()'a alindi.
  - searchSupplier tek ifadeye indirildi.

  KORUNDU ama SORUNLU (kapsam disi, ayrica ele alinmali):
  - __stringCharacterChange: SQL kacisi istemcide yapiliyor. Guvenli
    cozum api/ tarafinda parametreli sorgu. Yalnizca null/undefined
    girisinde patlamayi onleyecek kadar sertlestirildi (String(event ?? "")),
    cunku eski hali undefined gelince TypeError atip kaydi sessizce
    iptal ediyordu.
  - confirm(): PrimeVue ConfirmDialog daha uygun olurdu; gorunum
    degisikligi oldugu icin dokunulmadi.
-->
