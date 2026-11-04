<template>
  <div>
    <DataTable
      :value="mekmarCostStore.getMekmarCostList"
      rowGroupMode="rowspan"
      :groupRowsBy="[
        'Po',
        'FirmaAdi',
        'Freight',
        'Logistic',
        'Custom',
        'Fumigation',
        'Port',
        'Insurance',
        'Lashing',
        'Spanzlet',
        'Invoice',
      ]"
      v-model:selection="selectedCost"
      selectionMode="multiple"
      size="small"
      filterDisplay="row"
      v-model:filters="filtersCost"
      columnResizeMode="fit"
      showGridlines
      @row-click="costSelected($event)"
    >
      <Column header="#" headerStyle="width:3rem">
        <template #body="slotProps">
          {{ slotProps.index + 1 }}
        </template>
      </Column>
      <Column
        field="Po"
        header="Po"
        :showFilterMenu="false"
        :showClearButton="false"
        style="width: 3%"
      >
        <template #body="slotProps">
          {{ slotProps.data.Po }}
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
        v-for="col in flagColumns"
        :key="col"
        :field="col"
        :header="col"
        :showFilterMenu="false"
        :showClearButton="false"
        style="width: 3%"
      >
        <template #body="slotProps">
          <i :class="slotProps.data[col] ? 'pi pi-check' : 'pi pi-times'"></i>
        </template>
      </Column>
      <Column
        field="FirmaAdi"
        header="SupplierName"
        :showFilterMenu="false"
        :showClearButton="false"
        style="width: 3%"
      >
        <template #body="slotProps">
          {{ slotProps.data.FirmaAdi }}
        </template>
      </Column>
      <Column
        field="Invoice"
        header="Invoice"
        :showFilterMenu="false"
        :showClearButton="false"
        style="width: 3%"
      >
        <template #body="slotProps">
          <i :class="slotProps.data.Invoice ? 'pi pi-check' : 'pi pi-times'"></i>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { FilterMatchMode } from "@primevue/core/api"
import { useMekmarCostStore } from "~/stores/mekmarCost"

export default {
  computed: {
    mekmarCostStore() {
      return useMekmarCostStore()
    },
  },
  data() {
    return {
      filtersCost: {
        Po: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      selectedCost: {},
      /*
       * Dokuz maliyet bayragi. Kaynakta dokuz <Column> blogu HARFI
       * HARFINE ayniydi (yalnizca field/header degisiyordu), toplam 90
       * satir kopya sablon; v-for ile tek bloga indi. Kolon SIRASI ve
       * basliklari birebir korundu.
       */
      flagColumns: [
        "Freight",
        "Logistic",
        "Custom",
        "Fumigation",
        "Port",
        "Insurance",
        "Lashing",
        "Spanzlet",
      ],
    }
  },
  methods: {
    costSelected(event) {
      this.$emit("cost_selected_emit", event.data)
    },
  },
}
</script>

<!--
  components/cost/list.vue -> app/components/mekmarCost/List.vue

  DOSYA ADI NEDEN "cost/" DEGIL "mekmarCost/": pilotta BIRBIRINDEN
  BAGIMSIZ iki "cost" var -- `stores/cost.ts` (uretim maliyeti,
  production.vue) ve bu modul (`mekmar_cost.js`, navlun/sigorta/gumruk
  bayraklari). Klasor `cost/` olsaydi otomatik ice alma adi `CostList`
  olurdu ve iki alan tek ada duserdi. Kaynaktaki global kayit adi da
  zaten `mekmarCostList`'ti (plugins/components.js:159), yani bu ad
  kaynaga DAHA yakin.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] import { FilterMatchMode } from "primevue/api"
         -> "@primevue/core/api"
      Alt paket "primevue/api" PrimeVue 4'te TAMAMEN kaldirildi; eski
      yol derlemeyi "Failed to resolve import" ile dusurur.

  [x] :selection + @update:selection -> v-model:selection
      :filters   + @update:filters   -> v-model:filters
      Nuxt 2'deki hali Vue 2 .sync codemod ciktisiydi (commit c569066e5);
      Vue 3'te dogru yazim v-model:<ad>.

  [x] responsiveLayout="scroll" KALDIRILDI.
      PrimeVue 4'te bu prop YOK (v3'teki "scroll" davranisi artik
      varsayilan). Vue tanimadigi prop'u kok ogeye DOM attribute'u olarak
      duser -- zararsiz ama olu. (commit 391b8519a ile ayni karar.)

  [x] mapGetters(["getMekmarCostList"]) -> useMekmarCostStore()

  [x] class="p-datatable-sm" -> size="small"
      PrimeVue 4'te `p-datatable-sm` bir GIRDI degil, bileşenin
      KENDI urettigi sinif: style/index.mjs icinde
          'p-datatable-sm': props.size === 'small'
      seklinde tanimli ve @primevue/themes altinda o sinif adini hedef
      alan bir kural YOK. Yani sinifi elle yazmak yogunlugu KUCULTMUYOR;
      dogru API `size="small"`. (Ayni kural `p-datatable-gridlines` icin
      de gecerli -> `showGridlines`, o zaten prop olarak yaziliydi.)
      NOT: pilotta bu eski sinifi elle yazan baska dosyalar da var
      (order/Table.vue, order/Table2.vue, order/ShippedList.vue,
      panel/published/List.vue) -- baska ekranlar oldugu icin bu
      commit'in kapsamina alinmadi.

  [x] `expandedRowGroups: ref()` KALDIRILDI -- data() icinde cagrilan
      bos bir ref()'ti ve HICBIR YERDE kullanilmiyordu. Ustelik data()
      icinde ref() sarmalamak Vue 3'te yanlis: Vue onu zaten reaktif
      yapar, ref ikinci bir .value katmani ekler. Sablonda
      expandedRowGroups hic gecmiyor, DataTable'a da verilmiyor.

  [x] Bos <Column ...></Column> uclari -> self-closing.

  == DAVRANIS DEGISIKLIGI: TEKRARLANAN "Spanzlet" KOLONU KALDIRILDI ==

  Kaynakta `field="Spanzlet" header="Spanzlet"` kolonu IKI KEZ,
  birbirinin tam kopyasi olarak yaziliydi (components/cost/list.vue
  satir 161-186). Tabloda ayni veri yan yana iki kolonda gorunuyordu.

  Kopya-yapistir hatasi oldugu acik: iki blok karakter karakter ayni ve
  aralarindaki digerleri (Lashing, FirmaAdi) tek. `groupRowsBy` listesi
  de 'Spanzlet'i TEK kez sayiyor.

  Tek kopya BIRAKILDI -> tabloda bir kolon EKSILDI. Bu GORUNUR bir
  degisiklik, bu yuzden ayrica belirtiliyor; ama iki ayni kolonu
  korumanin savunulacak bir tarafi yok.
-->
