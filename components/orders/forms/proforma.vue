<template>
  <div>
    <div class="row">
      <div class="col-3">
        <Dropdown
          v-model="selectedDelivery"
          :options="delivery"
          filter
          optionLabel="TeslimTur"
          placeholder="Teslim Türü"
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
          placeholder="Ödeme Türü"
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
          />
          <label for="maturity">Vade</label>
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
          <label for="country">Ülke</label>
        </span>
        <span class="p-float-label mb-4">
          <InputText id="paidDescription" v-model="model.OdemeAciklama" class="w-100" />
          <label for="paidDescription">Ödeme Açıklama</label>
        </span>
        <span class="p-float-label mb-4">
          <InputText id="container" v-model="model.KonteynerAyrinti" class="w-100" />
          <label for="container">Konteyner Ayrıntı</label>
        </span>
        <span class="p-float-label mb-4">
          <InputText id="document" v-model="model.EvrakGideri" class="w-100" />
          <label for="document">Evrak Gideri</label>
        </span>
        <span class="p-float-label mb-4">
          <InputText
            id="commission"
            v-model="model.Komisyon"
            class="w-100"
            @input="bankerage($event)"
          />
          <label for="commission">Komisyon</label>
        </span>
        <span class="p-float-label mb-4">
          <InputText id="return" v-model="model.Iade" class="w-100" />
          <label for="return">İade</label>
        </span>
        <div class="p-float-label">
          <Dropdown
            v-model="selectedInvoice"
            inputId="invoice"
            :options="invoice"
            optionLabel="FaturaAdi"
            class="w-100"
            @change="invoiceChange($event)"
          />
          <label for="invoice">Fatura Türü</label>
        </div>
        <div class="row">
          <div class="col">
            <div class="flex align-items-center">
              <Checkbox v-model="model.depo_yukleme" :binary="true" />
              <label for="ingredient1" class="ml-2"> Atlanta Sm </label>
            </div>
          </div>
          <div class="col">
            <div class="flex align-items-center">
              <Checkbox v-model="model.MayaControl" :binary="true" />
              <label for="ingredient2" class="ml-2"> Maya Ödeme </label>
            </div>
          </div>
        </div>
      </div>
      <div class="col-9">
        <span class="p-float-label mb-4">
          <Textarea v-model="model.UretimAciklama" rows="5" class="w-100" />
          <label>Üretim Açıklama</label>
        </span>
        <span class="p-float-label mb-4">
          <Textarea v-model="model.SevkiyatAciklama" rows="5" class="w-100" />
          <label>Sevkiyat Açıklama</label>
        </span>
        <span class="p-float-label mb-4">
          <Textarea v-model="model.FinansAciklama" rows="5" class="w-100" />
          <label>Finans Açıklama</label>
        </span>
        <FileUpload
          mode="basic"
          accept=".pdf"
          customUpload
          @select="uploadInvoiceDocument($event)"
          chooseLabel="Proforma Yükle"
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <Card style="height: 550px">
          <template #title>Satış</template>
          <template #content>
            <div class="row mb-4">
              <div class="col">
                <span class="p-float-label">
                  <InputText
                    id="freight"
                    v-model="model.NavlunSatis"
                    @input="freightInput($event)"
                  />
                  <label for="freight">Navlun</label>
                </span>
              </div>
              <div class="col">
                <span class="p-float-label">
                  <InputText id="freightComp" v-model="model.NavlunFirma" />
                  <label for="freightComp">Navlun Firma</label>
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
                  />
                  <label for="detail1">Detay 1</label>
                </span>
              </div>
              <div class="col">
                <span class="p-float-label">
                  <InputText id="detailDesc" v-model="model.DetayAciklama_1" />
                  <label for="detailDesc">Detay 1 Açıklama</label>
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
                  />
                  <label for="detail2">Detay 2</label>
                </span>
              </div>
              <div class="col">
                <span class="p-float-label">
                  <InputText id="detail2Desc" v-model="model.DetayAciklama_2" />
                  <label for="detail2Desc">Detay 2 Açıklama</label>
                </span>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <span class="p-float-label">
                  <InputText
                    id="detail2"
                    v-model="model.DetayTutar_3"
                    @input="detail3Input($event)"
                  />
                  <label for="detail2">Detay 3</label>
                </span>
              </div>
              <div class="col">
                <span class="p-float-label">
                  <InputText id="detail2Desc" v-model="model.DetayAciklama_3" />
                  <label for="detail2Desc">Detay 3 Açıklama</label>
                </span>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <span class="p-float-label">
                  <InputText
                    id="detail4"
                    v-model="model.DetayTutar_4"
                    @input="detail4Input($event)"
                  />
                  <label for="detail4">Mekus</label>
                </span>
              </div>
              <div class="col">
                <span class="p-float-label">
                  <InputText id="mekusDesc" v-model="model.DetayAciklama_4" />
                  <label for="mekusDesc">Mekus Açıklama</label>
                </span>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <CustomInput
                  :value="model.sigorta_tutar_satis"
                  text="Sigorta"
                  @onInput="model.sigorta_tutar_satis = $event"
                />
              </div>
            </div>
          </template>
        </Card>
      </div>
      <div class="col">
        <Card style="height: 550px">
          <template #title>Alış</template>
          <template #content>
            <div class="row mb-4">
              <div class="col">
                <span class="p-float-label">
                  <InputText
                    id="freight"
                    v-model="model.NavlunAlis"
                    @input="getFreightInput($event)"
                  />
                  <label for="freight">Navlun</label>
                </span>
              </div>
              <div class="col">
                <span class="p-float-label">
                  <InputText id="freightComp" v-model="model.DetayMekmarNot_1" />
                  <label for="freightComp">Navlun A. Açıklama</label>
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
                  />
                  <label for="detail1">Detay 1</label>
                </span>
              </div>
              <div class="col">
                <span class="p-float-label">
                  <InputText id="detailDesc" v-model="model.DetayMekmarNot_2" />
                  <label for="detailDesc">Detay 1 Açıklama</label>
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
                  />
                  <label for="detail2">Detay 2</label>
                </span>
              </div>
              <div class="col">
                <span class="p-float-label">
                  <InputText id="detail2Desc" v-model="model.DetayMekmarNot_3" />
                  <label for="detail2Desc">Detay 2 Açıklama</label>
                </span>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <span class="p-float-label">
                  <InputText
                    id="detail3"
                    v-model="model.DetayAlis_3"
                    @input="getDetail3Input($event)"
                  />
                  <label for="detail3">Detay 3</label>
                </span>
              </div>
              <div class="col">
                <span class="p-float-label">
                  <InputText id="detail2Desc" v-model="model.DetayMekmarNot_3" />
                  <label for="detail2Desc">Detay 3 Açıklama</label>
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
                  />
                  <label for="insurance">Sigorta</label>
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

export default {
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
  },
  data() {
    return {
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
    bankerage(event) {
      if (event) {
        if (event[0] == 0) {
          event = event.substr(1);
        }
        this.model.Komisyon = parseFloat(event.replace(",", "."));
        this.$store.dispatch("setOrderProductionProductDetailCostTotal", this.model);
      } else {
        this.model.Komisyon = 0;
        this.$store.dispatch("setOrderProductionProductDetailCostTotal", this.model);
      }
    },
    insuranceInput(event) {
      if (event) {
        if (event[0] == 0) {
          event = event.substr(1);
        }
        this.model.sigorta_Tutar = parseFloat(event.replace(",", "."));
        this.$store.dispatch("setOrderProductionProductDetailCostTotal", this.model);
      } else {
        this.model.sigorta_Tutar = 0;
        this.$store.dispatch("setOrderProductionProductDetailCostTotal", this.model);
      }
    },
    getDetail3Input(event) {
      if (event) {
        if (event[0] == 0) {
          event = event.substr(1);
        }
        this.model.DetayAlis_3 = parseFloat(event.replace(",", "."));
        this.$store.dispatch("setOrderProductionProductDetailCostTotal", this.model);
      } else {
        this.model.DetayAlis_3 = 0;
        this.$store.dispatch("setOrderProductionProductDetailCostTotal", this.model);
      }
    },
    getDetail2Input(event) {
      if (event) {
        if (event[0] == 0) {
          event = event.substr(1);
        }
        this.model.DetayAlis_2 = parseFloat(event.replace(",", "."));
        this.$store.dispatch("setOrderProductionProductDetailCostTotal", this.model);
      } else {
        this.model.DetayAlis_2 = 0;
        this.$store.dispatch("setOrderProductionProductDetailCostTotal", this.model);
      }
    },
    getDetail1Input(event) {
      if (event) {
        if (event[0] == 0) {
          event = event.substr(1);
        }
        this.model.DetayAlis_1 = parseFloat(event.replace(",", "."));
        this.$store.dispatch("setOrderProductionProductDetailCostTotal", this.model);
      } else {
        this.model.DetayAlis_1 = 0;
        this.$store.dispatch("setOrderProductionProductDetailCostTotal", this.model);
      }
    },
    getFreightInput(event) {
      if (event) {
        if (event[0] == 0) {
          event = event.substr(1);
        }
        this.model.NavlunAlis = parseFloat(event.replace(",", "."));
        this.$store.dispatch("setOrderProductionProductDetailCostTotal", this.model);
      } else {
        this.model.NavlunAlis = 0;
        this.$store.dispatch("setOrderProductionProductDetailCostTotal", this.model);
      }
    },
    detail4Input(event) {
      if (event) {
        if (event[0] == 0) {
          event = event.substr(1);
        }
        this.model.DetayTutar_4 = parseFloat(event.replace(",", "."));
        this.$store.dispatch("setOrderProductionProductDetailCostTotal", this.model);
      } else {
        this.model.DetayTutar_4 = 0;
        this.$store.dispatch("setOrderProductionProductDetailCostTotal", this.model);
      }
    },
    detail1Input(event) {
      if (event) {
        if (event[0] == 0) {
          event = event.substr(1);
        }
        this.model.DetayTutar_1 = parseFloat(event.replace(",", "."));
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
        this.model.DetayTutar_2 = parseFloat(event.replace(",", "."));
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
        this.model.DetayTutar_3 = parseFloat(event.replace(",", "."));
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
    },
    invoiceChange(event) {
      this.model.FaturaKesimTurID = event.value.ID;
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
      this.selectedDelivery = this.delivery.find((x) => x.ID === this.model.TeslimTurID);
      this.selectedPayment = this.payment.find((x) => x.ID === this.model.OdemeTurID);
      this.selectedCountry = this.country.find((x) => x.Id == this.model.UlkeId);
      this.selectedInvoice = this.invoice.find(
        (x) => x.ID === this.model.FaturaKesimTurID
      );
      if (this.model.Vade != null) {
        this.maturityDate = date.stringToDate(this.model.Vade);
      } else {
        this.model.Vade = "";
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
    },
    deliveryChange(event) {
      this.model.TeslimTur = event.value.TeslimTur;
      this.model.TeslimTurID = event.value.ID;
    },
  },
};
</script>
