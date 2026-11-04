<template>
  <FloatLabel class="w-100">
    <InputText
      :id="inputId"
      v-model="newValueData"
      :disabled="disabled"
      class="w-100"
      @input="change($event)"
      @blur="isInputActive = false"
      @focus="isInputActive = true"
    />
    <label :for="inputId">{{ text }}</label>
  </FloatLabel>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
  },

  emits: ["onInput", "change"],

  setup() {
    /*
     * [1] id="freight" SABITTI -- ve bu bir hataydi.
     *
     * Bu bilesen tek sayfada onlarca kez kullaniliyor (siparis detay
     * formunda her maliyet alani bir CustomInput). Hepsi ayni id'yi
     * tasidigi icin:
     *   - belgede yinelenen id olusuyordu,
     *   - <label for="freight"> HER ZAMAN sayfadaki ILK input'u
     *     isaret ediyordu; yani "Insurance" etiketine tiklayinca
     *     "Freight" alani odaklaniyordu.
     * useId() (Vue 3.5) her ornege ayri ve SSR ile client'ta AYNI olan
     * bir id uretiyor -- hydration uyusmazligi cikarmaz.
     */
    return { inputId: useId() }
  },

  data() {
    return {
      isInputActive: false,
    }
  },

  computed: {
    newValueData: {
      get() {
        const num = Number(this.value) || 0
        return this.isInputActive ? String(num) : num.toFixed(2)
      },
      set(modifiedValue) {
        let newValue = parseFloat(String(modifiedValue).replace(",", "."))
        if (isNaN(newValue)) {
          newValue = 0
        }
        this.$emit("onInput", newValue)
      },
    },
  },

  methods: {
    change(event) {
      this.$emit("change", event)
    },
  },
}
</script>

<!--
  components/shared/customeInput/custominput.vue -> app/components/CustomInput.vue

  DOSYA YOLU: Nuxt 2'de `CustomInput` adiyla global kayitliydi (ve import
  satiri "../components/..." bicimindeydi -- bu yuzden bagimlilik
  taramasinda ilk basta GOZDEN KACTI). Nuxt auto-import adinin `CustomInput`
  olmasi icin dosya app/components kokune kondu.

  ZORUNLU degisiklikler:
  [1] id="freight" -> :id="inputId" (useId). Ayrintisi setup() icinde:
      sabit id, ayni sayfadaki butun CustomInput'lari ayni etikete
      bagliyordu.
  [2] emits: ["onInput", "change"] bildirildi. Vue 3'te bildirilmeyen
      emit'ler attribute olarak dusuyor ve uyari veriyor. Olay ADLARI
      korundu (`@onInput`, `@change`) -- cagri yerleri degismesin.
  [3] set(modifiedValue) icinde String(...) sarmalamasi: InputText v4'te
      sayisal bir deger de verebiliyor; .replace cagrisi o durumda
      TypeError atardi.

  KALDIRILDI:
  - watch: { } -- icerigi tamamen yorum satirindaydi, bos kaliyordu.
    (Yorumdaki kod zaten calismazdi: `this.value = 0` bir prop'a
    atama yapiyor, Vue 3'te bu hata verir.)
  - created() {} -- bos.

  KORUNDU: `value` prop + `onInput` emit ikilisi. Vue 3'te alisilmis olan
  `modelValue`/`update:modelValue` cifti olurdu ama bu, bileseni kullanan
  her yeri (detail/order/proforma formlarinda onlarca cagri) degistirmek
  anlamina gelir. Ayri bir sadelestirme adimi olarak birakildi.
-->
