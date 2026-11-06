<template>
  <div class="container-fluid dash" v-if="userId != 48">
    <!--
      SAYFA BASLIGI.

      Eskiden sayfanin HIC basligi yoktu: ekran dogrudan sekiz KPI
      karti ile basliyordu ve "burada neredeyim / hangi donem" sorusu
      yanitsizdi. Donem bilgisi her kartin altinda TEKRAR ediyordu
      (ayni ay adi dort kez). Donem artik bir kez burada, tepede.

      <h1>: sayfada baska h1 yok; kart basliklari h2.
    -->
    <header class="dash-head">
      <div class="dash-head__id">
        <span class="dash-head__mark" aria-hidden="true" />
        <div>
          <p class="dash-head__eyebrow">Dashboard</p>
          <h1 class="dash-head__title">Overview</h1>
        </div>
      </div>

      <p class="dash-head__period">
        <i class="pi pi-calendar" aria-hidden="true" />
        <span>{{ monthNameEn }} {{ currentYear }}</span>
      </p>
    </header>

    <!--
      KPI IZGARASI -- "kart icinde satir icinde sutun" yiginindan
      tek bir CSS grid'e alindi.

      ESKI HALI VE SORUNLARI:
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card shadow h-100 py-2"><div class="card-body">
            <div class="row g-0 align-items-center">
              <div class="col me-2">
                <div class="text-primary mb-1">Monthly Order (FOB)</div>
                <div class="h6 mb-0">$1.234</div>
              </div>
              <div class="col-auto">
                <i class="pi pi-calendar"> Kasım </i>
              </div>
        ...
      1) Deger `.h6` ile yaziliyordu, yani ETIKET BOYUTUNDA; etiket ise
         `.text-primary` ile RENKLI. Sonuc tersine donmus bir hiyerarsi:
         goz once etikete, sonra sayiya gidiyordu.
      2) Donem bilgisi `<i class="pi pi-calendar">` ETIKETININ ICINE
         METIN olarak konmustu. <i> bir ikon kabi; icine metin koymak
         hem anlamsal olarak yanlis hem de ikon fontuyla metni ayni
         satirda hizalamayi bozuyordu.
      3) Her kart dort ic ice sarmalayici tasiyordu.

      YENI HALI: etiket (kucuk, sakin) -> deger (buyuk, yari kalin) ->
      donem (gerilemis meta satiri). Veri baglantilarinin HEPSI birebir
      ayni.
    -->
    <!--
      KPI IZGARASI -- IKI AILEYE AYRILDI.

      Sekiz kart tek sirada akiyordu ve FOB (siparis) ile DDP (yukleme)
      degerleri birbirine karisiyordu: "Monthly order" ile "Monthly
      shipment" yan yana durdugunda hangisinin hangi para akisina ait
      oldugu yalnizca etiketi SONUNA kadar okuyunca anlasiliyordu.

      Artik iki bant var, her birinin kendi basligi ve kendi vurgu
      rengi. Renk TEK BASINA tasiyici degil: bant basligi zaten
      "Sipariş · FOB" / "Yükleme · DDP" yaziyor, kart etiketleri de
      aynen duruyor. Renkler app/utils/viz.ts'teki dogrulanmis
      kategorik paletin ilk iki slotu (blue / orange).

      Degerler ve baglantilar BIREBIR ayni.
    -->
    <section class="dash-band" aria-labelledby="dash-band-fob">
      <h2 id="dash-band-fob" class="dash-band__title">
        <span class="dash-band__dot" aria-hidden="true" />
        Orders <span class="dash-band__unit">FOB</span>
        <span class="dash-band__rule" aria-hidden="true" />
      </h2>

      <div class="dash-kpis">
        <article class="dash-kpi">
          <p class="dash-kpi__label">Monthly order</p>
          <p class="dash-kpi__value">{{ formatPriceUsd(home.aylikSiparis) }}</p>
          <p class="dash-kpi__meta">{{ monthNameEn }}</p>
        </article>

        <article class="dash-kpi">
          <p class="dash-kpi__label">Annual order</p>
          <p class="dash-kpi__value">{{ formatPriceUsd(home.yillikSiparis) }}</p>
          <p class="dash-kpi__meta">{{ currentYear }} · {{ currentMonth }}/12 months</p>
        </article>

        <article class="dash-kpi">
          <p class="dash-kpi__label">Monthly average</p>
          <p class="dash-kpi__value">
            {{ formatPriceUsd(home.ortalamaSiparis) }}
          </p>
          <p class="dash-kpi__meta">year to date</p>
        </article>

        <article class="dash-kpi dash-kpi--forecast">
          <p class="dash-kpi__label">Annual forecast</p>
          <p class="dash-kpi__value">
            {{ formatPriceUsd(home.tahminiYillikSiparis) }}
          </p>
          <!--
            "Tahmin" olculen degil HESAPLANAN bir sayi; kart kesikli
            kenarlikla ayriliyor ki olculen degerlerle ayni agirlikta
            okunmasin.
          -->
          <p class="dash-kpi__meta">forecast · 12 months</p>
        </article>
      </div>
    </section>

    <section class="dash-band dash-band--ddp" aria-labelledby="dash-band-ddp">
      <h2 id="dash-band-ddp" class="dash-band__title">
        <span class="dash-band__dot" aria-hidden="true" />
        Shipments <span class="dash-band__unit">DDP</span>
        <span class="dash-band__rule" aria-hidden="true" />
      </h2>

      <div class="dash-kpis">
        <article class="dash-kpi">
          <p class="dash-kpi__label">Monthly shipment</p>
          <p class="dash-kpi__value">{{ formatPriceUsd(home.aylikYukleme) }}</p>
          <p class="dash-kpi__meta">{{ monthNameEn }}</p>
        </article>

        <article class="dash-kpi">
          <p class="dash-kpi__label">Annual shipment</p>
          <p class="dash-kpi__value">{{ formatPriceUsd(home.yillikYukleme) }}</p>
          <p class="dash-kpi__meta">{{ currentYear }} · {{ currentMonth }}/12 months</p>
        </article>

        <article class="dash-kpi">
          <p class="dash-kpi__label">Shipment average monthly</p>
          <p class="dash-kpi__value">
            {{ formatPriceUsd(home.ortalamaYukleme) }}
          </p>
          <p class="dash-kpi__meta">year to date</p>
        </article>

        <article class="dash-kpi dash-kpi--forecast">
          <p class="dash-kpi__label">Annual shipment forecast</p>
          <p class="dash-kpi__value">
            {{ formatPriceUsd(home.tahminiYillikYukleme) }}
          </p>
          <p class="dash-kpi__meta">forecast · 12 months</p>
        </article>
      </div>
    </section>

    <!--
      BOLUM IZGARALARI -- Bootstrap `row`/`col` yigini yerine CSS grid.

      Eskiden her bolum `<div class="row m-auto text-center">` idi:
        - `text-center` TUM icerigi ortaliyordu, tablolardaki sayilar
          dahil; sayi kolonlari ortali oldugunda basamaklar hizalanmaz.
        - `col` esit genislik dayatiyordu, yani 550px'lik grafikler
          dar ekranlarda yan yana sikisiyordu.
      Grid, dar ekranda tek kolona DUSUYOR ve hizalama kolon bazinda
      kaliyor.
    -->
    <section class="dash-grid dash-grid--2">
      <Card class="dash-card">
          <template #header>
            <h2 class="dash-card__title">Monthly shipped</h2>
          </template>
          <template #content>
            <Chart
              type="bar"
              :data="chartShipped"
              :options="vizBarOptions"
              class="dash-chart"
            />
          </template>
      </Card>
      <Card class="dash-card">
          <template #header>
            <h2 class="dash-card__title">Shipped by marketing</h2>
          </template>
          <template #content>
            <Chart
              type="doughnut"
              :data="chartShippedByMarketing"
              :options="vizDoughnutOptions"
              class="dash-chart"
            />
          </template>
      </Card>
    </section>

    <section class="dash-grid dash-grid--2">
      <Card class="dash-card">
          <template #header>
            <h2 class="dash-card__title">Monthly production</h2>
          </template>
          <template #content>
            <Chart
              type="bar"
              :data="chartProduction"
              :options="vizStackedBarOptions"
              class="dash-chart"
            />
          </template>
      </Card>
      <Card class="dash-card">
          <template #header>
            <h2 class="dash-card__title">Monthly offers</h2>
          </template>
          <template #content>
            <Chart
              type="bar"
              :data="chartOffersColored"
              :options="vizBarOptions"
              class="dash-chart"
            />
          </template>
      </Card>
    </section>

    <section class="dash-grid dash-grid--3">
      <Card class="dash-card">
          <template #header>
            <h2 class="dash-card__title">{{ currentYear }} supplier cost</h2>
          </template>
          <template #content>
            <DataTable
              :value="home.supplierCostList"
              scrollable
              scrollHeight="500px"
            >
              <Column field="FirmaAdi" header="Supplier" />
              <Column field="Total" header="Total" class="dash-num">
                <template #body="slotProps">
                  {{ formatPriceUsd(slotProps.data.Total) }}
                </template>
                <template #footer>
                  {{ formatPriceUsd(totalSupplierCost) }}
                </template>
              </Column>
            </DataTable>
          </template>
      </Card>
      <Card class="dash-card">
          <template #header>
            <h2 class="dash-card__title">Monthly production</h2>
          </template>
          <template #content>
            <DataTable :value="stocks.monthly_stock">
              <Column field="MONTH" header="Month" />
              <Column field="SqmMiktar" header="M2" class="dash-num">
                <template #body="slotProps">
                  {{ formatDecimal(slotProps.data.SqmMiktar) }}
                </template>
              </Column>
              <Column field="KasaAdedi" header="Crates" class="dash-num" />
            </DataTable>
          </template>
      </Card>
      <Card class="dash-card">
          <template #header>
            <h2 class="dash-card__title">Mekmer current stock</h2>
          </template>
          <template #content>
            <DataTable :value="stocks.current_stock">
              <Column field="Month" header="Month" />
              <Column field="KasaM2" header="M2" class="dash-num">
                <template #body="slotProps">
                  {{ formatDecimal(slotProps.data.KasaM2) }}
                </template>
              </Column>
              <Column field="KasaAdet" header="Crates" class="dash-num" />
            </DataTable>
          </template>
      </Card>
    </section>
  </div>

  <!--
    userId == 48 icin DAR gorunum: yalnizca uretim tarafi, para birimi
    iceren hicbir kart/grafik yok. Nuxt 2'de de boyleydi; bu bir
    yetkilendirme kisitiydi, bicimsel bir tercih degil -- bu yuzden
    birebir korundu.
  -->
  <div class="container-fluid dash" v-else-if="userId == 48">
    <!--
      SAYFA BASLIGI.

      Eskiden sayfanin HIC basligi yoktu: ekran dogrudan sekiz KPI
      karti ile basliyordu ve "burada neredeyim / hangi donem" sorusu
      yanitsizdi. Donem bilgisi her kartin altinda TEKRAR ediyordu
      (ayni ay adi dort kez). Donem artik bir kez burada, tepede.

      <h1>: sayfada baska h1 yok; kart basliklari h2.
    -->
    <header class="dash-head">
      <div class="dash-head__id">
        <span class="dash-head__mark" aria-hidden="true" />
        <div>
          <p class="dash-head__eyebrow">Dashboard</p>
          <h1 class="dash-head__title">Overview</h1>
        </div>
      </div>

      <p class="dash-head__period">
        <i class="pi pi-calendar" aria-hidden="true" />
        <span>{{ monthNameEn }} {{ currentYear }}</span>
      </p>
    </header>

    <section class="dash-grid dash-grid--2">
      <Card class="dash-card dash-card--wide">
          <template #header>
            <h2 class="dash-card__title">Monthly production</h2>
          </template>
          <template #content>
            <Chart
              type="bar"
              :data="chartProduction"
              :options="vizStackedBarOptions"
              class="dash-chart"
            />
          </template>
      </Card>
      <Card class="dash-card">
          <template #header>
            <h2 class="dash-card__title">Monthly production</h2>
          </template>
          <template #content>
            <DataTable :value="stocks.monthly_stock">
              <Column field="MONTH" header="Month" />
              <Column field="SqmMiktar" header="M2" class="dash-num">
                <template #body="slotProps">
                  {{ formatDecimal(slotProps.data.SqmMiktar) }}
                </template>
              </Column>
              <Column field="KasaAdedi" header="Crates" class="dash-num" />
            </DataTable>
          </template>
      </Card>
      <Card class="dash-card">
          <template #header>
            <h2 class="dash-card__title">Mekmer monthly shipment</h2>
          </template>
          <template #content>
            <DataTable :value="stocks.mekmer_shipped">
              <Column field="Month" header="Month" />
              <Column field="Satis" header="Sales" class="dash-num">
                <template #body="slotProps">
                  {{ formatPriceUsd(slotProps.data.Satis) }}
                </template>
              </Column>
            </DataTable>
          </template>
      </Card>
      <Card class="dash-card">
          <template #header>
            <h2 class="dash-card__title">Mekmer current stock</h2>
          </template>
          <template #content>
            <DataTable :value="stocks.current_stock">
              <Column field="Month" header="Month" />
              <Column field="KasaM2" header="M2" class="dash-num">
                <template #body="slotProps">
                  {{ formatDecimal(slotProps.data.KasaM2) }}
                </template>
              </Column>
              <Column field="KasaAdet" header="Crates" class="dash-num" />
            </DataTable>
          </template>
      </Card>
    </section>
  </div>
</template>

<script>
import { useAuthStore } from "~/stores/auth"

/*
 * GRAFIK SECENEKLERI VE RENKLERI app/utils/viz.ts ICINDE.
 *
 * Buradaki uc secenek nesnesi (chartOptions / chartOptionsTwo /
 * chartOptionsThree) kaldirildi. Gerekceleri:
 *
 *   - Renkler "black" / "grey" / "gray" idi: izgara cizgileri veriyle
 *     AYNI agirlikta goruluyordu. Artik izgara sac teli kalinliginda
 *     ve acik, eksen yazisi okunur ama geri planda.
 *   - Seri renkleri BACKEND'den geliyordu (api/index.js /home ucu
 *     dataset'lere backgroundColor gomuyor). Renk bir sunum karari;
 *     istemcide, dogrulanmis bir paletten atiliyor. Veri (labels,
 *     data dizileri, seri adlari) DEGISMIYOR.
 *   - Lejant artik her grafikte acik: >=2 seride kimlik yalnizca renge
 *     binmemeli. Paletteki aqua tonu beyaz yuzeyde 3:1'in altinda
 *     kaldigi icin gorunur etiket ZORUNLU -- ayrinti viz.ts icinde.
 *
 * chart.js 4 notu KORUNUYOR: `grid.drawBorder` 4.0'da kaldirildi,
 * yerine ayri `border` bolumu geldi. Eski ad 4.x'te SESSIZCE yok
 * sayilir, yani birebir kopyalanirsa eksen cizgisi geri gelir ve
 * kimse nedenini anlamaz. viz.ts dogru adi kullaniyor.
 */

export default {
  props: {
    home: {
      type: Object,
      required: true,
    },
    stocks: {
      type: Object,
      required: true,
    },
    totalSupplierCost: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    /*
     * INGILIZCE AY ADI.
     *
     * Global monthToString() TURKCE donuyor ("Kasım") ve navbar gibi
     * bilerek Turkce kalan yerler onu kullanmaya devam ediyor; bu
     * yuzden o yardimci DEGISTIRILMEDI, burada yalnizca bu panel icin
     * Ingilizce karsiligi uretiliyor.
     *
     * toLocaleString("en-US") KULLANILMIYOR: cikti sunucunun ICU
     * verisine bagli olur ve SSR ile istemci farkli sonuc uretirse
     * hydration uyusmazligi cikar. Sabit dizi her iki tarafta ayni.
     *
     * currentMonth 1 tabanli (bkz. asagidaki tanimi), dizi 0 tabanli.
     */
    monthNameEn() {
      const names = [
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
      ]

      return names[this.currentMonth - 1] ?? ""
    },

    authStore() {
      return useAuthStore()
    },
    userId() {
      return this.authStore.getUserId
    },

    /*
     * Nuxt 2'de sablon `new Date()` cagrilarini DOGRUDAN iceriyordu --
     * sekiz kartta ve bir baslikta toplam dokuz kez. Her yeniden render
     * yeni bir Date kuruyordu; dogru calisiyordu ama her birini tekrar
     * yazmak gerekiyordu. Tek yerde toplandi.
     */
    currentYear() {
      return new Date().getFullYear()
    },
    currentMonth() {
      return new Date().getMonth() + 1
    },

    /*
     * GRAFIK VERISI RENKLENDIRILEREK GECIRILIYOR.
     *
     * withSeriesColors gelen nesnenin KOPYASINI dondurur; store'daki
     * veri mutasyona ugramaz (ayni veriyi okuyan baska bir bileşen
     * etkilenmesin). Palet secimi ve dogrulama kaydi app/utils/viz.ts.
     *
     * [!] AYRI BIR `computed:` BLOGU OLARAK YAZILMAMALI: bir options
     *     bileşeninde ikinci `computed` anahtari birincisini SESSIZCE
     *     EZER -- ilk denemede tam bu oldu ve currentYear/currentMonth
     *     kayboldu (sablonda sekiz yerde kullaniliyorlar). Bu yuzden
     *     mevcut blogun ICINDE duruyorlar.
     */
    chartShipped() {
      return withSeriesColors(this.home?.chartOne, VIZ_PAIR)
    },
    chartShippedByMarketing() {
      /* Donut: renk seriye degil her DILIME atanir. */
      return withSeriesColors(this.home?.chartCustomerShipped, VIZ_QUAD, {
        perPoint: true,
      })
    },
    chartProduction() {
      /* Bu grafik YIGILI -- segmentler arasi 2px yuzey bosluğu ister. */
      return withSeriesColors(this.home?.chartProducts, VIZ_TRIPLE, {
        stacked: true,
      })
    },
    chartOffersColored() {
      return withSeriesColors(this.home?.chartOffers, VIZ_PAIR)
    },
  },

  /*
   * GRAFIK SECENEKLERI SABLONA BURADAN SUNULUYOR.
   *
   * Bu bir OPTIONS API bileşeni: sablon ifadeleri bileşen ornegine
   * gore cozulur, MODUL KAPSAMINA gore degil. Nuxt'un otomatik
   * import islemi (app/utils/viz.ts) script icinde calisir ama sablonda
   * `:options="vizBarOptions"` yazmak CALISMAZ -- deger undefined
   * gelir ve grafik sessizce varsayilan seceneklerle cizilir
   * (izgara/lejant ayarlari kaybolur, hata da verilmez).
   *
   * `<script setup>` kullanilsaydi gerekmezdi; bileşenin tamami
   * options API oldugu icin donusturmek yerine burada sunuluyor.
   */
  data() {
    return {
      vizBarOptions,
      vizStackedBarOptions,
      vizDoughnutOptions,
    }
  },
}
</script>

<style scoped>
/*
 * ANA SAYFA GORSEL KATMANI.
 *
 * Renkler once PrimeVue tema degiskenlerinden okunuyor (--p-*), yedek
 * degerlerle: tema veya koyu mod degisirse panel birlikte degisiyor.
 * Vurgu renkleri (--dash-fob / --dash-ddp) app/utils/viz.ts icindeki
 * DOGRULANMIS kategorik paletin ilk iki slotu -- tepedeki bant rengi
 * ile grafikteki seri rengi ayni seyi anlatiyor.
 *
 * Grafik ici renkler burada DEGIL, viz.ts icinde (dogrulama kaydiyla).
 */
.dash {
  --dash-gap: 0.85rem;
  --dash-radius: 12px;
  --dash-surface: var(--p-content-background, #fff);
  --dash-border: var(--p-content-border-color, #e3e1da);
  --dash-hairline: #eceae4;
  --dash-label: var(--p-text-muted-color, #78766f);
  --dash-value: var(--p-text-color, #1a1917);
  --dash-fob: #2a78d6;
  --dash-ddp: #eb6834;

  /* Aktif bandin rengi; her bant kendi degerini veriyor. */
  --dash-accent: var(--dash-fob);

  /*
   * DURGUN GOLGE.
   *
   * Onceki surumde kartlarin hic golgesi yoktu, yalnizca kenarlik
   * vardi; panel duz ve "ucuz" goruluyordu. Bootstrap'in eski
   * `.shadow`'u ise fazla kuvvetliydi ve sekiz kart yan yana gelince
   * zemin kirli goruluyordu. Buradaki iki katmanli golge cok hafif:
   * karti yuzeyden milimetrik ayiriyor, gurultu yapmiyor.
   */
  --dash-shadow:
    0 1px 2px rgb(16 15 14 / 5%),
    0 1px 1px rgb(16 15 14 / 3%);
  --dash-shadow-lift:
    0 10px 24px -14px rgb(16 15 14 / 28%),
    0 2px 4px -2px rgb(16 15 14 / 8%);

  padding-bottom: 2.5rem;

  /*
   * ASIRI GENIS EKRANDA YAYILMASIN.
   *
   * `.container-fluid` sinirsiz genisliyor; 2560px bir monitorde KPI
   * kartlari gereksiz uzuyor ve satir basi ile satir sonu arasindaki
   * goz mesafesi okumayi zorlastiriyordu. 1680px pratik bir ust sinir.
   */
  max-width: 1680px;
  margin-inline: auto;

  /*
   * SAYFA ZEMINI: cok hafif bir ton + tepede neredeyse farkedilmeyen
   * bir isik lekesi. Lekenin opakligi %4; renk ALGILANMIYOR, yalnizca
   * derinlik veriyor. Veriyle iliskisi yok.
   */
  background:
    radial-gradient(
      1200px 340px at 10% -10%,
      rgb(42 120 214 / 4%),
      transparent 70%
    ),
    var(--p-surface-50, #fafaf8);
}

/* ---------- sayfa basligi ---------- */

.dash-head {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  align-items: center;
  justify-content: space-between;

  padding: 1.4rem 0 1.15rem;
  margin-bottom: 1.5rem;

  /* Baslik ile panelin geri kalanini ayiran tek cizgi. */
  border-bottom: 1px solid var(--dash-hairline);
}

.dash-head__id {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

/*
 * Marka isareti. Tamamen dekoratif (aria-hidden); anlam tasimadigi
 * icin iki vurgu renginin gecisi serbestce kullanilabiliyor.
 */
.dash-head__mark {
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(140deg, var(--dash-fob), var(--dash-ddp));
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 25%);
}

.dash-head__eyebrow {
  margin: 0 0 0.1rem;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--dash-label);
}

.dash-head__title {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 650;
  line-height: 1.15;
  letter-spacing: -0.015em;
  color: var(--dash-value);
}

/* Donem: eskiden dort kartta TEKRAR ediyordu, artik tek yerde. */
.dash-head__period {
  display: inline-flex;
  gap: 0.45rem;
  align-items: center;

  margin: 0;
  padding: 0.4rem 0.8rem;

  font-size: 0.78rem;
  font-weight: 500;
  color: var(--dash-label);

  background: var(--dash-surface);
  border: 1px solid var(--dash-border);
  border-radius: 999px;
  box-shadow: var(--dash-shadow);
}

.dash-head__period .pi {
  font-size: 0.75rem;
  color: var(--dash-accent);
}

/* ---------- KPI bantlari ---------- */

.dash-band {
  margin-bottom: 1.75rem;
}

.dash-band--ddp {
  --dash-accent: var(--dash-ddp);
}

/*
 * Bant basligi: nokta + ad + birim rozeti + SAGA UZANAN CIZGI.
 *
 * Cizgi bolumun nerede basladigini gozle isaretliyor; basligin tek
 * basina durdugu onceki surumde iki bant birbirine yapisik
 * goruluyordu.
 */
.dash-band__title {
  display: flex;
  gap: 0.55rem;
  align-items: center;

  margin: 0 0 0.75rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--dash-value);
}

.dash-band__dot {
  flex: none;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--dash-accent);
}

.dash-band__unit {
  padding: 0.12rem 0.42rem;

  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--dash-accent);

  background: color-mix(in srgb, var(--dash-accent) 11%, transparent);
  border-radius: 4px;
}

.dash-band__rule {
  flex: 1;
  height: 1px;
  background: var(--dash-hairline);
}

/*
 * MOBIL ONCE: varsayilan tek kolon. `auto-fit` + `minmax` sayesinde
 * genislik arttikca kolon sayisi KENDILIGINDEN artiyor; ayri kirilma
 * noktasi yazmak gerekmiyor.
 *
 * Eski hali `col-xl-3 col-md-6` idi: xl altinda iki, md altinda tek
 * kolon -- arada (768-1200px, cogu tablet ve kucuk dizustu) kartlar
 * gereksiz genis kaliyordu.
 */
.dash-kpis {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--dash-gap);
}

.dash-kpi {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  padding: 1.05rem 1.15rem 0.95rem;
  overflow: hidden;

  background: var(--dash-surface);
  border: 1px solid var(--dash-border);
  border-radius: var(--dash-radius);
  box-shadow: var(--dash-shadow);

  transition:
    transform 150ms cubic-bezier(0.2, 0, 0.2, 1),
    box-shadow 150ms ease,
    border-color 150ms ease;
}

/*
 * Ustte 2px'lik vurgu seridi -- DURGUN HALDE SOLUK, uzerine gelince
 * TAM RENK.
 *
 * Sekiz serit ayni anda tam renkte oldugunda panel alacali
 * goruluyordu; aile bilgisi zaten bant basliginda yaziyor. Serit
 * burada yalnizca sessiz bir hatirlatici.
 */
.dash-kpi::before {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  height: 2px;
  background: var(--dash-accent);
  opacity: 0.35;
  transition: opacity 150ms ease;
}

.dash-kpi:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--dash-accent) 30%, var(--dash-border));
  box-shadow: var(--dash-shadow-lift);
}

.dash-kpi:hover::before {
  opacity: 1;
}

/*
 * TAHMIN kartlari: deger OLCULMUS degil, ortalamanin 12 ile carpimi
 * (api/index.js:614). Kesikli kenarlik, sayinin olculen degerlerle
 * ayni agirlikta okunmasini engelliyor.
 */
.dash-kpi--forecast {
  border-style: dashed;
  box-shadow: none;
}

.dash-kpi__label {
  margin: 0;
  font-size: 0.69rem;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--dash-label);
}

.dash-kpi__value {
  margin: 0.1rem 0 0;
  font-size: 1.65rem;
  font-weight: 650;
  line-height: 1.1;
  letter-spacing: -0.025em;
  color: var(--dash-value);

  /*
   * ORANSAL BASAMAK (tabular DEGIL): tabular-nums her basamaga `0`
   * genisligi verir ve buyuk puntoda sayi "dagilmis" gorunur. Tabular
   * yalnizca dikey hizalanmasi gereken TABLO kolonlarinda anlamli
   * (asagida .dash-card tablolarinda oyle kullaniliyor).
   */
  font-variant-numeric: proportional-nums;
}

.dash-kpi__meta {
  margin: 0.15rem 0 0;
  font-size: 0.7rem;
  color: var(--dash-label);
}

/* ---------- bolum izgaralari ---------- */

.dash-grid {
  display: grid;
  gap: var(--dash-gap);
  margin-bottom: 1.5rem;
}

/*
 * Iki ve uc kolonluk bolumler. Mobilde ikisi de tek kolon; esik
 * degerleri icerige gore (grafik genis, tablo dar).
 */
.dash-grid--2,
.dash-grid--3 {
  grid-template-columns: 1fr;
}

@media (min-width: 900px) {
  .dash-grid--2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1100px) {
  .dash-grid--3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

/* `minmax(0, 1fr)`: grafik tuvali kolonu TASIRMASIN (grid varsayilani
   `min-content` oldugu icin genis tuvaller kolonu genisletiyordu). */

.dash-card {
  background: var(--dash-surface);
  border: 1px solid var(--dash-border);
  border-radius: var(--dash-radius);
  box-shadow: var(--dash-shadow);
  overflow: hidden;
  transition:
    box-shadow 150ms ease,
    border-color 150ms ease;
}

.dash-card:hover {
  border-color: color-mix(in srgb, var(--dash-value) 12%, var(--dash-border));
  box-shadow: var(--dash-shadow-lift);
}

/*
 * Kart basligi: kucuk, aralikli, BUYUK HARF; altinda sac teli cizgi
 * ve cok hafif bir zemin. Baslik serisi boylece kartin "cubugu"
 * haline geliyor ve icerikten net ayriliyor.
 *
 * <h3> -> <h2> + KUCUK PUNTO: eskiden tarayicinin varsayilan h3
 * boyutundaydi (~1.17rem, kalin) ve KPI degerlerinden daha baskin
 * goruluyordu. Anlamsal olarak yukseltildi, GORSEL olarak geri
 * cekildi -- baslik icerigi tanitir, onunla yarismaz.
 */
.dash-card__title {
  margin: 0;
  padding: 0.8rem 1.05rem 0.7rem;

  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--dash-label);

  background: linear-gradient(
    to bottom,
    var(--p-surface-50, #fafaf8),
    var(--dash-surface)
  );
  border-bottom: 1px solid var(--dash-hairline);
}

/*
 * Grafik yuksekligi: sabit 550px yerine en/boy oranli + alt sinir.
 *
 * 550px mobilde ekranin tamamini kapliyordu. `aspect-ratio` genisligi
 * takip ediyor, `min-height` ise cok dar ekranda grafigin okunamaz
 * kadar basiklasmasini onluyor.
 */
.dash-chart {
  display: block;
  width: 100%;
  padding: 0.65rem 0.5rem 0.2rem;
  aspect-ratio: 16 / 11;
  min-height: 260px;
  max-height: 520px;
}

/*
 * TABLO SAYILARI: dikey hizalansin diye TABULAR basamak, ve sayi
 * kolonlari saga yasli.
 *
 * Eski bolum sarmalayicisi `text-center` idi; sayilar ortali oldugunda
 * basamaklar alt alta gelmiyor ve kolonu taramak zorlasiyordu.
 * :deep() gerekli -- kurallar PrimeVue'nun kendi urettigi hucrelere
 * iniyor ve stil blogu scoped.
 */
.dash-card :deep(.p-datatable-tbody > tr > td),
.dash-card :deep(.p-datatable-tfoot > tr > td) {
  font-variant-numeric: tabular-nums;
  font-size: 0.82rem;
  padding-block: 0.5rem;
  border-color: var(--dash-hairline);
}

/*
 * SAYI KOLONLARI SAGA YASLI.
 *
 * tabular-nums basamaklari esit genislige getiriyor ama kolonu
 * taranabilir yapan SAGA YASLAMA: birler basamagi alt alta gelince
 * buyukluk farki tek bakista okunuyor. Metin kolonlari sola yasli.
 */
.dash-card :deep(.dash-num) {
  text-align: right;
}

.dash-card :deep(.p-datatable-thead > tr > th) {
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--dash-label);
  background: transparent;
  border-color: var(--dash-hairline);
  padding-block: 0.55rem;
}

/* Son satirin alt cizgisi kart kenarligiyla cakismasin. */
.dash-card :deep(.p-datatable-tbody > tr:last-child > td) {
  border-bottom: 0;
}

/* ---------- dar ekran ---------- */

@media (max-width: 575px) {
  .dash-head {
    padding: 1.1rem 0 0.95rem;
    margin-bottom: 1.2rem;
  }

  .dash-head__title {
    font-size: 1.15rem;
  }

  .dash-kpi {
    padding: 0.85rem 0.95rem 0.8rem;
  }

  .dash-kpi__value {
    font-size: 1.35rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dash-kpi,
  .dash-kpi::before,
  .dash-card {
    transition: none;
  }

  .dash-kpi:hover {
    transform: none;
  }
}
</style>

<!--
  components/home/Dashboard.vue   (Nuxt 2: components/home/home.vue)

  Etiket adi <HomeDashboard> -- Nuxt auto-import adini DOSYA YOLUNDAN
  uretir. Nuxt 2'deki ad `<home>` idi; components/home/Home.vue olsa
  auto-import adi `HomeHome` olacakti, bu yuzden dosya Dashboard.vue.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] mapGetters(["getUserId"]) -> computed authStore / userId
      Karsilastirma BILEREK `!=` / `==` kaldi (pilot genelindeki kural;
      bkz. components/order/Table.vue yorumu). auth store'daki userId bir
      CEREZ degeri, yani STRING "48"; `!==` yazilsa kosul her zaman dogru
      olur ve 48 numarali kullanici yetkisi olmayan tum kartlari gorurdu.

  [x] `mekmer_datas` + created() icindeki this.$axios cagrisi KALDIRILDI
      -> `stocks` prop'u, veri stores/home.ts'ten geliyor.
      Gerekcesi: SSR'da created() icindeki async is BEKLENMEZ (bkz.
      pages/index.vue). Ayrica bilesen kendi verisini cekerken sayfa onun
      hazir olup olmadigini bilemiyordu.

  [x] watch: { home() { totalSupplier += ... } } KALDIRILDI
      -> stores/home.ts icindeki getTotalSupplierCost getter'i, prop
      olarak geliyor. Eski kodun iki ayri hatasi ve gerekcesi o
      getter'in basinda yaziyor (birikme + ilk yuklemede hic calismamasi).

  [x] `import Cookies from "js-cookie"` KALDIRILDI -- dosyada hic
      KULLANILMIYORDU (olu import; js-cookie pilota kurulmadi).

  [x] methods.getMonthDate KALDIRILDI -> utils/formatters.ts icindeki
      monthToString. Ikisi ayni seyi yapiyordu (1 -> "Ocak" ... 12 ->
      "Aralık"); getMonthDate 1 tabanli bir nesne, monthToString 0 tabanli
      bir dizi kullaniyor ama 1..12 icin ciktilari AYNI. Zaten global
      olarak kayitli olan kullanildi (bkz. app/plugins/formatters.ts).

  [x] data.userId KALDIRILDI -- hic yazilmiyordu (null kaliyordu) ve hic
      okunmuyordu; sablon mapGetters'tan gelen getUserId'yi kullaniyordu.

  [x] <style scoped> KALDIRILDI -- icindeki tek kural `.customColumn`
      idi ve bu sinif sablonda HIC GECMIYOR.

  [x] grid.drawBorder -> border.display  (chart.js 4; gerekcesi
      chartOptions'in basinda)

  DUZELTILDI -- NUXT 2'DE SESSIZCE BOZUK OLAN:

  [x] chart.js kurulmamisti. PrimeVue Chart, chart.js'i
      `import('chart.js/auto')` ile DINAMIK cagiriyor ve peerDependency
      olarak BILDIRMIYOR. Paket olmasa dort grafik de hic cizilmez, hata
      da vermez -- sadece bos kalir. `chart.js@4.5.1` eklendi.

  [x] plugins.tooltips -> plugins.tooltip  (gerekcesi chartOptionsThree
      icinde)

  [x] Bootstrap 4 sinif adlari -> Bootstrap 5:
          no-gutters -> g-0        mr-2 -> me-2
      Her iki repo da Bootstrap 5.3.2 vendor'luyor (BS5 bu iki adi
      kaldirdi), yani bu siniflar BUGUN de hicbir sey yapmiyor: kartlarin
      ic bosluklari olmasi gerekenden farkli gorunuyor. Dogru adlara
      cevrildi -- yani bu kartlarin GORUNUMU degisecek.

  KALDIRILDI -- HER IKI REPODA DA TANIMSIZ SINIFLAR (SB Admin 2 temasindan
  kalma; iki repoda da o tema YOK, hicbir CSS dosyasinda tanimli degiller):
  [x] border-left-primary   (kartlarin sol kenar rengi -- hic gorunmuyordu)
  [x] text-gray-800 / text-gray-300

  [x] `fas fa-calendar fa-2x` -> `pi pi-calendar`
      Font Awesome IKI REPODA DA yuklu degil, yani bu ikonlar bugune
      kadar hic gorunmedi; <i> yalnizca ay/yil yazisini tutan bir kutu
      olarak calisiyordu. primeicons zaten yuklu oldugu icin esdegeri
      kullanildi. GORUNUR BIR EKLEME: daha once ikon yoktu, artik var.
      Istenmiyorsa bu uc satirdaki class'i silmek yeterli.

  DIKKAT -- KASITLI OLARAK DEGISTIRILMEDI:
      `aspectRatio` secenegi uc secenek setinde de duruyor ama
      `maintainAspectRatio: false` ile birlikte chart.js onu YOK SAYAR;
      yukseklik :style'daki 550px'ten geliyor. Zararsiz oldugu icin
      birakildi -- silmek davranis degistirmez ama bu dosyanin isi degil.
-->
