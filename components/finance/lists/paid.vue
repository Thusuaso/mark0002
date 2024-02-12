<template>
  <div>
    <DataTable :value="list">
      <Column field="Tarih" header="Tarih">
        <template #body="slotProps">
          {{ slotProps.data.Tarih | dateToString }}
        </template>
      </Column>
      <Column field="SiparisNo" header="Po"></Column>
      <Column field="Aciklama" header="Açıklama"></Column>
      <Column field="Tutar" header="Tutar">
        <template #body="slotProps">
          {{ slotProps.data.Tutar | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total | formatPriceUsd }}
        </template>
      </Column>
      <Column field="Masraf" header="Masraf">
        <template #body="slotProps">
          {{ slotProps.data.Masraf | formatPriceUsd }}
        </template>
      </Column>
      <Column field="Kur" header="Kur">
        <template #body="slotProps">
          {{ slotProps.data.Kur | formatPriceUsd }}
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
  },
  data() {
    return {
      total: 0,
    };
  },

  watch: {
    list() {
      this.total = 0;
      this.list.forEach((x) => {
        console.log(x);
        this.total += x.Tutar;
      });
    },
  },
};
</script>
