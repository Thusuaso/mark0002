<template>
  <div>
    <div v-if="!isRendering" class="text-center p-5">
      <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i> Tablo
      Yükleniyor...
    </div>
    <div v-if="isRendering">
      <DataTable
        :value="list"
        rowGroupMode="rowspan"
        :groupRowsBy="['YuklemeTarihi', 'SiparisNo', 'FirmaAdi', 'PI']"
        v-model:selection="selectedProduction"
        :selectionMode="satirSecimi"
        @row-click="$emit('production_selected_emit', $event.data)"
        class="p-datatable-sm table-dense"
        :paginator="true"
        :rows="25"
        style="font-size: 70%; border: 2px solid gray; cursor: pointer"
        filterDisplay="row"
        v-model:filters="filtersShipped"
        v-if="status == 'Shipped 2'"
        sortField="YuklemeTarihi"
        :sortOrder="-1"
        :rowClass="rowClass2"
        columnResizeMode="fit"
        showGridlines
        responsiveLayout="scroll"
      >
        <template #header>
          <div class="flex justify-content-between align-items-center">
            <!--
              YIL SECICI KALDIRILDI -- liste artik HER ZAMAN tum yillari
              tutuyor. Gerekcesi: secici tek yonluydu (showClear yok), bir
              kez dokununca uc `YEAR(s.YuklemeTarihi) = <yil>` ile yalnizca
              o yili cekiyordu ve UI'da "tum yillar"a donmenin yolu yoktu --
              sayfa yenilenmeden eski hale donulemiyordu. Kullanici yil
              secmek istemedigini soyledi; aramalar tam kumede calisiyor.
            -->
            <span style="font-size: 90%; opacity: 0.7">
              Filtrelemek için kolon kutusuna yazıp <strong>Enter</strong>'a basın
            </span>
            <Button
              severity="success" class="p-button-sm ml-2"
              icon="pi pi-file-excel"
              label="Excel'e Aktar"
              :loading="excelLoading"
              @click="excelOutput"
            />
          </div>
          Alış Fiyatı - {{ formatPriceUsd(totals) }}
          <span class="ml-3" style="font-size: 90%; opacity: 0.7">
            ({{ exportRows.length }} kayıt{{ isFiltered ? " - filtreli" : "" }})
          </span>
        </template>
        <Column header="#" headerStyle="width:3rem;font-size:16px;">
          <template #body="slotProps">
            {{ slotProps.index + 1 }}
          </template>
        </Column>
        <Column
          field="YuklemeTarihi"
          header="Load Date"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ dateToString(slotProps.data.YuklemeTarihi) }}
          </template>
          <template #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @keyup.enter="filterApply('loaddate', filterModel.value)"
              @input="filterSet('loaddate', filterModel.value)"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column
          field="FirmaAdi"
          header="Customer"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @keyup.enter="filterApply('company', filterModel.value)"
              @input="filterSet('company', filterModel.value)"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column
          field="SiparisNo"
          header="Po"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody po-anchor"
        >
          <template #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @keyup.enter="filterApply('po', filterModel.value)"
              @input="filterSet('po', filterModel.value)"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column
          field="PI"
          header="PI"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            <div v-if="slotProps.data.EvrakDurum > 0">
              <!--
                [x] <a ACILIS ETIKETI EKSIKTI -- Nuxt 2 kaynaginda da yoktu.
                Bu satir BOSTU, dolayisiyla :href ortada kaliyor ve
                </a> eslesmiyordu. Vue 2 derleyicisi bunu TOLERE ediyor
                (verify-templates.mjs 215 sablonun tamaminda 0 hata
                raporluyor), Vue 3 ise "Invalid end tag" ile derlemeyi
                KESIYOR. Yani PI indirme linki Nuxt 2'de de bozuktu.
                order/Table.vue'daki (list.vue) dogru hali esas alindi.
              -->
              <a
                href="#" @click.prevent="piDownload(slotProps.data.SiparisNo)"
              >
                <i class="pi pi-download" />
              </a>
            </div>
            <div v-else>
              <a>
                <i class="pi pi-download" />
              </a>
            </div>
          </template>
        </Column>
        <Column
          field="UrunAdi"
          header="Product"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @keyup.enter="filterApply('product', filterModel.value)"
              @input="filterSet('product', filterModel.value)"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column
          field="UrunUretimAciklama"
          header="Details"
          headerClass="tableHeader col-details"
          bodyClass="tableBody col-details"
        >
        </Column>
        <Column
          field="En"
          header="Width"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @keyup.enter="filterApply('width', filterModel.value)"
              @input="filterSet('width', filterModel.value)"
              class="p-column-filter"
            />
          </template>
        </Column>

        <Column
          field="Boy"
          header="Height"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @keyup.enter="filterApply('height', filterModel.value)"
              @input="filterSet('height', filterModel.value)"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column
          field="Kenar"
          header="Thickness"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @keyup.enter="filterApply('edge', filterModel.value)"
              @input="filterSet('edge', filterModel.value)"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column
          field="UrunFirmaAdi"
          header="Supplier"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @keyup.enter="filterApply('supplier', filterModel.value)"
              @input="filterSet('supplier', filterModel.value)"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column
          field="Miktar"
          header="Amount"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatDecimal(slotProps.data.Miktar) }}
          </template>
          <template #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @keyup.enter="filterApply('amount', filterModel.value)"
              @input="filterSet('amount', filterModel.value)"
              class="p-column-filter"
            />
          </template>
          <template #footer>
            {{ formatDecimal(totalamount) }}
          </template>
        </Column>
        <Column
          field="BirimAdi"
          header="Unit"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.BirimAdi }}
          </template>
        </Column>
        <Column
          field="Ton"
          header="Ton"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatDecimal(slotProps.data.Ton) }}
          </template>
          <template #footer>
            {{ formatDecimal(totalton) }}
          </template>
        </Column>
        <Column
          field="SatisFiyati"
          header="Price (Selling)"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.SatisFiyati) }}
          </template>
        </Column>
        <Column
          header="Total (Selling)"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd((slotProps.data.SatisFiyati * slotProps.data.Miktar)) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(totalsPurchase) }}
          </template>
        </Column>
        <Column
          field="AlisFiyati"
          header="Price (Puchase)"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.AlisFiyati) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(totalbuying) }}
          </template>
        </Column>
        <Column
          header="Total (Puchase)"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd((slotProps.data.AlisFiyati * slotProps.data.Miktar)) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(totals) }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script>
import { useOrderStore } from "~/stores/order"
import { FilterMatchMode } from "@primevue/core/api";

/*
 * COKLU SATIR SECIMI KAPALI OLAN KULLANICILAR.
 *
 * Bu kullanicilar yalnizca OKUYOR: secim coklu islem dugmelerine
 * acilan kapi, onlarda da o islemler yok. Nuxt 2'de liste tek kimlikti
 * (48); 56 ayni gorunumu gormeye baslayinca (bkz.
 * components/home/Dashboard.vue DAR_PANEL_IDS) buraya da eklendi.
 *
 * Cerez degeri string oldugu icin liste de string.
 */
const SECIM_KAPALI_IDS = ["48", "56"]
export default {
  /* PI indirme: cerez yerine kisa omurlu bilet kullaniyor
     (gerekcesi app/composables/usePiDownload.ts icinde). */
  setup() {
    return { piDownload: usePiDownload() }
  },

  props: {
    list: {
      type: Array,
      required: false,
    },
    status: {
      type: String,
      required: true,
    },
    total: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isRendering: true,
      excelLoading: false,
      /*
       * SUNUCUYA GIDEN filtre modeli -- PrimeVue'nun `filtersShipped`i ile
       * KARISTIRILMAMALI. filtersShipped artik yalnizca filtre SATIRINI
       * ciziyor (filterDisplay="row" bunu istiyor); icindeki matchMode
       * degerleri HICBIR SEY YAPMIYOR, cunku filterCallback() hic
       * cagrilmiyor ve DataTable suzmeyi `filters` PROP'undan okuyor --
       * prop ise hep bos kaliyor. Suzmeyi bu model + sunucu yapiyor.
       * Ayni ayrim order/Table.vue icinde de var.
       */
      filterModel: {
        loaddate: "",
        company: "",
        po: "",
        product: "",
        width: "",
        height: "",
        edge: "",
        supplier: "",
        amount: "",
      },
      totalbuying: 0,
      totalton: 0,
      totalamount: 0,
      userId: 0,
      totalsPurchase: 0,
      totals: 0,
      /*
       * [!] BU NESNE ARTIK SUZMUYOR -- yalnizca filtre SATIRINI ciziyor.
       *
       * filterDisplay="row" bir `filters` nesnesi istiyor, yoksa kolon
       * basliklarinin altindaki kutu satiri hic render edilmiyor. Ama
       * suzme SUNUCUDA yapiliyor (filterSet/filterApply -> filterModel ->
       * POST /order/shipped/mekmer2/list/filter), dolayisiyla asagidaki
       * matchMode degerlerinin HICBIR ETKISI YOK:
       *
       *   - DataTable suzmeyi `filters` PROP'undan okuyor (filter() icinde
       *     `getActiveFilters(this.filters)`),
       *   - prop ancak filterCallback() -> update:filters ile guncelleniyor,
       *   - ve filterCallback() bu dosyada HIC cagrilmiyor.
       *
       * Yani prop hep bos kaliyor ve istemci tarafi suzme devreye girmiyor.
       * Anahtarlar yine de DURMALI: PrimeVue filtre kutusunu ancak
       * `filters[field]` varsa ciziyor. Ayni ayrim order/Table.vue'nun
       * 'Shipped' tablolarinda da var.
       *
       * Gercek esleme kipi SQL'de: LIKE '%deger%' (icinde gecen).
       */
      filtersShipped: {
        YuklemeTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FirmaAdi: { value: null, matchMode: FilterMatchMode.CONTAINS },
        SiparisNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
        UrunAdi: { value: null, matchMode: FilterMatchMode.CONTAINS },
        En: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunFirmaAdi: { value: null, matchMode: FilterMatchMode.CONTAINS },
        Miktar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      globalSearch: null,
      selectedProduction: null,
      filtersOrders: {
        SiparisTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        YuklemeTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FirmaAdi: { value: null, matchMode: FilterMatchMode.CONTAINS },
        SiparisNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
        UrunAdi: { value: null, matchMode: FilterMatchMode.CONTAINS },
        En: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunFirmaAdi: { value: null, matchMode: FilterMatchMode.CONTAINS },
        Miktar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  computed: {
    orderStore() {
      return useOrderStore()
    },
    isFiltered() {
      return !this.isFilterEmpty();
    },
    /*
     * Excel ve kayit sayaci icin satirlar.
     *
     * Artik DOGRUDAN `list`: suzme sunucuda yapildigi icin store'daki
     * liste ZATEN suzulmus sonuc. Eskiden burada `filteredList` vardi --
     * PrimeVue'nun @filter olayindan gelen istemci tarafi sonuc; o yol
     * tamamen kalkti.
     */
    exportRows() {
      return this.list || [];
    },

    /*
     * DataTable'in selectionMode'u: bos string secimi KAPATIR.
     * Eskiden sablonda `userId != 48 ? 'multiple' : ''` duruyordu;
     * liste iki kimlige cikinca buraya tasindi.
     */
    satirSecimi() {
      return SECIM_KAPALI_IDS.includes(String(this.userId)) ? "" : "multiple";
    },
  },
  watch: {
    /*
     * Toplamlar listeyle birlikte yenilenir.
     *
     * Eskiden bunu DataTable'in @filter olayi yapiyordu; o olay kalktigi
     * icin tek tetikleyici burasi. created() ilk degeri hesapliyor, ama
     * veri CLIENT'ta geldigi icin (useAsyncData server:false) created
     * aninda liste genelde BOS -- yani bu izleyici olmadan baslik
     * "Alis Fiyati - $0.00" olarak kalirdi.
     */
    list(val) {
      this.__totalSum(val);
    },
  },
  created() {
    this.__totalSum(this.list);
    this.userId = useCookie("userId").value;
  },
  methods: {
    /*
     * SUZME SUNUCUDA, ENTER'DA -- orders/shipped ile AYNI KALIP.
     *
     * NEDEN: bu sayfa butun yuklenmis siparisleri urun satiri bazinda
     * tarayiciya indirip suzmeyi PrimeVue ile ISTEMCIDE yapiyordu ve
     * Firefox'ta filtre kutusuna yazilinca sekme kilitleniyordu. Enter'a
     * baglamak YETMEDI -- tek bir suzme gecisi bile donduruyordu. Yani
     * sorun "tus basina tekrarlanan is" degil, tarayicinin o kadar veriyi
     * tutup her seferinde bastan filtreleyip siralayip yeniden render
     * etmesi. orders/shipped ayni isi yillardir sorunsuz yapiyor, cunku
     * suzmeyi SUNUCUYA birakiyor; bu dosya artik ayni yolu kullaniyor.
     *
     * Sunucuya giden uc: POST /order/shipped/mekmer2/list/filter
     * (store: filterShipmentMekmer2). Kosullari mekmer2 LISTE ucuyla
     * birebir ayni, yani sonuc her zaman o listenin alt kumesi.
     *
     * PrimeVue'nun kendi suzmesi artik DEVRE DISI: filterCallback() hic
     * cagrilmiyor, dolayisiyla `update:filters` yayilmiyor ve DataTable'in
     * okudugu `filters` PROP'u hep bos kaliyor. Kutuya yazilan metin
     * gorunur (v-model DataTable'in IC kopyasina yaziyor) ama tablo
     * istemcide SUZULMUYOR -- suzmeyi sunucu yapiyor.
     */

    /* Her tus vurusunda YALNIZCA yerel modeli gunceller, istek YOK. */
    filterSet(field, value) {
      this.filterModel[field] = value == null ? "" : value;
    },

    /*
     * Enter -> sunucuya git.
     *
     * Tum kutular bossa suzulmus liste yerine TAM listeyi geri cekiyor;
     * yoksa kullanici metni silip Enter'a bastiginda ekranda son suzme
     * sonucu kalir ve tam listeye donmenin yolu olmazdi.
     */
    filterApply(field, value) {
      this.filterSet(field, value);

      if (this.isFilterEmpty()) {
        this.orderStore.setOrderShippedMekmer2List();
      } else {
        this.orderStore.filterShipmentMekmer2(this.filterModel);
      }
    },

    isFilterEmpty() {
      return Object.values(this.filterModel).every((v) => v === "");
    },
    /* ---------------- EXCEL ---------------- */
    async excelOutput() {
      const rows = this.exportRows;
      if (!rows.length) {
        useAppToast().warn("Aktarılacak kayıt bulunamadı.");
        return;
      }

      this.excelLoading = true;
      try {
        const XLSX = await import("xlsx");

        const USD = '"$"#,##0.00';
        const DEC = "#,##0.00";
        const DATE = "dd.mm.yyyy";

        const headers = [
          "#",
          "Load Date",
          "Customer",
          "PO",
          "PI",
          "Product",
          "Details",
          "Width",
          "Height",
          "Thickness",
          "Supplier",
          "Amount",
          "Unit",
          "Ton",
          "Price (Selling)",
          "Total (Selling)",
          "Price (Purchase)",
          "Total (Purchase)",
        ];

        const aoa = [headers];
        const links = []; // { r, c, target }

        let tAmount = 0,
          tTon = 0,
          tSelling = 0,
          tPurchase = 0;

        // Ekrandaki sıralamayla aynı: YuklemeTarihi DESC
        const sorted = [...rows].sort(
          (a, b) =>
            this.__toDate(b.YuklemeTarihi) - this.__toDate(a.YuklemeTarihi)
        );

        sorted.forEach((x, i) => {
          const miktar = this.__num(x.Miktar);
          const ton = this.__num(x.Ton);
          const satis = this.__num(x.SatisFiyati);
          const alis = this.__num(x.AlisFiyati);

          tAmount += miktar;
          tTon += ton;
          tSelling += satis * miktar;
          tPurchase += alis * miktar;

          const d = this.__toDate(x.YuklemeTarihi);

          aoa.push([
            i + 1,
            d ? d : this.__str(x.YuklemeTarihi),
            this.__str(x.FirmaAdi),
            this.__str(x.SiparisNo),
            x.EvrakDurum > 0 ? "PI İndir" : "-",
            this.__str(x.UrunAdi),
            this.__str(x.UrunUretimAciklama),
            this.__str(x.En),
            this.__str(x.Boy),
            this.__str(x.Kenar),
            this.__str(x.UrunFirmaAdi),
            miktar,
            this.__str(x.BirimAdi),
            ton,
            satis,
            satis * miktar,
            alis,
            alis * miktar,
          ]);

          if (x.EvrakDurum > 0 && x.SiparisNo) {
            /*
             * EXCEL ICINDEKI BAGLANTI -- ekrandaki PI dugmesinden FARKLI
             * olmak ZORUNDA, bilerek dosya servisine dogrudan gidiyor:
             *
             *  - Gomulu baglantiya tiklayan Excel'dir, tarayici degil;
             *    GORELI bir adres ("/api/...") orada hicbir yere gitmez,
             *    mutlak olmali.
             *  - Kisa omurlu bilet de ise yaramaz: indirilen tablo gunler
             *    sonra aciliyor, bilet 120 saniyede oluyor.
             *
             * Yani buradaki adres ekrandaki ile ayni olamaz.
             */
            links.push({
              r: aoa.length - 1,
              c: 4,
              target:
                "https://file-service.mekmar.com/file/download/2/" +
                x.SiparisNo,
            });
          }
        });

        const lastDataRow = aoa.length; // 1-indexed (header dahil)

        aoa.push([]);
        const totalRow = new Array(headers.length).fill("");
        totalRow[0] = "TOPLAM";
        totalRow[11] = tAmount;
        totalRow[13] = tTon;
        totalRow[15] = tSelling;
        totalRow[17] = tPurchase;
        aoa.push(totalRow);

        const ws = XLSX.utils.aoa_to_sheet(aoa, { cellDates: true });

        ws["!cols"] = [
          { wch: 5 },  { wch: 12 }, { wch: 26 }, { wch: 14 }, { wch: 10 },
          { wch: 30 }, { wch: 26 }, { wch: 10 }, { wch: 10 }, { wch: 11 },
          { wch: 24 }, { wch: 12 }, { wch: 8 },  { wch: 10 }, { wch: 14 },
          { wch: 16 }, { wch: 14 }, { wch: 16 },
        ];
        ws["!freeze"] = { xSplit: 0, ySplit: 1 };
        ws["!autofilter"] = { ref: `A1:R${lastDataRow}` };

        // Hücre formatları
        const fmt = {
          1: DATE,
          11: DEC,
          13: DEC,
          14: USD,
          15: USD,
          16: USD,
          17: USD,
        };
        const range = XLSX.utils.decode_range(ws["!ref"]);
        for (let R = 1; R <= range.e.r; R++) {
          Object.entries(fmt).forEach(([C, z]) => {
            const cell = ws[XLSX.utils.encode_cell({ r: R, c: Number(C) })];
            if (cell && (cell.t === "n" || cell.t === "d")) cell.z = z;
          });
        }

        // PI hyperlink'leri
        links.forEach((l) => {
          const addr = XLSX.utils.encode_cell({ r: l.r, c: l.c });
          if (ws[addr]) ws[addr].l = { Target: l.target, Tooltip: "PI İndir" };
        });

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Shipped");

        /*
         * Dosya adindan YIL cikarildi: yil secici kaldirildi ve liste
         * artik tum yillari tutuyor, yani "shipped_2026.xlsx" YANILTICI
         * olurdu -- icinde 2026 disi kayitlar da var.
         */
        const suffix = this.isFiltered ? "_filtreli" : "";
        XLSX.writeFile(wb, `shipped${suffix}.xlsx`);

        useAppToast().success(`${sorted.length} kayıt Excel'e aktarıldı.`);
      } catch (e) {
        console.error("excelOutput", e);
        useAppToast().error("Excel oluşturulurken hata oluştu.");
      } finally {
        this.excelLoading = false;
      }
    },
    __num(val) {
      if (val === null || val === undefined || val === "") return 0;
      if (typeof val === "number") return isFinite(val) ? val : 0;
      const n = parseFloat(String(val).replace(/\s/g, "").replace(",", "."));
      return isNaN(n) || !isFinite(n) ? 0 : n;
    },
    __str(val) {
      return val === null || val === undefined ? "" : String(val);
    },
    __toDate(val) {
      if (!val) return null;
      if (val instanceof Date) return isNaN(val.getTime()) ? null : val;
      if (typeof val === "string") {
        // 12.05.2026
        const tr = val.match(/^(\d{2})\.(\d{2})\.(\d{4})/);
        if (tr) return new Date(+tr[3], +tr[2] - 1, +tr[1]);
        // 2026-05-12...
        const iso = val.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (iso) return new Date(+iso[1], +iso[2] - 1, +iso[3]);
      }
      const d = new Date(val);
      return isNaN(d.getTime()) ? null : d;
    },
    /* --------------- /EXCEL ---------------- */

    /*
     * KALDIRILDI: shippedFiltered(event)
     *
     * Iki kere olu:
     *   1) Hicbir yerden cagrilmiyor (sablonda da yok).
     *   2) Cagrilsa da ise yaramazdi -- dispatch ettigi ad
     *        " shipped setOrderProductionTotal"
     *      yani BASINDA BOSLUK ve fazladan kelimeler var. store/modules
     *      altinda boyle bir action YOK; Vuex bunu "unknown action type"
     *      diye konsola yazip hicbir sey yapmazdi.
     * Bu yuzden map-store-refs.mjs de adi cozemedi ve `$store.dispatch`
     * olarak biraktı -- iyi oldu, aksi halde sessizce gecip giderdi.
     */
    /*
     * KALDIRILDI: filtersProduction(event)  (DataTable @filter dinleyicisi)
     *
     * PrimeVue'nun istemci tarafi suzme sonucunu alip `filteredList`e
     * yaziyor ve toplamlari oradan hesapliyordu. Suzme sunucuya tasindigi
     * icin o olay artik dinlenmiyor; store'daki liste ZATEN suzulmus
     * sonuc, toplamlari da `list` izleyicisi hesapliyor.
     *
     * Birlikte giden kirilganlik: o metot bir COMPUTED degerlendirmesi
     * SIRASINDA (DataTable'in processedData'si icinden) reaktif alanlara
     * yaziyordu -- "Maximum recursive updates exceeded" uyarisinin
     * kaynagi buydu ve icerik karsilastirmasiyla bastirilmasi
     * gerekiyordu. O yol tamamen kalktigi icin bastirmaya da gerek yok.
     */
    /*
     * TOPLAMA YEREL DEGISKENLERDE, REAKTIF ALANLARA TEK SEFERDE YAZILIR.
     *
     * TARIHCE -- bu bicim bir SONSUZ RENDER DONGUSUNU kirmak icindi:
     *     Maximum recursive updates exceeded in component <DataTable>
     * Dongu sudur: DataTable @filter yayar -> filtersProduction() ->
     * __totalSum() bu bilesenin REAKTIF alanlarina yazar (totals,
     * totalsPurchase, totalamount, totalton, totalbuying) -> o alanlar
     * DataTable'in kendi baslik/altlik sablonunda okunuyor -> DataTable
     * yeniden render edilir -> basa don. Eski kod her cagride
     * `this.totals = 0` yaptigi icin degerler oturmus olsa bile her tur
     * "degisti" sinyali uretiyordu.
     *
     * O TETIKLEYICI ARTIK YOK: suzme sunucuya tasindi, @filter dinlenmiyor
     * ve __totalSum yalnizca created() ile `list` izleyicisinden
     * cagriliyor -- yani bir computed degerlendirmesi sirasinda DEGIL.
     * Buna ragmen bicim KORUNUYOR: yerel degiskende toplayip sonunda tek
     * kez atamak, ayni degerler yeniden hesaplandiginda Vue'ya gereksiz
     * render yaptirmiyor (`+=` ise satir basina 5 x N reaktif yazma
     * demekti). Ayni duzeltme store tarafinda da var
     * (app/stores/order.ts MUT_setOrderProductionTotal).
     *
     * Toplama ifadeleri ve SIRASI birebir korundu, yani kayan nokta
     * sonucu degismiyor.
     */
    __totalSum(val) {
      let totals = 0;
      let totalsPurchase = 0;
      let totalamount = 0;
      let totalton = 0;
      let totalbuying = 0;

      (val || []).forEach((x) => {
        totals += this.__noneControl(x.AlisFiyati) * this.__noneControl(x.Miktar);
        totalsPurchase +=
          this.__noneControl(x.SatisFiyati) * this.__noneControl(x.Miktar);
        totalamount += this.__noneControl(x.Miktar);
        totalton += this.__noneControl(x.Ton);
        totalbuying += this.__noneControl(x.AlisFiyati);
      });

      this.totals = totals;
      this.totalsPurchase = totalsPurchase;
      this.totalamount = totalamount;
      this.totalton = totalton;
      this.totalbuying = totalbuying;
    },
    __noneControl(val) {
      if (val == null || val == undefined || val == "") {
        return 0;
      } else {
        return val;
      }
    },
    ordersFilter(event) {
      this.orderStore.setOrderProductionTotal(event.filteredValue);
    },
    /*
     * [!] BURADA useCookie CAGIRILMAZ -- rowClass HER SATIR icin
     * calisiyor ve Nuxt'un useCookie'si her cagride kapanmayan bir
     * BroadcastChannel + kalici watcher birakiyor (render sirasinda
     * aktif scope olmadigi icin temizlenmiyor). Gerekcesinin tamami
     * order/Table.vue'daki `userId` alaninin ustunde. Deger
     * created() icinde bir kez okunuyor.
     */
    rowClass2(event) {
      const userId = this.userId;
      if (event.SiparisSahibi == userId || event.Operasyon == userId)
        return "row-accessories";
      else return "row-accessories-border";
    },
    globalSearchFilterInput(event) {
      if (!event) {
        this.orderStore.setOrderShippedList();
      }
    },
    globalSearchFilter(event) {
      if (event.target._value) {
        this.orderStore.setFilterShipmentGlobal(event.target._value);
      } else {
        this.orderStore.setOrderShippedList();
      }
    },
    /*
     * KALDIRILDI: 19 filtre metodu + __controlFilter + filterModel data'si
     *
     * filterShipment<Alan>Input / filterShipment<Alan> (9+9) ve
     * __controlFilter, list.vue'dan KOPYALANMIS ama bu dosyada HIC
     * BAGLANMAMISTI: sablon bu metotlarin hicbirini cagirmiyor
     * (Nuxt 2 kaynaginda da 0 eslesme).
     *
     * Ilk hamlede bunlari list.vue'da yaptigim gibi filterSet /
     * filterApply / isFilterEmpty'ye indirmistim -- ama o da yine olu
     * kod olurdu, sadece daha azi. Tamami kaldirildi.
     *
     * SONRADAN GERI GELDI: suzme sunucuya tasinirken filterSet /
     * filterApply / isFilterEmpty ve `filterModel` data alani YENIDEN
     * yazildi -- bu kez sablona BAGLI ve canli (bkz. filterSet'in
     * ustundeki not). Yani asagidaki "filterModel gitti" cumlesi yalnizca
     * o ara donem icin gecerliydi.
     *
     * DIKKAT -- sablondaki `filterModel` AYNI SEY DEGIL:
     *     <template #filter="{ filterModel }">
     * orada PrimeVue'nun Column'a verdigi SLOT PROP'u destructure
     * ediliyor ve component data'sini golgeliyor. Bu yuzden data alani
     * kullanilmiyor gorunmesine ragmen sablon calismaya devam ediyor.
     */

    /*
     * KALDIRILDI: productSupplier(event) ve productSupplierNull(event)
     *
     * Ikisi de document.getElementById("productSupplier" + UrunId) ile
     * bir ogeyi bulup innerHTML'ini degistiriyordu. Ne bu dosyanin
     * sablonunda boyle bir id var (0 eslesme), ne de metotlar hicbir
     * yerden cagriliyor -- cagrilsalardi getElementById null donecegi
     * icin "Cannot set properties of null" ile patlarlardi.
     * Ayni olu cift components/orders/lists/list.vue (-> order/Table.vue)
     * ve components/orders/lists/shipped.vue dosyalarinda da var.
     */
  },
};
</script>
<style scoped>
.colorChange {
  background-color: yellow;
}

:deep(.row-accessories) {
  border: 2px solid #414241 !important;
  background-color: #ccede2 !important;
}
:deep(.row-accessories-border) {
  border: 2px solid #313131 !important;
}
</style>
<!--
  components/orders/lists/shipped.vue -> app/components/order/ShippedList.vue

  DOSYA YOLU: Nuxt 2'de `orderShippedList` adiyla global kayitli;
  order/ShippedList.vue bunu uretiyor. (PrimeVue'da `OrderShippedList`
  diye bir bilesen yok -- check-name-collisions.mjs ile dogrulandi.)

  Mekanik donusumler:
  [1] 1x  import ... "primevue/api" -> "@primevue/core/api"
  [2] 2x  :x + @update:x -> v-model:x
  [3] 1x  <Calendar> -> <DatePicker>  (SONRADAN KALDIRILDI -- yil
          secici artik yok, gerekcesi #header slotundaki notta)
  [4] 1x  p-button-* -> severity
  [5] 7x  dispatch -> Pinia action
  [6] store computed'i EKLENDI (mapGetters yoktu, yalnizca dispatch vardi)

  ELLE:
  [7] 2x Cookies.get -> useCookie
      SONRADAN: rowClass2'deki cagri KALDIRILDI -- rowClass her satir
      icin calisiyor ve useCookie her cagride kapanmayan bir
      BroadcastChannel birakiyordu (Firefox'ta sekme kilitleniyordu).
      Cerez artik created() icinde bir kez okunuyor.
  [8] this.$toast -> useAppToast()
      `.warning(...)` -> `.warn(...)`: PrimeVue 4'te seviye adi "warn".
      Ayrica `this.$toast && this.$toast.x(...)` savunma kontrolleri
      kaldirildi -- useAppToast() her zaman bir nesne donuyor.

  KALDIRILAN OLU KOD (ayrintilar yerlerinde):
  [9]  19 filtre metodu + __controlFilter + `filterModel` data alani.
       list.vue'dan KOPYALANMIS ama bu dosyada HIC BAGLANMAMIS -- sablon
       hicbirini cagirmiyor (Nuxt 2 kaynaginda da 0 eslesme). Ilk hamlede
       list.vue'da yaptigim gibi 3 metoda indirmistim; fark ettim ki o da
       olu kod olurdu, tamami kaldirildi.
       DIKKAT: sablondaki `filterModel` AYNI SEY DEGIL -- PrimeVue'nun
       Column slot prop'u, component data'sini golgeliyor.
  [10] shippedFiltered(event). Iki kere olu: hic cagrilmiyor VE dispatch
       ettigi ad " shipped setOrderProductionTotal" -- basinda bosluk ve
       fazladan kelimeler, store'da boyle bir action yok. Vuex "unknown
       action type" yazip hicbir sey yapmazdi.
  [11] productSupplier() / productSupplierNull(). Ucuncu dosyada da ayni
       olu cift (order/Table.vue ve Table2.vue'dan da kaldirildi).
-->
