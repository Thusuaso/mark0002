/*
 * Excel sunucusundaki `/reports/gu/forwarding` ucunun Nitro karsiligi
 * (GU yil bazli sevkiyat raporu).
 *
 * Cagri yeri:
 *   app/pages/reports/mekmar/gu.vue -> forwarding_excel_output()
 *
 * ---------------------------------------------------------------------
 * KAYNAK (okundu)
 * ---------------------------------------------------------------------
 *   web.py:3111   ReportsGuForwardingApi
 *   web.py:2043   gu_forwarding  <-- govde burada
 *
 * Sablon: excel/sablonlar/gu_excel.xlsx, sayfa 'Sayfa1'.
 *
 * ---------------------------------------------------------------------
 * DUZEN: 11 YIL BLOGU YAN YANA, HER BIRI 4 SUTUN
 * ---------------------------------------------------------------------
 *   satir 1  column   : yil etiketi -> kenarlik + kalin 13 + ORTALI + defb00
 *   satir 2  column   : 'Month' -> kenarlik + kalin 13 + ORTALI
 *            column+1 : 'FOB'   -> ayni
 *            column+2 : 'DDP'   -> ayni   (ucunde DOLGU YOK)
 *   satir 3+ column   : Ay   -> sadece kenarlik
 *            column+1 : Fob  -> sadece kenarlik
 *            column+2 : Ddp  -> sadece kenarlik
 *   son satir column  : 'Total' -> kenarlik + kalin 13 + ORTALI + defb00
 *            column+1 : fob toplami -> kenarlik + kalin 13 + defb00
 *            column+2 : ddp toplami -> ayni
 *
 *   Bloklar: column = 1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41
 *   (Python'da `column += 4`.)
 *
 * Govde: `[{ data: [{ Ay, Fob, Ddp }] }]`
 *
 * [!] ANAHTAR ADLARI KARDES UCTAN FARKLI: burada `Ay` / `Fob` / `Ddp`,
 *     /gu/reports/seller/operation/* uclarinda `Month` / `FOB` / `DDP`.
 *     Kaynaktaki bu tutarsizlik korundu -- istemciyi baglar.
 *
 * =====================================================================
 * [!] YIL ETIKETLERI SABIT YAZILI -- URETIMDE ZATEN YANLIS
 * =====================================================================
 * Python yil basliklarini VERIDEN TURETMIYOR; 11 tanesini elle
 * yaziyor (web.py:2065-2073):
 *
 *     sayfa.cell(1, column=1,  value='2024')
 *     sayfa.cell(1, column=5,  value='2023')
 *     ...
 *     sayfa.cell(1, column=41, value='2014')
 *
 * Yani rapor hangi yillarin verisiyle uretilirse uretilsin basliklar
 * HER ZAMAN 2024..2014 yazar. 2026'da alinan bir rapor en guncel
 * yili "2024" olarak etiketler.
 *
 * DAVRANIS BIREBIR KORUNDU -- duzeltilmedi. Gerekce: dogru etiket
 * ancak verinin hangi yila ait oldugu BILINIRSE yazilabilir, ama
 * govdede yil alani YOK (yalnizca `data` dizisi var; kardes uclarda
 * `year` alani varken burada yok). Tahminle (orn. "bu yildan geriye
 * say") etiket uretmek, veri gercekten 2024..2014 ise raporu
 * BOZARDI. Dogru cozum istemcinin yil bilgisini de gondermesi; bu
 * ayri bir karar ve cagri yerini degistirmeyi gerektiriyor.
 */

const YEAR_LABELS = [
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
] as const

interface GuForwardingItem {
  Ay?: string | number | null
  Fob?: number | null
  Ddp?: number | null
}

interface GuForwardingBlock {
  data?: GuForwardingItem[] | null
}

export default defineEventHandler(async (event) => {
  const blocks = requireList<GuForwardingBlock>(await readBody(event))

  const buffer = await fillTemplate(
    { template: "gu_excel.xlsx", sheetName: "Sayfa1" },
    (sheet) => {
      /*
       * --- 11 yil basligi ve sutun basliklari ---
       *
       * Python bunlari VERIDEN BAGIMSIZ yaziyor: kac blok gelirse
       * gelsin 11 baslik da olusuyor. Davranis korundu.
       */
      YEAR_LABELS.forEach((label, index) => {
        const column = 1 + index * 4

        const header = sheet.getCell(1, column)
        header.value = label
        header.style = {
          border: THIN,
          font: BOLD_13,
          alignment: CENTER,
          fill: TOTAL_FILL,
        }

        /* Sutun basliklari -- dolgu YOK */
        ;["Month", "FOB", "DDP"].forEach((text, offset) => {
          const cell = sheet.getCell(2, column + offset)
          cell.value = text
          cell.style = { border: THIN, font: BOLD_13, alignment: CENTER }
        })
      })

      /*
       * Yil basliklari UC SUTUNA BIRLESTIRILIYOR (web.py:2306-2317):
       *   A1:C1, E1:G1, I1:K1, ... AO1:AQ1  (11 adet)
       *
       * Sablonda birlestirme YOK -- hepsini kod yapiyor. Ilk surumde
       * bu atlanmisti ve karsilastirma yakaladi:
       *   birlestirme: 11 / 0 FARKLI
       * (deger, bicim ve stil farki 0'di; yani yalnizca birlestirme
       *  eksikti ve gozle bakmakla fark edilmesi zordu.)
       *
       * Birlestirme basliklar YAZILDIKTAN SONRA yapiliyor: exceljs'te
       * kole hucreye yazmak master'i eziyor (gerekcesi
       * ../reports/production.post.ts icinde).
       */
      YEAR_LABELS.forEach((_, index) => {
        const column = 1 + index * 4
        sheet.mergeCells(1, column, 1, column + 2)
      })

      /* --- veri bloklari --- */
      let column = 1

      for (const block of blocks) {
        let satir = 3
        let fobTotal = 0
        let ddpTotal = 0

        for (const item of block.data ?? []) {
          const values = [item.Ay ?? null, item.Fob ?? null, item.Ddp ?? null]

          values.forEach((v, offset) => {
            const cell = sheet.getCell(satir, column + offset)
            cell.value = v as never
            borderOnly(cell)
          })

          fobTotal += nc(item.Fob)
          ddpTotal += nc(item.Ddp)

          satir += 1
        }

        totalCell(sheet.getCell(satir, column), { center: true }).value = "Total"
        totalCell(sheet.getCell(satir, column + 1)).value = fobTotal
        totalCell(sheet.getCell(satir, column + 2)).value = ddpTotal

        /* Python: column += 4 */
        column += 4
      }
    },
  )

  return sendXlsxBuffer(event, buffer, "gu_excel.xlsx")
})
