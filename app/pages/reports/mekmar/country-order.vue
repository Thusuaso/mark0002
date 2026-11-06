<template>
  <div>
    <Button
      type="button"
      severity="secondary"
      @click="excel_output"
      label="Excel"
    />

    <div class="row">
      <div class="col-12 col-lg-4">
        <DataTable :value="list_this_year" scrollable scrollHeight="500px">
          <template #header> {{ year }} Orders </template>
          <Column field="UlkeAdi" header="Country"></Column>
          <Column field="Fob" header="Fob">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.Fob) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(list_this_year_total.fob) }}
            </template>
          </Column>
          <Column field="ddp" header="Ddp">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.ddp) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(list_this_year_total.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="col-12 col-lg-4">
        <DataTable :value="list_one_year_ago" scrollable scrollHeight="500px">
          <template #header> {{ year - 1 }} Orders </template>
          <Column field="UlkeAdi" header="Country"></Column>
          <Column field="Fob" header="Fob">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.Fob) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(list_one_year_ago_total.fob) }}
            </template>
          </Column>
          <Column field="ddp" header="Ddp">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.ddp) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(list_one_year_ago_total.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="col-12 col-lg-4">
        <DataTable :value="list_two_year_ago" scrollable scrollHeight="500px">
          <template #header> {{ year - 2 }} Orders </template>
          <Column field="UlkeAdi" header="Country"></Column>
          <Column field="Fob" header="Fob">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.Fob) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(list_two_year_ago_total.fob) }}
            </template>
          </Column>
          <Column field="ddp" header="Ddp">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.ddp) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(list_two_year_ago_total.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-lg-4">
        <DataTable :value="list_three_year_ago" scrollable scrollHeight="500px">
          <template #header> {{ year - 3 }} Orders </template>
          <Column field="UlkeAdi" header="Country"></Column>
          <Column field="Fob" header="Fob">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.Fob) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(list_three_year_ago_total.fob) }}
            </template>
          </Column>
          <Column field="ddp" header="Ddp">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.ddp) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(list_three_year_ago_total.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="col-12 col-lg-4">
        <DataTable :value="list_four_year_ago" scrollable scrollHeight="500px">
          <template #header> {{ year - 4 }} Orders </template>
          <Column field="UlkeAdi" header="Country"></Column>
          <Column field="Fob" header="Fob">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.Fob) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(list_four_year_ago_total.fob) }}
            </template>
          </Column>
          <Column field="ddp" header="Ddp">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.ddp) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(list_four_year_ago_total.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="col-12 col-lg-4">
        <DataTable :value="list_five_year_ago" scrollable scrollHeight="500px">
          <template #header> {{ year - 5 }} Orders </template>
          <Column field="UlkeAdi" header="Country"></Column>
          <Column field="Fob" header="Fob">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.Fob) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(list_five_year_ago_total.fob) }}
            </template>
          </Column>
          <Column field="ddp" header="Ddp">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.ddp) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(list_five_year_ago_total.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
    return {
      year: null,
      list_this_year: [],
      list_one_year_ago: [],
      list_two_year_ago: [],
      list_three_year_ago: [],
      list_four_year_ago: [],
      list_five_year_ago: [],

      list_this_year_total: {
        fob: 0,
        ddp: 0,
      },
      list_one_year_ago_total: {
        fob: 0,
        ddp: 0,
      },
      list_two_year_ago_total: {
        fob: 0,
        ddp: 0,
      },
      list_three_year_ago_total: {
        fob: 0,
        ddp: 0,
      },
      list_four_year_ago_total: {
        fob: 0,
        ddp: 0,
      },
      list_five_year_ago_total: {
        fob: 0,
        ddp: 0,
      },
    };
  },
  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async is
   * BEKLENMEZ ve alti yillik liste BOS serialize edilir; hydration onu
   * devralir, created() bir daha calismadigi icin tablolar bos kalir
   * (bkz. commit 2afc877e3). mounted() sunucuda hic calismaz.
   */
  mounted() {
    this.year = new Date().getFullYear();
    useLegacyApi().get("/reports/ayo/country/order/list").then((res) => {
      this.list_this_year = res.data.list.filter((x) => x.Year === this.year);
      this.list_one_year_ago = res.data.list.filter((x) => x.Year === this.year - 1);
      this.list_two_year_ago = res.data.list.filter((x) => x.Year === this.year - 2);
      this.list_three_year_ago = res.data.list.filter((x) => x.Year === this.year - 3);
      this.list_four_year_ago = res.data.list.filter((x) => x.Year === this.year - 4);
      this.list_five_year_ago = res.data.list.filter((x) => x.Year === this.year - 5);

      this.list_this_year_total = {
        fob: 0,
        ddp: 0,
      };
      this.list_one_year_ago_total = {
        fob: 0,
        ddp: 0,
      };
      this.list_two_year_ago_total = {
        fob: 0,
        ddp: 0,
      };
      this.list_three_year_ago_total = {
        fob: 0,
        ddp: 0,
      };
      this.list_four_year_ago_total = {
        fob: 0,
        ddp: 0,
      };
      this.list_five_year_ago_total = {
        fob: 0,
        ddp: 0,
      };

      this.list_this_year.forEach((x) => {
        this.list_this_year_total.fob += x.Fob;
        this.list_this_year_total.ddp += x.ddp;
      });

      this.list_one_year_ago.forEach((x) => {
        this.list_one_year_ago_total.fob += x.Fob;
        this.list_one_year_ago_total.ddp += x.ddp;
      });
      this.list_two_year_ago.forEach((x) => {
        this.list_two_year_ago_total.fob += x.Fob;
        this.list_two_year_ago_total.ddp += x.ddp;
      });
      this.list_three_year_ago.forEach((x) => {
        this.list_three_year_ago_total.fob += x.Fob;
        this.list_three_year_ago_total.ddp += x.ddp;
      });
      this.list_four_year_ago.forEach((x) => {
        this.list_four_year_ago_total.fob += x.Fob;
        this.list_four_year_ago_total.ddp += x.ddp;
      });
      this.list_five_year_ago.forEach((x) => {
        this.list_five_year_ago_total.fob += x.Fob;
        this.list_five_year_ago_total.ddp += x.ddp;
      });
    });
  },
  methods: {
    async excel_output() {
      /*
       * DINAMIK IMPORT: xlsx paketi diskte 7.2 MB ve yalnizca bu
       * butona basildiginda gerekiyor. Statik import onu sayfayi
       * acan HERKESE indiriyordu. Pilotun geri kalani zaten boyle
       * yapiyor (order/ShippedList.vue, offer/Old.vue,
       * reports/mekmer/{by-buying-production,calculating-cost,
       * finance}.vue).
       */
      const XLSX = await import("xlsx");

      const sheets = [
        { year: this.year, list: this.list_this_year },
        { year: this.year - 1, list: this.list_one_year_ago },
        { year: this.year - 2, list: this.list_two_year_ago },
        { year: this.year - 3, list: this.list_three_year_ago },
        { year: this.year - 4, list: this.list_four_year_ago },
        { year: this.year - 5, list: this.list_five_year_ago },
      ];

      const workbook = XLSX.utils.book_new();

      sheets.forEach((sheet) => {
        const rows = sheet.list.map((x) => ({
          Country: x.UlkeAdi,
          Fob: x.Fob,
          Ddp: x.ddp,
        }));

        rows.push({
          Country: "Total",
          Fob: sheet.list.reduce((total, x) => total + x.Fob, 0),
          Ddp: sheet.list.reduce((total, x) => total + x.ddp, 0),
        });

        const worksheet = XLSX.utils.json_to_sheet(rows, {
          header: ["Country", "Fob", "Ddp"],
        });
        worksheet["!freeze"] = { xSplit: "0", ySplit: "1" };

        XLSX.utils.book_append_sheet(workbook, worksheet, String(sheet.year));
      });

      /*
       * XLSX.write + file-saver'in saveAs'i -> XLSX.writeFile.
       *
       * NEDEN: file-saver pilota KURULMADI (package.json'da yok) ve
       * import islemi derlemeyi dusuruyordu. XLSX.writeFile indirmeyi kendisi
       * tetikliyor, yani ek bir bagimlilik gerekmiyor; ayni yontem
       * reports/mekmer/calculating-cost.vue ve reports/mekmer/finance.vue
       * icinde de kullaniliyor. Cikan dosya ayni.
       */
      XLSX.writeFile(workbook, "ulke_bazinda_siparisler.xlsx");
    },
  },
};
</script>

<!--
  pages/reports/mekmar/country-order.vue

  Bagimliligi YOK: bu aile icinde tek basina duran, hicbir ozel bilesen
  veya store kullanmayan tek sayfa. Alti yili (bu yil ve 5 yil oncesi)
  tek istekten suzup ayri tablolara dagitiyor.

  ELLE:
  [x] this.$axios -> useLegacyApi()  (axios sozlesmesi, res.data korunur)
  [x] mapGetters(["getLocalUrl"]) KALDIRILDI -- sayfada HIC kullanilmiyordu;
      tek gecis yeri mapGetters satirinin kendisiydi.
  [x] created() -> mounted()

  TASIMA YOLU: elle yeniden yazilmadi; tools/codemods/vue2-to-vue3.mjs
  uygulandi, sonra codemod'un "ELLE YAPILACAK" diye listeledigi maddeler
  kapatildi. Kaynak: mark0002 deposunun codemod-vue3-prep dali (filtreler
  ve .sync orada zaten cevrilmisti).
-->
