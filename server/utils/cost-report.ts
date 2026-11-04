/*
 * Excel sunucusundaki `/maliyet/listeler/maliyetListesi/{yil}` ucunun
 * motoru -- AYO yillik maliyet raporu.
 *
 * Python kaynagi (gercek dosyalardan okundu, ozetten degil):
 *   component/main.py:24      MaliyetRaporIslemYilApi
 *   component/cost.py:323     MaliyetRaporIslem_Yil
 *   component/order.py:212    Siparisler_Yil
 *   component/product.py:177  Urunler_Yil
 *   component/execuse.py:316  Masraflar_Yil
 *   component/paid.py:6       Odemeler
 *   model/cost.py:13          OzelMaliyetListeSchema (84 alan)
 *
 * Veritabanina YAZMIYOR (hepsi select).
 *
 * ---------------------------------------------------------------------
 * DORT HATA DUZELTILDI -- KULLANICI ONAYIYLA
 * ---------------------------------------------------------------------
 * Bu port Python'un ciktisini BIREBIR TAKLIT ETMIYOR. Dort hata
 * bilerek duzeltildi; her biri asagida [FIX-n] olarak isaretli ve
 * karsilastirmada BEKLENEN fark olarak ortaya cikiyor:
 *
 *   [FIX-1] Satirlar arasi liste kirlenmesi (en ciddi)
 *   [FIX-2] `!= 1 or != 123` -- daima dogru olan kosul
 *   [FIX-3] Python truthiness'ine bagli uc dal
 *   [FIX-4] 1 Ocak hafta sonu kaydirmasi
 *
 * Bunlarin DISINDA her sey Python ile ayni olmali; aksi bir fark
 * cikiyorsa o benim hatamdir.
 *
 * ---------------------------------------------------------------------
 * BELLEKTE JOIN -> MAP
 * ---------------------------------------------------------------------
 * Python 13 listeyi onden cekip her siparis icin hepsini BASTAN
 * tariyordu; bazi getter'lar satir basina birden fazla kez cagriliyor.
 * Burada listeler SiparisNo'ya gore bir kez indeksleniyor.
 */
import {
  SQL_SIPARISLER, SQL_ALIS_FIYATI_BOS, SQL_URUNLER, SQL_MASRAFLAR,
  SQL_KONTEYNER_FATURALARI, SQL_NAKLIYE_FATURALARI, SQL_ODEMELER,
  SQL_TEDARIKCI_GRUP, SQL_DIS_FATURA, SQL_MEKMAR_FATURA, SQL_MEKMOZ_FATURA,
  SQL_TEDARIKCI_FATURA, SQL_TEDARIKCI_TUM, ayFiltresiEkle,
} from "./cost-queries"

const FILE_BASE = "https://file-service.mekmar.com/file"

/* Python __noneControl / `if x != None` kaliplarinin karsiligi. */
function nc(v: unknown): number {
  if (v === null || v === undefined) return 0
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

/*
 * ---------------------------------------------------------------------
 * [FIX-5] DOSYA KAPANMA KARARI KAYAN NOKTAYA TAKILIYORDU
 * ---------------------------------------------------------------------
 * `toplam_bedel <= odenen_toplam_tutar` karsilastirmasi dosyanin
 * kapanip kapanmadigini belirliyor ve kar_zarar / kar_zarar_tl /
 * kar_zarar_tl_yuzdesi'nin UCUNU birden suruyor.
 *
 * Olculen vaka (2022, 21NOVA42):
 *     toplam_bedel         Python 15910.9   Node 15910.900000000001
 *     odenen_toplam_tutar         15910.9        15910.9
 * Node'da 15910.900000000001 <= 15910.9 YANLIS -> dosya "acik" sayildi
 * ve kar/zarar 0'a dustu. 10 satirda cikti.
 *
 * Sebep: Python (pyodbc) decimal kolonlari Decimal okuyup TAM
 * topluyor; Node (tedious) double okuyor ve toplama artik birakiyor.
 *
 * NEDEN 2 ONDALIGA YUVARLAMAK DOGRU: bu toplamin TUM bilesenleri
 * decimal(18,2) -- INFORMATION_SCHEMA'dan dogrulandi:
 *     SiparisUrunTB.SatisToplam        decimal(18,2)
 *     SiparislerTB.NavlunSatis         decimal(18,2)
 *     SiparislerTB.DetayTutar_1..3     decimal(18,2)
 *     SiparislerTB.sigorta_tutar_satis decimal(18,2)
 *     OdemelerTB.Tutar                 decimal(18,2)
 * Yani gercek olcek 2 ve 2'ye yuvarlamak KAYIPSIZ.
 *
 * DIKKAT -- bu her alana uygulanamaz: mekmar_alim/mekmoz_alim/dis_alim
 * `AlisFiyati decimal(18,7) * Miktar decimal(18,4)` carpimindan
 * geliyor, yani olcegi 11. Onlar YUVARLANMIYOR; 2'ye yuvarlamak
 * gercek veriyi bozardi (ayni tuzaga customer-orders rotasinda
 * dusup geri almistim, oradaki nota bakilabilir).
 */
function round2(v: number): number {
  return Math.round(v * 100) / 100
}

/* SiparisNo -> satirlar (cok satirli gruplar icin) */
function groupBy<T>(rows: T[], key: (r: T) => string | null): Map<string, T[]> {
  const m = new Map<string, T[]>()
  for (const r of rows) {
    const k = key(r)
    if (k === null || k === undefined) continue
    const list = m.get(k)
    if (list) list.push(r)
    else m.set(k, [r])
  }
  return m
}

type SiparisRow = {
  ID: number
  SiparisNo: string
  SiparisTarihi: Date | null
  YuklemeTarihi: Date | null
  MusteriAdi: string | null
  NavlunSatis: number | null
  DetayTutar_1: number | null
  DetayTutar_2: number | null
  DetayTutar_3: number | null
  DetayTutar_4: number | null
  NavlunAlis: number | null
  DetayAlis_1: number | null
  DetayAlis_2: number | null
  DetayAlis_3: number | null
  UlkeAdi: string | null
  Marketing: string | null
  TeslimTur: string | null
  Komisyon: number | null
  EvrakGideri: number | null
  depo_yukleme: number | boolean | null
  sigorta_Tutar: number | null
  sigorta_id: boolean | null
  sigorta_tutar_satis: number | null
  siparisci: string | null
  operasyon: string | null
  ozeliscilik: number | null
  isciliktedarikcimekmer: number | null
  isciliktedarikcimekmoz: number | null
  faturalama: string | null
  YuklemeMonth: number | null
  YuklemeYil: number | null
  YuklemeAy: number | null
  YuklemeGun: number | null
  alisFiyatiControl: boolean | null
}

type UrunRow = { SiparisNo: string; SatisToplam: number | null; AlisToplam: number | null; TedarikciID: number | null }
type MasrafRow = {
  SiparisNo: string; YuklemeEvrakID: number | null; SiparisFaturaTurID: number | null
  Tutar: number | null; FaturaKayitID: number | null; EvrakAdi: string | null
}
type FirmaRow = { ID: number; FirmaID: number | null }
type OdemeRow = { Tarih: Date | null; SiparisNo: string; Masraf: number | null; tutar: number | null; Kur: number | null }
type PoRow = { SiparisNo: string }

/* TedarikciFaturaSchema: id / link / evrak_adi -- Python modelinin
 * varsayilanlari (model/cost.py:8). Birlestirme yalnizca `link`
 * atiyor, digerleri varsayilanda kaliyor. */
type Evrak = { id: number | null; link: string; evrak_adi: string }
const evrak = (link: string): Evrak => ({ id: null, link, evrak_adi: "" })

/*
 * ---------------------------------------------------------------------
 * [FIX-4] HAFTA SONU KAYDIRMASI
 * ---------------------------------------------------------------------
 * Kur sorgusu icin yukleme tarihi en son IS GUNUNE cekiliyor.
 *
 * Python (cost.py:546-567) iki ayri dal yaziyor ve 1 Ocak dali BOZUK:
 *   normal gun   Cumartesi -> gun-1,  Pazar -> gun-2      (dogru)
 *   1 Ocak       Cumartesi -> yil-1, ay=12, GUN 1 KALIYOR (yanlis)
 *                Pazar     -> yil-1, ay=12, gun=29       (yanlis)
 *
 * Yani 1 Ocak Cumartesi ise tarih "1 Aralik"a, Pazar ise "29 Aralik"a
 * kayiyor; dogrusu sirasiyla 31 ve 30 Aralik olmali.
 *
 * Burada tek bir dal var: gercek tarih aritmetigiyle Cumartesi 1 gun,
 * Pazar 2 gun geri. Ay/yil devri kendiliginden dogru.
 */
function lastBusinessDay(year: number, month: number, day: number) {
  /* UTC: yerel saat dilimi gun kaydirmasin. */
  const d = new Date(Date.UTC(year, month - 1, day))
  const dow = d.getUTCDay()            // 0 Pazar, 6 Cumartesi
  if (dow === 6) d.setUTCDate(d.getUTCDate() - 1)
  else if (dow === 0) d.setUTCDate(d.getUTCDate() - 2)

  return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() }
}

/*
 * ---------------------------------------------------------------------
 * AYLIK VE YILLIK AYNI MOTOR
 * ---------------------------------------------------------------------
 * `month` verilirse AYLIK uc (Python: MaliyetRaporIslem), verilmezse
 * YILLIK (MaliyetRaporIslem_Yil).
 *
 * Python'da bunlar AYRI SINIFLAR: cost.py'de iki getMaliyetListesi,
 * order.py'de Siparisler/Siparisler_Yil, product.py'de Urunler/
 * Urunler_Yil, execuse.py'de Masraflar/Masraflar_Yil -- toplam 2726
 * satir. Satir satir karsilastirildiginda islevsel fark SADECE IKI
 * TANE cikti:
 *
 *   1) Bes sorguya ay suzgeci ekleniyor (bkz. ayFiltresiEkle).
 *   2) `diger_masraflar` alanina sigorta DAHIL EDILMIYOR; bunun yerine
 *      `masraf_toplam` sigortayi AYRICA ekliyor (asagida [AY-1]).
 *
 * Geri kalan tum farklar OLU KOD veya etkisiz:
 *
 *   execuse.py `__masrafListesiOlustur` HER IKI SURUMDE DE yorumlu
 *       (satir 52 ve 359), yani o blokta gorunen sigorta/navlun/lashing
 *       farklarinin hicbiri calismiyor.
 *   execuse.py `__getDovizBilgi` yalnizca YORUMLU satirdan cagriliyor
 *       (satir 126), yani "aylik surumde doviz kuru mantigi var" notu
 *       OLU KODU tarif ediyor. getMasrafModel iki surumde ayni.
 *   product.py'deki tum farklar (dis_alim_fatura_list, evrak
 *       kopyalari, __getDisAlimFaturaSayisi'nin liste/sayi dondurmesi)
 *       cost.py tarafindan UZERINE YAZILIYOR -- cikti etkilenmiyor.
 *   order.py'de sigorta/sigorta_tutar_satis icin `else: 0` dallari:
 *       model varsayilani zaten 0 (model/cost.py:118,122).
 *   cost.py aylik surumde `kar_zarar_tl_yuzdesi = 0` ikinci kez
 *       atiyor; o dalda deger zaten varsayilan 0.
 *
 * Yani aylik uc, yillik motorun ay suzgecli hali + tek alan farki.
 */
export async function buildCostReport(year: number, month?: number) {
  const aylik = month !== undefined

  /* Ay suzgeci yalnizca aylik yolda; yillik sorgu metinleri AYNEN
   * kaliyor, yani yillik ucun davranisi bu degisiklikten etkilenmiyor. */
  const q = (sql: string, ad: string) => (aylik ? ayFiltresiEkle(sql, ad) : sql)
  const p = aylik ? { year, month } : { year }

  const [
    siparisler, alisBos, urunler, masraflar, konteynerFaturalari,
    nakliyeFaturalari, odemeler, tedarikciGrup, disFatura, mekmarFatura,
    mekmozFatura, tedarikciFatura, tedarikciTum,
  ] = await dbAll([
    dbQuery<SiparisRow>(q(SQL_SIPARISLER, "SQL_SIPARISLER"), p),
    dbQuery<PoRow>(q(SQL_ALIS_FIYATI_BOS, "SQL_ALIS_FIYATI_BOS"), p),
    dbQuery<UrunRow>(q(SQL_URUNLER, "SQL_URUNLER"), p),
    dbQuery<MasrafRow>(q(SQL_MASRAFLAR, "SQL_MASRAFLAR"), p),
    dbQuery<FirmaRow>(SQL_KONTEYNER_FATURALARI),
    dbQuery<FirmaRow>(SQL_NAKLIYE_FATURALARI),
    dbQuery<OdemeRow>(SQL_ODEMELER),
    dbQuery<PoRow>(q(SQL_TEDARIKCI_GRUP, "SQL_TEDARIKCI_GRUP"), p),
    dbQuery<PoRow>(SQL_DIS_FATURA),
    dbQuery<PoRow>(SQL_MEKMAR_FATURA),
    dbQuery<PoRow>(SQL_MEKMOZ_FATURA),
    dbQuery<PoRow>(SQL_TEDARIKCI_FATURA),
    dbQuery<PoRow>(SQL_TEDARIKCI_TUM),
  ])

  const alisBosSet = new Set(alisBos.map((r) => r.SiparisNo))
  const urunByPo = groupBy(urunler, (r) => r.SiparisNo)
  const masrafByPo = groupBy(masraflar, (r) => r.SiparisNo)
  const odemeByPo = groupBy(odemeler, (r) => r.SiparisNo)

  const firmaById = new Map<number, number | null>()
  for (const f of konteynerFaturalari) firmaById.set(f.ID, f.FirmaID)
  const nakliyeFirmaById = new Map<number, number | null>()
  for (const f of nakliyeFaturalari) nakliyeFirmaById.set(f.ID, f.FirmaID)

  /* Sayilacak listeler: PO -> kac satir */
  const countByPo = (rows: PoRow[]) => {
    const m = new Map<string, number>()
    for (const r of rows) m.set(r.SiparisNo, (m.get(r.SiparisNo) ?? 0) + 1)
    return m
  }
  const nTedarikciGrup = countByPo(tedarikciGrup)
  const nDisFatura = countByPo(disFatura)
  const nMekmarFatura = countByPo(mekmarFatura)
  const nMekmozFatura = countByPo(mekmozFatura)
  const nTedarikciFatura = countByPo(tedarikciFatura)
  const nTedarikciTum = countByPo(tedarikciTum)

  /* ------------------------------------------------------------------
   * Masraf getter'lari (Masraflar_Yil.getMasrafModel)
   *
   * DIKKAT: Python'un `__masrafListesiOlustur` blogu YORUMLU
   * (execuse.py:359), yani o 64 satir HIC CALISMIYOR. Asagidaki
   * kosullar CANLI getter'lardan alindi -- olu blokta lashing/booking/
   * spazlet'e fazladan `YuklemeEvrakID == 50` sarti var, canlilarda
   * YOK. Olu koda bakip yazmak yanlis olurdu.
   *
   * Her getter'da evrak linki SON eslesen satirdan geliyor (Python
   * dongude ustune yaziyor), tutar ise TOPLANIYOR.
   * ------------------------------------------------------------------ */
  type MasrafKind = {
    key: string
    match: (m: MasrafRow) => boolean
    firma: Map<number, number | null>
    needTutar: boolean
  }
  const KINDS: MasrafKind[] = [
    { key: "gumruk", match: (m) => m.YuklemeEvrakID === 70, firma: firmaById, needTutar: true },
    /* nakliye FirmaID'yi AYRI tablodan okuyor -- Python'da da oyle. */
    { key: "nakliye", match: (m) => m.YuklemeEvrakID === 13, firma: nakliyeFirmaById, needTutar: true },
    { key: "ilaclama", match: (m) => m.SiparisFaturaTurID === 73, firma: firmaById, needTutar: true },
    { key: "liman", match: (m) => m.SiparisFaturaTurID === 9 && m.YuklemeEvrakID === 50, firma: firmaById, needTutar: true },
    { key: "lashing", match: (m) => m.SiparisFaturaTurID === 100, firma: firmaById, needTutar: true },
    { key: "booking", match: (m) => m.SiparisFaturaTurID === 101, firma: firmaById, needTutar: true },
    { key: "spazlet", match: (m) => m.SiparisFaturaTurID === 102, firma: firmaById, needTutar: true },
    /* navlun: YALNIZCA evrak, tutar yok; Tutar != null sarti da YOK. */
    { key: "navlun", match: (m) => m.SiparisFaturaTurID === 13 && m.YuklemeEvrakID === 50, firma: firmaById, needTutar: false },
  ]

  function masrafOf(po: string) {
    const rows = masrafByPo.get(po) ?? []
    const tutar: Record<string, number> = {}
    const link: Record<string, string> = {}
    for (const k of KINDS) { tutar[k.key] = 0; link[k.key] = "" }

    let satisFaturasi = ""

    for (const m of rows) {
      /* satis faturasi: YuklemeEvrakID 16 -- son eslesme kazanir */
      if (m.YuklemeEvrakID === 16) satisFaturasi = `${FILE_BASE}/download/16/${m.SiparisNo}`

      for (const k of KINDS) {
        if (!k.match(m)) continue
        if (k.needTutar) {
          if (m.Tutar === null || m.Tutar === undefined) continue
          tutar[k.key] += Number(m.Tutar)
        }
        const firmaId = m.FaturaKayitID === null ? undefined : k.firma.get(m.FaturaKayitID)
        if (firmaId !== null && firmaId !== undefined) {
          link[k.key] = `${FILE_BASE}/download/customer/${firmaId}/${m.EvrakAdi}`
        }
      }
    }
    return { tutar, link, satisFaturasi }
  }

  /* ------------------------------------------------------------------
   * Urun toplamlari (Urunler_Yil + getUrunModel)
   * ------------------------------------------------------------------ */
  function urunOf(po: string) {
    const rows = urunByPo.get(po) ?? []
    let toplamBedel = 0, mekmarAlim = 0, mekmozAlim = 0, disAlim = 0
    let mekmerKontrol = 0, mekmozKontrol = 0, disKontrol = 0
    let disAlimFaturaSayisi = 0

    for (const u of rows) {
      const alis = u.AlisToplam
      const bos = alis === null || alis === undefined || Number(alis) === 0

      if (!bos) {
        if (u.TedarikciID === 1) mekmarAlim += Number(alis)
        else if (u.TedarikciID === 123) mekmozAlim += Number(alis)
        else disAlim += Number(alis)
      } else {
        /*
         * Python `model.X += 1` yapiyor ama X bir SINIF niteligi, yani
         * her satirda sifirdan baslayip 1 oluyor; sonra getUrunModel
         * bunlari topluyor. Net sonuc: eslesen satir sayisi.
         */
        if (u.TedarikciID === 1) mekmerKontrol += 1
        else if (u.TedarikciID === 123) mekmozKontrol += 1
        else disKontrol += 1
      }

      if (u.SatisToplam !== null && u.SatisToplam !== undefined) {
        toplamBedel += Number(u.SatisToplam)
      }

      /*
       * [FIX-2] Python (product.py:287):
       *     if item.TedarikciID != 1 or item.TedarikciID != 123
       * Bu kosul HER SAYI icin dogru (bir sayi ikisine birden esit
       * olamaz), yani "dis alim faturasi" sayaci siparisin TUM urun
       * satirlarini sayiyordu. Niyet acikca dis tedarikci saymak.
       */
      if (u.TedarikciID !== 1 && u.TedarikciID !== 123) disAlimFaturaSayisi += 1
    }

    return { toplamBedel, mekmarAlim, mekmozAlim, disAlim, mekmerKontrol, mekmozKontrol, disKontrol, disAlimFaturaSayisi }
  }

  /* ------------------------------------------------------------------
   * Odemeler (paid.py)
   *
   * DIKKAT: Python `odeme_listesi`ne yalnizca `tutar != None` olan
   * satirlari ekliyor (append `if`in ICINDE, paid.py:58-62), yani
   * tutari null olan odemeler TAMAMEN dusuyor. Korundu.
   * ------------------------------------------------------------------ */
  function odemeOf(po: string) {
    const rows = (odemeByPo.get(po) ?? []).filter((o) => o.tutar !== null && o.tutar !== undefined)

    let bankaMasrafi = 0, tryToplam = 0, usdToplam = 0, odenenToplam = 0
    let odemeTarihi = ""
    let sonKur = 0

    for (const o of rows) {
      bankaMasrafi += nc(o.Masraf)
      tryToplam += nc(o.Kur) * nc(o.tutar)
      usdToplam += nc(o.tutar)
      odenenToplam += nc(o.tutar)
      /* Python son eslesmeyi aliyor (sorgu Tarih'e gore artan sirali,
       * yani en son gelen para). */
      odemeTarihi = sqlDateTr(o.Tarih)
      sonKur = nc(o.Kur)
    }
    /* [FIX-5]: olcek 2, yuvarlamak kayipsiz -- gerekcesi round2'de. */
    return { bankaMasrafi, tryToplam, usdToplam, odenenToplam: round2(odenenToplam), odemeTarihi, sonKur, adet: rows.length }
  }

  /* ------------------------------------------------------------------
   * Satirlari kur. TCMB kuru gerekebilecek siparisler icin once
   * tarihleri topluyoruz ki tek seferde cekilsin.
   * ------------------------------------------------------------------ */
  const prepared = siparisler.map((s) => {
    const po = s.SiparisNo
    const u = urunOf(po)
    const o = odemeOf(po)
    const m = masrafOf(po)

    const navlunSatis = nc(s.NavlunSatis)
    const detay1 = nc(s.DetayTutar_1)
    const detay2 = nc(s.DetayTutar_2)
    const detay3 = nc(s.DetayTutar_3)
    const detay4 = nc(s.DetayTutar_4)
    const sigorta = nc(s.sigorta_Tutar)
    const sigortaSatis = nc(s.sigorta_tutar_satis)

    /* Siparisler_Yil: toplam_bedel = navlun+d1+d2+d3+sigorta_satis,
     * sonra birlestirme urun toplamini EKLIYOR (cost.py:438). */
    const toplamBedel = round2(navlunSatis + detay1 + detay2 + detay3 + sigortaSatis + u.toplamBedel)

    const navlunAlis = nc(s.NavlunAlis)
    const detayAlis1 = nc(s.DetayAlis_1)
    const detayAlis2 = nc(s.DetayAlis_2)
    const detayAlis3 = nc(s.DetayAlis_3)
    /*
     * [AY-1] SIGORTA NEREYE YAZILIYOR -- TEK GERCEK ALAN FARKI
     *
     * Yillik (order.py:170):
     *     diger_masraflar = d1+d2+d3 + detay_tutar_4 + sigorta
     *     masraf_toplam   = ... + diger_masraflar            (sigorta ICERIDE)
     *
     * Aylik (order.py:167 + cost.py:259):
     *     diger_masraflar = d1+d2+d3 + detay_tutar_4         (sigorta YOK)
     *     masraf_toplam   = ... + diger_masraflar + sigorta  (AYRICA ekleniyor)
     *
     * Yani MASRAF TOPLAMI IKISINDE DE AYNI; degisen yalnizca sigortanin
     * hangi alanda raporlandigi. Ekranda `diger_masraflar` ve `sigorta`
     * AYRI kolonlar oldugu icin yillik surum sigortayi IKI KEZ
     * gosteriyor (bir kez kendi kolonunda, bir kez diger masraflarin
     * icinde) -- aylik surumde bu yok.
     *
     * Burada her iki davranis da KORUNDU: aylik uc Python'un aylik
     * ciktisini, yillik uc yillik ciktisini veriyor. Yillik surumdeki
     * cift gosterimi duzeltmek AYRI BIR KARAR; o rapor bugun uretimde
     * bu sekilde okunuyor.
     */
    const digerMasraflar =
      detayAlis1 + detayAlis2 + detayAlis3 + detay4 + (aylik ? 0 : sigorta)

    /*
     * [FIX-3] Python truthiness'ine bagli uc dal acik hale getirildi:
     *
     *  (a) `isciliktedarikcimekmer` alanina HAM TedarikciID (1)
     *      atanip sonra `== True` ile karsilastiriliyordu; Python'da
     *      `1 == True` dogru oldugu icin kazara calisiyordu. Burada
     *      alan gercek boolean.
     *  (b) `mekus_id == False` -- depo_yukleme NULL ise Python'da
     *      `None == False` YANLIS doner, yani null depo "depo var"
     *      gibi davraniyordu. Niyet "depo yuklemesi yok". Burada
     *      null/0/false hepsi "yok".
     *  (c) `mekus_id == True` ayni sekilde.
     */
    const mekusVar = !(s.depo_yukleme === null || s.depo_yukleme === undefined ||
                       Number(s.depo_yukleme) === 0 || s.depo_yukleme === false)
    const isciMekmer = s.isciliktedarikcimekmer !== null && s.isciliktedarikcimekmer !== undefined
    const isciMekmoz = s.isciliktedarikcimekmoz !== null && s.isciliktedarikcimekmoz !== undefined

    /* [FIX-4] hafta sonu kaydirmasi -- gerekcesi lastBusinessDay'de. */
    const yuk = lastBusinessDay(
      Number(s.YuklemeYil), Number(s.YuklemeAy), Number(s.YuklemeGun),
    )

    return { s, po, u, o, m, navlunSatis, detay1, detay2, detay3, detay4, sigorta, sigortaSatis,
             toplamBedel, navlunAlis, detayAlis1, detayAlis2, detayAlis3, digerMasraflar,
             mekusVar, isciMekmer, isciMekmoz, yuk }
  })

  /*
   * Odemesi olmayan siparisler icin doviz kuru TCMB'den (Python:
   * Odemeler.getOdenenKur -> DovizListem.getDovizKurListe, yani
   * api/currency.py'nin BanknoteSelling okuyan fonksiyonu --
   * pilotta server/utils/tcmb.ts).
   *
   * Python bunu siparis basina AYRI AYRI, sirayla cagiriyordu.
   * Burada ayni tarihler tek seferde cekiliyor.
   */
  const needRate = new Map<string, { y: number; m: number; d: number }>()
  for (const p of prepared) {
    if (p.o.odenenToplam > 0) continue
    needRate.set(`${p.yuk.year}-${p.yuk.month}-${p.yuk.day}`, { y: p.yuk.year, m: p.yuk.month, d: p.yuk.day })
  }
  const rateByKey = new Map<string, number>()
  await Promise.all([...needRate].map(async ([key, d]) => {
    try {
      const { rate } = await getUsdRate(new Date(Date.UTC(d.y, d.m - 1, d.d)), { field: "BanknoteSelling" })
      rateByKey.set(key, Number.parseFloat(rate))
    } catch (err) {
      /* Python tarafinda hata "Doviz Hata" metni donduruyor ve cagiran
       * taraf onu sayi sanip 0 gibi davraniyordu. Burada 0. */
      console.warn(`[maliyet] ${key} icin TCMB kuru alinamadi:`, err)
      rateByKey.set(key, 0)
    }
  }))

  /* ------------------------------------------------------------------ */

  return prepared.map((p) => {
    const { s, po, u, o, m } = p

    /*
     * [FIX-1] EN CIDDI HATA -- SATIRLAR ARASI LISTE KIRLENMESI
     *
     * Python'da OzelMaliyetListeModel'in evrak alanlari SINIF
     * niteligi olarak `list()` ile tanimli (model/cost.py:151-158),
     * yani TUM satirlar ayni listeyi paylasiyor. Birlestirme kodu da
     * atama degil `item.dis_alim_evrak.append(...)` yapiyor
     * (cost.py:477,486,495,504,524).
     *
     * Taze liste yalnizca ODEMESI OLAN satirlara atiliyor
     * (cost.py:451-456, `if odenen_try != 0 and odenen_usd != 0`).
     * Dolayisiyla odemesi OLMAYAN her siparis ayni sinif listesine
     * append ediyor: listeleri AYNI NESNE ve `_sayisi` degerleri
     * KUMULATIF -- ekranda o siparislere ait olmayan evraklar ve
     * yanlis sayilar gorunuyor.
     *
     * Burada her satirin listesi KENDISININ.
     */
    const disAlimEvrak: Evrak[] = []
    const disAlimTedarikci: Evrak[] = []
    const tedarikciSayisiEvrak: Evrak[] = []
    const mekmarAlimEvrak: Evrak[] = []
    const mekmozAlimEvrak: Evrak[] = []
    /* ozel_iscilik_evrak: tek doldurucu blok Python'da YORUMLU
     * (cost.py:506-513), yani her zaman bos. */
    const ozelIscilikEvrak: Evrak[] = []

    for (let i = 0; i < (nDisFatura.get(po) ?? 0); i++) disAlimEvrak.push(evrak(`${FILE_BASE}/download/3/${po}`))
    for (let i = 0; i < (nTedarikciFatura.get(po) ?? 0); i++) disAlimTedarikci.push(evrak(`${FILE_BASE}/download/40/${po}`))
    for (let i = 0; i < (nTedarikciTum.get(po) ?? 0); i++) tedarikciSayisiEvrak.push(evrak(`${FILE_BASE}/download/40/${po}`))
    for (let i = 0; i < (nMekmarFatura.get(po) ?? 0); i++) mekmarAlimEvrak.push(evrak(`${FILE_BASE}/download/3/${po}`))
    for (let i = 0; i < (nMekmozFatura.get(po) ?? 0); i++) mekmozAlimEvrak.push(evrak(`${FILE_BASE}/download/3/${po}`))

    const ortalamaKur = o.tryToplam !== 0 && o.usdToplam !== 0 ? o.tryToplam / o.usdToplam : 0

    /* dosya_kapanma_date: odenen >= toplam bedel ise son odeme tarihi */
    let dosyaKapanma = p.toplamBedel <= o.odenenToplam ? o.odemeTarihi : "-"

    /*
     * [FIX-6] Python depo yuklemesi varken `navlun_evrak = []` atiyor
     * ama semada bu alan fields.String() -- marshmallow bir LISTEYI
     * metne dokuyor ve ekranda LITERAL "[]" goruluyor (2022'de 13
     * satirda olculdu). Dogru deger bos metin.
     */
    const navlunEvrak = p.mekusVar ? "" : m.link.navlun

    const pazarlama = nc(s.Komisyon)
    const kuryeMasrafi = nc(s.EvrakGideri)
    const ozelIscilik = nc(s.ozeliscilik)

    const masrafToplam =
      u.mekmarAlim + u.mekmozAlim + u.disAlim + m.tutar.nakliye + m.tutar.gumruk +
      m.tutar.lashing + m.tutar.booking + m.tutar.spazlet + m.tutar.ilaclama +
      m.tutar.liman + p.navlunAlis + pazarlama + o.bankaMasrafi +
      p.digerMasraflar + ozelIscilik + kuryeMasrafi +
      /* [AY-1]: aylikta sigorta diger_masraflar'a girmiyor, toplama
       * AYRICA ekleniyor. Net toplam iki yolda da ayni. */
      (aylik ? p.sigorta : 0)

    const dovizKur = o.odenenToplam > 0
      ? o.sonKur
      : (rateByKey.get(`${p.yuk.year}-${p.yuk.month}-${p.yuk.day}`) ?? 0)

    const kapali = dosyaKapanma !== "-"
    const karZarar = kapali ? p.toplamBedel - masrafToplam : 0
    const karZararYuzde = kapali && p.toplamBedel !== 0 && karZarar !== 0
      ? Math.round(((karZarar / p.toplamBedel) * 100) * 100) / 100
      : 0
    const karZararTl = kapali && dovizKur !== 0 ? karZarar * dovizKur : 0

    /* navlun_kontrol: navlun evraki var ama musteriye navlun
     * faturalanmamis -> uyari. Python `len(navlun_evrak) > 0` ile
     * bakiyordu; alan metin oldugu icin ayni anlam. */
    const navlunKontrol = !(navlunEvrak.length > 0 && p.navlunSatis <= 0)

    /* Hicbir sey yoksa dosya kapanma tarihi = yukleme tarihi
     * (cost.py:629). '22KET01 - 3' icin de ayni -- o satir kaynakta
     * TEK BIR SIPARIS NUMARASI icin elle yazilmis, korundu. */
    if ((p.toplamBedel === 0 && o.odenenToplam === 0) || po === "22KET01 - 3") {
      dosyaKapanma = sqlDateTr(s.YuklemeTarihi)
    }

    /* Hem Mekmer hem Mekmoz ozel iscilik varsa ya da depo yuklemesi
     * varsa dis alim evraklari gosterilmiyor (cost.py:635-646). */
    const gizleDisAlim = (p.isciMekmer && p.isciMekmoz) || p.mekusVar

    return {
      id: s.ID,
      siparis_no: po,
      /*
       * NULL BASTIRILMIYOR. Python bu alanlari KOSULSUZ atiyor
       * (order.py:300-310), yani kolon null ise model varsayilani ""
       * EZILIYOR ve marshmallow String alani null dokuyor.
       * `?? ""` yazmak 2022'de operasyon/siparisci'de fark uretti,
       * karsilastirma yakaladi.
       *
       * siparis_tarihi / yukleme_tarihi FARKLI: Python onlari
       * `if != None` icinde atiyor, yani null tarihte varsayilan ""
       * kaliyor -- sqlDateTr zaten "" donduruyor.
       */
      marketing: s.Marketing,
      siparis_tarihi: sqlDateTr(s.SiparisTarihi),
      yukleme_tarihi: sqlDateTr(s.YuklemeTarihi),
      musteri_adi: s.MusteriAdi,
      ulke_adi: s.UlkeAdi,
      teslim_sekli: s.TeslimTur,
      toplam_bedel: p.toplamBedel,

      mekmar_alim: u.mekmarAlim,
      mekmoz_alim: u.mekmozAlim,
      dis_alim: u.disAlim,

      nakliye: m.tutar.nakliye,
      gumruk: m.tutar.gumruk,
      ilaclama: m.tutar.ilaclama,
      liman: m.tutar.liman,
      sigorta: p.sigorta,
      lashing: m.tutar.lashing,
      booking: m.tutar.booking,
      spazlet: m.tutar.spazlet,
      sigorta_tutar_satis: p.sigortaSatis,

      detay_1: p.detayAlis1,
      detay_2: p.detayAlis2,
      detay_3: p.detayAlis3,
      navlun: p.navlunAlis,
      navlun_satis: p.navlunSatis,

      operasyon: s.operasyon,
      siparisci: s.siparisci,
      faturatur: s.faturalama,

      diger_masraflar: p.digerMasraflar,
      pazarlama,
      banka_masrafi: o.bankaMasrafi,
      kurye_masrafi: kuryeMasrafi,
      masraf_toplam: masrafToplam,

      kar_zarar: karZarar,
      kar_zarar_tl: karZararTl,
      kar_zarar_tl_yuzdesi: karZararYuzde,
      doviz_kur: dovizKur,
      Kur: 0,

      odeme_tarihi: o.odemeTarihi,
      odenen_toplam_tutar: o.odenenToplam,
      odenen_try_tutar: o.tryToplam,
      odenen_usd_tutar: o.usdToplam,
      ortalama_kur: ortalamaKur,
      dosya_kapanma_date: dosyaKapanma,

      nakliye_evrak: m.link.nakliye,
      gumruk_evrak: m.link.gumruk,
      ilaclama_evrak: m.link.ilaclama,
      liman_evrak: m.link.liman,
      sigorta_evrak: "",
      navlun_evrak: navlunEvrak,
      lashing_evrak: m.link.lashing,
      booking_evrak: m.link.booking,
      spazlet_evrak: m.link.spazlet,
      satis_faturasi: m.satisFaturasi,

      mekmar_alim_evrak: mekmarAlimEvrak,
      mekmar_alim_evrak_sayisi: mekmarAlimEvrak.length,
      mekmoz_alim_evrak: mekmozAlimEvrak,
      mekmoz_alim_evrak_sayisi: mekmozAlimEvrak.length,
      dis_alim_evrak: gizleDisAlim ? [] : disAlimEvrak,
      dis_alim_evrak_sayisi: disAlimEvrak.length,
      dis_alim_tedarikci: gizleDisAlim ? [] : disAlimTedarikci,
      dis_alim_tedarikci_sayisi: gizleDisAlim ? 0 : disAlimTedarikci.length,
      tedarikci_sayisi: gizleDisAlim ? 0 : tedarikciSayisiEvrak.length,
      tedarikci_sayisi_evrak: tedarikciSayisiEvrak,
      ozel_iscilik_evrak: ozelIscilikEvrak,
      ozel_iscilik_sayisi: ozelIscilikEvrak.length,
      /* fields.Int() -> marshmallow int() ile KIRPIYOR (yukaridaki not). */
      ozel_iscilik: Math.trunc(ozelIscilik),

      dis_alim_fatura_sayisi: gizleDisAlim ? 0 : (nTedarikciGrup.get(po) ?? 0),

      evrak_id: null,
      tur_id: null,
      navlun_kontrol: navlunKontrol,
      /*
       * SEMA TIPI UYGULANIYOR -- bunu atlamak uc alanda fark uretti,
       * karsilastirma yakaladi:
       *
       *   sigorta_id   fields.Boolean()  mssql 0 veriyor, Python false
       *   mekus_id     fields.Int()      mssql false veriyor, Python 0
       *   ozel_iscilik fields.Int()      2174.7 -> Python 2174
       *
       * Yani Python'un govdesindeki tipleri SURUCU degil MARSHMALLOW
       * SEMASI belirliyor (model/cost.py:87/86/79). Int tarafinda
       * marshmallow `int(x)` kullaniyor, yani sifira dogru KIRPIYOR --
       * yuvarlamiyor.
       */
      sigorta_id: s.sigorta_id === null || s.sigorta_id === undefined ? null : Boolean(s.sigorta_id),
      mekus_masraf: p.detay4,
      mekus_id: s.depo_yukleme === null || s.depo_yukleme === undefined
        ? null
        : Math.trunc(Number(s.depo_yukleme)),

      yukleme_year: p.yuk.year,
      yukleme_month: p.yuk.month,
      yukleme_day: String(p.yuk.day),

      alisFiyatiKontrol: alisBosSet.has(po) ? (s.alisFiyatiControl ? "" : "#F1948A") : "",

      isciliktedarikcimekmer: p.isciMekmer,
      isciliktedarikcimekmoz: p.isciMekmoz,
      mekmer_alim_alis_kontrol: u.mekmerKontrol,
      mekmoz_alim_alis_kontrol: u.mekmozKontrol,
      dis_alim_alis_kontrol: u.disKontrol,
    }
  })
}
