<template>
  <div class="col-4">
    <div class="card text-center h-100">
      <div class="card-header">{{ follow.FirmaAdi }} ({{ follow.Oncelik }})</div>
      <div class="card-body">
        <h5 class="card-title">{{ follow.Temsilci }}</h5>
        <p class="card-text">{{ follow.baslik }}</p>
      </div>
      <div class="card-footer text-body-secondary">
        <Button
          severity="primary"
          class="w-100"
          label="Detail"
          @click="$emit('followDetail', follow)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    follow: {
      type: Object,
      required: true,
    },
  },
}
</script>

<!--
  components/sales/FollowCard.vue   (Nuxt 2: components/sales/follow/list.vue)

  Etiket adi <SalesFollowCard>. Nuxt 2'de ad `followList` idi
  (plugins/components.js:228, ELLE kayit).

  ADI NEDEN "Card": bu bilesen BIR LISTE DEGIL -- tek bir `follow`
  nesnesi alip tek bir kart render ediyor; listeyi ebeveyn v-for ile
  kuruyor (pages/sales/follow.vue). Nuxt 3+ auto-import adini dosya
  yolundan uretecegi icin ad zaten degismek zorundaydi; "List" yerine
  gercekte yaptigi is yazildi.

  ELLE YAPILAN ZORUNLU DEGISIKLIK:

  [x] <button class="btn btn-primary w-100"> -> <Button severity="primary">
      Ham Bootstrap dugmesi yerine PrimeVue Button. Bootstrap 5.3.2
      vendor'landigi icin `btn btn-primary` CALISIYORDU, yani bu bir hata
      duzeltmesi DEGIL -- ekranin geri kalani PrimeVue dugmeleri
      kullandigi icin tutarlilik. GORUNUM DEGISIR (Bootstrap mavisi ->
      PrimeVue tema rengi). Istenmiyorsa eski <button> geri konabilir;
      davranis ayni (tek bir emit).
-->
