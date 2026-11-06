/*
 * GU satisci/operasyon ozet raporu -- IKI UCUN PAYLASTIGI GOVDE.
 *
 * ---------------------------------------------------------------------
 * KAYNAK (okundu)
 * ---------------------------------------------------------------------
 *   web.py:3078  GuReportsSellerAndOperationOrdersExcelApi
 *                  -> /gu/reports/seller/operation/orders
 *   web.py:3079  GuReportsSellerAndOperationForwardingExcelApi
 *                  -> /gu/reports/seller/operation/forwarding
 *   component/excel.py:531  getGuRaporlariSatisciOperasyonOrders
 *   component/excel.py:677  getGuRaporlariSatisciOperasyonShipped
 *
 * IKI PYTHON FONKSIYONU BIREBIR AYNI -- tek fark baslik kelimesi:
 *   orders   : "<yil> Seller Orders"  / "<yil> Operation Orders"
 *   forwarding: "<yil> Seller Shipped" / "<yil> Operation Shipped"
 *
 * Satir/sutun konumlari, sablon, govde anahtarlari, toplam hucreleri
 * ve dongu yapisi karakter karakter ayni (ikisi de 120 satirlik kopya).
 * Bu yuzden burada TEK uretici var, uclar yalnizca etiketi veriyor.
 *
 * ---------------------------------------------------------------------
 * SABIT KONUMLU IZGARA -- SABLON HER SEYI TASIYOR
 * ---------------------------------------------------------------------
 * Sablon: excel/sablonlar/gu_reports_summary.xlsx, sayfa 'Sayfa1'.
 * Python HIC stil uygulamiyor; yalnizca sabit hucrelere deger yaziyor.
 * Ay adlari, basliklar disindaki tum gorsel duzen sablonda.
 *
 * Duzen (her blok 3 sutun: Ay | FOB | DDP):
 *
 *   SELLER     baslik satir 1    veri satir 3..    toplam satir 14
 *   OPERATION  baslik satir 16   veri satir 18..   toplam satir 29
 *
 *   bu yil      sutun 1, 2, 3
 *   gecen yil   sutun 5, 6, 7
 *   iki yil on. sutun 9, 10, 11
 *
 * ---------------------------------------------------------------------
 * YIL, VERIDEN DEGIL SUNUCU SAATINDEN
 * ---------------------------------------------------------------------
 * Python basliklari `datetime.datetime.now().year` ile kuruyor, yani
 * yil GOVDEDEN GELMIYOR -- sunucunun o anki tarihinden. Davranis
 * birebir korundu (Nitro sunucusunun saati kullaniliyor).
 *
 * [!] BILINMESI GEREKEN: istemci hangi yillarin verisini gonderdiyse
 *     gondersin basliklar HER ZAMAN "bu yil / -1 / -2" yazar. Yil sonu
 *     gecislerinde veya gecmis yil raporu alinirken baslik ile icerik
 *     uyusmayabilir. Kaynaktaki davranis bu; degistirmek istemciyi de
 *     ilgilendiren ayri bir karar.
 */

/** Python __months (component/excel.py:514) karsiligi. */
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const

/*
 * Ay numarasini adina cevirir.
 *
 * PYTHON'DAN FARK: kaynak `return months[val]` yapiyor, yani 1..12
 * disinda bir deger (veya None) KeyError firlatiyor ve ucun TAMAMI
 * dusuyor -- istemci govdedeki status'u kontrol etmedigi icin
 * kullanici sessizce ESKI dosyayi indiriyor. Burada gecersiz ay bos
 * hucre birakiyor; rapor uretilmeye devam ediyor.
 */
function monthName(value: unknown): string | null {
  const n = typeof value === "number" ? value : Number(value)
  if (!Number.isInteger(n) || n < 1 || n > 12) return null
  return MONTHS[n - 1]!
}

export interface GuMonthRow {
  Month?: number | null
  FOB?: number | null
  DDP?: number | null
}

export interface GuSummaryBody {
  thisYearSeller?: GuMonthRow[] | null
  previousYearSeller?: GuMonthRow[] | null

  /* Anahtar adindaki fazladan "Year" KAYNAKTA BOYLE -- korundu. */
  twoYearAgoYearSeller?: GuMonthRow[] | null

  thisYearOperation?: GuMonthRow[] | null
  previousYearOperation?: GuMonthRow[] | null
  twoYearAgoOperation?: GuMonthRow[] | null
}

/** Bir bloga karsilik gelen satir/sutun konumlari. */
interface BlockSpec {
  titleRow: number
  firstDataRow: number
  totalRow: number
  monthColumn: number
}

const SELLER_BLOCK = { titleRow: 1, firstDataRow: 3, totalRow: 14 }
const OPERATION_BLOCK = { titleRow: 16, firstDataRow: 18, totalRow: 29 }

/** Yil ofsetine gore blogun ay sutunu: 1, 5, 9. */
const MONTH_COLUMNS = [1, 5, 9] as const

/*
 * `label` = "Orders" veya "Shipped".
 */
export async function buildGuSummary(
  body: GuSummaryBody,
  label: "Orders" | "Shipped",
): Promise<Buffer> {
  const year = new Date().getFullYear()

  /*
   * Bloklar Python'daki yazma sirasiyla: once uc SELLER, sonra uc
   * OPERATION. Sira ciktiyi etkilemiyor (hepsi ayri hucreler) ama
   * kaynakla karsilastirmayi kolaylastiriyor.
   */
  const blocks: { spec: BlockSpec; title: string; rows: GuMonthRow[] }[] = [
    ...MONTH_COLUMNS.map((monthColumn, offset) => ({
      spec: { ...SELLER_BLOCK, monthColumn },
      title: `${year - offset} Seller ${label}`,
      rows:
        (offset === 0
          ? body.thisYearSeller
          : offset === 1
            ? body.previousYearSeller
            : body.twoYearAgoYearSeller) ?? [],
    })),
    ...MONTH_COLUMNS.map((monthColumn, offset) => ({
      spec: { ...OPERATION_BLOCK, monthColumn },
      title: `${year - offset} Operation ${label}`,
      rows:
        (offset === 0
          ? body.thisYearOperation
          : offset === 1
            ? body.previousYearOperation
            : body.twoYearAgoOperation) ?? [],
    })),
  ]

  return await fillTemplate(
    { template: "gu_reports_summary.xlsx", sheetName: "Sayfa1" },
    (sheet) => {
      for (const { spec, title, rows } of blocks) {
        const { monthColumn } = spec
        const fobColumn = monthColumn + 1
        const ddpColumn = monthColumn + 2

        sheet.getCell(spec.titleRow, monthColumn).value = title

        let satir = spec.firstDataRow
        let fobTotal = 0
        let ddpTotal = 0

        for (const item of rows) {
          sheet.getCell(satir, monthColumn).value = monthName(item.Month)
          sheet.getCell(satir, fobColumn).value = item.FOB ?? null
          sheet.getCell(satir, ddpColumn).value = item.DDP ?? null

          /*
           * Python `+= item['FOB']` yapiyor, yani bos deger TypeError
           * firlatip ucu dusuruyor. nc() bos degeri 0 sayiyor.
           */
          fobTotal += nc(item.FOB)
          ddpTotal += nc(item.DDP)

          satir += 1
        }

        sheet.getCell(spec.totalRow, fobColumn).value = fobTotal
        sheet.getCell(spec.totalRow, ddpColumn).value = ddpTotal
      }
    },
  )
}
