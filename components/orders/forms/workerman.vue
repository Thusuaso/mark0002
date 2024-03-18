<template>
  <div>
    <div class="row mt-4 mb-4">
      <div class="col">
        <span class="p-float-label">
          <Calendar
            v-model="workerman_date"
            inputId="workerman_date"
            @date-select="workermanDateSelected($event)"
          />
          <label for="workerman_date">Date</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <AutoComplete
            id="supplier"
            v-model="selectedSupplier"
            :suggestions="filteredSupplier"
            @complete="searchSupplier($event)"
            field="FirmaAdi"
            @item-select="supplierSelected($event)"
          />

          <label for="supplier">Supplier</label>
        </span>
      </div>
      <div class="col">
        <CustomInput
          :value="model.Tutar"
          text="Price"
          @onInput="model.Tutar = $event"
          :disabled="false"
        />
      </div>
    </div>
    <div class="row mt-4 mb-4">
      <div class="col">
        <span class="p-float-label">
          <Textarea id="description" v-model="model.Aciklama" rows="5" class="w-100" />
          <label for="description">Explanation</label>
        </span>
      </div>
    </div>
    <div class="row mt-4 mb-4">
      <div class="col">
        <Button
          type="button"
          class="p-button-success w-100"
          label="Save"
          @click="process"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          class="p-button-danger w-100"
          label="Delete"
          @click="deleteForm"
          :disabled="deleted_button_disabled"
        />
      </div>
    </div>
    <div class="row mt-4 mb-4">
      <div class="col">
        <DataTable
          :value="list"
          :selection.sync="selectedWorkerman"
          selectionMode="single"
          @row-click="workermanSelected($event)"
        >
          <Column field="Tarih" header="Date">
            <template #body="slotProps">
              {{ slotProps.data.Tarih | dateToString }}
            </template>
          </Column>
          <Column field="FirmaAdi" header="Supplier"></Column>
          <Column field="Tutar" header="Price">
            <template #body="slotProps">
              {{ slotProps.data.Tutar | formatPriceUsd }}
            </template>
          </Column>
          <Column field="Aciklama" header="Description"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
<script>
import date from "../../../plugins/date";
export default {
  props: {
    list: {
      type: Array,
      required: false,
    },
    model: {
      type: Object,
      required: false,
    },
    supplier: {
      type: Array,
      required: true,
    },
    productId: {
      type: Number,
      required: true,
    },
    po: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedSupplier: null,
      filteredSupplier: null,
      workerman_date: null,
      selectedWorkerman: null,
      deleted_button_disabled: true,
    };
  },
  methods: {
    workermanSelected(event) {
      this.deleted_button_disabled = false;
      this.model = event.data;
      this.selectedSupplier = this.supplier.find((x) => x.ID == event.data.TedarikciID);
      this.workerman_date = date.stringToDate(event.data.Tarih);
      this.model.SiparisNo = this.po;
      this.model.UrunKartId = this.productId;
    },
    deleteForm() {
      this.deleted_button_disabled = true;
      this.selectedSupplier = null;
      this.workerman_date = null;
      this.model.UrunKartId = this.productId;
      this.model.SiparisNo = this.po;
      this.$store.dispatch("setProductionProductWorkermanDelete", this.model);
    },
    process() {
      if (this.deleted_button_disabled) {
        this.save();
      } else {
        this.update();
      }
    },
    update() {
      this.model.SiparisEkstraGiderTurID = 1;
      this.model.UrunKartId = this.productId;
      this.model.SiparisNo = this.po;
      this.$store.dispatch("setProductionProductWorkermanUpdate", this.model);
      this.selectedSupplier = null;
      this.workerman_date = null;
    },
    save() {
      this.model.SiparisEkstraGiderTurID = 1;
      this.model.UrunKartId = this.productId;
      this.model.SiparisNo = this.po;
      this.$store.dispatch("setProductionProductWorkermanSave", this.model);
      this.selectedSupplier = null;
      this.workerman_date = null;
    },
    workermanDateSelected(event) {
      this.model.Tarih = date.dateToString(event);
    },
    supplierSelected(event) {
      this.model.TedarikciID = event.value.ID;
      this.model.TedarikciAdi = event.value.FirmaAdi;
    },
    searchSupplier(event) {
      let results;
      if (event.query.length == 0) {
        results = this.supplier;
      } else {
        results = this.supplier.filter((supplier) => {
          return supplier.FirmaAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredSupplier = results;
    },
  },
};
</script>
