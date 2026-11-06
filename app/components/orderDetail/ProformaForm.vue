<template>
  <div>
    <div class="row">
      <div class="col-3">
        <Select
          v-model="selectedDelivery"
          :options="delivery"
          filter
          optionLabel="TeslimTur"
          placeholder="Delivery Term"
          class="w-100 mb-4"
          @change="deliveryChange($event)"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex align-items-center">
              <div>{{ slotProps.value.TeslimTur }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="flex align-items-center">
              <div>{{ slotProps.option.TeslimTur }}</div>
            </div>
          </template>
        </Select>
        <Select
          v-model="selectedPayment"
          :options="payment"
          filter
          optionLabel="OdemeTur"
          placeholder="Payment Term"
          class="w-100 mb-4"
          @change="paymentChange($event)"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex align-items-center">
              <div>{{ slotProps.value.OdemeTur }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="flex align-items-center">
              <div>{{ slotProps.option.OdemeTur }}</div>
            </div>
          </template>
        </Select>
        <FloatLabel class="mb-4">
          <DatePicker
            v-model="maturityDate"
            inputId="maturity"
            @date-select="maturityDateSelected($event)"
            class="w-100"
            dateFormat="dd/mm/yy"
            @change="maturityDateChange($event)"
          />
          <label for="maturity">Maturity</label>
        </FloatLabel>
        <FloatLabel class="mb-4">
          <AutoComplete
            v-model="selectedCountry"
            inputId="country"
            :suggestions="filteredCountry"
            @complete="searchCountry($event)"
            @item-select="countrySelected($event)"
            optionLabel="UlkeAdi"
          />
          <label for="country">Country</label>
        </FloatLabel>
        <FloatLabel class="mb-4">
          <InputText
            id="paidDescription"
            v-model="model.OdemeAciklama"
            class="w-100"
          />
          <label for="paidDescription">Payment Details</label>
        </FloatLabel>
        <FloatLabel class="mb-4">
          <InputText
            id="container"
            v-model="model.KonteynerAyrinti"
            class="w-100"
          />
          <label for="container">Container Detail</label>
        </FloatLabel>
        <FloatLabel class="mb-4">
          <InputText
            id="document"
            v-model="model.EvrakGideri"
            class="w-100"
            @input="evrakGideri($event)"
          />
          <label for="document">Document Cost</label>
        </FloatLabel>
        <FloatLabel class="mb-4">
          <InputText
            id="commission"
            v-model="model.Komisyon"
            class="w-100"
            @input="bankerage($event)"
          />
          <label for="commission">Commission</label>
        </FloatLabel>
        <FloatLabel class="mb-4">
          <InputText
            id="return"
            v-model="model.Iade"
            class="w-100"
            @input="refund($event)"
          />
          <label for="return">Refund</label>
        </FloatLabel>
        <FloatLabel class="mb-4">
          <Select
            v-model="selectedInvoice"
            inputId="invoice"
            :options="invoice"
            optionLabel="FaturaAdi"
            class="w-100"
            @change="invoiceChange($event)"
          />
          <label for="invoice">Invoice Type</label>
        </FloatLabel>
        <FloatLabel>
          <Select
            v-model="selectedSourceType"
            inputId="source_type"
            :options="source"
            optionLabel="KaynakTuru"
            class="w-100"
            @change="sourceTypeChange($event)"
          />
          <label for="source_type">Source Type</label>
        </FloatLabel>
        <!-- <div class="row">
          <div class="col">
            <div class="flex align-items-center">
              <Checkbox v-model="model.depo_yukleme" :binary="true" />
              <label for="ingredient1" class="ml-2"> Atlanta Sm </label>
            </div>
          </div>
          <div class="col">
            <div class="flex align-items-center">
              <Checkbox v-model="model.MayaControl" :binary="true" />
              <label for="ingredient2" class="ml-2"> Maya Payment</label>
            </div>
          </div>
        </div> -->
      </div>
      <div class="col-9">
        <FloatLabel class="mb-4">
          <Textarea v-model="model.UretimAciklama" rows="5" class="w-100" />
          <label>AYO Explanation</label>
        </FloatLabel>
        <FloatLabel class="mb-4">
          <Textarea v-model="model.SevkiyatAciklama" rows="5" class="w-100" />
          <label>Shipped Explanation</label>
        </FloatLabel>
        <FloatLabel class="mb-4">
          <Textarea v-model="model.FinansAciklama" rows="5" class="w-100" />
          <label>Finance Explanation</label>
        </FloatLabel>
        <div class="row">
          <div class="col">
            <FileUpload
              mode="basic"
              accept=".pdf"
              customUpload
              @select="uploadInvoiceDocument($event)"
              chooseLabel="Upload Proforma"
              :disabled="proformaUploadButtonStatus"
            />
          </div>
          <div class="col">
            <FileUpload
              accept=".pdf"
              @select="selectedDrawingDocument($event)"
              auto
              chooseLabel="Upload Drawing"
              :disabled="proformaUploadButtonStatus"
              :multiple="true"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <Card class="cardClass">
          <template #title>Selling</template>
          <template #content>
            <div class="row mb-4">
              <div class="col">
                <FloatLabel>
                  <InputText
                    id="freight"
                    v-model="model.NavlunSatis"
                    @input="freightInput($event)"
                    style="width: 100%"
                  />
                  <label for="freight">Freight</label>
                </FloatLabel>
              </div>
              <div class="col">
                <FloatLabel>
                  <InputText
                    id="freightComp"
                    v-model="model.NavlunFirma"
                    style="width: 100%"
                  />
                  <label for="freightComp">Freight Company</label>
                </FloatLabel>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <FloatLabel>
                  <InputText
                    id="detail1"
                    v-model="model.DetayTutar_1"
                    @input="detail1Input($event)"
                    style="width: 100%"
                  />
                  <label for="detail1">Detail 1</label>
                </FloatLabel>
              </div>
              <div class="col">
                <FloatLabel>
                  <InputText
                    id="detailDesc"
                    v-model="model.DetayAciklama_1"
                    style="width: 100%"
                  />
                  <label for="detailDesc">Detail 1 Description</label>
                </FloatLabel>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <FloatLabel>
                  <InputText
                    id="detail2"
                    v-model="model.DetayTutar_2"
                    @input="detail2Input($event)"
                    style="width: 100%"
                  />
                  <label for="detail2">Detail 2</label>
                </FloatLabel>
              </div>
              <div class="col">
                <FloatLabel>
                  <InputText
                    id="detail2Desc"
                    v-model="model.DetayAciklama_2"
                    style="width: 100%"
                  />
                  <label for="detail2Desc">Detail 2 Description</label>
                </FloatLabel>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col">
                <FloatLabel>
                  <InputText
                    id="Insurance"
                    v-model="model.sigorta_tutar_satis"
                    @input="insuranceSelling($event)"
                    style="width: 100%"
                  />
                  <label for="Insurance">Insurance</label>
                </FloatLabel>
              </div>
            </div>
          </template>
        </Card>
      </div>
      <div class="col">
        <Card class="cardClass">
          <template #title>Buying</template>
          <template #content>
            <div class="row mb-4">
              <div class="col">
                <FloatLabel>
                  <InputText
                    id="freight"
                    v-model="model.NavlunAlis"
                    @input="getFreightInput($event)"
                    style="width: 100%"
                  />
                  <label for="freight">Freight</label>
                </FloatLabel>
              </div>
              <div class="col">
                <FloatLabel>
                  <InputText
                    id="freightComp"
                    v-model="model.DetayMekmarNot_1"
                    style="width: 100%"
                  />
                  <label for="freightComp">Freight Description</label>
                </FloatLabel>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <FloatLabel>
                  <InputText
                    id="detail1"
                    v-model="model.DetayAlis_1"
                    @input="getDetail1Input($event)"
                    style="width: 100%"
                  />
                  <label for="detail1">Detail 1</label>
                </FloatLabel>
              </div>
              <div class="col">
                <FloatLabel>
                  <InputText
                    id="detailDesc"
                    v-model="model.DetayMekmarNot_2"
                    style="width: 100%"
                  />
                  <label for="detailDesc">Detail 1 Description</label>
                </FloatLabel>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <FloatLabel>
                  <InputText
                    id="detail2"
                    v-model="model.DetayAlis_2"
                    @input="getDetail2Input($event)"
                    style="width: 100%"
                  />
                  <label for="detail2">Detail 2</label>
                </FloatLabel>
              </div>
              <div class="col">
                <FloatLabel>
                  <InputText
                    id="detail2Desc"
                    v-model="model.DetayMekmarNot_3"
                    style="width: 100%"
                  />
                  <label for="detail2Desc">Detail 2 Description</label>
                </FloatLabel>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col">
                <FloatLabel>
                  <InputText
                    id="insurance"
                    v-model="model.sigorta_Tutar"
                    @input="insuranceInput($event)"
                    style="width: 100%"
                  />
                  <label for="insurance">Insurance</label>
                </FloatLabel>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
import { toIsoDate, fromIsoDate } from "~/utils/dates"
import { useCostStore } from "~/stores/cost"
import { useOrderStore } from "~/stores/order"
export default {
  computed: {
    costStore() {
      return useCostStore()
    },
    orderStore() {
      return useOrderStore()
    },
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    delivery: {
      type: Array,
      required: true,
    },
    payment: {
      type: Array,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    country: {
      type: Array,
      required: true,
    },
    invoice: {
      type: Array,
      required: true,
    },
    po: {
      type: String,
      required: false,
    },

    proformaUploadButtonStatus: {
      type: Boolean,
      required: false,
    },
    source: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedSourceType: null,
      selectedDelivery: null,
      selectedPayment: null,
      maturityDate: null,
      selectedCountry: null,

      filteredCountry: null,
      selectedInvoice: null,
    };
  },
  created() {
    if (!this.status) {
      this.createdProcess();
    }
  },
  methods: {
    sourceTypeChange(event) {
      this.model.KaynakTuruID = event.value.ID;
      this.model.KaynakTuru = event.value.KaynakTuru;
    },
    refund(event) {
      if (event) {
        if (event[0] == 0) {
          event = event.substr(1);
        }
        if (event == null || event == undefined) {
          event = 0;
        }
        this.model.Iade = event.replace(",", ".");
      } else {
        this.model.Iade = 0;
      }
    },
    evrakGideri(event) {
      if (event) {
        if (event[0] == 0) {
          event = event.substr(1);
        }
        if (event == null || event == undefined) {
          event = 0;
        }
        this.model.EvrakGideri = event.replace(",", ".");
        this.orderStore.setOrderProductionProductDetailCostTotal(this.model
        );
      } else {
        this.model.EvrakGideri = 0;
        this.orderStore.setOrderProductionProductDetailCostTotal(this.model
        );
      }
    },
    maturityDateChange(event) {
      this.model.Vade = "";
    },
    __nullControl(value) {
      if (value == null || value == undefined) {
        return 0;
      } else {
        return value;
      }
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
    bankerage(event) {
      if (event) {
        if (event[0] == 0) {
          event = event.substr(1);
        }
        if (event == null || event == undefined) {
          event = 0;
        }
        this.model.Komisyon = event.replace(",", ".");
        this.orderStore.setOrderProductionProductDetailCostTotal(this.model
        );
      } else {
        this.model.Komisyon = 0;
        this.orderStore.setOrderProductionProductDetailCostTotal(this.model
        );
      }
    },
    insuranceInput(event) {
      if (event) {
        if (event[0] == 0) {
          event = event.substr(1);
        }
        if (event == null || event == undefined) {
          event = 0;
        }
        this.model.sigorta_Tutar = event.replace(",", ".");
        this.orderStore.setOrderProductionProductDetailCostTotal(this.model
        );
      } else {
        this.model.sigorta_Tutar = 0;
        this.orderStore.setOrderProductionProductDetailCostTotal(this.model
        );
      }
    },
    getDetail3Input(event) {
      if (event) {
        if (event[0] == 0) {
          event = event.substr(1);
        }
        if (event == null || event == undefined) {
          event = 0;
        }
        this.model.DetayAlis_3 = event.replace(",", ".");
        this.orderStore.setOrderProductionProductDetailCostTotal(this.model
        );
      } else {
        this.model.DetayAlis_3 = 0;
        this.orderStore.setOrderProductionProductDetailCostTotal(this.model
        );
      }
    },
    getDetail2Input(event) {
      if (event) {
        if (event[0] == 0) {
          event = event.substr(1);
        }
        if (event == null || event == undefined) {
          event = 0;
        }
        this.model.DetayAlis_2 = event.replace(",", ".");
        this.orderStore.setOrderProductionProductDetailCostTotal(this.model
        );
      } else {
        this.model.DetayAlis_2 = 0;
        this.orderStore.setOrderProductionProductDetailCostTotal(this.model
        );
      }
    },
    getDetail1Input(event) {
      if (event) {
        if (event[0] == 0) {
          event = event.substr(1);
        }
        if (event == null || event == undefined) {
          event = 0;
        }
        this.model.DetayAlis_1 = event.replace(",", ".");
        this.orderStore.setOrderProductionProductDetailCostTotal(this.model
        );
      } else {
        this.model.DetayAlis_1 = 0;
        this.orderStore.setOrderProductionProductDetailCostTotal(this.model
        );
      }
    },
    getFreightInput(event) {
      if (event) {
        if (event[0] == 0) {
          event = event.substr(1);
        }
        if (event == null || event == undefined) {
          event = 0;
        }
        this.model.NavlunAlis = event.replace(",", ".");
        this.orderStore.setOrderProductionProductDetailCostTotal(this.model
        );
      } else {
        this.model.NavlunAlis = 0;
        this.orderStore.setOrderProductionProductDetailCostTotal(this.model
        );
      }
    },
    detail4Input(event) {
      if (event) {
        if (event[0] == 0) {
          event = event.substr(1);
        }
        if (event == null || event == undefined) {
          event = 0;
        }
        this.model.DetayTutar_4 = event.replace(",", ".");
        this.orderStore.setOrderProductionProductDetailCostTotal(this.model
        );
      } else {
        this.model.DetayTutar_4 = 0;
        this.orderStore.setOrderProductionProductDetailCostTotal(this.model
        );
      }
    },
    detail1Input(event) {
      if (event) {
        if (event[0] == 0) {
          event = event.substr(1);
        }
        if (event == null || event == undefined) {
          event = 0;
        }
        this.model.DetayTutar_1 = event.replace(",", ".");
        this.orderStore.setOrderProductionDetailTotal(this.model);
      } else {
        this.model.DetayTutar_1 = 0;
        this.orderStore.setOrderProductionDetailTotal(this.model);
      }
    },
    detail2Input(event) {
      if (event) {
        if (event[0] == 0) {
          event = event.substr(1);
        }
        if (event == null || event == undefined) {
          event = 0;
        }
        this.model.DetayTutar_2 = event.replace(",", ".");
        this.orderStore.setOrderProductionDetailTotal(this.model);
      } else {
        this.model.DetayTutar_2 = 0;
        this.orderStore.setOrderProductionDetailTotal(this.model);
      }
    },
    detail3Input(event) {
      if (event) {
        if (event[0] == 0) {
          event = event.substr(1);
        }
        if (event == null || event == undefined) {
          event = 0;
        }
        this.model.DetayTutar_3 = event.replace(",", ".");
        this.orderStore.setOrderProductionDetailTotal(this.model);
      } else {
        this.model.DetayTutar_3 = 0;
        this.orderStore.setOrderProductionDetailTotal(this.model);
      }
    },
    freightInput(event) {
      if (event) {
        if (event[0] == 0) {
          event = event.substr(1);
        }
        if (event == null || event == undefined) {
          event = 0;
        }
        this.model.NavlunSatis = event.replace(",", ".");
        this.orderStore.setOrderProductionFreightTotal(parseFloat(event.replace(",", "."))
        );
      } else {
        this.model.NavlunSatis = 0;
        this.orderStore.setOrderProductionFreightTotal(0);
      }
    },
    uploadInvoiceDocument(event) {
      if (event.files[0].size < 1_000_000) {
        useFileService().sendProforma(event.files[0], 2, this.po).then((response) => {
          if (response) {
            const data = {
              id: 2,
              po: this.po,
              userId: useCookie("userId").value,
              date: toIsoDate(new Date()),
              document: this.po + ".pdf",
            };
            this.orderStore.setOrderProformaUpload(data);
          }
        });
      } else {
        useAppToast().error("Dosya boyutu 1MB den büyük olamaz!")
      }
    },
    selectedDrawingDocument(event) {
      let lengthDocuments = this.orderStore.getOrderProductionDocumentList.filter((x) => {
        return x.YuklemeEvrakID === 200;
      }).length
      let index = lengthDocuments + 1;
      event.files.forEach((item) => {
        if (item.size > 1_000_000) {
          useAppToast().error("Dosya boyutu 1MB den büyük olamaz!")
          return;
        } else {
          const name = this.po + "-drawing-" + index + ".pdf";
          useFileService().sendDrawing(item, this.po, 200, name)
          const data = {
            id: 200,
            po: this.po,
            userId: useCookie("userId").value,
            date: toIsoDate(new Date()),
            document: name,
          };
          this.orderStore.setOrderProformaUpload(data);
          index++;
        }
      });
    },
    /*
     * KALDIRILDI: govdesi yalnizca console.log olan uploadDrawingDocument.
     * FileUpload'in @uploader olayina bagli ve customUpload modunda
     * yuklemeyi BU metodun yapmasi gerekiyor -- ama hicbir sey
     * yapmiyordu. Gercek yukleme @select -> selectedDrawingDocument
     * icinde oluyor, bu yuzden davranis acisindan kaybi yok. Sablondaki
     * baglanti bilerek BIRAKILDI (asagidaki nota bak), yoksa
     * "handler is not a function" hatasi olur.
     */
    uploadDrawingDocument() {},

    invoiceChange(event) {
      this.model.FaturaKesimTurID = event.value.ID;
      this.model.FaturaKesimTurAdi = event.value.FaturaAdi;
    },
    countrySelected(event) {
      this.model.Ulke = event.value.UlkeAdi;
      this.model.UlkeId = event.value.Id;
    },
    searchCountry(event) {
      let results;
      if (event.query.length === 0) {
        results = this.country;
      } else {
        results = this.country.filter((x) => {
          return x.UlkeAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredCountry = results;
    },
    maturityDateSelected(event) {
      this.model.Vade = toIsoDate(event);
    },
    createdProcess() {
      this.selectedSourceType = this.orderStore.getOrderProductionSourceTypes.find(
        (x) => x.ID === this.model.KaynakTuruID
      );
      this.selectedDelivery = this.delivery.find(
        (x) => x.ID === this.model.TeslimTurID
      );
      this.selectedPayment = this.payment.find(
        (x) => x.ID === this.model.OdemeTurID
      );
      this.selectedCountry = this.country.find(
        (x) => x.Id == this.model.UlkeId
      );
      this.selectedInvoice = this.invoice.find(
        (x) => x.ID === this.model.FaturaKesimTurID
      );
      if (
        this.model.Vade == null ||
        this.model.Vade == " " ||
        this.model.Vade == undefined ||
        this.model.Vade == ""
      ) {
        this.model.Vade = "";
        this.maturityDate = "";
      } else {
        this.maturityDate = fromIsoDate(this.model.Vade);
      }
      this.model.Iade = this.__nullControl(this.model.Iade)
      /*
       * KALDIRILDI: `this.model.depo_yukleme;` -- tek basina duran bir
       * ifade, hicbir sey yapmiyordu (atama da degil, cagri da degil).
       * Hemen altindaki null kontrolu asil isi yapiyor.
       */
      if (
        this.model.depo_yukleme == null ||
        this.model.depo_yukleme == undefined
      ) {
        this.model.depo_yukleme = 0;
      }
    },
    paymentChange(event) {
      this.model.OdemeTurID = event.value.ID;
      this.model.OdemeTur = event.value.OdemeTur;
      if (event.value.ID == 1) {
        this.model.SiparisDurumID = 1;
      } else if (event.value.ID == 2) {
        this.model.SiparisDurumID = 1;
      } else if (event.value.ID == 3) {
        this.model.SiparisDurumID = 2;
      } else {
        this.model.SiparisDurumID = 2;
      }
      this.$emit("prepayment_is_activated_emit", event.value.ID);
    },
    deliveryChange(event) {
      this.model.TeslimTur = event.value.TeslimTur;
      this.model.TeslimTurID = event.value.ID;
    },
    insuranceSelling(event) {
      if (event) {
        if (event[0] == 0) {
          event = event.substr(1);
        }
        if (event == null || event == undefined) {
          event = 0;
        }
        this.model.sigorta_tutar_satis = event.replace(",", ".");
        this.orderStore.setOrderProductionInsuranceTotal(parseFloat(event.replace(",", "."))
        );
      } else {
        this.model.sigorta_tutar_satis = 0;
        this.orderStore.setOrderProductionInsuranceTotal(0);
      }
    },
  },
  beforeCreate() {},
};
</script>
<style scoped>
.cardClass {
  height: 350px;
}
@media screen and (max-width: 576px) {
  .row {
    clear: both;
    display: block;
    width: 100%;
  }
  .col-3 {
    clear: both;
    display: block;
    width: 100%;
  }
  .col-9 {
    clear: both;
    display: block;
    width: 100%;
  }
  .col {
    clear: both;
    display: block;
    width: 100%;
  }
  .cardClass {
    height: auto;
  }
}
</style>

<!--
  components/orders/forms/proforma.vue
    -> app/components/orderDetail/ProformaForm.vue

  DOSYA YOLU: Nuxt 2'de `orderDetailProformaForm` adiyla global kayitli.

  Mekanik donusumler (tools/codemods/vue2-to-vue3.mjs):
  [1] 1x  <Calendar> -> <DatePicker>
  [2] 6x  <Dropdown> -> <Select>
  [3] 1x  AutoComplete field= -> optionLabel=   (v4'te `field` KALDIRILDI;
          birebir tasinsa oneri listesi "[object Object]" gorunurdu)

  Store gecisi (tools/codemods/map-store-refs.mjs):
  [4] 28x  this.$store.dispatch(...) -> Pinia action'lari
  [5]  4x  getter referansi -> orderStore / costStore / localStore
  [6] mapGetters([4 ad]) blogu -> 3 store computed'i

  ELLE yapilanlar:
  [7]  plugins/upload -> useFileService()  (sendProforma, sendDrawing)
  [8]  js-cookie -> useCookie (2 yer)
  [9]  plugins/date -> toIsoDate / fromIsoDate (4 yer)
  [10] this.$toast -> useAppToast(); ayrica "Dosya boyutu 1MB den büyük
       olamaz!" HATA mesaji YESIL basarili toast'i olarak gosteriliyordu
       (iki yerde) -> .error
  [11] size < "1000000" / > "1000000" dize karsilastirmasi -> sayisal
  [12] 4 adet console.log kaldirildi (created, lengthDocuments,
       uploadDrawingDocument, insuranceSelling)
  [13] `this.model.depo_yukleme;` -- tek basina duran, hicbir sey yapmayan
       ifade kaldirildi

  DOKUNULMADI ama DIKKAT:
  - uploadDrawingDocument() govdesi BOSALTILDI, metot silinmedi. Sablonda
    FileUpload'in bir olayina bagli; silinirse "handler is not a function"
    hatasi olur. customUpload modunda yuklemeyi bu metodun yapmasi
    gerekirdi ama Nuxt 2'de de yalnizca console.log vardi -- gercek
    yukleme @select -> selectedDrawingDocument icinde. Yani eksik olan
    islev zaten eksikti.
  - sendDrawing() sonucu BEKLENMIYOR: yukleme basarisiz olsa da hemen
    ardindan setOrderProformaUpload cagriliyor, yani veritabanina kayit
    girilirken dosya yuklenememis olabilir. Birebir korundu; duzeltmek
    davranis degisikligi.
  - 47 adet `this.model.X = ...` ic prop atamasi var. Vue 3'te hata
    vermez ama prop sahibinin state'ini uzaktan degistiriyor
    (bkz. tools/codemods/find-prop-mutations.mjs). Birebir korundu.
-->
