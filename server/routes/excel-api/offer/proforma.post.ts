/*
 * Excel sunucusundaki `/offer/proforma/output` ucunun Nitro karsiligi
 * (teklif -> proforma fatura).
 *
 * Cagri yeri:
 *   app/components/offer/Form.vue -> proforma_output()
 *
 * ---------------------------------------------------------------------
 * KAYNAK (okundu)
 * ---------------------------------------------------------------------
 *   web.py:3119  OfferProformaApi  (add_resource)
 *   web.py:3015  post/get
 *   web.py:2636  offer_proforma  <-- govde burada
 *
 * Sablon: excel/sablonlar/proforma_invoice.xlsx, sayfa 'Sayfa1'.
 *
 * Bu, Python tarafinda KALAN SON uctu; bununla birlikte excel
 * sunucusuna giden canli cagri kalmadi.
 *
 * ---------------------------------------------------------------------
 * SABLON NEREDEYSE HAZIR -- KOD YALNIZCA BES YERE DOKUNUYOR
 * ---------------------------------------------------------------------
 * 98 satirlik fatura duzeni, 64 birlestirme, toplam formulleri ve tum
 * sabit metinler SABLONDA. Python yalnizca sunlari yaziyor:
 *
 *   A2          musteri bilgi blogu (cok satirli tek metin)
 *   A18+        urun aciklama satirlari
 *   J18+        birim
 *   M18+        secilen teslim turune gore birim fiyat
 *   N18+        FORMUL (birime gore farkli carpim)
 *   F46 / F73   toplam etiketleri (teslim turune gore)
 *   B85         satisci adi (yalnizca iki isim icin)
 *
 * ---------------------------------------------------------------------
 * [!] PYTHON'DA OLU KOD: kullanilmayan stiller
 * ---------------------------------------------------------------------
 * offer_proforma'nin ilk 20 satiri bir `thin_border`, bir
 * `font_bold_white` ve bir `font_bold_black` kuruyor (web.py:2638-2659)
 * ve UCU DE HIC KULLANILMIYOR. Ustelik `font_bold_black` da
 * color='FFFFFF' veriyor, yani adina ragmen beyaz -- kopyala-yapistir
 * kalintisi. Burada hicbiri tasinmadi; stil tamamen sablondan geliyor.
 *
 * ---------------------------------------------------------------------
 * [!] ETIKETLER DONGUNUN ICINDE YAZILIYOR -- BOS LISTEDE YAZILMIYOR
 * ---------------------------------------------------------------------
 * Python F46/F73 etiketlerini her urun icin YENIDEN yaziyor
 * (web.py:2687-2706), yani urun listesi BOSSA etiketler hic
 * yazilmiyor ve sablondaki varsayilan ("TOTAL EXW Factory" /
 * "GRAND TOTAL EXW FACTORY") kaliyor. Ayni sey bilinmeyen bir teslim
 * turu icin de gecerli.
 *
 * Davranis birebir korundu: etiketler yalnizca `yazildi` olduysa
 * basiliyor. Istemci zaten bos listeyi engelliyor (Form.vue:588) ama
 * uc kendi basina da ayni davraniyor.
 *
 * ---------------------------------------------------------------------
 * [!] PYTHON BURADA DA NULL'DA COKUYOR
 * ---------------------------------------------------------------------
 * Urun aciklamasi ciplak `+` ile kuruluyor (web.py:2684):
 *
 *     str(index) + '-' + item['KategoriAdi'] + ' ' + item['UrunAdi'] + ...
 *
 * `str()` YALNIZCA index'e uygulanmis; kalan bes alan dogrudan
 * birlestiriliyor. Biri None ya da sayi ise
 * `TypeError: can only concatenate str` atar, except onu yutar ve uc
 * {"status": false} + HTTP 200 doner -- istemci de eski dosyayi
 * indirir.
 *
 * Musteri blogunda (web.py:2672) ise str() VAR, yani orada None
 * cokmez ama metne "None" YAZAR. Iki davranis da birebir korundu:
 * pyStr() Python'un str()'ini taklit ediyor (None -> "None"), ve
 * urun aciklamasinda da kullaniliyor -- yani Python'un calistigi her
 * girdide cikti AYNI, Python'un coktugu girdide ise burada dosya
 * yine de uretiliyor. *
 * =====================================================================
 * KARSILASTIRMA -- VE OPENPYXL'IN KENDI EKLEDIGI KENARLIKLAR
 * =====================================================================
 * Dort urunlu bir govde ile (Sqm / Pcs / Lmt / Ton, teslim turu FOB,
 * satisci Ozlem) iki cikti karsilastirildi:
 *
 *   YAZILAN 18 HUCRENIN HEPSI BIREBIR  (A2, A18-A21, J18-J21,
 *   M18-M21, N18-N21 formulleri, F46, F73, B85)
 *   - 'Ton' biriminde N21 iki tarafta da BOS (eslesmeyen birim)
 *   - formuller: =I18*M18, =G19*M19, =H20*M20
 *
 *   birlestirme 64/64 OK, sutun genisligi OK, satir yuksekligi 77/77 OK
 *   bicim farki 0, kenar DISI stil farki 0
 *
 * GERIYE IKI FARK SINIFI KALDI, IKISI DE BIZDEN DEGIL:
 *
 * 1) 57 hucrede kenarlik farki -- HEPSI birlestirilmis alanlarin
 *    MASTER hucresinde ve hepsinde openpyxl FAZLADAN kenarlik
 *    yaziyor (orn. A18:E18 -> sablon A18'de yalnizca `left`,
 *    openpyxl A18'e `left/right` yaziyor).
 *
 *    OLCULDU: sablon <-> exceljs tur-donusu (hic yazmadan) = 0 fark.
 *             sablon <-> bu ucun ciktisi                   = 0 fark.
 *             sablon <-> Python ciktisi                    = 57 fark.
 *
 *    Yani kenarligi KAYBEDEN taraf yok; openpyxl birlesik alanin
 *    cevre kenarligini master hucreye de KOPYALIYOR. Gorunum ayni:
 *    Excel birlesik blogun sag kenarini zaten sagdaki kole hucreden
 *    (orn. E18'in `right`) ciziyor ve o hucre iki dosyada da ayni.
 *    Yani bu fazlalik, cizilen seyi degistirmeyen bir tekrar.
 *
 *    Sablona sadik kalan taraf BU UC.
 *
 * 2) K73 ve K85'te ONBELLEGE ALINMIS formul sonucu farki --
 *    yukaridaki fullCalcOnLoad notuna bak.
 */

interface ProformaItem {
  KategoriAdi?: unknown
  UrunAdi?: unknown
  IslemAdi?: unknown
  EnBoy?: unknown
  Kalinlik?: unknown
  Birim?: unknown
  FobFiyat?: number | null
  FcaFiyat?: number | null
  CFiyat?: number | null
  DFiyat?: number | null
}

interface ProformaBody {
  data?: ProformaItem[] | null
  shipped?: { id?: unknown } | null
  model?: { UlkeAdi?: unknown; KullaniciAdi?: unknown } | null
  customer?: {
    Company?: unknown
    MusteriAdi?: unknown
    Phone?: unknown
    Mail?: unknown
  } | null
}

/**
 * Python `str()` karsiligi.
 *
 * JS'in String()'inden iki yerde ayrilir ve ikisi de bu sablonda
 * gorunur hale geliyor:
 *   None  -> "None"   (String(null) "null" derdi)
 *   True  -> "True"   (String(true) "true" derdi)
 */
function pyStr(value: unknown): string {
  if (value === null || value === undefined) return "None"
  if (value === true) return "True"
  if (value === false) return "False"
  return String(value)
}

/*
 * Teslim turu -> (fiyat alani, toplam etiketi, genel toplam etiketi).
 *
 * Python dort kez kopyalanmis if/elif blogu (web.py:2685-2706);
 * etiketlerin TAMAMI birebir alindi -- "TOTAL C Factory" ve
 * "TOTAL D Factory" kulaga eksik geliyor ama kaynakta oyle yaziyor.
 */
const SHIPPED_TYPES: Record<
  number,
  { field: keyof ProformaItem; total: string; grandTotal: string }
> = {
  1: {
    field: "FobFiyat",
    total: "TOTAL FOB Factory",
    grandTotal: "GRAND TOTAL FOB Factory",
  },
  2: {
    field: "FcaFiyat",
    total: "TOTAL FCA Factory",
    grandTotal: "GRAND TOTAL FCA Factory",
  },
  3: {
    field: "CFiyat",
    total: "TOTAL C Factory",
    grandTotal: "GRAND TOTAL C Factory",
  },
  4: {
    field: "DFiyat",
    total: "TOTAL D Factory",
    grandTotal: "GRAND TOTAL D Factory",
  },
}

/*
 * Birim -> N sutunundaki carpimin SOL carpani.
 *
 * Python (web.py:2709-2714):
 *   Sqm -> =I{r}*M{r}
 *   Pcs -> =G{r}*M{r}
 *   Lmt -> =H{r}*M{r}
 * Baska bir birimde N sutununa HICBIR SEY yazilmiyor (sablondaki
 * hucre oldugu gibi kaliyor). Eslestirme buyuk/kucuk harfe duyarli.
 */
const UNIT_COLUMNS: Record<string, string> = {
  Sqm: "I",
  Pcs: "G",
  Lmt: "H",
}

/*
 * Soyadi tamamlanan iki satisci (web.py:2717-2720).
 *
 * Baska bir kullanici adinda B85 YAZILMIYOR; sablondaki "-" kaliyor.
 * Birebir korundu -- liste disindaki satiscinin adini yazmak
 * davranisi degistirirdi.
 */
const SELLER_SURNAMES: Record<string, string> = {
  Ozlem: "OKUT",
  Hakan: "KAN",
}

export default defineEventHandler(async (event) => {
  const body = requireObject<ProformaBody>(await readBody(event))

  const buffer = await fillTemplate(
    { template: "proforma_invoice.xlsx", sheetName: "Sayfa1" },
    (_sheet, book, write) => {
      /*
       * =============================================================
       * ACILISTA TAM HESAP -- STALE ONBELLEK ICIN
       * =============================================================
       * Sablondaki formullerin ONBELLEGE ALINMIS sonuclari var; en
       * kritigi K85'teki `TODAY()`, onbellekte 22.04.2025 olarak
       * duruyor (sablonun kaydedildigi gun).
       *
       * openpyxl bu onbellek degerlerini okurken ATIYOR ve yalnizca
       * <f> yaziyor -- yani Excel dosyayi acinca hesaplamak ZORUNDA
       * kaliyor. exceljs ise onbellegi KORUYOR. Olculen tek fark bu
       * oldu (deger farki 2: K73 ve K85).
       *
       * Excel ucucu fonksiyonlari (TODAY/NOW) acilista zaten yeniden
       * hesaplar, ama bir FATURA TARIHININ buna bagli kalmasi kabul
       * edilebilir degil. fullCalcOnLoad ile dosya acilir acilmaz tum
       * sayfa hesaplaniyor; openpyxl'in zorladigi davranisin ayni si,
       * garanti altinda.
       */
      book.calcProperties.fullCalcOnLoad = true

      /* ===============================================================
       * A2 -- musteri bilgi blogu
       * ===============================================================
       * Python'daki birlestirme BIREBIR (web.py:2672). Iki ayrinti
       * kasitli:
       *   - "Company: ..." satirinin sonunda BOSLUK var (' \n')
       *   - "Vat No: " etiketinin DEGERI YOK; hemen ardindan yeni
       *     satir geliyor, yani fatura hep bos bir Vat No satiri
       *     tasiyor. Degeri govdede de yok.
       */
      const customer = body.customer ?? {}
      const model = body.model ?? {}

      write(
        2,
        1,
        "Company: " +
          pyStr(customer.Company) +
          " \n" +
          "Vat No: " +
          "\nContact Person: " +
          pyStr(customer.MusteriAdi) +
          "\nCountry: " +
          pyStr(model.UlkeAdi) +
          "\nPhone: " +
          pyStr(customer.Phone) +
          "\nMail: " +
          pyStr(customer.Mail),
      )

      /* ===============================================================
       * Urun satirlari (18'den itibaren)
       * =============================================================== */
      const shippedId = body.shipped?.id
      const shipped =
        typeof shippedId === "number" ? SHIPPED_TYPES[shippedId] : undefined

      let satir = 18
      let index = 1
      let labelsWritten = false

      for (const item of body.data ?? []) {
        write(
          satir,
          1,
          `${index}-${pyStr(item.KategoriAdi)} ${pyStr(item.UrunAdi)} ${pyStr(
            item.IslemAdi,
          )} ${pyStr(item.EnBoy)}x${pyStr(item.Kalinlik)}`,
        )

        if (shipped) {
          write(satir, 13, (item[shipped.field] as number | null) ?? null)
          labelsWritten = true
        }

        write(satir, 10, item.Birim as string | null)

        /*
         * N sutunu FORMUL.
         *
         * `write` once hucreyi sablondaki stil kuraliyla kuruyor,
         * sonra deger formulle degistiriliyor. openpyxl '=I18*M18'
         * metnini kaydederken bastaki '=' isaretini atip <f> olarak
         * yaziyor; exceljs'in { formula } nesnesi AYNI XML'i
         * uretiyor, yani cikti birebir.
         */
        const left = UNIT_COLUMNS[String(item.Birim)]
        if (left) {
          const cell = write(satir, 14, null)
          cell.value = { formula: `${left}${satir}*M${satir}` } as never
        }

        index += 1
        satir += 1
      }

      /*
       * Toplam etiketleri. Python bunlari dongunun ICINDE yaziyor;
       * yani hic urun islenmediyse (bos liste ya da bilinmeyen teslim
       * turu) yazilmiyorlar. Dosya basindaki nota bak.
       */
      if (shipped && labelsWritten) {
        write(46, 6, shipped.total)
        write(73, 6, shipped.grandTotal)
      }

      /* ===============================================================
       * B85 -- satisci adi
       * =============================================================== */
      const kullanici = model.KullaniciAdi
      const surname =
        typeof kullanici === "string" ? SELLER_SURNAMES[kullanici] : undefined

      if (surname) write(85, 2, `${kullanici} ${surname}`)
    },
  )

  return sendXlsxBuffer(event, buffer, "proforma_invoice.xlsx")
})
