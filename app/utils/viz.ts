/*
 * Grafik renkleri ve Chart.js secenekleri -- TEK KAYNAK.
 *
 * ---------------------------------------------------------------------
 * RENKLER NEDEN ISTEMCIDE BELIRLENIYOR
 * ---------------------------------------------------------------------
 * Grafik renkleri su an BACKEND'den geliyor: api/index.js'teki /home
 * ucu dataset nesnelerine `backgroundColor` gomuyor ("grey", "black",
 * "#f2bf33", "#33f2e2", "#5333f2", "#e86db3", "#6d94e8" ve donut icin
 * dort ton).
 *
 * Renk bir SUNUM karari; API'nin isi degil. Burada gelen veri setlerinin
 * renkleri istemcide yeniden atiyor:
 *   - backend'e dokunulmuyor (veri sozlesmesi aynen duruyor),
 *   - renk karari tek yerden yonetiliyor,
 *   - tema/koyu mod degisirse tek dosya degisiyor.
 * Veri (labels, data dizileri, seri adlari) HIC DEGISMIYOR.
 *
 * ---------------------------------------------------------------------
 * PALET DOGRULANDI -- TAHMINLE SECILMEDI
 * ---------------------------------------------------------------------
 * Slotlar sabit sirali bir kategorik paletten geliyor ve her kullanim
 * bicimi icin dogrulayicidan gecirildi (beyaz kart yuzeyi, #ffffff):
 *
 *   2 seri (gruplu cubuk, komsu ciftler)   blue, orange
 *       -> TUM kontroller gecti, uyari yok
 *          (en kotu komsu CVD dE 24.7, normal gorus dE 33.6)
 *
 *   3 seri (YIGILI cubuk, komsu ciftler)   blue, orange, aqua
 *       -> TUM kontroller gecti
 *          (en kotu komsu CVD dE 9.2, normal gorus dE 27.6)
 *
 *   4 dilim (donut -- TUM ciftler ayni anda gorunur)
 *                                          blue, orange, aqua, violet
 *       -> TUM kontroller gecti
 *          (en kotu cift CVD dE 9.2, normal gorus dE 16.3)
 *
 * [!] DONUTTA 4. SLOT NEDEN VIOLET, SARI DEGIL: paletin varsayilan
 *     4. slotu sari (#eda100) ve donut gibi "tum ciftler karsilastirilir"
 *     bicimlerde sari<->turuncu cifti NORMAL GORUS esigini gecemiyor
 *     (dE 13.7 < 15). Bu, ikincil kodlamanin (etiket/doku) mazur
 *     gostermedigi sert bir hata; bu yuzden 4. slot ayni paletin
 *     violet tonuna cevrildi ve yeniden dogrulandi.
 *
 * [!] AQUA ICIN KONTRAST UYARISI: #1baf7a beyaz yuzeyde 2.82:1, yani
 *     3:1'in altinda. Kural geregi "gorunur etiket veya tablo gorunumu"
 *     zorunlu -- bu yuzden aqua kullanan grafiklerde LEJANT HER ZAMAN
 *     acik (asagidaki secenekler lejandi kapatmiyor). Kimlik hicbir
 *     yerde yalnizca renge binmiyor.
 */

/** Kategorik slotlar -- SABIT SIRA. Asla dondurulup tekrar kullanilmaz. */
export const VIZ_SERIES = {
  blue: "#2a78d6",
  orange: "#eb6834",
  aqua: "#1baf7a",
  violet: "#4a3aa7",
} as const

/** Iki serili grafikler (gruplu cubuk). */
export const VIZ_PAIR = [VIZ_SERIES.blue, VIZ_SERIES.orange]

/** Uc serili YIGILI grafik. */
export const VIZ_TRIPLE = [VIZ_SERIES.blue, VIZ_SERIES.orange, VIZ_SERIES.aqua]

/** Donut: dort dilim, tum ciftler ayni anda gorunur. */
export const VIZ_QUAD = [
  VIZ_SERIES.blue,
  VIZ_SERIES.orange,
  VIZ_SERIES.aqua,
  VIZ_SERIES.violet,
]

/*
 * Grafik kromu (eksen/izgara/yazi) -- hepsi GERILEMIS tonlar.
 *
 * Eski secenekler "black" ve "gray"/"grey" kullaniyordu: izgara
 * cizgileri veriyle ayni agirlikta gorunuyor ve gozu yoruyordu. Burada
 * izgara sac teli kalinliginda ve acik, eksen yazisi ise okunur ama
 * geri planda.
 */
export const VIZ_INK = {
  text: "#52514e",
  muted: "#898781",
  grid: "#e1e0d9",
  axis: "#c3c2b7",
  surface: "#ffffff",
} as const

type ChartDataset = Record<string, unknown> & { backgroundColor?: unknown }
type ChartData = { labels?: unknown[]; datasets?: ChartDataset[] }

/*
 * Gelen grafik verisinin RENKLERINI degistirir, VERISINI degistirmez.
 *
 * Yeni bir nesne dondurur -- store'daki veri mutasyona ugramaz (aksi
 * halde ayni veriyi okuyan baska bir bileşen de etkilenirdi).
 *
 * `perPoint` donut/pasta icindir: orada renk SERIYE degil, her DILIME
 * atanir (tek dataset, renk dizisi).
 */
export function withSeriesColors(
  data: ChartData | null | undefined,
  palette: readonly string[],
  opts: { perPoint?: boolean; stacked?: boolean } = {},
): ChartData {
  if (!data?.datasets?.length) return data ?? { labels: [], datasets: [] }

  return {
    ...data,
    datasets: data.datasets.map((ds, i) => {
      const next: ChartDataset = { ...ds }

      if (opts.perPoint) {
        next.backgroundColor = [...palette]
        /*
         * Eski veri `hoverBackgroundColor: ["grey","grey","grey","grey"]`
         * gonderiyordu -- uzerine gelince dilim GRIYE donuyor ve kimlik
         * kayboluyordu. Vurgu artik dilimin KENDI rengini koruyup
         * yalnizca bir yuzey halkasi ekliyor (asagidaki borderColor).
         */
        next.hoverBackgroundColor = [...palette]
        next.borderColor = VIZ_INK.surface
        /* Dilimler arasi 2px yuzey bosluğu. */
        next.borderWidth = 2
        next.hoverBorderColor = VIZ_INK.surface
        return next
      }

      const color = palette[i % palette.length]
      next.backgroundColor = color
      next.borderColor = color

      if (opts.stacked) {
        /*
         * Yigili segmentler arasinda 2px YUZEY bosluğu: segment
         * sinirlari birbirine degmeyince hangi parcanin nerede
         * bittigi okunuyor.
         */
        next.borderColor = VIZ_INK.surface
        next.borderWidth = 2
      }

      /* Ince mark: cubuklar sayfayi doldurmasin. */
      next.borderRadius = 4
      next.maxBarThickness = 28

      return next
    }),
  }
}

/* Lejant her zaman acik: >=2 seride kimlik renge tek basina binmemeli. */
const legend = {
  display: true,
  position: "bottom" as const,
  labels: {
    usePointStyle: true,
    boxWidth: 8,
    boxHeight: 8,
    color: VIZ_INK.text,
    padding: 16,
  },
}

const tooltip = {
  mode: "index" as const,
  intersect: false,
  backgroundColor: "#0b0b0b",
  padding: 10,
  cornerRadius: 6,
  titleFont: { weight: "600" as const },
  displayColors: true,
}

const xAxis = {
  ticks: { color: VIZ_INK.muted, font: { size: 11 } },
  /* Kategori ekseninde izgara YOK; cubuklar zaten konumu veriyor. */
  grid: { display: false },
  border: { color: VIZ_INK.axis },
}

const yAxis = {
  ticks: { color: VIZ_INK.muted, font: { size: 11 } },
  grid: { color: VIZ_INK.grid, drawTicks: false },
  border: { display: false },
}

/** Gruplu cubuk grafigi secenekleri. */
export const vizBarOptions = {
  maintainAspectRatio: false,
  interaction: { mode: "index" as const, intersect: false },
  plugins: { legend, tooltip },
  scales: { x: xAxis, y: yAxis },
}

/** Yigili cubuk grafigi secenekleri. */
export const vizStackedBarOptions = {
  maintainAspectRatio: false,
  interaction: { mode: "index" as const, intersect: false },
  plugins: { legend, tooltip },
  scales: {
    x: { ...xAxis, stacked: true },
    y: { ...yAxis, stacked: true },
  },
}

/** Donut secenekleri. */
export const vizDoughnutOptions = {
  maintainAspectRatio: false,
  /*
   * Halka kalinligi: cok ince bir halka kucuk dilimleri okunamaz
   * yapiyor, cok kalin olani pastaya donuyor. %58 ortada bir deger.
   */
  cutout: "58%",
  plugins: {
    legend,
    tooltip: { ...tooltip, mode: "nearest" as const, intersect: true },
  },
}
