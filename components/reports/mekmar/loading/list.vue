<template>
  <div class="row">
    <div class="col">
      <DataTable
        :value="list"
        scrollable
        scrollHeight="600px"
        sortField="DDP"
        :sortOrder="-1"
        :loading="loading"
        :filters.sync="loadingMonthFilter"
        filterDisplay="row"
        @filter="filterLoadingMonth($event)"
      >
        <template #header> Shipment (Monthly) </template>
        <Column field="YuklemeTarihi" header="S.Date" :showFilterMenu="false">
          <template #body="slotProps">
            {{ slotProps.data.YuklemeTarihi | dateToString }}
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
        <Column field="SiparisTarihi" header="O.Date" :showFilterMenu="false">
          <template #body="slotProps">
            {{ slotProps.data.SiparisTarihi | dateToString }}
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
        <Column field="SiparisNo" header="Po" :showFilterMenu="false">
          <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
        </Column>
        <Column field="MusteriAdi" header="Customer" :showFilterMenu="false">
          <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
        </Column>

        <Column field="FOB" header="Fob">
          <template #body="slotProps">
            {{ slotProps.data.FOB | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.fob | formatPriceUsd }}
          </template>
        </Column>
        <Column field="DDP" header="Ddp">
          <template #body="slotProps">
            {{ slotProps.data.DDP | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.ddp | formatPriceUsd }}
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col">
      <DataTable
        :value="listYear"
        scrollable
        scrollHeight="600px"
        sortField="DDP"
        :sortOrder="-1"
        :loading="loading"
        :filters.sync="loadingYearFilter"
        filterDisplay="row"
        @filter="filterLoadingYear($event)"
      >
        <template #header> Shipment (Yearly) </template>
        <Column field="MusteriAdi" header="Customer" :showFilterMenu="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
            />
        </template>
        </Column>
        <Column field="FOB" header="FOB">
          <template #body="slotProps">
            {{ slotProps.data.FOB | formatPriceUsd }}
          </template>
          <template #footer>
            {{ listYearTotal.fob | formatPriceUsd }}
          </template>
        </Column>
        <Column field="DDP" header="DDP">
          <template #body="slotProps">
            {{ slotProps.data.DDP | formatPriceUsd }}
          </template>
          <template #footer>
            {{ listYearTotal.ddp | formatPriceUsd }}
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
    list: {
      type: Array,
      required: false,
    },
    total: {
      type: Object,
      required: false,
    },
    listYear: {
      type: Array,
      required: false,
    },
    listYearTotal: {
      type: Object,
      required: false,
    },
    loading: {
      type: Boolean,
      required: false,
    },
  },
  data(){
    return {
      loadingYearFilter:{
        MusteriAdi:{value:null,matchMode:FilterMatchMode.STARTS_WITH},

      },
      loadingMonthFilter:{
        YuklemeTarihi:{value:null,matchMode:FilterMatchMode.STARTS_WITH},
        SiparisTarihi:{value:null,matchMode:FilterMatchMode.STARTS_WITH},
        SiparisNo:{value:null,matchMode:FilterMatchMode.STARTS_WITH},
        MusteriAdi:{value:null,matchMode:FilterMatchMode.STARTS_WITH},

      }
    }
  },
  methods:{
    filterLoadingMonth(event){
      this.$store.dispatch('setReportsMekmarLoadingListTotal',event.filteredValue);
    },
    filterLoadingYear(event){
      
    }
  }
};
</script>
