<template>
  <div class="container">
    <div class="row mt-3">
      <div class="col-9">
        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <InputText
                id="customer"
                type="text"
                v-model="modelValue.FirmaAdi"
                class="w-100"
              />
              <label for="customer">Customer</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText
                id="mail"
                type="text"
                v-model="modelValue.MailAdresi"
                class="w-100"
              />
              <label for="mail">Mail</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <Textarea
                v-model="modelValue.Unvan"
                rows="4"
                cols="30"
                style="width: 100%"
              />
              <label>Company</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <Textarea
                v-model="modelValue.Adres"
                rows="4"
                cols="30"
                style="width: 100%"
              />
              <label>Address</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <InputText
                id="marketing"
                type="text"
                v-model="modelValue.Marketing"
                class="w-100"
              />
              <label for="marketing">Marketing</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText
                id="phone"
                type="text"
                v-model="modelValue.Telefon"
                class="w-100"
              />
              <label for="phone">Phone</label>
            </span>
          </div>
          <div class="col">
            <Dropdown
              v-model="selectedPriority"
              :options="priorities"
              class="w-100"
              optionLabel="priority"
            />
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <AutoComplete
                v-model="selectedRepresentative"
                inputId="representative"
                :suggestions="filteredRepresentative"
                field="KullaniciAdi"
                @complete="searchRepresentative($event)"
              />
              <label for="representative">Representative</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <AutoComplete
                v-model="selectedOrderer"
                inputId="orderer"
                :suggestions="filteredOrderer"
                field="KullaniciAdi"
                @complete="searchOrderer($event)"
              />
              <label for="orderer">Orderer</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <AutoComplete
                v-model="selectedCountry"
                inputId="country"
                :suggestions="filteredCountry"
                field="UlkeAdi"
                @complete="searchCountry($event)"
              />
              <label for="country">Country</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <Textarea v-model="modelValue.Notlar" rows="5" class="w-100" />
              <label>Description</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <div class="flex align-items-center">
              <Checkbox v-model="modelValue.Devir" inputId="cycle" :binary="true" />
              <label for="cycle" class="ml-2"> Transfer </label>
            </div>
          </div>
          <div class="col">
            <div class="flex align-items-center">
              <Checkbox v-model="modelValue.Ozel" inputId="special" :binary="true" />
              <label for="special" class="ml-2"> Special </label>
            </div>
          </div>
          <div class="col">
            <div class="flex align-items-center">
              <Checkbox v-model="modelValue.Takip" inputId="follow" :binary="true" />
              <label for="follow" class="ml-2"> Follow </label>
            </div>
          </div>
          <div class="col">
            <div class="flex align-items-center">
              <Checkbox
                v-model="modelValue.SonKullanici"
                inputId="lastuser"
                :binary="true"
              />
              <label for="lastuser" class="ml-2"> Last Orderer </label>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <DataTable
          :value="orders"
          sortField="year"
          :sortOrder="-1"
          :selection.sync="selectedOrderYear"
          selectionMode="single"
          @row-click="orderYearSelected($event)"
        >
          <Column field="year" header="Year"></Column>
          <Column field="total" header="Total">
            <template #body="slotProps">
              {{ slotProps.data.total | formatPriceUsd }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <button type="button" class="btn btn-success w-100" @click="saveProcess">
          Save
        </button>
      </div>
      <div class="col" v-if="!status">
        <button type="button" class="btn btn-danger w-100" @click="deleteForm">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import convertDate from "../../../plugins/date";
import Cookies from "js-cookie";
export default {
  computed: {},
  props: {
    model: {
      type: Object,
      required: false,
    },
    country: {
      type: Array,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    users: {
      type: Array,
      required: true,
    },
    orders: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      customerModel: "",
      selectedCountry: null,
      filteredCountry: null,
      selectedRepresentative: null,
      filteredRepresentative: null,
      selectedOrderer: null,
      filteredOrderer: null,
      selectedPriority: null,
      priorities: [{ priority: "A" }, { priority: "B" }, { priority: "C" }],
      selectedOrderYear: null,
      modelValue: null,
    };
  },
  created() {
    this.modelValue = this.model;
    if (!this.status) {
      this.createdProcess();
    }
  },
  mounted() {},
  methods: {
    update() {
      this.modelValue.MusteriOncelik = this.selectedPriority.priority;
      this.modelValue.Temsilci = this.selectedRepresentative.KullaniciAdi;
      this.modelValue.TemsilciId = this.selectedRepresentative.ID;
      this.modelValue.Satisci = this.selectedOrderer.KullaniciAdi;
      this.modelValue.SatisciId = this.selectedOrderer.ID;
      this.modelValue.Aktif = 1;
      this.modelValue.Ulke = this.selectedCountry.UlkeAdi;
      this.modelValue.UlkeId = this.selectedCountry.Id;
      this.modelValue.Mt_No = 2;
      if (this.modelValue.Devir) {
        this.modelValue.Devir = 1;
      } else {
        this.modelValue.Devir = 0;
      }
      if (this.modelValue.Ozel) {
        this.modelValue.Ozel = 1;
      } else {
        this.modelValue.Ozel = 0;
      }
      if (this.modelValue.Takip) {
        this.modelValue.Takip = 1;
      } else {
        this.modelValue.Takip = 0;
      }
      if (this.modelValue.SonKullanici) {
        this.modelValue.SonKullanici = 1;
      } else {
        this.modelValue.SonKullanici = 0;
      }
      this.$store.dispatch("setMekmarCustomerUpdate", this.modelValue);
      this.$emit("customer_mekmar_dialog", false);
    },
    save() {
      this.modelValue.MusteriOncelik = this.selectedPriority.priority;
      this.modelValue.Temsilci = this.selectedRepresentative.KullaniciAdi;
      this.modelValue.TemsilciId = this.selectedRepresentative.ID;
      this.modelValue.Satisci = this.selectedOrderer.KullaniciAdi;
      this.modelValue.SatisciId = this.selectedOrderer.ID;
      this.modelValue.Aktif = 1;
      this.modelValue.Ulke = this.selectedCountry.UlkeAdi;
      this.modelValue.UlkeId = this.selectedCountry.Id;
      this.modelValue.KayitTarihi = convertDate.dateToString(new Date());
      this.modelValue.Mt_No = 2;
      this.modelValue.KullaniciID = Cookies.get("userId");
      if (this.modelValue.Devir) {
        this.modelValue.Devir = 1;
      } else {
        this.modelValue.Devir = 0;
      }
      if (this.modelValue.Ozel) {
        this.modelValue.Ozel = 1;
      } else {
        this.modelValue.Ozel = 0;
      }
      if (this.modelValue.Takip) {
        this.modelValue.Takip = 1;
      } else {
        this.modelValue.Takip = 0;
      }
      if (this.modelValue.SonKullanici) {
        this.modelValue.SonKullanici = 1;
      } else {
        this.modelValue.SonKullanici = 0;
      }

      this.$store.dispatch("setMekmarCustomerSave", this.modelValue);
      this.$emit("customer_mekmar_dialog", false);
    },
    deleteForm() {
      this.$store.dispatch("setMekmarCustomerDelete", this.modelValue.ID);
      this.$emit("customer_mekmar_dialog", false);
    },
    saveProcess() {
      if (this.status) {
        this.save();
      } else {
        this.update();
      }
    },
    orderYearSelected(event) {
      this.$emit("customer_mekmar_order_po_emit", event.data);
    },
    searchOrderer(event) {
      let results;
      if (event.query.length == 0) {
        results = this.users;
      } else {
        results = this.users.filter((x) => {
          return x.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredOrderer = results;
    },
    searchRepresentative(event) {
      let results;
      if (event.query.length == 0) {
        results = this.users;
      } else {
        results = this.users.filter((x) => {
          return x.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredRepresentative = results;
    },
    createdProcess() {

      this.selectedCountry = this.country.find((x) => x.Id == this.modelValue.UlkeId);
      this.selectedRepresentative = this.users.find(
        (x) => x.ID == this.modelValue.TemsilciId
      );
      this.selectedOrderer = this.users.find((x) => x.ID == this.modelValue.SatisciId);
      this.selectedPriority = this.priorities.find(
        (x) => x.priority == this.modelValue.MusteriOncelik
      );
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
  },
};
</script>
