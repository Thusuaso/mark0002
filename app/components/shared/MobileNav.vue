<template>
  <header class="mnav">
    <div class="mnav__bar">
      <button
        type="button"
        class="mnav__burger"
        :aria-expanded="String(open)"
        aria-controls="mnav-menu"
        aria-label="Menü"
        @click="open = !open"
      >
        <i class="pi" :class="open ? 'pi-times' : 'pi-bars'" aria-hidden="true" />
      </button>

      <NuxtLink to="/" class="mnav__brand" @click="open = false">GOZ</NuxtLink>

      <button type="button" class="mnav__exit" @click="logout">
        <i class="pi pi-sign-out" aria-hidden="true" />
        <span class="mnav__exit-text">Çıkış</span>
      </button>
    </div>

    <!--
      v-show (v-if degil): menu kapanip acilirken liste yeniden
      kurulmuyor, yani uzun listede acilis takilmiyor.
    -->
    <nav v-show="open" id="mnav-menu" class="mnav__menu">
      <template v-for="(grup, i) in gruplar" :key="grup.ad || 'kok'">
        <p v-if="grup.ad" class="mnav__group" :class="{ 'mnav__group--first': i === 0 }">
          {{ grup.ad }}
        </p>
        <NuxtLink
          v-for="r in grup.ogeler"
          :key="r.path"
          :to="r.path"
          class="mnav__item"
          :class="{ 'mnav__item--active': route.path === r.path }"
          @click="open = false"
        >
          <i class="pi mnav__icon" :class="r.icon" aria-hidden="true" />
          <span>{{ r.label }}</span>
        </NuxtLink>
      </template>

      <NuxtLink to="/app" class="mnav__version" @click="open = false">
        Sürüm {{ surum }} · yenilikler
      </NuxtLink>
    </nav>
  </header>
</template>

<script setup>
import { MOBILE_ROUTES } from "~/utils/mobileRoutes"
import { MOBILE_VERSION } from "~/utils/mobileVersion"

/*
 * components/shared/MobileNav.vue   --  etiket adi <SharedMobileNav>
 *
 * Android kabugunda SharedNavbar'IN YERINE acilir (bkz. layouts/default.vue).
 *
 * NEDEN AYRI BIR BILESEN, NEDEN MASAUSTU MENUSUNU FILTRELEMIYORUZ:
 * SharedNavbar 1100+ satir, coklu seviyeli bir Bootstrap dropdown agaci
 * ve ~60 baglanti tasiyor. Telefonda gosterilecek ekran sayisi 11; o
 * agaci filtrelemek hem 60 ayri kosul demek hem de dar ekranda ic ice
 * acilan dropdown'lari kullanilabilir yapmiyor. Duz, tek seviyeli bir
 * liste hem daha az kod hem daha iyi kullanim.
 *
 * Liste app/utils/mobileRoutes.ts'ten geliyor -- kapsami yoneten
 * middleware ile AYNI kaynak, yani menude olmayan bir ekrana baska bir
 * yoldan girilemiyor.
 */
const route = useRoute()
const auth = useAuthStore()
const authority = useAuthorityStore()

const open = ref(false)
const surum = MOBILE_VERSION

/* Rotalari grup basligina gore kumeliyoruz; sira listede verildigi gibi. */
const gruplar = computed(() => {
  const out = []
  for (const r of MOBILE_ROUTES) {
    const son = out[out.length - 1]
    if (son && son.ad === r.group) {
      son.ogeler.push(r)
    } else {
      out.push({ ad: r.group, ogeler: [r] })
    }
  }
  return out
})

/* Sayfa degisince menu kapansin -- acik kalirsa icerigi ortuyor. */
watch(() => route.path, () => { open.value = false })

async function logout() {
  if (!confirm("Çıkış yapmak istediğinize emin misiniz?")) return
  auth.logout()
  authority.setAuthorityNavbarStatus(false)
  open.value = false
  await navigateTo("/auth")
}
</script>

<style scoped>
.mnav {
  position: sticky;
  top: 0;
  z-index: 1030;
  background: #111827;
  color: #ffffff;
}

.mnav__bar {
  display: flex;
  gap: 12px;
  align-items: center;
  /* Centikli ekranlarda baslik durum cubugunun altina girmesin. */
  padding: max(8px, env(safe-area-inset-top)) 12px 8px;
}

.mnav__burger,
.mnav__exit {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  justify-content: center;

  /* Dokunma hedefi 44px -- parmakla isabet eden en kucuk olcu. */
  min-width: 44px;
  min-height: 44px;
  padding: 0 10px;

  font-family: inherit;
  font-size: 13px;
  color: #ffffff;

  background: none;
  border: none;
  cursor: pointer;
}

.mnav__burger .pi {
  font-size: 20px;
}

.mnav__exit {
  margin-left: auto;
}

.mnav__exit-text {
  font-weight: 600;
}

.mnav__brand {
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #ffffff;
  text-decoration: none;
}

.mnav__menu {
  display: flex;
  flex-direction: column;

  /* Uzun listede menu ekrani tasmasin, kendi icinde kaysin. */
  max-height: calc(100vh - 60px);
  padding-bottom: 8px;
  overflow-y: auto;

  border-top: 1px solid rgb(255 255 255 / 10%);
}

.mnav__group {
  margin: 14px 0 4px;
  padding: 0 16px;

  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #9aa4b2;
}

.mnav__group--first {
  margin-top: 8px;
}

.mnav__item {
  display: flex;
  gap: 12px;
  align-items: center;

  min-height: 48px;
  padding: 0 16px;

  font-size: 15px;
  color: #e5e7eb;
  text-decoration: none;
}

.mnav__item--active {
  color: #ffffff;
  background: rgb(255 255 255 / 8%);
  box-shadow: inset 3px 0 0 #60a5fa;
}

.mnav__icon {
  width: 18px;
  font-size: 15px;
  color: #9aa4b2;
}

.mnav__item--active .mnav__icon {
  color: #60a5fa;
}

.mnav__version {
  margin: 10px 16px 4px;
  padding-top: 10px;

  font-size: 12px;
  color: #9aa4b2;
  text-decoration: none;

  border-top: 1px solid rgb(255 255 255 / 10%);
}
</style>
