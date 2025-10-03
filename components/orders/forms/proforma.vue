<template>
  <div>
    <div class="row">
      <div class="col-3">
        <Dropdown
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
        </Dropdown>
        <Dropdown
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
        </Dropdown>
        <span class="p-float-label mb-4">
          <Calendar
            v-model="maturityDate"
            inputId="maturity"
            @date-select="maturityDateSelected($event)"
            class="w-100"
            dateFormat="dd/mm/yy"
            @change="maturityDateChange($event)"
          />
          <label for="maturity">Maturity</label>
        </span>
        <span class="p-float-label mb-4">
          <AutoComplete
            v-model="selectedCountry"
            inputId="country"
            :suggestions="filteredCountry"
            @complete="searchCountry($event)"
            @item-select="countrySelected($event)"
            field="UlkeAdi"
          />
          <label for="country">Country</label>
        </span>
        <span class="p-float-label mb-4">
          <InputText
            id="paidDescription"
            v-model="model.OdemeAciklama"
            class="w-100"
          />
          <label for="paidDescription">Payment Details</label>
        </span>
        <span class="p-float-label mb-4">
          <InputText
            id="container"
            v-model="model.KonteynerAyrinti"
            class="w-100"
          />
          <label for="container">Container Detail</label>
        </span>
        <span class="p-float-label mb-4">
          <InputText
            id="document"
            v-model="model.EvrakGideri"
            class="w-100"
            @input="evrakGideri($event)"
          />
          <label for="document">Document Cost</label>
        </span>
        <span class="p-float-label mb-4">
          <InputText
            id="commission"
            v-model="model.Komisyon"
            class="w-100"
            @input="bankerage($event)"
          />
          <label for="commission">Commission</label>
        </span>
        <span class="p-float-label mb-4">
          <InputText
            id="return"
            v-model="model.Iade"
            class="w-100"
            @input="refund($event)"
          />
          <label for="return">Refund</label>
        </span>
        <div class="p-float-label mb-4">
          <Dropdown
            v-model="selectedInvoice"
            inputId="invoice"
            :options="invoice"
            optionLabel="FaturaAdi"
            class="w-100"
            @change="invoiceChange($event)"
          />
          <label for="invoice">Invoice Type</label>
        </div>
        <div class="p-float-label">
          <Dropdown
            v-model="selectedSourceType"
            inputId="source_type"
            :options="source"
            optionLabel="KaynakTuru"
            class="w-100"
            @change="sourceTypeChange($event)"
          />
          <label for="source_type">Source Type</label>
        </div>
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
        <span class="p-float-label mb-4">
          <Textarea v-model="model.UretimAciklama" rows="5" class="w-100" />
          <label>AYO Explanation</label>
        </span>
        <span class="p-float-label mb-4">
          <Textarea v-model="model.SevkiyatAciklama" rows="5" class="w-100" />
          <label>Shipped Explanation</label>
        </span>
        <span class="p-float-label mb-4">
          <Textarea v-model="model.FinansAciklama" rows="5" class="w-100" />
          <label>Finance Explanation</label>
        </span>
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
                <span class="p-float-label">
                  <InputText
                    id="freight"
                    v-model="model.NavlunSatis"
                    @input="freightInput($event)"
                    style="width: 100%"
                  />
                  <label for="freight">Freight</label>
                </span>
              </div>
              <div class="col">
                <span class="p-float-label">
                  <InputText
                    id="freightComp"
                    v-model="model.NavlunFirma"
                    style="width: 100%"
                  />
                  <label for="freightComp">Freight Company</label>
                </span>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <span class="p-float-label">
                  <InputText
                    id="detail1"
                    v-model="model.DetayTutar_1"
                    @input="detail1Input($event)"
                    style="width: 100%"
                  />
                  <label for="detail1">Detail 1</label>
                </span>
              </div>
              <div class="col">
                <span class="p-float-label">
                  <InputText
                    id="detailDesc"
                    v-model="model.DetayAciklama_1"
                    style="width: 100%"
                  />
                  <label for="detailDesc">Detail 1 Description</label>
                </span>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <span class="p-float-label">
                  <InputText
                    id="detail2"
                    v-model="model.DetayTutar_2"
                    @input="detail2Input($event)"
                    style="width: 100%"
                  />
                  <label for="detail2">Detail 2</label>
                </span>
              </div>
              <div class="col">
                <span class="p-float-label">
                  <InputText
                    id="detail2Desc"
                    v-model="model.DetayAciklama_2"
                    style="width: 100%"
                  />
                  <label for="detail2Desc">Detail 2 Description</label>
                </span>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col">
                <span class="p-float-label">
                  <InputText
                    id="Insurance"
                    v-model="model.sigorta_tutar_satis"
                    @input="insuranceSelling($event)"
                    style="width: 100%"
                  />
                  <label for="Insurance">Insurance</label>
                </span>
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
                <span class="p-float-label">
                  <InputText
                    id="freight"
                    v-model="model.NavlunAlis"
                    @input="getFreightInput($event)"
                    style="width: 100%"
                  />
                  <label for="freight">Freight</label>
                </span>
              </div>
              <div class="col">
                <span class="p-float-label">
                  <InputText
                    id="freightComp"
                    v-model="model.DetayMekmarNot_1"
                    style="width: 100%"
                  />
                  <label for="freightComp">Freight Description</label>
                </span>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <span class="p-float-label">
                  <InputText
                    id="detail1"
                    v-model="model.DetayAlis_1"
                    @input="getDetail1Input($event)"
                    style="width: 100%"
                  />
                  <label for="detail1">Detail 1</label>
                </span>
              </div>
              <div class="col">
                <span class="p-float-label">
                  <InputText
                    id="detailDesc"
                    v-model="model.DetayMekmarNot_2"
                    style="width: 100%"
                  />
                  <label for="detailDesc">Detail 1 Description</label>
                </span>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <span class="p-float-label">
                  <InputText
                    id="detail2"
                    v-model="model.DetayAlis_2"
                    @input="getDetail2Input($event)"
                    style="width: 100%"
                  />
                  <label for="detail2">Detail 2</label>
                </span>
              </div>
              <div class="col">
                <span class="p-float-label">
                  <InputText
                    id="detail2Desc"
                    v-model="model.DetayMekmarNot_3"
                    style="width: 100%"
                  />
                  <label for="detail2Desc">Detail 2 Description</label>
                </span>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col">
                <span class="p-float-label">
                  <InputText
                    id="insurance"
                    v-model="model.sigorta_Tutar"
                    @input="insuranceInput($event)"
                    style="width: 100%"
                  />
                  <label for="insurance">Insurance</label>
                </span>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
import date from "../../../plugins/date";
import upload from "../../../plugins/upload";
import Cookies from "js-cookie";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "getCostList",
      "getLocalUrl",
      "getOrderProductionDocumentList",
      "getOrderProductionSourceTypes",
    ]),
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
    console.log(
      "getOrderProductionSourceTypes",
      this.getOrderProductionSourceTypes
    );
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
        this.$store.dispatch(
          "setOrderProductionProductDetailCostTotal",
          this.model
        );
      } else {
        this.model.EvrakGideri = 0;
        this.$store.dispatch(
          "setOrderProductionProductDetailCostTotal",
          this.model
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
        this.$store.dispatch(
          "setOrderProductionProductDetailCostTotal",
          this.model
        );
      } else {
        this.model.Komisyon = 0;
        this.$store.dispatch(
          "setOrderProductionProductDetailCostTotal",
          this.model
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
        this.$store.dispatch(
          "setOrderProductionProductDetailCostTotal",
          this.model
        );
      } else {
        this.model.sigorta_Tutar = 0;
        this.$store.dispatch(
          "setOrderProductionProductDetailCostTotal",
          this.model
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
        this.$store.dispatch(
          "setOrderProductionProductDetailCostTotal",
          this.model
        );
      } else {
        this.model.DetayAlis_3 = 0;
        this.$store.dispatch(
          "setOrderProductionProductDetailCostTotal",
          this.model
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
        this.$store.dispatch(
          "setOrderProductionProductDetailCostTotal",
          this.model
        );
      } else {
        this.model.DetayAlis_2 = 0;
        this.$store.dispatch(
          "setOrderProductionProductDetailCostTotal",
          this.model
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
        this.$store.dispatch(
          "setOrderProductionProductDetailCostTotal",
          this.model
        );
      } else {
        this.model.DetayAlis_1 = 0;
        this.$store.dispatch(
          "setOrderProductionProductDetailCostTotal",
          this.model
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
        this.$store.dispatch(
          "setOrderProductionProductDetailCostTotal",
          this.model
        );
      } else {
        this.model.NavlunAlis = 0;
        this.$store.dispatch(
          "setOrderProductionProductDetailCostTotal",
          this.model
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
        this.$store.dispatch(
          "setOrderProductionProductDetailCostTotal",
          this.model
        );
      } else {
        this.model.DetayTutar_4 = 0;
        this.$store.dispatch(
          "setOrderProductionProductDetailCostTotal",
          this.model
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
        this.$store.dispatch("setOrderProductionDetailTotal", this.model);
      } else {
        this.model.DetayTutar_1 = 0;
        this.$store.dispatch("setOrderProductionDetailTotal", this.model);
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
        this.$store.dispatch("setOrderProductionDetailTotal", this.model);
      } else {
        this.model.DetayTutar_2 = 0;
        this.$store.dispatch("setOrderProductionDetailTotal", this.model);
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
        this.$store.dispatch("setOrderProductionDetailTotal", this.model);
      } else {
        this.model.DetayTutar_3 = 0;
        this.$store.dispatch("setOrderProductionDetailTotal", this.model);
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
        this.$store.dispatch(
          "setOrderProductionFreightTotal",
          parseFloat(event.replace(",", "."))
        );
      } else {
        this.model.NavlunSatis = 0;
        this.$store.dispatch("setOrderProductionFreightTotal", 0);
      }
    },
    uploadInvoiceDocument(event) {
      if (event.files[0].size < "1000000") {
        upload.sendProforma(event.files[0], 2, this.po).then((response) => {
          if (response) {
            const data = {
              id: 2,
              po: this.po,
              userId: Cookies.get("userId"),
              date: date.dateToString(new Date()),
              document: this.po + ".pdf",
            };
            this.$store.dispatch("setOrderProformaUpload", data);
          }
        });
      } else {
        this.$toast.success("Dosya boyutu 1MB den büyük olamaz!");
      }
    },
    selectedDrawingDocument(event) {
      let lengthDocuments = this.getOrderProductionDocumentList.filter((x) => {
        return x.YuklemeEvrakID === 200;
      }).length;
      console.log("lengthDocuments", lengthDocuments);
      let index = lengthDocuments + 1;
      event.files.forEach((item) => {
        if (item.size > "1000000") {
          this.$toast.success("Dosya boyutu 1MB den büyük olamaz!");
          return;
        } else {
          const name = this.po + "-drawing-" + index + ".pdf";
          upload.sendDrawing(item, this.po, 200, name);
          const data = {
            id: 200,
            po: this.po,
            userId: Cookies.get("userId"),
            date: date.dateToString(new Date()),
            document: name,
          };
          this.$store.dispatch("setOrderProformaUpload", data);
          index++;
        }
      });
    },
    uploadDrawingDocument(event) {
      console.log("uploadDrawingDocument", event);
    },

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
      this.model.Vade = date.dateToString(event);
    },
    createdProcess() {
      this.selectedSourceType = this.getOrderProductionSourceTypes.find(
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
        this.maturityDate = date.stringToDate(this.model.Vade);
      }
      this.model.Iade = this.__nullControl(this.model.Iade);
      this.model.depo_yukleme;
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
      console.log("insuranceSelling", event);
      if (event) {
        if (event[0] == 0) {
          event = event.substr(1);
        }
        if (event == null || event == undefined) {
          event = 0;
        }
        this.model.sigorta_tutar_satis = event.replace(",", ".");
        this.$store.dispatch(
          "setOrderProductionInsuranceTotal",
          parseFloat(event.replace(",", "."))
        );
      } else {
        this.model.sigorta_tutar_satis = 0;
        this.$store.dispatch("setOrderProductionInsuranceTotal", 0);
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
