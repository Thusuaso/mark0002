<template>
  <div class="container">
    <DataTable
      :value="getCardList"
      paginator
      :rows="15"
      :filters.sync="filters"
      filterDisplay="row"
      :selection="selectedCards"
      selectionMode="single"
      @row-click="cardsSelected($event)"
      :loading="loading"
    >
      <Column
        field="ID"
        header="Product Card Id"
        :showFilterMatchModes="false"
        :showFilterMenu="false"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="KategoriAdi" header="Category" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="UrunAdi" header="Product" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="YuzeyIslemAdi" header="Surface" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="En" header="Width" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="Boy" header="Height" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="Kenar" header="Edge" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { FilterMatchMode } from "primevue/api";
export default {
  props: {
    loading: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    ...mapGetters(["getCardList"]),
  },
  data() {
    return {
      selectedCards: null,
      filters: {
        ID: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KategoriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        YuzeyIslemAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        En: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  methods: {
    cardsSelected(event) {
      this.$emit("cards_selected_emit", event.data);
    },
  },
};
</script>
