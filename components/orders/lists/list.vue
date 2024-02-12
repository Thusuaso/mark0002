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
    >
      <Column header="#" headerStyle="width:3rem">
        <template #body="slotProps">
          {{ slotProps.index + 1 }}
        </template>
      </Column>
      <Column field="YuklemeTarihi" header="Tarih" :showFilterMenu="false">
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
      <Column field="FirmaAdi" header="Kime" :showFilterMenu="false">
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
      <Column field="UrunAdi" header="Ürün" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="UrunUretimAciklama" header="İçerik"> </Column>
      <Column field="En" header="En" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>

      <Column field="Boy" header="Boy" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="Kenar" header="Kenar" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="UrunFirmaAdi" header="Tedarikçi" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="Miktar" header="Miktar">
        <template #body="slotProps">
          {{ slotProps.data.Miktar | formatDecimal }}
        </template>
      </Column>
      <Column field="BirimAdi" header="Birim"> </Column>
      <Column field="Uretim" header="Üretim">
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
      <Column field="SatisFiyati" header="Fiyat">
        <template #body="slotProps">
          {{ slotProps.data.SatisFiyati | formatPriceUsd }}
        </template>
      </Column>
      <Column field="SatisToplam" header="Toplam">
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
      <Column field="SiparisTarihi" header="Tarih" :showFilterMenu="false">
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
      <Column field="FirmaAdi" header="Kime" :showFilterMenu="false">
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
      <Column field="UrunAdi" header="Ürün" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="UrunUretimAciklama" header="İçerik"> </Column>
      <Column field="En" header="En" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>

      <Column field="Boy" header="Boy" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="Kenar" header="Kenar" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="UrunFirmaAdi" header="Tedarikçi" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="Miktar" header="Miktar">
        <template #body="slotProps">
          {{ slotProps.data.Miktar | formatDecimal }}
        </template>
      </Column>
      <Column field="BirimAdi" header="Birim"> </Column>
      <Column field="Uretim" header="Üretim">
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
      <Column field="SatisFiyati" header="Fiyat">
        <template #body="slotProps">
          {{ slotProps.data.SatisFiyati | formatPriceUsd }}
        </template>
      </Column>
      <Column field="SatisToplam" header="Toplam">
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
      },
    };
  },
  methods: {},
};
</script>
