<template>
  <div class="row">
    <div class="col-3">
      <DataTable
        :value="country_data.data_1"
        scrollable
        scrollHeight="450px"
        v-model:filters="filter_1"
        filterDisplay="row"
      >
        <template #header>
          <div style="margin: 0px auto; text-align: center">{{ date }}</div>
        </template>
        <Column
          field="UlkeAdi"
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
        <Column field="Count" header="Count">
          <template #footer>
            {{ data_1_total }}
          </template>
        </Column>
        <Column header="%">
          <template #body="slotProps">
            {{ ((slotProps.data.Count / data_1_total) * 100).toFixed(2) }}%
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col-3">
      <DataTable
        :value="country_data.data_2"
        scrollable
        scrollHeight="450px"
        v-model:filters="filter_2"
        filterDisplay="row"
      >
        <template #header>
          <div style="margin: 0px auto; text-align: center">{{ date - 1 }}</div>
        </template>
        <Column
          field="UlkeAdi"
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
        <Column field="Count" header="Count">
          <template #footer>
            {{ data_2_total }}
          </template>
        </Column>
        <Column header="%">
          <template #body="slotProps">
            {{ ((slotProps.data.Count / data_2_total) * 100).toFixed(2) }}%
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col-3">
      <DataTable
        :value="country_data.data_3"
        scrollable
        scrollHeight="450px"
        v-model:filters="filter_3"
        filterDisplay="row"
      >
        <template #header>
          <div style="margin: 0px auto; text-align: center">{{ date - 2 }}</div>
        </template>
        <Column
          field="UlkeAdi"
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
        <Column field="Count" header="Count">
          <template #footer>
            {{ data_3_total }}
          </template>
        </Column>
        <Column header="%">
          <template #body="slotProps">
            {{ ((slotProps.data.Count / data_3_total) * 100).toFixed(2) }}%
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col-3">
      <DataTable
        :value="country_data.data_4"
        scrollable
        scrollHeight="450px"
        v-model:filters="filter_4"
        filterDisplay="row"
      >
        <template #header>
          <div style="margin: 0px auto; text-align: center">{{ date - 3 }}</div>
        </template>
        <Column
          field="UlkeAdi"
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
        <Column field="Count" header="Count">
          <template #footer>
            {{ data_4_total }}
          </template>
        </Column>
        <Column header="%">
          <template #body="slotProps">
            {{ ((slotProps.data.Count / data_4_total) * 100).toFixed(2) }}%
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import { FilterMatchMode } from "@primevue/core/api"
export default {
  data() {
    return {
      /*
       * NESNE olarak baslatildi: sablon country_data.data_1 ... data_4
       * okuyor, yani DIZI DEGIL. Kaynakta `[]` idi.
       */
      country_data: {},
      data_1_total: 0,
      data_2_total: 0,
      data_3_total: 0,
      data_4_total: 0,
      date: new Date().getFullYear(),
      filter_1: {
        UlkeAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      filter_2: {
        UlkeAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      filter_3: {
        UlkeAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      filter_4: {
        UlkeAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async
   * is BEKLENMEZ ve veri BOS serialize edilir (bkz. commit 2afc877e3).
   */
  async mounted() {
    try {
      const api = useLegacyApi()
      const res = await api.get("mekmar/reports/offer/country")
      this.country_data = res.data ?? {}

      /* `?? []` korumasi -- kaynak dort listenin de geldigini varsayiyordu. */
      for (const key of ["data_1", "data_2", "data_3", "data_4"]) {
        const rows = this.country_data[key] ?? []
        this[`${key}_total`] = rows.reduce(
          (sum, item) => sum + (Number(item.Count) || 0),
          0,
        )
      }
    } catch (err) {
      console.error("offer/country cekilemedi:", err)
    }
  },
  methods: {
    // filter_1_event(event) {
    //   (this.data_1_total = 0),
    //     event.filteredValue.forEach((x) => {
    //       this.data_1_total += x.Count;
    //     });
    // },
    // filter_2_event(event) {
    //   (this.data_2_total = 0),
    //     event.filteredValue.forEach((x) => {
    //       this.data_2_total += x.Count;
    //     });
    // },
    // filter_3_event(event) {
    //   (this.data_3_total = 0),
    //     event.filteredValue.forEach((x) => {
    //       this.data_3_total += x.Count;
    //     });
    // },
    // filter_4_event(event) {
    //   (this.data_4_total = 0),
    //     event.filteredValue.forEach((x) => {
    //       this.data_4_total += x.Count;
    //     });
    // },
  },
};
</script>

<!--
  components/reports/mekmar/gu/offerCountry.vue
     -> app/components/reports/mekmar/gu/OfferCountry.vue

  Bu bileşen pages/reports/mekmar/gu.vue'nun bir TabView sekmesini
  dolduruyor. Sayfa ve iki buyuk operasyon bileşeni
  (ordererOperation / shippedOperation) SONRAKI commit'te; bu commit
  sekmelerin hafif olanlarini getiriyor.

  Otomatik ice alma adi `ReportsMekmarGuOfferCountry`. Nuxt 2'de ad
  `guOfferCountry` idi (plugins/components.js:142).

  OfferSource.vue'nun ulke kirilimli esi: dort yili yan yana, her biri
  ulke basina teklif sayisi + yuzde.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:
  [x] import { FilterMatchMode } from "primevue/api"
         -> "@primevue/core/api"
  [x] :filters + @update:filters -> v-model:filters  (DORT tabloda da)
  [x] created() -> mounted() + useLegacyApi() + .catch
      (gerekcesi OfferSource.vue'nun notunda)
  [x] `country_data: []` -> `{}` (sablon .data_1 ... .data_4 okuyor)
  [x] Dort ayni forEach blogu -> tek dongu + reduce + `?? []` korumasi

  == KORUNAN DAVRANIS: TOPLAMLAR FILTREYE DUYARLI DEGIL ==
  `methods` blogundaki DORT handler (filter_1_event ... filter_4_event)
  kaynakta TAMAMEN YORUMDA ve DataTable'lara da baglanmamis. Yorumdaki
  kod, filtre degistiginde toplami filtrelenmis satirlardan yeniden
  hesapliyordu.

  Yani bugun: kullanici bir ulke filtresi uygularsa TABLO suzuluyor ama
  FOOTER'DAKI TOPLAM ve yuzde hesabi TUM veriye gore kaliyor -- yuzdeler
  filtrelenmis gorunumde toplami 100 yapmiyor. Kaynaktaki davranis bu.

  Yorum blogu KORUNDU (bos `methods: {}` ile birlikte): niyet belli ve
  ileride acilmasi gerekebilir. Bos methods nesnesi Vue icin zararsiz.
  (CustomInput.vue'da tamamen yorumdan olusan bir `watch: {}` SILINMISTI
  -- oradaki fark, yorumdaki kodun Vue 3'te ZATEN CALISMAYACAK olmasiydi
  (prop'a atama); buradaki kod calisir durumda.)
-->
