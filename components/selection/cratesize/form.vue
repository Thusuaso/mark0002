<template>
  <div>
    <div class="row mt-3">
      <div class="col">
        <span class="p-float-label">
          <AutoComplete id="supplier" v-model="selectedSupplier" :suggestions="filteredSupplierList"
            @complete="searchSupplier($event)" field="FirmaAdi" />
          <label for="supplier">Supplier</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="stonesize" type="text" v-model="width" @input="width = width.replace(',','.')"/>
          <label for="stonesize">Width</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="stonesize" type="text" v-model="height" @input="height = height.replace(',','.')"/>
          <label for="stonesize">Height</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="stonesize" type="text" v-model="thickness" @input="thickness = thickness.replace(',','.')"/>
          <label for="stonesize">Thickness</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="cratesize" type="text" v-model="Ebat" />
          <label for="cratesize">Tile Size</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="amount" type="text" v-model="Adet" @input="Adet = Adet.replace(',','.')"/>
          <label for="amount">Piece</label>
        </span>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <Button type="button" class="p-button-success w-100" label="Save" @click="saveProcess" />
      </div>
      <div class="col">
        <Button type="button" class="p-button-danger w-100" label="Delete" @click="deleteForm" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    supplier: {
      type: Array,
      required: true,
    },
    model: {
      type: Object,
      required: false,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      thickness:null,
      height:null,
      width: null,
      Ebat: null,
      Adet: 0,
      stoneSize: null,
      selectedSupplier: null,
      filteredSupplierList: null,
    };
  },
  created() {
    if (!this.status) {
      this.selectedSupplier = this.supplier.find((x) => x.ID == this.model.SupplierId);
      this.Ebat = this.model.Stone_Size;
      this.Adet = this.model.Piece;

      
      this.thickness = this.model.Crate_Thickness;
      this.height = this.model.Crate_Height;
      this.width =  this.model.Crate_Width;
    }
  },
  methods: {
    deleteForm() {
      this.$store.dispatch("setSelectionProductionCrateSizeDelete", this.model.ID);
      this.$emit("selection_production_crate_size_dialog_close");
    },
    update() {
      this.model.TedarikciId = this.selectedSupplier.ID;
      this.model.TedarikciAdi = this.selectedSupplier.FirmaAdi;
      this.model.Ebat = this.Ebat;
      this.model.Adet = this.Adet;
      this.model.width = this.width;
      this.model.height = this.height;
      this.model.thickness = this.thickness;
      this.$store.dispatch("setSelectionProductionCrateSizeUpdate", this.model);
    },
    save() {
      const data = {
        Ebat: this.Ebat,
        width:this.width,
        height:this.height,
        thickness:this.thickness,
        Adet: this.Adet,
        TedarikciId: this.selectedSupplier.ID,
        TedarikciAdi:this.selectedSupplier.FirmaAdi
      };
      this.$store.dispatch("setSelectionProductionCrateSizeSave", data);
      this.$emit("selection_production_crate_size_dialog_close");
    },
    saveProcess() {
      if (this.status) {
        this.save();
      } else {
        this.update();
      }
    },
    searchSupplier(event) {
      let results;
      if (event.query.length == 0) {
        results = this.supplier;
      } else {
        results = this.supplier.filter((x) => {
          return x.FirmaAdi.toLowerCase().includes(event.query.toLowerCase());
        });
      }
      this.filteredSupplierList = results;
    },
  },
};
</script>
