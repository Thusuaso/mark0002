<template>
  <div class="row">
    <div class="col-9">
      <TabView>
        <TabPanel header="Information">
          <div class="container">
            <Card class="mb-4">
              <template #title> Product Info</template>
              <template #content>
                <div class="row">
                  <div class="col">
                    <Dropdown
                      v-model="selectedCategory"
                      :options="category"
                      optionLabel="Urun"
                      placeholder="Select a Category"
                      class="w-100"
                      @change="categorySelected($event)"
                    />
                  </div>
                  <div class="col">
                    <Dropdown
                      v-model="selectedUnit"
                      :options="unit"
                      optionLabel="BirimAdi"
                      placeholder="Select a Unit"
                      class="w-100"
                      @change="unitSelected($event)"
                    />
                  </div>
                  <div class="col">
                    <span class="p-float-label mb-4">
                      <InputText id="amount" v-model="model.Miktar" class="w-100" />
                      <label for="amount">Amount</label>
                    </span>
                  </div>
                </div>
              </template>
            </Card>
            <Card class="mb-4">
              <template #title>Payment Info</template>
              <template #content>
                <div class="container">
                  <div class="row">
                    <div class="col">
                      <Card class="mb-4" style="height: 300px">
                        <template #title> Shipment Type</template>
                        <template #content>
                          <div
                            class="flex align-items-center mb-4"
                            v-for="item of sending"
                            :key="item.ID"
                          >
                            <RadioButton
                              v-model="selectedSendingType"
                              :inputId="item.ID"
                              name="dynamic"
                              :value="item.ID"
                              @change="sendingTypeSelected($event)"
                            />
                            <label :for="item.ID" class="ml-2">{{
                              item.GonderiAdi
                            }}</label>
                          </div>
                        </template>
                      </Card>
                    </div>
                    <div class="col">
                      <Card class="mb-4" style="height: 300px">
                        <template #title>Bank</template>
                        <template #content>
                          <div
                            class="flex align-items-center mb-4"
                            v-for="item of bank"
                            :key="item.ID"
                          >
                            <RadioButton
                              v-model="selectedBankType"
                              :inputId="item.ID"
                              name="dynamic"
                              :value="item.ID"
                              @change="bankTypeSelected($event)"
                              :disabled="bankTypeDisabled"
                            />
                            <label :for="item.ID" class="ml-2">{{ item.BankaAdi }}</label>
                          </div>
                        </template>
                      </Card>
                    </div>
                    <div class="col">
                      <Card class="mb-4" style="height: 300px">
                        <template #title>Courier Cost</template>
                        <template #content>
                          <span class="p-float-label mb-4">
                            <InputText
                              id="usd"
                              v-model="model.KuryeAlis"
                              @input="model.KuryeAlis = formatPoint($event)"
                            />
                            <label for="usd">$</label>
                          </span>
                          <span class="p-float-label mb-4">
                            <InputText
                              id="euro"
                              v-model="model.Euro_Alis"
                              @input="model.Euro_Alis = formatPoint($event)"
                            />
                            <label for="euro">€</label>
                          </span>
                          <span class="p-float-label mb-4">
                            <InputText
                              id="tl"
                              v-model="model.TL_Alis"
                              @input="model.TL_Alis = formatPoint($event)"
                            />
                            <label for="tl">₺</label>
                          </span>
                        </template>
                      </Card>
                    </div>
                    <div class="col">
                      <Card class="mb-4" style="height: 300px">
                        <template #title>Quoted Price</template>
                        <template #content>
                          <span class="p-float-label mb-4">
                            <InputText
                              id="usd"
                              v-model="model.KuryeSatis"
                              @input="model.KuryeSatis = formatPoint($event)"
                            />
                            <label for="usd">$</label>
                          </span>
                          <span class="p-float-label mb-4">
                            <InputText
                              id="euro"
                              v-model="model.Euro_Satis"
                              @input="model.Euro_Satis = formatPoint($event)"
                            />
                            <label for="euro">€</label>
                          </span>
                          <span class="p-float-label mb-4">
                            <InputText
                              id="tl"
                              v-model="model.TL_Satis"
                              @input="model.TL_Satis = formatPoint($event)"
                            />
                            <label for="tl">₺</label>
                          </span>
                        </template>
                      </Card>
                    </div>
                  </div>
                </div>
              </template>
            </Card>
            <span class="p-float-label mb-4">
              <Textarea class="w-100" v-model="model.Aciklama" />
              <label>Description</label>
            </span>
          </div>
        </TabPanel>
        <TabPanel header="Payments">
          <div class="container w-100 mb-4">
            <div class="row">
              <div class="col">
                <span class="p-float-label">
                  <Calendar v-model="paid_date" inputId="paid_date" dateFormat="dd/mm/yy"/>
                  <label for="paid_date">Payment Date</label>
                </span>
              </div>
              <div class="col">
                <CustomInput
          :value="freigthCost"
          text="($)"
          @onInput="freigthCost = $event"
          :disabled="false"
        />
                
              </div>
              <div class="col">
                <Dropdown
                  v-model="selectedBank"
                  :options="bank"
                  optionLabel="BankaAdi"
                  placeholder="Select a Bank"
                  class="w-100"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <span class="p-float-label">
                  <Textarea v-model="paidDescription" rows="5" class="w-100" />
                  <label>Explanation</label>
                </span>
              </div>
            </div>
            <Button
              type="button"
              class="p-button-success w-100 mb-4"
              @click="savePaid"
              label="Save"
            />
            <DataTable :value="paid">
              <Column field="Tarih" header="Date">
                <template #body="slotProps">
                  {{ slotProps.data.Tarih | dateToString }}
                </template>
              </Column>
              <Column field="Tutar" header="Amount">
                <template #body="slotProps">
                  {{ slotProps.data.Tutar | formatPriceUsd }}
                </template>
              </Column>
              <Column field="Banka" header="Bank"></Column>
              <Column field="Aciklama" header="Exp."></Column>

            </DataTable>
          </div>
        </TabPanel>
        <TabPanel header="Photos">
          <div class="row">
            <div class="col">
              <FileUpload
                mode="basic"
                chooseLabel="Front of Photo"
                v-model="selectedFrontPhoto"
                @select="frontPhotoSelected($event)"
                accept="image/*"
              />
              <br />
              <img :src="model.OnYuzFoto" style="width: 100%; height: 500px" />
            </div>
            <div class="col">
              <FileUpload
                mode="basic"
                chooseLabel="Back of Photo"
                v-model="selectedBackPhoto"
                @select="backPhotoSelected($event)"
                accept="image/*"
              />
              <br />
              <img :src="model.ArkaYuzFoto" style="width: 100%; height: 500px" />
            </div>
          </div>
        </TabPanel>
      </TabView>
    </div>
    <div class="col-3 mt-5">
      <div class="row mb-4">
        <div class="col">
          <Button
            type="button"
            class="p-button-success w-100"
            label="Save"
            @click="process"
          />
        </div>
        <div class="col" v-if="!status">
          <Button
            type="button"
            class="p-button-danger w-100"
            label="Delete"
            @click="deleteProcess"
          />
        </div>
      </div>

      <span class="p-float-label mb-4">
        <InputText id="sampleno" v-model="model.NumuneNo" class="w-100" :disabled="!status"/>
        <label for="sampleno">Sample No</label>
      </span>
      <span class="p-float-label mb-4">
        <Calendar v-model="input_date" inputId="inputdate" class="w-100" dateFormat="dd/mm/yy"/>
        <label for="inputdate">Input Date</label>
      </span>
      <span class="p-float-label mb-4">
        <Calendar v-model="output_date" inputId="outputdate" class="w-100" dateFormat="dd/mm/yy"/>
        <label for="outputdate">Shipment Date</label>
      </span>
      <span class="p-float-label mb-4">
        <Calendar v-model="dhl_date" inputId="dhl_date" class="w-100" dateFormat="dd/mm/yy" @date-select="dhlDateSelected($event)"/>
        <label for="dhl_date">Dhl Date</label>
      </span>
      <span class="p-float-label mb-4">
        <AutoComplete
          v-model="selectedCustomer"
          inputId="customer"
          :suggestions="filteredCustomers"
          field="MusteriAdi"
          @complete="searchCustomers($event)"
          @item-select="customerSelected($event)"
          @input="customerInput($event)"
        />
        <label for="customer">Customer</label>
      </span>
      <span class="p-float-label mb-4">
        <AutoComplete
          v-model="selectedCountry"
          inputId="country"
          :suggestions="filteredCountry"
          field="UlkeAdi"
          @complete="searchCountry($event)"
          @item-select="countrySelected($event)"
        />
        <label for="country">Country</label>
      </span>
      <span class="p-float-label mb-4">
        <Textarea v-model="model.Adres" rows="5" cols="30" class="w-100" />
        <label>Address</label>
      </span>
      <span class="p-float-label mb-4">
        <AutoComplete
          v-model="selectedUser"
          inputId="user"
          :suggestions="filteredUser"
          field="KullaniciAdi"
          @complete="searchUser($event)"
          @item-select="userSelected($event)"
        />
        <label for="user">Seller</label>
      </span>
      <span class="p-float-label mb-4">
        <InputText id="following" v-model="model.TrackingNo" class="w-100" />
        <label for="following">Tracking Number</label>
      </span>
      <span class="p-float-label mb-4">
        <InputText id="parite" v-model="model.Parite" class="w-100" />
        <label for="parite">Parity</label>
      </span>
    </div>
  </div>
</template>

<script>
import date from "../../../plugins/date";
import upload from "../../../plugins/upload";
import Cookies from "js-cookie";
import server from "@/plugins/excel.server";

export default {
  computed: {},
  props: {
    model: {
      type: Object,
      required: true,
    },
    customers: {
      type: Array,
      required: true,
    },
    country: {
      type: Array,
      required: true,
    },
    users: {
      type: Array,
      required: true,
    },
    category: {
      type: Array,
      required: true,
    },
    unit: {
      type: Array,
      required: true,
    },
    sending: {
      type: Array,
      required: true,
    },
    bank: {
      type: Array,
      required: true,
    },
    paid: {
      type: Array,
      required: false,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      dhl_date:null,
      input_date: null,
      output_date: null,
      filteredCustomers: null,
      selectedCustomer: null,
      selectedCountry: null,
      filteredCountry: null,
      selectedUser: null,
      filteredUser: null,
      selectedCategory: null,
      selectedUnit: null,
      selectedSendingType: null,
      selectedBankType: null,
      bankTypeDisabled: false,
      paid_date: null,
      selectedBank: null,
      freigthCost: null,
      paidDescription: null,
      selectedFrontPhoto: null,
      selectedBackPhoto: null,
    };
  },
  created() {
    if (!this.status) {
      this.createdProcess();
    }
  },
  methods: {
    dhlDateSelected(event){
      this.model.DhlTarihi = date.dateToString(event);
    },

    customerInput(event) {
      this.model.FirmaAdi = event;
    },
    createdProcess() {
      this.selectedCategory = this.category.find((x) => x.ID == this.model.KategoriID);
      this.selectedUnit = this.unit.find((x) => x.ID == this.model.UrunBirimi);
      this.selectedSendingType = this.sending.find(
        (x) => x.ID == this.model.GonderiTipi
      ).ID;
      if (this.model.GonderiTipi == 1 || this.model.GonderiTipi == 3) {
        this.bankTypeDisabled = true;
      }

      if (this.model.BankaSecim == null || this.model.BankaSecim == 0 || this.model.BankaSecim == 'null' || this.model.BankaSecim == undefined || this.model.BankaSecim == 0) {
        this.selectedBankType = null;
        this.model.BankaSecim = 0
      } else {
        this.selectedBankType = this.bank.find((x) => x.ID == this.model.BankaSecim).ID;
      }
      if (this.model.NumuneTarihi == null || this.model.NumuneTarihi == " " || this.model.NumuneTarihi == undefined || this.model.NumuneTarihi == '1900-01-01' || this.model.NumuneTarihi== '1900-01-01T00:00:00.000Z') {
        this.input_date = null;
      } else {
        this.input_date = date.stringToDate(this.model.NumuneTarihi);
      }
      if (this.model.YuklemeTarihi == null || this.model.YuklemeTarihi == " " || this.model.YuklemeTarihi == undefined || this.model.YuklemeTarihi == '1900-01-01' || this.model.YuklemeTarihi== '1900-01-01T00:00:00.000Z') {
        this.output_date = null;
      } else {
        this.output_date = date.stringToDate(this.model.YuklemeTarihi);
      };
      if(this.model.DhlTarihi == null || this.model.DhlTarihi == '' || this.model.DhlTarihi == undefined || this.model.DhlTarihi == '1900-01-01' || this.model.DhlTarihi== '1900-01-01T00:00:00.000Z'){
        this.dhl_date = '';
      }else{
        this.dhl_date = date.stringToDate(this.model.DhlTarihi);

      }
      this.selectedCustomer = this.customers.find((x) => x.Id == this.model.MusteriID);
      this.selectedCountry = this.country.find((x) => x.Id == this.model.Ulke);
      this.selectedUser = this.users.find((x) => x.ID == this.model.NumuneTemsilci);
    },
    deleteProcess() {
      if(confirm('Are you sure you want to delete?')){
        const data = {
          id: this.model.ID,
          po: this.model.NumuneNo,
        };
        this.$emit("delete_process", data);
      }

    },
    process() {


      
      this.model.NumuneTarihi = date.dateToString(this.input_date);
      if (this.output_date == null || this.output_date == " " || this.output_date == '1900-01-01' || this.output_date == undefined || this.output_date== '1900-01-01T00:00:00.000Z') {
        this.model.YuklemeTarihi = "";
      } else {
        this.model.YuklemeTarihi = date.dateToString(this.output_date);
      };
      if(this.model.DhlTarihi == null || this.model.DhlTarihi == '1900-01-01' || this.model.DhlTarihi == undefined || this.model.DhlTarihi== '1900-01-01T00:00:00.000Z'){
        this.model.DhlTarihi = '';
      }
      
      this.$emit("process", this.model);
    },
    backPhotoSelected(event) {
      upload.sendSample(event.files[0], this.model.ID).then((response) => {
        if (response.Status) {
          const data = {
            ID: this.model.ID,
            Numune_Cloud2: true,
            Numune_Cloud_Dosya2: event.files[0].name,
          };
          this.$store.dispatch("setSamplePhotosBack", data);
          this.model.ArkaYuzFoto = `https://file-service.mekmar.com/file/download/numune/numuneDosya/${this.model.ID}/${event.files[0].name}`;
        } else {
          this.$toast.error("Fotoğrafın Arka Yüzü Yüklenemedi.");
        }
      });
    },
    frontPhotoSelected(event) {
      upload.sendSample(event.files[0], this.model.ID).then((response) => {
        if (response.Status) {
          const data = {
            ID: this.model.ID,
            Numune_Cloud: true,
            Numune_Cloud_Dosya: event.files[0].name,
          };
          this.$store.dispatch("setSamplePhotosFront", data);
          this.model.OnYuzFoto = `https://file-service.mekmar.com/file/download/numune/numuneDosya/${this.model.ID}/${event.files[0].name}`;
        } else {
          this.$toast.error("Fotoğrafın Ön Yüzü Yüklenemedi.");
        }
      });
    },
    savePaid() {
      const paidData = {
        Tarih: date.dateToString(this.paid_date),
        MusteriID: this.model.MusteriID,
        MusteriAdi: this.model.MusteriAdi,
        NumuneNo: this.model.NumuneNo,
        Aciklama: this.paidDescription,
        MusteriID: this.model.MusteriID,
        Tutar: this.freigthCost,
        Kullanici: Cookies.get("userId"),
        KullaniciAdi: Cookies.get("username"),
        Banka: this.selectedBank.BankaAdi,
      };
      this.$store.dispatch("setSamplePaidSave", paidData);
      this.$store.dispatch("setSampleDetailPaidList", this.model.NumuneNo);
    },
    formatPoint(value) {
      if (value == null) {
        return 0;
      } else {
        return value.replace(",", ".");
      }
    },
    bankTypeSelected(event) {
      this.model.BankaSecim = this.selectedBankType;
    },
    sendingTypeSelected(event) {
      this.model.GonderiTipi = this.selectedSendingType;
      if (this.selectedSendingType == 1 || this.selectedSendingType == 3) {
        this.bankTypeDisabled = true;
      } else {
        this.bankTypeDisabled = false;
      }
    },
    unitSelected(event) {
      this.model.UrunBirimi = event.value.ID;
    },
    categorySelected(event) {
      this.model.KategoriID = event.value.ID;
    },
    userSelected(event) {
      this.model.NumuneTemsilci = event.value.ID;
    },
    searchUser(event) {
      let results;
      if (event.query.length == 0) {
        results = this.users;
      } else {
        results = this.users.filter((x) => {
          return x.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredUser = results;
    },
    countrySelected(event) {
      this.model.UlkeAdi = event.value.UlkeAdi;
      this.model.Ulke = event.value.Id;
    },
    searchCountry(event) {
      let results;
      if (event.query.length == 0) {
        results = this.country;
      } else {
        results = this.country.filter((x) => {
          return x.UlkeAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredCountry = results;
    },
    customerSelected(event) {
      this.model.FirmaAdi = event.value.MusteriAdi;
      this.model.MusteriID = event.value.Id;
      this.selectedCountry = this.country.find((x) => x.Id == event.value.UlkeId);
      this.model.UlkeAdi = this.selectedCountry.UlkeAdi;
      this.model.Ulke = this.selectedCountry.Id;
      this.model.Adres = event.value.Adress;
    },
    searchCustomers(event) {
      let results;
      if (event.query.length == 0) {
        results = this.customers;
      } else {
        results = this.customers.filter((x) => {
          return x.MusteriAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredCustomers = results;
    },
  },
};
</script>
<style scoped>
@media screen and (max-width:576px) {
  .row{
    clear:both;
    display: block;
    width:100%;
  }
  .col{
    clear:both;
    display:block;
    width:100%;
  }
  .col-3{
    clear:both;
    display:block;
    width:100%;
  }
  .col-9{
    clear:both;
    display:block;
    width:100%;
  }
  
}
</style>