<template>
  <div class="container">
    <div>
      <representativeList
        :list="getRepresentativeList"
        :orderer="getTotalRepresentative"
        :operation="getTotalOperation"
        @representative_form_emit="representativeFormEmit($event)"
      />
    </div>
    <Dialog
      :visible.sync="representative_form_dialog"
      modal
      :header="representativeOrderNo"
    >
      <representativeForm :users="getUserList" :data="representativeModelData" />
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  middleware: ["authority"],
  computed: {
    ...mapGetters([
      "getRepresentativeList",
      "getTotalRepresentative",
      "getTotalOperation",
      "getUserList",
    ]),
  },
  data() {
    return {
      representative_form_dialog: false,
      representativeModelData: null,
      representativeOrderNo: null,
    };
  },
  created() {
    this.$store.dispatch("setRepresentativeList");
  },
  methods: {
    representativeFormEmit(event) {
      this.representativeModelData = event;
      this.representativeOrderNo = event.SiparisNo;
      this.representative_form_dialog = true;
    },
  },
};
</script>
