<template>
  <div class="chat-root">
    <!-- Sag altta duran acma dugmesi + okunmamis rozeti -->
    <button
      class="chat-launcher"
      :class="{ 'is-open': panelOpen }"
      @click="togglePanel"
      :title="panelOpen ? 'Sohbeti kapat' : 'Sohbet'"
    >
      <i :class="panelOpen ? 'pi pi-times' : 'pi pi-comments'"></i>
      <span v-if="!panelOpen && unreadTotal > 0" class="chat-badge">
        {{ unreadTotal > 99 ? "99+" : unreadTotal }}
      </span>
    </button>

    <div
      v-show="panelOpen"
      class="chat-panel"
      :class="{ 'is-drag': surukleniyor }"
      @dragover.prevent="surukleGirdi"
      @dragleave.prevent="surukleCikti"
      @drop.prevent="birakildi"
    >
      <div class="chat-head">
        <div v-if="activeUser" class="chat-head-user">
          <button class="chat-back" @click="closeThread" title="Listeye dön">
            <i class="pi pi-arrow-left"></i>
          </button>
          <span class="chat-dot" :class="durumSinifi(activeUser)"></span>
          <div class="chat-head-text">
            <strong>{{ activeUser.KullaniciAdi }}</strong>
            <small>{{ durumYazisi(activeUser) }}</small>
          </div>
          <button
            v-if="takipReady"
            class="chat-star"
            :class="{ on: isTakip(activeUser.ID) }"
            :title="
              isTakip(activeUser.ID)
                ? 'Çevrimiçi olunca bildirme'
                : 'Çevrimiçi olunca bildir'
            "
            @click="takipDegistir(activeUser.ID)"
          >
            <i :class="isTakip(activeUser.ID) ? 'pi pi-star-fill' : 'pi pi-star'"></i>
          </button>
        </div>
        <div v-else class="chat-head-text">
          <strong>Sohbet</strong>
          <small>{{ onlineCount }} kişi çevrimiçi</small>
        </div>
      </div>

      <!-- Kurulum yapilmadiysa kullanicinin ne yapacagi yazili olsun -->
      <div v-if="!chatReady" class="chat-empty">
        <i class="pi pi-exclamation-triangle"></i>
        <p>Sohbet veritabanı kurulumu tamamlanmamış.</p>
        <small>api/sql/SohbetMesajTB.sql çalıştırılmalı.</small>
      </div>

      <!-- Kullanici listesi -->
      <div v-else-if="!activeUser" class="chat-list">
        <div class="chat-search">
          <i class="pi pi-search"></i>
          <input v-model="arama" type="text" placeholder="Kişi ara" />
        </div>
        <div v-if="filtrelenmisKisiler.length === 0" class="chat-empty">
          <p>Kişi bulunamadı.</p>
        </div>
        <div
          v-for="kisi in filtrelenmisKisiler"
          :key="kisi.ID"
          class="chat-row"
        >
          <button class="chat-row-main" @click="openThread(kisi)">
            <span class="chat-dot" :class="durumSinifi(kisi)"></span>
            <span class="chat-row-text">
              <strong>{{ kisi.KullaniciAdi }}</strong>
              <!-- Isim altinda her zaman durum yazilir: "Çevrimiçi",
                   "12 dk önce aktif" veya "Son görülme: ...". Eskiden son
                   mesajin ozeti gosteriliyordu. -->
              <small>{{ durumYazisi(kisi) }}</small>
            </span>
            <span v-if="kisi.Okunmamis > 0" class="chat-count">
              {{ kisi.Okunmamis }}
            </span>
          </button>
          <button
            v-if="takipReady"
            class="chat-star"
            :class="{ on: isTakip(kisi.ID) }"
            :title="
              isTakip(kisi.ID)
                ? 'Çevrimiçi olunca bildirme'
                : 'Çevrimiçi olunca bildir'
            "
            @click="takipDegistir(kisi.ID)"
          >
            <i :class="isTakip(kisi.ID) ? 'pi pi-star-fill' : 'pi pi-star'"></i>
          </button>
        </div>
      </div>

      <!-- Yazisma -->
      <template v-else>
        <div ref="akis" class="chat-thread" @scroll="akisKaydirildi">
          <div v-if="loadingHistory" class="chat-info">Yükleniyor…</div>
          <button
            v-else-if="dahaVar"
            class="chat-more"
            @click="$store.dispatch('setChatOlderMessages')"
          >
            Daha eski mesajlar
          </button>
          <div v-if="messages.length === 0 && !loadingHistory" class="chat-empty">
            <p>Henüz mesaj yok.</p>
          </div>
          <div
            v-for="mesaj in messages"
            :key="mesaj.ID"
            class="chat-msg"
            :class="benimMi(mesaj) ? 'mine' : 'theirs'"
          >
            <div class="chat-bubble">
              <!-- Goruntu eki: kaynak korumali uc, anahtar istemcide yok.
                   @load ile akis en alta iner, yoksa resim yuklenince
                   son mesaj gorus alaninin altinda kalirdi. -->
              <img
                v-if="mesaj.Dosya"
                class="chat-img"
                :src="mesaj.Dosya.Url"
                :alt="mesaj.Dosya.Ad || 'görüntü'"
                @click="resmiAc(mesaj)"
                @load="enAltaIn"
              />
              <span v-if="mesaj.Mesaj" class="chat-text">{{ mesaj.Mesaj }}</span>
              <span class="chat-meta">
                {{ saat(mesaj.GonderimTarihi) }}
                <i
                  v-if="benimMi(mesaj)"
                  :class="mesaj.OkunduTarihi ? 'pi pi-check-circle' : 'pi pi-check'"
                  :title="mesaj.OkunduTarihi ? 'Okundu' : 'Gönderildi'"
                ></i>
              </span>
            </div>
          </div>
        </div>

        <!-- Gonderilmeyi bekleyen goruntu -->
        <div v-if="ek" class="chat-ek">
          <img :src="ekOnizleme" alt="" />
          <div class="chat-ek-bilgi">
            <strong>{{ ek.genislik }}&times;{{ ek.yukseklik }}</strong>
            <small>{{ ekBoyut }}</small>
            <div v-if="yukleniyor" class="chat-ek-bar">
              <span :style="{ width: yuzde + '%' }"></span>
            </div>
          </div>
          <button
            type="button"
            class="chat-ek-sil"
            title="Kaldır"
            :disabled="gonderiliyor"
            @click="ekKaldir"
          >
            <i class="pi pi-times"></i>
          </button>
        </div>

        <form class="chat-form" @submit.prevent="gonder">
          <!-- Telefonda ayni dugme kamerayi acar -->
          <input
            ref="dosyaGirisi"
            type="file"
            accept="image/*"
            class="chat-gizli"
            @change="dosyaSecildi"
          />
          <button
            v-if="dosyaReady"
            type="button"
            class="chat-ikincil"
            title="Görüntü ekle (Ctrl+V ile de yapıştırabilirsiniz)"
            :disabled="gonderiliyor"
            @click="dosyaSec"
          >
            <i class="pi pi-paperclip"></i>
          </button>
          <button
            v-if="dosyaReady && ekranDestekli"
            type="button"
            class="chat-ikincil"
            title="Ekran görüntüsü al"
            :disabled="gonderiliyor"
            @click="ekranAl"
          >
            <i class="pi pi-desktop"></i>
          </button>
          <textarea
            ref="giris"
            v-model="metin"
            rows="1"
            :placeholder="ek ? 'Alt yazı (isteğe bağlı)…' : 'Mesaj yazın…'"
            :maxlength="MESAJ_MAX"
            @keydown.enter.exact.prevent="gonder"
            @paste="yapistir"
          ></textarea>
          <button type="submit" :disabled="!gonderilebilir || gonderiliyor">
            <i class="pi pi-send"></i>
          </button>
        </form>
      </template>
    </div>

    <!-- Goruntuye tiklayinca tam ekran -->
    <div v-if="buyukResim" class="chat-lightbox" @click="buyukResim = null">
      <img :src="buyukResim" alt="" @click.stop />
      <a
        class="chat-lightbox-link"
        :href="buyukResim"
        target="_blank"
        rel="noopener"
        @click.stop
        >Yeni sekmede aç</a
      >
    </div>

    <!-- Ekran goruntusu kirpma -->
    <div v-if="kirpma" class="chat-kirp">
      <div class="chat-kirp-ic">
        <p class="chat-kirp-bilgi">
          Fare ile göndermek istediğiniz alanı seçin. Seçim yapmazsanız
          görüntünün tamamı gönderilir.
        </p>
        <div
          ref="kirpKutu"
          class="chat-kirp-tuval"
          @mousedown="kirpBasla"
          @mousemove="kirpSurukle"
          @mouseup="kirpBitir"
          @mouseleave="kirpBitir"
        >
          <img ref="kirpResim" :src="kirpma.url" alt="" draggable="false" />
          <div v-if="secim" class="chat-kirp-secim" :style="secimStil"></div>
        </div>
        <div class="chat-kirp-dugmeler">
          <button type="button" @click="kirpIptal">İptal</button>
          <button type="button" v-if="secim" @click="secim = null">
            Seçimi temizle
          </button>
          <button type="button" class="ana" @click="kirpOnayla">Ekle</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  panodanDosya,
  resimHazirla,
  ekranKaresiAl,
  resmiKirp,
  boyutYazisi,
} from "~/utils/chatDosya";

const MESAJ_MAX = 4000; // SohbetMesajTB.Mesaj ile ayni
/* Bu sureden uzun suredir etkileşim yoksa kullanici "cevrimici" degil
   "X dakika once aktif" gorunur; sekmeyi acik birakip gidenler icin. */
const BOSTA_ESIK_MS = 5 * 60 * 1000;

export default {
  name: "ChatPanel",
  data() {
    return {
      metin: "",
      arama: "",
      gonderiliyor: false,
      MESAJ_MAX: MESAJ_MAX,
      /* "3 dk once aktif" gibi goreli yazilarin kendi kendine tazelenmesi
         icin dakikada bir guncellenen saat. */
      simdi: Date.now(),
      sayacZamanlayici: null,
      /* Gonderilmeyi bekleyen goruntu: resimHazirla sonucu. */
      ek: null,
      ekOnizleme: null,
      yukleniyor: false,
      yuzde: 0,
      surukleniyor: false,
      buyukResim: null,
      /* Ekran goruntusu kirpma penceresi: { blob, url, genislik, yukseklik } */
      kirpma: null,
      /* Kirpma secimi, EKRANDA gorunen olcude px: { x, y, g, y2 } */
      secim: null,
      kirpBaslangic: null,
    };
  },
  mounted() {
    this.sayacZamanlayici = setInterval(() => {
      this.simdi = Date.now();
    }, 60 * 1000);
  },
  beforeDestroy() {
    if (this.sayacZamanlayici) {
      clearInterval(this.sayacZamanlayici);
    }
    /* Onizleme icin uretilen blob adresleri serbest birakilir. */
    this.ekKaldir();
    this.kirpmayiKapat();
  },
  computed: {
    ...mapGetters({
      kisiler: "getChatUsers",
      online: "getChatOnline",
      activeUserId: "getChatActiveUserId",
      messages: "getChatMessages",
      loadingHistory: "getChatLoadingHistory",
      dahaVar: "getChatDahaVar",
      chatReady: "getChatReady",
      panelOpen: "getChatPanelOpen",
      unreadTotal: "getChatUnreadTotal",
      onlineCount: "getChatOnlineCount",
      benId: "getUserId",
      aktiflik: "getChatAktiflik",
      takip: "getChatTakip",
      takipReady: "getChatTakipReady",
      dosyaReady: "getChatDosyaReady",
    }),
    /* Ekran goruntusu yalnizca destekleyen tarayicilarda ve guvenli
       baglantida (https veya localhost) calisir; yoksa dugme gorunmez. */
    ekranDestekli() {
      return (
        typeof navigator !== "undefined" &&
        !!navigator.mediaDevices &&
        !!navigator.mediaDevices.getDisplayMedia
      );
    },
    gonderilebilir() {
      return !!this.metin.trim() || !!this.ek;
    },
    ekBoyut() {
      return this.ek ? boyutYazisi(this.ek.blob.size) : "";
    },
    secimStil() {
      if (!this.secim) return {};
      return {
        left: this.secim.x + "px",
        top: this.secim.y + "px",
        width: this.secim.g + "px",
        height: this.secim.y2 + "px",
      };
    },
    activeUser() {
      if (!this.activeUserId) return null;
      return (
        this.kisiler.find((x) => Number(x.ID) === Number(this.activeUserId)) || null
      );
    },
    filtrelenmisKisiler() {
      const q = this.arama.trim().toLocaleLowerCase("tr");
      if (!q) return this.kisiler;
      return this.kisiler.filter((x) =>
        String(x.KullaniciAdi || "").toLocaleLowerCase("tr").includes(q)
      );
    },
  },
  watch: {
    // Yeni mesaj gelince en alta in
    messages() {
      this.$nextTick(this.enAltaIn);
    },
  },
  methods: {
    togglePanel() {
      const yeni = !this.panelOpen;
      this.$store.dispatch("setChatPanelOpen", yeni);
      if (yeni) {
        // Panel her acilista tazelenir: baska sekmede okunmus olabilir
        this.$store.dispatch("setChatUserList");
      }
    },
    isOnline(id) {
      return this.online.indexOf(Number(id)) !== -1;
    },
    isTakip(id) {
      return this.takip.indexOf(Number(id)) !== -1;
    },
    takipDegistir(id) {
      this.$store.dispatch("setChatWatchToggle", id);
    },
    /* Son gercek etkileşim zamani: canli soket verisi varsa o, yoksa
       veritabanindan gelen SonAktif kullanilir (cevrimdisi kisiler icin). */
    sonAktifZamani(kisi) {
      const canli = this.aktiflik[Number(kisi.ID)];
      const kaynak = canli || kisi.SonAktif;
      if (!kaynak) return null;
      const t = new Date(kaynak).getTime();
      return isNaN(t) ? null : t;
    },
    bostaMi(kisi) {
      const t = this.sonAktifZamani(kisi);
      if (t == null) return true;
      return this.simdi - t > BOSTA_ESIK_MS;
    },
    durumSinifi(kisi) {
      if (!this.isOnline(kisi.ID)) return {};
      return this.bostaMi(kisi) ? { idle: true } : { on: true };
    },
    /* "Çevrimiçi" / "12 dk önce aktif" / "Son görülme: ..." */
    durumYazisi(kisi) {
      const t = this.sonAktifZamani(kisi);
      if (this.isOnline(kisi.ID)) {
        if (!this.bostaMi(kisi)) return "Çevrimiçi";
        return this.goreliZaman(t) + " aktif";
      }
      if (t == null) return "Çevrimdışı";
      return "Son görülme: " + this.goreliZaman(t);
    },
    goreliZaman(t) {
      if (t == null) return "";
      const fark = Math.max(0, this.simdi - t);
      const dk = Math.floor(fark / 60000);
      if (dk < 1) return "az önce";
      if (dk < 60) return dk + " dk önce";
      const saat = Math.floor(dk / 60);
      if (saat < 24) return saat + " saat önce";
      const gun = Math.floor(saat / 24);
      if (gun < 7) return gun + " gün önce";
      const d = new Date(t);
      const iki = (n) => (n < 10 ? "0" + n : String(n));
      return `${iki(d.getDate())}.${iki(d.getMonth() + 1)}.${d.getFullYear()}`;
    },
    benimMi(mesaj) {
      return Number(mesaj.GonderenID) === Number(this.benId);
    },
    saat(tarih) {
      if (!tarih) return "";
      const d = new Date(tarih);
      if (isNaN(d.getTime())) return "";
      const iki = (n) => (n < 10 ? "0" + n : String(n));
      const bugun = new Date();
      const ayniGun =
        d.getFullYear() === bugun.getFullYear() &&
        d.getMonth() === bugun.getMonth() &&
        d.getDate() === bugun.getDate();
      const saat = `${iki(d.getHours())}:${iki(d.getMinutes())}`;
      return ayniGun ? saat : `${iki(d.getDate())}.${iki(d.getMonth() + 1)} ${saat}`;
    },
    openThread(kisi) {
      this.$store.dispatch("setChatActiveUser", kisi.ID).then(() => {
        this.$nextTick(() => {
          this.enAltaIn();
          if (this.$refs.giris) this.$refs.giris.focus();
        });
      });
    },
    closeThread() {
      this.$store.dispatch("setChatActiveUser", null);
      this.metin = "";
    },
    enAltaIn() {
      const el = this.$refs.akis;
      if (el) el.scrollTop = el.scrollHeight;
    },
    akisKaydirildi(e) {
      // Yukari ulasildiginda eski mesajlari yukle
      if (e.target.scrollTop <= 4 && this.dahaVar && !this.loadingHistory) {
        this.$store.dispatch("setChatOlderMessages");
      }
    },
    gonder() {
      const metin = this.metin.trim();
      if ((!metin && !this.ek) || this.gonderiliyor) return;
      this.gonderiliyor = true;
      this.yuzde = 0;
      this.yukleniyor = !!this.ek;
      this.$store
        .dispatch("setChatSend", {
          mesaj: metin,
          dosya: this.ek,
          ilerleme: (yuzde) => {
            this.yuzde = yuzde;
          },
        })
        .then((sonuc) => {
          this.gonderiliyor = false;
          this.yukleniyor = false;
          if (sonuc && sonuc.status) {
            this.metin = "";
            this.ekKaldir();
            this.$nextTick(this.enAltaIn);
          }
        });
    },

    /* ---------------- Goruntu eki ---------------- */
    dosyaSec() {
      if (this.$refs.dosyaGirisi) this.$refs.dosyaGirisi.click();
    },
    dosyaSecildi(olay) {
      const dosya = olay.target.files && olay.target.files[0];
      /* Ayni dosya ikinci kez secilebilsin diye alan sifirlanir. */
      olay.target.value = "";
      if (dosya) this.ekAyarla(dosya, "goruntu");
    },
    /* Win+Shift+S ile kesilen goruntu Ctrl+V ile buraya duser. Panoda
       goruntu yoksa olaya karisilmaz, metin normal sekilde yapistirilir. */
    yapistir(olay) {
      if (!this.dosyaReady) return;
      const dosya = panodanDosya(olay);
      if (!dosya) return;
      olay.preventDefault();
      this.ekAyarla(dosya, "ekran-goruntusu");
    },
    surukleGirdi() {
      if (this.dosyaReady && this.activeUser) this.surukleniyor = true;
    },
    surukleCikti() {
      this.surukleniyor = false;
    },
    birakildi(olay) {
      this.surukleniyor = false;
      if (!this.dosyaReady || !this.activeUser) return;
      const dosya =
        olay.dataTransfer &&
        olay.dataTransfer.files &&
        olay.dataTransfer.files[0];
      if (dosya) this.ekAyarla(dosya, "goruntu");
    },
    async ekAyarla(dosya, adOnEki) {
      const sonuc = await resimHazirla(dosya, adOnEki);
      if (sonuc.hata) {
        this.$toast.error(sonuc.hata);
        return;
      }
      this.ekKaldir();
      this.ek = sonuc;
      this.ekOnizleme = URL.createObjectURL(sonuc.blob);
      this.$nextTick(() => {
        if (this.$refs.giris) this.$refs.giris.focus();
      });
    },
    ekKaldir() {
      if (this.ekOnizleme) {
        URL.revokeObjectURL(this.ekOnizleme);
      }
      this.ekOnizleme = null;
      this.ek = null;
      this.yuzde = 0;
      this.yukleniyor = false;
    },
    resmiAc(mesaj) {
      if (mesaj && mesaj.Dosya) this.buyukResim = mesaj.Dosya.Url;
    },

    /* ---------------- Ekran goruntusu ---------------- */
    async ekranAl() {
      const sonuc = await ekranKaresiAl();
      if (sonuc.hata) {
        this.$toast.error(sonuc.hata);
        return;
      }
      /* hata null ve blob yok => kullanici paylasimi iptal etti. */
      if (!sonuc.blob) return;
      this.kirpma = {
        blob: sonuc.blob,
        url: URL.createObjectURL(sonuc.blob),
        genislik: sonuc.genislik,
        yukseklik: sonuc.yukseklik,
      };
      this.secim = null;
    },
    kirpmayiKapat() {
      if (this.kirpma && this.kirpma.url) {
        URL.revokeObjectURL(this.kirpma.url);
      }
      this.kirpma = null;
      this.secim = null;
      this.kirpBaslangic = null;
    },
    kirpIptal() {
      this.kirpmayiKapat();
    },
    kirpNoktasi(olay) {
      const kutu = this.$refs.kirpResim.getBoundingClientRect();
      return {
        x: Math.min(Math.max(olay.clientX - kutu.left, 0), kutu.width),
        y: Math.min(Math.max(olay.clientY - kutu.top, 0), kutu.height),
      };
    },
    kirpBasla(olay) {
      if (!this.$refs.kirpResim) return;
      olay.preventDefault();
      this.kirpBaslangic = this.kirpNoktasi(olay);
      this.secim = null;
    },
    kirpSurukle(olay) {
      if (!this.kirpBaslangic) return;
      const nokta = this.kirpNoktasi(olay);
      this.secim = {
        x: Math.min(this.kirpBaslangic.x, nokta.x),
        y: Math.min(this.kirpBaslangic.y, nokta.y),
        g: Math.abs(nokta.x - this.kirpBaslangic.x),
        y2: Math.abs(nokta.y - this.kirpBaslangic.y),
      };
    },
    kirpBitir() {
      this.kirpBaslangic = null;
      /* Tiklama kadar kucuk secimler kaza eseridir, yok sayilir. */
      if (this.secim && (this.secim.g < 8 || this.secim.y2 < 8)) {
        this.secim = null;
      }
    },
    async kirpOnayla() {
      const kirpma = this.kirpma;
      if (!kirpma) return;
      let kaynak = kirpma.blob;
      if (this.secim && this.$refs.kirpResim) {
        /* Secim ekranda gorunen olcude; gercek piksellere cevrilir. */
        const kutu = this.$refs.kirpResim.getBoundingClientRect();
        const oran = kirpma.genislik / (kutu.width || kirpma.genislik);
        const sonuc = await resmiKirp(kirpma.blob, {
          x: this.secim.x * oran,
          y: this.secim.y * oran,
          g: this.secim.g * oran,
          y2: this.secim.y2 * oran,
        });
        if (sonuc.hata) {
          this.$toast.error(sonuc.hata);
          return;
        }
        kaynak = sonuc.blob;
      }
      this.kirpmayiKapat();
      await this.ekAyarla(kaynak, "ekran-goruntusu");
    },
  },
};
</script>

<style scoped>
.chat-root {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 1200;
  font-family: sans-serif;
}
.chat-launcher {
  position: relative;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: none;
  background: #f97316;
  color: #fff;
  font-size: 1.3rem;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  margin-left: auto;
  display: block;
}
.chat-launcher.is-open {
  background: #6b7280;
}
.chat-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #dc2626;
  color: #fff;
  font-size: 0.7rem;
  font-weight: bold;
  min-width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 10px;
  padding: 0 4px;
}
.chat-panel {
  position: absolute;
  right: 0;
  bottom: 64px;
  width: 340px;
  height: 460px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.chat-head {
  padding: 10px 12px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  flex: 0 0 auto;
}
.chat-head-user {
  display: flex;
  align-items: center;
  gap: 8px;
}
.chat-back {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 0 2px;
}
.chat-head-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  min-width: 0;
}
.chat-head-text small {
  color: #6b7280;
  font-size: 0.72rem;
}
.chat-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #d1d5db;
  flex: 0 0 auto;
}
.chat-dot.on {
  background: #10b981;
}
/* Bagli ama bir suredir etkileşim yok */
.chat-dot.idle {
  background: #f59e0b;
}
.chat-star {
  background: none;
  border: none;
  cursor: pointer;
  color: #d1d5db;
  padding: 0 8px;
  flex: 0 0 auto;
  font-size: 0.95rem;
}
.chat-star.on {
  color: #f59e0b;
}
.chat-star:hover {
  color: #f97316;
}
.chat-list {
  flex: 1 1 auto;
  overflow-y: auto;
}
.chat-search {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  border-bottom: 1px solid #f3f4f6;
  color: #9ca3af;
}
.chat-search input {
  border: none;
  outline: none;
  flex: 1 1 auto;
  font-size: 0.85rem;
  color: #111;
}
.chat-row {
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #f3f4f6;
}
.chat-row:hover {
  background: #f9fafb;
}
/* Satirin tiklanabilir kismi; yildiz dugmesi ayri kalir ki sohbeti acmasin */
.chat-row-main {
  display: flex;
  align-items: center;
  gap: 9px;
  flex: 1 1 auto;
  min-width: 0;
  padding: 9px 4px 9px 11px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
}
.chat-row-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1 1 auto;
}
.chat-row-text strong {
  font-size: 0.86rem;
}
.chat-row-text small {
  color: #9ca3af;
  font-size: 0.74rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.chat-count {
  background: #dc2626;
  color: #fff;
  font-size: 0.7rem;
  font-weight: bold;
  min-width: 19px;
  height: 19px;
  line-height: 19px;
  border-radius: 10px;
  text-align: center;
  padding: 0 4px;
  flex: 0 0 auto;
}
.chat-thread {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 10px;
  background: #f8fafc;
}
.chat-msg {
  display: flex;
  margin-bottom: 7px;
}
.chat-msg.mine {
  justify-content: flex-end;
}
.chat-bubble {
  max-width: 78%;
  padding: 7px 10px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #e5e7eb;
  font-size: 0.85rem;
}
.chat-msg.mine .chat-bubble {
  background: #fff7ed;
  border-color: #fed7aa;
}
.chat-text {
  display: block;
  white-space: pre-wrap;
  word-break: break-word;
}
.chat-meta {
  display: block;
  text-align: right;
  color: #9ca3af;
  font-size: 0.68rem;
  margin-top: 2px;
}
.chat-meta i {
  margin-left: 3px;
}
.chat-form {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  padding: 8px;
  border-top: 1px solid #e5e7eb;
  flex: 0 0 auto;
}
.chat-form textarea {
  flex: 1 1 auto;
  resize: none;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 7px 9px;
  font-size: 0.85rem;
  font-family: inherit;
  max-height: 90px;
  outline: none;
}
.chat-form button {
  border: none;
  background: #f97316;
  color: #fff;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  cursor: pointer;
  flex: 0 0 auto;
}
.chat-form button:disabled {
  background: #e5e7eb;
  color: #9ca3af;
  cursor: default;
}
.chat-empty,
.chat-info {
  padding: 18px 14px;
  text-align: center;
  color: #9ca3af;
  font-size: 0.82rem;
}
.chat-empty i {
  font-size: 1.4rem;
  display: block;
  margin-bottom: 6px;
}
.chat-empty p {
  margin: 0 0 4px;
}
.chat-more {
  display: block;
  width: 100%;
  background: none;
  border: none;
  color: #6b7280;
  font-size: 0.76rem;
  padding: 4px 0 8px;
  cursor: pointer;
}
/* ---------------- Goruntu eki ---------------- */
.chat-panel.is-drag {
  outline: 2px dashed #f97316;
  outline-offset: -4px;
}
.chat-gizli {
  display: none;
}
/* Baloncuk icindeki goruntu: metin varsa ustunde durur. */
.chat-img {
  display: block;
  max-width: 100%;
  max-height: 220px;
  border-radius: 6px;
  cursor: zoom-in;
  background: #f3f4f6;
}
.chat-img + .chat-text {
  margin-top: 5px;
}
/* Gonderim oncesi onizleme seridi */
.chat-ek {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 8px;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
  flex: 0 0 auto;
}
.chat-ek > img {
  width: 44px;
  height: 44px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  flex: 0 0 auto;
}
.chat-ek-bilgi {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.chat-ek-bilgi strong {
  font-size: 0.78rem;
  color: #374151;
}
.chat-ek-bilgi small {
  font-size: 0.7rem;
  color: #6b7280;
}
.chat-ek-bar {
  height: 4px;
  border-radius: 2px;
  background: #e5e7eb;
  overflow: hidden;
}
.chat-ek-bar span {
  display: block;
  height: 100%;
  background: #f97316;
  transition: width 0.15s linear;
}
.chat-ek-sil {
  border: none;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  flex: 0 0 auto;
  padding: 4px;
}
.chat-ek-sil:hover {
  color: #dc2626;
}
/* Ataç ve ekran goruntusu dugmeleri: gonder dugmesinden ayirt edilsin. */
.chat-form button.chat-ikincil {
  background: #f3f4f6;
  color: #6b7280;
}
.chat-form button.chat-ikincil:hover:not(:disabled) {
  background: #e5e7eb;
  color: #374151;
}
/* ---------------- Tam ekran goruntuleme ---------------- */
.chat-lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1400;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: zoom-out;
}
.chat-lightbox img {
  max-width: 92vw;
  max-height: 82vh;
  border-radius: 6px;
  cursor: default;
}
.chat-lightbox-link {
  color: #fff;
  font-size: 0.8rem;
  text-decoration: underline;
}
/* ---------------- Kirpma penceresi ---------------- */
.chat-kirp {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1400;
  display: flex;
  align-items: center;
  justify-content: center;
}
.chat-kirp-ic {
  background: #fff;
  border-radius: 10px;
  padding: 12px;
  max-width: 92vw;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.chat-kirp-bilgi {
  margin: 0;
  font-size: 0.8rem;
  color: #6b7280;
}
.chat-kirp-tuval {
  position: relative;
  line-height: 0;
  cursor: crosshair;
  overflow: hidden;
  user-select: none;
}
.chat-kirp-tuval img {
  max-width: 86vw;
  max-height: 68vh;
  display: block;
}
.chat-kirp-secim {
  position: absolute;
  border: 2px solid #f97316;
  background: rgba(249, 115, 22, 0.15);
  pointer-events: none;
}
.chat-kirp-dugmeler {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.chat-kirp-dugmeler button {
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #374151;
  padding: 6px 12px;
  border-radius: 7px;
  font-size: 0.82rem;
  cursor: pointer;
}
.chat-kirp-dugmeler button.ana {
  background: #f97316;
  border-color: #f97316;
  color: #fff;
}
</style>
