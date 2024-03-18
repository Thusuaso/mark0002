<template>
  <div>
    <DataTable :value="list">
      <Column field="Tarih" header="Upload Date">
        <template #body="slotProps">
          {{ slotProps.data.Tarih | dateToString }}
        </template>
      </Column>
      <Column field="Evrak" header="Document Name"></Column>
      <Column field="Link" header="Link">
        <template #body="slotProps">
          <a :href="slotProps.data.Link">
            <i class="pi pi-download"></i>
          </a>
        </template>
      </Column>
      <Column field="kullanici" header="Document Rep"> </Column>
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
  },
};
</script>
