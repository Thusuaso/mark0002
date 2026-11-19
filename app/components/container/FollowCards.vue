<template>
  <MobileList
    :items="list || []"
    :search-keys="[
      'SiparisNo',
      'MusteriAdi',
      'KonteynerNo',
      'AktarmaLimanAdi',
      'AcenteAdi',
      'Sorumlu',
    ]"
    search-placeholder="PO, müşteri, konteyner veya liman ara…"
    item-key="SiparisNo"
    :on-select="(item) => $emit('follow-selected-dialog-emit', item)"
  >
    <template #default="{ item }">
      <!--
        VARISA KALAN GUN BASLIKTA.

        Bu ekranin tek sorusu "ne zaman gelecek". Tabloda o sayi
        ("Time to Arrival") on uc kolonun arasinda, digerleriyle ayni
        agirlikta duruyordu. Kartta sagda ve en buyuk eleman.
      -->
      <div class="fc-head">
        <span class="fc-po">{{ item.SiparisNo || "—" }}</span>
        <span class="fc-kalan" :class="kalanSinifi(item)">
          <template v-if="etaVar(item)">
            <span class="fc-kalan__n">{{ item.Kalan }}</span>
            <span class="fc-kalan__b">gün</span>
          </template>
          <span v-else class="fc-kalan__yok">tarih yok</span>
        </span>
      </div>

      <p class="fc-musteri">{{ item.MusteriAdi || "—" }}</p>

      <!-- Konteyner numarasi: aranan ve karsilastirilan deger, tabular. -->
      <p v-if="item.KonteynerNo" class="fc-konteyner">
        <i class="pi pi-box" aria-hidden="true" />
        {{ item.KonteynerNo }}
      </p>

      <dl class="fc-tarihler">
        <div>
          <dt>Yükleme</dt>
          <dd>{{ dateToString(item.YuklemeTarihi) || "—" }}</dd>
        </div>
        <!--
          Gemi kalkisi. Yuklemenin hemen yaninda duruyor cunku ikisi
          birlikte "mal ne zaman yola cikti" sorusunu cevapliyor;
          varis tarihi ayri bir soru ve zaten basliktaki gun sayisi
          onu tasiyor.
        -->
        <div>
          <dt>Gemi kalkışı</dt>
          <dd>{{ dateToString(item.GemiKalkisTarihi) || "—" }}</dd>
        </div>
        <div>
          <dt>Tahmini varış</dt>
          <dd>{{ etaVar(item) ? dateToString(item.Eta) : "—" }}</dd>
        </div>
        <div v-if="item.AktarmaLimanAdi">
          <dt>Liman</dt>
          <dd>{{ item.AktarmaLimanAdi }}</dd>
        </div>
        <div v-if="item.Sorumlu">
          <dt>Sorumlu</dt>
          <dd>{{ item.Sorumlu }}</dd>
        </div>
      </dl>

      <div class="fc-alt">
        <!--
          Konsimento durumu: tabloda her satirda "Sent" ya da
          "Not Sent" yaziyordu. Kartta yalnizca GONDERILMEMIS olan
          isaretleniyor -- is cikaran durum o; gonderilmis olan sessiz
          kaliyor.
        -->
        <span v-if="!item.KonsimentoDurum" class="fc-rozet fc-rozet--bekl">
          Konşimento gönderilmedi
        </span>

        <!--
          Acente takip adresi. @click.stop ZORUNLU: kart da tiklanabilir
          (duzenleme dialogunu aciyor) ve durdurulmazsa linke basmak hem
          yeni sekme acar hem dialogu actirir. Masaustu tablosunda da
          ayni koruma var.
        -->
        <a
          v-if="item.TakipLinki"
          class="fc-takip"
          :href="item.TakipLinki"
          target="_blank"
          rel="noopener noreferrer"
          @click.stop
        >
          <i class="pi pi-external-link" aria-hidden="true" />
          {{ item.AcenteAdi || "Takip" }}
        </a>
        <span v-else-if="item.AcenteAdi" class="fc-acente">
          {{ item.AcenteAdi }}
        </span>
      </div>
    </template>
  </MobileList>
</template>

<script setup>
/*
 * components/container/FollowCards.vue  --  <ContainerFollowCards>
 *
 * Container Tracking'in TELEFON gorunumu; masaustundeki
 * ContainerFollowList (13 kolonlu DataTable) ile ayni veriyi ve ayni
 * olayi kullaniyor.
 *
 * [!] OLAY BICIMI MASAUSTUYLE AYNI: liste bileseni
 * `follow-selected-dialog-emit` olayini DUZ SATIR NESNESIYLE atiyor
 * (`event.data` degil, dogrudan `data`). Sayfa onu followModel'e
 * yaziyor. Sarmalanmis gonderilseydi dialog bos acilirdi.
 */
defineProps({
  list: { type: Array, default: () => [] },
})

defineEmits(["follow-selected-dialog-emit"])

/*
 * Eta girilmemis kayitlar sunucuda NULL'a cevriliyor (yer tutucu
 * 1900-01-01 temizleniyor, bkz. api/index.js etaGecerli) ve Kalan 0
 * kaliyor. "0 gun" yazmak "bugun variyor" demek olurdu; bu yuzden
 * tarihi olmayan kayitta sayi degil "tarih yok" gosteriliyor.
 */
function etaVar(item) {
  return !!item.Eta
}

/*
 * Kalan gun rengi. Aciliyet SADECE renkle anlatilmiyor -- sayi zaten
 * orada ve en buyuk eleman; renk ikincil bir ipucu.
 */
function kalanSinifi(item) {
  if (!etaVar(item)) return "fc-kalan--yok"
  const k = parseInt(item.Kalan)
  if (isNaN(k)) return "fc-kalan--yok"
  if (k <= 3) return "fc-kalan--acil"
  if (k <= 10) return "fc-kalan--yakin"
  return "fc-kalan--uzak"
}
</script>

<style scoped>
.fc-head {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.fc-po {
  flex-grow: 1;
  min-width: 0;

  font-size: 15px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: #111827;
}

/* Varisa kalan gun: kartin en buyuk elemani. */
.fc-kalan {
  display: flex;
  flex: none;
  flex-direction: column;
  align-items: center;

  min-width: 58px;
  padding: 4px 8px;

  border-radius: 10px;
}

.fc-kalan__n {
  font-size: 19px;
  font-weight: 700;
  line-height: 1.05;
  font-variant-numeric: tabular-nums;
}

.fc-kalan__b {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  opacity: 0.85;
}

.fc-kalan__yok {
  font-size: 11px;
  font-weight: 600;
}

.fc-kalan--acil {
  color: #7c2d12;
  background: #fee9d8;
}

.fc-kalan--yakin {
  color: #92400e;
  background: #fef3c7;
}

.fc-kalan--uzak {
  color: #0f766e;
  background: #e3f2ef;
}

.fc-kalan--yok {
  color: #6b7280;
  background: #f1f3f6;
}

.fc-musteri {
  margin: 5px 0 0;
  font-size: 13.5px;
  font-weight: 600;
  line-height: 1.3;
  color: #374151;
}

.fc-konteyner {
  display: inline-flex;
  gap: 6px;
  align-items: center;

  margin: 8px 0 0;
  padding: 3px 9px;

  font-size: 12.5px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
  color: #374151;

  background: #eef1f5;
  border-radius: 6px;
}

.fc-konteyner .pi {
  font-size: 11px;
  color: #6b7280;
}

/* Tarihler ve yer: iki sutun, etiket ustte. */
.fc-tarihler {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px 14px;

  padding-top: 10px;
  margin: 10px 0 0;

  border-top: 1px solid #f0f2f5;
}

.fc-tarihler dt {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #6b7280;
}

.fc-tarihler dd {
  margin: 1px 0 0;
  font-size: 13px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: #374151;
}

.fc-alt {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-top: 10px;
}

.fc-rozet {
  padding: 3px 9px;
  font-size: 11px;
  font-weight: 700;
  border-radius: 999px;
}

.fc-rozet--bekl {
  color: #92400e;
  background: #fef3c7;
}

/* Takip baglantisi: 40px dokunma hedefi, kartin kendi tiklamasindan
   ayri bir eylem oldugu belli olsun diye zeminli. */
.fc-takip {
  display: inline-flex;
  gap: 6px;
  align-items: center;

  min-height: 40px;
  padding: 0 12px;
  margin-left: auto;

  font-size: 12.5px;
  font-weight: 600;
  color: #1d4ed8;
  text-decoration: none;

  background: #eef2ff;
  border-radius: 999px;
}

.fc-takip .pi {
  font-size: 11px;
}

.fc-acente {
  margin-left: auto;
  font-size: 12.5px;
  color: #6b7280;
}
</style>
