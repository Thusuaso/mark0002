<template>
  <div class="row">
    <div class="col">
      <DataTable
        :value="contCountList"
        scrollable
        scrollHeight="450px"
        :loading="loading"
      >
        <Column field="UlkeAdi" header="Country"></Column>
        <Column field="KontSayisi" header="Container Piece"></Column>
      </DataTable>
    </div>
    <div class="col">
      <DataTable :value="contCustList" scrollable scrollHeight="450px">
        <Column field="FirmaAdi" header="Customer"></Column>
        <Column field="KontSayisi" header="Container Piece"></Column>
      </DataTable>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    contCountList: {
      type: Array,
      required: false,
    },
    contCustList: {
      type: Array,
      required: false,
    },
    loading: {
      type: Boolean,
      required: false,
    },
  },
};
</script>
