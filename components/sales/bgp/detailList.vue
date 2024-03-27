<template>
  <div class="container">
    <Button type="button" class="p-button-success" label="New" @click="newForm" />
    <DataTable
      :value="getBgpDetailList"
      :selection="selectedBgpDetail"
      selectionMode="single"
      @row-click="bgpDetailSelected($event)"
    >
      <Column
        field="FirmaAdi"
        header="Customer"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="KayitTarihi"
        header="Date"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.KayitTarihi | dateToString }}
        </template>
      </Column>
      <Column
        field="Baslik"
        header="Title"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="Aciklama"
        header="Explanation"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="HatirlatmaTarihi"
        header="Reminder Time"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.HatirlatmaTarihi | dateToString }}
        </template>
      </Column>
      <Column
        field="HatirlatmaAciklama"
        header="Reminder"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="Email"
        header="Mail"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="Unvan"
        header="Degree"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
    </DataTable>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getBgpDetailList"]),
  },
  data() {
    return {
      selectedBgpDetail: null,
    };
  },
  methods: {
    bgpDetailSelected(event) {
      this.$store.dispatch("setBgpDetailButton", false);
      this.$emit("bgp_detail_form_dialog", event.data);
    },
    newForm() {
      this.$store.dispatch("setBgpDetailButton", true);
      const model = {
        FirmaAdi: null,
        Email: null,
        PhoneNumber: null,
        Aciklama: null,
        Baslik: null,
        HatirlatmaAciklama: null,
      };
      this.$emit("bgp_detail_form_dialog", model);
    },
  },
};
</script>
