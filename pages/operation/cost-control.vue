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
// Eğer Nuxt auto-import aktif değilse bileşeni manuel eklemeniz gerekir:
// import mekmarCostForm from '@/components/mekmarCostForm.vue';

export default {
  // components: { mekmarCostForm },
  data() {
    return {
      cost_control_visible: false,
      cost_control_header: "Cost Control",
      status: false,
    };
  },
  methods: {
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
