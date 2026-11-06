<template>
  <div class="col">
    <!--
      `table-scroll-x` -- DAR KOLONDA SAYILAR BOLUNUYORDU.

      Bu bilesen `v-for` ile bir `<div class="row">` icine
      tekrar tekrar basiliyor ve koku `<div class="col">`; yani
      kac ogе varsa o kadar kolon yan yana diziliyor ve her
      birine genisligin 1/N'i dusuyor.

      O dar kolonda varsayilan kural (app.css: table-layout fixed
      + overflow-wrap anywhere) para degerlerini bosluk olmadigi
      icin rakam ortasindan kiriyor; satir yuksekligi artinca tek
      satirlik komsu hucreler "asagi kaymis" goruluyor.

      Ayni kok neden ve ayni cozum: GuContinentOrders.vue,
      MkByCustomerList.vue, SummaryDetailList.vue.
    -->
    <DataTable
      :value="list"
      class="p-datatable-sm table-scroll-x"
      v-model:selection="selectedOrderList"
      selectionMode="single"
      @row-click="$emit('order_selected_list_emit', $event.data)"
    >
      <template #header> {{ year }} {{ status }} Summary</template>
      <Column
        field="Month"
        header="Month"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ monthToString(slotProps.data.Month) }}
        </template>
      </Column>
      <Column field="FOB" header="FOB" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.FOB) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(total.fob) }}
        </template>
      </Column>
      <Column field="DDP" header="DDP" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.DDP) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(total.ddp) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      required: false,
    },
    year: {
      type: Number,
      required: false,
    },
    total: {
      type: Object,
      required: false,
    },
  
    status: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      selectedOrderList: null,
    };
  },
};
</script>
