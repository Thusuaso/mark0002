<template>
  <div>
    <DataTable
      :value="list"
      responsiveLayout="scroll"
      :filters.sync="filters1"
      filterDisplay="row"
      :selection.sync="selectedFollow"
      selectionMode="single"
      @row-click="followSelected($event)"
      paginator
      :rows="10"
    >
      <Column
        field="MusteriAdi"
        header="Customer"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
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
      <Column
        field="SiparisNo"
        header="Po"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
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
      <!-- Liste sunucudan yukleme tarihine gore (yeniden eskiye) gelir;
           baslik tiklanarak yon degistirilebilir. -->
      <Column
        field="YuklemeTarihi"
        header="Shipment Date"
        :sortable="true"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.YuklemeTarihi | dateToString }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="KonteynerNo"
        header="Container No"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
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
      <Column
        field="Line"
        header="Line"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="Eta"
        header="Est. Date"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.Eta | dateToString }}
        </template>
      </Column>
      <Column
        field="Kalan"
        header="Time to Arrival"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column header="#" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          <div
            v-if="
              slotProps.data.KonsimentoDurum == null || !slotProps.data.KonsimentoDurum
            "
          >
            Not Sent
          </div>
          <div v-else>Sent</div>
        </template>
      </Column>
      <Column
        field="AktarmaLimanAdi"
        header="Port"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <!-- Yuklemenin yapildigi acente. Takip adresi varsa konteyner
           numarasiyla birlikte yeni sekmede acilan link gosterilir. -->
      <Column
        field="AcenteAdi"
        header="Agency"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          <a
            v-if="slotProps.data.TakipLinki"
            :href="slotProps.data.TakipLinki"
            target="_blank"
            rel="noopener noreferrer"
            @click.stop
          >
            {{ slotProps.data.AcenteAdi }}
            <i class="pi pi-external-link" style="font-size: 0.7rem"></i>
          </a>
          <span v-else>{{ slotProps.data.AcenteAdi || "-" }}</span>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="Sorumlu"
        header="Seller"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
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

  },
  data() {
    return {
      filters1: {
        MusteriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        YuklemeTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KonteynerNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Sorumlu: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        AcenteAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      selectedFollow: null,
    };
  },
  methods: {
    followSelected(event) {
      this.$emit("follow-selected-dialog-emit", event.data);
    },
  },
};
</script>
