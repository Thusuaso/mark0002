/*
 * Uretim listesi Excel'i -- `/siparisler/dosyalar/uretimExcelCikti`
 * ucunun govdesi.
 *
 * ---------------------------------------------------------------------
 * KAYNAK (okundu)
 * ---------------------------------------------------------------------
 *   web.py:3049                   UretimExcelCiktiApi
 *   component/orders/excel.py:226 post -> ExcelCiktiIslem().uretimCikti(data)
 *                                 get  -> send_file(
 *                                   'excel/dosyalar/Uretim_list.xlsx')
 *   component/orders/excel.py:18  uretimCikti        <-- ust bolum
 *   component/orders/excel.py:183 __getOzelIscilik   <-- alt bolum sorgusu
 *
 * Sablon: excel/sablonlar/Uretim_list.xlsx, sayfa **'Sheet'**.
 *
 * ---------------------------------------------------------------------
 * IKI BOLUM, IKI KAYNAK
 * ---------------------------------------------------------------------
 * 1) UST BOLUM  -- govdeden gelen siparis listesi.
 * 2) ALT BOLUM  -- "ÖZEL İŞÇİLİK YAPILACAKLAR" basligi ve altinda
 *    VERITABANINDAN cekilen satirlar (SiparisDurumID=2 olan ve
 *    SiparisEkstraGiderlerTB kaydi bulunan urunler).
 *
 * Yani bu uc, digerlerinin aksine VERITABANINA GIDIYOR. Tersine
 * cozmeyle bu bolum ASLA bulunamazdi: ornek govdeyle uretilen dosyada
 * alt bolum bos geldigi icin yalnizca baslik satiri gorunuyordu.
 *
 * ---------------------------------------------------------------------
 * SIPARIS GRUPLAMASI VE SUTUN CIFTLERI
 * ---------------------------------------------------------------------
 * Satirlar SiparisNo'ya gore gruplanir. Her grup icin DORT alan IKI
 * KEZ yazilir:
 *
 *   tek sutunlar (1,3,5,7)  -> grubun HER satirinda, duz
 *   cift sutunlar (2,4,6,8) -> yalnizca grubun ILK satirinda, ortali
 *                              ve grup boyunca DIKEY BIRLESIK
 *
 * Alanlar: Operasyon (1-2), Tarih (3-4), Musteri (5-6), PO (7-8).
 * Geri kalan sutunlar (9..17) her satirda bir kez.
 *
 * [!] PYTHON'UN IC DONGUSU TUM LISTEYI TARIYOR ama indis sayaci
 *     (`item = item + m`) gruplarin ARDISIK oldugunu varsayiyor.
 *     Veri siralı geldigi icin sonuc "ardisik SiparisNo gruplamasi"na
 *     esit; burada dogrudan o uygulandi. Veri karisik gelirse
 *     Python'un kendisi de bozulurdu (ayni satirlari birden fazla
 *     grupta yazardi).
 *
 * ---------------------------------------------------------------------
 * BIRIM ESLEMESI -- `UrunBirimID` ILE, `BirimAdi` ILE DEGIL
 * ---------------------------------------------------------------------
 *   1 -> 'M2'    2 -> 'Adet'    3 -> 'MT'    digerleri -> BOS
 *
 * Tersine cozmede bu "Sqm->M2, Pcs->Adet" diye cikarilmisti (veriyle
 * ortusuyordu) ve UCUNCU DAL (MT) tamamen kacirilmisti.
 */

/** Python: 1 -> M2, 2 -> Adet, 3 -> MT, aksi halde hucre bos. */
function unitName(id: unknown): string | null {
  const n = typeof id === "number" ? id : Number(id)
  if (n === 1) return "M2"
  if (n === 2) return "Adet"
  if (n === 3) return "MT"
  return null
}

/** `En x Boy x Kenar` -- Python'da ARALARDA BOSLUK YOK. */
function sizeText(en: unknown, boy: unknown, kenar: unknown): string {
  const t = (v: unknown) => (v == null ? "" : String(v))
  return `${t(en)}x${t(boy)}x${t(kenar)}`
}

export interface UretimRow {
  SiparisNo?: string | null
  OperasyonAdi?: string | null
  SiparisTarihi?: string | null
  FirmaAdi?: string | null
  UrunAdi?: string | null
  UrunUretimAciklama?: string | null
  En?: string | number | null
  Boy?: string | number | null
  Kenar?: string | number | null
  UrunFirmaAdi?: string | null
  Miktar?: number | null
  Uretim?: number | null
  UrunBirimID?: number | null
  Adet?: number | null
}

/*
 * Alt bolum sorgusu -- component/orders/excel.py:185'teki SQL'in
 * aynisi. Python sonucu DIZI olarak okuyup koselerine indisle
 * eriyordu ([1], [3], [5] ...); burada kolon adlari kullaniliyor,
 * boylece sorgudaki sutun sirasi degisirse sessizce kaymiyor.
 *
 * VERITABANINA YAZMIYOR: tek bir select.
 */
const OZEL_ISCILIK_SQL = `
  select
    seg.Aciklama IscilikAciklama,
    s.SiparisNo,
    su.MusteriAciklama,
    su.UretimAciklama as UrunUretimAciklama,
    k.KategoriAdi,
    urun.UrunAdi,
    yk.YuzeyIslemAdi,
    ol.En,
    ol.Boy,
    ol.Kenar,
    su.Miktar,
    birim.BirimAdi,
    (select KullaniciAdi from KullaniciTB kullanici where kullanici.ID = s.Operasyon) as OperasyonAdi,
    s.SiparisTarihi,
    (select FirmaAdi from MusterilerTB musteri where musteri.ID = s.MusteriID) as FirmaAdi,
    (select FirmaAdi from TedarikciTB tedarikci where tedarikci.ID = su.TedarikciID) as UrunFirmaAdi,
    su.UrunBirimID
  from SiparisEkstraGiderlerTB seg
  inner join SiparislerTB s on s.SiparisNo = seg.SiparisNo
  inner join SiparisUrunTB su on su.UrunKartID = seg.UrunKartID
  inner join UrunKartTB uk on uk.ID = seg.UrunKartID
  inner join KategoriTB k on k.ID = uk.KategoriID
  inner join UrunlerTB urun on urun.ID = uk.UrunID
  inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
  inner join OlculerTB ol on ol.ID = uk.OlcuID
  inner join UrunBirimTB birim on birim.ID = su.UrunBirimID
  where s.SiparisDurumID = 2
`

interface IscilikRow {
  SiparisNo?: string | null
  UrunUretimAciklama?: string | null
  UrunAdi?: string | null
  En?: string | number | null
  Boy?: string | number | null
  Kenar?: string | number | null
  Miktar?: number | null
  OperasyonAdi?: string | null
  SiparisTarihi?: string | null
  FirmaAdi?: string | null
  UrunFirmaAdi?: string | null
  UrunBirimID?: number | null
}

/** Ardisik SiparisNo gruplamasi. */
function groupByPo<T extends { SiparisNo?: string | null }>(rows: T[]) {
  const groups: { po: string | null | undefined; rows: T[] }[] = []

  for (const row of rows) {
    const last = groups[groups.length - 1]
    if (last && last.po === row.SiparisNo) last.rows.push(row)
    else groups.push({ po: row.SiparisNo, rows: [row] })
  }

  return groups
}

/*
 * HUCRE YAZIMI `write()` ILE -- elle `cell.style` atamasi YOK.
 *
 * Bu sablonda 17 sutunun HEPSINDE sutun duzeyinde stil var
 * (`<col ... style="1|4|...">`): sayi bicimi, kenarlik, hizalama dahil.
 * openpyxl'in davranisi ikiye ayriliyor ve TEK bir kural yetmiyor --
 * olculdu (41 satirlik gercek veriyle):
 *   her yerde "koru"     -> 137 bicim + 134 stil farki
 *   her yerde "sifirla"  -> 314 bicim + 398 stil farki
 * Dogru kural hucre bazinda; `write()` onu uyguluyor (gerekcesi
 * server/utils/xlsx-template.ts icindeki templateOwnStyleCells'te).
 */

/* Python'daki PatternFill(start_color='FF' + 'F8312F') */
const SECTION_FILL = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "FFF8312F" },
  bgColor: { argb: "FFF8312F" },
} as const

export async function buildUretimExcel(rows: UretimRow[]): Promise<Buffer> {
  const iscilik = await dbQuery<IscilikRow>(OZEL_ISCILIK_SQL)

  return await fillTemplate(
    { template: "Uretim_list.xlsx", sheetName: "Sheet" },
    (sheet, _book, write) => {
      let satir = 2

      /*
       * Bir bolumu yazar. `extra` ikinci bolumde degisen hucreleri
       * veriyor: Python'da alt bolum col14'e 0, col16'ya 0 yaziyor ve
       * col17'yi HIC yazmiyor.
       */
      const writeSection = <T extends UretimRow | IscilikRow>(
        source: T[],
        opts: {
          productName: (r: T) => string | null | undefined
          description: (r: T) => string | null | undefined
          produced: (r: T) => number | null
          remainder: (r: T) => number | null
          pieces: ((r: T) => number | null) | null
        },
      ) => {
        for (const group of groupByPo(source as { SiparisNo?: string | null }[] as T[])) {
          const groupFirstRow = satir

          /*
           * Cift sutunlar (2,4,6,8): grubun ILK satirinda, ortali.
           * Python bunlari dongu DISINDA, grup basinda yaziyor.
           */
          const head = group.rows[0]!
          const paired: [number, string | null | undefined][] = [
            [2, head.OperasyonAdi],
            [4, head.SiparisTarihi],
            [6, head.FirmaAdi],
            [8, head.SiparisNo],
          ]

          for (const [col, value] of paired) {
            write(satir, col, value ?? null, { alignment: CENTER })
          }

          for (const row of group.rows) {
            /* Tek sutunlar (1,3,5,7) + 9..15: her satirda, duz. */
            const plainCells: [number, string | number | null][] = [
              [1, row.OperasyonAdi ?? null],
              [3, row.SiparisTarihi ?? null],
              [5, row.FirmaAdi ?? null],
              [7, row.SiparisNo ?? null],
              [9, opts.productName(row) ?? null],
              [10, opts.description(row) ?? null],
              [11, sizeText(row.En, row.Boy, row.Kenar)],
              [12, row.UrunFirmaAdi ?? null],
              [13, row.Miktar ?? null],
              [14, opts.produced(row)],
              [15, unitName(row.UrunBirimID)],
            ]

            for (const [col, value] of plainCells) {
              write(satir, col, value)
            }

            /*
             * col16 ve col17 Python'da ACIKCA kenarlikli; digerleri
             * sablonun stilini kullaniyor.
             */
            write(satir, 16, opts.remainder(row), { border: THIN })

            if (opts.pieces) {
              write(satir, 17, opts.pieces(row), { border: THIN })
            }

            satir += 1
          }

          /*
           * Cift sutunlar grup boyunca DIKEY BIRLESIK.
           * Birlestirme DEGERLER YAZILDIKTAN SONRA: exceljs'te kole
           * hucreye yazmak master'i eziyor (gerekcesi
           * ../routes/excel-api/reports/production.post.ts icinde).
           */
          /*
           * BIRLESTIRME KOSULSUZ -- TEK SATIRLIK GRUPLARDA DA.
           *
           * Python `merge_cells(start_row=k, end_row=satir)` cagrisini
           * kosulsuz yapiyor; tek satirlik grupta k == satir oldugu
           * icin TEK HUCRELIK (dejenere) birlestirme olusuyor.
           * Ilk surum bunlari atliyordu ve karsilastirma yakaladi:
           *   birlestirme: 41 / 37 FARKLI
           * (Ceki listesi ucunda ise Python'un KENDI kosulu var --
           *  `if len(kasa_urunleri) > 1` -- orada atlamak dogru.)
           *
           * [!] exceljs DEJENERE BIRLESTIRME YAZMIYOR: tek hucrelik
           *     araliklari (orn. B30:B30) modelde tutuyor ama dosyaya
           *     SERILESTIRMIYOR -- izole bir deneyle dogrulandi.
           *     Dolayisiyla tek satirlik gruplarda Python'un urettigi
           *     `B30 D30 F30 H30` kayitlari ciktida OLMAYACAK.
           *     GORSEL ETKISI YOK: tek hucrelik birlestirme Excel'de
           *     "birlesik degil" ile ayni sey. Kutuphane sinirli
           *     oldugu icin bu fark bilerek birakildi.
           */
          const groupLastRow = satir - 1
          for (const col of [2, 4, 6, 8]) {
            sheet.mergeCells(groupFirstRow, col, groupLastRow, col)
          }
        }
      }

      /* ---------- ust bolum: govdeden ---------- */
      writeSection<UretimRow>(rows, {
        productName: (r) => r.UrunAdi,
        description: (r) => r.UrunUretimAciklama,
        produced: (r) => r.Uretim ?? null,
        remainder: (r) => nc(r.Miktar) - nc(r.Uretim),
        pieces: (r) => r.Adet ?? null,
      })

      /* ---------- bolum basligi ---------- */
      sheet.mergeCells(satir, 1, satir, 16)
      write(satir, 1, "ÖZEL İŞÇİLİK YAPILACAKLAR", {
        border: THIN,
        alignment: CENTER,
        fill: SECTION_FILL,
      })
      satir += 1

      /* ---------- alt bolum: veritabanindan ---------- */
      writeSection<IscilikRow>(iscilik, {
        productName: (r) => r.UrunAdi,
        description: (r) => r.UrunUretimAciklama,

        /* Python alt bolumde col14 ve col16'ya SABIT 0 yaziyor. */
        produced: () => 0,
        remainder: () => 0,

        /* col17 alt bolumde HIC yazilmiyor. */
        pieces: null,
      })
    },
  )
}
