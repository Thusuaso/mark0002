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
              :style="{ width: (usedLength / containerL) * 100 + '%' }"
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
                    v-if="newCrate.isStackable"
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
            :style="{ paddingBottom: (containerW / containerL) * 100 + '%' }"
          >
            <div class="container-inner">
              <div class="door-label">KAPI</div>

              <div
                v-if="items.length > 0"
                class="measure-line"
                :style="{ left: (usedLength / containerL) * 100 + '%' }"
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
                  left: (box.x / containerL) * 100 + '%',
                  top: (box.y / containerW) * 100 + '%',
                  width: (box.l / containerL) * 100 + '%',
                  height: (box.w / containerW) * 100 + '%',
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
      const val = (this.totalVolume / this.containerVolume) * 100;
      return isNaN(val) ? "0.0" : Math.min(val, 100).toFixed(1);
    },
    totalAreaUsed() {
      return (
        this.placedBoxes.reduce((acc, box) => acc + box.w * box.l, 0) / 10000
      );
    },
    areaPercentage() {
      const val = (this.totalAreaUsed / this.containerArea) * 100;
      return isNaN(val) ? "0.0" : Math.min(val, 100).toFixed(1);
    },
    calculatePreviewStack() {
      const bH = Number(this.newCrate.height);
      if (!bH || bH <= 0) return 1;
      return Math.floor(this.containerH / bH);
    },
    usedLength() {
      if (this.placedBoxes.length === 0) return 0;
      return Math.max(...this.placedBoxes.map((b) => b.x + b.l));
    },
    remainingLength() {
      const rem = this.containerL - this.usedLength;
      return Math.max(0, rem).toFixed(1);
    },
  },
  methods: {
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
    generateColor() {
      const h = Math.floor(Math.random() * 360);
      return `hsl(${h}, 70%, 60%)`;
    },
    clearAlert() {
      this.alertState.type = null;
      this.alertState.message = null;
    },

    getSortedList(list) {
      // Listeyi olduğu gibi (kullanıcı sırasıyla) işle
      return JSON.parse(JSON.stringify(list));
    },

    tryAddCrate() {
      this.clearAlert();
      const requestedQty = Number(this.newCrate.quantity);
      const boxW = Number(this.newCrate.width);
      const boxL = Number(this.newCrate.length);
      const boxH = Number(this.newCrate.height);

      // --- Sığma Kontrolü (Seçili Yöne Göre) ---
      let targetW, targetL;
      if (this.newCrate.forkliftSide === "standard") {
        // Standart: En -> Y (Genişlik), Boy -> X (Uzunluk)
        targetW = boxW;
        targetL = boxL;
      } else {
        // Rotated: En -> X (Uzunluk), Boy -> Y (Genişlik)
        targetW = boxL;
        targetL = boxW;
      }

      if (targetW > this.containerW || targetL > this.containerL) {
        this.alertState = {
          type: "error",
          message: "Kasa ölçüleri (seçilen yönde) konteynıra sığmıyor!",
        };
        return;
      }
      if (boxH > this.containerH) {
        this.alertState = {
          type: "error",
          message: "Kasa yüksekliği konteynırdan büyük!",
        };
        return;
      }

      let calcMaxStack = 1;
      if (this.newCrate.isStackable && boxH > 0) {
        calcMaxStack = Math.floor(this.containerH / boxH);
        if (calcMaxStack < 1) calcMaxStack = 1;
      }

      const existingIndex = this.items.findIndex(
        (item) =>
          Math.abs(Number(item.width) - boxW) < 0.1 &&
          Math.abs(Number(item.height) - boxH) < 0.1 &&
          Math.abs(Number(item.length) - boxL) < 0.1 &&
          item.isStackable === this.newCrate.isStackable &&
          item.forkliftSide === this.newCrate.forkliftSide
      );

      let candidateList = JSON.parse(JSON.stringify(this.items));
      let currentItemRef = null;

      if (existingIndex !== -1) {
        candidateList[existingIndex].requestedQty += requestedQty;
        currentItemRef = candidateList[existingIndex];
      } else {
        const newItem = {
          ...this.newCrate,
          id: Date.now(),
          color: this.generateColor(),
          requestedQty: requestedQty,
          failedQty: 0,
          calculatedMaxStack: calcMaxStack,
          quantity: 0,
        };
        candidateList.push(newItem);
        currentItemRef = newItem;
      }

      const result = this.packItems(candidateList);

      let totalFittedForThisItem = 0;
      result.placed.forEach((box) => {
        if (box.groupId === currentItemRef.id)
          totalFittedForThisItem += box.stackCount;
      });

      const totalRequested = currentItemRef.requestedQty;
      const failed = totalRequested - totalFittedForThisItem;

      if (totalFittedForThisItem === 0 && requestedQty > 0) {
        this.alertState = { type: "error", message: `Hiçbir kasa sığmadı!` };
        return;
      }
      if (failed > 0) {
        this.alertState = {
          type: "warning",
          message: `${totalRequested} istendi, ${totalFittedForThisItem} sığdı.`,
        };
      }

      candidateList.forEach((item) => {
        let fitCount = 0;
        result.placed.forEach((box) => {
          if (box.groupId === item.id) fitCount += box.stackCount;
        });
        item.quantity = fitCount;
        item.failedQty = item.requestedQty - fitCount;
      });

      this.items = candidateList;
      this.placedBoxes = result.placed;
      this.newCrate.quantity = 1;
      this.newCrate.name = "";
    },

    decreaseItem(index) {
      const item = this.items[index];
      if (item.requestedQty > 1) {
        item.requestedQty--;
        this.recalculateAll();
      } else {
        this.removeItem(index);
      }
    },

    removeItem(index) {
      this.items.splice(index, 1);
      this.recalculateAll();
    },
    clearAll() {
      this.items = [];
      this.placedBoxes = [];
      this.clearAlert();
    },

    recalculateAll() {
      let candidateList = JSON.parse(JSON.stringify(this.items));
      const result = this.packItems(candidateList);
      this.items.forEach((item) => {
        let fitCount = 0;
        result.placed.forEach((box) => {
          if (box.groupId === item.id) fitCount += box.stackCount;
        });
        item.quantity = fitCount;
        item.failedQty = item.requestedQty - fitCount;
      });
      this.placedBoxes = result.placed;
    },

    // --- DÜZELTİLMİŞ ALGORİTMA (Raf Sistemi / Shelf Packing) ---
    packItems(itemList) {
      const cLength = Number(this.container.length) || 0;
      const cWidth = Number(this.container.width) || 0;
      const cHeight = Number(this.container.height) || 0;

      // Boşlukları tanımla: {x, y, w (length), h (width)}
      let spaces = [{ x: 0, y: 0, w: cLength, h: cWidth }];
      let placed = [];

      itemList.forEach((group) => {
        let remainingQty =
          group.requestedQty !== undefined
            ? group.requestedQty
            : group.quantity;

        let stackCap = 1;
        const gHeight = Number(group.height);
        if (group.isStackable && gHeight > 0) {
          stackCap = Math.floor(cHeight / gHeight);
          if (stackCap < 1) stackCap = 1;
        }

        const rawDim1 = Number(group.length);
        const rawDim2 = Number(group.width);

        // Kullanıcı seçimi (Standard: W=En, L=Boy | Rotated: W=Boy, L=En)
        let targetL, targetW;
        let isRotated = false;

        if (group.forkliftSide === "standard") {
          targetL = rawDim1; // X
          targetW = rawDim2; // Y
          isRotated = false;
        } else {
          targetL = rawDim2; // X
          targetW = rawDim1; // Y
          isRotated = true;
        }

        while (remainingQty > 0) {
          let currentStack = Math.min(remainingQty, stackCap);

          // SIRALAMA: Önce X (Sol), Sonra Y (Üst)
          spaces.sort((a, b) => {
            // X'e göre sırala (Kapıya yakınlık)
            if (Math.abs(a.x - b.x) > 0.5) return a.x - b.x;
            // Aynı X hizasındaysa Y'ye göre sırala (Yukarıdan aşağı)
            return a.y - b.y;
          });

          let bestSpaceIndex = -1;

          // İlk sığan boşluğu bul
          for (let i = 0; i < spaces.length; i++) {
            const sp = spaces[i];
            // Toleranslı kontrol (0.1 cm)
            if (sp.w >= targetL - 0.1 && sp.h >= targetW - 0.1) {
              bestSpaceIndex = i;
              break;
            }
          }

          if (bestSpaceIndex !== -1) {
            let space = spaces[bestSpaceIndex];

            placed.push({
              x: space.x,
              y: space.y,
              l: targetL,
              w: targetW,
              color: group.color,
              name: group.name,
              stackCount: currentStack,
              forkliftSide: isRotated ? "length" : "width",
              groupId: group.id,
              isRotated: isRotated,
            });

            // --- YENİ ALAN BÖLME MANTIĞI (Shelf Split) ---
            // Sorunu çözen kısım burası.
            // Yanındaki boşluğu (Y ekseni) kısıtlamıyoruz, sonuna kadar uzatıyoruz.

            // 1. splitDown (Kutunun YANI / ALTI):
            // X aynı kalır, Y kutu kadar aşağı kayar.
            // ÖNEMLİ: W (Uzunluk) kısıtlanmaz, space.w (kalan tüm uzunluk) korunur.
            // Böylece yanına daha uzun bir parça sığabilir.
            let splitDown = {
              x: space.x,
              y: space.y + targetW,
              w: space.w, // <-- ESKİ KODDA BURASI 'targetL' İDİ, BU YÜZDEN SIĞMIYORDU.
              h: space.h - targetW,
            };

            // 2. splitRight (Kutunun ARKASI / SAĞI):
            // X kutu kadar ileri gider.
            // Y aynı kalır.
            // H sadece kutunun genişliği kadar kısıtlanır (Bu şerit için).
            let splitRight = {
              x: space.x + targetL,
              y: space.y,
              w: space.w - targetL,
              h: targetW, // Sadece bu şeridin yüksekliği
            };

            spaces.splice(bestSpaceIndex, 1);

            // Y eksenini (Genişliği) doldurmak öncelikli olduğu için splitDown'ı önce eklemiyoruz
            // Çünkü "Shelf" mantığında yan taraf aslında "aynı X" hizasında kalıyor.

            if (splitDown.w > 0.1 && splitDown.h > 0.1) spaces.push(splitDown);
            if (splitRight.w > 0.1 && splitRight.h > 0.1)
              spaces.push(splitRight);

            remainingQty -= currentStack;
          } else {
            break; // Sığmadı
          }
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
