<template>
<div>
  <h3 class="insurance_custom_css">Sigorta bedelleri detay alanına eklenmiştir fakat yukarıdaki bedeli aşağıdaki sigorta bedelleri ve diğer bedellerle kontrol ederek işleminizi gerçekleştiriniz. Ayrıca ana sayfadaki bedel ile karşılaştırınız.</h3>
  <div class="row">
    <Button v-if="userId == 10" severity="warn" label="Excel" @click="excel_output_custom"/>

    <!--
      <vue-excel-xlsx> KARSILIGI: o bileşen Vue 2'ye bagli ve pilota
      kurulmadi. v-if/v-else ikilisi KORUNDU -- userId 10 icin ozel
      Excel cikisi, digerleri icin standart olan.
    -->
    <Button v-else type="button" severity="info" class="w-100" icon="pi pi-file-excel" label="Excel"
      @click="exportPoList" />

    <div class="col-9">
      <DataTable :value="poList" scrollable scrollHeight="600px" v-model:selection="selectedPoList" selectionMode="single"
        @row-click="$emit('po_list_selected_emit', $event)" :rowClass="rowClass" :loading="loading">
        <Column field="SiparisNo" header="Purchase Order" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.SiparisNo }}
          </template>
        </Column>
        <Column field="SiparisTarihi" header="Order Date" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ dateToString(slotProps.data.SiparisTarihi) }}
          </template>
        </Column>
        <Column field="YuklemeTarihi" header="Shipment Date" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ dateToString(slotProps.data.YuklemeTarihi) }}
          </template>
        </Column>
        <Column field="Durum" header="Status" headerClass="tableHeader" bodyClass="tableBody"></Column>
        <Column field="OrderTotal" header="Order Total USD" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.OrderTotal) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(poListTotal.order) }}
          </template>
        </Column>
        <Column field="Paid" header="Payment Received" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.Paid) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(poListTotal.paid) }}
          </template>
        </Column>
        <Column field="Balanced" header="Balance" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            <div :style="{
                backgroundColor: slotProps.data.Balanced > 8 ? 'green' : 'transparent',
                color: slotProps.data.Balanced > 8 ? 'white' : 'black',
              }">
              {{ formatPriceUsd(slotProps.data.Balanced) }}
            </div>
          </template>
          <template #footer>
            {{ formatPriceUsd(poListTotal.balanced) }}
          </template>
        </Column>
        <Column field="Pesinat" header="Prepayment" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.Pesinat) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(poListTotal.advancedPayment) }}
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col-3">
      <DataTable :value="paidList" scrollable scrollHeight="600px" v-model:selection="selectedPoPaidDetailList"
        selectionMode="single" @row-click="$emit('po_paid_detail_list_selected_emit', $event)" :loading="loading">
        <Column field="Tarih" header="Date">
          <template #body="slotProps">
            {{ dateToString(slotProps.data.Tarih) }}
          </template>
        </Column>

        <Column field="Paid" header="Paid">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.Paid) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(paidListTotal) }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <DataTable :value="insurance" responsiveLayout="scroll" v-model:filters="filters1" filterDisplay="row">
    <template #header>
      Insurance Cost
    </template>
    <Column field="SiparisNo" header="Po" :showFilterMenu="false" :showClearButton="false">
      <template #filter="{ filterModel, filterCallback }">
        <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
          style="width: 50px" />
      </template>
    </Column>
    <Column field="sigorta_tutar_satis" header="Insurance">
      <template #body="slotProps">
        {{ formatPriceUsd(slotProps.data.sigorta_tutar_satis) }}
      </template>
    </Column>

</DataTable>
</div>


</template>
<script>
/*
 * "primevue/api/" -> "@primevue/core/api"
 *
 * PrimeVue 4'te `primevue/api` alt paketi KALDIRILDI (node_modules'da
 * boyle bir klasor yok); eski yol Vite'ta "Failed to resolve import" ile
 * build'i dusuruyor.
 *
 * DIKKAT: buradaki yol SONDA EGIK CIZGILIYDI ('primevue/api/') ve
 * vue2-to-vue3 codemod'unun kurali bu yuzden ESLESMEDI -- codemod
 * "1x primevue/api -> @primevue/core/api" bile demedi. Codemod'un
 * kalibi sonradan egik cizgiyi de kabul edecek sekilde genisletildi.
 *
 * FilterOperator KALDIRILDI: import ediliyordu ama dosyada hic
 * kullanilmiyor (tek gecis yeri import satirinin kendisiydi).
 */
import { FilterMatchMode } from "@primevue/core/api";

export default {
  props: {
    insurance:{
      type:Array,
      required:true
    },
    poList: {
      type: Array,
      required: false,
    },
    paidList: {
      type: Array,
      required: false,
    },
    poListTotal: {
      type: Object,
      required: false,
    },
    paidListTotal: {
      type: Number,
      required: false,
    },
    loading: {
      type: Boolean,
      required:true
    }

  },
  data() {
    return {
      filters1:{
        SiparisNo:{value:null,matchMode:FilterMatchMode.STARTS_WITH}
      },
      filteredPoList:[],
      selectedPoList: null,
      selectedPoPaidDetailList: null,
      excelColumnsField: [
        {
          label: "Customer Name",
          field: "FirmaAdi",
        },
        {
          label: "Po",
          field: "SiparisNo",
        },
        {
          label: "Order Date",
          field: "SiparisTarihi",
          dataFormat: this.formatDecimalDate,
        },
        {
          label: "Shipped Date",
          field: "YuklemeTarihi",
          dataFormat: this.formatDecimalDate,
        },
        {
          label: "Order Total",
          field: "OrderTotal",
          dataFormat: this.formatDecimalUsd,

        },
        {
          label: "Advanced Payment",
          field: "Pesinat",
          dataFormat: this.formatDecimalUsd,

        },
        {
          label: "Paid",
          field: "Paid",
          dataFormat: this.formatDecimalUsd,

        },
        {
          label: "Balanced",
          field: "Balanced",
          dataFormat: this.formatDecimalUsd,
        },
      ],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
      userId:null,
    };
  },
  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async
   * is BEKLENMEZ ve liste BOS serialize edilir; hydration onu devralir,
   * created() bir daha calismadigi icin tablo bos kalir (bkz. commit
   * 2afc877e3). mounted() sunucuda hic calismaz.
   */
  mounted(){
    this.userId = useCookie('userId').value;
  },
  methods: {
    /*
     * <vue-excel-xlsx> KARSILIGI (o bileşen Vue 2'ye bagli, pilota
     * kurulmadi). Kolon tanimi ve dosya adi orijinalle ayni:
     * excelColumnsField ve "Finance Detail".
     *
     * !!! DIKKAT -- HAM DEGER YAZILIYOR, BILEREK !!!
     *
     * excelColumnsField girislerinin alti tanesinde
     *     dataFormat: this.formatDecimalDate / this.formatDecimalUsd
     * yaziyor. Ama bu tanim data() ICINDE ve data() calistigi anda
     * metotlar HENUZ BAGLANMAMISTIR -- yani `this.formatDecimalDate`
     * undefined olur. Nuxt 2'de de boyleydi: o alti kolon BICIMSIZ, ham
     * degerle disa aktariliyordu (tarihler ISO damgasi, tutarlar duz
     * sayi olarak).
     *
     * Davranis BIREBIR korundu ki eski ve yeni cikti karsilastirilabilsin.
     * Biçimlendirmenin gercekten uygulanmasi istenirse asagidaki satirda
     * `col.dataFormat` yerine kolonun adina gore this[...] cagrilmasi
     * yeterli -- ama bu, indirilen dosyanin GORUNUMUNU degistirir, yani
     * ayri bir karar.
     */
    exportPoList() {
      const rows = this.poList.filter((x) => x.Balanced > 0)
      const columns = this.excelColumnsField

      const aoa = [columns.map((c) => c.label)]
      for (const row of rows) {
        aoa.push(
          columns.map((c) => {
            const value = row[c.field]
            /* dataFormat undefined oldugu icin hic cagrilmaz -- yukaridaki not */
            return typeof c.dataFormat === "function"
              ? c.dataFormat(value)
              : (value ?? "")
          })
        )
      }

      import("xlsx").then((XLSX) => {
        const ws = XLSX.utils.aoa_to_sheet(aoa)
        ws["!cols"] = columns.map(() => ({ wch: 18 }))

        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, "sheetname")
        XLSX.writeFile(wb, "Finance Detail.xlsx")
      })
    },

    async excel_output_custom(){

      const data =  {
        'po':this.poList,
        'paid':this.paidList
      }

      /*
       * ARTIK EXCEL SUNUCUSUNDAN DEGIL, NITRO'DAN:
       *   eski: POST + GET {excelServerBase}/finance/mekmar/excel/custom
       *   yeni: POST /excel-api/finance/custom   (tek istek)
       *         server/routes/excel-api/finance/custom.post.ts
       *
       * Cikti uretimdekiyle KARSILASTIRILDI (iki sayfa da):
       * deger, sayi bicimi, hucre stili, genislik farki 0.
       *
       * [!] BU UCTA URETIMDE CANLI BIR HATA VAR ve tasima onu
       *     duzeltiyor: Python'daki _formatControl(None) Python 3'te
       *     TypeError firlatiyor, yani govdede BOS BIR SAYI (orn.
       *     Pesinat veya YuklemeTarihi null) oldugunda uc tamamen
       *     dusuyor. Olculdu:
       *       null'lu govde -> {"status": false}, GET 200 + 8714 bayt
       *                        (= SABLONUN AYNISI, yani BOS DOSYA)
       *       null'suz govde -> {"status": true},  GET 200 + 5697 bayt
       *     Istemci govdedeki status'u kontrol etmedigi icin kullanici
       *     bos sablonu "rapor" olarak indiriyordu. Nitro tarafinda
       *     bos degerler 0 / "" sayiliyor ve rapor uretiliyor.
       *
       * `if (response.status)` DUSTU -- HTTP durumunu (daima 200)
       * okuyordu, tam da yukaridaki sessiz basarisizligin sebebi.
       */
      try {
        await exportExcel(
          "/excel-api/finance/custom",
          data,
          "finance_detail_custom.xlsx",
        );
      } catch (err) {
        console.error("finans detay excel ciktisi basarisiz:", err);
        useAppToast().error("Excel olusturulamadi.");
      }
    },
    rowClass(event) {
      return event.MayaControl ? "red-row" : "";
    },
    formatDecimalUsd(value) {
      if (value == null || value == undefined) {
        return '$0';
      } else {
        const val = (value / 1).toFixed(2).replace(".", ",");
        return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
    },
    formatDecimalDate(value) {
      if (value == null || value == NaN - NaN - NaN || value == 'NaN-NaN-NaN' || value == undefined || value == "") {
        return "";
      } else {
        let date = new Date(value);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (month.toString().length == 1) {
          month = '0' + month;
        };
        if (day.toString().length == 1) {
          day = '0' + day;
        }

        return year + "-" + month + "-" + day;
      }
    }
  },


};
</script>
<style scoped>
:deep(.red-row) {
  border: 1px solid yellow !important;
  color: black !important;
}
.insurance_custom_css{
  font-size:16px;
  color:black;
  background-color: yellow;
  font-weight: bold;
  animation: insurance_animation 1s 0s infinite alternate-reverse;
}
@keyframes insurance_animation {
  from{
    color:blue;
  }
  to{
    color:red;
  }
}
</style>
