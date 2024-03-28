<template>
  <div class="container">
    <Button type="button" class="p-button-success w-100" @click="newForm" label="New" />
    <bgpLists :bgpLists="getBgpLists" @bgp_detail_dialog_form="bgpDetailList($event)" />
    <Dialog
      :visible.sync="bgp_new_dialog"
      modal
      header="New Bgp"
      :contentStyle="{ overflow: 'visible' }"
    >
      <bgpNewForm
        :countryList="getCountryList"
        @closed_bgp_dialog="bgp_new_dialog = false"
      />
    </Dialog>
    <Dialog :visible.sync="bgp_detail_list_dialog" modal :header="bgp_project_name">
      <bgpDetailList @bgp_detail_form_dialog="bgpDetailForm($event)" />
    </Dialog>
    <Dialog :visible.sync="bgp_detail_form_dialog_vis" modal>
      <bgpDetailForm
        :formData="bgpDetailFormData"
        :projectName="bgp_project_name"
        @bgp_detail_form_dialog_closed="bgp_detail_form_dialog_vis = false"
      />
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  middleware: ["authority"],
  computed: {
    ...mapGetters(["getCountryList", "getBgpLists"]),
  },
  data() {
    return {
      bgp_new_dialog: false,
      bgp_detail_list_dialog: false,
      bgp_project_name: null,
      bgp_detail_form_dialog_vis: false,
      bgpDetailFormData: [],
    };
  },
  created() {
    this.$store.dispatch("setBgpList");
  },
  methods: {
    bgpDetailForm(event) {
      this.bgpDetailFormData = event;
      this.bgp_detail_form_dialog_vis = true;
    },
    bgpDetailList(event) {
      this.bgp_project_name = event.ProjectName;
      this.bgp_detail_list_dialog = true;
      this.$store.dispatch("setBgpDetailList", event.ProjectName);
    },
    newForm() {
      this.bgp_new_dialog = true;
      this.$store.dispatch("setCountryList");
    },
  },
};
</script>
