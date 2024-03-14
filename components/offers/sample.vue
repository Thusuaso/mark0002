<template>
  <div>
    <div class="row mt-3">
      <div class="col">
        <span class="p-float-label">
          <Calendar
            v-model="selectedSampleEntryDate"
            @date-select="sampleEntryDateSelected($event)"
          />
          <label for="po">Date of Entry</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <Calendar
            v-model="selectedSampleReminderDate"
            @date-select="sampleReminderDateSelected($event)"
          />
          <label for="po">Reminder Date</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="followno" type="text" v-model="sample.followno" />
          <label for="followno">Follow No</label>
        </span>
      </div>
    </div>

    <div class="row mt-7">
      <div class="col">
        <CustomInput
          :value="sample.paid"
          text="Paid"
          @onInput="sample.paid = $event"
          :disabled="false"
        />
      </div>
      <div class="col">
        <CustomInput
          :value="sample.received"
          text="Received"
          @onInput="sample.received = $event"
          :disabled="false"
        />
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="desc" type="text" v-model="sample.description" />
          <label for="desc">Description</label>
        </span>
      </div>
    </div>
    <div class="row mt-7">
      <div class="col">
        <FileUpload
          class="w-100"
          mode="basic"
          @select="sampleUpload($event)"
          chooseLabel="Upload"
        />
      </div>
      <div class="col">
        <a :href="sampleLink" ref="sample_link"></a>
        <Button
          class="p-button-success h-100"
          @click="$refs.sample_link.click()"
          :disabled="sample_link_disabled"
        >
          <i class="pi pi-download"></i>
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import date from "../../plugins/date.js";
import upload from "../../plugins/upload.js";
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    model: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      sample_link_disabled: false,
      sampleLink: null,
      selectedSampleReminderDate: null,
      selectedSampleEntryDate: null,
      sample: {
        entrydate: null,
        reminderdate: null,
        lastreminderdate: null,
        followno: null,
        paid: 0,
        received: 0,
        description: null,
      },
    };
  },
  created() {
    this.selectedSampleEntryDate = date.stringToDate(this.model.Numune_Giris_Tarihi);
    this.selectedSampleReminderDate = date.stringToDate(
      this.model.Numune_Hatirlatma_Tarihi
    );
    this.sampleLink = `https://file-service.mekmar.com/file/download/teklif/teklifNumune/${this.id}/${this.model.Numune_Cloud_Dosya}`;
    this.sample.followno = this.model.Numune_Tracking_No;
    this.sample.paid = this.model.Numune_Odenen_Tutar;
    this.sample.received = this.model.Numune_Musteriden_Alinan;
    this.sample.description = this.model.NumuneNot;
  },
  methods: {
    sampleUpload(event) {
      upload.sendSampleFile(event.files[0], this.id).then((response) => {
        if (response.Status) {
          this.$store
            .dispatch("setOfferSampleUpload", {
              ...this.sample,
              cloud: 1,
              name: event.files[0].name,
              id: this.id,
            })
            .then((response) => {
              if (response) {
                this.$toast.success("Başarıyla Kaydedildi");
                this.sampleLink = `https://file-service.mekmar.com/file/download/teklif/teklifNumune/${this.id}/${event.files[0].name}`;
              } else {
                this.$toast.error("Kaydetme Başarısız");
              }
            });
        } else {
          this.$toast.error("Dosya Yükleme Başarısız");
        }
      });
    },
    sampleReminderDateSelected(event) {
      this.sample.reminderdate = date.dateToString(event);
      const new_date = new Date(event);
      const day = new_date.getDate() + 3;
      const month = new_date.getMonth() + 1;
      const year = new_date.getFullYear();
      this.sample.lastreminderdate = year + "-" + month + "-" + day;
    },
    sampleEntryDateSelected(event) {
      this.sample.entrydate = date.dateToString(event);
    },
  },
};
</script>
