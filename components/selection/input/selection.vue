<template>
  <div class="row">
    <div class="col-3">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Producer</th>
            <th scope="col">Month</th>
            <th scope="col">Year</th>
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
            <th>External Crates</th>
            <td>{{ productionTotal.disMonth | formatDecimal }}</td>
            <td>{{ productionTotal.disYear | formatDecimal }}</td>
          </tr>
          <tr>
            <th>Total</th>
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
      <Button type="button" class="p-button-success w-100" label="New" @click="newForm" />
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
        label="External Crates"
        @click="$emit('products_status_selected', 2)"
      />
      <Button
        type="button"
        class="p-button-warning w-100 mb-2"
        label="Ext. Crates in Mekmer"
        @click="$emit('products_status_selected', 3)"
      />
      <Button
        type="button"
        class="p-button-danger w-100"
        label="Not Found"
        @click="$emit('products_status_selected', 4)"
      />
    </div>
    <div class="col-3">
      <!-- <JsonExcel
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
      </JsonExcel> -->
      <!-- <Button
        type="button"
        class="p-button-info w-100"
        icon="pi pi-file-excel"
        label="Excel"
        @click="download"
      />
      <div>
        <vue-excel-editor v-model="getProductList" ref="download">
          <vue-excel-column field="KasaNo" label="Kasa No" type="string" width="80px" />
          <vue-excel-column
            field="OcakAdi"
            label="Ocak Adı"
            type="string"
            width="150px"
          />
          <vue-excel-column
            field="FirmaAdi"
            label="Firma Adı"
            type="string"
            width="150px"
          />
          <vue-excel-column
            field="KategoriAdi"
            label="Kategori Adı"
            type="string"
            width="150px"
          />
          <vue-excel-column field="UrunAdi" label="Ürün" type="string" width="150px" />
          <vue-excel-column
            field="YuzeyIslemAdi"
            label="Yüzey"
            type="string"
            width="150px"
          />
          <vue-excel-column field="En" label="En" type="string" width="150px" />
          <vue-excel-column field="Boy" label="Boy" type="string" width="150px" />
          <vue-excel-column field="Kenar" label="Kenar" type="string" width="150px" />
          <vue-excel-column
            field="KutuAdet"
            label="Kutu Adet"
            type="string"
            width="150px"
          />
          <vue-excel-column
            field="KutuIciAdet"
            label="Kutu İçi Adet"
            type="string"
            width="150px"
          />
          <vue-excel-column field="Adet" label="Adet" type="string" width="150px" />
          <vue-excel-column
            field="UrunBirimAdi"
            label="Birim"
            type="number"
            width="150px"
          />
          <vue-excel-column field="Miktar" label="Miktar" type="number" width="130px" />
          <vue-excel-column
            field="SiparisAciklama"
            label="Po"
            type="string"
            width="150px"
          />
          <vue-excel-column
            field="Aciklama"
            label="Açıklama"
            type="string"
            width="150px"
          />
        </vue-excel-editor>
      </div> -->
      <vue-excel-xlsx
        :data="getProductList"
        :columns="excelColumnsField"
        :file-name="'Seleksiyon'"
        :file-type="'xlsx'"
        :sheet-name="'sheetname'"
        style="border: none; background-color: white"
      >
        <Button
          type="button"
          class="p-button-info w-100"
          icon="pi pi-file-excel"
          label="Excel"
        />
      </vue-excel-xlsx>
      <br />

      <Dropdown
        class="mt-1"
        v-model="selectedEfeTicket"
        :options="efeTickets"
        optionLabel="name"
        placeholder="EFE Labels"
        @change="downloadEfeTicket($event)"
      />

      <a
        :href="ticketLink"
        download
        type="button"
        class="btn btn-secondary"
        v-if="!isEfeTicketForm"
        >Download</a
      >
    </div>
    <div class="col-3">
      <div class="row">
        <div class="col-6">
          <Dropdown
            v-model="selectedVeikBox"
            :options="etiketlerVeikKutu"
            optionLabel="urun"
            placeholder="VEIK Box Labels"
            class="w-100 mb-2"
            @change="isDropDownChange($event)"
          />
        </div>
        <div class="col-6">
          <Dropdown
            v-model="selectedVeikCrate"
            :options="etiketlerVeikKasa"
            optionLabel="urun"
            placeholder="Veik Crate Labels"
            class="w-100 mb-2"
            @change="isDropDownChange($event)"
          />
        </div>
      </div>
      <!-- <div class="row">
        <div class="col-6">
          <Dropdown v-model="selectedNovaBox" :options="etiketlerNovaKutu" optionLabel="urun" placeholder="Nova Box" class="w-100 mb-2" @change="isDropDownChange($event)" />

        </div>
        <div class="col-6">
          <Dropdown v-model="selectedNovaCrate" :options="etiketlerNovaKasa" optionLabel="urun" placeholder="Nova Crate" class="w-100 mb-2" @change="isDropDownChange($event)" />

        </div>
      </div> -->
      <div class="row">
        <div class="col">
          <a :href="boxCrateTicket" download type="button" class="btn btn-secondary w-100"
            >Download</a
          >
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
      boxCrateTicket: null,
      code: null,
      etiketlerVeikKutu: [
        {
          code: "SNS01",
          urun: "MINA RUSTIC KENARI KIRIK (SNS01)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SNS01.doc",
        },
        {
          code: "SNS02",
          urun: "MINA RUSTIC DÜZ KENAR (SNS02)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SNS02.doc",
        },
        {
          code: "SBR01",
          urun: "SILVER RUSTIC KENARI KIRIK (SBR01)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SBR01.doc",
        },
        {
          code: "SBR02",
          urun: "SILVER RUSTIC DÜZ KENAR (SBR02)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SBR02.doc",
        },
        {
          code: "SBY01",
          urun: "ELA KENARI KIRIK (SBY01)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SBY01.doc",
        },
        {
          code: "SBY02",
          urun: "ELA DÜZ KENAR (SBY02)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SBY02.doc",
        },
        {
          code: "SBS01",
          urun: "PICASSO KENARI KIRIK (SBS01)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SBS01.doc",
        },
        {
          code: "SBS02",
          urun: "PICASSO DÜZ KENAR (SBS02)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SBS02.doc",
        },
        {
          code: "ST-450",
          urun: "MINA RUSTIC DÜZ KENAR (ST-450)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/ST-450.doc",
        },
        {
          code: "ST-448",
          urun: "SILVER RUSTIC DÜZ KENAR (ST-448)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/ST-448-1.doc",
        },
        {
          code: "VKGD-SNS",
          urun: "CLASSIC VEIN CUT DÜZ KENAR (VKGD-SNS)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SNS01.doc",
        },
        {
          code: "VKCS-FM01",
          urun: "GOLD (VKCS-FM01)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SNS01.doc",
        },
        {
          code: "VKCS-FM02",
          urun: "SILVER (VKCS-FM02)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SNS01.doc",
        },
        {
          code: "STS01",
          urun: "IVORY RUSTİC (STS01)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SNS01.doc",
        },
      ],
      etiketlerNovaKutu: [
        { code: "FP-01", urun: "SCABOS KENARI KIRIK (FP-01)" },
        { code: "FP-02", urun: "PICASSO KENARI KIRIK (FP-02)" },
        { code: "FP-03", urun: "IVORY RUSTIC KENARI KIRIK (FP-03)" },
        { code: "FP-04", urun: "CLASSIC MINA KENARI KIRIK (FP-04)" },
        { code: "FP-05", urun: "GOLDEN INK KENARI KIRIK (FP-05)" },
        { code: "FP-06", urun: "BAOMIX KENARI KIRIK (FP-06)" },
        { code: "FP-07", urun: "MINA RUSTIC KENARI KIRIK (FP-07)" },
        { code: "FP-08", urun: "VANILLA BEIGE KENARI KIRIK (FP-08)" },
        { code: "FP-09", urun: "ELA KENARI KIRIK (FP-09)" },
        { code: "FP-10", urun: "SILVER RUSTIC KENARI KIRIK (FP-10)" },
      ],
      etiketlerVeikKasa: [
        {
          code: "SNS-01-K",
          urun: "MINA RUSTIC KENARI KIRIK (SNS01)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SNS-01-K.doc",
        },
        {
          code: "SNS-02-K",
          urun: "MINA RUSTIC DÜZ KENAR (SNS02)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SNS-02-K.doc",
        },
        {
          code: "SBR-01-K",
          urun: "SILVER RUSTIC KENARI KIRIK (SBR01)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SBR-01-K.doc",
        },
        {
          code: "SBR-02-K",
          urun: "SILVER RUSTIC DÜZ KENAR (SBR02)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SBR-02-K.doc",
        },
        {
          code: "SBY-01-K",
          urun: "ELA KENARI KIRIK (SBY01)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SBY-01-K.doc",
        },
        {
          code: "SBY-02-K",
          urun: "ELA DÜZ KENAR (SBY02)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SBY-02-K.doc",
        },
        {
          code: "SBS-01-K",
          urun: "PICASSO KENARI KIRIK (SBS01)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SBS-01-K.doc",
        },
        {
          code: "SBS-02-K",
          urun: "PICASSO DÜZ KENAR (SBS02)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SBS-02-K.doc",
        },
        {
          code: "ST-450-K",
          urun: "MINA RUSTIC DÜZ KENAR (ST-450)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/ST-450-K.doc",
        },
        {
          code: "ST-448-K",
          urun: "SILVER RUSTIC DÜZ KENAR (ST-448)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/ST-448-K.doc",
        },
        {
          code: "VKGD-SNS-K",
          urun: "CLASSIC VEIN CUT DÜZ KENAR (VKGD-SNS)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/VKGD-SNS-K.doc",
        },
        {
          code: "VKCS-FM01-K",
          urun: "GOLD (VKCS-FM01)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/VKCS-FM01-K.doc",
        },
        {
          code: "VKCS-FM02-K",
          urun: "SILVER (VKCS-FM02)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/VKCS-FM02-K.doc",
        },
        {
          code: "STS-01-K",
          urun: "IVORY RUSTIC (STS01)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/STS-01-K.doc",
        },
        {
          code: "SAS01",
          urun: "ELA MOSAIC (SAS01)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SAS01.doc",
        },
      ],
      etiketlerNovaKasa: [
        { code: "FP-01-K", urun: "SCABOS KENARI KIRIK (FP-01)" },
        { code: "FP-02-K", urun: "PICASSO KENARI KIRIK (FP-02)" },
        { code: "FP-03-K", urun: "IVORY RUSTIC KENARI KIRIK (FP-03)" },
        { code: "FP-04-K", urun: "CLASSIC MINA KENARI KIRIK (FP-04)" },
        { code: "FP-05-K", urun: "GOLDEN INK KENARI KIRIK (FP-05)" },
        { code: "FP-06-K", urun: "BAOMIX KENARI KIRIK (FP-06)" },
        { code: "FP-07-K", urun: "MINA RUSTIC KENARI KIRIK (FP-07)" },
        { code: "FP-08-K", urun: "VANILLA BEIGE KENARI KIRIK (FP-08)" },
        { code: "FP-09-K", urun: "ELA KENARI KIRIK (FP-09)" },
        { code: "FP-10-K", urun: "SILVER RUSTIC KENARI KIRIK (FP-10)" },
      ],
      selectedVeikBox: {},
      selectedVeikCrate: {},
      selectedNovaBox: {},
      selectedNovaCrate: {},
      selectedVeikBox: null,
      selectedVeikCrate: null,
      selectedNovaBox: null,
      selectedNovaCrate: null,
      isEfeTicketForm: true,
      ticketLink: null,
      selectedEfeTicket: null,
      efeTickets: [
        {
          name: "12x24",
          link: "https://trackit-dosyalama.fra1.digitaloceanspaces.com/efe%2012x24.docx",
        },
        {
          name: "16x16",
          link: "https://trackit-dosyalama.fra1.digitaloceanspaces.com/efe%2016x16.docx",
        },
        {
          name: "16x24",
          link: "https://trackit-dosyalama.fra1.digitaloceanspaces.com/efe%2016x24.docx",
        },
        {
          name: "18x18",
          link: "https://trackit-dosyalama.fra1.digitaloceanspaces.com/efe%2018x18.docx",
        },
        {
          name: "Pattern Set",
          link: "https://trackit-dosyalama.fra1.digitaloceanspaces.com/efe%20set.docx",
        },
      ],
      excelColumnsField: [
        {
          label: "Kasa No",
          field: "KasaNo",
        },
        {
          label: "Ocak Adı",
          field: "OcakAdi",
        },
        {
          label: "Firma Adı",
          field: "FirmaAdi",
        },
        {
          label: "Kategori",
          field: "KategoriAdi",
        },
        {
          label: "Urun",
          field: "UrunAdi",
        },
        {
          label: "Yuzey",
          field: "YuzeyIslemAdi",
        },
        {
          label: "En",
          field: "En",
        },
        {
          label: "Boy",
          field: "Boy",
        },
        {
          label: "Kenar",
          field: "Kenar",
        },
        {
          label: "Kutu Adet",
          field: "KutuAdet",
        },
        {
          label: "Kutu Ici Adet",
          field: "KutuIciAdet",
        },
        {
          label: "Adet",
          field: "Adet",
        },
        {
          label: "Ürün Birim",
          field: "UrunBirimAdi",
        },
        {
          label: "Miktar",
          field: "Miktar",
          dataFormat: this.formatDecimal,
        },
        {
          label: "Po",
          field: "SiparisAciklama",
        },
        {
          label: "Açıklama",
          field: "Aciklama",
        },
      ],
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
    isDropDownChange(event) {
      this.code = event.value.code;
      this.boxCrateTicket = event.value.link;
    },
    downloadPoTicket() {
      selectionService.getPoTicketDownload(this.code).then((data) => {
        const link = document.createElement("a");
        const folderName = "Etiket";
        link.href = data;
        link.setAttribute("download", `${folderName}.doc`);
        document.body.appendChild(link);
        link.click();
        this.code = "";
        this.selectedVeikBox = {};
        this.selectedVeikCrate = {};
        this.selectedNovaBox = {};
        this.selectedNovaCrate = {};
      });
    },
    downloadEfeTicket(event) {
      this.isEfeTicketForm = false;
      this.ticketLink = event.value.link;
    },
    download(event) {
      const format = "xlsx";
      const exportSelectedOnly = false;
      const filename = "test";
      this.$refs.download.exportTable(format, exportSelectedOnly, filename);
    },
    ticketDateSelect(event) {
      const date = new Date(event);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
    },
    newForm() {
      this.$store.dispatch("setSelectionProductionButtonStatus", true);
      this.$emit("selection_production_dialog", true);
    },
    formatDecimal(value) {
      const data = value.toString().replace(".", ",");
      return data;
    },
  },
};
</script>
