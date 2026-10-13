<template>
  <div class="">
    <loadingSpinner v-show="getLoading" />
    <navbar
      v-show="$store.getters.isAuthenticated"
      style="margin-bottom: 5px"
    />
    <nuxt />
    <!-- Sirket ici sohbet: sag altta duran panel. Layout'ta durur ki sayfa
         gezintilerinde baglanti ve yazisma kopmasin. -->
    <chatPanel v-if="$store.getters.isAuthenticated" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  middleware: [
    "sessionControl",
    "authControl",
    "navbarControl",
    "ayoControl",
    "auth-check",
  ],
  computed: {
    ...mapGetters(["getLoading"]),
  },
  data() {
    return {
      /* Aktiflik bildirimini kisitlamak icin son gonderim zamani */
      sonAktiflikBildirimi: 0,
      aktiflikEli: null,
      gorunurlukEli: null,
    };
  },
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
  mounted() {
    /* Sohbet yalnizca istemcide ve oturum acikken kurulur. */
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch("setChatConnection");
      this.$store.dispatch("setChatUserList");
      this.aktiflikDinleyicileriniKur();
    }
  },
  beforeDestroy() {
    this.aktiflikDinleyicileriniKaldir();
    this.$store.dispatch("setChatDisconnect");
  },
  methods: {
    /* "Son aktiflik" gercek etkileşimden hesaplanir: sekmeyi acik birakip
       giden kullanici cevrimici degil "X dakika once aktif" gorunsun.
       Her harekette degil, en fazla ARALIK kadar sikligkla bildirilir. */
    aktiflikBildir() {
      const simdi = Date.now();
      if (simdi - this.sonAktiflikBildirimi < 45 * 1000) {
        return;
      }
      this.sonAktiflikBildirimi = simdi;
      const chatSocket = this.$store.getters.getChatSocket;
      if (chatSocket && chatSocket.connected) {
        chatSocket.emit("presence:ping");
      }
    },
    aktiflikDinleyicileriniKur() {
      this.aktiflikEli = () => this.aktiflikBildir();
      for (const olay of ["mousedown", "keydown", "wheel", "touchstart"]) {
        window.addEventListener(olay, this.aktiflikEli, { passive: true });
      }
      this.gorunurlukEli = () => {
        if (document.visibilityState === "visible") {
          /* Sekmeye geri donmek etkileşimdir; kisitlamayi atla. */
          this.sonAktiflikBildirimi = 0;
          this.aktiflikBildir();
        }
      };
      document.addEventListener("visibilitychange", this.gorunurlukEli);
    },
    aktiflikDinleyicileriniKaldir() {
      if (this.aktiflikEli) {
        for (const olay of ["mousedown", "keydown", "wheel", "touchstart"]) {
          window.removeEventListener(olay, this.aktiflikEli);
        }
      }
      if (this.gorunurlukEli) {
        document.removeEventListener("visibilitychange", this.gorunurlukEli);
      }
    },
  },
};
</script>
<style>
* {
  font-family: "Times New Roman", Times, serif;
  font-size: 13px;
}
.p-column-header-content > .p-column-title {
  font-weight: bold;
  font-size: 13px;
  text-align: center;
  margin: 0px auto;
}
.tableBody {
  font-size: 11px;
}
.p-datatable .p-datatable-tfoot > tr > td {
  font-size: 11px;
  font-weight: normal;
}
</style>
