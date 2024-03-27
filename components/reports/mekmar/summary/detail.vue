<template>
  <div>
    <DataTable :value="list" class="p-datatable-sm">
      <Column
        field="SiparisTarihi"
        header="Tarih"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.SiparisTarihi | dateToString }}
        </template>
      </Column>
      <Column
        field="SiparisNo"
        header="Po"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="FirmaAdi"
        header="Customer"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="TeslimTur"
        header="Delivery Term"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column field="Fob" header="Fob" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ slotProps.data.Fob | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total.fob | formatPriceUsd }}
        </template>
      </Column>
      <Column
        field="NavlunSatis"
        header="Freight"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.NavlunSatis | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total.freight | formatPriceUsd }}
        </template>
      </Column>
      <Column
        field="DetayTutar_1"
        header="Detail 1"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.DetayTutar_1 | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total.detail1 | formatPriceUsd }}
        </template>
      </Column>
      <Column
        field="DetayTutar_2"
        header="Detail 2"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.DetayTutar_2 | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total.detail2 | formatPriceUsd }}
        </template>
      </Column>
      <Column
        field="DetayTutar_3"
        header="Detail 3"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.DetayTutar_3 | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total.detail3 | formatPriceUsd }}
        </template>
      </Column>
      <Column
        field="DetayTutar_4"
        header="Detail 4"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.DetayTutar_4 | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total.detail4 | formatPriceUsd }}
        </template>
      </Column>
      <Column field="Ddp" header="Ddp" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ slotProps.data.Ddp | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total.ddp | formatPriceUsd }}
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
      required: true,
    },
    total: {
      type: Object,
      required: true,
    },
  },
};
</script>
