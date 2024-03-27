<template>
  <div>
    <div class="row mt-4">
      <div class="col">
        <span class="p-float-label">
          <InputText id="company" v-model="companyData.companyname" />
          <label for="company">Company</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="mail" v-model="companyData.mail" />
          <label for="mail">Mail</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="phone" v-model="companyData.phone" />
          <label for="phone">Phone</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="description" v-model="companyData.description" />
          <label for="description">Description</label>
        </span>
      </div>
    </div>
    <Button type="button" class="p-button-success w-100" label="Save" @click="save" />
    <DataTable :value="company" paginator :rows="15">
      <Column
        field="ID"
        header="Id"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="FirmaAdi"
        header="Company"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="Telefon"
        header="Phone"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="MailAdresi"
        header="Mail"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="Notlar"
        header="Description"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
    </DataTable>
  </div>
</template>
<script>
export default {
  props: {
    company: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      companyData: {
        companyname: null,
        mail: null,
        phone: null,
        description: null,
      },
    };
  },
  methods: {
    save() {
      this.$store.dispatch("setCompanySave", this.companyData);
    },
  },
};
</script>
