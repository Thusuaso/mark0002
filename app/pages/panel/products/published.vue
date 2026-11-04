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
      :header="
        'Ürün Id ' +
        panelStore.getPanelProductId +
        ' ' +
        panelStore.getPanelProductName
      "
      modal
      maximizable
      :closeOnEscape="false"
    >
      <!--
        v-if ZORUNLU: form `model` prop'unu required Object bekliyor ama
        burada null ile baslatiliyor. Dialog `modal`, v-if DEGIL -- yani
        icerik sayfa acilir acilmaz kurulurdu ve required prop uyarisi
        verirdi.
      -->
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
        :edge="sharedStore.getPanelProductEdge"
        :sizeList="panelStore.getPanelProductSizeList"
        :finishList="panelStore.getPanelProductFinishList"
        :colorList="panelStore.getPanelProductColorList"
        :areaList="panelStore.getPanelProductAreaList"
        :typeList="panelStore.getPanelProductTypeList"
        :materialList="panelStore.getPanelProductMaterialList"
        :edgeList="panelStore.getPanelProductEdgeList"
        :styleList="panelStore.getPanelProductStyleList"
        :photoList="panelStore.getPanelProductPhotoList"
        :sizeModel="modelsStore.getPanelProductSizeModel"
        :colorModel="modelsStore.getPanelProductColorModel"
        :finishModel="modelsStore.getPanelProductFinishModel"
        :areaModel="modelsStore.getPanelProductAreaModel"
        :typeModel="modelsStore.getPanelProductTypeModel"
        :styleModel="modelsStore.getPanelProductStyleModel"
        :materialModel="modelsStore.getPanelProductMaterialModel"
        :edgeModel="modelsStore.getPanelProductEdgeModel"
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
    /*
     * UC STORE -- Vuex modulleri namespaced olmadigi icin sayfa farki
     * hic gormuyordu. Dagilim olculdu:
     *   panel  : liste, secili urun, filtre LISTELERI
     *   shared : urun ozellik KATALOGLARI (size/finish/color/area/...)
     *   models : BOS form sablonlari (...Model)
     */
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
    /* Kategori listesi urun listesiyle AYNI yanittan geliyor
     * (MUT_setPanelPublishedList hem payload.list hem payload.category
     * yaziyor), ayri bir istek yok. */
    "panelStore.getPanelCategoryList"() {
      this.selectedCategory = this.panelStore.getPanelCategoryList[0]
    },
  },

  methods: {
    panelPublishedListSelected(event) {
      this.panelStore.setPanelProductName(event.urunadi_en)
      this.panelStore.setPanelProductId(event.urunid)
      this.panelStore.setPanelId(event.Id)

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

      /* MUT_ ZORUNLU: kaynakta bunlar commit'ti (mutation), dispatch
       * degil. Duz bir cevrim ayni adli action'a baglardi -- ki yok;
       * sessizce hicbir sey olmazdi. */
      this.panelStore.MUT_setPanelProductPhotoListUpdate([])
      this.panelStore.MUT_setPanelProductsSizeListUpdate([])
      this.panelStore.MUT_setPanelProductsFilterReset([])

      this.panelStore.setPanelProjectSuggestedReset()

      this.model = this.modelsStore.getPanelProductModel
      this.panel_form_dialog = true
    },

    /*
     * Tek tirnak kacisi: degerler SQL dizgesine GOMULEREK gonderiliyor
     * (api/index.js tarafinda parametreli sorgu yok), bu yuzden ' -> ''
     * ikizlemesi yapiliyor. Kaynaktaki govde aynen korundu -- duzeltmesi
     * sunucu tarafini parametreliye cevirmek, bu gecisin kapsami disi.
     */
    __stringCharacterChange(event) {
      const data = String(event ?? "").split("'")
      let value = ""
      data.forEach((x) => {
        value += x + "''"
      })
      return value.substring(0, value.length - 2)
    },

    /* On/arka yuz ayni alanlari 10 dilde kaciriyor; kaynakta save ve
     * update ayni on isi tekrarliyordu, tek yere alindi. */
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
     * KAYIT MI GUNCELLEME MI: `getPanelProductId == 0` ile karar
     * veriliyor -- newForm() onu 0'a cekiyor, satir secimi urun
     * id'sine. Kardes sayfa (notpublished) AYNI karari
     * getPanelProductButtonStatus ile veriyor; oradaki gerekce o
     * dosyada yazili.
     */
    process(event) {
      if (this.panelStore.getPanelProductId == 0) {
        this.__escapeTexts(event)
        this.panelStore.setPanelProductButtonStatus(false)
        this.panelStore.setPanelProductsSave(event)
      } else {
        this.__escapeTexts(event)
        /* Id store'dan geliyor (setPanelId, satir seciminde yaziliyor);
         * event'in kendi Id'si guvenilmez cunku form uzerinde
         * degistirilmis olabilir. */
        this.panelStore.setPanelProductsUpdate({
          ...event,
          Id: this.panelStore.getProductId,
        })
      }
    },

    deleteProduct(event) {
      this.panelStore.setPanelProductsDelete(event)
      this.panel_form_dialog = false
    },

    categorySelected(event) {
      this.panelStore.setPanelPublishedListCategory(event.value.Id)
    },
  },
}
</script>

<script setup>
/*
 * definePageMeta yalnizca <script setup> icinde cagrilabilir -> Options
 * API sayfalarinda ikinci bir script blogu gerekiyor. Options API'deki
 * `middleware: [...]` anahtari Nuxt 3+'ta YOK SAYILIR (bkz. commit
 * 5fc77edb1).
 *
 * server: false ZORUNLU -- ikisi de legacy Express API'sinden geliyor ve
 * o, SSR'in IC fetch yolunda calismiyor
 * (bkz. server/middleware/1.legacy-api.ts).
 */
const panelStore = usePanelStore()
const sharedStore = useSharedStore()

definePageMeta({ middleware: ["authority"] })

await useAsyncData(
  "panel-products-published",
  () =>
    Promise.all([
      panelStore.setPanelPublishedList(),
      sharedStore.setPanelProductSharedList(),
    ]),
  { server: false },
)
</script>

<!--
  pages/panel/products/published.vue

  Panelde YAYINDA olan urunler. Navbar bu yola link veriyordu ama sayfa
  pilotta YOKTU.

  Kardes sayfa notpublished.vue ile neredeyse ayni; farklar orada
  belgelendi.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] middleware: ["authority"] -> definePageMeta (gerekcesi yukarida)
  [x] mapGetters([32 getter]) -> panelStore / modelsStore / sharedStore
      Dagilimin neden uc store oldugu computed blogunda yazili.
  [x] created() -> <script setup> + useAsyncData({ server: false })
  [x] :visible.sync -> v-model:visible
  [x] <Dropdown> -> <Select>
  [x] class="p-button-success" -> severity="success"
  [x] $store.commit(...) -> MUT_  (UC yerde; gerekcesi newForm icinde)
  [x] Form'a v-if="model" eklendi (gerekcesi sablonda)

  SADELESTIRILDI (davranis ayni):

  [x] save() ve update() ONCE ayni 10 satirlik kacis islemini TEKRAR
      ediyordu; __escapeTexts()'e alindi. Iki kopyadan birinin
      guncellenmeyi unutulmasi riski kalkti.

  KAPSAM DISI BIRAKILAN:

  [x] Form bileseni prop'larinin IC ALANLARINA yaziyor (79 yer, orn.
      `this.model.keywords_en = data`). Vue 3'te props shallowReadonly
      oldugu icin bu CALISIR (kirilan sey prop'un KENDISINI yeniden
      atamaktir, o da hic yok -- tools/codemods/find-prop-mutations.mjs
      "KIRILIR: 0" diyor). Veri akisini duzeltmek bileseni yeniden
      tasarlamak olurdu.
-->
