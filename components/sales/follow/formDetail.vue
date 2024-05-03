<template>
  <div class="row w-100 h-100" style="height: 500px;padding:75px 50px;">
    <div class="col-6">
      <div class="flex flex-column gap-2">
        <label for="savedate">Date</label>
        <Calendar
          id="savedate"
          v-model="saveDate"
          dateFormat="dd/mm/yy"
          @date-select="saveDateSelected($event)"
        />
      </div>
      <div class="flex flex-column gap-2">
        <label for="customer">Customer</label>
        <InputText id="customer" v-model="followDetail.MusteriAdi" />
      </div>
      <span class="p-float-label mt-4">
        <Textarea v-model="followDetail.Aciklama" rows="5" cols="66" />
        <label>Explanation</label>
      </span>
    </div>
    <div class="col-6">
      <div class="flex flex-column gap-2">
        <label for="reminderdate">Reminder Time</label>
        <Calendar
          id="reminderdate"
          v-model="reminderDate"
          dateFormat="dd/mm/yy"
          @date-select="reminderDateSelected($event)"
        />
      </div>
      <div class="flex flex-column gap-2">
        <label for="text">Title</label>
        <InputText id="text" v-model="followDetail.Baslik" />
      </div>
      <span class="p-float-label mt-4">
        <Textarea v-model="followDetail.Hatirlatma_Notu" rows="5" cols="66" />
        <label>Reminder</label>
      </span>
    </div>
    <div class="row">
      <div class="col w-100">
        <Button
          type="button"
          class="p-button-success w-100"
          label="Save"
          @click="saveProcess"
        />
      </div>
      <div v-if="!getFollowDetailNewButton" class="col w-100">
        <Button
          type="button"
          class="p-button-danger w-100"
          label="Delete"
          @click="deleteForm"
        />
      </div>
    </div>
  </div>
</template>
<script>
import convertDate from "../../../plugins/date";
import { mapGetters } from "vuex";
import Cookies from "js-cookie";

export default {
  props: {
    followDetail: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["getFollowDetailNewButton"]),
  },
  data() {
    return {
      saveDate: null,
      reminderDate: null,
    };
  },
  created() {
    if (!this.getFollowDetailNewButton) {
      this.saveDate = convertDate.stringToDate(this.followDetail.Tarih);
      this.reminderDate = convertDate.stringToDate(this.followDetail.Hatirlatma_Tarih);
    } else {
      this.reset();
    }
  },
  methods: {
    reminderDateSelected() {
      this.followDetail.Hatirlatma_Tarih = convertDate.dateToString(this.reminderDate);
    },
    saveDateSelected(event) {
      this.followDetail.Tarih = convertDate.dateToString(event);
    },
    saveProcess() {
      if (this.getFollowDetailNewButton) {
        this.save();
      } else {
        this.update();
      }
    },
    save() {
      this.followDetail.Temsilci = Cookies.get("userId");
      this.$store.dispatch("setFollowDetailSave", this.followDetail);
      this.reset();
    },
    update() {
      this.$store.dispatch("setFollowDetailUpdate", this.followDetail);
    },
    deleteForm() {
      this.$store.dispatch("setFollowDetailDelete", this.followDetail.ID);
      this.$emit("closed_follow_dialog");
      this.reset();
    },
    reset() {
      this.saveDate = null;
      this.reminderDate = null;
      this.followDetail.Aciklama = null;
      this.followDetail.Baslik = null;
      this.followDetail.Hatirlatma_Notu = null;
    },
  },
};
</script>
