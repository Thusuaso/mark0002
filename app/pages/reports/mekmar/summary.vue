<template>
  <div class="container">
    <div class="row">
      <ReportsMekmarSummaryList v-for="(item, index) of reportsStore.getReportsMekmarSummaryOrderList" :key="item.Month" :list="item"
        :year="new Date().getFullYear() - index" :total="reportsStore.getReportsMekmarSummaryOrderListTotal[index]"
        @order_selected_list_emit="orderSelectedList($event, true)" :status="'Order'" />
      <ReportsMekmarSummaryList v-for="(item, index) of reportsStore.getReportsMekmarSummaryOrderListByRepresentative"
        :key="item.Month" :list="item" :year="new Date().getFullYear() - index"
        :total="reportsStore.getReportsMekmarSummaryOrderListByRepresentativeTotal[index]"
        @order_selected_list_emit="orderSelectedListOrderer($event, true)" :status="'Seller'" />
    </div>
    <div class="row">
      <ReportsMekmarSummaryList v-for="(item, index) of reportsStore.getReportsMekmarSummaryForwardingList" :key="item.Month"
        :list="item" :year="new Date().getFullYear() - index" :total="reportsStore.getReportsMekmarSummaryForwardingListTotal[index]"
        @order_selected_list_emit="orderSelectedList($event, false)" :status="'Shipment'" />
    </div>
    <Dialog v-model:visible="reports_mekmar_summary_list_detail_dialog" header="" modal>
      <ReportsMekmarSummaryDetailList :list="reportsStore.getReportsMekmarSummaryOrderDetail"
        :total="reportsStore.getReportsMekmarSummaryOrderDetailTotal" />
    </Dialog>
  </div>
</template>
<script>
import { useReportsStore } from "~/stores/reports"
export default {
  computed: {
    reportsStore() {
      return useReportsStore()
    },
  },
  data() {
    return {
      reports_mekmar_summary_list_detail_dialog: false,
      userId: null,
    };
  },
  /*
   * created() KALDIRILDI; icerigi asagidaki mounted()'a tasindi (dosyada
   * zaten bir mounted() vardi, ikisi birlesti).
   *
   * NEDEN: created() SSR'da da calisir, icindeki async is BEKLENMEZ ve
   * listeler BOS serialize edilir; hydration onu devralir, created() bir
   * daha calismadigi icin tablolar bos kalir (bkz. commit 2afc877e3).
   * mounted() sunucuda hic calismaz.
   *
   * SIRA KORUNDU: Vue 2'de de created() mounted()'tan ONCE calisiyordu --
   * siparis/sevkiyat listeleri, temsilci listesinden once isteniyor.
   */
  methods: {
    orderSelectedListOrderer(event,status) {
      const data = {
        'month': event.Month,
        'year': event.Year,
        'userId': useCookie('userId').value
      }
      this.reportsStore.setReportsMekmarSummaryOrderDetailRepresentative(data);
      this.reports_mekmar_summary_list_detail_dialog = true;

    },
    orderSelectedList(event, status) {
      if (status) {
        this.reportsStore.setReportsMekmarSummaryOrderDetail(event);
        this.reports_mekmar_summary_list_detail_dialog = true;
      } else {
        this.reportsStore.setReportsMekmarSummaryForwardingDetail(event);
        this.reports_mekmar_summary_list_detail_dialog = true;
      }
    },
  },
  watch: {
    userId() {
      this.reportsStore.setReportsMekmarSummaryOrderListByRepresentative(this.userId);
    },
  },
  mounted() {
    /* Eski created()'dan tasindi -- gerekcesi yukarida. */
    this.reportsStore.setReportsMekmarSummaryOrderList();
    this.reportsStore.setReportsMekmarSummaryForwardingList();

    this.userId = useCookie("userId").value;

    /*
     * DIKKAT -- MUKERRER CAGRI (Nuxt 2'de de vardi, korundu):
     * `userId` bir watch ile de izleniyor ve null -> deger degisimi o
     * izleyiciyi tetikliyor, yani bu eylem ayni acilista IKI KEZ
     * cagriliyor. Zararsiz (ayni listeyi yeniden yazar) ama bir istek
     * bosa gidiyor. Birini kaldirmak davranis karari -- izleyici,
     * kullanici degisirse gerekli; buradaki cagri ise cereze
     * ulasilamadigi durumda watch hic tetiklenmeyecegi icin duruyor.
     */
    this.reportsStore.setReportsMekmarSummaryOrderListByRepresentative(
      this.userId
    );
  },
};
</script>

<script setup>
/*
 * definePageMeta yalnizca <script setup> icinde kullanilabilir ->
 * Options API sayfalarinda IKINCI bir script blogu gerekiyor.
 * Nuxt 2'deki `middleware: ["authority"]` karsiligi.
 */
definePageMeta({ middleware: ["authority"] })
</script>

<!--
  pages/reports/mekmar/summary.vue

  Bagimliliklar:
    components/reports/mekmar/summary/list.vue   -> SummaryList.vue
    components/reports/mekmar/summary/detail.vue -> SummaryDetailList.vue
  (ikisinde de elle duzeltme gerekmedi; codemod yetti.)

  ELLE:
  [x] mapGetters(8 getter) + 6 dispatch -> reportsStore (hepsi reports.ts'te)
  [x] js-cookie Cookies.get -> useCookie(...).value
  [x] middleware: ["authority"] -> definePageMeta (ikinci <script setup>)
  [x] created() KALDIRILDI, icerigi mounted()'a tasindi (dosyada zaten bir
      mounted() vardi). Sira korundu.

  DOKUNULMADI ama DIKKAT:
  [!] userId hem mounted()'ta atanip hem watch ile izlendigi icin
      setReportsMekmarSummaryOrderListByRepresentative her acilista IKI KEZ
      cagriliyor. Zararsiz (ayni listeyi yeniden yazar) ama bir istek bosa
      gidiyor. Nuxt 2'de de boyleydi; ayrinti mounted() icindeki notta.

  TASIMA YOLU: elle yeniden yazilmadi; tools/codemods/vue2-to-vue3.mjs
  uygulandi, sonra codemod'un "ELLE YAPILACAK" diye listeledigi maddeler
  kapatildi. Kaynak: mark0002 deposunun codemod-vue3-prep dali (filtreler
  ve .sync orada zaten cevrilmisti).
-->
