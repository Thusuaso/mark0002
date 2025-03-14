<template>
  <div class="container">
    <containerFollowList
      :list="getContainerUnfollowList"
      @follow-selected-dialog-emit="unfollowSelectedDialogEmit($event)"
    />
    <Dialog :visible.sync="unfollow_dialog_form" header="" modal>
      <containerFollowForm :model="unfollowModel" />
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  // middleware: ["authority"],
  data() {
    return {
      unfollow_dialog_form: false,
      unfollowModel: null,
    };
  },
  computed: {
    ...mapGetters(["getContainerUnfollowList"]),
  },
  created() {
    this.$store.dispatch("setContainerUnfollowList");
  },
  methods: {
    unfollowSelectedDialogEmit(event) {
      this.unfollow_dialog_form = true;
      this.unfollowModel = event;
    },
  },
};
</script>
