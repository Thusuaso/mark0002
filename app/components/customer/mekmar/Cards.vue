<template>
  <MobileList
    :items="list || []"
    :search-keys="['FirmaAdi', 'UlkeAdi', 'Temsilci', 'SatisciAdi', 'Marketing']"
    search-placeholder="Firma, ülke veya temsilci ara…"
    item-key="ID"
    :on-select="sec"
  >
    <template #default="{ item }">
      <div class="cc-head">
        <!--
          Bayrak tabloda ayri bir "Logo" kolonuydu. Tek basina bir
          bilgi degil, ulkenin isareti; bu yuzden ulke satirinin
          basinda duruyor ve ekran okuyuculardan gizli (yanindaki
          metin zaten ulkeyi soyluyor).
        -->
        <img
          v-if="item.Png_Flags"
          class="cc-flag"
          :src="bayrak(item.Png_Flags)"
          alt=""
          aria-hidden="true"
          loading="lazy"
          width="26"
          height="18"
        />
        <p class="cc-name">{{ item.FirmaAdi || "—" }}</p>
      </div>

      <p v-if="item.UlkeAdi || item.Marketing" class="cc-sub">
        <span v-if="item.UlkeAdi">{{ item.UlkeAdi }}</span>
        <span v-if="item.UlkeAdi && item.Marketing" aria-hidden="true"> · </span>
        <span v-if="item.Marketing">{{ item.Marketing }}</span>
      </p>

      <p v-if="item.Adres" class="cc-adres">{{ item.Adres }}</p>

      <div v-if="item.Temsilci || item.SatisciAdi" class="cc-kisiler">
        <span v-if="item.Temsilci" class="cc-kisi">
          <span class="cc-kisi__k">Temsilci</span>
          <span class="cc-kisi__v">{{ item.Temsilci }}</span>
        </span>
        <span v-if="item.SatisciAdi" class="cc-kisi">
          <span class="cc-kisi__k">Satışçı</span>
          <span class="cc-kisi__v">{{ item.SatisciAdi }}</span>
        </span>
      </div>

      <!--
        Tabloda bu iki kolon her satirda ✓ ya da X gosteriyordu, yani
        yerin yarisi "hayir" yaziyordu. Kartta yalnizca DOGRU olanlar
        rozet olarak cikiyor: bos kart "ikisi de degil" demek.
      -->
      <div v-if="item.Devir || item.Ozel" class="cc-rozetler">
        <span v-if="item.Devir" class="cc-rozet">Devredilmiş</span>
        <span v-if="item.Ozel" class="cc-rozet cc-rozet--ozel">Özel</span>
      </div>
    </template>
  </MobileList>
</template>

<script setup>
/*
 * components/customer/mekmar/Cards.vue  --  <CustomerMekmarCards>
 *
 * Sale Customers'in TELEFON gorunumu; masaustundeki CustomerMekmarList
 * (10 kolonlu DataTable) ile ayni veriyi ve ayni olayi kullaniyor.
 *
 * [!] SECIM MASAUSTUYLE AYNI ISI YAPMAK ZORUNDA: liste bileseni satira
 * tiklandiginda yalnizca emit etmiyor, AYRICA musterinin siparis
 * detayini da cekiyor (setMekmarDetailOrdersList). Yalnizca emit
 * edilseydi diyalog acilir ama siparis listesi BOS gelirdi -- ve bu,
 * tiklamayi deneyene kadar fark edilmezdi.
 */
const props = defineProps({
  list: { type: Array, default: () => [] },
})

const emit = defineEmits(["customer_mekmar_selected_emit"])

const customerStore = useCustomerStore()

/* Masaustu liste bileseni olayi `{ data }` seklinde veriyor; sayfa da
   onu oyle bekliyor. Bicim birebir korundu. */
function sec(item) {
  const event = { data: item }
  emit("customer_mekmar_selected_emit", event)
  customerStore.setMekmarDetailOrdersList(item.ID)
}

function bayrak(dosya) {
  return `https://cdn.mekmarimage.com/countryLogo/${dosya}`
}
</script>

<style scoped>
.cc-head {
  display: flex;
  gap: 9px;
  align-items: center;
}

.cc-flag {
  flex: none;
  width: 26px;
  height: 18px;
  object-fit: cover;
  border: 1px solid #e2e5ea;
  border-radius: 3px;
}

.cc-name {
  margin: 0;
  font-size: 15px;
  font-weight: 650;
  line-height: 1.3;
  color: #111827;
}

.cc-sub {
  margin: 5px 0 0;
  font-size: 12.5px;
  color: #4b5563;
}

/*
 * Adres UZUN olabiliyor ve karti tek basina iki katina cikariyordu.
 * Iki satirda kesiliyor; tamami detay diyalogunda.
 */
.cc-adres {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;

  margin: 7px 0 0;
  font-size: 12.5px;
  line-height: 1.45;
  color: #6b7280;
}

.cc-kisiler {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 9px;
}

.cc-kisi {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.cc-kisi__k {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: #6b7280;
}

.cc-kisi__v {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.cc-rozetler {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}

.cc-rozet {
  padding: 3px 9px;

  font-size: 11px;
  font-weight: 700;
  color: #0f766e;

  background: #e3f2ef;
  border-radius: 999px;
}

.cc-rozet--ozel {
  color: #7c2d12;
  background: #fef0e2;
}
</style>
