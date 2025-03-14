<template>
  <div>
    <Button type="button" class="p-button-success w-100" @click="newForm" label="New" />
    <salesConsiderList
      :list="getSalesPointsOfConsiderList"
      @points_of_consider_selected_emit="pointsOfConsiderSelected($event)"
    />
    <Dialog
      :visible.sync="points_of_consider_dialog"
      header="New Points of Consider"
      modal
    >
      <salesConsiderForm
        :model="model"
        :status="getSalesPointsOfConsiderButtonStatus"
        @point_of_consider_process_emit="process($event)"
        @point_of_consider_delete_emit="deleteForm($event)"
      />
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  // middleware: ["authority"],
  computed: {
    ...mapGetters([
      "getSalesPointsOfConsiderList",
      "getSalesPointOfConsiderModel",
      "getSalesPointsOfConsiderButtonStatus",
    ]),
  },
  data() {
    return {
      points_of_consider_dialog: false,
      model: null,
    };
  },
  created() {
    this.$store.dispatch("setSalesPointsOfConsiderList");
  },
  methods: {
    deleteForm(event) {
      this.$store.dispatch("setSalesPointsOfConsiderDelete", event.ID);
      this.points_of_consider_dialog = false;
    },
    pointsOfConsiderSelected(event) {
      this.$store.dispatch("setSalesPointsOfConsiderButtonStatus", false);
      this.points_of_consider_dialog = true;
      this.model = event.data;
    },
    save(event) {
      this.$store.dispatch("setSalesPointsOfConsiderSave", event);
    },
    update(event) {
      this.$store.dispatch("setSalesPointsOfConsiderUpdate", event);
    },
    process(event) {
      if (this.getSalesPointsOfConsiderButtonStatus) {
        this.save(event);
      } else {
        this.update(event);
      }
    },
    newForm() {
      this.$store.dispatch("setSalesPointsOfConsiderModel");
      this.$store.dispatch("setSalesPointsOfConsiderButtonStatus", true);
      this.points_of_consider_dialog = true;
      this.model = this.getSalesPointOfConsiderModel;
    },
  },
};
</script>
<style scoped></style>
