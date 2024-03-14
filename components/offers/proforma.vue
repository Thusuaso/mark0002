<template>
  <div>
    <div class="row mt-3 mb-8">
      <div class="col">
        <span class="p-float-label">
          <InputText id="po" type="text" v-model="proforma.po" />
          <label for="po">Po</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <Calendar
            v-model="selectedProformaDate"
            @date-select="proformatDateSelected($event)"
          />
          <label for="po">Proforma Date</label>
        </span>
      </div>
    </div>
    <div class="row mt-3 mb-8">
      <div class="col">
        <CustomInput
          :value="proforma.amount"
          text="Amount"
          @onInput="proforma.amount = $event"
          :disabled="false"
        />
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="desc" type="text" v-model="proforma.description" />
          <label for="desc">Description</label>
        </span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FileUpload
          class="w-100"
          mode="basic"
          @select="proformaUpload($event)"
          chooseLabel="Upload"
        />
      </div>
      <div class="col">
        <a :href="proformaLink" ref="proforma_link"></a>
        <Button
          class="p-button-success h-100"
          @click="$refs.proforma_link.click()"
          :disabled="proforma_link_disabled"
        >
          <i class="pi pi-download"></i>
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import date from "../../plugins/date";
import upload from "../../plugins/upload";
export default {
  props: {
    model: {
      type: Object,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      proforma_link_disabled: true,
      selectedProformaDate: null,
      proforma: {
        po: "",
        date: "",
        amount: 0,
        description: "",
      },
      proformaLink: "",
    };
  },
  created() {
    this.proforma.po = this.model.Proforma_Po_No;
    this.selectedProformaDate = date.stringToDate(this.model.Proforma_Tarih);
    this.proforma.amount = this.model.Proforma_Tutar;
    this.proforma.description = this.model.ProformaNot;
    this.proformaLink = `https://file-service.mekmar.com/file/download/teklif/proforma/${this.id}/${this.model.Proforma_Cloud_Dosya}`;
    if (this.model.Proforma_Cloud) {
      this.proforma_link_disabled = false;
    }
  },
  methods: {
    proformaUpload(event) {
      upload.sendOfferProforma(event.files[0], this.id).then((response) => {
        if (response.Status) {
          const data = {
            id: this.id,
            cloud: 1,
            name: event.files[0].name,
          };
          this.$store
            .dispatch("setOfferProformaUpload", {
              ...this.proforma,
              id: this.id,
              cloud: 1,
              name: event.files[0].name,
            })
            .then((response) => {
              if (response) {
                this.$toast.success("Başarıyla Yüklendi");
                this.proformaLink = `https://file-service.mekmar.com/file/download/teklif/proforma/${this.id}/${event.files[0].name}`;
                this.proforma_link_disabled = false;
              } else {
                this.$toast.error("Yükleme Başarısız");
              }
            });
        } else {
          this.$toast.error("Dosya Yükleme Başarısız.");
        }
      });
    },
    proformatDateSelected(event) {
      this.proforma.date = date.dateToString(event);
    },
  },
};
</script>
