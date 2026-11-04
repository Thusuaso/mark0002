<template>
  <DataTable :value="products" tableStyle="min-width: 50rem">
    <Column field="code" header="Code" />
    <Column field="name" header="Name" />
    <Column field="category" header="Category" />
    <Column field="quantity" header="Quantity" />
  </DataTable>
</template>

<script setup lang="ts">
/*
 * BU SAYFA TASIMADAN ONCE DE BOSTU -- asagidaki nota bak.
 * `products` yalnizca render uyarisini susturmak icin var.
 */
const products = ref<Record<string, unknown>[]>([])
</script>

<!--
  pages/reports/mekmer/mekmer-stock-reports.vue -> aynen

  == BU SAYFA UYGULANMAMIS BIR ISKELET; TASIMA ISI YOK ==

  Kaynak dosya 10 satirdi ve <script setup> blogu TAMAMEN BOSTU:

      <script setup lang="ts"></script>

  yani sablonun okudugu `products` HIC TANIMLI DEGILDI. Sonucu:
    - Vue render sirasinda
      "Property 'products' was accessed during render but is not defined"
      uyarisi veriyor,
    - DataTable :value="undefined" alip BOS tablo ciziyor.

  Kolon adlari (code / name / category / quantity) PrimeVue
  dokumantasyonundaki ORNEK veri setinin alanlari -- bu dosya docs'tan
  kopyalanmis bir iskelet, uzerine hic is yapilmamis. Projedeki hicbir
  alan adi Ingilizce degil (SiparisNo, FirmaAdi, ...).

  ERISILEBILIR DEGIL: kod tabaninda "mekmer-stock-reports" dizgisi
  BASKA HIC BIR YERDE gecmiyor -- ne menude, ne bir NuxtLink'te, ne bir
  router.push'ta. Yalnizca URL'yi elle yazarak acilabiliyor.

  NE YAPILDI: rota KORUNDU (sessizce bir URL silmemek icin) ve
  `products` bos bir diziye baglandi -- gorunen davranis AYNI (bos
  tablo), yalnizca render uyarisi kalkti.

  ONERI: silinmeli. Gercek mekmer stok ekrani zaten var ve calisiyor:
  app/pages/reports/mekmer/stock.vue. Bu dosya korunuyorsa tek sebep
  "belki birisi ustunde calisacakti" -- karar kullanicinin.
-->
