<template>
  <div v-if="po">
    <div v-if="checked && list.length > 0" class="missing-box mb-3">
      <div class="missing-head">
        <i class="pi pi-exclamation-triangle"></i>
        <span>Eksik Zorunlu Evrak</span>
        <span class="missing-count">{{ list.length }}</span>
      </div>
      <div class="missing-chips">
        <span
          v-for="document in list"
          :key="document.ID"
          class="missing-chip"
          >{{ document.EvrakAdi }}</span
        >
      </div>
    </div>
    <div v-else-if="checked" class="missing-ok mb-3">
      <i class="pi pi-check-circle"></i>
      <span>Zorunlu evrakların tamamı yüklenmiş</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    po: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      list: [],
      checked: false,
    };
  },
  watch: {
    po: {
      immediate: true,
      handler() {
        this.refresh();
      },
    },
  },
  methods: {
    // Yukleme sonrasi ebeveyn bu metodu cagirarak uyariyi tazeler
    refresh() {
      this.checked = false;
      this.list = [];
      if (!this.po) {
        return;
      }
      return this.$axios
        .get(`/upload/document/missing/${this.po}`)
        .then((response) => {
          // Ic Piyasa gibi kapsam disi siparislerde uyari hic gosterilmez
          if (response.data.kapsamDisi) {
            this.list = [];
            this.checked = false;
            return;
          }
          this.list = response.data.list;
          this.checked = true;
        })
        .catch(() => {
          this.list = [];
          this.checked = false;
        });
    },
  },
};
</script>
<style scoped>
.missing-box {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 6px;
  background-color: rgb(253, 243, 243);
  border: 1px solid rgb(240, 204, 204);
  border-left: 4px solid rgb(198, 40, 40);
}
.missing-head {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  white-space: nowrap;
  color: rgb(183, 28, 28);
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
}
.missing-head .pi {
  font-size: 13px;
}
.missing-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 18px;
  padding: 0 6px;
  border-radius: 9px;
  background-color: rgb(198, 40, 40);
  color: white;
  font-size: 11px;
}
.missing-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.missing-chip {
  display: inline-block;
  padding: 1px 10px;
  border-radius: 10px;
  background-color: white;
  border: 1px solid rgb(226, 169, 169);
  color: rgb(142, 32, 32);
  font-size: 11px;
  line-height: 18px;
  white-space: nowrap;
}
.missing-ok {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  background-color: rgb(240, 250, 240);
  border: 1px solid rgb(200, 230, 200);
  border-left: 4px solid rgb(46, 125, 50);
  color: rgb(27, 94, 32);
  font-size: 12px;
}
@media screen and (max-width: 576px) {
  .missing-box {
    flex-direction: column;
    gap: 6px;
  }
}
</style>
