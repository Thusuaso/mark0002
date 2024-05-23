<template>
  <div>
    <DataTable
      :value="list"
      responsiveLayout="scroll"
      :paginator="true"
      :rows="10"
      :filters.sync="filteredOldOffers"
      filterDisplay="row"
      :selection="selectedOldOffer"
      selectionMode="single"
      @row-click="$emit('old_offers_selected_emit', $event)"
    >
      <Column field="Sira" header="Id" :showFilterMenu="false" :showClearButton="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="Tarih"
        header="Date"
        :showFilterMenu="false"
        :showClearButton="false"
      >
        <template #body="slotProps">
          {{ slotProps.data.Tarih | dateToString }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="Customer"
        header="Customer"
        :showFilterMenu="false"
        :showClearButton="false"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="Country"
        header="Country"
        :showFilterMenu="false"
        :showClearButton="false"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="Category"
        header="Category"
        :showFilterMenu="false"
        :showClearButton="false"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="Product"
        header="Product"
        :showFilterMenu="false"
        :showClearButton="false"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="Surface"
        header="Surface"
        :showFilterMenu="false"
        :showClearButton="false"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="Size" header="Size" :showFilterMenu="false" :showClearButton="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="Edge"
        header="Thickness"
        :showFilterMenu="false"
        :showClearButton="false"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="Birim"
        header="Unit"
        :showFilterMenu="false"
        :showClearButton="false"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="Price"
        header="Price"
        :showFilterMenu="false"
        :showClearButton="false"
      >
        <template #body="slotProps">
          {{ slotProps.data.Price | formatPriceUsd }}
        </template>
      </Column>

      <Column
        field="Username"
        header="Representative"
        :showFilterMenu="false"
        :showClearButton="false"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { FilterMatchMode } from "primevue/api/";
export default {
  props: {
    list: {
      type: Array,
      required: false,
    },

  },
  data() {
    return {
      selectedOldOffer: null,
      filteredOldOffers: {
        Sira: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Customer: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Country: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Category: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

        Product: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Surface: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Size: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Edge: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Birim: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Username: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
};
</script>
