<template>
  <div>
    <DataTable :value="list" class="p-datatable-sm" >
      <Column
        field="SiparisTarihi"
        header="Date"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ dateToString(slotProps.data.SiparisTarihi) }}
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
          {{ formatPriceUsd(slotProps.data.Fob) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(total.fob) }}
        </template>
      </Column>
      <Column
        field="NavlunSatis"
        header="Freight"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.NavlunSatis) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(total.freight) }}
        </template>
      </Column>
      <Column
        field="DetayTutar_1"
        header="Detail 1"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.DetayTutar_1) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(total.detail1) }}
        </template>
      </Column>
      <Column
        field="DetayTutar_2"
        header="Detail 2"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.DetayTutar_2) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(total.detail2) }}
        </template>
      </Column>
      <Column
        field="DetayTutar_3"
        header="Detail 3"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.DetayTutar_3) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(total.detail3) }}
        </template>
      </Column>
      <Column
        field="DetayTutar_4"
        header="Detail 4"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.DetayTutar_4) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(total.detail4) }}
        </template>
      </Column>
      <Column field="Ddp" header="Ddp" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.Ddp) }}
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
      required: true,
    },
    total: {
      type: Object,
      required: true,
    },

  },
};
</script>
