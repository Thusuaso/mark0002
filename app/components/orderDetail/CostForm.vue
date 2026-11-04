<template>
  <div>
    <DataTable :value="cost">
      <Column field="Tur" header="Kind of Cost" />
      <Column field="tut" header="Price">
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.tut) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(total) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
export default {
  props: {
    cost: {
      type: Array,
      required: false,
    },
    total: {
      type: Number,
      required: false,
    },
  },
}
</script>

<!--
  components/orders/forms/cost.vue -> app/components/orderDetail/CostForm.vue

  DOSYA ADI NEDEN BOYLE: Nuxt 2'de bu bilesen `orderDetailCostForm` adiyla
  GLOBAL kayitliydi (plugins/components.js) ve dosya yolu adla uyusmuyordu.
  Nuxt 4'te otomatik import adi dosya yolundan uretilir, bu yuzden yol
  eski tag adini verecek sekilde secildi: orderDetail/CostForm.vue ->
  OrderDetailCostForm. Boylece kullanan sablonlar (detail.vue) degismiyor.
  Ayni kural pilotta daha once de uygulandi (todoByUsernameList ->
  todoByUsername/List.vue).

  DEGISEN: yok -- bilesen zaten sadece props alip gosteriyor.
  `{{ tutar | formatPriceUsd }}` -> `{{ formatPriceUsd(tutar) }}` donusumu
  kaynak depoda codemod ile zaten yapilmisti; formatPriceUsd sablona
  app/plugins/formatters.ts uzerinden geliyor.

  SCROLL EKLENMEDI: pilotun diger DataTable'larinda
  `scrollable scrollHeight="var(--app-table-height)"` var, ama bu tablo
  siparis detay diyalogunun ICINDE iki satirlik bir maliyet dokumu.
  Sabit 600px alt sinir vermek diyalogu gereksiz buyuturdu.
-->
