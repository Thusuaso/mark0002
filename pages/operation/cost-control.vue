<template>
  <div>
    <div class="row">
      <div class="col">
        <Button
          type="button"
          class="p-button-success"
          label="New"
          @click="newForm"
        />
      </div>
    </div>
    <mekmarCostList @cost_selected_emit="costSelected($event)" />

    <Dialog
      :visible.sync="cost_control_visible"
      :header="cost_control_header"
      modal
    >
      <mekmarCostForm :status="status" />
    </Dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cost_control_visible: false,
      cost_control_header: "Cost Control",
      status: false,
    };
  },
  methods: {
    costSelected(event) {
      this.$store.dispatch("setMekmarCostModel", event);
      this.cost_control_visible = true;
      this.status = false;
      this.cost_control_header = "Update Cost Control";
    },
    newForm() {
      const model = {
        ID: 0,
        Po: "",
        Logistic: false,
        Custom: false,
        Fumigation: false,
        Port: false,
        Insurance: false,
        Lashing: false,
        Spanzlet: false,
        Freight: false,
      };
      this.$store.dispatch("setMekmarCostModel", model);
      this.cost_control_visible = true;
      this.status = true;
      this.cost_control_header = "New Cost Control";
    },
  },
  created() {
    this.$axios
      .get("/reports/mekmar/cost/control/list")
      .then((res) => {
        if (res.data.status) {
          this.$store.dispatch("setMekmarCostList", res.data.data);
        } else {
          this.$toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  },
};
</script>
