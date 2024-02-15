<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <Button
          type="button"
          class="p-button-success w-100"
          label="Yeni"
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
    this.$store.dispatch("setPanelPublishedList");
    this.$store.dispatch("setPanelProductSharedList");
  },
  methods: {
    panelPublishedListSelected(event) {
      this.$store.dispatch("setPanelProductId", event.urunid);
      this.$store.dispatch("setPanelProductFiltersList", event.urunid);
      this.$store.dispatch("setPanelProductButtonStatus", false);
      this.model = event;
      this.panel_form_dialog = true;
    },
    deleteProduct(event) {
      this.$store.dispatch("setPanelProductsDelete", event);
      this.panel_form_dialog = false;
    },
    save(event) {
      this.$store.dispatch("setPanelProductsSave", event);
    },
    update(event) {
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
      this.model = this.getPanelProductModel;
      this.panel_form_dialog = true;
    },
    categorySelected(event) {
      this.$store.dispatch("setPanelPublishedListCategory", event.value.Id);
    },
  },
  watch: {
    getPanelCategoryList() {
      this.selectedCategory = this.getPanelCategoryList[0];
    },
  },
};
</script>
