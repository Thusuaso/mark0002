<template>
  <MobileList
    :items="offer || []"
    :search-keys="['MusteriAdi', 'Company', 'UlkeAdi', 'KullaniciAdi', 'Mail']"
    search-placeholder="Müşteri, firma veya ülke ara…"
    :on-select="(item) => $emit('offer_customer_selected', { data: item })"
  >
    <template #default="{ item }">
      <p class="qc-ad">{{ item.MusteriAdi || "—" }}</p>
      <p v-if="item.Company" class="qc-firma">{{ item.Company }}</p>

      <p v-if="item.UlkeAdi || item.KullaniciAdi" class="qc-alt">
        <span v-if="item.UlkeAdi">{{ item.UlkeAdi }}</span>
        <span v-if="item.UlkeAdi && item.KullaniciAdi" aria-hidden="true"> · </span>
        <span v-if="item.KullaniciAdi">{{ item.KullaniciAdi }}</span>
      </p>

      <p v-if="item.Adress" class="qc-adres">{{ item.Adress }}</p>

      <!--
        TELEFONDAKI ASIL KAZANC: mail ve telefon DOKUNULABILIR.
        Tabloda ikisi de duz metindi; telefonda numarayi okuyup elle
        cevirmek gerekiyordu. tel: ve mailto: isletim sisteminin kendi
        uygulamasini aciyor.

        @click.stop ZORUNLU: kart da tiklanabilir (detay dialogunu
        aciyor). Durdurulmazsa numaraya basmak hem aramayi baslatir
        hem dialogu acardi.
      -->
      <div v-if="item.Phone || item.Mail" class="qc-iletisim">
        <a
          v-if="item.Phone"
          class="qc-link"
          :href="'tel:' + temizNumara(item.Phone)"
          @click.stop
        >
          <i class="pi pi-phone" aria-hidden="true" />
          {{ item.Phone }}
        </a>
        <a
          v-if="item.Mail"
          class="qc-link qc-link--mail"
          :href="'mailto:' + item.Mail"
          @click.stop
        >
          <i class="pi pi-envelope" aria-hidden="true" />
          {{ item.Mail }}
        </a>
      </div>
    </template>
  </MobileList>
</template>

<script setup>
/*
 * components/customer/offer/Cards.vue  --  <CustomerOfferCards>
 *
 * Quote Customers'in TELEFON gorunumu; masaustundeki CustomerOfferList
 * (7 kolonlu DataTable) ile ayni veriyi ve ayni olayi kullaniyor.
 *
 * Masaustu tablosu @row-click kullandigi icin olay `{ data }` seklinde
 * geliyor ve sayfa `event.data`yi bekliyor; bicim birebir korundu.
 */
defineProps({
  offer: { type: Array, default: () => [] },
})

defineEmits(["offer_customer_selected"])

/*
 * tel: adresi bosluk, parantez ve tire kaldirmiyor -- bazi
 * telefonlarda cagri hic baslamiyor. Gosterilen metin OLDUGU GIBI
 * kaliyor, yalnizca adres sadelesiyor.
 */
function temizNumara(n) {
  return String(n ?? "").replace(/[^\d+]/g, "")
}
</script>

<style scoped>
.qc-ad {
  margin: 0;
  font-size: 15px;
  font-weight: 650;
  line-height: 1.3;
  color: #111827;
}

.qc-firma {
  margin: 2px 0 0;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
}

.qc-alt {
  margin: 5px 0 0;
  font-size: 12.5px;
  color: #4b5563;
}

/* Adres uzun olabiliyor ve karti tek basina iki katina cikariyor;
   iki satirda kesiliyor, tamami detay diyalogunda. */
.qc-adres {
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

.qc-iletisim {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.qc-link {
  display: inline-flex;
  gap: 6px;
  align-items: center;

  /* 44px dokunma hedefi -- yanlis numaraya basmak telefonda
     geri alinmasi zor bir hata. */
  min-height: 40px;
  padding: 0 12px;

  font-size: 12.5px;
  font-weight: 600;
  color: #1d4ed8;
  text-decoration: none;

  background: #eef2ff;
  border-radius: 999px;
}

.qc-link--mail {
  color: #0f766e;
  background: #e3f2ef;
}

.qc-link .pi {
  font-size: 12px;
}
</style>
