<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <Button
          type="button"
          class="p-button-success w-100"
          label="New"
          @click="newForm"
        />
      </div>
      <div class="col">
        <Dropdown
          v-model="selectedCategory"
          :options="getPanelCategoryList"
          optionLabel="kategoriadi_en"
          class="w-100"
          @change="categorySelected($event)"
        />
      </div>
    </div>
    <panelPublishedList
      :list="getPanelPublishedList"
      @panel_published_list_selected_emit="panelPublishedListSelected($event)"
      :loading="getLoading"
    />
    <Dialog
      :visible.sync="panel_form_dialog"
      :header="'Ürün Id ' + getPanelProductId"
      modal
      maximizable
      :closeOnEscape="false"
    >
      <panelProductForm
        :model="model"
        :category="getPanelCategoryList"
        :status="getPanelProductButtonStatus"
        :productId="getPanelProductId"
        :size="getPanelProductSize"
        :finish="getPanelProductFinish"
        :color="getPanelProductColor"
        :area="getPanelProductArea"
        :styl="getPanelProductStyle"
        :type="getPanelProductType"
        :material="getPanelProductMaterial"
        :sizeList="getPanelProductSizeList"
        :finishList="getPanelProductFinishList"
        :colorList="getPanelProductColorList"
        :areaList="getPanelProductAreaList"
        :typeList="getPanelProductTypeList"
        :materialList="getPanelProductMaterialList"
        :styleList="getPanelProductStyleList"
        :photoList="getPanelProductPhotoList"
        :sizeModel="getPanelProductSizeModel"
        :colorModel="getPanelProductColorModel"
        :finishModel="getPanelProductFinishModel"
        :areaModel="getPanelProductAreaModel"
        :typeModel="getPanelProductTypeModel"
        :styleModel="getPanelProductStyleModel"
        :materialModel="getPanelProductMaterialModel"
        :suggestedList="getPanelProductSuggestedList"
        @process_emit="process($event)"
        @delete_emit="deleteProduct($event)"
      />
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "getPanelPublishedList",
      "getPanelCategoryList",
      "getPanelProductModel",
      "getPanelProductButtonStatus",
      "getPanelProductId",
      "getPanelProductSize",
      "getPanelProductFinish",
      "getPanelProductColor",
      "getPanelProductArea",
      "getPanelProductStyle",
      "getPanelProductType",
      "getPanelProductMaterial",
      "getPanelProductSizeList",
      "getPanelProductFinishList",
      "getPanelProductColorList",
      "getPanelProductAreaList",
      "getPanelProductTypeList",
      "getPanelProductMaterialList",
      "getPanelProductStyleList",
      "getPanelProductPhotoList",
      "getPanelProductSizeModel",
      "getPanelProductColorModel",
      "getPanelProductFinishModel",
      "getPanelProductAreaModel",
      "getPanelProductTypeModel",
      "getPanelProductStyleModel",
      "getPanelProductMaterialModel",
      "getPanelProductSuggestedList",
      "getLoading",
    ]),
  },
  data() {
    return {
      selectedCategory: null,
      model: null,
      panel_form_dialog: false,
    };
  },
  created() {
    this.$store.dispatch("setPanelNotPublishedList");
    this.$store.dispatch("setPanelProductSharedList");
  },
  methods: {
    panelPublishedListSelected(event) {
      this.$store.dispatch("setPanelProductId", event.urunid);
      const data = {
        productId: event.urunid,
        categoryId: this.selectedCategory.Id,
      };
      this.$store.dispatch("setPanelProductFiltersList", data);
      this.model = event;
      this.panel_form_dialog = true;
    },
    deleteProduct(event) {
      this.$store.dispatch("setPanelProductsDelete", event);
      this.panel_form_dialog = false;
    },
    __stringCharacterChange(event) {
      const data = event.split("'");
      let value = "";
      data.forEach((x) => {
        value += x + "''";
      });
      const value2 = value.substring(0, value.length - 2);
      return value2;
    },
    save(event) {
      event.aciklama_fr2 = this.__stringCharacterChange(event.aciklama_fr);
      event.anahtarlar_fr2 = this.__stringCharacterChange(event.anahtarlar_fr);
      event.keywords_fr2 = this.__stringCharacterChange(event.keywords_fr);
      event.aciklama_en2 = this.__stringCharacterChange(event.aciklama_en);
      event.anahtarlar_en2 = this.__stringCharacterChange(event.anahtarlar_en);
      event.keywords_en2 = this.__stringCharacterChange(event.keywords_en);
      event.aciklama_es2 = this.__stringCharacterChange(event.aciklama_es);
      event.anahtarlar_es2 = this.__stringCharacterChange(event.anahtarlar_es);
      event.keywords_es2 = this.__stringCharacterChange(event.keywords_es);
      this.$store.dispatch("setPanelProductsSave", event);
    },
    update(event) {
      event.aciklama_fr2 = this.__stringCharacterChange(event.aciklama_fr);
      event.anahtarlar_fr2 = this.__stringCharacterChange(event.anahtarlar_fr);
      event.keywords_fr2 = this.__stringCharacterChange(event.keywords_fr);
      event.aciklama_en2 = this.__stringCharacterChange(event.aciklama_en);
      event.anahtarlar_en2 = this.__stringCharacterChange(event.anahtarlar_en);
      event.keywords_en2 = this.__stringCharacterChange(event.keywords_en);
      event.aciklama_es2 = this.__stringCharacterChange(event.aciklama_es);
      event.anahtarlar_es2 = this.__stringCharacterChange(event.anahtarlar_es);
      event.keywords_es2 = this.__stringCharacterChange(event.keywords_es);
      this.$store.dispatch("setPanelProductsUpdate", event);
    },
    process(event) {
      if (this.getPanelProductButtonStatus) {
        this.save(event);
      } else {
        this.update(event);
      }
    },
    newForm() {
      this.$store.dispatch("setPanelProductButtonStatus", true);
      this.$store.dispatch("setPanelProductModel");
      this.$store.dispatch("setPanelProductId", 0);
      this.$store.commit("setPanelProductPhotoListUpdate", []);

      this.model = this.getPanelProductModel;
      this.panel_form_dialog = true;
    },
    categorySelected(event) {
      this.$store.dispatch("setPanelNotPublishedListCategory", event.value.Id);
    },
  },
  watch: {
    getPanelCategoryList() {
      this.selectedCategory = this.getPanelCategoryList[0];
    },
  },
};
</script>
