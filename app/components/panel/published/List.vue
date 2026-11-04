<template>
  <div>
    <DataTable
      scrollable
      scrollHeight="var(--app-table-height)"
      :value="list"
      class="p-datatable-sm"
      v-model:filters="panelPublishedFilter"
      filterDisplay="row"
      v-model:selection="selectedPanelPublishedList"
      selectionMode="single"
      @row-click="$emit('panel_published_list_selected_emit', $event.data)"
      sortField="sira"
      :sortOrder="1"
    >
      <Column field="sira" header="Queue" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="urunid" header="Product Id" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="urunkod" header="Product Code" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="urunadi_en" header="Product Name" :showFilterMenu="false">
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
/*
 * components/panel/published/list.vue karsiligi.
 *
 * IKI SAYFA PAYLASIYOR: panel/products/published ve
 * panel/products/notpublished. Ikisi de ayni listeyi, ayni suzgecleri
 * ve ayni olayi kullaniyor; yalnizca besledikleri store action'i farkli
 * (setPanelPublishedList / setPanelNotPublishedList).
 *
 * TASIMA DEGISIKLIKLERI
 *   import { FilterMatchMode } from "primevue/api"
 *       -> "@primevue/core/api"
 *      `primevue/api` PrimeVue 4'te TAMAMEN KALDIRILDI; eski yol
 *      derleme hatasi verir (paket node_modules'ta da yok).
 *   :filters.sync    -> v-model:filters
 *   :selection.sync  -> v-model:selection
 *   responsiveLayout="scroll" KALDIRILDI (PrimeVue 4'te yok)
 *   :scrollable="true" + scrollHeight="600px"
 *       -> scrollable + scrollHeight="var(--app-table-height)"
 *      Sabit 600px yerine proje geneli CSS degiskeni: tablo yuksekligi
 *      tek yerden (app/assets/css/app.css) ayarlaniyor ve ekran
 *      yuksekligine gore hesaplaniyor.
 *
 * SATIR TIKLAMASINDA `$event.data` YAYILIYOR, olayin tamami DEGIL --
 * kaynakta da oyle (ebeveyn dogrudan urun nesnesini bekliyor). Ayni
 * projede panel/users/List.vue olayin TAMAMINI yayiyor ve ebeveyni
 * `event.data` okuyor; iki bilesen farkli sozlesme kullaniyor, ikisi de
 * kendi ebeveyniyle tutarli oldugu icin degistirilmedi.
 */
import { FilterMatchMode } from "@primevue/core/api"

export default {
  props: {
    list: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  emits: ["panel_published_list_selected_emit"],
  data() {
    return {
      panelPublishedFilter: {
        sira: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        urunid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        urunkod: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        urunadi_en: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      selectedPanelPublishedList: null,
    }
  },
}
</script>
