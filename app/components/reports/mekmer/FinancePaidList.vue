<template>
  <div>
    <DataTable :value="list"

    >
      <Column field="Tarih" header="Date" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ dateToString(slotProps.data.Tarih) }}
        </template>
      </Column>
      <Column
        field="SiparisNo"
        header="Po"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="Aciklama"
        header="Explanation"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="Tutar"
        header="Payment Received"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.Tutar) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(total) }}
        </template>
      </Column>
      <Column
        field="Masraf"
        header="Cost"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.Masraf) }}
        </template>
      </Column>
      <Column field="Kur" header="Rate" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.Kur) }}
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
  methods:{

  },

  watch: {
    list() {
      this.total = 0;
      this.list.forEach((x) => {
        this.total += x.Tutar;
      });
    },
  },
};
</script>
