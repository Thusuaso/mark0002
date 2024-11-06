<template>
<div>
  <h3 class="insurance_custom_css">Sigorta bedelleri detay alanına eklenmiştir fakat yukarıdaki bedeli aşağıdaki sigorta bedelleri ve diğer bedellerle kontrol ederek işleminizi gerçekleştiriniz. Ayrıca ana sayfadaki bedel ile karşılaştırınız.</h3>
  <div class="row">
    <Button v-if="userId == 10" class="p-button-warning" label="Excel" @click="excel_output_custom"/>

    <vue-excel-xlsx v-else :data="poList.filter(x=>x.Balanced>0)" :columns="excelColumnsField" :file-name="'Finance Detail'"
      :file-type="'xlsx'" :sheet-name="'sheetname'" style="border: none; background-color: white">
      <Button type="button" class="p-button-info w-100" icon="pi pi-file-excel" label="Excel" />
    </vue-excel-xlsx>

    <div class="col-9">
      <DataTable :value="poList" scrollable scrollHeight="600px" :selection.sync="selectedPoList" selectionMode="single"
        @row-click="$emit('po_list_selected_emit', $event)" :rowClass="rowClass" :loading="loading">
        <Column field="SiparisNo" header="Purchase Order" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.SiparisNo }}
          </template>
        </Column>
        <Column field="SiparisTarihi" header="Order Date" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.SiparisTarihi | dateToString }}
          </template>
        </Column>
        <Column field="YuklemeTarihi" header="Shipment Date" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.YuklemeTarihi | dateToString }}
          </template>
        </Column>
        <Column field="Durum" header="Status" headerClass="tableHeader" bodyClass="tableBody"></Column>
        <Column field="OrderTotal" header="Order Total USD" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.OrderTotal | formatPriceUsd }}
          </template>
          <template #footer>
            {{ poListTotal.order | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Paid" header="Payment Received" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.Paid | formatPriceUsd }}
          </template>
          <template #footer>
            {{ poListTotal.paid | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Balanced" header="Balance" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            <div :style="{
                backgroundColor: slotProps.data.Balanced > 8 ? 'green' : 'transparent',
                color: slotProps.data.Balanced > 8 ? 'white' : 'black',
              }">
              {{ slotProps.data.Balanced | formatPriceUsd }}
            </div>
          </template>
          <template #footer>
            {{ poListTotal.balanced | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Pesinat" header="Prepayment" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.Pesinat | formatPriceUsd }}
          </template>
          <template #footer>
            {{ poListTotal.advancedPayment | formatPriceUsd }}
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col-3">
      <DataTable :value="paidList" scrollable scrollHeight="600px" :selection.sync="selectedPoPaidDetailList"
        selectionMode="single" @row-click="$emit('po_paid_detail_list_selected_emit', $event)" :loading="loading">
        <Column field="Tarih" header="Date">
          <template #body="slotProps">
            {{ slotProps.data.Tarih | dateToString }}
          </template>
        </Column>

        <Column field="Paid" header="Paid">
          <template #body="slotProps">
            {{ slotProps.data.Paid | formatPriceUsd }}
          </template>
          <template #footer>
            {{ paidListTotal | formatPriceUsd }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <DataTable :value="insurance" responsiveLayout="scroll" :filters.sync="filters1" filterDisplay="row">
    <template #header>
      Insurance Cost
    </template>
    <Column field="SiparisNo" header="Po" :showFilterMenu="false" :showClearButton="false">
      <template #filter="{ filterModel, filterCallback }">
        <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
          style="width: 50px" />
      </template>
    </Column>
    <Column field="sigorta_tutar_satis" header="Insurance">
      <template #body="slotProps">
        {{ slotProps.data.sigorta_tutar_satis | formatPriceUsd }}
      </template>
    </Column>

</DataTable>
</div>


</template>
<script>
import Cookies from "js-cookie";
import {mapGetters} from 'vuex';
import api from "~/plugins/excel.server";
import {FilterMatchMode,FilterOperator} from 'primevue/api/';

export default {
  computed:{
    ...mapGetters(['getLocalUrl'])
  },
  props: {
    insurance:{
      type:Array,
      required:true
    },
    poList: {
      type: Array,
      required: false,
    },
    paidList: {
      type: Array,
      required: false,
    },
    poListTotal: {
      type: Object,
      required: false,
    },
    paidListTotal: {
      type: Number,
      required: false,
    },
    loading: {
      type: Boolean,
      required:true
    }

  },
  data() {
    return {
      filters1:{
        SiparisNo:{value:null,matchMode:FilterMatchMode.STARTS_WITH}
      },
      filteredPoList:[],
      selectedPoList: null,
      selectedPoPaidDetailList: null,
      excelColumnsField: [
        {
          label: "Customer Name",
          field: "FirmaAdi",
        },
        {
          label: "Po",
          field: "SiparisNo",
        },
        {
          label: "Order Date",
          field: "SiparisTarihi",
          dataFormat: this.formatDecimalDate,
        },
        {
          label: "Shipped Date",
          field: "YuklemeTarihi",
          dataFormat: this.formatDecimalDate,
        },
        {
          label: "Order Total",
          field: "OrderTotal",
          dataFormat: this.formatDecimalUsd,

        },
        {
          label: "Advanced Payment",
          field: "Pesinat",
          dataFormat: this.formatDecimalUsd,

        },
        {
          label: "Paid",
          field: "Paid",
          dataFormat: this.formatDecimalUsd,

        },
        {
          label: "Balanced",
          field: "Balanced",
          dataFormat: this.formatDecimalUsd,
        },
      ],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
      userId:null,
    };
  },
  created(){
    this.userId = Cookies.get('userId');
  },
  methods: {
    excel_output_custom(){

      const data =  {
        'po':this.poList,
        'paid':this.paidList
      }

      api.post("/finance/mekmar/excel/custom", data).then((response) => {
        if (response.status) {
          const link = document.createElement("a");
          link.href = this.getLocalUrl + "finance/mekmar/excel/custom";

          link.setAttribute("download", "finance_detail_custom.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      });
    },
    rowClass(event) {
      return event.MayaControl ? "red-row" : "";
    },
    formatDecimalUsd(value) {
      if (value == null || value == undefined) {
        return '$0';
      } else {
        const val = (value / 1).toFixed(2).replace(".", ",");
        return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
    },
    formatDecimalDate(value) {
      if (value == null || value == NaN - NaN - NaN || value == 'NaN-NaN-NaN' || value == undefined || value == "") {
        return "";
      } else {
        let date = new Date(value);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (month.toString().length == 1) {
          month = '0' + month;
        };
        if (day.toString().length == 1) {
          day = '0' + day;
        }

        return year + "-" + month + "-" + day;
      }
    }
  },


};
</script>
<style scoped>
:deep(.red-row) {
  border: 1px solid yellow !important;
  color: black !important;
}
.insurance_custom_css{
  font-size:16px;
  color:black;
  background-color: yellow;
  font-weight: bold;
  animation: insurance_animation 1s 0s infinite alternate-reverse;
}
@keyframes insurance_animation {
  from{
    color:blue;
  }
  to{
    color:red;
  }
}
</style>
