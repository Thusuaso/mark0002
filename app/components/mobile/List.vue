<template>
  <div class="mlist">
    <!-- Arama + sayac + toplamlar: kaydirirken ustte kaliyor -->
    <div class="mlist__bar">
      <div class="mlist__search">
        <label :for="searchId" class="mlist__sr">{{ searchPlaceholder }}</label>
        <i class="pi pi-search mlist__search-icon" aria-hidden="true" />
        <input
          :id="searchId"
          v-model="query"
          type="search"
          class="mlist__input"
          :placeholder="searchPlaceholder"
        />
      </div>

      <div class="mlist__meta">
        <span class="mlist__count">{{ filtered.length }} kayıt</span>
        <!--
          Toplamlar cagiran ekranin isi: hangi alanlarin toplandigi
          ekrandan ekrana degisiyor (m2/kasa, tutar, ton...).
        -->
        <div v-if="$slots.totals" class="mlist__totals">
          <slot name="totals" :items="filtered" />
        </div>
      </div>
    </div>

    <p v-if="loading" class="mlist__empty">Yükleniyor…</p>

    <p v-else-if="!filtered.length" class="mlist__empty">
      {{ query ? "Aramayla eşleşen kayıt yok." : "Gösterilecek kayıt yok." }}
    </p>

    <template v-else>
      <ul class="mlist__items">
        <li v-for="(item, i) in visible" :key="keyOf(item, i)">
          <!--
            Kart icerigi cagiran ekranda. Bilesen yalnizca kabugu
            veriyor: arama, sayac, toplamlar, parcali yukleme.
          -->
          <component
            :is="onSelect ? 'button' : 'div'"
            :type="onSelect ? 'button' : undefined"
            class="mlist__card"
            :class="{ 'mlist__card--tap': !!onSelect }"
            @click="onSelect && onSelect(item)"
          >
            <slot :item="item" :index="i" />
          </component>
        </li>
      </ul>

      <!--
        SAYFALAMA YERINE "DAHA GOSTER".
        Telefonda sayfa numaralari arasinda gidip gelmek zahmetli ve
        kaydirma konumu her seferinde basa doner; parca parca uzayan
        tek liste dogal okuma yonunu bozmuyor.
      -->
      <button
        v-if="visible.length < filtered.length"
        type="button"
        class="mlist__more"
        @click="limit += pageSize"
      >
        Daha göster
        <span class="mlist__more-rest">
          ({{ filtered.length - visible.length }} kayıt kaldı)
        </span>
      </button>
    </template>
  </div>
</template>

<script setup>
/*
 * components/mobile/List.vue   --  etiket adi <MobileList>
 *
 * Telefon ekranlari icin ORTAK KABUK: arama kutusu, kayit sayaci,
 * toplamlar serisi, bos durum ve parca parca yukleme. Kart icerigini
 * cagiran ekran veriyor (varsayilan slot).
 *
 * NEDEN ORTAK: bes ham ekranin (Stock, Crates, Entry, Finance,
 * Customers) hepsinde ayni dort sey tekrar edecekti. Kart ICERIGI
 * ekrandan ekrana cok farkli -- onu genellemeye calismak her ekrana
 * uymayan bir soyutlama uretirdi; bu yuzden yalnizca cevresi ortak.
 *
 * MASAUSTU TABLOSUNUN YERINI TUTMUYOR, bilerek: kolon bazli filtre ve
 * siralama yok. Telefonda onlara karsilik tek bir arama kutusu var;
 * tam tablo masaustunde duruyor.
 */
const props = defineProps({
  items: { type: Array, default: () => [] },
  /* Arama bu alanlarda yapiliyor; bos birakilirsa arama kutusu da yok. */
  searchKeys: { type: Array, default: () => [] },
  searchPlaceholder: { type: String, default: "Ara…" },
  /* Satir anahtari; verilmezse indeks kullaniliyor. */
  itemKey: { type: String, default: "" },
  pageSize: { type: Number, default: 30 },
  loading: { type: Boolean, default: false },
  /* Verilirse kart dokunulabilir olur (detay diyalogu acmak icin). */
  onSelect: { type: Function, default: null },
})

const query = ref("")
const limit = ref(props.pageSize)

/* Ayni sayfada birden cok liste olabilir; id'ler cakismasin. */
const searchId = `mlist-${Math.random().toString(36).slice(2, 8)}`

const filtered = computed(() => {
  const q = query.value.trim().toLocaleLowerCase("tr-TR")
  if (!q || !props.searchKeys.length) return props.items || []
  return (props.items || []).filter((x) =>
    props.searchKeys.some((k) => {
      const v = x?.[k]
      return v != null && String(v).toLocaleLowerCase("tr-TR").includes(q)
    }),
  )
})

const visible = computed(() => filtered.value.slice(0, limit.value))

/* Arama degisince listeyi basa sar -- yoksa "daha goster" ile acilmis
   uzun liste yeni aramada da acik kaliyor ve ilk sonuclar ekranin
   disinda baslıyor. */
watch(query, () => {
  limit.value = props.pageSize
})

function keyOf(item, i) {
  return props.itemKey && item?.[props.itemKey] != null
    ? item[props.itemKey]
    : i
}
</script>

<style scoped>
.mlist {
  --ml-ink: #111827;
  --ml-muted: #4b5563;
  --ml-line: #e2e5ea;
  --ml-surface: #ffffff;

  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 0 12px 32px;
  color: var(--ml-ink);
}

/* ---------- ust cubuk ---------- */

.mlist__bar {
  position: sticky;
  /* MobileNav da sticky; cubuk onun ALTINA otursun. */
  top: 52px;
  z-index: 2;

  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 10px 0;
  background: #f6f7f9;
}

.mlist__search {
  position: relative;
}

.mlist__search-icon {
  position: absolute;
  top: 50%;
  left: 11px;
  font-size: 13px;
  color: var(--ml-muted);
  transform: translateY(-50%);
}

.mlist__input {
  width: 100%;
  box-sizing: border-box;
  /* 16px: iOS daha kucuk yazidaki girdilerde sayfayi KENDILIGINDEN
     yakinlastiriyor; 16px bunu engelliyor. */
  min-height: 44px;
  padding: 0 12px 0 32px;

  font-family: inherit;
  font-size: 16px;
  color: var(--ml-ink);

  background: var(--ml-surface);
  border: 1px solid #d6dae1;
  border-radius: 10px;
}

.mlist__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.mlist__count {
  font-size: 12px;
  color: var(--ml-muted);
}

.mlist__totals {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-left: auto;
}

/* ---------- kartlar ---------- */

.mlist__items {
  display: flex;
  flex-direction: column;
  gap: 8px;

  margin: 0;
  padding: 0;
  list-style: none;
}

.mlist__card {
  display: block;
  width: 100%;

  padding: 12px 14px;

  font-family: inherit;
  color: inherit;
  text-align: left;

  background: var(--ml-surface);
  border: 1px solid var(--ml-line);
  border-radius: 12px;
}

.mlist__card--tap {
  cursor: pointer;
}

.mlist__card--tap:active {
  background: #f2f5f9;
}

/* ---------- bos durum / daha goster ---------- */

.mlist__empty {
  padding: 28px 16px;
  font-size: 14px;
  color: var(--ml-muted);
  text-align: center;
  background: var(--ml-surface);
  border: 1px solid var(--ml-line);
  border-radius: 12px;
}

.mlist__more {
  min-height: 46px;
  margin-top: 4px;

  font-family: inherit;
  font-size: 14px;
  font-weight: 650;
  color: #1d4ed8;

  background: var(--ml-surface);
  border: 1px solid #d6dae1;
  border-radius: 10px;
  cursor: pointer;
}

.mlist__more-rest {
  font-weight: 400;
  color: var(--ml-muted);
}

.mlist__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
}
</style>
