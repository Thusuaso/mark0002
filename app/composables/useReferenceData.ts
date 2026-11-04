/*
 * ACILIR MENULERI BESLEYEN REFERANS LISTELERI -- ortak cekim yardimcisi.
 *
 * NEDEN VAR -- gercek bir hata sonucu:
 * Nuxt 2'de layouts/default.vue'nun created()'i acilista 25 liste
 * action'ini birden tetikliyordu (ulkeler, tedarikciler, ocaklar, yil/ay,
 * numune turleri...). Pilotun layout'u bunu BILEREK ertelemis ve "her
 * sayfa kendi ihtiyacini useAsyncData ile ceksin" notunu dusmus. Ancak
 * sayfalar tasinirken yalnizca KENDI created()'larindaki action'lar
 * aktarildi; layout'a guvenen listeler HIC cekilmedi.
 *
 * Sonuc: Country / Supplier / Quarry / Year / Month gibi alanlar BOS
 * geldi. Hata yok, uyari yok -- getter bos dizi donuyor, bos dizide
 * find() de sessizce undefined. 11 sayfada ayni hata vardi
 * (tools/codemods/check-list-fetches.mjs listesi).
 *
 * NEDEN LAYOUT'A GERI KONULMADI: 25 listeyi her sayfa acilisinda cekmek
 * Nuxt 2'nin davranisiydi ve gereksiz. Her sayfa yalnizca okudugu
 * listeyi istiyor.
 *
 * KULLANIM -- cagri sayfanin <script setup> blogunda:
 *
 *   const shared = useSharedStore()
 *   await useReferenceData("customer-bgp", [
 *     ["countryList", () => shared.setCountryList()],
 *   ])
 *
 * ACTION'LAR NEDEN BURADA DEGIL (liste adi -> action tablosu yok):
 * check-list-fetches.mjs bir sayfanin okudugu getter'in arkasindaki
 * action'in GERCEKTEN cagrildigini metinde arayarak dogruluyor. Tablo
 * burada olsaydi, bu dosyayi taramaya alan HER sayfa icin tablodaki TUM
 * action'lar "cagriliyor" sayilir ve arac tam bu hata sinifini bir daha
 * yakalamazdi (nitekim bir kez yakalayamadi; bkz. o dosyadaki not).
 * Cagri thunk'lari sayfada durdugu icin arac dogruyu goruyor.
 *
 * ZATEN DOLUYSA TEKRAR CEKMEZ: Pinia state'i gezintiler arasinda
 * yasiyor. `force: true` ile tazelemeye zorlanabilir.
 */
type SharedState = ReturnType<typeof useSharedStore>["$state"]

export async function useReferenceData(
  key: string,
  lists: Array<[keyof SharedState, () => unknown]>,
  options: { force?: boolean } = {},
) {
  const shared = useSharedStore()

  await useAsyncData(
    key,
    async () => {
      const pending = lists
        .filter(([stateKey]) => {
          if (options.force) return true
          const current = shared.$state[stateKey] as unknown
          return !Array.isArray(current) || current.length === 0
        })
        .map(([, fetchIt]) => fetchIt())

      await Promise.all(pending)
      return true
    },
    {
      /*
       * server: false ZORUNLU -- bkz. server/middleware/1.legacy-api.ts
       * Veri legacy Express API'sinden geliyor ve o API SSR'in IC fetch
       * yolunda calismiyor (event.node.res gercek bir ServerResponse
       * degil; Express'in res.json() cagrisi ya patliyor ya istek asili
       * kaliyor). Nuxt 2 de bu veriyi SSR'da getirmiyordu -- created()
       * icindeki async is SSR tarafindan beklenmiyordu -- dolayisiyla
       * davranis kaybi yok.
       */
      server: false,
    },
  )
}
