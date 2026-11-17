<template>
  <header v-if="isLoggedIn" class="gnav" :class="{ 'gnav--open': mobilAcik }">
    <div class="gnav__bar">
      <!-- Marka -->
      <NuxtLink to="/" class="gnav__brand" @click="hepsiniKapat">
        <span class="gnav__mark" aria-hidden="true" />
        <span class="gnav__word">GOZ</span>
      </NuxtLink>

      <!--
        MASAUSTU MENUSU. Ogeler app/utils/navMenu.ts'ten geliyor ve
        hangi listenin kullanilacagini `menu` computed'i seciyor --
        eskiden ayni menu sablonda UC KEZ elle yaziliydi.
      -->
      <nav class="gnav__menu" aria-label="Ana menü">
        <template v-for="(g, i) in menu" :key="g.label + i">
          <template v-if="gorunur(g)">
            <!-- Tek baslina baglanti -->
            <NuxtLink
              v-if="g.to"
              :to="g.to"
              class="gnav__top"
              :class="{ 'gnav__top--active': aktifYol(g.to) }"
            >
              {{ g.label }}
            </NuxtLink>

            <!-- Acilir grup -->
            <div v-else class="gnav__grp">
              <button
                type="button"
                class="gnav__top gnav__top--btn"
                :class="{
                  'gnav__top--active': grupAktif(g),
                  'gnav__top--open': acikGrup === i,
                }"
                :aria-expanded="String(acikGrup === i)"
                aria-haspopup="true"
                @click="grupAc(i)"
              >
                {{ g.label }}
                <i class="pi pi-chevron-down gnav__chev" aria-hidden="true" />
              </button>

              <div v-show="acikGrup === i" class="gnav__panel">
                <NuxtLink
                  v-for="it in gorunenler(g)"
                  :key="it.to + it.label"
                  :to="it.to"
                  class="gnav__item"
                  :class="{ 'gnav__item--active': aktifYol(it.to) }"
                  @click="hepsiniKapat"
                >
                  {{ it.label }}
                </NuxtLink>
              </div>
            </div>
          </template>
        </template>
      </nav>

      <!-- Sag eylemler: icerigi DEGISMEDI, yalnizca yeri -->
      <div class="gnav__actions">
          <div>
            <Button
              severity="danger" class="mr-5"
              label="Logout"
              @click="logout"
            />
          </div>
          <i
            v-badge.danger="parseInt(getToDoMainListByUsernameLenght)"
            class="pi pi-calendar"
            style="font-size: 2rem; cursor: pointer"
            @click="visibleRight = true"
          />

          <Drawer
            :visible="visibleRight" @update:visible="visibleRight = $event"
            header="Right Sidebar"
            position="right"
            class="w-50 md:w-20rem lg:w-30rem"
          >
            <Button
              type="button"
              class="w-100" severity="success"
              label="New"
              @click="newForm"
            />
            <todoByUsernameList
              :list="getToDoMainListByUsername"
              @to_do_list_selected_emit="toDoListSelected($event)"
              @todo_done_emit="todoDone($event)"
            />
          </Drawer>
          <Dialog :visible="to_do_form" @update:visible="to_do_form = $event" header="" modal>
            <todoByUsernameForm
              :model="model"
              :users="getUserList"
              :status="getTodoMainListByUsernameButtonStatus"
              @process="process($event)"
              @deleteProcess="deleteProcess($event)"
            />
          </Dialog>

          <!--
            Eksik zorunlu yukleme evraklari.

            Badge yalnizca SAYIYI gosteriyor (hafif /missing/count ucu);
            tam liste ancak panel acildiginda cekiliyor
            (missingDocumentOpen). Karta tiklanmasi
            /operation/uploadform?po=... adresine gidiyor.
          -->
          <i
            v-badge.danger="parseInt(getMissingDocumentOrderCount)"
            class="pi pi-file-excel ml-4"
            style="font-size: 2rem; cursor: pointer"
            title="Eksik Yükleme Evrakları"
            @click="missingDocumentOpen"
          />
          <Drawer
            :visible="missing_document_visible"
            @update:visible="missing_document_visible = $event"
            header="Eksik Yükleme Evrakları"
            position="right"
            class="w-50 md:w-20rem lg:w-30rem"
          >
            <uploadMissingList
              :list="getMissingDocumentList"
              @missing_document_selected_emit="missingDocumentSelected($event)"
            />
          </Drawer>
      </div>

      <!-- Dar ekran: menuyu acan dugme -->
      <button
        type="button"
        class="gnav__burger"
        :aria-expanded="String(mobilAcik)"
        aria-controls="gnav-drawer"
        aria-label="Menü"
        @click="mobilAcik = !mobilAcik"
      >
        <i class="pi" :class="mobilAcik ? 'pi-times' : 'pi-bars'" aria-hidden="true" />
      </button>
    </div>

    <!--
      DAR EKRAN MENUSU -- acilir panel yerine KATLANIR BOLUMLER.
      Ust uste acilan dropdown'lar dar ekranda kullanilabilir degil;
      burada her grup yerinde aciliyor ve liste dikeyde akiyor.
    -->
    <div v-show="mobilAcik" id="gnav-drawer" class="gnav__drawer">
      <template v-for="(g, i) in menu" :key="'m' + g.label + i">
        <template v-if="gorunur(g)">
          <NuxtLink
            v-if="g.to"
            :to="g.to"
            class="gnav__dlink"
            :class="{ 'gnav__dlink--active': aktifYol(g.to) }"
            @click="hepsiniKapat"
          >
            {{ g.label }}
          </NuxtLink>

          <div v-else class="gnav__dgrp">
            <button
              type="button"
              class="gnav__dhead"
              :aria-expanded="String(acikMobil === i)"
              @click="acikMobil = acikMobil === i ? null : i"
            >
              <span>{{ g.label }}</span>
              <i
                class="pi"
                :class="acikMobil === i ? 'pi-chevron-down' : 'pi-chevron-right'"
                aria-hidden="true"
              />
            </button>
            <div v-show="acikMobil === i" class="gnav__dlist">
              <NuxtLink
                v-for="it in gorunenler(g)"
                :key="'m' + it.to + it.label"
                :to="it.to"
                class="gnav__dlink gnav__dlink--sub"
                :class="{ 'gnav__dlink--active': aktifYol(it.to) }"
                @click="hepsiniKapat"
              >
                {{ it.label }}
              </NuxtLink>
            </div>
          </div>
        </template>
      </template>
    </div>
  </header>
</template>
<script>
import { useAuthStore } from "~/stores/auth"
import { useAuthorityStore } from "~/stores/authority"
import { useSharedStore } from "~/stores/shared"
import { useTodoStore } from "~/stores/todo"
import { useUploadStore } from "~/stores/upload"
import { NAV_FULL, NAV_62, NAV_RESTRICTED } from "~/utils/navMenu"

export default {
  /*
   * components/shared/navbar.vue -> app/components/shared/Navbar.vue
   *
   * Options API KORUNDU: 807 satirlik sablonu ve davranisini birebir
   * tasimak icin, yeniden yazim degil cevirim yapildi.
   *
   * SABLONDA YAPILAN ZORUNLU DEGISIKLIKLER (scriptle, tools/codemods):
   *   83x  tag="a" kaldirildi   -- Vue Router 4'te `tag` prop'u yok;
   *        NuxtLink zaten <a> uretiyor, kalsa ham attribute olarak DOM'a duser
   *   83x  <nuxt-link> -> <NuxtLink>
   *    1x  <Sidebar> -> <Drawer>  (PrimeVue 4'te yeniden adlandirildi)
   *    1x  class="p-button-success" -> severity="success"
   *    1x  clas="p-button-danger" -> severity="danger"
   *        ^ ORIJINALDE YAZIM HATASI (class degil clas): o buton hicbir
   *          zaman kirmizi gorunmemis. Duzeltilerek tasindi.
   *
   * SCRIPTTE:
   *   mapGetters           -> Pinia store'lari (4 store: auth, authority,
   *                           shared, todo)
   *   Cookies (js-cookie)  -> useCookie
   *   this.$cookie         -> useCookie (plugins/cookies.js gereksiz kaldi)
   *   plugins/date.js      -> utils/dates.ts -> toIsoDate
   *
   * DIKKAT -- SESSIZ VERI BOZULMASI RISKI:
   *   date.dateToString(new Date()) "2026-10-02" (yil-ay-gun) uretiyor ve
   *   bu deger API'ye YAZILIYOR (GirisTarihi / YapildiTarihi).
   *   utils/formatters'taki AYNI ISIMLI dateToString ise "02-10-2026"
   *   (gun-ay-yil) uretiyor ve yalnizca gosterim icindir. Karistirilirsa
   *   derleme hatasi vermez, tarihleri ters formatta kaydeder.
   *   Bu yuzden burada toIsoDate kullaniliyor.
   *
   * KALDIRILAN OLU KOD:
   *   import Menubar from "primevue/menubar" -- sablonda <Menubar> yok
   *   data.items: []                        -- hicbir yerde kullanilmiyor
   *   watch: {}                             -- bos
   *
   * TASINMAYAN:
   *   localStorage.removeItem(...) cagrilari. Orijinal hem cerez hem
   *   localStorage tutuyordu, ama okuma artik yalnizca cerezden yapiliyor
   *   (useCookie). localStorage kopyasi kullanilmadigi icin yazilmiyor da.
   */
  computed: {
    /*
     * HANGI MENU -- eski sablondaki uc ayri navbar'in karsiligi:
     *   !getAuthorityStatus            -> tam menu
     *   getAuthorityStatus & id == 62  -> yalnizca Yukleme
     *   getAuthorityStatus & digerleri -> kisitli liste
     * Kosullar birebir korundu.
     */
    menu() {
      if (!this.getAuthorityStatus) return NAV_FULL
      return String(this.getUserId) === "62" ? NAV_62 : NAV_RESTRICTED
    },

    /* Oge bazli kosullarin cozumu. Sablonda string olarak duruyor
       (navMenu.ts `when`), karsiligi burada. */
    kosullar() {
      return {
        canSeePasswords: this.canSeePasswords,
        getAyoStatus: this.getAyoStatus,
        getAuthorityStatus: this.getAuthorityStatus,
        "!getAuthorityStatus": !this.getAuthorityStatus,
      }
    },
    auth() {
      return useAuthStore()
    },
    authority() {
      return useAuthorityStore()
    },
    shared() {
      return useSharedStore()
    },
    todo() {
      return useTodoStore()
    },
    upload() {
      return useUploadStore()
    },

    // --- eski mapGetters karsiliklari (sablon bunlari kullaniyor) ---
    getToDoMainListByUsername() {
      return this.todo.getToDoMainListByUsername
    },
    getToDoMainListByUsernameLenght() {
      return this.todo.getToDoMainListByUsernameLenght
    },
    getTodoModel() {
      return this.todo.getTodoModel
    },
    getTodoMainListByUsernameButtonStatus() {
      return this.todo.getTodoMainListByUsernameButtonStatus
    },
    getUserList() {
      return this.shared.getUserList
    },
    getAuthorityStatus() {
      return this.authority.getAuthorityStatus
    },
    isAuthenticated() {
      return this.auth.isAuthenticated
    },
    getUserId() {
      return this.auth.getUserId
    },
    getAyoStatus() {
      return this.auth.getAyoStatus
    },
    getMissingDocumentList() {
      return this.upload.getMissingDocumentList
    },
    getMissingDocumentOrderCount() {
      return this.upload.getMissingDocumentOrderCount
    },

    isLoggedIn() {
      const storeAuth =
        this.isAuthenticated !== undefined ? this.isAuthenticated : false
      return storeAuth || !!this.userId
    },

    canSeePasswords() {
      const id = parseInt(this.getUserId ?? this.userId, 10)
      return [19, 47].includes(id)
    },
  },

  data() {
    return {
      /* Acik olan masaustu grubu / mobil bolum; null = kapali. */
      acikGrup: null,
      acikMobil: null,
      mobilAcik: false,
      userId: null,
      visibleRight: false,
      missing_document_visible: false,
      to_do_form: false,
      model: {},
    }
  },

  created() {
    this.userId = useCookie("userId").value || null
  },

  mounted() {
    /*
     * Acilir menuyu DISARI TIKLAYINCA ve Escape ile kapat.
     *
     * Bootstrap'in dropdown'u kullanilmiyor artik: o, CDN'den gelen
     * bootstrap.bundle betigine bagliydi ve menunun davranisi bizim
     * elimizde degildi (ic ice panel, klavye, aktif durum). Kendi
     * mantigimiz 15 satir ve tamamen denetimimizde.
     */
    this.__disariTikla = (e) => {
      if (!this.$el || this.$el.contains(e.target)) return
      this.acikGrup = null
    }
    this.__escKapat = (e) => {
      if (e.key === "Escape") this.hepsiniKapat()
    }
    document.addEventListener("click", this.__disariTikla)
    document.addEventListener("keydown", this.__escKapat)

    /*
     * Todo listesi SSR'DA DEGIL, yalnizca client'ta cekiliyor.
     *
     * Orijinalde bu cagri created() icindeydi. mounted()'a tasindi cunku
     * legacy Express API'si SSR'in IC fetch yolunda calismiyor:
     * event.node.res gercek bir ServerResponse olmadigi icin Express'in
     * res.json() -> res.get("content-type") cagrisi patliyor veya yanit
     * hic sonlanmadigi icin istek asili kaliyor.
     * (Ayrintili aciklama: server/middleware/1.legacy-api.ts)
     *
     * Davranis kaybi yok: Nuxt 2'de de created() icindeki async is SSR
     * tarafindan beklenmiyordu, yani bu liste zaten SSR'da gelmiyordu.
     */
    this.userId = useCookie("userId").value || null

    this.loadTodoList()
    this.loadMissingDocumentCount()
  },

  /*
   * Liste YALNIZCA mounted()'a birakilamaz.
   *
   * Navbar layout icinde v-show ile gizleniyor (v-if DEGIL), yani giris
   * yapilmamisken de MOUNT EDILMIS durumda. Oturum durumu sonradan true
   * olursa mounted() bir daha CALISMAZ ve liste bos kalir -- hic hata da
   * vermez, cunku kullanici adi bos oldugunda store sessizce geri donuyor
   * (app/stores/todo.ts: `if (!user) return`).
   *
   * Bu izleyici, giris durumu false -> true dondugu her an listeyi
   * cekiyor. Giris sayfasi da kendi tarafinda cagiriyor (app/pages/auth.vue);
   * ikisi birbirinin yedegi, mukerrer cagri zararsiz.
   */
  beforeUnmount() {
    /* Dinleyiciler GLOBAL: kaldirilmazsa her gezintide bir kopya daha
       birikir ve kaldirilmis bilesene referans tutar. */
    document.removeEventListener("click", this.__disariTikla)
    document.removeEventListener("keydown", this.__escKapat)
  },

  watch: {
    isLoggedIn(loggedIn) {
      if (!loggedIn) return
      this.loadTodoList()
      this.loadMissingDocumentCount()
    },
  },

  methods: {
    /* navMenu.ts'teki `when` -> gercek deger. Kosulsuz oge daima acik. */
    gorunur(x) {
      return x.when === undefined ? true : !!this.kosullar[x.when]
    },

    gorunenler(g) {
      return (g.items || []).filter((it) => this.gorunur(it))
    },

    aktifYol(yol) {
      return this.$route.path === yol
    },

    /* Grup basligi, icindeki ogelerden biri aciksa vurgulanir. */
    grupAktif(g) {
      return (g.items || []).some((it) => this.aktifYol(it.to))
    },

    grupAc(i) {
      this.acikGrup = this.acikGrup === i ? null : i
    },

    hepsiniKapat() {
      this.acikGrup = null
      this.mobilAcik = false
    },

    /* Kullanici adi cerezi okunabiliyorsa todo listesini ceker. */
    loadTodoList() {
      if (!this.isLoggedIn) return
      this.todo.setToDoListByUsername()
    },

    /*
     * Badge icin yalnizca SAYI. Tam liste cekilmiyor -- o, panel
     * acildiginda bir kez (missingDocumentOpen).
     *
     * loadTodoList ile AYNI iki yerden cagriliyor (mounted + isLoggedIn
     * izleyicisi): navbar layout icinde v-show ile gizlendigi icin giris
     * yapilmamisken de mount edilmis durumda, yani mounted() tek basina
     * yetmez. Gerekcenin tamami izleyicinin ustundeki notta.
     */
    loadMissingDocumentCount() {
      if (!this.isLoggedIn) return
      this.upload.setMissingDocumentOrderCount()
    },

    /*
     * Panel acilirken tam liste cekiliyor. Liste ucu sayaci da
     * guncelliyor (bkz. app/stores/upload.ts), yani badge panelle ayni
     * sayiyi gosteriyor.
     */
    missingDocumentOpen() {
      this.upload.setMissingDocumentList()
      this.missing_document_visible = true
    },

    /*
     * Eksik evrak kartina tiklanmasi -> yukleme ekrani, PO onsecili.
     *
     * Nuxt 2'de burada `.catch(() => {})` vardi: Vue Router 3 AYNI yola
     * tekrar gidince "NavigationDuplicated" HATASI firlatiyordu. Vue
     * Router 4'te ayni gezinme artik hata DEGIL, sessizce cozulur --
     * yani yutucu catch gereksiz kaldi ve gercek hatalari da
     * saklayacagi icin tasinmadi.
     */
    missingDocumentSelected(event) {
      this.missing_document_visible = false
      return navigateTo({
        path: "/operation/uploadform",
        query: { po: event.SiparisNo },
      })
    },

    async logout() {
      if (!confirm("Are you sure you want to log out?")) return

      this.auth.logout()
      this.userId = null
      this.authority.setAuthorityNavbarStatus(false)

      await navigateTo("/auth")
    },

    __stringCharacterChange(event) {
      const data = String(event ?? "").split("'")
      let value = ""

      data.forEach((x) => {
        value += x + "''"
      })

      return value.substring(0, value.length - 2)
    },

    todoDone(event) {
      event.YapildiTarihi = toIsoDate(new Date())
      this.todo.setTodoDone(event)
    },

    deleteProcess(event) {
      this.todo.setTodoDelete(event.ID)
      this.to_do_form = false
    },

    toDoListSelected(event) {
      this.todo.setTodoMainListByUsernameButtonStatus(false)
      this.model = event.data
      this.to_do_form = true
    },

    update(event) {
      event.CustomYapilacak = this.__stringCharacterChange(event.Yapilacak)
      this.todo.setTodoUpdate(event)
      this.to_do_form = false
    },

    save(event) {
      event.GorevVerenID = useCookie("userId").value
      event.GorevVerenAdi = useCookie("username").value
      event.GirisTarihi = toIsoDate(new Date())
      event.CustomYapilacak = this.__stringCharacterChange(event.Yapilacak)

      this.todo.setTodoSave(event)
      this.to_do_form = false
    },

    process(event) {
      if (this.getTodoMainListByUsernameButtonStatus) {
        this.save(event)
      } else {
        this.update(event)
      }
    },

    newForm() {
      this.todo.setTodoMainListByUsernameButtonStatus(true)
      this.todo.setToDoModel()
      this.model = this.getTodoModel
      this.to_do_form = true
    },
  },
}
</script>

<style scoped>
/*
 * ANA MENU -- gorunum.
 *
 * Bootstrap'in `navbar` bilesenleri BIRAKILDI: dropdown'lari CDN'den
 * gelen bootstrap.bundle betigine bagliydi, yani menunun davranisi
 * (ic ice panel, klavye, aktif durum) bizim elimizde degildi.
 * Yerlesim burada, davranis bilesende.
 *
 * Olculer tek yerden: yukseklik, renkler ve kenarlar asagidaki
 * degiskenlerde.
 */
.gnav {
  --g-h: 56px;
  --g-ink: #0f172a;
  --g-muted: #64748b;
  --g-line: #e2e8f0;
  --g-surface: #ffffff;
  --g-accent: #1d4ed8;
  --g-accent-soft: #eef2ff;

  position: sticky;
  top: 0;
  z-index: 1040;

  background: var(--g-surface);
  border-bottom: 1px solid var(--g-line);
}

.gnav__bar {
  display: flex;
  gap: 10px;
  align-items: center;

  min-height: var(--g-h);
  padding: 0 16px;
}

/* ---------- marka ---------- */

.gnav__brand {
  display: inline-flex;
  flex: none;
  gap: 9px;
  align-items: center;

  margin-right: 6px;

  text-decoration: none;
}

/*
 * Marka isareti. Eskiden "GOZ" yazisi 5 saniyede bir mavi/yesil
 * arasinda RENK DEGISTIRIYORDU (sonsuz animasyon); hareketli bir oge
 * surekli goz cekiyor ve profesyonel durmuyordu. Yerine sabit bir
 * isaret.
 */
.gnav__mark {
  width: 26px;
  height: 26px;
  background: linear-gradient(140deg, #1d4ed8, #0f766e);
  border-radius: 8px;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 25%);
}

.gnav__word {
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--g-ink);
}

/* ---------- masaustu menusu ---------- */

.gnav__menu {
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  gap: 2px;
  align-items: center;
  min-width: 0;
}

.gnav__grp {
  position: relative;
}

.gnav__top {
  display: inline-flex;
  gap: 5px;
  align-items: center;

  height: 34px;
  padding: 0 10px;

  font-family: inherit;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--g-muted);
  text-decoration: none;
  white-space: nowrap;

  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  transition:
    color 120ms ease,
    background-color 120ms ease;
}

.gnav__top:hover {
  color: var(--g-ink);
  background: #f1f5f9;
}

/* Acik grup ile AKTIF sayfa farkli: biri gecici, oteki konum. */
.gnav__top--open {
  color: var(--g-ink);
  background: #f1f5f9;
}

.gnav__top--active {
  color: var(--g-accent);
  background: var(--g-accent-soft);
}

.gnav__chev {
  font-size: 9px;
  opacity: 0.7;
}

/* ---------- acilir panel ---------- */

.gnav__panel {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 10;

  display: flex;
  flex-direction: column;
  min-width: 210px;
  padding: 6px;

  background: var(--g-surface);
  border: 1px solid var(--g-line);
  border-radius: 12px;
  box-shadow:
    0 12px 28px -12px rgb(15 23 42 / 25%),
    0 2px 6px -2px rgb(15 23 42 / 8%);
}

.gnav__item {
  padding: 8px 10px;

  font-size: 13px;
  font-weight: 500;
  color: #334155;
  text-decoration: none;
  white-space: nowrap;

  border-radius: 7px;
}

.gnav__item:hover {
  color: var(--g-ink);
  background: #f1f5f9;
}

.gnav__item--active {
  font-weight: 650;
  color: var(--g-accent);
  background: var(--g-accent-soft);
}

/* ---------- sag eylemler ---------- */

.gnav__actions {
  display: flex;
  flex: none;
  gap: 4px;
  align-items: center;
  margin-left: auto;
}

/* Eski sablondaki satir ici olculer (2rem ikon, mr-5) yerine
   hizalanmis bir serit. */
.gnav__actions :deep(.pi) {
  font-size: 1.25rem !important;
}

.gnav__actions :deep(.p-button) {
  height: 34px;
  margin: 0 !important;
  padding: 0 14px;
  font-size: 13px;
}

/* ---------- dar ekran ---------- */

.gnav__burger {
  display: none;

  width: 40px;
  height: 40px;

  color: var(--g-ink);

  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.gnav__burger:hover {
  background: #f1f5f9;
}

.gnav__drawer {
  display: none;
}

/*
 * 1200px: menude 13 ust seviye baslik var; bunun altinda yatay sira
 * tasiyor ve basliklar ikinci satira dusup cubugu iki kata cikariyor.
 * Esik genis tutuldu, cunku tasma baslamadan once gecmek gerekiyor.
 */
@media (max-width: 1199.98px) {
  .gnav__menu {
    display: none;
  }

  .gnav__burger {
    display: grid;
    place-items: center;
  }

  .gnav__actions {
    margin-left: auto;
  }

  .gnav--open .gnav__drawer {
    display: flex;
    flex-direction: column;

    /* Cubugun altindan ekran sonuna kadar; uzun menu kendi icinde kayar. */
    max-height: calc(100dvh - var(--g-h));
    padding: 8px 10px 16px;
    overflow-y: auto;

    border-top: 1px solid var(--g-line);
  }
}

.gnav__dlink {
  display: block;

  /* 44px dokunma hedefi. */
  padding: 12px 12px;

  font-size: 14.5px;
  font-weight: 600;
  color: #334155;
  text-decoration: none;

  border-radius: 9px;
}

.gnav__dlink--sub {
  padding-left: 24px;
  font-weight: 500;
  color: var(--g-muted);
}

.gnav__dlink--active {
  color: var(--g-accent);
  background: var(--g-accent-soft);
}

.gnav__dhead {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  min-height: 46px;
  padding: 0 12px;

  font-family: inherit;
  font-size: 14.5px;
  font-weight: 600;
  color: #334155;
  text-align: left;

  background: none;
  border: none;
  border-radius: 9px;
  cursor: pointer;
}

.gnav__dhead:hover {
  background: #f1f5f9;
}

.gnav__dhead .pi {
  font-size: 11px;
  color: var(--g-muted);
}

.gnav__dlist {
  display: flex;
  flex-direction: column;
  padding-bottom: 4px;
}
</style>
