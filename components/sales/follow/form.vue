<template>
  <div class="container">
    <DataTable
      :value="detailFollow"
      tableStyle="min-width: 50rem"
      :selection="selectedFollowDetail"
      selectionMode="single"
      :metaKeySelection="true"
      dataKey="ID"
      @row-click="followDetailSelected($event)"
    >
      <Column field="Tarih" header="Date" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ slotProps.data.Tarih | dateToString }}
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
        field="Hatirlatma_Tarih"
        header="Reminder Time"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.Hatirlatma_Tarih | dateToString }}
        </template>
      </Column>
      <Column
        field="Hatirlatma_Notu"
        header="Reminder"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="KullaniciAdi"
        header="Seller"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
    </DataTable>
  </div>
</template>
<script>
export default {
  computed: {},
  props: {
    detailFollow: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      selectedFollowDetail: null,
    };
  },
  methods: {
    followDetailSelected(event) {
      this.$store.dispatch("setFollowDetailNewButton", false);
      this.$store.dispatch("setFollowDetailData", event.data);
      this.$emit("follow_detail_data", event.data);
    },
  },
};
</script>
