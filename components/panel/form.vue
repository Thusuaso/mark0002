<template>
  <div>
    <TabView>
      <TabPanel header="Ürün (En)">
        <div class="row mt-3 mb-3">
          <div class="col">
            <span class="p-float-label">
              <InputText id="productname" v-model="model.urunadi_en" class="w-100" />
              <label for="productname">Ürün Adı</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="code" v-model="model.urunkod" class="w-100" />
              <label for="code">Kod</label>
            </span>
          </div>
          <div class="col">
            <div class="flex flex-wrap justify-content-center gap-3">
              <div class="flex align-items-center">
                <Checkbox v-model="model.yayinla" inputId="published" binary />
                <label for="published" class="ml-2"> Yayınla </label>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-3 m-auto">
          <div class="col-6">
            <span class="p-float-label">
              <Textarea v-model="model.aciklama_en" rows="10" class="w-100" />

              <label>Açıklama</label>
            </span>
          </div>
          <!-- <div class="col">
            <span class="p-float-label">
              <Chips v-model="keywords_en" />
              {{ keywords_en }}

              <Textarea v-model="model.anahtarlar_en" rows="7" cols="50" />
              <label>Anahtarlar</label>
            </span>
          </div> -->
          <div class="col-6">
            <span class="p-float-label mb-4">
              <Chips v-model="anahtarlar_en" class="w-100" />
              <label>Anahtarlar</label>
            </span>
            <span class="p-float-label">
              <Textarea v-model="model.keywords_en" rows="7" class="w-100" />
              <label>Başlık Etiketleri</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <InputText id="unit" v-model="model.birim" class="w-100" />
              <label for="unit">Birim</label>
            </span>
          </div>
          <div class="col">
            <div class="p-float-label">
              <Dropdown
                v-model="selectedCategory"
                inputId="category"
                :options="category"
                optionLabel="kategoriadi_en"
                class="w-100"
                @change="categorySelected($event)"
              />
              <label for="category">Kategori</label>
            </div>
          </div>
          <div class="col">
            <div class="p-float-label">
              <Dropdown
                v-model="selectedStoneType"
                inputId="stonetype"
                :options="category"
                optionLabel="kategoriadi_en"
                class="w-100"
                @change="stoneTypeSelected($event)"
              />
              <label for="stonetype">Taş Türü</label>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <Button
              type="button"
              class="p-button-success w-100"
              label="Kaydet"
              @click="process"
              :disabled="productSaveButtonDisabled"
            />
          </div>
          <div class="col" v-if="!status">
            <Button
              type="button"
              class="p-button-danger w-100"
              label="Sil"
              @click="deleteForm"
            />
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Ürün (Fr)">
        <div class="row mt-3 mb-3">
          <div class="col">
            <span class="p-float-label">
              <InputText id="productname" v-model="model.urunadi_fr" class="w-100" />
              <label for="productname">Ürün Adı</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="code" v-model="model.urunkod" class="w-100" />
              <label for="code">Kod</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <Textarea v-model="model.aciklama_fr" rows="10" class="w-100" />
              <label>Açıklama</label>
            </span>
          </div>

          <div class="col">
            <span class="p-float-label mb-4">
              <Chips v-model="anahtarlar_fr" class="w-100" />
              <label>Anahtarlar</label>
            </span>
            <span class="p-float-label">
              <Textarea v-model="model.keywords_fr" rows="7" class="w-100" />
              <label>Başlık Etiketleri</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <Button
              type="button"
              class="p-button-success w-100"
              label="Kaydet"
              @click="process"
              :disabled="productSaveButtonDisabled"
            />
          </div>
          <div class="col">
            <Button
              type="button"
              class="p-button-danger w-100"
              label="Sil"
              @click="deleteForm"
            />
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Ürün (Es)">
        <div class="row mt-3 mb-3">
          <div class="col">
            <span class="p-float-label">
              <InputText id="productname" v-model="model.urunadi_es" class="w-100" />
              <label for="productname">Ürün Adı</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="code" v-model="model.urunkod" class="w-100" />
              <label for="code">Kod</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <Textarea v-model="model.aciklama_es" rows="10" class="w-100" />
              <label>Açıklama</label>
            </span>
          </div>

          <div class="col">
            <span class="p-float-label mb-4">
              <Chips v-model="anahtarlar_es" class="w-100" />
              <label>Anahtarlar</label>
            </span>
            <span class="p-float-label">
              <Textarea v-model="model.keywords_es" rows="7" class="w-100" />
              <label>Başlık Etiketleri</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <Button
              type="button"
              class="p-button-success w-100"
              label="Kaydet"
              @click="process"
              :disabled="productSaveButtonDisabled"
            />
          </div>
          <div class="col">
            <Button
              type="button"
              class="p-button-danger w-100"
              label="Sil"
              @click="deleteForm"
            />
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Ürün (Ru)">
        <div class="row mt-3 mb-3">
          <div class="col">
            <span class="p-float-label">
              <InputText id="productname" v-model="model.urunadi_ru" class="w-100" />
              <label for="productname">Ürün Adı</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="code" v-model="model.urunkod" class="w-100" />
              <label for="code">Kod</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <Textarea v-model="model.aciklama_ru" rows="10" class="w-100" />
              <label>Açıklama</label>
            </span>
          </div>

          <div class="col">
            <span class="p-float-label mb-4">
              <Chips v-model="anahtarlar_ru" class="w-100" />
              <label>Anahtarlar</label>
            </span>
            <span class="p-float-label">
              <Textarea v-model="model.keywords_ru" rows="7" class="w-100" />
              <label>Başlık Etiketleri</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <Button
              type="button"
              class="p-button-success w-100"
              label="Kaydet"
              @click="process"
              :disabled="productSaveButtonDisabled"
            />
          </div>
          <div class="col">
            <Button
              type="button"
              class="p-button-danger w-100"
              label="Sil"
              @click="deleteForm"
            />
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Ölçüler" v-if="productId != 0">
        <div class="row">
          <div class="col">
            <span class="p-float-label">
              <AutoComplete
                v-model="selectedSize"
                inputId="size"
                :suggestions="filteredSize"
                @complete="searchSize($event)"
                field="ebat"
                @item-select="sizeSelected($event)"
              />
              <label for="size">Ölçüler</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText
                id="price"
                v-model="sizeModel.fiyat"
                @input="sizeModel.fiyat = formatPoint($event)"
              />
              <label for="price">Fiyat</label>
            </span>
          </div>
          <div class="col">
            <Button
              type="button"
              class="p-button-success"
              label="Ekle"
              @click="addSize"
            />
          </div>
        </div>
        <DataTable
          :value="sizeList"
          editMode="row"
          :editingRows.sync="edditingSize"
          @row-edit-save="sizeEdditing($event)"
        >
          <Column field="ebat" header="Ebat">
            <template #editor="slotProps">
              <InputText v-model="slotProps.data[slotProps.column.field]" autofocus />
            </template>
          </Column>
          <Column field="fiyat" header="Fiyat">
            <template #body="slotProps">
              {{ slotProps.data.fiyat | formatPriceUsd }}
            </template>
            <template #editor="slotProps">
              <InputText v-model="slotProps.data[slotProps.column.field]" autofocus />
            </template>
          </Column>
          <Column
            :rowEditor="true"
            :styles="{ width: '10%', 'min-width': '8rem' }"
            :bodyStyle="{ 'text-align': 'center' }"
          ></Column>
          <Column>
            <template #body="slotProps">
              <Button
                type="button"
                class="p-button-danger"
                label="Sil"
                @click="deleteSize(slotProps.data.Id)"
              />
            </template>
          </Column>
        </DataTable>
      </TabPanel>
      <TabPanel header="Filtreler" v-if="productId != 0">
        <div class="container">
          <h3 class="header">Renkler</h3>
          <div class="row">
            <div class="col">
              <div class="p-float-label">
                <Dropdown
                  v-model="selectedColor"
                  inputId="color"
                  :options="color"
                  optionLabel="renk_en"
                  class="w-100"
                  @change="colorChange($event)"
                />
                <label for="color">Renk</label>
              </div>
            </div>
            <div class="col">
              <Button
                type="button"
                class="p-button-success w-100"
                label="Ekle"
                @click="addColor"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <DataTable :value="colorList">
                <Column field="renk_en" header="Renk (En)"></Column>
                <Column field="renk_fr" header="Renk (Fr)"></Column>
                <Column field="renk_es" header="Renk (Es)"></Column>
                <Column field="renk_ru" header="Renk (Ru)"></Column>
                <Column>
                  <template #body="slotProps">
                    <Button
                      type="button"
                      class="p-button-danger w-100"
                      label="Sil"
                      @click="deleteColor(slotProps.data.ID)"
                    />
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>
        </div>
        <div class="container">
          <h3 class="header">Yüzeyler</h3>
          <div class="row">
            <div class="col">
              <div class="p-float-label">
                <Dropdown
                  v-model="selectedFinish"
                  inputId="finish"
                  :options="finish"
                  optionLabel="finish_en"
                  class="w-100"
                  @change="finishChange($event)"
                />
                <label for="finish">Yüzey</label>
              </div>
            </div>
            <div class="col">
              <Button
                type="button"
                class="p-button-success w-100"
                label="Ekle"
                @click="addFinish"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <DataTable :value="finishList">
                <Column field="finish_en" header="Yüzey (En)"></Column>
                <Column field="finish_fr" header="Yüzey (Fr)"></Column>
                <Column field="finish_es" header="Yüzey (Es)"></Column>
                <Column field="finish_ru" header="Yüzey (Ru)"></Column>
                <Column>
                  <template #body="slotProps">
                    <Button
                      type="button"
                      class="p-button-danger w-100"
                      label="Sil"
                      @click="deleteFinish(slotProps.data.Id)"
                    />
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>
        </div>
        <div class="container">
          <h3 class="header">Alanlar</h3>
          <div class="row">
            <div class="col">
              <div class="p-float-label">
                <Dropdown
                  v-model="selectedArea"
                  inputId="area"
                  :options="area"
                  optionLabel="Areas"
                  class="w-100"
                  @change="areaChange($event)"
                />
                <label for="area">Alan</label>
              </div>
            </div>
            <div class="col">
              <Button
                type="button"
                class="p-button-success w-100"
                label="Ekle"
                @click="addArea"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <DataTable :value="areaList">
                <Column field="Areas" header="Alan (En)"></Column>
                <Column field="Areas_fr" header="Alan (Fr)"></Column>
                <Column field="Areas_es" header="Alan (Es)"></Column>
                <Column field="Areas_ru" header="Alan (Ru)"></Column>
                <Column>
                  <template #body="slotProps">
                    <Button
                      type="button"
                      class="p-button-danger w-100"
                      label="Sil"
                      @click="deleteArea(slotProps.data.ID)"
                    />
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>
        </div>
        <div class="container">
          <h3 class="header">Türler</h3>
          <div class="row">
            <div class="col">
              <div class="p-float-label">
                <Dropdown
                  v-model="selectedType"
                  inputId="type"
                  :options="type"
                  optionLabel="TurEn"
                  class="w-100"
                  @change="typeChange($event)"
                />
                <label for="tur">Tür</label>
              </div>
            </div>
            <div class="col">
              <Button
                type="button"
                class="p-button-success w-100"
                label="Ekle"
                @click="addType"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <DataTable :value="typeList">
                <Column field="TurEn" header="Tür (En)"></Column>
                <Column field="TurFr" header="Tür (Fr)"></Column>
                <Column field="TurEs" header="Tür (Es)"></Column>
                <Column field="TurRu" header="Tür (Ru)"></Column>
                <Column>
                  <template #body="slotProps">
                    <Button
                      type="button"
                      class="p-button-danger w-100"
                      label="Sil"
                      @click="deleteType(slotProps.data.ID)"
                    />
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>
        </div>
        <div class="container">
          <h3 class="header">Stiller</h3>
          <div class="row">
            <div class="col">
              <div class="p-float-label">
                <Dropdown
                  v-model="selectedStyle"
                  inputId="style"
                  :options="styl"
                  optionLabel="StilEn"
                  class="w-100"
                  @change="styleChange($event)"
                />
                <label for="style">Stil</label>
              </div>
            </div>
            <div class="col">
              <Button
                type="button"
                class="p-button-success w-100"
                label="Ekle"
                @click="addStyle"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <DataTable :value="styleList">
                <Column field="StilEn" header="Stil (En)"></Column>
                <Column field="StilFr" header="Stil (Fr)"></Column>
                <Column field="StilEs" header="Stil (Es)"></Column>
                <Column field="StilRu" header="Stil (Ru)"></Column>
                <Column>
                  <template #body="slotProps">
                    <Button
                      type="button"
                      class="p-button-danger w-100"
                      label="Sil"
                      @click="deleteStyle(slotProps.data.ID)"
                    />
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>
        </div>
        <div class="container">
          <h3 class="header">Materyaller</h3>
          <div class="row">
            <div class="col">
              <div class="p-float-label">
                <Dropdown
                  v-model="selectedMaterial"
                  inputId="material"
                  :options="material"
                  optionLabel="MateryalEn"
                  class="w-100"
                  @change="materialChange($event)"
                />
                <label for="material">Materyal</label>
              </div>
            </div>
            <div class="col">
              <Button
                type="button"
                class="p-button-success w-100"
                label="Ekle"
                @click="addMaterial"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <DataTable :value="materialList">
                <Column field="MateryalEn" header="Materyal (En)"></Column>
                <Column field="MateryalFr" header="Materyal (Fr)"></Column>
                <Column field="MateryalEs" header="Materyal (Es)"></Column>
                <Column field="MateryalRu" header="Materyal (Ru)"></Column>
                <Column>
                  <template #body="slotProps">
                    <Button
                      type="button"
                      class="p-button-danger w-100"
                      label="Sil"
                      @click="deleteMaterial(slotProps.data.ID)"
                    />
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Fotoğraflar" v-if="productId != 0">
        <div class="row">
          <div class="col">
            <FileUpload
              name="demo[]"
              :multiple="true"
              :customUpload="true"
              accept="image/*"
              @uploader="panelProductPhotoUpload($event)"
            />
          </div>
          <div class="col">
            <Button
              type="button"
              class="p-button-warning w-100"
              label="Sıra Değiştir"
              :disabled="queueChangeButtonDisabled"
              @click="reOrderPhotoChangeButton"
            />
          </div>
        </div>
        <PickList
          v-model="photoList"
          listStyle="height:342px;width:450px;"
          @move-to-target="moveToTargetPhotoOne($event)"
          @move-all-to-target="moveToTargetPhotoAll($event)"
          @reorder="reOrderPhoto($event)"
        >
          <template #sourceheader> Available </template>
          <template #targetheader> Selected </template>
          <template #item="slotProps">
            <div class="row">
              <div class="col">
                <img :src="slotProps.item.macPath" width="100" height="100" lazyload />
              </div>
              <div class="col">
                <h5 class="mb-2">{{ slotProps.item.name }}</h5>
              </div>
              <div class="col">
                <h6 class="mb-2">{{ slotProps.item.sira }}</h6>
              </div>
            </div>
          </template>
        </PickList>
      </TabPanel>
      <TabPanel header="Önerilenler" v-if="productId != 0">
        <PickList
          v-model="suggestedList"
          listStyle="height:342px;width:450px;"
          @move-to-target="moveToTargetSuggested($event)"
          @move-to-source="moveToSourceSuggested($event)"
          @reorder="reOrderSuggested($event)"
        >
          <template #sourceheader> Available </template>
          <template #targetheader> Selected </template>
          <template #item="slotProps">
            <div class="row">
              <div class="col">
                <img :src="slotProps.item.Image" width="100" height="100" lazyload />
              </div>
              <div class="col">
                <h5 class="mb-2">{{ slotProps.item.urunadi_en }}</h5>
              </div>
              <div class="col">
                <h6 class="mb-2">{{ slotProps.item.sira }}</h6>
              </div>
            </div>
          </template>
        </PickList>
      </TabPanel>
      <TabPanel header="Test Raporu" v-if="productId != 0">
        <div class="row">
          <div class="col">
            <FileUpload
              name="demo[]"
              :multiple="true"
              :customUpload="true"
              accept=".pdf"
              @uploader="panelProductTestReportUpload($event)"
            />
          </div>
          <div class="col">
            <a :href="model.testrapor" ref="testreports" target="_blank" />
            <Button
              type="button"
              class="p-button-success"
              label="Indir"
              @click="$refs.testreports.click()"
              :disabled="model.testrapor == null || model.testrapor == ''"
            />
          </div>
        </div>
      </TabPanel>
    </TabView>
  </div>
</template>
<script>
import oceanservice from "../../plugins/digitalocean";
export default {
  props: {
    model: {
      type: Object,
      required: true,
    },

    category: {
      type: Array,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    productId: {
      type: Number,
      required: false,
    },
    size: {
      type: Array,
      required: true,
    },
    finish: {
      type: Array,
      required: true,
    },
    color: {
      type: Array,
      required: true,
    },
    area: {
      type: Array,
      required: true,
    },
    styl: {
      type: Array,
      required: true,
    },
    type: {
      type: Array,
      required: true,
    },
    material: {
      type: Array,
      required: true,
    },
    sizeList: {
      type: Array,
      required: true,
    },
    finishList: {
      type: Array,
      required: true,
    },
    colorList: {
      type: Array,
      required: true,
    },
    areaList: {
      type: Array,
      required: true,
    },
    typeList: {
      type: Array,
      required: true,
    },
    materialList: {
      type: Array,
      required: true,
    },
    styleList: {
      type: Array,
      required: true,
    },
    photoList: {
      type: Array,
      required: true,
    },
    suggestedList: {
      type: Array,
      required: true,
    },
    sizeModel: {
      type: Object,
      required: true,
    },
    colorModel: {
      type: Object,
      required: true,
    },
    finishModel: {
      type: Object,
      required: true,
    },
    areaModel: {
      type: Object,
      required: true,
    },
    typeModel: {
      type: Object,
      required: true,
    },
    styleModel: {
      type: Object,
      required: true,
    },
    materialModel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      anahtarlar_en: [],
      anahtarlar_fr: [],
      anahtarlar_es: [],
      anahtarlar_ru: [],

      selectedCategory: null,
      selectedStoneType: null,
      selectedSize: null,
      filteredSize: null,
      edditingSize: null,
      selectedColor: null,
      selectedFinish: null,
      selectedArea: null,
      selectedType: null,
      selectedStyle: null,
      selectedMaterial: null,
      productSaveButtonDisabled: false,
      reOrderPhotoList: [],
      queueChangeButtonDisabled: true,
    };
  },
  created() {
    if (!this.status) {
      this.createdProcess();
    }
  },
  methods: {
    panelProductTestReportUpload(event) {
      oceanservice.panelProductSendTestReport(event.files[0]).then((response) => {
        if (response) {
          this.model.testrapor =
            "https://cdn.mekmarimage.com/test-reports/" + event.files[0].name;
          const data = {
            urunid: this.model.urunid,
            testrapor: this.model.testrapor,
          };
          this.$store.dispatch("setPanelProductTestReport", data);
        } else {
          this.$toast.error("Test Raporu Yüklenemedi.");
        }
      });
    },
    reOrderSuggested(event) {
      let queue = 1;
      event.value[1].forEach((x) => {
        x.sira = queue;
        queue++;
      });

      let index1 = event.value[1].length;
      let index2 = 0;
      event.value[1].forEach((x) => {
        this.$store.dispatch("setPanelProductSuggestedQueueChange", x);
        index2 += 1;
      });
      if (index1 == index2) {
        this.$toast.success("Önerilen Ürün Sıra Değiştirme Başarılı.");
      }
    },
    moveToSourceSuggested(event) {
      this.$store.dispatch("setPanelProductSuggestedDelete", event.items[0].Id);
    },
    moveToTargetSuggested(event) {
      if (confirm("Eklemek istiyor musunuz?")) {
        if (this.suggestedList[1].length == 4) {
          alert("Zaten 4 adet eklenmiş.");
          return;
        } else {
          this.$store.dispatch("setPanelProductSuggestedAdd", {
            ...event.items[0],
            urunid: this.productId,
          });
        }
      }
    },
    panelProductPhotoUpload(event) {
      event.files.forEach((x) => {
        let photoModel = {
          Id: 0,
          urunid: 0,
          name: "",
          uzanti: "",
          imagePath: "",
          macPath: "",
          sira: 0,
        };
        photoModel.urunid = this.productId;
        photoModel.name = x.name;
        photoModel.uzanti = x.name.split(".")[1];
        photoModel.imagePath = "https://cdn.mekmarimage.com/products/" + x.name;
        photoModel.macPath = "https://cdn.mekmarimage.com/products/" + x.name;

        photoModel.sira = this.photoList[0].length += 1;

        oceanservice.panelProductSendPhoto(x).then((response) => {
          if (response) {
            this.$store.dispatch("setPanelProductPhotoAdd", photoModel);
          }
        });
      });
    },
    reOrderPhotoChangeButton(event) {
      this.$store.dispatch("setPanelProductPhotoQueueChange", this.reOrderPhotoList);
      this.queueChangeButtonDisabled = true;
    },
    reOrderPhoto(event) {
      let queue = 1;
      event.value[0].forEach((x) => {
        x.sira = queue;
        queue++;
      });
      this.queueChangeButtonDisabled = false;
      this.reOrderPhotoList = event.value[0];
    },
    moveToTargetPhotoAll(event) {
      event.items.forEach((x) => {
        oceanservice.panelProductPhotoDelete(x.name).then((response) => {
          if (response) {
          }
        });
      });
      this.$store.dispatch("setPanelProductPhotoAllDelete", this.productId);
    },
    moveToTargetPhotoOne(event) {
      if (event.items.length == 0) {
        return;
      } else {
        oceanservice.panelProductPhotoDelete(event.items[0].name).then((response) => {
          if (response) {
            this.$store.dispatch("setPanelProductPhotoOneDelete", event.items[0].Id);
          }
        });
      }
    },
    deleteMaterial(id) {
      this.$store.dispatch("setPanelProductMaterialDelete", id);
    },
    addMaterial() {
      this.materialModel.UrunId = this.productId;
      this.materialModel.KategoriId = this.model.kategori_id;
      this.$store.dispatch("setPanelProductMaterialAdd", this.materialModel);
    },
    materialChange(event) {
      this.materialModel.MateryalId = event.value.ID;
      this.materialModel.MateryalEn = event.value.MateryalEn;
      this.materialModel.MateryalFr = event.value.MateryalFr;
      this.materialModel.MateryalEs = event.value.MateryalEs;
      this.materialModel.MateryalRu = event.value.MateryalRu;
    },
    deleteStyle(id) {
      if (confirm("Silmek istiyor musunuz?")) {
        this.$store.dispatch("setPanelProductStyleDelete", id);
      }
    },
    addStyle() {
      this.styleModel.UrunId = this.productId;
      this.styleModel.KategoriId = this.model.kategori_id;
      this.$store.dispatch("setPanelProductStyleAdd", this.styleModel);
    },
    styleChange(event) {
      this.styleModel.StilId = event.value.ID;
      this.styleModel.StilEn = event.value.StilEn;
      this.styleModel.StilFr = event.value.StilFr;
      this.styleModel.StilEs = event.value.StilEs;
      this.styleModel.StilRu = event.value.StilRu;
    },
    deleteType(id) {
      if (confirm("Silmek istiyor musunuz?")) {
        this.$store.dispatch("setPanelProductTypeDelete", id);
      }
    },
    addType() {
      this.typeModel.UrunId = this.productId;
      this.typeModel.KategoriId = this.selectedCategory.Id;
      this.$store.dispatch("setPanelProductTypeAdd", this.typeModel);
    },
    typeChange(event) {
      this.typeModel.TurId = event.value.ID;
      this.typeModel.TurEn = event.value.TurEn;
      this.typeModel.TurFr = event.value.TurFr;
      this.typeModel.TurEs = event.value.TurEs;
      this.typeModel.TurRu = event.value.TurRu;
    },
    deleteArea(id) {
      if (confirm("Silmek istiyor musunuz?")) {
        this.$store.dispatch("setPanelProductAreaDelete", id);
      }
    },
    addArea() {
      this.areaModel.UrunId = this.productId;
      this.$store.dispatch("setPanelProductAreaAdd", this.areaModel);
      this.selectedArea = null;
    },
    areaChange(event) {
      this.areaModel.AreaId = event.value.ID;
      this.areaModel.Areas = event.value.Areas;
      this.areaModel.Areas_fr = event.value.Areas_fr;
      this.areaModel.Areas_es = event.value.Areas_es;
      this.areaModel.Areas_ru = event.value.Areas_ru;
    },
    deleteFinish(id) {
      if (confirm("Silmek istiyor musunuz?")) {
        this.$store.dispatch("setPanelProductFinishDelete", id);
      }
    },
    addFinish() {
      this.finishModel.urunid = this.productId;
      this.selectedFinish = null;
      this.$store.dispatch("setPanelProductFinishAdd", this.finishModel);
    },
    finishChange(event) {
      this.finishModel.finish_en = event.value.finish_en;
      this.finishModel.finish_fr = event.value.finish_fr;
      this.finishModel.finish_es = event.value.finish_es;
      this.finishModel.finish_ru = event.value.finish_ru;
    },
    deleteColor(event) {
      if (confirm("Silmek istiyor musunuz?")) {
        this.$store.dispatch("setPanelProductColorDelete", event);
      }
    },
    addColor() {
      this.colorModel.UrunId = this.productId;
      this.$store.dispatch("setPanelProductColorAdd", this.colorModel);
      this.selectedColor = null;
    },
    colorChange(event) {
      this.colorModel.RenkId = event.value.ID;
      this.colorModel.renk_en = event.value.renk_en;
      this.colorModel.renk_fr = event.value.renk_fr;
      this.colorModel.renk_es = event.value.renk_es;
      this.colorModel.renk_ru = event.value.renk_ru;
    },
    sizeEdditing(event) {
      this.$store.dispatch("setPanelProductSizeUpdate", event.newData);
    },
    deleteSize(id) {
      if (confirm("Silmek istiyor musunuz?")) {
        this.$store.dispatch("setPanelProductSizeDelete", id);
      }
    },
    addSize() {
      this.sizeModel.urunid = this.productId;
      this.$store.dispatch("setPanelProductSizeAdd", this.sizeModel);
      this.selectedSize = null;
    },
    sizeSelected(event) {
      this.sizeModel.ebat = event.value.ebat;
    },
    formatPoint(value) {
      if (value == null || value == " ") {
        return 0;
      } else {
        return value.replace(",", ".");
      }
    },
    searchSize(event) {
      let results;
      if (event.query.length == 0) {
        results = this.size;
      } else {
        results = this.size.filter((x) => {
          return x.ebat.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredSize = results;
    },
    createdProcess() {
      this.selectedCategory = this.category.find((x) => x.Id == this.model.kategori_id);
      this.selectedStoneType = this.category.find((x) => x.Id == this.model.stonetype);
      if (this.model.anahtarlar_en) {
        this.model.anahtarlar_en.split(",").forEach((x) => {
          this.anahtarlar_en.push(x);
        });
      }
      if (this.model.anahtarlar_fr) {
        this.model.anahtarlar_fr.split(",").forEach((x) => {
          this.anahtarlar_fr.push(x);
        });
      }
      if (this.model.anahtarlar_es) {
        this.model.anahtarlar_es.split(",").forEach((x) => {
          this.anahtarlar_es.push(x);
        });
      }
      if (this.model.anahtarlar_ru) {
        this.model.anahtarlar_ru.split(",").forEach((x) => {
          this.anahtarlar_ru.push(x);
        });
      }
    },
    deleteForm() {
      this.$emit("delete_emit", this.model.urunid);
    },
    process() {
      if (this.anahtarlar_en) {
        this.model.anahtarlar_en = this.anahtarlar_en.join(",");
      } else {
        this.model.anahtarlar_en = "";
      }
      if (this.anahtarlar_fr) {
        this.model.anahtarlar_fr = this.anahtarlar_fr.join(",");
      } else {
        this.model.anahtarlar_fr = "";
      }
      if (this.anahtarlar_es) {
        this.model.anahtarlar_es = this.anahtarlar_es.join(",");
      } else {
        this.model.anahtarlar_es = "";
      }
      if (this.anahtarlar_ru) {
        this.model.anahtarlar_ru = this.anahtarlar_ru.join(",");
      } else {
        this.model.anahtarlar_ru = "";
      }

      if (this.status) {
        this.productSaveButtonDisabled = true;
      }
      this.$emit("process_emit", this.model);
    },
    stoneTypeSelected(event) {
      this.model.stonetype = event.value.Id;
    },
    categorySelected(event) {
      this.model.kategori_id = event.value.Id;
    },
  },
};
</script>
<style scoped>
.header {
  font-size: 18px;
  font-weight: bold;
  font-family: "Courier New", Courier, monospace;
  text-align: center;
}
</style>
