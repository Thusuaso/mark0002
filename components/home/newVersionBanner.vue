<template>
  <div v-if="visible" class="card border-left-primary shadow mb-4 newVersionCard">
    <div class="card-body d-flex flex-wrap align-items-center justify-content-between">
      <div class="mr-3">
        <div class="h6 mb-1 text-primary newVersionTitle">
          <i class="fas fa-rocket mr-2"></i>
          GOZ V2 is live!
        </div>
        <div class="text-gray-800 newVersionText">
          The new version of the platform is now available at
          <strong>gozv2.mekmar.com</strong> with a refreshed interface and
          improved performance.
        </div>
      </div>
      <div class="newVersionActions">
        <a
          class="btn btn-primary"
          href="https://gozv2.mekmar.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to GOZ V2
        </a>
        <button type="button" class="btn btn-link text-gray-800" @click="dismiss">
          Dismiss
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const STORAGE_KEY = "gozv2BannerDismissed";

export default {
  data() {
    return {
      visible: false,
    };
  },
  mounted() {
    try {
      this.visible = localStorage.getItem(STORAGE_KEY) !== "1";
    } catch (e) {
      this.visible = true;
    }
  },
  methods: {
    dismiss() {
      this.visible = false;
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch (e) {}
    },
  },
};
</script>

<style scoped>
.newVersionCard {
  border-left: 4px solid #4e73df;
}
.newVersionText {
  font-size: 13px;
  max-width: 720px;
}
.newVersionActions {
  white-space: nowrap;
}
</style>
