<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <Dropdown
          v-model="selectedCategory"
          :options="getPanelCategoryList"
          optionLabel="kategoriadi_en"
          class="w-100"
          @change="categorySelected($event)"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          class="p-button-info w-100"
          label="Change Queue"
          @click="changeQueue"
          :disabled="change_queue_button_status"
        />
      </div>
    </div>
    <DataTable
      :value="getPanelPublishedList"
      responsiveLayout="scroll"
      class="p-datatable-sm"
      :reorderableColumns="true"
      @row-reorder="reOrderPanelPublishedList($event)"
      :sortOrder="1"
      sortField="sira"
    >
      <Column
        :rowReorder="true"
        :headerStyle="{ width: '3rem' }"
        :reorderableColumn="false"
      />
      <Column field="sira" header="Queue"> </Column>
      <Column field="urunid" header="Product Id"> </Column>
      <Column field="urunkod" header="Product Code"> </Column>
      <Column field="urunadi_en" header="Product Name"> </Column>
      <Column field="Image" header="#">
        <template #body="slotProps">
          <img lazyload :src="slotProps.data.Image" width="100" height="100" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  middleware: ["authority"],
  computed: {
    ...mapGetters(["getPanelPublishedList", "getPanelCategoryList"]),
  },
  created() {
    this.$store.dispatch("setPanelPublishedList");
  },
  data() {
    return {
      selectedCategory: null,
      change_queue_button_status: false,
    };
  },
  methods: {
    changeQueue() {
      this.$store.dispatch("setBeginLoadingAction");
      this.change_queue_button_status = true;
      let index = 0;
      while (index < this.getPanelPublishedList.length) {
        this.$store.dispatch("setPanelProductQueue", this.getPanelPublishedList[index]);
        index++;

        if (index + 1 == this.getPanelPublishedList.length) {
          this.$toast.success("Başarıyla Değiştirildi.");
          this.$store.dispatch("setEndLoadingAction");
          this.change_queue_button_status = false;
        }
      }
    },

    reOrderPanelPublishedList(event) {
      let queue = 0;
      event.value.forEach((x) => {
        queue++;
        x.sira = queue;
      });
      this.$store.commit("setPanelPublishedChangedList", event.value);
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
