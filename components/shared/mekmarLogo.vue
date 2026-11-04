<!--
  Mekmar logosu, SVG olarak sifirdan cizildi.

  Renkler mevcut kurumsal logodan ornekledi:
    yesil  #35A235   mavi  #00A0E3   indigo  #39307A
  Isaret ayni kimlikte: indigo elmas, icinde yesil onay, ustunden mavi kavis.

  Olcu disaridan verilir (width/height veya font-size degil, css ile):
    <mekmarLogo style="width: 260px" />
  SVG oldugu icin her boyutta keskin kalir; yazi <text> ile cizildigi icin
  tarayici yazi tipine baglidir. pdfmake gibi bir yere gomulecekse once
  rasterlestirilmeli (bkz. plugins/... yok; supplier.vue base64 logo kullanir).
-->
<template>
  <svg
    class="mekmar-logo"
    viewBox="0 0 540 110"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    :aria-label="title"
  >
    <title>{{ title }}</title>

    <!-- isaret -->
    <g>
      <!-- indigo elmas (45 derece dondurulmus kare) -->
      <rect
        x="32"
        y="38"
        width="48"
        height="48"
        rx="2"
        transform="rotate(45 56 62)"
        fill="none"
        stroke="#39307A"
        stroke-width="5"
      />
      <!-- mavi kavis: sol alttan sag ust'e suzulur, elmasin ustunden gecer -->
      <path
        d="M2 98 C 18 54, 54 26, 114 14"
        fill="none"
        stroke="#00A0E3"
        stroke-width="7"
        stroke-linecap="round"
      />
      <!-- yesil onay: uzun kolu elmasin disina tasar -->
      <path
        d="M32 62 L50 82 L102 12"
        fill="none"
        stroke="#35A235"
        stroke-width="12"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>

    <!-- kelime isareti: MEK yesil, MAR mavi, tescil isareti yaziya bitisik -->
    <text
      x="132"
      y="86"
      font-family="Arial Black, Arial Bold, Arial, Helvetica, sans-serif"
      font-size="72"
      font-weight="700"
    >
      <tspan fill="#35A235">MEK</tspan><tspan fill="#00A0E3">MAR</tspan><tspan
        fill="#35A235"
        font-size="20"
        font-weight="400"
        dy="-38"
      >®</tspan>
    </text>
  </svg>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: "Mekmar Dış Ticaret Ltd. Şti.",
    },
  },
};
</script>

<style scoped>
.mekmar-logo {
  display: block;
  width: 100%;
  height: auto;
}
</style>
