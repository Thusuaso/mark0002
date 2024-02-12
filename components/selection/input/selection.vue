<template>
  <div class="row">
    <div class="col-3">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Üretici</th>
            <th scope="col">Ay</th>
            <th scope="col">Yıl</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Mekmer</th>
            <td>{{ productionTotal.mekmerMonth | formatDecimal }}</td>
            <td>{{ productionTotal.mekmerYear | formatDecimal }}</td>
          </tr>
          <tr>
            <th>Mekmoz</th>
            <td>{{ productionTotal.mekmozMonth | formatDecimal }}</td>
            <td>{{ productionTotal.mekmozYear | formatDecimal }}</td>
          </tr>
          <tr>
            <th>Dış</th>
            <td>{{ productionTotal.disMonth | formatDecimal }}</td>
            <td>{{ productionTotal.disYear | formatDecimal }}</td>
          </tr>
          <tr>
            <th>Toplam</th>
            <td>
              <b
                >{{ productionTotal.monthTotal | formatDecimal }} ({{
                  (productionTotal.mekmerMonth + productionTotal.mekmozMonth)
                    | formatDecimal
                }})</b
              >
            </td>
            <td>
              <b>{{ productionTotal.yearTotal | formatDecimal }}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-1">
      <Button
        type="button"
        class="p-button-success w-100"
        label="Yeni"
        @click="newForm"
      />
    </div>
    <div class="col-2">
      <Button
        type="button"
        class="p-button-primary w-100 mb-2"
        label="Mekmer"
        @click="$emit('products_status_selected', 1)"
      />
      <Button
        type="button"
        class="p-button-secondary w-100 mb-2"
        label="Dış"
        @click="$emit('products_status_selected', 2)"
      />
      <Button
        type="button"
        class="p-button-warning w-100 mb-2"
        label="Mekmer Dış"
        @click="$emit('products_status_selected', 3)"
      />
      <Button
        type="button"
        class="p-button-danger w-100"
        label="Bulunamadı"
        @click="$emit('products_status_selected', 4)"
      />
    </div>
    <div class="col-3">
      <JsonExcel
        class="btn w-100"
        :data="getProductList"
        :fields="selectionListExcelFields"
        worksheet="Seleksiyon"
        name="seleksiyon.xls"
      >
        <Button
          type="button"
          class="p-button-info w-100"
          icon="pi pi-file-excel"
          label="Seleksiyon"
        />
      </JsonExcel>
      <br />

      <Dropdown
        v-model="selectedCity"
        :options="cities"
        optionLabel="name"
        placeholder="Select a City"
        class="w-full md:w-14rem"
      />
    </div>
    <div class="col-3">
      <div class="row">
        <div class="col-6">
          <Dropdown
            v-model="selectedCity"
            :options="cities"
            optionLabel="name"
            placeholder="Select a City"
          />
        </div>
        <div class="col-6">
          <Dropdown
            v-model="selectedCity"
            :options="cities"
            optionLabel="name"
            placeholder="Select a City"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <Dropdown
            v-model="selectedCity"
            :options="cities"
            optionLabel="name"
            placeholder="Select a City"
          />
        </div>
        <div class="col-6">
          <Dropdown
            v-model="selectedCity"
            :options="cities"
            optionLabel="name"
            placeholder="Select a City"
          />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <Button type="button" class="p-button-success" icon="pi pi-download" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getProductList"]),
  },
  props: {
    productionTotal: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      ticketDate: new Date(),
      selectedCity: null,
      cities: [],
      selectionListExcelFields: {
        "Kasa No": "KasaNo",
        "Ocak Adı": "OcakAdi",
        "Firma Adı": "FirmaAdi",
        Kategori: "KategoriAdi",
        Urun: "UrunAdi",
        Yuzey: "YuzeyIslemAdi",
        En: "En",
        Boy: "Boy",
        Kenar: "Kenar",
        "Kutu Adet": "KutuAdet",
        "Kutu Ici Adet": "KutuIciAdet",
        Adet: "Adet",
        "Ürün Birim": "UrunBirimAdi",
        Miktar: "Miktar",
        Po: "SiparisAciklama",
        Açıklama: "Aciklama",
      },

      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
    };
  },
  methods: {
    ticketDateSelect(event) {
      const date = new Date(event);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      console.log(year, month, day);
    },
    newForm() {
      this.$store.dispatch("setSelectionProductionButtonStatus", true);
      this.$emit("selection_production_dialog", true);
    },
  },
};
</script>
