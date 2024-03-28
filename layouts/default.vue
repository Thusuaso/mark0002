<template>
  <div class="">
    <navbar v-if="$store.getters.isAuthenticated" />
    <br />
    <nuxt />
  </div>
</template>
<script>
export default {
  middleware: ["sessionControl", "authControl"],
  created() {
    this.$store.dispatch("setCountryList");
    this.$store.dispatch("setUserList");
    this.$store.dispatch("setOrderList");
    this.$store.dispatch("setCardList");
    this.$store.dispatch("setSupplierList");
    this.$store.dispatch("setMineList");
    this.$store.dispatch("setCardCategoryList");
    this.$store.dispatch("setCardProductsList");
    this.$store.dispatch("setCardSurfacesList");
    this.$store.dispatch("setCardSizesList");
    this.$store.dispatch("setOrderAllList");
    this.$store.dispatch("setSelectionSurfaces");
    this.$store.dispatch("setCustomersOfferList");
    this.$store.dispatch("setSampleCategoryList");
    this.$store.dispatch("setSampleUnitList");
    this.$store.dispatch("setSampleSendingTypeList");
    this.$store.dispatch("setSampleBankAccountTypeList");
    this.$store.dispatch("setCustomerList");
    this.$store.dispatch("setUnitList");
    this.$store.dispatch("setOrderKindOfDeliveryList");
    this.$store.dispatch("setOrderKindOfPaymentList");
    this.$store.dispatch("setOrderKindOfInvoiceList");
    this.$store.dispatch("setOrderKindOfDeliverySupplierList");
    this.$store.dispatch("setYearList");
    this.$store.dispatch("setMonthList");
  },
};
</script>
<style>
* {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.tableHeader {
  font-size: 15px;
  font-weight: bold;
}
.tableBody {
  font-size: 13px;
}
</style>
