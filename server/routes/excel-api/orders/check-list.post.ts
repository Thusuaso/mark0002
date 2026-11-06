/*
 * Excel sunucusundaki `/excel/check/list` ucunun Nitro karsiligi
 * (ceki listesi / packing list).
 *
 * Cagri yeri:
 *   app/components/orderDetail/CheckForm.vue -> ceki listesi butonu
 *
 * ---------------------------------------------------------------------
 * KAYNAK (okundu)
 * ---------------------------------------------------------------------
 *   web.py:3042  SiparisCekiListesiApi
 *   web.py:2732  post -> ExcellCiktiIslem().ceki_listesi_excel(data)
 *                get  -> send_file('excel/dosyalar/ceki_listesi.xlsx')
 *   web.py:180   ceki_listesi_excel  <-- govde burada
 *
 * Sablon: excel/sablonlar/ceki_listesi.xlsx, sayfa **'Sheet'**
 * (digerlerinin cogu 'Sayfa1'; bu uc farkli).
 *
 * Govde: { po, list: [ { Sira, KasaNo, KategoriAdi, YuzeyIslem,
 *          UrunAdi, Kenar, En, Boy, KutuAdet, Adet, KasaOlcusu,
 *          BirimAdi, Miktar, Ton, GrupTon, KasaGrupIlk } ] }
 *
 * ---------------------------------------------------------------------
 * ORTAK KASA GRUPLAMASI (kaynaktaki en son eklenen davranis)
 * ---------------------------------------------------------------------
 * Satirlar `Sira` alanina gore ARDISIK gruplanir: ayni Sira degerini
 * tasiyan BITISIK satirlar tek fiziksel kasadir. Grup birden fazla
 * satir iceriyorsa `#` (sutun 1), net (14) ve gross (15) hucreleri
 * grup boyunca DIKEY BIRLESTIRILIR ve ortalanir.
 *
 * `Sira` gelmiyorsa her satir kendi basina bir kasadir (eski davranis).
 * Kaynaktaki yorumlar bu mantigin api tarafindaki `kasaGruplariniUygula`
 * ile eslestigini soyluyor.
 *
 * ---------------------------------------------------------------------
 * M2 HESABINDA IKI OZEL DURUM
 * ---------------------------------------------------------------------
 * Birim 'Sqm' iken miktar KUTU ADEDINDEN turetiliyor, ama yalnizca iki
 * ozel olcude:
 *   En='ANT'  ve Boy='PAT' -> round(0.74338688 * KutuAdet, 2)
 *   En='20,3' ve Boy='SET' -> round(0.494914   * KutuAdet, 2)
 *   aksi halde             -> Miktar (oldugu gibi)
 * Bu sabitler kaynaktan birebir alindi.
 *
 * ---------------------------------------------------------------------
 * BOS DEGER DAVRANISI -- PYTHON'DAN FARK
 * ---------------------------------------------------------------------
 * Python `int(urun['KutuAdet'])` ve `float(urun['Miktar'])` cagiriyor;
 * bos deger TypeError firlatip ucun TAMAMINI dusuruyor ve istemci
 * govdedeki status'u kontrol etmedigi icin kullanici SABLON KOPYASINI
 * (bos ceki listesi) indiriyor. Burada bos degerler 0 sayiliyor.
 *
 * `net` icin Python'un kendi kontrolu VAR ve korundu: None, 'None'
 * veya 'undefined' ise agirliklar 0 yazilir ama kasa SAYILIR.
 */

/*
 * BU UCTA restyle KULLANILIYOR, borderOnly DEGIL.
 *
 * Sablonun veri hucrelerinde HUCRE BAZLI yazi tipi var (Arial 10) ve
 * openpyxl `cell.border = x` dedigINde o yazi tipini KORUYOR.
 * borderOnly() stilin tamamini degistirdigi icin yazi tipi kayboluyor
 * ve hucreler Calibri 11'e dusuyordu -- olculdu: 64 hucrede
 *   py    punto=10 ad=Arial
 *   nitro punto=11 ad=Calibri
 * Gorunur bir fark (yazi tipi ve boyutu). Secim kurali
 * server/utils/xlsx-template.ts icindeki borderOnly notunda.
 */

interface CheckRow {
  Sira?: string | number | null
  KasaNo?: string | number | null
  KategoriAdi?: string | null
  YuzeyIslem?: string | null
  UrunAdi?: string | null
  Kenar?: string | number | null
  En?: string | number | null
  Boy?: string | number | null
  KutuAdet?: number | null
  Adet?: number | null
  KasaOlcusu?: string | null
  BirimAdi?: string | null
  Miktar?: number | null
  Ton?: number | string | null
  GrupTon?: number | string | null
  KasaGrupIlk?: boolean | null
}

interface CheckBody {
  po?: string | null
  list?: CheckRow[] | null
}

/*
 * Python: Font(name='Calibri', size=11, bold=True, color='FF000000')
 * Toplam ve etiket hucrelerinde kullaniliyor.
 */
const FONT_BOLD_11 = {
  name: "Calibri",
  size: 11,
  bold: true,
  italic: false,
  underline: false,
  strike: false,
  color: { argb: "FF000000" },
} as const

/*
 * SABLONUN VARSAYILAN YAZI TIPI -- ELLE VERILMESI ZORUNLU.
 *
 * ceki_listesi.xlsx'in stil tablosundaki 0. yazi tipi (yani hicbir
 * stili olmayan hucrelerin kullandigi varsayilan) ARIAL 10. Sablonda
 * veri satirlarinda hucre YOK (A11 bile tanimsiz), dolayisiyla
 * openpyxl yeni hucreyi stil 0 ile olusturuyor ve cikti Arial 10
 * oluyor.
 *
 * exceljs ise cikti stil tablosunu YENIDEN KURUYOR ve yazi tipi
 * siralamasi degisiyor; sonucta stilsiz hucreler sablonun ikinci
 * yazi tipine (TAHOMA 10) dusuyor. Olculdu: 64 hucrede
 *   py    ad=Arial  punto=10
 *   nitro ad=Tahoma punto=10
 * Gorunur bir fark. Bu yuzden veri hucrelerine yazi tipi ACIKCA
 * veriliyor.
 */
const ARIAL_10 = { name: "Arial", size: 10 } as const

/*
 * Hucreye TAM stil atar; mevcut/kalitilan stili TASIMAZ.
 *
 * ---------------------------------------------------------------------
 * NEDEN restyle DEGIL
 * ---------------------------------------------------------------------
 * Bu sablonda bazi sutunlarin SUTUN DUZEYINDE hizalamasi var
 * (orn. O sutunu: horizontal=center). openpyxl yeni bir hucre
 * olustururken sutun stilini hucreye TASIMIYOR; exceljs'in
 * `cell.style` okuyucusu ise tasiyor ve restyle onu geri yaziyor.
 *
 * Olculdu: O13/O14/O15 hucreleri
 *   py    hiza=-/-
 *   nitro hiza=center/-
 * ve footer'daki A24/E24 hucreleri yazi tipi olarak Tahoma'ya
 * dusuyordu (sablonun varsayilani Arial 10 oldugu halde).
 *
 * Tam atama her iki sorunu da cozuyor: hucre tam olarak openpyxl'in
 * urettigi gibi "varsayilan yazi tipi + verilen stil" oluyor.
 */
const setStyle = (
  cell: { style: Record<string, unknown> },
  patch: Record<string, unknown> = {},
) => {
  cell.style = { border: THIN, font: ARIAL_10, ...patch }
}

/** Python: round(x, 2) -- yarim yukari, iki basamak. */
const round2 = (n: number) => Math.round(n * 100) / 100

export default defineEventHandler(async (event) => {
  const body = requireObject<CheckBody>(await readBody(event))
  const items = body.list ?? []

  const buffer = await fillTemplate(
    { template: "ceki_listesi.xlsx", sheetName: "Sheet" },
    (sheet) => {
      /* Baslik: "<PO> Packing List" (sabit hucre A6). */
      sheet.getCell(6, 1).value = `${body.po ?? ""} Packing List`

      /*
       * --- ardisik 'Sira' gruplamasi ---
       * Python ile BIREBIR: anahtar null DEGILSE ve son grubun
       * anahtariyla ayniysa o gruba eklenir, aksi halde yeni grup.
       */
      const crates: { key: unknown; rows: CheckRow[] }[] = []

      for (const item of items) {
        const key = item.Sira
        const last = crates[crates.length - 1]

        if (key != null && last && last.key === key) last.rows.push(item)
        else crates.push({ key, rows: [item] })
      }

      let satir = 11
      let index = 1

      let totalM2 = 0
      let totalPiece = 0
      let totalMt = 0
      let totalNet = 0
      let totalGross = 0
      let crateCount = 0

      for (const crate of crates) {
        const crateFirstRow = satir

        for (const item of crate.rows) {
          /*
           * Python: `item.get('Sira', index)` -- alan YOKSA satir
           * sayaci, VARSA ama None ise bos dizge.
           */
          const siraNo =
            "Sira" in item ? (item.Sira == null ? "" : item.Sira) : index

          const cells: [number, string | number | null][] = [
            [1, siraNo as string | number],
            [2, item.KasaNo ?? null],
            [3, item.KategoriAdi ?? null],
            [4, item.YuzeyIslem ?? null],
            [5, item.UrunAdi ?? null],
            [6, item.Kenar ?? null],
            [7, item.En ?? null],
            [8, item.Boy ?? null],
            [9, item.KutuAdet ?? null],
            [10, item.Adet ?? null],
            [16, item.KasaOlcusu ?? null],
          ]

          for (const [col, value] of cells) {
            const cell = sheet.getCell(satir, col)
            cell.value = value
            setStyle(cell)
          }

          /* --- miktar sutunlari (m2 / pcs / mt) --- */
          const birim = item.BirimAdi
          const kutu = Math.trunc(nc(item.KutuAdet))

          let m2 = 0
          let pcs = 0
          let mt = 0

          if (birim === "Sqm") {
            if (item.En === "ANT" && item.Boy === "PAT") m2 = round2(0.74338688 * kutu)
            else if (item.En === "20,3" && item.Boy === "SET") m2 = round2(0.494914 * kutu)
            else m2 = nc(item.Miktar)
          } else if (birim === "Pcs") {
            pcs = nc(item.Miktar)
          } else if (birim === "Mt") {
            mt = nc(item.Miktar)
          }

          /*
           * Python birim kumesine bakip ilgili sutuna degeri, digerlerine
           * BOS DIZGE yaziyor (null degil) -- korundu.
           */
          const quantity: [number, boolean, number][] = [
            [11, birim === "Sqm", m2],
            [12, birim === "Pcs", pcs],
            [13, birim === "Mt", mt],
          ]

          for (const [col, active, value] of quantity) {
            const cell = sheet.getCell(satir, col)
            cell.value = active ? value : ""
            setStyle(cell)
          }

          if (birim === "Sqm") totalM2 += m2
          else if (birim === "Pcs") totalPiece += pcs
          else if (birim === "Mt") totalMt += mt

          /* --- net / gross: kasa basina BIR KEZ --- */
          const groupFirst = item.KasaGrupIlk ?? true
          const net = item.GrupTon ?? item.Ton

          const netCell = sheet.getCell(satir, 14)
          const grossCell = sheet.getCell(satir, 15)

          if (!groupFirst) {
            netCell.value = ""
            grossCell.value = ""
          } else if (net == null || net === "None" || net === "undefined") {
            crateCount += 1
            netCell.value = 0
            grossCell.value = 0
          } else {
            /* Python: int(float(net)) -- tam sayiya KIRPIYOR. */
            const netKg = Math.trunc(nc(net))
            crateCount += 1
            totalNet += netKg
            totalGross += netKg + 30
            netCell.value = netKg
            /* Dara sabit 30 kg (kaynakta da sabit). */
            grossCell.value = netKg + 30
          }

          setStyle(netCell)
          setStyle(grossCell)

          satir += 1
          index += 1
        }

        /*
         * Grup birden fazla satirsa #, net ve gross dikey birlestirilir.
         * Birlestirme DEGERLER YAZILDIKTAN SONRA yapiliyor: exceljs'te
         * kole hucreye yazmak master'i eziyor (gerekcesi
         * ../reports/production.post.ts icinde).
         */
        if (crate.rows.length > 1) {
          const crateLastRow = satir - 1

          for (const col of [1, 14, 15]) {
            sheet.mergeCells(crateFirstRow, col, crateLastRow, col)
            setStyle(sheet.getCell(crateFirstRow, col), { alignment: CENTER })
          }
        }
      }

      /* --- toplam satiri: sutun 11..15, kalin + kenarlik --- */
      const totals: [number, number][] = [
        [11, totalM2],
        [12, totalPiece],
        [13, totalMt],
        [14, Math.trunc(totalNet)],
        [15, Math.trunc(totalGross)],
      ]

      for (const [col, value] of totals) {
        const cell = sheet.getCell(satir, col)
        cell.value = value
        setStyle(cell, { font: FONT_BOLD_11 })
      }

      /*
       * --- alt bilgi blokları ---
       *
       * Python her blok icin `satir += 2` yapiyor ve A:B / C:D
       * birlestiriyor; birlesmenin ICINDEKI hucrelere de ayrica
       * kenarlik veriyor (gorunmez ama korundu).
       */
      const labelPair = (row: number, label: string, value: string) => {
        sheet.mergeCells(row, 1, row, 2)
        const l = sheet.getCell(row, 1)
        l.value = label
        setStyle(l, { font: FONT_BOLD_11, alignment: CENTER })
        setStyle(sheet.getCell(row, 2))

        sheet.mergeCells(row, 3, row, 4)
        const v = sheet.getCell(row, 3)
        v.value = value
        setStyle(v, { font: FONT_BOLD_11, alignment: CENTER })
        setStyle(sheet.getCell(row, 4))
      }

      satir += 2
      labelPair(satir, "TOTAL CASES", `${crateCount} W.CASES`)

      satir += 2
      labelPair(satir, "TOTAL NET KG", `${totalNet} kgs`)

      satir += 2
      /* Sondaki BOSLUK kaynakta var: "TOTAL GROSS KG " */
      labelPair(satir, "TOTAL GROSS KG ", `${totalGross} kgs`)

      /*
       * --- serbest metin alanlari ---
       * Her biri: baslik satiri (birlesik) + altinda 3 satirlik
       * birlesik bos alan; hepsinin hucrelerine kenarlik.
       */
      const textBlock = (
        row: number,
        firstCol: number,
        lastCol: number,
        title: string,
      ) => {
        sheet.mergeCells(row, firstCol, row, lastCol)
        const head = sheet.getCell(row, firstCol)
        head.value = title
        setStyle(head, { font: FONT_BOLD_11, alignment: CENTER })

        for (let col = firstCol + 1; col <= lastCol; col++) {
          setStyle(sheet.getCell(row, col))
        }

        sheet.mergeCells(row + 1, firstCol, row + 3, lastCol)
        for (let rr = row + 1; rr <= row + 3; rr++) {
          for (let col = firstCol; col <= lastCol; col++) {
            setStyle(sheet.getCell(rr, col))
          }
        }
      }

      satir += 2
      textBlock(satir, 1, 4, "EK AÇIKLAMALAR")
      textBlock(satir, 5, 15, "KASA ÖLÇÜLERİ")

      satir += 5
      textBlock(satir, 1, 4, "KONTEYNER İÇİ DAĞILIM")
      textBlock(satir, 5, 15, "YÜKLEME TOPLANTISI NOTLARI")
    },
  )

  return sendXlsxBuffer(event, buffer, "ceki_listesi.xlsx")
})
