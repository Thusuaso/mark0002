<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <Button
          type="button"
          class="p-button-success w-100"
          label="New"
          @click="newForm"
        />
      </div>
      <div class="col">
        <Dropdown
          v-model="selectedYear"
          :options="getSampleYearList"
          optionLabel="Yil"
          @change="yearSelected($event)"
          class="w-100"
        />
      </div>
    </div>
    <sampleList
      :list="getSampleList"
      @sample_selected_list="sampleSelectedList($event)"
      :loading="getLoading"
    />
    <Dialog
      :visible.sync="sample_form_dialog"
      :header="''"
      modal
      :style="{ width: '100%' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <sampleForm
        :model="model"
        :customers="getCustomersOfferList"
        :country="getCountryList"
        :users="getUserList"
        :category="getSampleCategoryList"
        :unit="getSampleUnitList"
        :sending="getSampleSendingList"
        :bank="getSampleBankAccountTypeList"
        :paid="getSamplePaidList"
        @process="process($event)"
        :status="getSampleButtonStatus"
        @delete_process="deleteProcess($event)"
      />
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  middleware: ["authority"],
  computed: {
    ...mapGetters([
      "getSampleList",
      "getSampleYearList",
      "getSampleModel",
      "getCustomersOfferList",
      "getCountryList",
      "getUserList",
      "getSampleCategoryList",
      "getSampleUnitList",
      "getSampleSendingList",
      "getSampleBankAccountTypeList",
      "getSamplePaidList",
      "getSampleButtonStatus",
      "getLoading",
    ]),
  },
  beforeCreate() {
    this.$store.dispatch("setSampleList");
  },
  data() {
    return {
      selectedYear: { Yil: new Date().getFullYear() },
      sample_form_dialog: false,
      model: {},
    };
  },
  methods: {
    sampleSelectedList(event) {
      this.model = event.data;
      this.$store.dispatch("setSampleButtonStatus", false);
      this.$store.dispatch("setSampleDetailPaidList", this.model.NumuneNo);
      this.sample_form_dialog = true;
    },
    deleteProcess(event) {
      this.$store.dispatch("setSampleDelete", event);
      this.sample_form_dialog = false;
    },
    process(event) {
      if (this.getSampleButtonStatus) {
        this.save(event);
      } else {
        this.update(event);
      }
    },
    save(event) {
      this.$store.dispatch("setSampleSave", event);
      this.sample_form_dialog = false;
    },
    update(event) {
      this.$store.dispatch("setSampleUpdate", event);
      this.sample_form_dialog = false;
    },
    yearSelected(event) {
      this.$store.dispatch("setSampleListYear", event.value.Yil);
    },
    newForm() {
      this.$store.dispatch("setSampleModel");
      this.$store.dispatch("setSampleButtonStatus", true);
      this.model = this.getSampleModel;
      this.sample_form_dialog = true;
    },
  },
};
</script>
