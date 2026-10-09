<template>
  <div>
    <div v-if="list.length == 0" class="missing-empty">
      <i class="pi pi-check-circle"></i>
      <span>Eksik zorunlu evrak yok.</span>
    </div>
    <div v-else>
      <div
        v-for="order in list"
        :key="order.SiparisNo"
        class="missing-card"
        @click="orderSelected(order)"
      >
        <div class="missing-card-top">
          <span class="missing-po">{{ order.SiparisNo }}</span>
          <span v-if="order.TeslimTur" class="missing-tag">{{
            order.TeslimTur
          }}</span>
          <span class="missing-count">{{ order.EksikSayi }}</span>
        </div>
        <div class="missing-customer">{{ order.MusteriAdi }}</div>
        <div class="missing-meta">
          {{ order.YuklemeTarihi | dateToString }}
          <template v-if="order.Sorumlu"> · {{ order.Sorumlu }}</template>
        </div>
        <div class="missing-chips">
          <span
            v-for="document in order.EksikEvraklar"
            :key="document.ID"
            class="missing-chip"
            >{{ document.EvrakAdi }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  methods: {
    orderSelected(order) {
      this.$emit("missing_document_selected_emit", order);
    },
  },
};
</script>
<style scoped>
.missing-empty {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 6px;
  background-color: rgb(240, 250, 240);
  border-left: 4px solid rgb(46, 125, 50);
  color: rgb(27, 94, 32);
  font-size: 12px;
}
.missing-card {
  padding: 8px 10px;
  margin-bottom: 8px;
  border: 1px solid rgb(228, 228, 228);
  border-left: 4px solid rgb(198, 40, 40);
  border-radius: 6px;
  background-color: white;
  cursor: pointer;
}
.missing-card:hover {
  background-color: rgb(250, 250, 250);
  border-color: rgb(205, 205, 205);
}
.missing-card-top {
  display: flex;
  align-items: center;
  gap: 6px;
}
.missing-po {
  font-weight: bold;
  font-size: 13px;
}
.missing-tag {
  padding: 0 6px;
  border-radius: 8px;
  background-color: rgb(238, 238, 238);
  color: rgb(90, 90, 90);
  font-size: 10px;
  line-height: 16px;
}
.missing-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 18px;
  margin-left: auto;
  padding: 0 6px;
  border-radius: 9px;
  background-color: rgb(198, 40, 40);
  color: white;
  font-size: 11px;
  font-weight: bold;
}
.missing-customer {
  margin-top: 1px;
  font-size: 12px;
  color: rgb(60, 60, 60);
}
.missing-meta {
  margin-bottom: 5px;
  font-size: 10px;
  color: rgb(140, 140, 140);
}
.missing-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.missing-chip {
  display: inline-block;
  padding: 1px 8px;
  border-radius: 10px;
  background-color: rgb(253, 243, 243);
  border: 1px solid rgb(226, 169, 169);
  color: rgb(142, 32, 32);
  font-size: 10px;
  line-height: 16px;
}
</style>
