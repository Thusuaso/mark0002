<template>
  <Dialog
    :visible="visible"
    header="Divide Order"
    modal
    :style="{ width: '80vw' }"
    @update:visible="$emit('update:visible', $event)"
  >
    <div v-if="loading" class="text-center p-4">Loading...</div>

    <div v-else-if="loadError" class="p-3 text-center text-danger">
      {{ loadError }}
    </div>

    <div v-else>
      <!-- Olusacak siparis numaralari -->
      <div class="row mb-4">
        <div class="col">
          <div class="p-3 border rounded">
            <div class="text-muted">Order being divided</div>
            <h4 class="m-0">{{ source.siparisNo }}</h4>
          </div>
        </div>
        <div class="col">
          <div class="p-3 border rounded">
            <div class="text-muted">Outgoing (shipping now)</div>
            <h4 class="m-0 text-success">{{ source.gidenPo }}</h4>
          </div>
        </div>
        <div class="col">
          <div class="p-3 border rounded">
            <div class="text-muted">Remainder (ships later)</div>
            <h4 class="m-0 text-primary">{{ source.kalanPo }}</h4>
          </div>
        </div>
      </div>

      <!-- Urunler -->
      <h3 class="text-center mb-3">Products</h3>
      <div class="row mb-2">
        <div class="col-auto">
          <Button
            type="button"
            class="p-button-sm p-button-outlined"
            label="All outgoing"
            @click="allTo('giden')"
          />
        </div>
        <div class="col-auto">
          <Button
            type="button"
            class="p-button-sm p-button-outlined"
            label="All remaining"
            @click="allTo('kalan')"
          />
        </div>
      </div>

      <div class="table-responsive mb-2">
        <table class="table table-sm align-middle">
          <thead>
            <tr>
              <th>Product</th>
              <th>Desc.</th>
              <th class="text-end">Unit</th>
              <th class="text-end">Amount</th>
              <th style="width: 150px">Outgoing</th>
              <th style="width: 150px">Remainder</th>
              <th style="width: 120px"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in rows"
              :key="row.id"
              :class="{ 'table-danger': !rowValid(row) }"
            >
              <td>{{ row.urun }}</td>
              <td>{{ row.musteriAciklama }}</td>
              <td class="text-end">{{ row.birim }}</td>
              <td class="text-end">{{ row.miktar | formatDecimal }}</td>
              <td>
                <CustomInput
                  :value="row.gonderilen"
                  text="Outgoing"
                  @onInput="setOutgoing(row, $event)"
                />
              </td>
              <td>
                <CustomInput
                  :value="row.kalan"
                  text="Remainder"
                  @onInput="setRemainder(row, $event)"
                />
              </td>
              <td>
                <Button
                  type="button"
                  class="p-button-sm p-button-text"
                  label="All out"
                  @click="setOutgoing(row, row.miktar)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="productProblems.length" class="alert alert-danger py-2">
        <div v-for="(problem, i) in productProblems" :key="i">{{ problem }}</div>
      </div>

      <hr />

      <!-- Tutarlar -->
      <h3 class="text-center mb-3">Amounts</h3>
      <div class="table-responsive">
        <table class="table table-sm align-middle">
          <thead>
            <tr>
              <th></th>
              <th class="text-end">Order</th>
              <th style="width: 180px">Outgoing</th>
              <th style="width: 180px">Remainder</th>
              <th class="text-end">Sum</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="field in source.amounts" :key="field.column">
              <td>{{ field.label }}</td>
              <td class="text-end">{{ field.original | formatDecimal }}</td>
              <td>
                <CustomInput
                  :value="amounts[field.giden]"
                  text="Outgoing"
                  @onInput="setAmount(field, 'giden', $event)"
                />
              </td>
              <td>
                <CustomInput
                  :value="amounts[field.kalan]"
                  text="Remainder"
                  @onInput="setAmount(field, 'kalan', $event)"
                />
              </td>
              <td class="text-end">
                {{ amountSum(field) | formatDecimal }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="row mt-4">
        <div class="col">
          <Button
            type="button"
            class="p-button-secondary w-100"
            label="Cancel"
            @click="$emit('update:visible', false)"
          />
        </div>
        <div class="col">
          <Button
            type="button"
            class="p-button-success w-100"
            :label="saving ? 'Dividing...' : 'Divide'"
            :disabled="saving || productProblems.length > 0"
            @click="submit"
          />
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
import Cookies from "js-cookie";

// Bolme ekrani. Hem production hem waiting sayfasi bunu kullanir; daha once
// ayni dialog ve ayni ~200 satir metot iki dosyada birebir kopyaliydi.
export default {
  props: {
    visible: { type: Boolean, default: false },
    // Bolunecek siparis. Sadece SiparisNo kullanilir; tutarlar ve urunler
    // sunucudan okunur, boylece ekranda eski/eksik deger kalmaz.
    order: { type: Object, default: () => ({}) },
  },

  data() {
    return {
      loading: false,
      saving: false,
      loadError: "",
      source: { siparisNo: "", gidenPo: "", kalanPo: "", amounts: [] },
      rows: [],
      amounts: {},
    };
  },

  computed: {
    productProblems() {
      const problems = [];
      this.rows.forEach((row) => {
        if (!this.rowValid(row)) {
          problems.push(
            `${row.urun}: outgoing + remainder must equal ${row.miktar}.`
          );
        }
      });
      return problems;
    },

    // Mal bedeli icin onerilen dagilim: urun satis toplamlari.
    goodsTotals() {
      let giden = 0;
      let kalan = 0;
      this.rows.forEach((row) => {
        giden += this.num(row.gonderilen) * this.num(row.satisFiyati);
        kalan += this.num(row.kalan) * this.num(row.satisFiyati);
      });
      return { giden, kalan };
    },
  },

  watch: {
    visible(open) {
      if (open) this.load();
    },
  },

  methods: {
    num(value) {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? 0 : parsed;
    },

    round(value) {
      return Math.round(this.num(value) * 100) / 100;
    },

    async load() {
      const po = this.order && this.order.SiparisNo;
      if (!po) {
        this.loadError = "Order number is missing.";
        return;
      }

      this.loading = true;
      this.loadError = "";
      this.rows = [];
      this.amounts = {};

      try {
        const response = await this.$axios.get(
          `/order/divide/source/${encodeURIComponent(po)}`
        );

        if (!response.data.status) {
          this.loadError = response.data.message || "Order could not be loaded.";
          return;
        }

        this.source = response.data;

        // Varsayilan: hepsi kaliyor. Kullanici sadece cikan miktari girer,
        // boylece listeye eklenmeyi unutulan urun diye bir sey olmuyor.
        this.rows = response.data.products.map((product) => ({
          ...product,
          gonderilen: 0,
          kalan: this.num(product.miktar),
        }));

        const amounts = {};
        response.data.amounts.forEach((field) => {
          amounts[field.giden] = 0;
          amounts[field.kalan] = this.num(field.original);
        });
        this.amounts = amounts;
      } catch (err) {
        this.loadError = "Order could not be loaded.";
      } finally {
        this.loading = false;
      }
    },

    rowValid(row) {
      const giden = this.num(row.gonderilen);
      const kalan = this.num(row.kalan);
      if (giden < 0 || kalan < 0) return false;
      return Math.abs(giden + kalan - this.num(row.miktar)) <= 0.01;
    },

    // Bir tarafi yazinca digeri otomatik tamamlanir; toplam her zaman
    // siparis miktarina esit kalir.
    setOutgoing(row, value) {
      const giden = Math.min(Math.max(this.num(value), 0), this.num(row.miktar));
      row.gonderilen = this.round(giden);
      row.kalan = this.round(this.num(row.miktar) - giden);
      this.syncGoodsValue();
    },

    setRemainder(row, value) {
      const kalan = Math.min(Math.max(this.num(value), 0), this.num(row.miktar));
      row.kalan = this.round(kalan);
      row.gonderilen = this.round(this.num(row.miktar) - kalan);
      this.syncGoodsValue();
    },

    allTo(part) {
      this.rows.forEach((row) => {
        if (part === "giden") this.setOutgoing(row, row.miktar);
        else this.setOutgoing(row, 0);
      });
    },

    amountSum(field) {
      return this.round(
        this.num(this.amounts[field.giden]) + this.num(this.amounts[field.kalan])
      );
    },

    setAmount(field, part, value) {
      const original = this.num(field.original);
      const entered = this.round(value);
      const other = part === "giden" ? field.kalan : field.giden;

      this.$set(this.amounts, part === "giden" ? field.giden : field.kalan, entered);
      // Karsi tarafi otomatik tamamla; kullanici isterse onu da elle degistirir.
      this.$set(this.amounts, other, this.round(original - entered));
    },

    // Urun dagilimi degistikce mal bedelini ayni oranda boler. Oran
    // kullanildigi icin iki parcanin toplami siparisteki tutara esit kalir.
    syncGoodsValue() {
      const field = this.source.amounts.find(
        (item) => item.column === "MalBedeli"
      );
      if (!field) return;

      const original = this.num(field.original);
      const totals = this.goodsTotals;
      const sum = totals.giden + totals.kalan;

      const giden = sum > 0 ? this.round((original * totals.giden) / sum) : 0;
      this.$set(this.amounts, field.giden, giden);
      this.$set(this.amounts, field.kalan, this.round(original - giden));
    },

    async submit() {
      if (this.productProblems.length > 0) return;

      this.saving = true;
      try {
        const payload = {
          order: {
            ...this.amounts,
            siparisno: this.source.siparisNo,
            kullaniciId: Cookies.get("userId"),
          },
          product: this.rows.map((row) => ({
            id: row.id,
            gonderilen: this.num(row.gonderilen),
            kalan: this.num(row.kalan),
          })),
        };

        const response = await this.$axios.post("/order/divide", payload);

        if (response.data.status) {
          this.$toast.success(
            `Divided: ${response.data.gidenPo} / ${response.data.kalanPo}`
          );
          this.$emit("update:visible", false);
          this.$emit("done", response.data);
          return;
        }

        const problems = response.data.problems || [];
        this.$toast.error(
          [response.data.message || "Order could not be divided."]
            .concat(problems)
            .join(" ")
        );
      } catch (err) {
        this.$toast.error("Order could not be divided.");
      } finally {
        this.saving = false;
      }
    },
  },
};
</script>
