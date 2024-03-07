<template>
  <div>
    <DataTable
      :value="list"
      rowGroupMode="rowspan"
      :groupRowsBy="['SiparisTarihi', 'SiparisNo', 'FirmaAdi', 'PI']"
      :selection.sync="selectedProduction"
      selectionMode="multiple"
      @row-click="$emit('production_selected_emit', $event.data)"
      class="p-datatable-sm"
      :paginator="true"
      :rows="25"
      :loading="loading"
      style="font-size: 70%"
      filterDisplay="row"
      :filters.sync="filtersOrders"
      v-if="status == 'Shipped'"
      sortField="YuklemeTarihi"
      :sortOrder="-1"
    >
    <template #header>
            <div class="flex justify-content-between">
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="globalSearch" placeholder="Keyword Search" @keyup.enter="globalSearchFilter($event)" @input="globalSearchFilterInput($event)"/>
                </span>
            </div>
        </template>
      <Column header="#" headerStyle="width:3rem">
        <template #body="slotProps">
          {{ slotProps.index + 1 }}
        </template>
      </Column>
      <Column field="YuklemeTarihi" header="Load Date" :showFilterMenu="false" :showClearButton="false">
        <template #body="slotProps">
          {{ slotProps.data.YuklemeTarihi | dateToString }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterShipmentLoadDate(filterModel.value)"
            @input="filterShipmentLoadDateInput(filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="FirmaAdi" header="To" :showFilterMenu="false" :showClearButton="false">
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterShipmentCompany(filterModel.value)"
            @input="filterShipmentCompanyInput(filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="SiparisNo" header="Po" :showFilterMenu="false" :showClearButton="false">
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterShipmentPo(filterModel.value)"
            @input="filterShipmentPoInput(filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="PI" header="PI">
        <template #body="slotProps">
          <div v-if="slotProps.data.EvrakDurum > 0">
            <a
              :href="
                'https://file-service.mekmar.com/file/download/2/' +
                slotProps.data.SiparisNo
              "
            >
              <i class="pi pi-download" />
            </a>
          </div>
          <div v-else>
            <a>
              <i class="pi pi-download" />
            </a>
          </div>
        </template>
      </Column>
      <Column field="UrunAdi" header="Product" :showFilterMenu="false" :showClearButton="false">
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterShipmentProduct(filterModel.value)"
            @input="filterShipmentProductInput(filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="UrunUretimAciklama" header="Detail"> </Column>
      <Column field="En" header="Width" :showFilterMenu="false" :showClearButton="false">
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterShipmentWidth(filterModel.value)"
            @input="filterShipmentWidthInput(filterModel.value)"

            class="p-column-filter"
          />
        </template>
      </Column>

      <Column field="Boy" header="Height" :showFilterMenu="false" :showClearButton="false">
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterShipmentHeight(filterModel.value)"
            @input="filterShipmentHeightInput(filterModel.value)"

            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="Kenar" header="Edge" :showFilterMenu="false" :showClearButton="false">
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterShipmentEdge(filterModel.value)"
            @input="filterShipmentEdgeInput(filterModel.value)"

            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="UrunFirmaAdi" header="Supplier" :showFilterMenu="false" :showClearButton="false">
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterShipmentSupplier(filterModel.value)"
            @input="filterShipmentSupplierInput(filterModel.value)"

            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="Miktar" header="Amount" :showFilterMenu="false" :showClearButton="false">
        <template #body="slotProps">
          {{ slotProps.data.Miktar | formatDecimal }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterShipmentAmount(filterModel.value)"
            @input="filterShipmentAmountInput(filterModel.value)"

            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="BirimAdi" header="Unit">
        <template #body="slotProps">
          <div
            v-if="slotProps.data.Uretim == slotProps.data.Miktar"
            style="background-color: green; color: white"
          >
            {{ slotProps.data.Uretim | formatDecimal }}
          </div>
          <div
            v-else-if="slotProps.data.Uretim > slotProps.data.Miktar"
            style="background-color: red; color: white"
          >
            {{ slotProps.data.Uretim | formatDecimal }}
          </div>
          <div
            v-else-if="slotProps.data.Uretim < slotProps.data.Miktar"
            style="background-color: yellow; color: black"
          >
            {{ slotProps.data.Uretim | formatDecimal }}
          </div>
          <div v-else>
            {{ slotProps.data.Uretim | formatDecimal }}
          </div>
        </template>
      </Column>
      <Column field="Ton" header="Ton">
        <template #body="slotProps">
          {{ slotProps.data.Ton | formatDecimal }}
        </template>
      </Column>
      <Column field="SatisFiyati" header="Price">
        <template #body="slotProps">
          {{ slotProps.data.SatisFiyati | formatPriceUsd }}
        </template>
      </Column>
      <Column field="SatisToplam" header="Total">
        <template #body="slotProps">
          {{ slotProps.data.SatisToplam | formatPriceUsd }}
        </template>
      </Column>
    </DataTable>
    <DataTable
      :value="list"
      rowGroupMode="rowspan"
      :groupRowsBy="['SiparisTarihi', 'SiparisNo', 'FirmaAdi', 'PI']"
      :selection.sync="selectedProduction"
      selectionMode="multiple"
      @row-click="$emit('production_selected_emit', $event.data)"
      class="p-datatable-sm"
      :loading="loading"
      style="font-size: 70%"
      filterDisplay="row"
      :filters.sync="filtersOrders"
      v-else
    >
      <Column header="#" headerStyle="width:3rem">
        <template #body="slotProps">
          {{ slotProps.index + 1 }}
        </template>
      </Column>
      <Column field="SiparisTarihi" header="Order Date" :showFilterMenu="false">
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
      <Column field="FirmaAdi" header="To" :showFilterMenu="false">
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
      <Column field="PI" header="PI">
        <template #body="slotProps">
          <div v-if="slotProps.data.EvrakDurum > 0">
            <a
              :href="
                'https://file-service.mekmar.com/file/download/2/' +
                slotProps.data.SiparisNo
              "
            >
              <i class="pi pi-download" />
            </a>
          </div>
          <div v-else>
            <a>
              <i class="pi pi-download" />
            </a>
          </div>
        </template>
      </Column>
      <Column field="UrunAdi" header="Product" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="UrunUretimAciklama" header="Detail"> </Column>
      <Column field="En" header="Width" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>

      <Column field="Boy" header="Height" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="Kenar" header="Edge" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="UrunFirmaAdi" header="Supplier" :showFilterMenu="false">
        <template #body="slotProps">
          <div
            :id="'productSupplier' + slotProps.data.UrunId"
            @mouseover="productSupplier(slotProps.data)"
            @mouseleave="productSupplierNull(slotProps.data)"
            v-if="
              slotProps.data.FaturaKesimTurID == 1 || slotProps.data.FaturaKesimTurID == 5
            "
            :style="{ color: slotProps.data.Isf > 0 ? 'black' : 'red' }"
          >
            {{ slotProps.data.UrunFirmaAdi }}
          </div>
          <div v-else>
            {{ slotProps.data.UrunFirmaAdi }}
          </div>
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
      <Column field="Miktar" header="Amount">
        <template #body="slotProps">
          {{ slotProps.data.Miktar | formatDecimal }}
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
      <Column field="BirimAdi" header="Unit"> </Column>
      <Column field="Uretim" header="Production">
        <template #body="slotProps">
          <div
            v-if="slotProps.data.Uretim == slotProps.data.Miktar"
            style="background-color: green; color: white"
          >
            {{ slotProps.data.Uretim | formatDecimal }}
          </div>
          <div
            v-else-if="slotProps.data.Uretim > slotProps.data.Miktar"
            style="background-color: black; color: white"
          >
            {{ slotProps.data.Uretim | formatDecimal }}
          </div>
          <div
            v-else-if="slotProps.data.Uretim < slotProps.data.Miktar"
            style="background-color: yellow; color: black"
          >
            {{ slotProps.data.Uretim | formatDecimal }}
          </div>

          <div v-else>
            {{ slotProps.data.Uretim | formatDecimal }}
          </div>
        </template>
      </Column>
      <Column field="Ton" header="Ton">
        <template #body="slotProps">
          {{ slotProps.data.Ton | formatDecimal }}
        </template>
      </Column>
      <Column field="SatisFiyati" header="Price">
        <template #body="slotProps">
          {{ slotProps.data.SatisFiyati | formatPriceUsd }}
        </template>
      </Column>
      <Column field="SatisToplam" header="Total">
        <template #body="slotProps">
          {{ slotProps.data.SatisToplam | formatPriceUsd }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { FilterMatchMode } from "primevue/api";
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
    status: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      globalSearch:null,
      selectedProduction: null,
      filtersOrders: {
        SiparisTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        YuklemeTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        En: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunFirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Miktar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

      },
      filterModel: {
        loaddate: "",
        company: "",
        po: "",
        product: "",
        width: "",
        height: "",
        edge: "",
        supplier: "",
        amount:"",
      },
    };
  },
  methods: {
    globalSearchFilterInput(event){
      if(!event){
        this.$store.dispatch('setOrderShippedList');
      };
    },
    globalSearchFilter(event){
      if(event.target._value){
        this.$store.dispatch('setFilterShipmentGlobal',event.target._value);

      }else{
        this.$store.dispatch('setOrderShippedList');

      }
    },
    filterShipmentAmountInput(event){
      if(event){
        this.filterModel.amount = event;

      }else{
        this.filterModel.amount = '';
      }
    },
    filterShipmentSupplierInput(event){
      if(event){
        this.filterModel.supplier = event;

      }else{
        this.filterModel.supplier = '';
      }
    },
    filterShipmentEdgeInput(event){
      if(event){
        this.filterModel.edge = event;
      } else{
        this.filterModel.edge = '';
      }
    },
    filterShipmentHeightInput(event){
      if(event){
        this.filterModel.height = event;
      }else{
        this.filterModel.height = '';
      }
      
    },
    filterShipmentWidthInput(event){
      if(event){
        this.filterModel.width = event;
      } else{
        this.filterModel.width = '';
      }
    },
    filterShipmentProductInput(event){
      if(event){
        this.filterModel.product = event;
      } else{
        this.filterModel.product = '';
      }
    },
    filterShipmentPoInput(event){
      if(event){
        this.filterModel.po = event;
      } else{
        this.filterModel.po = '';
      }

    },
    filterShipmentCompanyInput(event){
      if(event){
        this.filterModel.company = event;
      } else{
        this.filterModel.company = '';
      }

    },

    filterShipmentLoadDateInput(event){
      if(event){
        this.filterModel.loaddate = event;
      } else{
        this.filterModel.loaddate = '';
        }
    },

    filterShipmentAmount(event){
      if(event){
        this.filterModel.amount = event;

      } else{
        this.filterModel.amount = '';

      }

      if(this.__controlFilter()){
          this.$store.dispatch('setOrderShippedList');

        }else{
          this.$store.dispatch("filterShipment", this.filterModel);

        }


    },
    filterShipmentSupplier(event){
      if(event){
        this.filterModel.supplier = event;

      } else{
        this.filterModel.supplier = '';

      }

      if(this.__controlFilter()){
          this.$store.dispatch('setOrderShippedList');

        }else{
          this.$store.dispatch("filterShipment", this.filterModel);

        }


    },
    filterShipmentEdge(event){
      if(event){
        this.filterModel.edge = event

      } else{
        this.filterModel.edge = '';

      };
      console.log(this.filterModel);
      if(this.__controlFilter()){
          this.$store.dispatch('setOrderShippedList');

        }else{
          this.$store.dispatch("filterShipment", this.filterModel);

        }

    },
    filterShipmentHeight(event){
      if(event){
        this.filterModel.height = event;

      } else{
        this.filterModel.height = '';

      };
      if(this.__controlFilter()){
          this.$store.dispatch('setOrderShippedList');

        }else{
          this.$store.dispatch("filterShipment", this.filterModel);

        }


    },
    filterShipmentWidth(event){
      if(event){
        this.filterModel.width = event;

      } else{
        this.filterModel.width = '';

      };
      if(this.__controlFilter()){
          this.$store.dispatch('setOrderShippedList');

        }else{
          this.$store.dispatch("filterShipment", this.filterModel);

        }
      
    },
    filterShipmentProduct(event){
      if(event){
        this.filterModel.product = event;
      }else{
        this.filterModel.product = '';
      };
      if(this.__controlFilter()){
          this.$store.dispatch('setOrderShippedList');
        }else{
          this.$store.dispatch("filterShipment", this.filterModel);
        }
    },
    filterShipmentPo(event) {
      if(event){
        this.filterModel.po = event;


      }else{
        this.filterModel.po = '';

      };
      if(this.__controlFilter()){
          this.$store.dispatch('setOrderShippedList');

        }else{
          this.$store.dispatch("filterShipment", this.filterModel);

        }


    },
    filterShipmentCompany(event) {
      if(event){
        this.filterModel.company = event;

      }else{
        this.filterModel.company = '';

      }
      this.__controlFilter();
      if(this.__controlFilter()){
        this.$store.dispatch('setOrderShippedList');
      } else{
        this.$store.dispatch("filterShipment", this.filterModel);

      }

    },
    filterShipmentLoadDate(event) {
      if(event){
        this.filterModel.loaddate = event;

        }else{
          this.filterModel.loaddate = '';

        }
        if(this.__controlFilter()){
          this.$store.dispatch('setOrderShippedList');

        }else{
          this.$store.dispatch("filterShipment", this.filterModel);

        }

    },

    __controlFilter(){
      if(this.filterModel.loaddate == '' && this.filterModel.company == '' && this.filterModel.po == '' && this.filterModel.product == '' && this.filterModel.width == '' && this.filterModel.height == '' && this.filterModel.edge == '' && this.filterModel.supplier == '' && this.filterModel.amount == ''){
        return true
      }
    },
    productSupplierNull(event) {
      const vm = document.getElementById("productSupplier" + event.UrunId);
      vm.innerHTML = event.UrunFirmaAdi;
      vm.className = "";
    },
    productSupplier(event) {
      const vm = document.getElementById("productSupplier" + event.UrunId);
      if (event.Isf == 0) {
        vm.innerHTML = "Isf Eksik";
        vm.className = "colorChange";
      }
    },
  },

};
</script>
<style scoped>
.colorChange {
  background-color: yellow;
}
</style>
