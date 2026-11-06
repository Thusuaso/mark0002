<template>
  <!--
    Goz bicimli yukleme gostergesi.

    NEDEN GOZ: sistemin adi "Goz" (goz.mekmar.com). Yukleme aninda
    kirpan bir goz, jenerik bir donen cark yerine markaya ait bir isaret
    veriyor.

    ERISILEBILIRLIK: bu bilesen YALNIZCA gorsel. Durum bildirimi
    (role="status", aria-busy, ekran okuyucu metni) onu saran katmanda
    (layouts/default.vue); burada aria-hidden ile gizleniyor ki ekran
    okuyucu ayni seyi iki kez duyurmasin.
  -->
  <div class="goz" :class="{ 'goz--sm': small }" aria-hidden="true">
    <svg viewBox="0 0 160 160" class="goz__svg">
      <defs>
        <!-- Iris: merkezden disa dogru acilan marka tonu -->
        <radialGradient id="gozIris" cx="50%" cy="50%" r="50%">
          <stop offset="0%" class="goz__iris-in" />
          <stop offset="62%" class="goz__iris-mid" />
          <stop offset="100%" class="goz__iris-out" />
        </radialGradient>

        <!-- Gozun beyazi: ust taraf hafif golgeli -->
        <linearGradient id="gozSclera" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" class="goz__sclera-top" />
          <stop offset="100%" class="goz__sclera-bottom" />
        </linearGradient>

        <!--
          Badem bicimi: iris ve parlama bu sinirin DISINA tasmasin.
          Iki simetrik quadratic egri; ust ve alt kapak hatti.
        -->
        <clipPath id="gozClip">
          <path d="M14 80 Q80 24 146 80 Q80 136 14 80 Z" />
        </clipPath>
      </defs>

      <!-- Disa dogru yumusak hale: "calisiyor" hissini tasiyan nabiz -->
      <circle cx="80" cy="80" r="52" class="goz__glow" />

      <!--
        SUREKLI DONEN YAY.
        Kirpma araliklarinda ekran duruyor gibi gorunuyordu; bu yay
        kesintisiz dondugu icin "islem suruyor" sinyali hic kesilmiyor.
        stroke-dasharray ile cevrenin ~1/4'u cizilir (2*pi*66 ≈ 415).
      -->
      <circle cx="80" cy="80" r="66" class="goz__arc" />

      <!--
        KIRPMA BURADA: tum goz grubu DIKEYDE olceklenir
        (scaleY 1 -> ~0.06 -> 1). Badem bicimi bir cizgiye inince goz
        kapanmis gorunur; ayri bir "kapak" nesnesi gerekmiyor.

        transform-origin merkez; vector-effect sayesinde cizgi
        kalinliklari olceklenirken bozulmuyor.
      -->
      <g class="goz__lid">
        <!--
          Hafif egilme: goz grubu cok az saga sola yatiyor. Tek basina
          fark edilmiyor ama kirpma ve bakis ile birleserek "bakiniyor"
          hissi veriyor.
        -->
        <g class="goz__tilt">
        <path d="M14 80 Q80 24 146 80 Q80 136 14 80 Z" fill="url(#gozSclera)" />

        <g clip-path="url(#gozClip)">
          <!-- Iris hafifce saga sola bakar: canlilik katiyor -->
          <g class="goz__drift">
            <circle cx="80" cy="80" r="26" fill="url(#gozIris)" />
            <circle cx="80" cy="80" r="26" class="goz__iris-ring" />
            <!-- Bebek: cok hafif nefes alir -->
            <circle cx="80" cy="80" r="11" class="goz__pupil" />
            <!-- Isik yansimasi -->
            <circle cx="70" cy="70" r="5" class="goz__spark" />
          </g>
        </g>

        <!-- Badem konturu en ustte: kapanirken net bir kapak hatti verir -->
        <path
          d="M14 80 Q80 24 146 80 Q80 136 14 80 Z"
          class="goz__outline"
          vector-effect="non-scaling-stroke"
        />
        </g>
      </g>
    </svg>
  </div>
</template>

<script setup>
defineProps({
  /** Satir ici / kucuk alanlar icin daha ufak surum. */
  small: { type: Boolean, default: false },
})
</script>

<style scoped>
.goz {
  /*
   * Olcu tek yerden: svg kareyi doldurur, kapsayici boyutu belirler.
   * em DEGIL px: katman ortasinda yazi tipi boyutundan bagimsiz olmali.
   */
  width: 132px;
  height: 132px;

  /*
   * Renkler PrimeVue tema degiskenlerinden; tema degisirse (koyu mod
   * dahil) goz de birlikte degisiyor. Yedek deger marka turuncusu
   * (#c60 -- Excel sablonlarindaki FFCC6600 ile ayni ton).
   */
  --goz-accent: var(--p-primary-color, #c60);
  --goz-accent-soft: var(--p-primary-300, #e8a55c);
  --goz-dark: var(--p-surface-900, #18181b);
  --goz-light: var(--p-surface-0, #fff);
}

.goz--sm {
  width: 64px;
  height: 64px;
}

.goz__svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

/* ---------- renkler ---------- */

.goz__iris-in {
  stop-color: var(--goz-accent-soft);
}
.goz__iris-mid {
  stop-color: var(--goz-accent);
}
.goz__iris-out {
  stop-color: var(--goz-accent);
  stop-opacity: 0.55;
}

.goz__sclera-top {
  stop-color: var(--goz-light);
  stop-opacity: 0.92;
}
.goz__sclera-bottom {
  stop-color: var(--goz-light);
  stop-opacity: 1;
}

.goz__iris-ring {
  fill: none;
  stroke: var(--goz-accent);
  stroke-opacity: 0.35;
  stroke-width: 1.5;
}

.goz__pupil {
  fill: var(--goz-dark);
}

.goz__spark {
  fill: var(--goz-light);
  opacity: 0.75;
}

.goz__outline {
  fill: none;
  stroke: var(--goz-accent);
  stroke-width: 4;
  stroke-linejoin: round;
}

.goz__glow {
  fill: var(--goz-accent);
  opacity: 0.12;
}

/* ---------- hareket ---------- */

/*
 * Yalnizca transform ve opacity animasyonlaniyor; ikisi de
 * kompozisyon katmaninda calisiyor, yani yerlesim/boyama tetiklemiyor.
 * Yukleme katmani zaten tarayiciyi mesgul bir anda gosteriliyor,
 * animasyonun kendisi kare dusurmemeli.
 */

/*
 * DONGU 1.9s (onceki surum 2.6s idi).
 *
 * Ilk surum "cok sakin" bulundu: kirpmalar arasindaki acik bekleme
 * uzundu ve ekran durmus gibi gorunuyordu. Donguyu kisaltmak +
 * asagidaki surekli donen yay + daha belirgin bakis deseni birlikte
 * hareket hissini acikca artiriyor.
 */
.goz__lid {
  transform-origin: 80px 80px;
  animation: goz-blink 1.9s ease-in-out infinite;
}

/*
 * Kirpma RITMI: dongunun buyuk kismi ACIK gecer, kapanma ~120 ms'de
 * biter. Esit araliklara yayilmis bir animasyon "makine gibi"
 * duruyordu; gercek goz kirpmasi kisa ve ani olur.
 *
 * UC kirpma var: tam kapanma (%38), hemen ardindan kisa bir ikinci
 * kirpma (%48) ve donguyu kapatirken ucuncu bir yarim kirpma (%82).
 * Cift/uclu kirpma tek kirpmaya gore belirgin sekilde daha canli.
 */
@keyframes goz-blink {
  0%,
  33% {
    transform: scaleY(1);
  }
  38% {
    transform: scaleY(0.06);
  }
  43% {
    transform: scaleY(1);
  }
  46% {
    transform: scaleY(1);
  }
  48% {
    transform: scaleY(0.14);
  }
  52%,
  79% {
    transform: scaleY(1);
  }
  82% {
    transform: scaleY(0.4);
  }
  86%,
  100% {
    transform: scaleY(1);
  }
}

/*
 * BAKIS DESENI: sola bak -> bekle -> saga bak -> bekle -> merkeze don.
 *
 * Ilk surum iki nokta arasinda sinus gibi salinip duruyordu; goz
 * "titriyor" gibi gorunuyordu. Gercek goz SICRAYARAK bakar ve
 * bakislar arasinda SABIT durur -- araliklarda duz plato birakmak
 * ve daha genis bir yay (+-7px) kullanmak dogal sonuc veriyor.
 */
.goz__drift {
  animation: goz-look 3.8s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}

@keyframes goz-look {
  0%,
  14% {
    transform: translateX(0);
  }
  24%,
  40% {
    transform: translateX(-7px);
  }
  52%,
  70% {
    transform: translateX(7px);
  }
  82%,
  100% {
    transform: translateX(0);
  }
}

/* Bebek nefesi -- onceki %12 yerine %22, gozle gorulur olsun. */
.goz__pupil {
  transform-origin: 80px 80px;
  animation: goz-pupil 1.9s ease-in-out infinite;
}

@keyframes goz-pupil {
  0%,
  100% {
    transform: scale(0.92);
  }
  45% {
    transform: scale(1.14);
  }
}

.goz__glow {
  transform-origin: 80px 80px;
  animation: goz-glow 1.9s ease-in-out infinite;
}

@keyframes goz-glow {
  0%,
  100% {
    transform: scale(0.9);
    opacity: 0.08;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.24;
  }
}

/*
 * SUREKLI DONEN YAY -- hareketin "hic durmayan" parcasi.
 *
 * Kirpma ve bakis araliklarla calistigi icin arada kisa duraklar
 * oluyor; bu yay kesintisiz dondugunden gosterge hicbir an donmus
 * gorunmuyor. Ayni zamanda klasik "yukleniyor" dilini korur.
 *
 * Cevre = 2*pi*66 ≈ 414.7; dasharray ile ~1/4'u cizili, gerisi bosluk.
 */
.goz__arc {
  fill: none;
  stroke: var(--goz-accent);
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: 104 311;
  transform-origin: 80px 80px;
  opacity: 0.55;
  animation: goz-spin 1.15s linear infinite;
}

@keyframes goz-spin {
  to {
    transform: rotate(360deg);
  }
}

/* Cok hafif egilme: tek basina fark edilmez, toplamda canlilik katar. */
.goz__tilt {
  transform-origin: 80px 80px;
  animation: goz-tilt 3.8s ease-in-out infinite;
}

@keyframes goz-tilt {
  0%,
  100% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(-2.5deg);
  }
  65% {
    transform: rotate(2.5deg);
  }
}

/*
 * HAREKET AZALTMA TERCIHI.
 *
 * Kirpma ve kayma TAMAMEN durur -- yanip sonen hareket bazi
 * kullanicilarda bas donmesi ve mide bulantisi yapabiliyor, isik
 * hassasiyeti olanlar icin de rahatsiz edici. Yine de "bir sey oluyor"
 * sinyali gerekli, bu yuzden haleye yavas ve dusuk genlikli bir opaklik
 * nabzi birakildi; konum degistiren hicbir hareket yok.
 */
@media (prefers-reduced-motion: reduce) {
  .goz__lid,
  .goz__drift,
  .goz__pupil,
  .goz__tilt,
  .goz__arc {
    animation: none;
  }

  /*
   * Yay DONMUYOR ama tamamen kaybolmasin: tam daire haline getirilip
   * sabit, soluk bir cerceve olarak birakiliyor -- aksi halde yarim
   * bir yay ortada asili kaliyor ve bozuk gorunuyor.
   */
  .goz__arc {
    stroke-dasharray: none;
    opacity: 0.25;
  }

  .goz__glow {
    animation: goz-glow-soft 2.4s ease-in-out infinite;
  }

  @keyframes goz-glow-soft {
    0%,
    100% {
      opacity: 0.1;
    }
    50% {
      opacity: 0.22;
    }
  }
}
</style>
