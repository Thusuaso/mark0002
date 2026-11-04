<template>
  <div>
    <div class="row container">
      <div class="col">
        <Dropdown
          v-model="selectedYear"
          :options="getReportsMekmarGuYearList"
          optionLabel="Year"
          @change="yearSelected($event)"
        />
      </div>
    </div>
    <TabView>
      <TabPanel header="Container (Mekmar)">
        <reportsMekmarGuContList
          :contCountList="getReportsMekmarGuContList"
          :contCustList="getReportsMekmarGuContByCustList"
        />
      </TabPanel>
      <!-- <TabPanel header="Mekus">
        <reportsMekmarGuMekusList :list="getReportsMekmarGuMekusList" />
      </TabPanel> -->
      <TabPanel header="Logs">
        <reportsMekmarGuLogsList :list="getReportsMekmarGuLogsList" />
      </TabPanel>
      <TabPanel header="Shipment Summary (Yearly)">
        <Button
          type="button"
          label="Excel"
          class="p-button-secondary"
          @click="forwarding_excel_output"
        />
        <div class="row">
          <reportsMekmarGuForwardingList
            v-for="item of getReportsMekmarGuForwList"
            :key="item"
            :list="item"
          />
        </div>
      </TabPanel>
      <TabPanel header="Order Summary (Yearly)">
        <Button
          type="button"
          label="Excel"
          class="p-button-secondary"
          @click="forwarding_excel_output_2"
        />
        <div class="row">
          <reportsMekmarGuForwardingList
            v-for="item of getReportsMekmarGuOrderList"
            :key="item"
            :list="item"
          />
        </div>
      </TabPanel>
      <!-- <TabPanel header="Ayo">
        <DataTable :value="getReportsMekmarGuAyoList">
          <Column field="Yil" header="Year"></Column>
          <Column field="Usd" header="Usd">
            <template #body="slotProps">
              {{ slotProps.data.Usd | formatPriceUsd }}
            </template>
            <template #footer>
              {{ ayoUsdTotal | formatPriceUsd }}
            </template>
          </Column>
          <Column field="Tl" header="Tl">
            <template #body="slotProps">
              {{ slotProps.data.Tl | formatPriceTl }}
            </template>
            <template #footer>
              {{ ayoTlTotal | formatPriceTl }}
            </template>
          </Column>
        </DataTable>



      </TabPanel> -->
      <TabPanel header="Seller Orders">
        <ordererOperation />
      </TabPanel>
      <TabPanel header="Seller Shipped">
        <shippedOperation />
      </TabPanel>
      <TabPanel header="Seller Shipped Profit">
        <profitGu
          :thisyear="ayoListThisYear"
          :oneyear="ayoListOneYearAgo"
          :twoyear="ayoListTwoYearAgo"
        />
      </TabPanel>
      <TabPanel header="Offer Source">
        <guOfferSource />
      </TabPanel>
      <TabPanel header="Offer Country">
        <guOfferCountry />
      </TabPanel>
    </TabView>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  middleware: ["authority"],
  computed: {
    ...mapGetters([
      "getReportsMekmarGuYearList",
      "getReportsMekmarGuAyoCostList",
      "getReportsMekmarGuContList",
      "getReportsMekmarGuContByCustList",
      "getReportsMekmarGuMekusList",
      "getReportsMekmarGuLogsList",
      "getReportsMekmarGuForwList",
      "getReportsMekmarGuAyoList",
      "getReportsMekmarGuOrderList",
    ]),
  },
  data() {
    return {
      selectedYear: null,
      ayoUsdTotal: 0,
      ayoTlTotal: 0,
      ayoListThisYear: [],
      ayoListOneYearAgo: [],
      ayoListTwoYearAgo: [],
    };
  },
  beforeCreate() {
    this.$store.dispatch("setReportsMekmarGuList");
  },
  created() {
    /* Sabit 2026 yazilmisti; yil degisince sayfa gecen yila bakiyordu. */
    this.selectedYear = { Year: new Date().getFullYear() };
    this.$excelApi
      .get(`/maliyet/listeler/maliyetListesi/${this.selectedYear.Year}`)
      .then((res) => {
        this.ayoListThisYear = res.data;
      });

    this.$excelApi
      .get(`/maliyet/listeler/maliyetListesi/${this.selectedYear.Year - 1}`)
      .then((res) => {
        this.ayoListOneYearAgo = res.data;
      });
    this.$excelApi
      .get(`/maliyet/listeler/maliyetListesi/${this.selectedYear.Year - 2}`)
      .then((res) => {
        this.ayoListTwoYearAgo = res.data;
      });
  },

  methods: {
    /* Excel artik python sunucusunda degil tarayicida uretiliyor.
       Eskiden liste /reports/gu/forwarding ucuna POST edilip, uretilen sabit
       dosya ayni adresten geri indiriliyordu; sayfadaki yillar degisse de
       dosyadaki basliklar sabit kaldigi icin 2026/2025 gelmiyordu. Simdi
       sayfanin kendi verisini yaziyoruz, sayfa basligi ile sayfadaki yil
       ayni kaynaktan (grup.year) geliyor. */
    async __yillikOzetExcel(gruplar, dosyaAdi) {
      const dolu = (gruplar || []).filter(
        (g) => g && Array.isArray(g.data) && g.data.length > 0
      );

      if (dolu.length === 0) {
        this.$toast.error("Aktarilacak kayit bulunamadi.");
        return;
      }

      /* Ekranda kullanilan ay adlarinin aynisi (plugins/components.js) */
      const ayAdi = this.$options.filters.monthToString;

      const XLSX = await import("xlsx");
      const workbook = XLSX.utils.book_new();

      dolu.forEach((grup) => {
        const rows = [...grup.data]
          .sort((a, b) => a.Ay - b.Ay)
          .map((x) => ({
            Month: ayAdi ? ayAdi(x.Ay) : x.Ay,
            Fob: x.Fob,
            Ddp: x.Ddp,
          }));

        rows.push({ Month: "Total", Fob: grup.fob, Ddp: grup.ddp });

        const worksheet = XLSX.utils.json_to_sheet(rows, {
          header: ["Month", "Fob", "Ddp"],
        });
        worksheet["!freeze"] = { xSplit: "0", ySplit: "1" };

        XLSX.utils.book_append_sheet(workbook, worksheet, String(grup.year));
      });

      XLSX.writeFile(workbook, dosyaAdi);
    },
    forwarding_excel_output() {
      this.__yillikOzetExcel(
        this.getReportsMekmarGuForwList,
        "sevkiyat_ozeti_yillik.xlsx"
      );
    },
    forwarding_excel_output_2() {
      this.__yillikOzetExcel(
        this.getReportsMekmarGuOrderList,
        "siparis_ozeti_yillik.xlsx"
      );
    },
    yearSelected(event) {
      this.$store.dispatch("setReportsMekmarGuListYear", event.value.Year);
    },
  },
  watch: {
    getReportsMekmarGuAyoList() {
      this.ayoUsdTotal = 0;
      this.ayoTlTotal = 0;
      this.getReportsMekmarGuAyoList.forEach((x) => {
        this.ayoUsdTotal += x.Usd;
        this.ayoTlTotal += x.Tl;
      });
    },
  },
};
</script>
