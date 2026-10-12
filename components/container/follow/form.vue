<template>
  <div class="mt-5 mb-5">
    <div class="row mb-5 mt-5">
      <div class="col">
        <span class="p-float-label">
          <InputText class="w-100" id="container" type="text" v-model="containerNo" />
          <label for="container">Container No</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText class="w-100" id="line" type="text" v-model="line" />
          <label for="line">Line</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <Calendar
            class="w-100"
            v-model="eta_date"
            inputId="eta_date"
            style="z-index: 99"
            dateFormat="dd/mm/yy"
          />
          <label for="eta_date">Estimated Date</label>
        </span>
      </div>
      <div class="col">
        <Button
          type="button"
          class="p-button-danger"
          @click="eta_date = null"
          label="Clear"
        />
      </div>
      <div class="col">
        <Checkbox v-model="checkedSendingForm" :binary="true" />
        <span v-if="checkedSendingForm">Sent</span> <span v-else>Not Sent</span>
      </div>
      <!-- Isaretli = takip ediliyor (SiparislerTB.Takip = 1). Etiket eskiden
           tersti: Takip = 1 olan kayitta "Unfollow" yaziyordu, kullanici da
           kaldirdiginda satir Follow listesinden dusuyordu. -->
      <div class="col">
        <Checkbox v-model="checkedFollowForm" :binary="true" />
        <span v-if="checkedFollowForm">Follow</span> <span v-else>Unfollow</span>
      </div>
    </div>

    <!-- Yuklemenin yapildigi acente ve konteynerin takip edilecegi site.
         Liste AcenteTB tablosundan gelir (api/sql/AcenteTB.sql). -->
    <div class="row mb-3">
      <div class="col">
        <Dropdown
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
              ? "Enter the container no to build the tracking link"
              : "No tracking site saved for this agency"
          }}
        </small>
      </div>
    </div>

    <Button
      type="button"
      class="p-button-success w-100 mt-5"
      label="Save"
      @click="save"
    />
  </div>
</template>
<script>
import date from "../../../plugins/date";
export default {
  props: {
    model: {
      type: Object,
      required: false,
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
    };
  },
  computed: {
    agencyList() {
      return this.$store.getters.getContainerAgencyList || [];
    },
    // Takip adresindeki {KONTEYNER} yer tutucusu konteyner numarasiyla
    // doldurulur; yer tutucu yoksa adres oldugu gibi kullanilir.
    trackingLink() {
      const url = this.selectedAgency && this.selectedAgency.TakipUrl;
      if (!url) return null;
      if (url.indexOf("{KONTEYNER}") === -1) return url;
      const no = (this.containerNo || "").trim();
      if (!no) return null;
      return url.split("{KONTEYNER}").join(encodeURIComponent(no));
    },
  },
  created() {
    this.containerNo = this.model.KonteynerNo;
    this.line = this.model.Line;
    this.eta_date = date.dateToString(this.model.Eta);
    this.checkedSendingForm =
      this.model.KonsimentoDurum == null || !this.model.KonsimentoDurum ? false : true;
    // Takip NULL ise yeni siparis demektir ve takip ediliyor sayilir
    // (api/index.js, isnull(s.Takip, 1) = 1 ile ayni kural).
    this.checkedFollowForm = this.model.Takip == null ? true : !!this.model.Takip;
    this.syncAgency();
  },
  watch: {
    // Liste istek bitince dolar; secili acenteyi o anda eslestirmek gerekir.
    agencyList: "syncAgency",
  },
  methods: {
    syncAgency() {
      if (this.model.AcenteID == null) {
        this.selectedAgency = null;
        return;
      }
      const found = this.agencyList.find(
        (x) => Number(x.ID) === Number(this.model.AcenteID)
      );
      this.selectedAgency = found || null;
    },
    save() {
      let eta = null;
      if (this.eta_date == null) {
        eta = null;
      } else {
        eta = date.dateToString(this.eta_date);
      }
      const data = {
        EtaTarihi: eta,
        KonsimentoDurum: this.checkedSendingForm,
        Takip: this.checkedFollowForm,
        Line: this.line,
        KonteynırNo: this.containerNo,
        SiparisNo: this.model.SiparisNo,
        AcenteID: this.selectedAgency ? this.selectedAgency.ID : null,
      };
      this.$store.dispatch("setContainerFollowSave", data);
    },
  },
};
</script>
