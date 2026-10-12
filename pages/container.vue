<template>
  <div class="calculator-wrapper">
    <transition name="fade">
      <div v-if="alertState.type" :class="['alert-box', alertState.type]">
        <div class="alert-content">
          <i
            :class="
              alertState.type === 'error'
                ? 'pi pi-times-circle'
                : 'pi pi-exclamation-triangle'
            "
          ></i>
          <div>
            <h4>{{ alertState.type === "error" ? "Sığmadı" : "Bilgi" }}</h4>
            <p>{{ alertState.message }}</p>
          </div>
        </div>
        <button @click="clearAlert" class="close-btn">
          <i class="pi pi-times"></i>
        </button>
      </div>
    </transition>

    <div class="top-section">
      <Card class="config-card">
        <template #title
          ><span class="card-title">1. Konteynır Seçimi</span></template
        >
        <template #content>
          <div class="form-column">
            <Dropdown
              v-model="selectedPreset"
              :options="containerPresets"
              optionLabel="label"
              placeholder="Hazır Şablon Seç"
              @change="applyPreset"
              style="width: 100%"
            />
            <div class="dimensions-row">
              <div class="input-group">
                <small>En</small
                ><InputNumber
                  v-model="container.width"
                  @input="recalculateAll"
                  suffix=" cm"
                  :minFractionDigits="0"
                />
              </div>
              <div class="input-group">
                <small>Yükseklik</small
                ><InputNumber
                  v-model="container.height"
                  @input="recalculateAll"
                  suffix=" cm"
                  :minFractionDigits="0"
                />
              </div>
              <div class="input-group">
                <small>Boy</small
                ><InputNumber
                  v-model="container.length"
                  @input="recalculateAll"
                  suffix=" cm"
                  :minFractionDigits="0"
                />
              </div>
            </div>
          </div>
        </template>
      </Card>

      <div class="stats-wrapper">
        <div class="stat-card highlight-card">
          <span class="stat-title">KALAN BOŞ UZUNLUK</span>
          <div class="stat-value" style="color: #d946ef">
            {{ remainingLength }} cm
          </div>
          <div class="visual-bar">
            <div
              class="bar-fill"
              :style="{ width: usedLengthPercent }"
            ></div>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-title">ZEMİN DOLULUĞU</span>
          <div class="stat-value">%{{ areaPercentage }}</div>
          <small class="stat-desc"
            >{{ totalAreaUsed.toFixed(1) }} m² /
            {{ containerArea.toFixed(1) }} m²</small
          >
        </div>
      </div>
    </div>

    <div class="main-layout">
      <div class="left-panel">
        <Card class="input-card">
          <template #title
            ><span class="card-title">2. Kasa Ekle</span></template
          >
          <template #content>
            <div class="form-column">
              <div class="input-group full-width">
                <label>Kasa Tanımı</label>
                <InputText
                  v-model="newCrate.name"
                  placeholder="Örn: Mermer Sandığı"
                />
              </div>

              <div class="dimensions-row">
                <div class="input-group">
                  <label>En</label
                  ><InputNumber v-model="newCrate.width" class="center-input" />
                </div>
                <div class="input-group">
                  <label>Yükseklik</label
                  ><InputNumber
                    v-model="newCrate.height"
                    class="center-input"
                  />
                </div>
                <div class="input-group">
                  <label>Boy</label
                  ><InputNumber
                    v-model="newCrate.length"
                    class="center-input"
                  />
                </div>
              </div>

              <div class="options-row">
                <div class="option-box">
                  <label>Forklift Yönü</label>
                  <SelectButton
                    v-model="newCrate.forkliftSide"
                    :options="forkliftOptions"
                    optionLabel="label"
                    optionValue="value"
                  />
                  <small style="color: #999; font-size: 9px"
                    >(Sistem otomatik çevirebilir)</small
                  >
                </div>
                <div class="option-box switch-box">
                  <div class="switch-row">
                    <InputSwitch v-model="newCrate.isStackable" />
                    <label>Üst Üste?</label>
                  </div>
                  <small
                    v-if="calculatePreviewStack === 0"
                    style="color: #dc2626; font-weight: bold"
                  >
                    Yükseklik sığmıyor
                  </small>
                  <small
                    v-else-if="newCrate.isStackable"
                    style="color: green; font-weight: bold"
                  >
                    Hesaplanan: {{ calculatePreviewStack }} Kat
                  </small>
                  <small v-else style="color: gray">Zeminde Tek Kat</small>
                </div>
              </div>

              <div
                class="input-group full-width"
                style="background: #f8f9fa; padding: 10px; border-radius: 4px"
              >
                <label
                  style="font-weight: bold; display: block; text-align: center"
                  >Adet</label
                >
                <InputNumber
                  v-model="newCrate.quantity"
                  showButtons
                  buttonLayout="horizontal"
                  :min="1"
                  inputStyle="text-align: center; font-weight: bold; font-size: 1.2rem; color: #10B981;"
                />
              </div>

              <Button
                label="Optimal Yerleştir"
                icon="pi pi-bolt"
                class="p-button-success"
                @click="tryAddCrate"
                style="width: 100%"
              />
            </div>
          </template>
        </Card>

        <div class="simulation-container">
          <div class="sim-header">
            <h4>OTOMATİK YERLEŞİM PLANI</h4>
            <span class="badge" v-if="items.length > 0"
              >Boşluk: {{ remainingLength }} cm</span
            >
          </div>

          <div
            class="container-frame"
            :style="{ paddingBottom: frameRatioPercent }"
          >
            <div class="container-inner">
              <div class="door-label">KAPI</div>

              <div
                v-if="items.length > 0"
                class="measure-line"
                :style="{ left: usedLengthPercent }"
              >
                <div class="measure-arrow">
                  <span>&larr; {{ remainingLength }} cm &rarr;</span>
                </div>
              </div>

              <div
                v-for="(box, index) in placedBoxes"
                :key="index"
                class="crate-box"
                :style="{
                  left: pct(box.x, containerL),
                  top: pct(box.y, containerW),
                  width: pct(box.l, containerL),
                  height: pct(box.w, containerW),
                  backgroundColor: box.color,
                }"
                :title="
                  box.name +
                  ' (Çevrildi: ' +
                  (box.isRotated ? 'Evet' : 'Hayır') +
                  ')'
                "
              >
                <div
                  v-if="
                    (box.forkliftSide === 'width' && !box.isRotated) ||
                    (box.forkliftSide === 'length' && box.isRotated)
                  "
                  class="forklift-overlay from-width"
                ></div>
                <div v-else class="forklift-overlay from-length"></div>

                <div class="box-badge" v-if="box.stackCount > 1">
                  x{{ box.stackCount }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="right-panel">
        <div class="list-container">
          <div class="list-header">
            <h3>Yükleme Listesi</h3>
            <Button
              v-if="items.length > 0"
              label="Temizle"
              icon="pi pi-trash"
              class="p-button-danger p-button-text p-button-sm"
              @click="clearAll"
            />
          </div>

          <DataTable
            :value="items"
            class="p-datatable-sm"
            :scrollable="true"
            scrollHeight="600px"
            v-if="items.length > 0"
          >
            <Column header="" headerStyle="width: 2rem"
              ><template #body="slotProps"
                ><div
                  class="color-dot"
                  :style="{ backgroundColor: slotProps.data.color }"
                ></div></template
            ></Column>
            <Column field="name" header="Malzeme">
              <template #body="slotProps">
                <div style="font-weight: bold">{{ slotProps.data.name }}</div>
                <div style="font-size: 0.75rem; color: #666">
                  {{ slotProps.data.width }}x{{ slotProps.data.height }}x{{
                    slotProps.data.length
                  }}
                </div>
              </template>
            </Column>
            <Column
              header="Kat"
              headerStyle="width: 3rem; text-align:center"
              bodyStyle="text-align: center;"
            >
              <template #body="slotProps">{{
                slotProps.data.calculatedMaxStack
              }}</template>
            </Column>
            <Column
              header="Sığan"
              headerStyle="width: 5rem; text-align:center"
              bodyStyle="text-align: center; font-weight: bold; color: #10B981; font-size: 1.1rem;"
            >
              <template #body="slotProps"
                >{{ slotProps.data.quantity }}
                <span
                  style="font-size: 0.7rem; color: #666; font-weight: normal"
                  >/ {{ slotProps.data.requestedQty }}</span
                ></template
              >
            </Column>
            <Column
              header="Kalan"
              headerStyle="width: 4rem; text-align:center"
              bodyStyle="text-align: center;"
            >
              <template #body="slotProps">
                <span
                  v-if="slotProps.data.failedQty > 0"
                  class="failed-badge"
                  >{{ slotProps.data.failedQty }}</span
                >
                <span v-else class="success-check"
                  ><i class="pi pi-check"></i
                ></span>
              </template>
            </Column>
            <Column
              header="İşlem"
              headerStyle="width: 6rem; text-align: center"
              bodyStyle="text-align: center"
            >
              <template #body="slotProps">
                <div style="display: flex; justify-content: center; gap: 5px">
                  <Button
                    icon="pi pi-minus"
                    class="p-button-rounded p-button-secondary p-button-text p-button-sm"
                    @click="decreaseItem(slotProps.index)"
                    v-tooltip.top="'1 Adet Azalt'"
                  />

                  <Button
                    icon="pi pi-trash"
                    class="p-button-rounded p-button-danger p-button-text p-button-sm"
                    @click="removeItem(slotProps.index)"
                    v-tooltip.top="'Tamamını Sil'"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
          <div v-else class="empty-state">
            <i class="pi pi-box"></i>
            <p>Liste boş.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// --- Yerleştirme sabitleri ---
// EPS: ölçü girişlerindeki ondalık/kayan nokta hatalarını tolere eder.
// (örnek: 235.2 / 78.4 kayan noktada 2.9999... çıkar -> EPS olmadan 3 yerine 2 kat hesaplanırdı)
const EPS = 0.1;
const MAX_QTY_PER_ITEM = 5000; // tek kalemde izin verilen azami adet (tarayıcı kilitlenmesini önler)
const MAX_PLACEMENTS = 4000; // çizilebilecek azami zemin noktası

export default {
  name: "ContainerCalculator",
  data() {
    return {
      containerPresets: [
        { label: "20' DC (235x239x590)", width: 235, height: 239, length: 590 },
        {
          label: "40' DC (235x239x1203)",
          width: 235,
          height: 239,
          length: 1203,
        },
        {
          label: "40' HC (235x269x1203)",
          width: 235,
          height: 269,
          length: 1203,
        },
      ],
      forkliftOptions: [
        { label: "Kısa (En)", value: "standard" },
        { label: "Uzun (Boy)", value: "rotated" },
      ],
      selectedPreset: null,
      alertState: { type: null, message: null },

      container: { width: 235, height: 239, length: 590 },
      newCrate: {
        name: "Mermer Plaka",
        width: 100,
        height: 80,
        length: 120,
        quantity: 10,
        isStackable: true,
        forkliftSide: "standard",
        color: "#3B82F6",
        isEuroMode: false,
      },
      items: [],
      placedBoxes: [],
    };
  },
  computed: {
    containerW() {
      return Number(this.container.width) || 0;
    },
    containerH() {
      return Number(this.container.height) || 0;
    },
    containerL() {
      return Number(this.container.length) || 0;
    },
    containerVolume() {
      return (this.containerW * this.containerH * this.containerL) / 1000000;
    },
    containerArea() {
      return (this.containerW * this.containerL) / 10000;
    },
    totalVolume() {
      return this.items.reduce(
        (acc, item) =>
          acc +
          (Number(item.width) *
            Number(item.height) *
            Number(item.length) *
            item.quantity) /
            1000000,
        0
      );
    },
    volumePercentage() {
      if (this.containerVolume <= 0) return "0.0";
      const val = (this.totalVolume / this.containerVolume) * 100;
      return isFinite(val) ? Math.min(val, 100).toFixed(1) : "0.0";
    },
    totalAreaUsed() {
      return (
        this.placedBoxes.reduce((acc, box) => acc + box.w * box.l, 0) / 10000
      );
    },
    areaPercentage() {
      if (this.containerArea <= 0) return "0.0";
      const val = (this.totalAreaUsed / this.containerArea) * 100;
      return isFinite(val) ? Math.min(val, 100).toFixed(1) : "0.0";
    },
    calculatePreviewStack() {
      return this.stackCapacityFor(this.newCrate);
    },
    usedLength() {
      if (this.placedBoxes.length === 0) return 0;
      return Math.max(...this.placedBoxes.map((b) => b.x + b.l));
    },
    remainingLength() {
      const rem = this.containerL - this.usedLength;
      return Math.max(0, rem).toFixed(1);
    },
    usedLengthPercent() {
      return this.pct(this.usedLength, this.containerL);
    },
    frameRatioPercent() {
      return this.pct(this.containerW, this.containerL);
    },
  },
  methods: {
    // Oransal stil değerleri için güvenli yüzde: payda 0/null ise NaN% üretmez.
    pct(value, total) {
      const v = Number(value) || 0;
      const t = Number(total) || 0;
      if (t <= 0) return "0%";
      const r = (v / t) * 100;
      if (!isFinite(r)) return "0%";
      return Math.min(Math.max(r, 0), 100) + "%";
    },

    // Bir kalemin konteynır yüksekliğine göre kaç kat istiflenebileceği.
    // EPS toleransı ondalıklı ölçülerdeki kayan nokta hatasını engeller.
    stackCapacityFor(crate) {
      const h = Number(crate.height);
      const cH = this.containerH;
      if (!(h > 0) || cH <= 0) return 0;
      if (h > cH + EPS) return 0; // tek kat bile sığmıyor
      if (!crate.isStackable) return 1;
      const cap = Math.floor((cH + EPS) / h);
      return cap < 1 ? 1 : cap;
    },

    applyPreset() {
      if (this.selectedPreset) {
        this.container.width = this.selectedPreset.width;
        this.container.height = this.selectedPreset.height;
        this.container.length = this.selectedPreset.length;
        this.recalculateAll();
      }
    },
    toggleEuroMode() {
      if (this.newCrate.isEuroMode) {
        this.newCrate.width = 80;
        this.newCrate.length = 120;
        this.newCrate.height = 14.4;
        this.newCrate.name = "Euro Palet (EPAL)";
        this.newCrate.isStackable = true;
        this.newCrate.forkliftSide = "standard";
      }
    },
    // Kasa tanımından türetilen kararlı renk: aynı tanım her zaman aynı
    // rengi alır, farklı tanım farklı renk alır (rastgele renk yerine).
    hashHue(str) {
      let h = 0;
      for (let i = 0; i < str.length; i++) {
        h = (h * 31 + str.charCodeAt(i)) >>> 0;
      }
      return h % 360;
    },
    hueOf(color) {
      const s = String(color || "");
      if (s.slice(0, 4) !== "hsl(") return null;
      const v = parseFloat(s.slice(4));
      return isFinite(v) ? v : null;
    },
    colorForName(name) {
      const key = (name || "").trim().toLocaleLowerCase("tr");
      // Listede aynı tanım varsa onun rengini kullan.
      const twin = this.items.find(
        (i) => (i.name || "").trim().toLocaleLowerCase("tr") === key
      );
      if (twin && twin.color) return twin.color;

      // Farklı tanımların tonları birbirine yakın düşmesin.
      const used = this.items
        .map((i) => this.hueOf(i.color))
        .filter((h) => h !== null);
      const tooClose = (h) =>
        used.some((u) => {
          const d = Math.abs(u - h);
          return Math.min(d, 360 - d) < 25;
        });

      let hue = this.hashHue(key);
      for (let i = 0; i < 36 && tooClose(hue); i++) hue = (hue + 37) % 360;
      return `hsl(${hue}, 70%, 55%)`;
    },
    clearAlert() {
      this.alertState.type = null;
      this.alertState.message = null;
    },

    getSortedList(list) {
      // Listeyi olduğu gibi (kullanıcı sırasıyla) işle
      return JSON.parse(JSON.stringify(list));
    },

    // Girilen kasa ölçülerini doğrula. Hata varsa mesaj döner, yoksa null.
    validateCrate(crate, qty) {
      const w = Number(crate.width);
      const l = Number(crate.length);
      const h = Number(crate.height);
      if (this.containerW <= 0 || this.containerL <= 0 || this.containerH <= 0)
        return "Önce geçerli konteynır ölçülerini girin.";
      if (!(w > 0) || !(l > 0) || !(h > 0))
        return "Kasa ölçüleri sıfırdan büyük olmalı.";
      if (!(qty >= 1)) return "Adet en az 1 olmalı.";
      if (h > this.containerH + EPS)
        return "Kasa yüksekliği konteynırdan büyük!";
      // İki yönden de sığmıyorsa gerçekten sığmıyordur (sistem otomatik çevirebiliyor).
      const fitsNormal =
        l <= this.containerL + EPS && w <= this.containerW + EPS;
      const fitsRotated =
        w <= this.containerL + EPS && l <= this.containerW + EPS;
      if (!fitsNormal && !fitsRotated)
        return "Kasa taban ölçüleri konteynıra sığmıyor (çevirsek bile)!";
      return null;
    },

    tryAddCrate() {
      this.clearAlert();
      let requestedQty = Math.floor(Number(this.newCrate.quantity) || 0);
      const boxW = Number(this.newCrate.width);
      const boxL = Number(this.newCrate.length);
      const boxH = Number(this.newCrate.height);

      const err = this.validateCrate(this.newCrate, requestedQty);
      if (err) {
        this.alertState = { type: "error", message: err };
        return;
      }

      if (requestedQty > MAX_QTY_PER_ITEM) {
        requestedQty = MAX_QTY_PER_ITEM;
        this.alertState = {
          type: "warning",
          message: `Tek kalemde en fazla ${MAX_QTY_PER_ITEM} adet hesaplanır.`,
        };
      }

      const crateName = (this.newCrate.name || "").trim() || "Kasa";

      const existingIndex = this.items.findIndex(
        (item) =>
          Math.abs(Number(item.width) - boxW) < 0.01 &&
          Math.abs(Number(item.height) - boxH) < 0.01 &&
          Math.abs(Number(item.length) - boxL) < 0.01 &&
          item.isStackable === this.newCrate.isStackable &&
          item.forkliftSide === this.newCrate.forkliftSide &&
          (item.name || "") === crateName
      );

      const candidateList = JSON.parse(JSON.stringify(this.items));
      let currentId = null;

      if (existingIndex !== -1) {
        const merged = candidateList[existingIndex];
        merged.requestedQty = Math.min(
          merged.requestedQty + requestedQty,
          MAX_QTY_PER_ITEM
        );
        currentId = merged.id;
      } else {
        const newItem = {
          ...this.newCrate,
          name: crateName,
          id: this.nextItemId(),
          color: this.colorForName(crateName),
          requestedQty: requestedQty,
          failedQty: 0,
          calculatedMaxStack: this.stackCapacityFor(this.newCrate),
          quantity: 0,
        };
        candidateList.push(newItem);
        currentId = newItem.id;
      }

      const result = this.packItems(candidateList);
      this.syncResults(candidateList, result);

      const current = candidateList.find((i) => i.id === currentId);
      const totalFitted = current ? current.quantity : 0;
      const totalRequested = current ? current.requestedQty : 0;

      if (totalFitted === 0) {
        this.alertState = { type: "error", message: "Hiçbir kasa sığmadı!" };
        return;
      }
      if (totalRequested - totalFitted > 0 && !this.alertState.type) {
        this.alertState = {
          type: "warning",
          message: `${totalRequested} istendi, ${totalFitted} sığdı.`,
        };
      }

      this.items = candidateList;
      this.placedBoxes = result.placed;
      this.newCrate.quantity = 1;
    },

    // Date.now() aynı milisaniyede iki kalem eklenirse çakışabiliyordu.
    nextItemId() {
      const max = this.items.reduce(
        (acc, i) => Math.max(acc, Number(i.id) || 0),
        0
      );
      return max + 1;
    },

    // Paketleme sonucunu listeye yaz: sığan adet, kalan adet ve GÜNCEL kat sayısı.
    // (kat sayısı eskiden sadece ekleme anında hesaplanıyordu; konteynır
    //  yüksekliği değişince tabloda eski değer kalıyordu.)
    syncResults(list, result) {
      const fitted = {};
      result.placed.forEach((box) => {
        fitted[box.groupId] = (fitted[box.groupId] || 0) + box.stackCount;
      });
      list.forEach((item) => {
        const count = fitted[item.id] || 0;
        item.quantity = count;
        item.failedQty = Math.max(0, item.requestedQty - count);
        item.calculatedMaxStack = this.stackCapacityFor(item);
      });
    },

    decreaseItem(index) {
      const item = this.items[index];
      if (!item) return;
      if (item.requestedQty > 1) {
        item.requestedQty--;
        this.recalculateAll();
      } else {
        this.removeItem(index);
      }
    },

    removeItem(index) {
      this.items.splice(index, 1);
      this.clearAlert();
      this.recalculateAll();
    },
    clearAll() {
      this.items = [];
      this.placedBoxes = [];
      this.clearAlert();
    },

    recalculateAll() {
      const result = this.packItems(this.items);
      this.syncResults(this.items, result);
      this.placedBoxes = result.placed;
    },

    // --- Maximal-rectangles boşluk yönetimi ---
    // Eski guillotine bölme, yerleştirilen kutunun yanındaki büyük boş alanı
    // kaybediyordu: küçük bir kasa eklenince arkadaki metrelerce boşluğa
    // büyük kasa artık sığmıyordu. Aşağıdaki bölme tüm maksimal boş
    // dikdörtgenleri korur.
    splitSpace(S, R) {
      if (
        R.x >= S.x + S.w - EPS ||
        R.x + R.w <= S.x + EPS ||
        R.y >= S.y + S.h - EPS ||
        R.y + R.h <= S.y + EPS
      )
        return [S]; // kesişmiyor
      const out = [];
      if (R.x > S.x + EPS) out.push({ x: S.x, y: S.y, w: R.x - S.x, h: S.h });
      if (R.x + R.w < S.x + S.w - EPS)
        out.push({
          x: R.x + R.w,
          y: S.y,
          w: S.x + S.w - (R.x + R.w),
          h: S.h,
        });
      if (R.y > S.y + EPS) out.push({ x: S.x, y: S.y, w: S.w, h: R.y - S.y });
      if (R.y + R.h < S.y + S.h - EPS)
        out.push({
          x: S.x,
          y: R.y + R.h,
          w: S.w,
          h: S.y + S.h - (R.y + R.h),
        });
      return out;
    },
    spaceContains(a, b) {
      return (
        b.x >= a.x - EPS &&
        b.y >= a.y - EPS &&
        b.x + b.w <= a.x + a.w + EPS &&
        b.y + b.h <= a.y + a.h + EPS
      );
    },
    pruneSpaces(spaces) {
      const kept = [];
      for (let i = 0; i < spaces.length; i++) {
        const s = spaces[i];
        if (s.w <= EPS || s.h <= EPS) continue;
        let covered = false;
        for (let j = 0; j < spaces.length; j++) {
          if (i === j) continue;
          const o = spaces[j];
          if (o.w <= EPS || o.h <= EPS) continue;
          // Birebir aynı iki dikdörtgenden yalnızca birini tut.
          if (this.spaceContains(o, s) && !(j > i && this.spaceContains(s, o))) {
            covered = true;
            break;
          }
        }
        if (!covered) kept.push(s);
      }
      return kept;
    },
    // Kapıdan en uzak (en küçük x), sonra en soldaki boşluk tercih edilir;
    // böylece "kalan boş uzunluk" ölçüsü anlamlı kalır.
    findSpot(spaces, L, W) {
      let best = -1;
      for (let i = 0; i < spaces.length; i++) {
        const sp = spaces[i];
        if (sp.w < L - EPS || sp.h < W - EPS) continue;
        if (best === -1) {
          best = i;
          continue;
        }
        const b = spaces[best];
        if (
          sp.x < b.x - EPS ||
          (Math.abs(sp.x - b.x) <= EPS && sp.y < b.y - EPS)
        )
          best = i;
      }
      return best;
    },

    packItems(itemList) {
      const cL = this.containerL;
      const cW = this.containerW;
      const cH = this.containerH;
      const placed = [];
      if (cL <= 0 || cW <= 0 || cH <= 0) return { placed };

      let spaces = [{ x: 0, y: 0, w: cL, h: cW }];

      (itemList || []).forEach((group) => {
        const gW = Number(group.width);
        const gL = Number(group.length);
        const gH = Number(group.height);

        let qty = Math.floor(
          Number(
            group.requestedQty !== undefined
              ? group.requestedQty
              : group.quantity
          ) || 0
        );
        qty = Math.min(Math.max(qty, 0), MAX_QTY_PER_ITEM);

        // Geçersiz ölçü / adet: sessizce atla (eskiden sıfır ölçülü kasa
        // binlerce kutu üretip tarayıcıyı kilitliyordu).
        if (!(gW > 0) || !(gL > 0) || !(gH > 0) || qty <= 0) return;

        const stackCap = this.stackCapacityFor(group);
        if (stackCap < 1) return; // yüksekliği sığmıyor

        // Tercih edilen forklift yönü önce denenir, sığmazsa 90° çevrilir.
        const orientations =
          group.forkliftSide === "standard"
            ? [
                { L: gL, W: gW, rot: false },
                { L: gW, W: gL, rot: true },
              ]
            : [
                { L: gW, W: gL, rot: true },
                { L: gL, W: gW, rot: false },
              ];

        let remaining = qty;
        while (remaining > 0) {
          if (placed.length >= MAX_PLACEMENTS) break;

          let idx = -1;
          let chosen = null;
          for (const o of orientations) {
            if (o.L > cL + EPS || o.W > cW + EPS) continue;
            const i = this.findSpot(spaces, o.L, o.W);
            if (i !== -1) {
              idx = i;
              chosen = o;
              break;
            }
          }
          if (idx === -1) break;

          const sp = spaces[idx];
          const rect = { x: sp.x, y: sp.y, w: chosen.L, h: chosen.W };
          const stack = Math.min(remaining, stackCap);

          placed.push({
            x: rect.x,
            y: rect.y,
            l: chosen.L,
            w: chosen.W,
            color: group.color,
            name: group.name,
            stackCount: stack,
            forkliftSide: chosen.rot ? "length" : "width",
            groupId: group.id,
            isRotated: chosen.rot,
          });

          let next = [];
          for (const s of spaces) next = next.concat(this.splitSpace(s, rect));
          spaces = this.pruneSpaces(next);

          remaining -= stack;
        }
      });

      return { placed };
    },
  },
};
</script>
<style scoped>
/* GENEL */
.calculator-wrapper {
  max-width: 1300px;
  margin: 0 auto;
  font-family: sans-serif;
  color: #333;
  padding: 20px;
}

/* ALERT KUTULARI */
.alert-box {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  min-width: 320px;
}
.alert-box.error {
  background: #dc2626;
  color: white;
}
.alert-box.warning {
  background: #f59e0b;
  color: #fff;
}
.alert-content {
  display: flex;
  align-items: center;
  gap: 15px;
}
.alert-content i {
  font-size: 1.5rem;
}
.alert-content h4 {
  margin: 0;
  font-weight: bold;
}
.alert-content p {
  margin: 0;
  font-size: 0.9rem;
}
.close-btn {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1.2rem;
  opacity: 0.8;
}

/* ROZETLER VE LİSTE */
.failed-badge {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 0.9rem;
}
.success-check {
  color: #10b981;
  font-weight: bold;
}

/* ÜST PANEL */
.top-section {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.config-card {
  flex: 1;
  min-width: 300px;
}
.stats-wrapper {
  flex: 2;
  display: flex;
  gap: 15px;
  min-width: 300px;
  flex-wrap: wrap;
}
.stat-card {
  flex: 1;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 150px;
}
.stat-title {
  font-size: 0.75rem;
  font-weight: bold;
  color: #6b7280;
  letter-spacing: 0.05em;
}
.stat-value {
  font-size: 2rem;
  font-weight: 900;
  color: #10b981;
  margin-top: 5px;
}
.stat-desc {
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 5px;
}
.highlight-card {
  border-color: #f5d0fe;
  background: #fdf4ff;
}
.visual-bar {
  height: 6px;
  width: 100%;
  background: #e5e7eb;
  margin-top: 10px;
  border-radius: 3px;
  overflow: hidden;
}
.bar-fill {
  height: 100%;
  background: #d946ef;
}

/* ANA YAPI */
.main-layout {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.left-panel {
  flex: 5;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 350px;
}
.right-panel {
  flex: 7;
  min-width: 400px;
}

/* --- FORM DÜZELTMELERİ (KRİTİK GÜNCELLEME) --- */
.form-column {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Satır yapısı: Sığmazsa aşağı kaysın */
.dimensions-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  width: 100%; /* Taasmayı engellemek için */
}

/* Her bir input grubu */
.input-group {
  flex: 1 1 30%; /* Büyüyüp küçülebilir, taban %30 */
  min-width: 80px; /* Çok küçülmesin */
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 100%; /* Asla kapsayıcıdan büyük olamaz */
}

.input-group label,
.input-group small {
  font-size: 0.8rem;
  font-weight: bold;
  color: #4b5563;
}
.full-width {
  width: 100%;
}

/* PRIME VUE INPUTLARINI ZORLA KUTUYA SIĞDIR */
:deep(.p-inputnumber) {
  width: 100%;
  max-width: 100%; /* Taşmayı engeller */
}
:deep(.p-inputnumber-input) {
  width: 100% !important;
  text-align: center;
  box-sizing: border-box !important; /* Padding yüzünden taşmayı engeller */
}
:deep(.p-dropdown) {
  width: 100%;
  max-width: 100%;
}
/* --- FORM DÜZELTMELERİ BİTİŞ --- */

.options-row {
  display: flex;
  gap: 10px;
}
.option-box {
  flex: 1;
  border: 1px solid #e5e7eb;
  padding: 10px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: #f9fafb;
}
.switch-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.8rem;
  font-weight: bold;
}

/* EURO MODE KUTUSU */
.euro-mode-box {
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 10px;
  transition: all 0.3s;
}
.euro-mode-box.active {
  background: #eff6ff;
  border-color: #3b82f6;
}

/* SİMÜLASYON */
.simulation-container {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 15px;
}
.sim-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.sim-header h4 {
  margin: 0;
  font-size: 0.8rem;
  color: #6b7280;
}
.badge {
  background: #ede9fe;
  color: #5b21b6;
  font-size: 0.7rem;
  padding: 4px 8px;
  border-radius: 12px;
}
.container-frame {
  position: relative;
  background: #e5e7eb;
  border: 4px solid #4b5563;
  width: 100%;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
}
.container-inner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.door-label {
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  font-size: 10px;
  color: #9ca3af;
  font-weight: bold;
}
.crate-box {
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  cursor: pointer;
  overflow: hidden;
  box-sizing: border-box;
}
.crate-box:hover {
  z-index: 10;
  box-shadow: 0 0 0 2px #fff, 0 5px 15px rgba(0, 0, 0, 0.3);
  transform: scale(1.02);
}
.forklift-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.25;
  pointer-events: none;
}
.from-width {
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 10px,
    #000 10px,
    #000 12px
  );
}
.from-length {
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 10px,
    #000 10px,
    #000 12px
  );
}
.box-badge {
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.9);
  color: #000;
  font-weight: bold;
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

/* LİSTE */
.list-container {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.list-header {
  padding: 15px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list-header h3 {
  margin: 0;
  font-size: 1rem;
  color: #374151;
}
.empty-state {
  padding: 40px;
  text-align: center;
  color: #9ca3af;
}
.empty-state i {
  font-size: 3rem;
  margin-bottom: 10px;
  opacity: 0.3;
}
.color-dot {
  width: 15px;
  height: 15px;
  border-radius: 4px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.measure-line {
  position: absolute;
  top: 0;
  bottom: 0;
  border-left: 2px dashed #d946ef;
  z-index: 20;
  pointer-events: none;
}
.measure-arrow {
  position: absolute;
  top: 50%;
  left: 0;
  white-space: nowrap;
  background: #fdf4ff;
  color: #d946ef;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: bold;
  border: 1px solid #f5d0fe;
  transform: translate(5px, -50%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
