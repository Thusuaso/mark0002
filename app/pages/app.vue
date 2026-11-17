<template>
  <div class="apk">
    <header class="apk__head">
      <div class="apk__mark" aria-hidden="true">
        <i class="pi pi-mobile" />
      </div>
      <div>
        <p class="apk__eyebrow">GOZ · Android</p>
        <h1 class="apk__title">Download the app</h1>
      </div>
      <span class="apk__badge">Version {{ guncel.version }}</span>
    </header>

    <section class="apk__dl">
      <a class="apk__btn" :href="apkUrl" download>
        <i class="pi pi-download" aria-hidden="true" />
        Download APK · {{ guncel.version }}
      </a>
      <p class="apk__hint">
        Open this page on your phone and tap download. If Android warns
        about an “unknown source”, that is because the app is not on the
        Play Store — allow it and carry on. When a new version comes out,
        download it from the same address and install it over the old
        one; your data is not affected.
      </p>
    </section>

    <section>
      <h2 class="apk__h2">Release notes</h2>

      <article v-for="(r, i) in releases" :key="r.version" class="apk__rel">
        <div class="apk__rel-head">
          <span class="apk__rel-ver" :class="{ 'apk__rel-ver--new': i === 0 }">
            {{ r.version }}
          </span>
          <span class="apk__rel-date">{{ tarih(r.date) }}</span>
          <span v-if="i === 0" class="apk__rel-tag">latest</span>
        </div>
        <ul class="apk__notes">
          <li v-for="(n, j) in r.notes" :key="j">{{ n }}</li>
        </ul>
      </article>
    </section>
  </div>
</template>

<script setup>
import { MOBILE_RELEASES } from "~/utils/mobileVersion"

/*
 * pages/app.vue  ->  /app
 *
 * APK indirme sayfasi ve surum notlari. Surum listesi
 * app/utils/mobileVersion.ts'ten geliyor; APK'nin kendi surum adi da
 * ayni dosyadan uretiliyor (tools/release-mobile.mjs), yani bu sayfada
 * yazan surum ile telefondaki uygulamanin surumu AYRILAMAZ.
 *
 * APK deponun icinde DEGIL: 13 MB'lik ikili her yayinda git gecmisine
 * eklenirdi. Dosya sunucuda duruyor ve nginx tarafindan servis ediliyor
 * (bkz. mobile/README.md -> Yayinlama).
 *
 * Sayfa giris gerektiriyor (layout varsayilani): APK sirket ici bir
 * uygulama, acik internete birakmanin gerekcesi yok. Telefondan once
 * tarayicida giris yapip buraya gelmek yeterli.
 */
const releases = MOBILE_RELEASES
const guncel = releases[0]

/* Surum adresin icinde: tarayici eski dosyayi onbellekten vermesin. */
const apkUrl = computed(() => `/downloads/goz-${guncel.version}.apk`)

function tarih(iso) {
  const d = new Date(iso)
  const iki = (n) => (n < 10 ? "0" + n : String(n))
  return `${iki(d.getDate())}.${iki(d.getMonth() + 1)}.${d.getFullYear()}`
}

useHead({ title: "GOZ · Android app" })
</script>

<style scoped>
.apk {
  max-width: 720px;
  margin: 0 auto;
  padding: 20px 16px 48px;
  color: #111827;
}

.apk__head {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;

  padding-bottom: 16px;
  margin-bottom: 20px;

  border-bottom: 1px solid #e2e5ea;
}

.apk__mark {
  display: grid;
  place-items: center;

  width: 42px;
  height: 42px;

  color: #ffffff;
  background: linear-gradient(140deg, #1d4ed8, #0f766e);
  border-radius: 11px;
}

.apk__eyebrow {
  margin: 0 0 2px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #4b5563;
}

.apk__title {
  margin: 0;
  font-size: 20px;
  font-weight: 650;
  letter-spacing: -0.015em;
}

.apk__badge {
  margin-left: auto;
  padding: 5px 11px;

  font-size: 12px;
  font-weight: 600;
  color: #374151;

  background: #eef1f5;
  border-radius: 999px;
}

.apk__dl {
  padding: 18px;
  margin-bottom: 26px;
  background: #f6f7f9;
  border: 1px solid #e2e5ea;
  border-radius: 12px;
}

.apk__btn {
  display: inline-flex;
  gap: 9px;
  align-items: center;

  /* Dokunma hedefi 44px'in altina dusmesin. */
  min-height: 48px;
  padding: 0 20px;

  font-size: 15px;
  font-weight: 650;
  color: #ffffff;
  text-decoration: none;

  background: #1d4ed8;
  border-radius: 10px;
}

.apk__btn:hover {
  background: #1e3a8a;
  color: #ffffff;
}

.apk__hint {
  margin: 14px 0 0;
  font-size: 13px;
  line-height: 1.55;
  color: #4b5563;
}

.apk__h2 {
  margin: 0 0 14px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #4b5563;
}

.apk__rel {
  padding: 14px 16px;
  margin-bottom: 12px;
  background: #ffffff;
  border: 1px solid #e2e5ea;
  border-radius: 12px;
}

.apk__rel-head {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 8px;
}

.apk__rel-ver {
  font-size: 15px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.apk__rel-ver--new {
  color: #1d4ed8;
}

.apk__rel-date {
  font-size: 12px;
  color: #4b5563;
}

.apk__rel-tag {
  padding: 2px 8px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #0f766e;
  background: #e3f2ef;
  border-radius: 999px;
}

.apk__notes {
  margin: 0;
  padding-left: 18px;
}

.apk__notes li {
  margin-bottom: 5px;
  font-size: 14px;
  line-height: 1.55;
  color: #374151;
}
</style>
