<template>
  <div class="container">
    <DataTable
      :value="detailFollow"
      tableStyle="min-width: 50rem"
      v-model:selection="selectedFollowDetail"
      selectionMode="single"
      :metaKeySelection="true"
      dataKey="ID"
      @row-click="followDetailSelected($event)"
    >
      <Column
        field="Tarih"
        header="Date"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ dateToString(slotProps.data.Tarih) }}
        </template>
      </Column>
      <Column
        field="Baslik"
        header="Title"
        headerClass="tableHeader"
        bodyClass="tableBody"
      />
      <Column
        field="Aciklama"
        header="Explanation"
        headerClass="tableHeader"
        bodyClass="tableBody"
      />
      <Column
        field="Hatirlatma_Tarih"
        header="Reminder Time"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ dateToString(slotProps.data.Hatirlatma_Tarih) }}
        </template>
      </Column>
      <Column
        field="Hatirlatma_Notu"
        header="Reminder"
        headerClass="tableHeader"
        bodyClass="tableBody"
      />
      <Column
        field="KullaniciAdi"
        header="Seller"
        headerClass="tableHeader"
        bodyClass="tableBody"
      />
    </DataTable>
  </div>
</template>

<script>
import { useSalesStore } from "~/stores/sales"

export default {
  props: {
    detailFollow: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  computed: {
    salesStore() {
      return useSalesStore()
    },
  },

  data() {
    return {
      selectedFollowDetail: null,
    }
  },

  methods: {
    followDetailSelected(event) {
      this.salesStore.setFollowDetailNewButton(false)
      this.salesStore.setFollowDetailData(event.data)
      this.$emit("follow_detail_data", event.data)
    },
  },
}
</script>

<!--
  components/sales/FollowDetailList.vue
  (Nuxt 2: components/sales/follow/form.vue)

  Etiket adi <SalesFollowDetailList>. Nuxt 2'de ad `followForm` idi
  (plugins/components.js:229, ELLE kayit).

  ADI NEDEN "DetailList": bu bilesen BIR FORM DEGIL -- takip
  kayitlarini listeleyen bir DataTable. Gercek form ayri bir dosyada
  (FollowDetailForm.vue, Nuxt 2'de formDetail.vue). Nuxt 2'deki
  `followForm` / `followFormDetail` ad cifti bu yuzden kafa
  karistiriciydi; auto-import adi zaten degismek zorunda oldugu icin
  yaptiklari is yazildi.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] :selection + @update:selection -> v-model:selection
      Nuxt 2'deki hali Vue 2 .sync codemod ciktisiydi.

  [x] this.$store.dispatch("setFollowDetailNewButton", false)
         -> salesStore.setFollowDetailNewButton(false)
      this.$store.dispatch("setFollowDetailData", event.data)
         -> salesStore.setFollowDetailData(event.data)
      Store pilota BU COMMIT'TE eklendi (app/stores/sales.ts).

  [x] <Column ...></Column> -> <Column ... />

  [x] props.detailFollow -> `default: () => []`
      Nuxt 2'de default YOKTU, yani veri gelene kadar DataTable
      :value="undefined" aliyordu.

  KALDIRILDI -- OLU KOD:
  [x] computed: {}  -- bostu.

  NOT: dateToString global olarak kayitli (app/plugins/formatters.ts) ve
  GOSTERIM bicimi uretiyor -> "02-10-2026". API'ye tarih YAZARKEN
  utils/dates.ts icindeki toIsoDate kullanilmali -- FollowDetailForm.vue
  tam bunu yapiyor.
-->
