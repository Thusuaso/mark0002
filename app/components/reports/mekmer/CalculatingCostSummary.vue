<template>
  <div class="row mb-4">
    <div class="col-3">
      <div
        class="surface-card shadow-2 p-3 border-round border-left-3 border-blue-500 h-full"
      >
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Maliyet $</span>
            <div class="text-900 font-bold text-xl">
              {{ formatPriceUsd(cost) }}
            </div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-blue-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-dollar text-blue-500 text-xl"></i>
          </div>
        </div>
        <span class="text-500">Toplam Maliyeti</span>
      </div>
    </div>

    <div class="col-3">
      <div
        class="surface-card shadow-2 p-3 border-round border-left-3 border-orange-500 h-full"
      >
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Maliyet İşgücü $</span>
            <div class="text-900 font-bold text-xl">
              {{ formatPriceUsd(costLabour) }}
            </div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-orange-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-users text-orange-500 text-xl"></i>
          </div>
        </div>
        <span class="text-500">Personel Maliyeti</span>
      </div>
    </div>

    <div class="col-3">
      <div
        class="surface-card shadow-2 p-3 border-round border-left-3 border-cyan-500 h-full"
      >
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Üretim</span>
            <div class="text-900 font-bold text-xl">
              {{ formatDecimal(production) }}
              <span class="text-sm font-normal text-500">M2</span>
            </div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-cyan-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-cog text-cyan-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="col-3">
      <div
        class="surface-card shadow-2 p-3 border-round border-left-3 border-purple-500 h-full"
      >
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Kişi Başı Maliyet</span>
            <div class="text-900 font-bold text-xl">
              {{ formatPriceUsd(costUnitPerson) }}
            </div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-purple-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-user text-purple-500 text-xl"></i>
          </div>
        </div>
        <span class="text-500">Ortalama birim maliyet</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cost: { type: Number },
    costLabour: { type: Number },
    production: { type: Number },
    costUnitPerson: { type: Number },
  },
}
</script>

<style scoped>
/* Kartların üzerine gelince hafif yukarı kalkma efekti */
.surface-card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.surface-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1) !important;
}
</style>

<!--
  components/reports/mekmer/calculatingCost/cost.vue
    -> app/components/reports/mekmer/CalculatingCostSummary.vue

  DOSYA ADI: orijinal yol `calculatingCost/cost.vue` idi ve sayfada
  `<calculatingCost>` etiketiyle cagriliyordu (Nuxt 2'de plugins/components.js
  ile elle kaydediliyordu). Nuxt auto-import adi dosya yolundan uretildigi
  icin o yol `ReportsMekmerCalculatingCostCost` gibi bir ad verirdi;
  kardeslerinin kalibina (ReportsMekmerStockList, ReportsMekmerMineList)
  uyacak sekilde CalculatingCostSummary yapildi -> bileşenin yaptigi sey de
  bu: dort ozet karti.

  ZORUNLU degisiklikler:
  [1] `{{ x | formatPriceUsd }}` / `{{ x | formatDecimal }}`
      -> formatPriceUsd(x) / formatDecimal(x). Vue 3'te filter yok;
      isimler app/plugins/formatters.ts ile globalProperties'e kayitli.

  KORUNDU: <style scoped> ve PrimeFlex sinif yapisi birebir. (primeflex
  nuxt.config'te yukludur -- bkz. o dosyadaki not; atlanmis olsaydi bu
  kartlarin yerlesimi tamamen dagilirdi.)

  NOT -- PROP'LAR OPSIYONEL BIRAKILDI: dordunun de `required` degeri yok,
  Nuxt 2'deki haliyle ayni. Sayfa dordunu de her zaman geciyor; zorunlu
  yapmak davranisi degistirmezdi ama gecis sirasinda prop sozlesmesini
  siki tutmak ayri bir karar, burada orijinale uyuldu.
-->
