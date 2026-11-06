/*
 * Excel sunucusundaki `/raporlar/listeler/mkraporlari/excel` ucunun
 * Nitro karsiligi (MK raporlari -- bes sayfalik ozet kitap).
 *
 * Cagri yeri:
 *   app/pages/reports/mekmar/mk.vue -> excel_output()
 *
 * ---------------------------------------------------------------------
 * KAYNAK (okundu)
 * ---------------------------------------------------------------------
 *   web.py:3050           MkRaporlariExcelApi
 *   component/mk/mk.py:7  post/get
 *   component/excel.py:81 getMkRaporlariExcelList  <-- govde burada
 *
 * Sablon: excel/sablonlar/mkRaporlari.xlsx
 *         sayfalar: Sayfa1 .. Sayfa5
 *
 * Govde: /mk-api/reports/{year} ucunun TUM yaniti (istemci aldigi
 * nesneyi oldugu gibi geri gonderiyor).
 *
 * ---------------------------------------------------------------------
 * HIC STIL UYGULANMIYOR
 * ---------------------------------------------------------------------
 * Python bu ucta tek bir Font/Fill/Border kurmuyor -- yalnizca deger
 * yaziyor. Basliklar (satir 2, Sayfa4/5'te satir 1) ve birlestirmeler
 * SABLONDAN geliyor; Python'daki merge_cells cagrilarinin HEPSI
 * yorum satiri (excel.py:95, 109, 126). Bu yuzden burada da yalnizca
 * `write` kullaniliyor, hicbir stil yamasi yok.
 *
 * ---------------------------------------------------------------------
 * [!] IKI TARIH BICIMI -- PYTHON'UN KENDI TUHAFLIKLARI KORUNDU
 * ---------------------------------------------------------------------
 * 1) Sayfa1 A1 ve Sayfa2 A1 `strftime('%Y')` kullaniyor, yani
 *    yalnizca YIL. Sayfa2'nin basligi bu yuzden "2026 TARIHI
 *    ITIBARIYLE SIPARISLER" diye okunuyor -- "tarih" diyor ama yil
 *    yaziyor. Birebir korundu.
 *
 * 2) Sayfa2 E1 ve Sayfa3 A1 `strftime('%x')` kullaniyor. `%x`
 *    YERELE BAGLI kisa tarih; Python sunucusu varsayilan "C"
 *    yerelinde calistigi icin ciktisi AA/GG/YY (orn. 11/06/26).
 *    Turkce yerel KURULMAMIS olsaydi bile ayni -- Flask yereli
 *    degistirmiyor. Asagidaki shortDateC() bunu birebir uretiyor.
 *
 * 3) Sayfa3 A1'in basindaki '1-1-2024' SABIT YAZILI (excel.py:176):
 *
 *        value = '1-1-2024' + ' ' + strftime('%x') + ' ARASI YUKLEMELER'
 *
 *    Yani rapor hangi yil icin alinirsa alinsin baslik "1-1-2024"
 *    ile baslar. 2026 raporunda da oyle. DUZELTILMEDI: dogru tarih
 *    ancak raporun yili BILINIRSE yazilabilir, govdede ise yil alani
 *    YOK (istemci yalnizca veri nesnesini gonderiyor). Tahminle yil
 *    uretmek, veri gercekten 2024'ten beri birikmisse basligi
 *    YANLISLARDI. Duzeltmek istemcinin yil gondermesini gerektiriyor;
 *    bu ayri bir karar.
 *
 * =====================================================================
 * [!] PYTHON UCU BUGUNKU GERCEK VERIYLE ZATEN COKUYOR
 * =====================================================================
 * Python her blokta toplami ciplak `+=` ile biriktiriyor, orn.
 * (excel.py:118-119):
 *
 *     byCustomerTotal['fob'] += item['toplam']
 *
 * Alanlardan biri None ise bu `TypeError: unsupported operand type(s)
 * for +=: 'int' and 'NoneType'` atar; getMkRaporlariExcelList'in
 * except'i onu yutar ve uc `{"status": false}` + HTTP 200 doner.
 * Istemci ise yalnizca HTTP'ye bakiyordu, yani ESKI dosyayi -- baska
 * birinin raporunu ya da bos sablonu -- indiriyordu. Sessiz.
 *
 * OLCULDU (2026 verisi, 6 Kasim 2026):
 *   byCustomer icinde TEK bir satirin `toplam` alani null
 *   ("Royal Stone - Turkey") -> Python {"status": false}
 *   ayni govde, o tek alan 0 yapilinca -> {"status": true}
 *
 * Yani bu rapor uretimde su an calismiyor.
 *
 * BURADA: butun toplamlar nc() uzerinden gidiyor (null -> 0) ve
 * hucreye yine Python'un yazacagi deger yaziliyor (null -> BOS hucre).
 * Yani null'suz girdide cikti BIREBIR ayni, null'lu girdide ise
 * Python'un uretemedigi dogru dosya uretiliyor.
 *
 * ---------------------------------------------------------------------
 * KARSILASTIRMA (null'u 0'a cevrilmis ayni govde ile)
 * ---------------------------------------------------------------------
 *   Sayfa1  40 satir x 6  -> deger 0 / bicim 0 / stil 0 / birlestirme OK
 *   Sayfa2  16 satir x 29 -> 0 / 0 / 0 / OK
 *   Sayfa3  29 satir x 19 -> 0 / 0 / 0 / OK
 *   Sayfa4 482 satir x 16 -> 0 / 0 / 0 / OK
 *   Sayfa5  29 satir x 3  -> 0 / 0 / 0 / OK
 *   (yalnizca birlestirilmis alanin ICINDEKI gorunmez hucrelerde stil
 *    kaydi farki var; Excel o hucreleri cizmiyor.)
 */

/* ---------------------------------------------------------------------
 * Govde tipleri -- alan adlari /mk-api/reports/[year].get.ts ile ayni.
 * ------------------------------------------------------------------- */

interface PoRow {
  tarih?: string | null
  firma?: string | null
  po?: string | null
  teslim?: string | null
  fob?: number | null
  ddp?: number | null
}

interface MarketingRow {
  marketing?: string | null
  toplam?: number | null
  toplamCfr?: number | null
}

interface CustomerRow {
  musteriAdi?: string | null
  marketing?: string | null
  ulkeAdi?: string | null
  toplam?: number | null
  toplamCfr?: number | null
}

interface MarketingYuklemeRow {
  marketing?: string | null
  fobToplam?: number | null
  cfrToplam?: number | null
}

interface MarketingDetayYuklemeRow {
  marketing?: string | null
  musteri?: string | null
  toplamFob?: number | null
  toplamCfr?: number | null
}

interface CustomerOrderRow {
  musteri?: string | null
  ulkeAdi?: string | null
  temsilci?: string | null
  Toplam?: number | null
  BuYilUretim?: number | null
  BuYilSevkiyat?: number | null
  GecenYil?: number | null
  OncekiYil?: number | null
  OnDokuzYili?: number | null
  OnSekizYili?: number | null
  OnYediYili?: number | null
  OnAltiYili?: number | null
  OnBesYili?: number | null
  OnDortYili?: number | null
  OnUcYili?: number | null
  OnUcYiliOncesi?: number | null
}

interface SevkSipRow {
  musteriadi?: string | null
  siparisfob?: number | null
  yuklenenddp?: number | null
}

interface MkBody {
  byPo?: PoRow[] | null
  byCustomer?: CustomerRow[] | null
  byMarketing?: MarketingRow[] | null
  byMarketingYukleme?: MarketingYuklemeRow[] | null
  byMarketingDetayYukleme?: MarketingDetayYuklemeRow[] | null
  byCustomerOrder?: CustomerOrderRow[] | null
  byYuklemevSiparisler?: SevkSipRow[] | null
}

/**
 * Python `datetime.now().strftime('%x')` karsiligi.
 *
 * "C" yerelinde `%x` -> `%m/%d/%y`, yani iki haneli AY/GUN/YIL.
 * `toLocaleDateString` KULLANILMIYOR: o, sunucunun ICU yereline gore
 * degisir ve tr-TR'de "06.11.2026" uretirdi -- Python'un ciktisindan
 * farkli olurdu.
 */
function shortDateC(now: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0")

  return [
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    pad(now.getFullYear() % 100),
  ].join("/")
}

/*
 * Python'un dort pazarlama grubu. Eslestirme TAM METIN ve
 * BUYUK/KUCUK HARFE DUYARLI (excel.py:92-99, 344-352).
 *
 * [!] 'Imperial Homes' SUZGECTE noktasiz 'I' ile, ama Sayfa2/Sayfa3
 *     BASLIGINDA noktali 'Imperial Homes' yaziyor (excel.py:157, 405:
 *     'İmperial Homes'). Ikisi de birebir korundu -- suzgeci
 *     degistirmek o grubu BOSALTIRDI.
 */
const MARKETING_GROUPS = [
  "Mekmar",
  "İç Piyasa",
  "Mekmer",
  "Imperial Homes",
] as const

type MarketingGroup = (typeof MARKETING_GROUPS)[number]

/** Basliklar: suzgec metninden FARKLI olabilir (yukaridaki nota bak). */
const GROUP_TITLES: Record<MarketingGroup, string> = {
  Mekmar: "Mekmar",
  "İç Piyasa": "İç Piyasa",
  Mekmer: "Mekmer",
  "Imperial Homes": "İmperial Homes",
}

/**
 * Listeyi pazarlama grubuna gore ayirir.
 *
 * Python her sayfa icin ayni dort listeyi ic ice if/elif ile
 * dolduruyordu (excel.py:90-101 ve 342-353); iki kopya da ayni.
 * Gruba girmeyen kayit HICBIR listeye girmiyor -- yani bilinmeyen bir
 * pazarlama adi sessizce dusuyor. Davranis korundu.
 */
function groupBy<T extends { marketing?: string | null }>(
  rows: T[],
): Record<MarketingGroup, T[]> {
  const out = {
    Mekmar: [] as T[],
    "İç Piyasa": [] as T[],
    Mekmer: [] as T[],
    "Imperial Homes": [] as T[],
  }

  for (const item of rows) {
    const key = MARKETING_GROUPS.find((g) => item.marketing === g)
    if (key) out[key].push(item)
  }

  return out
}

export default defineEventHandler(async (event) => {
  const body = requireObject<MkBody>(await readBody(event))
  const now = new Date()
  const yil = String(now.getFullYear())
  const kisaTarih = shortDateC(now)

  const buffer = await fillTemplate(
    /* Birincil sayfa yalnizca dogrulama icin; yazim writerFor ile. */
    { template: "mkRaporlari.xlsx", sheetName: "Sayfa1" },
    async (_sheet, _book, write1, writerFor) => {
      /* ===============================================================
       * SAYFA1 -- PO bazinda yillik siparisler
       * =============================================================== */
      write1(
        1,
        1,
        `${yil} YILI BAŞINDAN İTİBAREN ALINAN SİPARİŞLER`,
      )

      let satir = 3
      let poFob = 0
      let poDdp = 0

      for (const item of body.byPo ?? []) {
        write1(satir, 1, item.tarih ?? null)
        write1(satir, 2, item.firma ?? null)
        write1(satir, 3, item.po ?? null)
        write1(satir, 4, item.teslim ?? null)
        write1(satir, 5, item.fob ?? null)
        write1(satir, 6, item.ddp ?? null)

        poFob += nc(item.fob)
        poDdp += nc(item.ddp)
        satir += 1
      }

      write1(satir, 1, "Toplam")
      write1(satir, 5, poFob)
      write1(satir, 6, poDdp)

      /* ===============================================================
       * SAYFA2 -- siparisler: pazarlama ozeti + musteri detayi +
       *           dort pazarlama blogu
       * =============================================================== */
      const write2 = await writerFor("Sayfa2")

      /* --- A sutunu: pazarlama ozeti (1-3) --- */
      write2(1, 1, `${yil} TARİHİ İTİBARİYLE SİPARİŞLER`)

      let satir2 = 3
      let mkFob = 0
      let mkDdp = 0

      for (const item of body.byMarketing ?? []) {
        write2(satir2, 1, item.marketing ?? null)
        write2(satir2, 2, item.toplam ?? null)
        write2(satir2, 3, item.toplamCfr ?? null)

        mkFob += nc(item.toplam)
        mkDdp += nc(item.toplamCfr)
        satir2 += 1
      }

      write2(satir2, 1, "Toplam")
      write2(satir2, 2, mkFob)
      write2(satir2, 3, mkDdp)

      /* --- E sutunu: musteri detayi (5-9) --- */
      write2(1, 5, `${kisaTarih} TARİHİ İTİBARİYLE SİPARİŞLER DETAY`)

      const byCustomer = body.byCustomer ?? []
      let satir3 = 3
      let custFob = 0
      let custDdp = 0

      for (const item of byCustomer) {
        write2(satir3, 5, item.musteriAdi ?? null)
        write2(satir3, 6, item.marketing ?? null)
        write2(satir3, 7, item.ulkeAdi ?? null)
        write2(satir3, 8, item.toplam ?? null)
        write2(satir3, 9, item.toplamCfr ?? null)

        custFob += nc(item.toplam)
        custDdp += nc(item.toplamCfr)
        satir3 += 1
      }

      write2(satir3, 5, "Toplam")
      write2(satir3, 8, custFob)
      write2(satir3, 9, custDdp)

      /*
       * --- Dort pazarlama blogu ---
       *
       * Python dort blogu ayri ayri, tamamen AYNI on satiri kopyalayip
       * yalnizca sutun numarasini degistirerek yaziyor
       * (excel.py:103-173). Sutunlar: 11, 16, 21, 26 -- yani arada
       * BIR BOS sutun var ama ilk ikisinin arasi 5, otekiler de 5.
       *
       * [!] SIRA KAYNAKTAKI SIRA: Mekmar, Ic Piyasa, Mekmer,
       *     Imperial Homes. MARKETING_GROUPS dizisinin sirasi degil --
       *     o dizi suzgec icin. Sutun eslesmesi burada acikca yaziyor.
       */
      const siparisGroups = groupBy(byCustomer)
      const SIPARIS_BLOCKS: [MarketingGroup, number][] = [
        ["Mekmar", 11],
        ["İç Piyasa", 16],
        ["Mekmer", 21],
        ["Imperial Homes", 26],
      ]

      for (const [group, col] of SIPARIS_BLOCKS) {
        write2(1, col, GROUP_TITLES[group])

        let r = 3
        let fob = 0
        let ddp = 0

        for (const item of siparisGroups[group]) {
          write2(r, col, item.musteriAdi ?? null)
          write2(r, col + 1, item.ulkeAdi ?? null)
          write2(r, col + 2, item.toplam ?? null)
          write2(r, col + 3, item.toplamCfr ?? null)

          fob += nc(item.toplam)
          ddp += nc(item.toplamCfr)
          r += 1
        }

        write2(r, col, "Toplam")
        write2(r, col + 2, fob)
        write2(r, col + 3, ddp)
      }

      /* ===============================================================
       * SAYFA3 -- yuklemeler: pazarlama ozeti + dort pazarlama blogu
       * =============================================================== */
      const write3 = await writerFor("Sayfa3")

      /* Sabit '1-1-2024' icin dosya basindaki 3. nota bak. */
      write3(1, 1, `1-1-2024 ${kisaTarih} ARASI YÜKLEMELER`)

      let satir8 = 3
      let yukFob = 0
      let yukDdp = 0

      for (const item of body.byMarketingYukleme ?? []) {
        write3(satir8, 1, item.marketing ?? null)
        write3(satir8, 2, item.fobToplam ?? null)
        write3(satir8, 3, item.cfrToplam ?? null)

        yukFob += nc(item.fobToplam)
        yukDdp += nc(item.cfrToplam)
        satir8 += 1
      }

      write3(satir8, 1, "Toplam")
      write3(satir8, 2, yukFob)
      write3(satir8, 3, yukDdp)

      /*
       * Yukleme bloklari: 5, 9, 13, 17 -- siparis bloklarindan FARKLI
       * aralik (4, cunku burada uc sutun var: musteri/fob/ddp).
       */
      const yuklemeGroups = groupBy(body.byMarketingDetayYukleme ?? [])
      const YUKLEME_BLOCKS: [MarketingGroup, number][] = [
        ["Mekmar", 5],
        ["İç Piyasa", 9],
        ["Mekmer", 13],
        ["Imperial Homes", 17],
      ]

      for (const [group, col] of YUKLEME_BLOCKS) {
        write3(1, col, GROUP_TITLES[group])

        let r = 3
        let fob = 0
        let ddp = 0

        for (const item of yuklemeGroups[group]) {
          write3(r, col, item.musteri ?? null)
          write3(r, col + 1, item.toplamFob ?? null)
          write3(r, col + 2, item.toplamCfr ?? null)

          fob += nc(item.toplamFob)
          ddp += nc(item.toplamCfr)
          r += 1
        }

        write3(r, col, "Toplam")
        write3(r, col + 1, fob)
        write3(r, col + 2, ddp)
      }

      /* ===============================================================
       * SAYFA4 -- musteri bazinda yillara yayilmis ciro (16 sutun)
       * =============================================================== */
      const write4 = await writerFor("Sayfa4")

      /*
       * Python ilk UC sutunu HAM yaziyor (null -> bos hucre), kalan
       * 13 sutunun her biri icin `if x == None: 0 else: x` yaziyor
       * (excel.py:261-334, 13 kez kopyalanmis ayni blok).
       * Buradaki ayrim bu yuzden kasitli: 1-3 ham, 4-16 `?? 0`.
       *
       * Toplam satiri YOK -- Python da yazmiyor.
       */
      let satir13 = 2

      for (const item of body.byCustomerOrder ?? []) {
        write4(satir13, 1, item.musteri ?? null)
        write4(satir13, 2, item.ulkeAdi ?? null)
        write4(satir13, 3, item.temsilci ?? null)

        const yillar = [
          item.Toplam,
          item.BuYilUretim,
          item.BuYilSevkiyat,
          item.GecenYil,
          item.OncekiYil,
          item.OnDokuzYili,
          item.OnSekizYili,
          item.OnYediYili,
          item.OnAltiYili,
          item.OnBesYili,
          item.OnDortYili,
          item.OnUcYili,
          item.OnUcYiliOncesi,
        ]

        yillar.forEach((v, i) => write4(satir13, 4 + i, v ?? 0))

        satir13 += 1
      }

      /* ===============================================================
       * SAYFA5 -- Mekmar musterileri: siparis (FOB) / yukleme (DDP)
       * =============================================================== */
      const write5 = await writerFor("Sayfa5")

      /*
       * [!] Bu sayfanin verisi (`byYuklemevSiparisler`) /mk-api ucunda
       *     BIR SURE DONULMUYORDU; sayfa sessizce bos kaliyordu.
       *     Gerekcesi ve geri konusu:
       *     server/routes/mk-api/reports/[year].get.ts, 7. baslik.
       *
       * `yuklenenfob` govdede var ama Python buraya YAZMIYOR -- sutun
       * 3'e `yuklenenddp` giriyor. Toplam satiri yok.
       */
      let satir15 = 2

      for (const item of body.byYuklemevSiparisler ?? []) {
        write5(satir15, 1, item.musteriadi ?? null)
        write5(satir15, 2, item.siparisfob ?? null)
        write5(satir15, 3, item.yuklenenddp ?? null)

        satir15 += 1
      }
    },
  )

  return sendXlsxBuffer(event, buffer, "mkRaporlari.xlsx")
})
