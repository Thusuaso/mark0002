<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <Button
          type="button"
          class="w-100"
          severity="success"
          label="New"
          @click="newForm"
        />
      </div>
      <div class="col">
        <Select
          v-model="selectedCategory"
          :options="panelStore.getPanelCategoryList"
          optionLabel="kategoriadi_en"
          class="w-100"
          @change="categorySelected($event)"
        />
      </div>
    </div>

    <panelPublishedList
      :list="panelStore.getPanelPublishedList"
      @panel_published_list_selected_emit="panelPublishedListSelected($event)"
    />

    <Dialog
      v-model:visible="panel_form_dialog"
      :header="'Ürün Id ' + panelStore.getPanelProductId"
      modal
      maximizable
      :closeOnEscape="false"
    >
      <!-- v-if gerekcesi published.vue ile ayni: `model` null ile
           basliyor, prop ise required Object. -->
      <panelProductForm
        v-if="model"
        :model="model"
        :category="panelStore.getPanelCategoryList"
        :status="panelStore.getPanelProductButtonStatus"
        :productId="panelStore.getPanelProductId"
        :size="sharedStore.getPanelProductSize"
        :finish="sharedStore.getPanelProductFinish"
        :color="sharedStore.getPanelProductColor"
        :area="sharedStore.getPanelProductArea"
        :styl="sharedStore.getPanelProductStyle"
        :type="sharedStore.getPanelProductType"
        :material="sharedStore.getPanelProductMaterial"
        :sizeList="panelStore.getPanelProductSizeList"
        :finishList="panelStore.getPanelProductFinishList"
        :colorList="panelStore.getPanelProductColorList"
        :areaList="panelStore.getPanelProductAreaList"
        :typeList="panelStore.getPanelProductTypeList"
        :materialList="panelStore.getPanelProductMaterialList"
        :styleList="panelStore.getPanelProductStyleList"
        :photoList="panelStore.getPanelProductPhotoList"
        :sizeModel="modelsStore.getPanelProductSizeModel"
        :colorModel="modelsStore.getPanelProductColorModel"
        :finishModel="modelsStore.getPanelProductFinishModel"
        :areaModel="modelsStore.getPanelProductAreaModel"
        :typeModel="modelsStore.getPanelProductTypeModel"
        :styleModel="modelsStore.getPanelProductStyleModel"
        :materialModel="modelsStore.getPanelProductMaterialModel"
        :suggestedList="panelStore.getPanelProductSuggestedList"
        @process_emit="process($event)"
        @delete_emit="deleteProduct($event)"
      />
    </Dialog>
  </div>
</template>

<script>
import { usePanelStore } from "~/stores/panel"
import { useModelsStore } from "~/stores/models"
import { useSharedStore } from "~/stores/shared"

export default {
  computed: {
    panelStore() {
      return usePanelStore()
    },
    modelsStore() {
      return useModelsStore()
    },
    sharedStore() {
      return useSharedStore()
    },
  },

  data() {
    return {
      selectedCategory: null,
      model: null,
      panel_form_dialog: false,
    }
  },

  watch: {
    "panelStore.getPanelCategoryList"() {
      this.selectedCategory = this.panelStore.getPanelCategoryList[0]
    },
  },

  methods: {
    /*
     * ---------------------------------------------------------------
     * [YAYINSIZ-1] DUZELTILDI -- MEVCUT URUNU DUZENLEMEK MUKERRER
     *              KAYIT OLUSTURABILIYORDU
     * ---------------------------------------------------------------
     * Bu sayfa kaydet/guncelle kararini `getPanelProductButtonStatus`
     * ile veriyor (asagidaki process). Ama kaynakta satir seciminde o
     * degeri FALSE'A CEKEN satir YOKTU -- kardes sayfa published.vue'da
     * VAR (pages/panel/products/published.vue:131).
     *
     * Sonuc: kullanici bir kez "New"e basarsa durum TRUE kaliyor;
     * ardindan mevcut bir urunu secip kaydettiginde process() UPDATE
     * degil SAVE calistiriyor, yani veritabanina MUKERRER URUN
     * dusuyor. Sayfa ilk acilista durum false oldugu icin "New"e hic
     * basilmadan yapilan duzenleme dogru calisiyordu -- hata bu yuzden
     * gozden kacmis olmali.
     *
     * Iki sayfanin niyeti ayni, asimetri kazara: eksik satir eklendi.
     * (Pilot uretim veritabanina YAZIYOR, bu yuzden bilerek birakmak
     * mukerrer kayit riskini surdurmek olurdu.)
     */
    panelPublishedListSelected(event) {
      this.panelStore.setPanelProductId(event.urunid)
      this.panelStore.setPanelProductFiltersList({
        productId: event.urunid,
        categoryId: this.selectedCategory.Id,
      })
      this.panelStore.setPanelProductButtonStatus(false)

      this.model = event
      this.panel_form_dialog = true
    },

    newForm() {
      this.panelStore.setPanelProductButtonStatus(true)
      this.modelsStore.setPanelProductModel()
      this.panelStore.setPanelProductId(0)

      /* MUT_ ZORUNLU -- kaynakta commit'ti; gerekcesi published.vue'da. */
      this.panelStore.MUT_setPanelProductPhotoListUpdate([])
      this.panelStore.MUT_setPanelProductsSizeListUpdate([])
      this.panelStore.MUT_setPanelProductsFilterReset([])

      this.panelStore.setPanelProjectSuggestedReset()

      this.model = this.modelsStore.getPanelProductModel
      this.panel_form_dialog = true
    },

    /* Gerekcesi published.vue icindeki ayni adli metotta. */
    __stringCharacterChange(event) {
      const data = String(event ?? "").split("'")
      let value = ""
      data.forEach((x) => {
        value += x + "''"
      })
      return value.substring(0, value.length - 2)
    },

    __escapeTexts(event) {
      for (const alan of [
        "aciklama_fr", "anahtarlar_fr", "keywords_fr",
        "aciklama_en", "anahtarlar_en", "keywords_en",
        "aciklama_es", "anahtarlar_es", "keywords_es",
        "urunadi_fr",
      ]) {
        event[`${alan}2`] = this.__stringCharacterChange(event[alan])
      }
    },

    /*
     * Karar `getPanelProductButtonStatus` ile -- kardes sayfa
     * published.vue AYNI karari `getPanelProductId == 0` ile veriyor.
     * Iki farkli olcut korundu (ikisi de kendi sayfasinda tutarli);
     * birlestirmek iki sayfanin akisini da degistirmek olurdu.
     */
    process(event) {
      this.__escapeTexts(event)

      if (this.panelStore.getPanelProductButtonStatus) {
        this.panelStore.setPanelProductsSave(event)
      } else {
        /*
         * Id AYRICA GONDERILMIYOR -- published.vue'da
         * `{...event, Id: getProductId}` var, burada yok. Sebebi: bu
         * sayfa `setPanelId` dispatch ETMIYOR, yani store'daki
         * getProductId bu ekranda guncellenmiyor ve kullanilsa BAYAT
         * deger giderdi. Satir nesnesinin kendi Id'si dogru olan.
         */
        this.panelStore.setPanelProductsUpdate(event)
      }
    },

    deleteProduct(event) {
      this.panelStore.setPanelProductsDelete(event)
      this.panel_form_dialog = false
    },

    categorySelected(event) {
      this.panelStore.setPanelNotPublishedListCategory(event.value.Id)
    },
  },
}
</script>

<script setup>
/* Gerekcesi published.vue icindeki ayni blokta. */
const panelStore = usePanelStore()
const sharedStore = useSharedStore()

definePageMeta({ middleware: ["authority"] })

await useAsyncData(
  "panel-products-notpublished",
  () =>
    Promise.all([
      panelStore.setPanelNotPublishedList(),
      sharedStore.setPanelProductSharedList(),
    ]),
  { server: false },
)
</script>

<!--
  pages/panel/products/notpublished.vue

  Panelde YAYINDA OLMAYAN urunler. Navbar bu yola link veriyordu ama
  sayfa pilotta YOKTU.

  === KARDES SAYFAYLA FARKLAR (published.vue) ===

  Ikisi de ayni listeyi, ayni formu ve ayni store'lari kullaniyor.
  Olculen farklar:

    liste ucu      setPanelNotPublishedList / ...ListCategory
    baslik         yalnizca "Ürün Id N"  (published urun adini da yazar)
    kenar (edge)   edge / edgeList / edgeModel prop'lari GECILMIYOR
    kayit karari   getPanelProductButtonStatus (published: productId == 0)
    guncelleme     event oldugu gibi (published: {...event, Id})

  === DIKKAT -- EDGE SEKMESI BU SAYFADA BOZUK (NUXT 2'DE DE OYLEYDI) ===

  Form `edge`, `edgeList` ve `edgeModel` prop'larini `required: true`
  olarak bildiriyor (app/components/panel/ProductForm.vue:999,1027,1071)
  ama bu sayfa UCUNU DE GECMIYOR. Olculen sonuc:

    - Vue konsola UC "Missing required prop" uyarisi basar
    - Edge sekmesi acilir ama BOS: :options="edge" ve :value="edgeList"
      undefined
    - Sekmedeki "ekle" kullanilirsa
          this.edgeModel.UrunId = ...
      -> TypeError: Cannot set properties of undefined

  Bu bir tasima gerilemesi DEGIL; Nuxt 2'de de aynisi oluyordu.

  BILEREK DUZELTILMEDI. Iki olasi cozum var ve ikisi de DAVRANIS
  DEGISIKLIGI, yani kullanicinin karari:

    a) Uc prop'u published.vue gibi gecmek -> sekme CALISIR hale gelir,
       ama yayinda olmayan urune kenar kaydi eklenebilir olur (yeni
       yetenek, uretim veritabanina yazar).
    b) Prop'lari optional + varsayilan yapmak -> cokme kalkar ama
       `edgeModel` icin bos nesne varsayilani vermek "ekle"nin BOS
       KAYIT gondermesine yol acardi; yani varsayilan vermek de masum
       degil.

  Store'lar gerekli veriyi SAGLIYOR (sharedStore.getPanelProductEdge,
  panelStore.getPanelProductEdgeList, modelsStore.getPanelProductEdgeModel),
  yani (a) tek satirlik bir istek; sorulmasi gereken sey yayinsiz
  urunlerde kenar secimi OLMALI MI.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER: published.vue ile AYNI liste
  (definePageMeta, uc store, useAsyncData, v-model:visible, <Select>,
  severity, MUT_, v-if).

  DUZELTILDI -- NUXT 2'DE SESSIZCE MUKERRER KAYIT URETIYORDU:

  [x] Satir seciminde setPanelProductButtonStatus(false) eksikti
      (gerekcesi panelPublishedListSelected icinde [YAYINSIZ-1]).
-->
