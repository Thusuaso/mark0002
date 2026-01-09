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
              {{ cost | formatPriceUsd }}
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
            <span class="block text-500 font-medium mb-3"
              >Maliyet İşgücü $</span
            >
            <div class="text-900 font-bold text-xl">
              {{ costLabour | formatPriceUsd }}
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
              {{ production | formatDecimal }}
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
            <span class="block text-500 font-medium mb-3"
              >Kişi Başı Maliyet</span
            >
            <div class="text-900 font-bold text-xl">
              {{ costUnitPerson | formatPriceUsd }}
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
    cost: {
      type: Number,
    },
    costLabour: {
      type: Number,
    },
    production: {
      type: Number,
    },
    costUnitPerson: {
      type: Number,
    },
  },
};
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
