<template>
  <div>
    <DataTable :value="list" class="p-datatable-sm" :loading="loading">
      <Column field="OcakAdi" header="Ocak"></Column>
      <Column field="M2" header="M2">
        <template #body="slotProps">
          {{ slotProps.data.M2 | formatDecimal }}
        </template>
      </Column>
      <Column field="MT" header="MT">
        <template #body="slotProps">
          {{ slotProps.data.MT | formatDecimal }}
        </template>
      </Column>
      <Column field="Adet" header="Adet">
        <template #body="slotProps">
          {{ slotProps.data.Adet | formatDecimal }}
        </template>
      </Column>
      <Column field="KasaAdedi" header="Kasa Adedi">
        <template #body="slotProps">
          {{ slotProps.data.KasaAdedi | formatDecimal }}
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
    loading: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      selectedMineList: null,
    };
  },
  methods: {},
};
</script>
