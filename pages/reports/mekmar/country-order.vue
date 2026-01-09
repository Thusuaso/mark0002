<template>
  <div>
    <Button
      type="button"
      class="p-button-secondary"
      @click="excel_output"
      label="Excel"
    />

    <div class="row">
      <div class="col-4">
        <DataTable :value="list_this_year" scrollable scrollHeight="500px">
          <template #header> {{ year }} Orders </template>
          <Column field="UlkeAdi" header="Country"></Column>
          <Column field="Fob" header="Fob">
            <template #body="slotProps">
              {{ slotProps.data.Fob | formatPriceUsd }}
            </template>
            <template #footer>
              {{ list_this_year_total.fob | formatPriceUsd }}
            </template>
          </Column>
          <Column field="ddp" header="Ddp">
            <template #body="slotProps">
              {{ slotProps.data.ddp | formatPriceUsd }}
            </template>
            <template #footer>
              {{ list_this_year_total.ddp | formatPriceUsd }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="col-4">
        <DataTable :value="list_one_year_ago" scrollable scrollHeight="500px">
          <template #header> {{ year - 1 }} Orders </template>
          <Column field="UlkeAdi" header="Country"></Column>
          <Column field="Fob" header="Fob">
            <template #body="slotProps">
              {{ slotProps.data.Fob | formatPriceUsd }}
            </template>
            <template #footer>
              {{ list_one_year_ago_total.fob | formatPriceUsd }}
            </template>
          </Column>
          <Column field="ddp" header="Ddp">
            <template #body="slotProps">
              {{ slotProps.data.ddp | formatPriceUsd }}
            </template>
            <template #footer>
              {{ list_one_year_ago_total.ddp | formatPriceUsd }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="col-4">
        <DataTable :value="list_two_year_ago" scrollable scrollHeight="500px">
          <template #header> {{ year - 2 }} Orders </template>
          <Column field="UlkeAdi" header="Country"></Column>
          <Column field="Fob" header="Fob">
            <template #body="slotProps">
              {{ slotProps.data.Fob | formatPriceUsd }}
            </template>
            <template #footer>
              {{ list_two_year_ago_total.fob | formatPriceUsd }}
            </template>
          </Column>
          <Column field="ddp" header="Ddp">
            <template #body="slotProps">
              {{ slotProps.data.ddp | formatPriceUsd }}
            </template>
            <template #footer>
              {{ list_two_year_ago_total.ddp | formatPriceUsd }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <DataTable :value="list_three_year_ago" scrollable scrollHeight="500px">
          <template #header> {{ year - 3 }} Orders </template>
          <Column field="UlkeAdi" header="Country"></Column>
          <Column field="Fob" header="Fob">
            <template #body="slotProps">
              {{ slotProps.data.Fob | formatPriceUsd }}
            </template>
            <template #footer>
              {{ list_three_year_ago_total.fob | formatPriceUsd }}
            </template>
          </Column>
          <Column field="ddp" header="Ddp">
            <template #body="slotProps">
              {{ slotProps.data.ddp | formatPriceUsd }}
            </template>
            <template #footer>
              {{ list_three_year_ago_total.ddp | formatPriceUsd }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="col-4">
        <DataTable :value="list_four_year_ago" scrollable scrollHeight="500px">
          <template #header> {{ year - 4 }} Orders </template>
          <Column field="UlkeAdi" header="Country"></Column>
          <Column field="Fob" header="Fob">
            <template #body="slotProps">
              {{ slotProps.data.Fob | formatPriceUsd }}
            </template>
            <template #footer>
              {{ list_four_year_ago_total.fob | formatPriceUsd }}
            </template>
          </Column>
          <Column field="ddp" header="Ddp">
            <template #body="slotProps">
              {{ slotProps.data.ddp | formatPriceUsd }}
            </template>
            <template #footer>
              {{ list_four_year_ago_total.ddp | formatPriceUsd }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="col-4">
        <DataTable :value="list_five_year_ago" scrollable scrollHeight="500px">
          <template #header> {{ year - 5 }} Orders </template>
          <Column field="UlkeAdi" header="Country"></Column>
          <Column field="Fob" header="Fob">
            <template #body="slotProps">
              {{ slotProps.data.Fob | formatPriceUsd }}
            </template>
            <template #footer>
              {{ list_five_year_ago_total.fob | formatPriceUsd }}
            </template>
          </Column>
          <Column field="ddp" header="Ddp">
            <template #body="slotProps">
              {{ slotProps.data.ddp | formatPriceUsd }}
            </template>
            <template #footer>
              {{ list_five_year_ago_total.ddp | formatPriceUsd }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import api from "~/plugins/excel.server";
export default {
  computed: {
    ...mapGetters(["getLocalUrl"]),
  },
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
  created() {
    this.year = new Date().getFullYear();
    this.$axios.get("/reports/ayo/country/order/list").then((res) => {
      this.list_this_year = res.data.list.filter((x) => x.Year === 2026);
      this.list_one_year_ago = res.data.list.filter((x) => x.Year === 2025);
      this.list_two_year_ago = res.data.list.filter((x) => x.Year === 2024);
      this.list_three_year_ago = res.data.list.filter((x) => x.Year === 2023);
      this.list_four_year_ago = res.data.list.filter((x) => x.Year === 2022);
      this.list_five_year_ago = res.data.list.filter((x) => x.Year === 2021);

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
    excel_output() {
      const data = {
        this_year: this.list_this_year,
        one_year_ago: this.list_one_year_ago,
        two_year_ago: this.list_two_year_ago,
        three_year_ago: this.list_three_year_ago,
        four_year_ago: this.list_four_year_ago,
        five_year_ago: this.list_five_year_ago,
      };
      api.post("/maliyet/dosyalar/countries", data).then((response) => {
        if (response.status) {
          const link = document.createElement("a");
          link.href = this.getLocalUrl + "maliyet/dosyalar/countries";

          link.setAttribute("download", "ulke_bazinda_siparisler.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      });
    },
  },
};
</script>
