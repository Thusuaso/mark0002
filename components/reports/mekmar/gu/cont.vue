<template>
  <div class="row">
    <div class="col">
      <DataTable
        :value="contCountList"
        scrollable
        scrollHeight="450px"
        :loading="loading"
        :filters.sync="filtersContCount"
        filterDisplay="row"

      >
        <Column field="UlkeAdi" header="Country" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
        </Column>
        <Column field="SipSayisi" header="Order Amount" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #filter="{ filterModel, filterCallback }" > 
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"  />
        </template>
        </Column>
        <Column field="KontSayisi" header="Container Amount" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"  />
        </template>
        </Column>
      </DataTable>
    </div>
    <div class="col">
      <DataTable :value="contCustList" scrollable scrollHeight="450px"
      :filters.sync="filtersContCust"
        filterDisplay="row"
        :loading="loading"
      >
        <Column field="FirmaAdi" header="Customer" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #filter="{ filterModel, filterCallback }" > 
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"  />
        </template>
        </Column>
        <Column field="SipSayisi" header="Order Amount" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #filter="{ filterModel, filterCallback }" > 
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"  />
        </template>
        </Column>
        <Column field="KontSayisi" header="Container Amount" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"  />
        </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script>
import {FilterMatchMode} from 'primevue/api';
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
  data(){
    return {
      filtersContCount:{
        UlkeAdi:{value:null,matchMode:FilterMatchMode.STARTS_WITH},
        KontSayisi:{value:null,matchMode:FilterMatchMode.STARTS_WITH},
        SipSayisi:{value:null,matchMode:FilterMatchMode.STARTS_WITH},


      },
      filtersContCust:{
        FirmaAdi:{value:null,matchMode:FilterMatchMode.STARTS_WITH},
        KontSayisi:{value:null,matchMode:FilterMatchMode.STARTS_WITH},
        SipSayisi:{value:null,matchMode:FilterMatchMode.STARTS_WITH},


      }
    }
  }
};
</script>
