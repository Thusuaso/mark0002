<template>
  <div>
    <div class="row">
      <div class="col">
        <FloatLabel class="w-full md:w-14rem">
          <Select
            v-model="selectedSupplier"
            inputId="supplier"
            :options="productSupplier"
            optionLabel="FirmaAdi"
            class="w-100"
            @change="supplierSelected($event)"
          />
          <label for="supplier">Supplier</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel class="w-full md:w-14rem">
          <Select
            v-model="selectedInvoice"
            inputId="invoice"
            :options="invoice"
            optionLabel="FaturaAdi"
            class="w-100"
          />
          <label for="invoice">Kind of Invoice</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel class="w-full md:w-14rem">
          <Select
            v-model="selectedDelivery"
            inputId="delivery"
            :options="supplierDelivery"
            optionLabel="TeslimAdi"
            class="w-100"
          />
          <label for="delivery">Kind of Delivery</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <DatePicker v-model="supplier_date" inputId="date" dateFormat="dd/mm/yy" />
          <label for="date">Date</label>
        </FloatLabel>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col">
        <FloatLabel>
          <Textarea id="m4" v-model="m4" rows="5" class="w-100" />
          <label for="m4">M4</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <Textarea id="m5" v-model="m5" rows="5" class="w-100" />
          <label for="m5">M5</label>
        </FloatLabel>
      </div>
    </div>

    <DataTable :value="supplierProduct">
      <Column field="UrunAdi" header="Product" />
      <Column field="YuzeyIslemAdi" header="Surface" />
      <Column field="En" header="Width" />
      <Column field="Boy" header="Height" />
      <Column field="Kenar" header="Thickness" />
      <Column field="UrunBirimAdi" header="Unit" />
      <Column field="Miktar" header="Amount">
        <template #body="slotProps">
          {{ formatDecimal4(slotProps.data.Miktar) }}
        </template>
        <template #footer>
          {{ formatDecimal4(total.amount) }}
        </template>
      </Column>
      <Column field="AlisFiyati" header="Buying Price">
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.AlisFiyati) }}
        </template>
      </Column>
      <Column header="Buying Total">
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.AlisFiyati * slotProps.data.Miktar) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(total.sum) }}
        </template>
      </Column>
    </DataTable>

    <div class="row">
      <div class="col">
        <Button type="button" severity="danger" label="Download Pdf" @click="download" />
      </div>
      <div class="col">
        <FileUpload
          mode="basic"
          accept=".pdf"
          customUpload
          chooseLabel="Upload Isf"
          @select="isfUpload($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { toIsoDate } from "~/utils/dates"
import { PDF_LOGO } from "~/utils/pdfLogo"
import { useOrderStore } from "~/stores/order"

export default {
  props: {
    productSupplier: {
      type: Array,
      required: false,
    },
    invoice: {
      type: Array,
      required: true,
    },
    supplierDelivery: {
      type: Array,
      required: true,
    },
    po: {
      type: String,
      required: true,
    },
    supplierProduct: {
      type: Array,
      required: false,
    },
    modelProduction: {
      type: Object,
      required: false,
    },
  },

  data() {
    return {
      selectedSupplier: null,
      selectedInvoice: null,
      selectedDelivery: null,
      supplier_date: null,
      m4: "",
      m5: "",
      total: {
        amount: 0,
        sum: 0,
      },
    }
  },

  computed: {
    orderStore() {
      return useOrderStore()
    },
  },

  watch: {
    supplierProduct() {
      this.total = { amount: 0, sum: 0 }
      ;(this.supplierProduct ?? []).forEach((x) => {
        this.total.amount += x.Miktar
        this.total.sum += x.AlisFiyati * x.Miktar
      })
    },
  },

  methods: {
    /*
     * [1] BU IKISI BILEREK YEREL KALDI ve ADLARI DEGISTI.
     *
     * Orijinal adlari `formatDecimal` ve `formatPrice`'ti ve GLOBAL
     * yardimcilari GOLGELIYORLARDI. Fark onemli:
     *   global formatDecimal  -> toFixed(2)
     *   buradaki              -> toFixed(4)
     * Yerel tanimi silip global olani kullanmak, tedarikci urun
     * tablosunda ve uretilen PDF'te miktarlari IKI ONDALIK BASAMAK
     * kaybettirirdi -- derleme hatasi vermeden, sayilar "yuvarlanmis"
     * gorunerek.
     *
     * Adlari formatDecimal4 / formatPrice4 yapildi ki bir daha kimse
     * "zaten global'i var" diye silmeye kalkmasin.
     */
    formatDecimal4(value) {
      const val = (value / 1).toFixed(4).replace(".", ",")
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },

    formatPrice4(value) {
      const val = (value / 1).toFixed(4).replace(".", ",")
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },

    async isfUpload(event) {
      const file = event.files[0]

      // [2] file.size < "1000000" -> sayisal karsilastirma
      if (file.size >= 1_000_000) {
        // [3] .success -> .error  (mesaj bir HATA, yesil toast yanlisti)
        useAppToast().error("Dosya boyutu 1MB den büyük olamaz!")
        return
      }

      const doc = `${this.selectedSupplier.FirmaAdi}-${this.modelProduction.SiparisNo}.pdf`

      // [4] plugins/upload.js -> useFileService()
      const response = await useFileService().sendIsf(file, 3, doc)
      if (!response) return

      // [5] Cookies.get(...) (js-cookie) -> useCookie
      const username = useCookie("username").value
      const userId = useCookie("userId").value

      const value = {
        doc,
        po: this.modelProduction.SiparisNo,
        username,
        userId,
        // [6] date.dateToString -> toIsoDate (API'ye YAZILAN bicim)
        date: toIsoDate(new Date()),
        supplier: this.selectedSupplier.TedarikciID,
        deliveryDate: toIsoDate(this.supplier_date),
        m4: this.m4,
        m5: this.m5,
        productionDate: toIsoDate(this.modelProduction.SiparisTarihi),
        supplierName: this.selectedSupplier.FirmaAdi,
      }

      // [7] $store.dispatch -> Pinia action (Promise donduruyor, dogrulandi)
      const saved = await this.orderStore.setProductionProductSupplierIsfSave(value)
      if (saved) {
        this.orderStore.setOrderProductionIsfSendMail(value)
      } else {
        useAppToast().error("İşlem gerçekleştirilemedi!")
      }
    },

    async download() {
      /*
       * [8] pdfmake DINAMIK import ile yukleniyor.
       *
       * Iki sebep:
       *  - pdfmake/build/pdfmake tarayici icin yazilmis; modul tepesinden
       *    import edilirse SSR sirasinda da calistirilir.
       *  - ~2 MB; yalnizca bu butona basildiginda indirilmesi daha iyi.
       * Davranis degismiyor, cunku bu bir tiklama isleyicisi.
       *
       * !!! vfs_fonts TUZAGI -- OLCULDU, VARSAYIM DEGIL !!!
       * Nuxt 2 kodu soyleydi:
       *     import pdfFonts from ".../pdfmake/build/vfs_fonts";
       *     pdfMake.vfs = pdfFonts.vfs;
       * Kurulu surumde (0.2.23) `pdfFonts.vfs` UNDEFINED. Yani o atama
       * islemsiz. Fontlari asil kaydeden sey vfs_fonts modulunun
       * YUKLENMESININ KENDISI (icinde addVirtualFileSystem cagriliyor).
       *
       * Uc durum olculdu (pdfmake 0.2.23):
       *     vfs_fonts yuklendi + vfs = pdfFonts.vfs  -> CALISIR (6105 bayt)
       *     vfs_fonts yuklendi + atama yok           -> CALISIR (6105 bayt)
       *     vfs_fonts yuklendi + vfs = pdfFonts      -> PATLAR
       *         "File 'Roboto-Regular.ttf' not found in virtual file system"
       *     vfs_fonts hic yuklenmedi                 -> PATLAR (ayni hata)
       *
       * Yani "duzeltme" gibi gorunen `pdfMake.vfs = pdfFonts` PDF
       * uretimini BOZAR. Islemsiz atama kaldirildi, import yan etkisi
       * icin BIRAKILDI. Bu yorumu silmeyin: bir sonraki okuyan kisi
       * "kullanilmayan import" diye temizlemeye kalkarsa PDF calismaz.
       */
      const { default: pdfMake } = await import("pdfmake/build/pdfmake")
      await import("pdfmake/build/vfs_fonts")

      const body = [
        [
          { text: "Ürün Adı", style: "tableExample" },
          { text: "Yüzey İşlemi", style: "tableExample" },
          { text: "Ebat", style: "tableExample" },
          { text: "Kasa Adet", style: "tableExample" },
          { text: "Miktar", style: "tableExample" },
          { text: "Birim", style: "tableExample" },
          { text: "Birim Fiyat", style: "tableExample" },
          { text: "TOTAL", style: "tableExample" },
        ],
      ]

      let total = 0
      this.supplierProduct.forEach((element) => {
        total += element.AlisFiyati * element.Miktar
        body.push([
          { text: element.UretimAciklama, style: "tableHeader" },
          { text: element.YuzeyIslemAdi, style: "tableHeader" },
          { text: `${element.En}x${element.Boy}x${element.Kenar}`, style: "tableHeader" },
          { text: element.KasaAdet, style: "tableHeader" },
          { text: element.Miktar, style: "tableHeader" },
          { text: element.UrunBirimAdi, style: "tableHeader" },
          { text: this.formatPrice4(element.AlisFiyati), style: "tableHeader" },
          { text: this.formatPrice4(element.AlisFiyati * element.Miktar), style: "tableHeader" },
        ])
      })

      const dd = {
        content: [
          // [9] 78 KB'lik base64 logo -> ~/utils/pdfLogo
          { image: PDF_LOGO, width: 490, height: 90 },
          { text: "", style: "header", fontSize: 7 },
          {
            text: "Kasa üzerine yazılacak : " + this.supplierProduct[0].SiparisNo,
            fontSize: 7,
          },
          {
            text: "Sipariş Tarihi : " + toIsoDate(this.modelProduction.SiparisTarihi),
            fontSize: 7,
          },
          { text: "Firma : " + this.selectedSupplier.FirmaAdi, fontSize: 7 },
          { text: "Teslimat : " + this.selectedDelivery.TeslimAdi, fontSize: 7 },
          { text: "Teslim Tarihi : " + toIsoDate(this.supplier_date), fontSize: 7 },
          { text: "Kime: " + this.selectedInvoice.FaturaAdi, fontSize: 7 },
          { text: " ", style: "header", fontSize: 7 },
          { text: " ", style: "header", fontSize: 7 },

          // [10] table(externalDataRetrievedFromServer, ["name","age"]) ->
          //      duz nesne. Eski kod bir ic fonksiyon tanimlayip onu
          //      ARGUMAN VEREREK cagiriyordu; fonksiyon argumanlarini hic
          //      kullanmiyordu (kapanistan okuyordu) ve ["name","age"]
          //      baska bir ornekten kalmis olu bir parametreydi.
          { table: { headerRows: 1, body } },

          { text: " ", fontSize: 7 },
          {
            text:
              "Denizli " +
              this.selectedDelivery.TeslimAdi +
              " : " +
              this.formatPrice4(total),
            fontSize: 9,
            margin: [350, 40, 20, 30],
          },
          { text: " ", fontSize: 7 },
          {
            text: "SAYIN İLGİLİ ; Sipariş onaylayınız ve teslim tarihini bildiriniz . ",
            fontSize: 7,
          },
          { text: "Şartlar ", fontSize: 7 },
          {
            text: "1.Malzeme aynen yukarıda gibi tüm detaylara uygun olarak hazırlanmalıdır. ",
            fontSize: 7,
          },
          { text: "2.Kasalar ısıl işlemli ve bağlı olacak .  ", fontSize: 7 },
          { text: "3." + this.m4, fontSize: 7, color: "red" },
          { text: "4." + this.m5, fontSize: 7, color: "red" },
          {
            text: "5.Belirtilen şartlara uymayan malzemelerin tüm sorumluluğu üreticiye aittir",
            fontSize: 7,
          },
          {
            text: "SAYGILARIMIZLA ; Sipariş durumu yukarıda belirtilen şahıs ya da firma adına düzenlenmiştir ve onun tarafından kullanıbilir . Herhangi bir sorunuz olması durumunda yukarıda verilen numaralardan bize ulaşabilirsiniz.",
            style: "header",
            fontSize: 7,
          },
        ],
        styles: {
          header: { fontSize: 7, margin: [0, 0, 0, 10] },
          defaultStyle: { fontSize: 7 },
          subheader: { fontSize: 7, margin: [0, 10, 0, 5] },
          tableExample: {
            fontSize: 9,
            bold: true,
            fillColor: "#0a75ad",
            color: "#f0f8ff",
          },
          tableHeader: { fontSize: 7, color: "black" },
        },
      }

      pdfMake.createPdf(dd).download("ISF.pdf")
    },

    supplierSelected(event) {
      this.orderStore.setOrderSupplierProductList({
        po: this.po,
        supplier: event.value.TedarikciID,
      })
    },
  },
}
</script>

<!--
  components/orders/forms/supplier.vue
    -> app/components/orderDetail/SupplierForm.vue

  DOSYA YOLU: Nuxt 2'de `orderDetailSupplierForm` adiyla global kayitli.

  ZORUNLU degisiklikler:
  [1] Yerel formatDecimal/formatPrice -> formatDecimal4/formatPrice4.
      toFixed(4) kullaniyorlar; global olanlar toFixed(2). Silinmeleri iki
      ondalik kaybettirirdi. Ayrinti metot basindaki notta.
  [2] file.size < "1000000" (dize karsilastirmasi) -> >= 1_000_000
  [3] $toast.success("Dosya boyutu 1MB den büyük olamaz!") -> .error
      Mesaj bir hata; yesil "basarili" toast'i olarak gosteriliyordu.
  [4] plugins/upload.js -> app/composables/useFileService.ts
  [5] js-cookie (Cookies.get) -> useCookie
  [6] date.dateToString -> toIsoDate (API'ye yazilan "2026-10-02" bicimi)
  [7] this.$store.dispatch(...) -> useOrderStore() action'lari
  [8] pdfmake statik import -> dinamik import; vfs_fonts islemsiz atamasi
      kaldirildi (ama IMPORT KALDI -- fontlari kaydeden yan etki o).
      Olcum sonuclari metot icindeki yorumda; "temizlemeye" kalkmayin.
  [9] 78 KB base64 logo -> ~/utils/pdfLogo.ts
  [10] <Dropdown> -> <Select>, <Calendar> -> <DatePicker>
       (PrimeVue 4 yeniden adlandirmalari)
  [11] class="p-button-danger" -> severity="danger"
  [12] Bos <Column ...></Column> ciftleri self-closing.

  DUZELTILEN HATALAR (Nuxt 2'de de vardi):
  - Ikinci Dropdown'da inputId="supplier" yaziliydi (kopyala-yapistir);
    "Kind of Invoice" etiketi Supplier alanini isaret ediyordu. ->
    inputId="invoice"
  - M4/M5 textarea'larinin <label>'i hicbir alana bagli degildi (ne id ne
    for vardi) -> id/for eklendi.
  - download() icindeki table() yardimci fonksiyonu arguman aliyor ama
    kullanmiyordu; ["name","age"] baska bir ornekten kalmis olu
    parametreydi.

  KALDIRILDI -- OLU KOD:
  - downloadWithCSS() metodu ve `import jsPDF from "jspdf"`.
    Metot HICBIR YERDEN cagrilmiyor (sablonda da yok) ve cagrilsa zaten
    patlardi: `VueHtml2Canvas` tanimsiz (ne import var ne de paket
    bagimliliklarda) ve `this.$refs.content` diye bir ref yok.
    jspdf yalnizca bu metot icin import ediliyordu; pilota hic
    eklenmedi.
-->
