<template>
  <div class="container">
    <containerFollowList
      :list="getContainerFollowList"
      @follow-selected-dialog-emit="followSelectedDialogEmit($event)"
      :loading="getLoading"
    />
    <Dialog :visible.sync="follow_dialog_form" header="" modal>
      <containerFollowForm :model="followModel" />
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      follow_dialog_form: false,
      followModel: null,
    };
  },
  computed: {
    ...mapGetters(["getContainerFollowList", "getLoading"]),
  },
  created() {
    this.$store.dispatch("setContainerFollowList");
  },
  methods: {
    followSelectedDialogEmit(event) {
      this.follow_dialog_form = true;
      this.followModel = event;
    },
  },
};
</script>
