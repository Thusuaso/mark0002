<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="flex flex-column gap-2">
          <label for="customer">Firma Adı</label>
          <InputText id="customer" v-model="formData.FirmaAdi" />
        </div>
      </div>
      <div class="col">
        <div class="flex flex-column gap-2">
          <label for="email">Mail</label>
          <InputText id="email" v-model="formData.Email" />
        </div>
      </div>
      <div class="col">
        <div class="flex flex-column gap-2">
          <label for="phone">Telefon</label>
          <InputText id="phone" v-model="formData.PhoneNumber" />
        </div>
      </div>
    </div>
    <div class="flex flex-wrap gap-3 m-auto">
      <div class="flex align-items-center">
        <RadioButton v-model="ingredient" inputId="ingredient1" value="WrongNumber" />
        <label for="ingredient1" class="ml-2">Numara Yanlış</label>
      </div>
      <div class="flex align-items-center">
        <RadioButton v-model="ingredient" inputId="ingredient2" value="NotResponse" />
        <label for="ingredient2" class="ml-2">Cevap Yok</label>
      </div>
      <div class="flex align-items-center">
        <RadioButton v-model="ingredient" inputId="ingredient3" value="Interested" />
        <label for="ingredient3" class="ml-2">İlgili</label>
      </div>
      <div class="flex align-items-center">
        <RadioButton v-model="ingredient" inputId="ingredient4" value="NotInterested" />
        <label for="ingredient4" class="ml-2">İlgisiz</label>
      </div>
    </div>
    <div class="flex flex-wrap gap-3 m-auto">
      <div class="flex align-items-center">
        <RadioButton v-model="customerDegree" inputId="ingredient1" value="Contractor" />
        <label for="ingredient1" class="ml-2">Contractor</label>
      </div>
      <div class="flex align-items-center">
        <RadioButton v-model="customerDegree" inputId="ingredient2" value="Architech" />
        <label for="ingredient2" class="ml-2">Architech</label>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="flex flex-column gap-2">
          <label for="title">Başlık</label>
          <InputText id="title" v-model="formData.Baslik" />
        </div>
      </div>
      <div class="col">
        <div class="flex flex-column gap-2">
          <label for="reminderdate">H.Tarihi</label>
          <Calendar id="reminderdate" v-model="reminderdate" dateFormat="dd/mm/yy" />
        </div>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col">
        <span class="p-float-label">
          <Textarea v-model="formData.Aciklama" class="w-100 h-75" rows="5" />
          <label>Açıklama</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <Textarea v-model="formData.HatirlatmaAciklama" class="w-100 h-75" rows="5" />
          <label>H.Açıklama</label>
        </span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <Button
          type="button"
          class="p-button-success w-100"
          label="Kaydet"
          @click="saveProcess"
        />
      </div>
      <div class="col" v-if="!getBgpDetailButtonStatus">
        <Button
          type="button"
          class="p-button-danger w-100"
          label="Sil"
          @click="deleteForm"
        />
      </div>
    </div>
  </div>
</template>
<script>
import date from "../../../plugins/date";
import { mapGetters } from "vuex";
import Cookies from "js-cookie";

export default {
  props: {
    formData: {
      type: Object,
      required: false,
    },
    projectName: {
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapGetters(["getBgpDetailButtonStatus"]),
  },
  data() {
    return {
      ingredient: null,
      customerDegree: null,
      reminderdate: null,
    };
  },
  created() {
    if (!this.getBgpDetailButtonStatus) {
      this.createdProcess();
    }
  },
  methods: {
    saveProcess() {
      if (this.getBgpDetailButtonStatus) {
        this.save();
      } else {
        this.update();
      }
    },
    save() {
      if (this.ingredient == "WrongNumber") {
        this.formData.WrongNumber = true;
        this.formData.NotResponse = false;
        this.formData.Interested = false;
        this.formData.NotInterested = false;
      } else if (this.ingredient == "NotResponse") {
        this.formData.WrongNumber = false;
        this.formData.NotResponse = true;
        this.formData.Interested = false;
        this.formData.NotInterested = false;
      } else if (this.ingredient == "Interested") {
        this.formData.WrongNumber = false;
        this.formData.NotResponse = false;
        this.formData.Interested = true;
        this.formData.NotInterested = false;
      } else if (this.ingredient == "NotInterested") {
        this.formData.WrongNumber = false;
        this.formData.NotResponse = false;
        this.formData.Interested = false;
        this.formData.NotInterested = true;
      }
      if (this.customerDegree == "Contractor") {
        this.formData.Unvan = "contractor";
      } else if (this.customerDegree == "Architech") {
        this.formData.Unvan = "architect";
      }
      this.formData.HatirlatmaTarihi = date.dateToString(this.reminderdate);
      this.formData.KayitTarihi = date.dateToString(new Date());
      this.formData.ProjectName = this.projectName;
      this.formData.Temsilci = Cookies.get("userId");
      this.$store.dispatch("setBgpDetailSave", this.formData);
      this.$emit("bgp_detail_form_dialog_closed");
    },
    update() {
      if (this.ingredient == "WrongNumber") {
        this.formData.WrongNumber = true;
        this.formData.NotResponse = false;
        this.formData.Interested = false;
        this.formData.NotInterested = false;
      } else if (this.ingredient == "NotResponse") {
        this.formData.WrongNumber = false;
        this.formData.NotResponse = true;
        this.formData.Interested = false;
        this.formData.NotInterested = false;
      } else if (this.ingredient == "Interested") {
        this.formData.WrongNumber = false;
        this.formData.NotResponse = false;
        this.formData.Interested = true;
        this.formData.NotInterested = false;
      } else if (this.ingredient == "NotInterested") {
        this.formData.WrongNumber = false;
        this.formData.NotResponse = false;
        this.formData.Interested = false;
        this.formData.NotInterested = true;
      }
      if (this.customerDegree == "Contractor") {
        this.formData.Unvan = "contractor";
      } else if (this.customerDegree == "Architech") {
        this.formData.Unvan = "architect";
      }
      this.formData.HatirlatmaTarihi = date.dateToString(this.reminderdate);
      this.$store.dispatch("setBgpDetailUpdate", this.formData);
    },
    deleteForm() {
      if (confirm("Silme işlemini onaylıyor musunuz?")) {
        this.$store.dispatch("setBgpDetailDelete", this.formData.ID);
        this.$emit("bgp_detail_form_dialog_closed");
      }
    },
    createdProcess() {
      if (this.formData.WrongNumber == true) {
        this.ingredient = "WrongNumber";
      } else if (this.formData.NotResponse == true) {
        this.ingredient = "NotResponse";
      } else if (this.formData.Interested == true) {
        this.ingredient = "Interested";
      } else if (this.formData.NotInterested == true) {
        this.ingredient = "NotInterested";
      }
      if (this.formData.Unvan == "contractor") {
        this.customerDegree = "Contractor";
      } else if (this.formData.Unvan == "architect") {
        this.customerDegree = "Architech";
      }
      this.reminderdate = date.stringToDate(this.formData.HatirlatmaTarihi);
    },
  },
};
</script>
