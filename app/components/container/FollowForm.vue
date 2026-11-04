<template>
  <div class="mt-5 mb-5">
    <div class="row mb-5 mt-5">
      <div class="col">
        <FloatLabel>
          <InputText
            class="w-100"
            id="container"
            type="text"
            v-model="containerNo"
          />
          <label for="container">Container No</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <InputText class="w-100" id="line" type="text" v-model="line" />
          <label for="line">Line</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <DatePicker
            class="w-100"
            v-model="eta_date"
            inputId="eta_date"
            style="z-index: 99"
            dateFormat="dd/mm/yy"
          />
          <label for="eta_date">Estimated Date</label>
        </FloatLabel>
      </div>
      <div class="col">
        <Button
          type="button"
          severity="danger"
          @click="eta_date = null"
          label="Clear"
        />
      </div>
      <div class="col">
        <Checkbox v-model="checkedSendingForm" :binary="true" />
        <span v-if="checkedSendingForm">Sent</span>
        <span v-else>Not Sent</span>
      </div>
      <!--
        [TAKIP-1] ETIKET TERSTI (upstream f22fe601b ile duzeltildi).

        Isaretli = TAKIP EDILIYOR (SiparislerTB.Takip = 1). Eskiden
        Takip = 1 olan kayitta "Unfollow" yaziyordu; kullanici onu
        "takibi kaldir" sanip isareti kaldiriyor, satir da Follow
        listesinden dusuyordu -- yani etiket kullaniciyi tam ters
        yone yonlendiriyordu.
      -->
      <div class="col">
        <Checkbox v-model="checkedFollowForm" :binary="true" />
        <span v-if="checkedFollowForm">Follow</span>
        <span v-else>Unfollow</span>
      </div>
    </div>

    <!--
      Yuklemenin yapildigi acente ve konteynerin takip edilecegi site.
      Liste AcenteTB tablosundan gelir (api/sql/AcenteTB.sql); script
      calistirilmadiysa uc bos liste doner ve dropdown bos gorunur.

      <Dropdown> -> <Select>: PrimeVue 4'te yeniden adlandirildi.
    -->
    <div class="row mb-3">
      <div class="col">
        <Select
          class="w-100"
          v-model="selectedAgency"
          :options="agencyList"
          optionLabel="AcenteAdi"
          dataKey="ID"
          placeholder="Agency / Tracking Site"
          :showClear="true"
          :filter="true"
          filterPlaceholder="Search agency"
          :emptyMessage="
            agencyList.length ? 'No results' : 'Agency list is empty'
          "
        />
      </div>
      <div class="col">
        <a
          v-if="trackingLink"
          :href="trackingLink"
          target="_blank"
          rel="noopener noreferrer"
          class="p-button p-button-text p-button-sm"
        >
          <i class="pi pi-external-link mr-1"></i>
          Track on {{ selectedAgency.AcenteAdi }}
        </a>
        <small v-else-if="selectedAgency" style="color: #999">
          {{
            selectedAgency.TakipUrl
              ? 'Enter the container no to build the tracking link'
              : 'No tracking site saved for this agency'
          }}
        </small>
      </div>
    </div>

    <Button
      type="button"
      severity="success"
      class="w-100 mt-5"
      label="Save"
      @click="save"
    />
  </div>
</template>

<script>
import { useContainerStore } from "~/stores/container"
import { toIsoDate, fromIsoDate } from "~/utils/dates"

export default {
  props: {
    model: {
      type: Object,
      required: true,
    },
  },

  computed: {
    containerStore() {
      return useContainerStore()
    },

    agencyList() {
      return this.containerStore.getContainerAgencyList || []
    },

    /*
     * Takip adresindeki {KONTEYNER} yer tutucusu konteyner
     * numarasiyla doldurulur; yer tutucu yoksa adres oldugu gibi
     * kullanilir. Numara henuz girilmediyse link URETILMEZ (null),
     * yoksa yer tutucusu duran kirik bir adres aciliyordu.
     */
    trackingLink() {
      const url = this.selectedAgency && this.selectedAgency.TakipUrl
      if (!url) return null
      if (url.indexOf("{KONTEYNER}") === -1) return url
      const no = (this.containerNo || "").trim()
      if (!no) return null
      return url.split("{KONTEYNER}").join(encodeURIComponent(no))
    },
  },

  data() {
    return {
      eta_date: null,
      checkedSendingForm: false,
      checkedFollowForm: false,
      line: null,
      containerNo: null,
      selectedAgency: null,
    }
  },

  created() {
    this.containerNo = this.model.KonteynerNo
    this.line = this.model.Line

    /*
     * DUZELTILDI -- TAKVIME DIZGE VERILIYORDU.
     *
     * Nuxt 2'de burada `date.dateToString(this.model.Eta)` cagriliyordu,
     * yani eta_date'e "2026-10-02" DIZGESI yaziliyordu. Ama eta_date bir
     * DatePicker'in v-model'i ve o bir Date nesnesi bekliyor; ustelik
     * bilesenin dateFormat'i "dd/mm/yy", yani dizge bicimi ile de
     * uyusmuyordu. Sonuc: mevcut tahmini tarih takvimde DOGRU
     * GOSTERILMIYORDU.
     *
     * Dogru yon: ISO dizge -> Date, yani fromIsoDate. Kaydetmede ters
     * yon (toIsoDate) kullaniliyor; cift zaten boyle eslesiyor.
     */
    this.eta_date = fromIsoDate(this.model.Eta)

    this.checkedSendingForm =
      this.model.KonsimentoDurum == null || !this.model.KonsimentoDurum
        ? false
        : true
    /*
     * [TAKIP-2] Takip NULL ise TAKIP EDILIYOR sayilir.
     *
     * SiparislerTB.Takip yeni siparislerde NULL geliyor. Eski kod
     * NULL'i false sayiyordu; sunucu tarafi ise listeyi
     * `isnull(s.Takip, 1) = 1` ile suzuyor, yani NULL kaydi TAKIP
     * EDILIYOR kabul ediyor. Iki taraf celisiyordu: satir listede
     * gorunuyor ama formu acildiginda isaret BOS geliyordu ve
     * kullanici kaydedince kayit listeden dusuyordu.
     * Sunucuyla ayni kurala getirildi.
     */
    this.checkedFollowForm =
      this.model.Takip == null ? true : !!this.model.Takip

    this.syncAgency()
  },

  watch: {
    /* Acente listesi istek bitince dolar; secili acenteyi O ANDA
     * eslestirmek gerekiyor, yoksa dropdown bos gorunur. */
    agencyList: "syncAgency",
  },

  methods: {
    /* model.AcenteID -> listedeki nesne. Dropdown nesne ile
     * calistigi icin ID'den nesneye cevirmek gerekiyor. */
    syncAgency() {
      if (this.model.AcenteID == null) {
        this.selectedAgency = null
        return
      }
      this.selectedAgency =
        this.agencyList.find(
          (x) => Number(x.ID) === Number(this.model.AcenteID),
        ) || null
    },

    save() {
      this.containerStore.setContainerFollowSave({
        EtaTarihi: this.eta_date == null ? null : toIsoDate(this.eta_date),
        KonsimentoDurum: this.checkedSendingForm,
        Takip: this.checkedFollowForm,
        Line: this.line,
        /* Sunucu alan adi TURKCE 'ı' iceriyor -- birebir korundu. */
        KonteynırNo: this.containerNo,
        SiparisNo: this.model.SiparisNo,
        AcenteID: this.selectedAgency ? this.selectedAgency.ID : null,
      })
    },
  },
}
</script>

<!--
  components/container/FollowForm.vue
  (Nuxt 2: components/container/follow/form.vue)

  Etiket adi <ContainerFollowForm>.

  === BU BILESEN NUXT 2'DE HIC CALISMIYORDU ===

  pages/operation/follow.vue ve unfollow.vue sablonlarinda
  `<containerFollowForm />` yaziyor, ama bu ad plugins/components.js'te
  KAYITLI DEGILDI -- tum depoda tek bir `Vue.component("containerFollowForm", ...)`
  ya da import satiri yok (yalnizca o iki sablonda geciyor).

  Nuxt 2'de cozulemeyen bir bilesen etiketi Vue'da YALNIZCA konsol
  uyarisi olur; sayfa hatasiz render edilir ve bilesen SESSIZCE YOK olur.
  Yani iki ekranda da "Detail" satirina tiklayip acilan dialog BOS
  geliyordu: konteyner no, hat, tahmini tarih ve iki onay kutusu hic
  gorunmuyordu, dolayisiyla takip bilgisi bu ekranlardan HIC
  kaydedilemiyordu.

  Nuxt 3+ auto-import adi DOSYA YOLUNDAN urettigi icin bu dosya artik
  kendiliginden cozuluyor -- tasima hatayi dolayli olarak duzeltiyor.
  (tools/codemods/check-component-tags.mjs tam bu sinifi yakalamak icin
   yazilmisti ve bu agacta 1843 etiketin tamamini cozuyor.)

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] import date from "../../../plugins/date"
         -> import { toIsoDate, fromIsoDate } from "~/utils/dates"
      ESLEME BIREBIR: date.dateToString = toIsoDate (yil-ay-gun),
      date.stringToDate = fromIsoDate.

  [x] created()'da dateToString -> fromIsoDate  (gerekcesi created icinde)

  [x] <Calendar> -> <DatePicker>   (PrimeVue 4 adi)

  [x] <span class="p-float-label"> -> <FloatLabel>   (uc yerde)
      Sinif PrimeVue 4'te tamamen kaldirildi; stilsiz span olarak render
      edilip etiketler girdilerin uzerine yuzmek yerine akista kaliyordu.

  [x] p-button-danger / p-button-success -> severity
      Sinif ailesi v4'te kaldirildi; birakilsa Clear ve Save AYNI
      (varsayilan) renkte olurdu.

  [x] this.$store.dispatch("setContainerFollowSave", data)
         -> containerStore.setContainerFollowSave(...)
      Store pilota BU COMMIT'TE eklendi (app/stores/container.ts).

  [x] props.model required:false -> required:true
      created() kosulsuz model.KonteynerNo okuyor; prop gelmezse patlar.
      Iki sayfada da v-if eklendi, yani davranis degismiyor.

  DIKKAT -- KASITLI OLARAK DEGISTIRILMEDI:
      Okunan ve yazilan alan adlari FARKLI: created() `model.Eta` okuyor,
      save() ise `EtaTarihi` gonderiyor. Ayrica okunan `KonteynerNo`
      (normal "e"), yazilan `KonteynırNo` (Turkce "ı"). Ikisi de sunucu
      sozlesmesi; degistirmek api/index.js'i degistirmek demek.
-->
