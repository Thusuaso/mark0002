/*
 * plugins/tcmb-service.js karsiligi ($tcmb.getUSDRate).
 *
 * Nuxt 2'de bu bir plugin'di ve `inject("tcmb", ...)` ile her bilesene
 * `this.$tcmb` olarak giriyordu; nuxt.config'te `mode: "client"` ile
 * kayitliydi, cunku XML'i DOMParser ile ayristiriyordu.
 *
 * ---------------------------------------------------------------------
 * ARTIK INCE BIR SARMALAYICI -- MANTIK SUNUCUDA
 * ---------------------------------------------------------------------
 * Bu dosya once TCMB XML'ini tarayicida indirip DOMParser ile
 * ayristiriyor, veri bulamazsa gun gun geriye yuruyordu (~80 satir).
 * O mantik SUNUCUYA tasindi:
 *
 *   server/utils/tcmb.ts                           cekme + ayristirma + geri yurume
 *   server/routes/tcmb-api/usd/[y]/[m]/[d].get.ts  uc
 *
 * NEDEN TASINDI: ayni mantik pilotta UC YERDE birden vardi -- burada
 * (DOMParser ile), plugins/currency.js'te (xml2js ile, sunucuda;
 * api/index.js:4205 kullaniyor) ve Python'daki api/currency.py'de. Excel
 * sunucusunun `/finance/doviz/liste/...` ucu tasinirken DORDUNCU bir
 * kopya yazmak yerine kaynak tek yere alindi.
 *
 * KAZANCLAR:
 *   - tarayici artik TCMB'ye hic gitmiyor; /tcmb-api/kurlar/** proxy'sine
 *     de ihtiyac duymuyor
 *   - DOMParser bagimliligi kalkti, yani bu composable SSR'da da
 *     cagrilabilir
 *   - "veri yok, geriye yurudum" karari tek yerde
 *
 * DONUS GOVDESI DEGISMEDI: { date, rate, requestedDate, isFallback } --
 * yani <TcmbCurrency> ve diger cagri yerleri aynen calisiyor.
 */

/*
 * TCMB belgesindeki IKI AYRI USD satis alani -- bu ayrim GERCEK ve
 * ONCEDEN VAR:
 *
 *   forex    ForexSelling      plugins/tcmb-service.js ($tcmb.getUSDRate)
 *                              -> <TcmbCurrency>
 *   banknote BanknoteSelling   Python api/currency.py:83
 *                              -> Excel sunucusunun /finance/doviz/liste/ ucu
 *                              -> yedi muhasebe formu
 *
 * Ikisi AYNI DEGER DEGIL (forex: bankalar arasi islem kuru, banknot:
 * efektif/nakit kuru). Birini digerinin yerine koymak muhasebeye
 * yazilan tutari degistirir -- bu yuzden cagri yerinde ACIKCA
 * belirtiliyor.
 */
export type TcmbRateKind = "forex" | "banknote"

export interface TcmbRate {
  /** TCMB'de veri bulunan tarih, "GG-AA-YYYY" */
  date: string
  /** USD satis kuru, TCMB'nin verdigi metin hali */
  rate: string
  /** Hangi alandan okundu: "ForexSelling" | "BanknoteSelling" */
  field: string
  /** Istenen tarih, "GG-AA-YYYY" */
  requestedDate: string
  /**
   * Istenen tarihte veri YOKTU, geriye dogru en yakin is gunu getirildi.
   *
   * BU ALAN NEDEN VAR: Nuxt 2'de karar bilesenin icinde veriliyordu ve
   * HATALIYDI -- bilesen kendi tarihini "GGAAYYYY" (ayrac yok) bicimine
   * cevirip plugin'in dondurdugu "GG-AA-YYYY" ile karsilastiriyordu.
   * Iki bicim hicbir zaman esit olamaz, dolayisiyla "* Seçtiğiniz tarihte
   * veri olmadığı için geçmişteki en yakın tarih getirildi." uyarisi
   * TARIH DOGRU BULUNDUGUNDA DA her zaman gorunuyordu. Karar artik
   * bicimi ureten tarafta (server/utils/tcmb.ts).
   */
  isFallback: boolean
}

export function useTcmb() {
  /*
   * Verilen tarihin USD satis kurunu dondurur.
   *
   * `kind` VARSAYILANI "forex": pilotta <TcmbCurrency> zaten
   * ForexSelling kullaniyordu, yani varsayilan onun davranisini
   * koruyor. Muhasebe formlari BanknoteSelling istiyor ve bunu ACIKCA
   * "banknote" vererek belirtiyor (gerekcesi TcmbRateKind'in basinda).
   *
   * Hafta sonu / resmi tatil icin geriye yurume SUNUCUDA yapiliyor
   * (en fazla 10 gun), bu yuzden burada tek bir istek var.
   *
   * baseURL "/" ZORUNLU: useApi() "/api" onekini ekliyor, bu uc ise
   * /tcmb-api altinda.
   */
  async function getUSDRate(
    requested: Date | string,
    kind: TcmbRateKind = "forex",
  ): Promise<TcmbRate> {
    const date = new Date(requested)

    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return await $fetch<TcmbRate>(
      `/tcmb-api/usd/${kind}/${year}/${month}/${day}`,
      { baseURL: "/" },
    )
  }

  return { getUSDRate }
}
