<template>
  <div class="d-flex justify-content-end mt-3">
    <div class="btn-group" role="group" aria-label="Görünüm">
      <button
        type="button"
        class="btn btn-sm"
        :class="modelValue === 'cards' ? 'btn-dark' : 'btn-outline-dark'"
        :aria-pressed="String(modelValue === 'cards')"
        @click="pick('cards')"
      >
        Kart
      </button>
      <button
        type="button"
        class="btn btn-sm"
        :class="modelValue === 'table' ? 'btn-dark' : 'btn-outline-dark'"
        :aria-pressed="String(modelValue === 'table')"
        @click="pick('table')"
      >
        Tablo
      </button>
    </div>
  </div>
</template>

<script>
/*
 * components/order/ViewToggle.vue   --  etiket adi <OrderViewToggle>
 *
 * Kart / tablo gecisi ve tercihin HATIRLANMASI. Alti siparis ekraninin
 * hepsi ayni seyi yaptigi icin burada toplandi; sayfalarda yalnizca bir
 * `view` alani ve bir v-if/v-else kaliyor.
 *
 * NEDEN localStorage BURADA OKUNMUYOR (data() icinde):
 * SSR'da window yok. Sunucu "cards", istemci "table" uretirse hidrasyon
 * uyusmazligi cikar. Bu yuzden okuma mounted() icinde -- ilk boyamadan
 * sonra -- ve degisiklik ebeveyne emit ile bildiriliyor.
 */
export default {
  props: {
    modelValue: { type: String, required: true },
    /* Her ekranin tercihi AYRI tutuluyor, orn. "orders:production:view". */
    storageKey: { type: String, required: true },
  },

  emits: ["update:modelValue"],

  mounted() {
    try {
      const saved = localStorage.getItem(this.storageKey)
      if (saved === "table" || saved === "cards") {
        this.$emit("update:modelValue", saved)
      }
    } catch (err) {
      /* Gizli sekmede okuma patlayabilir -- varsayilan gorunum kalir. */
    }
  },

  methods: {
    pick(next) {
      this.$emit("update:modelValue", next)
      try {
        localStorage.setItem(this.storageKey, next)
      } catch (err) {
        /* Yazilamadiysa gorunum yine degisir, yalnizca hatirlanmaz. */
      }
    },
  },
}
</script>
