<template>
  <div style="width: 55rem">
    <div class="row m-auto text-center mt-4">
      <div class="col-sm-6">
        <FloatLabel>
          <Textarea
            id="description"
            v-model="model.Description"
            :autoResize="true"
            rows="5"
            cols="30"
            class="w-100"
          />
          <label for="description">Description</label>
        </FloatLabel>
      </div>
      <div class="col-sm-6">
        <FloatLabel>
          <InputText id="link" type="text" v-model="model.Link" class="w-100" />
          <label for="link">Link</label>
        </FloatLabel>
      </div>
    </div>

    <div class="row m-auto text-center mt-4">
      <div :class="status ? 'col-sm-12' : 'col-sm-6'">
        <Button
          :severity="status ? 'success' : 'warn'"
          class="w-100"
          :label="status ? 'Save' : 'Update'"
          @click="process"
        />
      </div>
      <div class="col-sm-6" v-show="!status">
        <Button
          severity="danger"
          class="w-100"
          label="Delete"
          @click="deleted"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useImportantLinkStore } from "~/stores/importantLink"

export default {
  props: {
    status: {
      type: Boolean,
      required: true,
    },
    model: {
      type: Object,
      required: true,
    },
  },

  computed: {
    importantLinkStore() {
      return useImportantLinkStore()
    },
  },

  methods: {
    process() {
      if (this.status) {
        this.save(this.model)
      } else {
        this.update(this.model)
      }
    },

    save(model) {
      this.importantLinkStore.setImportantLinkListSaveAction(model)
      this.$emit("set_status_button")
    },

    update(model) {
      /*
       * PROP'A YAZILIYOR -- Nuxt 2'deki davranis birebir korundu.
       * `model` bir prop ve alanlari burada yerinde degistiriliyor.
       * Vue 3 nesne prop'larinin IC alanlarina yazmayi engellemez ve
       * uyarmaz. Ebeveyn (pages/sales/important-links.vue) bu nesneyi
       * zaten kendi data'sinda tutuyor, yani pratikte calisiyor; yine de
       * tasarim olarak yanlis. Davranis degistirmemek icin birakildi.
       */
      this.model.SaveDate = new Date()
      this.model.UpdatedUserID = useCookie("userId").value
      this.model.Username = useCookie("username").value

      this.importantLinkStore.setImportantLinkListUpdateAction(model)
      this.$emit("set_status_button")
    },

    deleted() {
      this.importantLinkStore.setImportantLinkListDeleteAction(this.model.ID)
      this.$emit("set_status_button")
    },
  },
}
</script>

<!--
  components/sales/ImportantLinksForm.vue
  (Nuxt 2: components/sales/important-links/form.vue)

  Etiket adi <SalesImportantLinksForm>. Nuxt 2'de ad `importantLinksForm`
  idi (plugins/components.js:178, ELLE kayit).

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] <span class="p-float-label"> -> <FloatLabel>   (iki yerde)
      p-float-label SINIFI PrimeVue 4'te tamamen kaldirildi; stilsiz bir
      span olarak render edilip <label> input'un uzerine yuzmek yerine
      akista kaliyordu -- yani iki alanin basligi da kaymis gorunuyordu.
      (Ayrinti: tools/codemods/codemod-float-label.mjs)

  [x] :class="status?'p-button-success w-100':'p-button-warning w-100'"
         -> :severity="status ? 'success' : 'warn'" + class="w-100"
      class="p-button-danger w-100" -> severity="danger" class="w-100"
      PrimeVue 4'te p-button-<severity> siniflari KALDIRILDI ve severity
      adi "warning" DEGIL "warn". Ucu de sinif olarak birakilsa dugmeler
      varsayilan (mavi) gorunurde kalirdi: Save, Update ve Delete AYNI
      RENKTE olurdu -- hata vermez, sessizce yanlis.

  [x] `import Cookies from 'js-cookie'` -> useCookie
      js-cookie pilota kurulmadi; Cookies.get(x) -> useCookie(x).value
      (SSR + client ayrimini useCookie hallediyor).

  [x] this.$store.dispatch(...) -> importantLinkStore.* (uc yerde)
      Store pilota BU COMMIT'TE eklendi (app/stores/importantLink.ts).

  KALDIRILDI -- OLU KOD:
  [x] data() { return {} }  -- bos.
  [x] created() {}          -- bos.

  DIKKAT -- NUXT 2'DEKI DAVRANIS KORUNDU, DUZELTILMEDI:
      Uc metot da @set_status_button'i KOSULSUZ yayiyor, yani istek
      basarisiz olsa bile dialog kapaniyor. Store artik hata toast'i
      gosterdigi icin kullanici en azindan basarisizligi goruyor, ama
      dialog'un acik kalip tekrar denemeye izin vermesi daha dogru olurdu.
      Bunu degistirmek akisi degistirmek demek -- ayri bir karar.
-->
