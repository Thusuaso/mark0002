<template>
    <div>
        <div class="row mt-3">
            <div class="col-4">
                <div class="row mb-4">
                    <div class="col-9">
                        <span class="p-float-label">
                            <InputText class="w-100" id="productId" v-model="model.UrunKartID" disabled />
                            <label for="productId">Product Card Id</label>
                        </span>
                    </div>
                    <div class="col">
                        <Button type="button" class="p-button-secondary" label="@"
                            @click="product_cards_form_dialog = true" :disabled="product_form_disabled" />
                    </div>
                </div>
                <span class="p-float-label mb-4">
                    <InputText class="w-100" id="category" v-model="categoryName" disabled />
                    <label for="category">Category</label>
                </span>
                <span class="p-float-label mb-4">
                    <InputText class="w-100" id="product" v-model="productName" disabled />
                    <label for="product">Product</label>
                </span>
                <span class="p-float-label mb-4">
                    <InputText class="w-100" id="surface" v-model="surfaceName" disabled />
                    <label for="surface">Surface</label>
                </span>
                <span class="p-float-label mb-4">
                    <InputText class="w-100" id="size" v-model="sizeName" disabled />
                    <label for="size">Size</label>
                </span>
                <span class="p-float-label mb-4 w-100">
                    <AutoComplete v-model="selectedSupplier" inputId="supplier" :suggestions="filteredSupplier"
                        @complete="searchSupplier($event)" @item-select="supplierSelected($event)" field="FirmaAdi"
                        class="w-100" :disabled="product_form_disabled" />
                    <label for="supplier">Supplier</label>
                </span>
                <div class="row mb-4">
                    <div class="col">
                        <CustomInput :value="model.AlisFiyati" text="Purchase Price"
                            @onInput="model.AlisFiyati = $event" :disabled="product_form_disabled" />
                    </div>
                    <div class="col">
                        <CustomInput :value="model.SatisFiyati" text="Selling Price"
                            @onInput="model.SatisFiyati = $event" :disabled="product_form_disabled" />
                    </div>

                </div>
                <div class="row mb-4">
                    <div class="col">
                        <span class="p-float-label w-100">
                            <AutoComplete v-model="selectedUnit" inputId="unit" :suggestions="filteredUnit"
                                @complete="searchUnit($event)" @item-select="unitSelected($event)" field="BirimAdi"
                                class="w-100" :disabled="product_form_disabled" />
                            <label for="unit">Unit</label>
                        </span>
                    </div>
                    <div class="col">
                        <CustomInput :value="model.Miktar" text="Amount" @onInput="model.Miktar = $event"
                            :disabled="product_form_disabled" @change="tonajChange($event)"/>
                    </div>
                    <div class="col">
                        <CustomInput :value="model.Adet" text="Piece" @onInput="model.Adet = $event"
                            :disabled="product_form_disabled" />
                    </div>
                </div>
                <div class="row mb-4">
                    <div class="col">
                        <span class="p-float-label">
                            <InputText class="w-100" id="queue" v-model="model.SiraNo"
                                :disabled="product_form_disabled" />
                            <label for="queue">#</label>
                        </span>
                    </div>
                    <div class="col">
                        <CustomInput :value="model.OzelMiktar" text="M2" @onInput="model.OzelMiktar = $event"
                            :disabled="product_form_disabled" @change="tonajChange2($event)"/>
                    </div>
                    <div class="col">
                        <CustomInput :value="model.Ton" text="Ton" @onInput="model.Ton = $event"
                            :disabled="product_form_disabled" />
                    </div>
                </div>
                <div class="row mb-4">
                    <div class="col">
                        <Button type="button" class="p-button-info w-100" label="Labour Cost"
                            @click="$emit('workerman_selected_emit', model.UrunKartID)"
                            :disabled="workerman_button_disabled" />
                    </div>
                </div>
            </div>
            <div class="col-8">
                <span class="p-float-label mb-4">
                    <Textarea v-model="model.MusteriAciklama" rows="10" class="w-100"
                        :disabled="product_form_disabled" />
                    <label>Explanation(EN)</label>
                </span>
                <span class="p-float-label">
                    <Textarea v-model="model.UretimAciklama" rows="10" class="w-100"
                        :disabled="product_form_disabled" />
                    <label>Explanation(TR)</label>
                </span>
                <div class="row mt-4" v-if="po">
                    <div class="col">
                        <Button type="button" class="p-button-primary w-100" label="New Product"
                            :disabled="new_button_disabled" @click="newForm" />
                    </div>
                    <div class="col">
                        <Button type="button" class="p-button-secondary w-100" label="Cancel"
                            :disabled="cancel_button_disabled" @click="cancelForm" />
                    </div>
                    <div class="col">
                        <Button type="button" class="p-button-success w-100" label="Add" :disabled="add_button_disabled"
                            @click="add" />
                    </div>
                    <div class="col">
                        <Button type="button" class="p-button-warning w-100" label="Update"
                            :disabled="update_button_disabled" @click="update" />
                    </div>
                    <div class="col">
                        <Button type="button" class="p-button-danger w-100" label="Delete"
                            :disabled="delete_button_disabled" @click="deleteItem" />
                    </div>
                </div>
            </div>
        </div>
        <DataTable :value="products" :selection.sync="selectedOrderProducts" selectionMode="single"
            @row-click="orderProductsSelected($event)" :sortField="'SiraNo'" :sortOrder="1" :rowClass="rowClass">
            <Column field="SiraNo" header="#"></Column>
            <Column field="FirmaAdi" header="Supplier"></Column>
            <Column field="UrunAdi" header="Product"></Column>
            <Column field="YuzeyIslemAdi" header="Surface"></Column>
            <Column field="En" header="Width"></Column>
            <Column field="Boy" header="Height"></Column>
            <Column field="Kenar" header="Thickness"></Column>
            <Column header="M2">
                <template #body="slotProps">
                    <div v-if="slotProps.data.UrunBirimID == 1"
                        :style="{ backgroundColor: slotProps.data.UrunBirimID == 1 ? 'red' : '' }">
                        {{ slotProps.data.Miktar | formatDecimal }}
                    </div>
                    <div v-else :style="{ backgroundColor: slotProps.data.UrunBirimID == 1 ? 'red' : '' }">
                        {{ slotProps.data.OzelMiktar | formatDecimal }}
                    </div>
                </template>
                <template #footer>
                    {{ detailProductTotal.m2 | formatDecimal }}
                </template>
            </Column>
            <Column header="Piece">
                <template #body="slotProps">
                    <div v-if="slotProps.data.UrunBirimID == 2"
                        :style="{ backgroundColor: slotProps.data.UrunBirimID == 2 ? 'red' : '' }">
                        {{ slotProps.data.Miktar | formatDecimal }}
                    </div>
                    <div v-else :style="{ backgroundColor: slotProps.data.UrunBirimID == 2 ? 'red' : '' }">
                        {{ 0 | formatDecimal }}
                    </div>
                </template>
                <template #footer>
                    {{ detailProductTotal.piece | formatDecimal }}
                </template>
            </Column>
            <Column header="MT">
                <template #body="slotProps">
                    <div v-if="slotProps.data.UrunBirimID == 3"
                        :style="{ backgroundColor: slotProps.data.UrunBirimID == 3 ? 'red' : '' }">
                        {{ slotProps.data.Miktar | formatDecimal }}
                    </div>
                    <div v-else :style="{ backgroundColor: slotProps.data.UrunBirimID == 3 ? 'red' : '' }">
                        {{ 0 | formatDecimal }}
                    </div>
                </template>
                <template #footer>
                    {{ detailProductTotal.mt | formatDecimal }}
                </template>
            </Column>
            <Column field="Ton" header="Ton">
                <template #body="slotProps">
                    {{ slotProps.data.Ton | formatDecimal }}
                </template>
                <template #footer>
                    {{ detailProductTotal.ton | formatDecimal }}
                </template>
            </Column>
            <Column field="OzelMiktar" header="Ö.M">
                <template #body="slotProps">
                    {{ slotProps.data.OzelMiktar | formatDecimal }}
                </template>
            </Column>
            <Column field="SatisFiyati" header="Sales Price">
                <template #body="slotProps">
                    {{ slotProps.data.SatisFiyati | formatPriceUsd }}
                </template>
            </Column>
            <Column header="Total (Selling)">
                <template #body="slotProps">
                    {{ (slotProps.data.Miktar * slotProps.data.SatisFiyati) | formatPriceUsd }}
                </template>
                <template #footer>
                    {{ detailProductTotal.total | formatPriceUsd }}
                </template>
            </Column>
            <Column field="AlisFiyati" header="Purchase Price">
                <template #body="slotProps">
                    {{ slotProps.data.AlisFiyati | formatPriceUsd }}
                </template>
            </Column>

            <Column header="Total (Purchase)">
                <template #body="slotProps">
                    {{ (slotProps.data.Miktar * slotProps.data.AlisFiyati) | formatPriceUsd }}
                </template>
                <template #footer>
                    {{ detailProductTotal.total | formatPriceUsd }}
                </template>
            </Column>
        </DataTable>

        <Dialog :visible.sync="product_cards_form_dialog" header="Product Data" modal>
            <productCards @cards_selected_emit="productCardsSelected($event)" />
        </Dialog>
    </div>
</template>
<script>
export default {
    props: {
        model: {
            type: Object,
            required: true,
        },
        products: {
            type: Array,
            required: false,
        },
        supplier: {
            type: Array,
            required: true,
        },
        unit: {
            type: Array,
            required: true,
        },
        po: {
            type: String,
            required: false,
        },
        detailProductTotal: {
            type: Object,
            required: false,
        },
        status: {
            type: Boolean,
            required: false,
        },

    },
    data() {
        return {
            width: 0,
      height:0,
      thickness:0,
            totals:0,
            product_cards_form_dialog: false,
            categoryName: null,
            productName: null,
            surfaceName: null,
            sizeName: null,
            selectedSupplier: null,
            filteredSupplier: null,
            selectedUnit: null,
            filteredUnit: null,
            selectedOrderProducts: null,
            new_button_disabled: false,
            cancel_button_disabled: true,
            add_button_disabled: true,
            update_button_disabled: true,
            delete_button_disabled: true,
            product_form_disabled: true,
            workerman_button_disabled: true,
        };
    },
    mounted() {
        this.totals = 0;
        this.products.forEach(x => {
            this.totals += this.__noneControl(x.AlisFiyati) * this.__noneControl(x.Miktar);
        });
    },
    methods: {
        __typeFloatControl(payload) {
      if (payload.toString().indexOf(',') == -1) {
        return parseFloat(payload);


      } else {
        return parseFloat(payload.replace(",", "."));

      }
    },
    oM2Change(en, boy, miktar, birim) {
      if (birim == 1) {
        return miktar;
      } else if (birim == 2) {
        if (
          en == "FR" ||
          en == "FRENCH" ||
          en == "VAR" ||
          en == "Various" ||
          en == "ANT" ||
          en == "SLAB" ||
          en == "1 LT" ||
          en == "Crazy" ||
          en == "Other" ||
          en == "SET" ||
          en == "MINI" ||
          boy == "SET" ||
          boy == "Free" ||
          boy == "FREE"
        ) {
          return 0;
        } else {
          return (
            (parseFloat(en.replace(",", ".")) / 100) *
            (parseFloat(boy.replace(",", ".")) / 100) *
            miktar
          ).toFixed(4);
        }
      } else if (birim == 3) {
        if (
          en == "FR" ||
          en == "FRENCH" ||
          en == "VAR" ||
          en == "Various" ||
          en == "ANT" ||
          en == "SLAB" ||
          en == "1 LT" ||
          en == "Crazy" ||
          en == "Other" ||
          en == "SET" ||
          en == "MINI" ||
          boy == "SET"
        ) {
          return 0;
        } else if (boy == "Free" || boy == "FREE") {
          return (miktar * (parseFloat(en.replace(",", ".")) / 100)).toFixed(4);
        } else {
          let adet = miktar / (parseFloat(boy.replace(",", ".")) / 100);
          return (
            adet *
            (parseFloat(boy.replace(",", ".")) / 100) *
            (parseFloat(en.replace(",", ".")) / 100)
          ).toFixed(4);
        }
      } else {
        return 0;
      }
    },
    productCoefficient(event) {
      if (event == "Travertine") {
        return 2.4;
      } else if (event == "Marble") {
        return 2.82;
      } else if (event == "Limestone") {
        return 2.6;
      } else if (event == "Quarts") {
        return 2.5;
      } else {
        return 0;
      }
    },
        tonajChange2(event) {
      if (event == 0) {
        this.model.Ton = 0;
        return;
      }
      let coefficient = this.productCoefficient(this.categoryName.split(" ")[0]);

      if (this.thickness == 'VAR' || this.thickness == 'Various' || this.thickness == 'SLAB' || this.thickness == 'Slab') {
        this.model.Ton = 0;
      } else {

        if (this.selectedUnit.ID == 1) {
          this.model.Ton = ((coefficient * 10 * this.__typeFloatControl(event) * parseFloat(this.thickness.replace(',', '.'))) / 1000);
        } else {
          this.model.Ton = ((coefficient * 10 * this.__typeFloatControl(event) * parseFloat(this.thickness.replace(',', '.'))) / 1000);
        }
      };
    },    tonajChange(event) {
      if (event == 0) {
        this.model.Ton = 0;
        this.model.OzelMiktar = 0;
        this.model.Adet = 0;
        return;
      }
      if (this.height == 'Free'
        || this.height == 'FREE'
        || this.height == 'VAR'
        || this.height == 'Var'
        || this.heiht == 'Various'
        || this.height == 'SLAB'
        || this.height == 'Slab'
        || this.height == 'PAT'
        || this.height == 'Pat'
        || this.height == 'SET'
        || this.height == 'SINK'
        || this.width == 'Ant'
        || this.width == 'ANT'
        || this.width == 'FRENCH'
        || this.width == 'MINI'
        || this.thickness == 'Other'
        || this.width == 'özel'
        || this.width == '1 LT'
      ) {
        if (this.selectedUnit.ID == 1) {
          this.model.OzelMiktar = this.model.Miktar;

        } else if (this.selectedUnit.ID == 2) {
          this.model.Adet = this.model.Miktar;
        }
        else {
          this.model.OzelMiktar = 0;

        }
      } else {
        if (this.selectedUnit.ID == 1) {
          this.model.OzelMiktar = this.model.Miktar;
          this.model.Adet = Math.round(((this.__typeFloatControl(event) / (this.__typeFloatControl(this.width) / 100)) / (this.__typeFloatControl(this.height) / 100)));
        } else if (this.selectedUnit.ID == 2) {
          this.model.OzelMiktar = (this.__typeFloatControl(this.width) * this.__typeFloatControl(this.height) * this.__typeFloatControl(event)) / 10000;
          this.model.Adet = this.model.Miktar;
        } else if (this.selectedUnit.ID == 3) {
          this.model.OzelMiktar = (this.__typeFloatControl(event) * this.__typeFloatControl(this.width)) / 100;
          this.model.Adet = Math.round(((this.__typeFloatControl(this.model.OzelMiktar) / (this.__typeFloatControl(this.width) / 100)) / (this.__typeFloatControl(this.height) / 100)));

        }
      }
      let coefficient = this.productCoefficient(this.categoryName.split(" ")[0]);

      if (this.thickness == 'VAR' || this.thickness == 'Various' || this.thickness == 'SLAB' || this.thickness == 'Slab') {
        this.model.Ton = 0;
      }else{

        if (this.selectedUnit.ID == 1) {
          this.model.Ton = ((coefficient * 10 * this.__typeFloatControl(event) * parseFloat(this.thickness.replace(',','.'))) / 1000);
        } else  {
          this.model.Ton = ((coefficient * 10 * this.__typeFloatControl(this.model.OzelMiktar) * parseFloat(this.thickness.replace(',', '.'))) / 1000);
        }
      };

      









      // if (this.width == 'VAR' || this.width == 'Various' || this.width == 'SLAB'){
      //   if (this.thickness == 'VAR' || this.thickness == 'Various' || this.thickness == 'SLAB' || this.thickness == 'Slab'){
      //     this.model.Ton = 0;

      //   } else{
      //     if (this.selectedUnit.ID == 1) {
      //       this.model.Ton == ((coefficient * 10 * this.__typeFloatControl(event)) / 1000).toFixed(3);
      //     } else {
      //       this.model.Ton = 0;
      //     }

      //   }

      //   } else if (this.height == 'Free' || this.height == 'FREE'){
      //     if(this.selectedUnit.ID == 3){
      //       const mt = (this.__typeFloatControl(event) * this.__typeFloatControl(this.width)) / 100;
      //       this.model.Ton = (((coefficient * 10 * mt * this.__typeFloatControl(this.thickness))) / 1000).toFixed(3);

      //     } else{

      //       this.model.Ton;
      //     }

      //   } else{
      //     if (this.selectedUnit.ID == 1) {
            
      //       this.model.Ton = parseFloat((coefficient * 10 * this.__typeFloatControl(event) * this.__typeFloatControl(this.thickness)) / 1000)

      //     } else if (this.selectedUnit.ID == 2) {
      //       if (this.thickness == 'VAR' || this.thickness == 'Various' || this.thickness == 'SLAB' || this.thickness == 'Slab') {
      //         this.model.Ton = 0;
      //         this.model.OzelMiktar = 0;
      //       } else {
      //         const m2 = (this.__typeFloatControl(this.width) * this.__typeFloatControl(this.height) * this.__typeFloatControl(event)) / 10000;
      //         this.model.Ton = parseFloat((coefficient * 10 * m2 * this.__typeFloatControl(this.thickness)) / 1000);
      //         this.model.OzelMiktar = m2;
      //       }


      //     }

      //   }


    },
        __noneControl(val){
            if(val == null || val == undefined || val == ""){
                return 0;
            }else{
                return val;
            }
        },
        rowClass(event) {
            if (
                event.AlisFiyati == 0 ||
                event.AlisFiyati == null ||
                event.AlisFiyati == undefined
            ) {
                return "row-accessories";
            }
        },
        __nullControl(value) {
            if (value == null || value == "" || value == undefined) {
                return 0;
            } else {
                return value;
            }
        },
        deleteItem() {
            const log = {
                description:
                    this.po +
                    " siparişinden " +
                    this.model.MusteriAciklama +
                    " (" +
                    this.model.Miktar +
                    ") " +
                    this.selectedUnit.BirimAdi +
                    " kalemi silindi.",
                po: this.po,
                color: "#ffec31",
            };
            this.$logs.save(log);

            this.categoryName = null;
            this.productName = null;
            this.surfaceName = null;
            this.sizeName = null;
            this.selectedSupplier = null;
            this.selectedUnit = null;
            this.selectedOrderProducts = null;
            this.product_form_disabled = true;
            this.new_button_disabled = false;
            this.cancel_button_disabled = true;
            this.add_button_disabled = true;
            this.update_button_disabled = true;
            this.delete_button_disabled = true;
            this.workerman_button_disabled = true;
            this.$store.dispatch("setOrderProductDeleted", this.model);
        },
        add() {
            const log = {
                description:
                    this.po +
                    " siparişine " +
                    this.model.MusteriAciklama +
                    " (" +
                    this.model.Miktar +
                    ") " +
                    this.selectedUnit.BirimAdi +
                    " yeni kalem eklendi.",
                po: this.po,
                color: "#ffec31",
            };
            this.$logs.save(log);

            this.categoryName = null;
            this.productName = null;
            this.surfaceName = null;
            this.sizeName = null;
            this.selectedSupplier = null;
            this.selectedUnit = null;
            this.selectedOrderProducts = null;
            this.product_form_disabled = true;
            this.new_button_disabled = false;
            this.cancel_button_disabled = true;
            this.add_button_disabled = true;
            this.update_button_disabled = true;
            this.delete_button_disabled = true;
            this.model.SatisToplam = this.model.SatisFiyati * this.model.Miktar;
            this.model.SiparisNo = this.po;
            this.workerman_button_disabled = true;
            this.model.Adet = this.__nullControl(this.model.Adet);

            this.$store.dispatch("setOrderProductAdded", this.model);
        },
        update() {
            const log = {
                description:
                    this.po +
                    " siparişinde " +
                    this.model.MusteriAciklama +
                    " (" +
                    this.model.Miktar +
                    ") " +
                    this.selectedUnit.BirimAdi +
                    " kalemi güncellendi.",
                po: this.po,
                color: "#ffec31",
            };
            this.$logs.save(log);
            this.categoryName = null;
            this.productName = null;
            this.surfaceName = null;
            this.sizeName = null;
            this.selectedSupplier = null;
            this.selectedUnit = null;
            this.selectedOrderProducts = null;
            this.product_form_disabled = true;
            this.new_button_disabled = false;
            this.cancel_button_disabled = true;
            this.add_button_disabled = true;
            this.update_button_disabled = true;
            this.delete_button_disabled = true;
            this.model.SatisToplam = this.model.SatisFiyati * this.model.Miktar;
            this.model.SiparisNo = this.po;
            this.workerman_button_disabled = true;
            this.model.Adet = this.__nullControl(this.model.Adet);
            this.$store.dispatch("setOrderProductUpdated", this.model);
        },
        cancelForm() {
            this.new_button_disabled = false;
            this.cancel_button_disabled = true;
            this.add_button_disabled = true;
            this.update_button_disabled = true;
            this.delete_button_disabled = true;
            this.categoryName = null;
            this.productName = null;
            this.surfaceName = null;
            this.sizeName = null;
            this.selectedSupplier = null;
            this.selectedUnit = null;
            this.selectedOrderProducts = null;
            this.product_form_disabled = true;
            this.workerman_button_disabled = true;
            this.$store.dispatch("setOrderProductModel");
        },
        newForm() {
            this.new_button_disabled = true;
            this.cancel_button_disabled = false;
            this.add_button_disabled = false;
            this.product_form_disabled = false;
            this.model.SiraNo = this.products.length + 1;
        },
        orderProductsSelected(event) {
            this.product_form_disabled = false;
            this.new_button_disabled = true;
            this.cancel_button_disabled = false;
            this.add_button_disabled = true;
            this.update_button_disabled = false;
            this.delete_button_disabled = false;
            this.workerman_button_disabled = false;
            this.model = event.data;
            this.selectedUnit = this.unit.find((x) => x.ID == event.data.UrunBirimID);
            this.selectedSupplier = this.supplier.find((x) => x.ID == event.data.TedarikciID);
            this.categoryName = event.data.KategoriAdi;
            this.productName = event.data.UrunAdi;
            this.surfaceName = event.data.YuzeyIslemAdi;
            this.sizeName = event.data.En + "x" + event.data.Boy + "x" + event.data.Kenar;
            this.width = event.data.En;
            this.height = event.data.Boy;
            this.thickness = event.data.Kenar;
            const data = {
                SiparisNo: event.data.SiparisNo,
                FirmaAdi: event.data.FirmaAdi,
                KategoriAdi: event.data.KategoriAdi,
                UrunAdi: event.data.UrunAdi,
                YuzeyIslemAdi: event.data.YuzeyIslemAdi,
                En: event.data.En,
                Boy: event.data.Boy,
                Kenar: event.data.Kenar,
                UretimAciklama: event.data.UretimAciklama,
                Miktar: event.data.Miktar,
                AlisFiyati: event.data.AlisFiyati,
                SatisFiyati: event.data.SatisFiyati,
                ID: event.data.ID,
            };

            this.$store.dispatch("setOrderProductionProductDetailNotChangeList", data);
        },
        unitSelected(event) {
            this.model.UrunBirimID = event.value.ID;
        },
        searchUnit(event) {
            let results;
            if (event.query.length === 0) {
                results = this.unit;
            } else {
                results = this.unit.filter((x) => {
                    return x.BirimAdi.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            this.filteredUnit = results;
        },
        supplierSelected(event) {
            this.model.TedarikciID = event.value.ID;
            this.model.FirmaAdi = event.value.FirmaAdi;
        },
        searchSupplier(event) {
            let results;
            if (event.query.length === 0) {
                results = this.supplier;
            } else {
                results = this.supplier.filter((x) => {
                    return x.FirmaAdi.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            this.filteredSupplier = results;
        },
        productCardsSelected(event) {
            this.product_cards_form_dialog = false;
            this.model.UrunKartID = event.ID;
            this.categoryName = event.KategoriAdi;
            this.productName = event.UrunAdi;
            this.surfaceName = event.YuzeyIslemAdi;
            this.sizeName = event.En + "x" + event.Boy + "x" + event.Kenar;
            this.model.MusteriAciklama =
                event.KategoriAdi +
                "-" +
                event.UrunAdi +
                "-" +
                event.YuzeyIslemAdi +
                "-" +
                event.En +
                "x" +
                event.Boy +
                "x" +
                event.Kenar;

            this.model.UrunAdi = event.UrunAdi;
            this.model.YuzeyIslemAdi = event.YuzeyIslemAdi;
            this.model.En = event.En;
            this.model.Boy = event.Boy;
            this.model.Kenar = event.Kenar;
            this.model.KategoriAdi = event.KategoriAdi;
            this.width = event.En;
            this.height = event.Boy;
            this.thickness = event.Kenar;
        },
    },
};
</script>
<style scoped>
:deep(.row-accessories) {
    background-color: #81fca0 !important;
}

@media screen and (max-width:576px) {

    .row .mt-3 {
        display: block;
        width: 100%;
    }

    .col {
        display: block;
        width: 100%;
    }

    .col-4 {
        display: block;
        width: 100%;
    }

    .col-8 {
        display: block;
        width: 100%;
    }
}
</style>
