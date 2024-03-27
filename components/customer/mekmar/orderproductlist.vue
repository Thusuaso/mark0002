<template>
  <div class="container">
    <DataTable :value="products">
      <Column
        field="KategoriAdi"
        header="Category"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="UrunAdi"
        header="Product"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="YuzeyIslemAdi"
        header="Surface"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="En"
        header="Width"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="Boy"
        header="Height"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="Kenar"
        header="Edge"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="Miktar"
        header="Amount"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.Miktar | formatDecimal }}
        </template>
      </Column>
      <Column
        field="BirimAdi"
        header="Unit"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="SatisFiyati"
        header="Price"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.SatisFiyati | formatPriceUsd }}
        </template>
      </Column>
      <Column
        field="SatisToplam"
        header="Total"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.SatisToplam | formatPriceUsd }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
export default {
  props: {
    products: {
      type: Array,
      required: false,
    },
  },
};
</script>
