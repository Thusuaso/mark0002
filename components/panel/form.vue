<template>
  <div>
    <TabView>
      <TabPanel header="Product (En)">
        <div class="row mt-3 mb-3">
          <div class="col">
            <span class="p-float-label">
              <InputText id="productname" v-model="model.urunadi_en" class="w-100" />
              <label for="productname">Product Name</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="code" v-model="model.urunkod" class="w-100" />
              <label for="code">Code</label>
            </span>
          </div>
          <div class="col">
            <div class="flex flex-wrap justify-content-center gap-3">
              <div class="flex align-items-center">
                <Checkbox v-model="model.yayinla" inputId="published" binary />
                <label for="published" class="ml-2"> Publish </label>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-3 m-auto">
          <div class="col-6">
            <span class="p-float-label">
              <Textarea v-model="model.aciklama_en" rows="10" class="w-100" />

              <label>Description</label>
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
              <InputText type="text" v-model="model.anahtarlar_en" class="w-100" />
              <label>Keywords</label>
            </span>
            <span class="p-float-label">
              <Textarea
                v-model="model.keywords_en"
                rows="7"
                class="w-100"
                @input="changeKeywordsEn($event)"
              />
              <label>Hashtags</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <InputText id="unit" v-model="model.birim" class="w-100" />
              <label for="unit">Unit</label>
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
              <label for="category">Category</label>
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
              <label for="stonetype">Kind of Stone</label>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <Button
              type="button"
              class="p-button-success w-100"
              label="Save"
              @click="process"
              :disabled="productSaveButtonDisabled"
            />
          </div>
          <div class="col" v-if="!status">
            <Button
              type="button"
              class="p-button-danger w-100"
              label="Delete"
              @click="deleteForm"
            />
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Product (Fr)">
        <div class="row mt-3 mb-3">
          <div class="col">
            <span class="p-float-label">
              <InputText id="productname" v-model="model.urunadi_fr" class="w-100" />
              <label for="productname">Product Name</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="code" v-model="model.urunkod" class="w-100" />
              <label for="code">Code</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <Textarea v-model="model.aciklama_fr" rows="10" class="w-100" />
              <label>Description</label>
            </span>
          </div>

          <div class="col">
            <span class="p-float-label mb-4">
              <InputText type="text" v-model="model.anahtarlar_fr" class="w-100" />
              <label>Keywords</label>
            </span>
            <span class="p-float-label">
              <Textarea
                v-model="model.keywords_fr"
                rows="7"
                class="w-100"
                @input="changeKeywordsFr($event)"
              />
              <label>Hashtags</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <Button
              type="button"
              class="p-button-success w-100"
              label="Save"
              @click="process"
              :disabled="productSaveButtonDisabled"
            />
          </div>
          <div class="col">
            <Button
              type="button"
              class="p-button-danger w-100"
              label="Delete"
              @click="deleteForm"
            />
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Product (Es)">
        <div class="row mt-3 mb-3">
          <div class="col">
            <span class="p-float-label">
              <InputText id="productname" v-model="model.urunadi_es" class="w-100" />
              <label for="productname">Product Name</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="code" v-model="model.urunkod" class="w-100" />
              <label for="code">Code</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <Textarea v-model="model.aciklama_es" rows="10" class="w-100" />
              <label>Description</label>
            </span>
          </div>

          <div class="col">
            <span class="p-float-label mb-4">
              <InputText type="text" v-model="model.anahtarlar_es" class="w-100" />
              <label>Keywords</label>
            </span>
            <span class="p-float-label">
              <Textarea
                v-model="model.keywords_es"
                rows="7"
                class="w-100"
                @input="changeKeywordsEs($event)"
              />
              <label>Hastags</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <Button
              type="button"
              class="p-button-success w-100"
              label="Save"
              @click="process"
              :disabled="productSaveButtonDisabled"
            />
          </div>
          <div class="col">
            <Button
              type="button"
              class="p-button-danger w-100"
              label="Delete"
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
              <label for="productname">Product Name</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="code" v-model="model.urunkod" class="w-100" />
              <label for="code">Code</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <Textarea v-model="model.aciklama_ru" rows="10" class="w-100" />
              <label>Description</label>
            </span>
          </div>

          <div class="col">
            <span class="p-float-label mb-4">
              <InputText type="text" v-model="model.anahtarlar_ru" class="w-100" />
              <label>Keywords</label>
            </span>
            <span class="p-float-label">
              <Textarea
                v-model="model.keywords_ru"
                rows="7"
                class="w-100"
                @input="changeKeywordsRu($event)"
              />
              <label>Hashtags</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <Button
              type="button"
              class="p-button-success w-100"
              label="Save"
              @click="process"
              :disabled="productSaveButtonDisabled"
            />
          </div>
          <div class="col">
            <Button
              type="button"
              class="p-button-danger w-100"
              label="Delete"
              @click="deleteForm"
            />
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Ürün (Ar)">
        <div class="row mt-3 mb-3">
          <div class="col">
            <span class="p-float-label">
              <InputText id="productname" v-model="model.urunadi_ar" class="w-100" />
              <label for="productname">Product Name</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="code" v-model="model.urunkod" class="w-100" />
              <label for="code">Code</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <Textarea v-model="model.aciklama_ar" rows="10" class="w-100" />
              <label>Description</label>
            </span>
          </div>

          <div class="col">
            <span class="p-float-label mb-4">
              <InputText type="text" v-model="model.anahtarlar_ar" class="w-100" />
              <label>Keywords</label>
            </span>
            <span class="p-float-label">
              <Textarea
                v-model="model.keywords_ar"
                rows="7"
                class="w-100"
                @input="changeKeywordsAr($event)"
              />
              <label>Hashtags</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <Button
              type="button"
              class="p-button-success w-100"
              label="Save"
              @click="process"
              :disabled="productSaveButtonDisabled"
            />
          </div>
          <div class="col">
            <Button
              type="button"
              class="p-button-danger w-100"
              label="Delete"
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
              <label for="size">Sizes</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText
                id="price"
                v-model="sizeModel.fiyat"
                @input="sizeModel.fiyat = formatPoint($event)"
              />
              <label for="price">Price</label>
            </span>
          </div>
          <div class="col">
            <Button type="button" class="p-button-success" label="Add" @click="addSize" />
          </div>
          <div class="col">
            <Button
              type="button"
              class="p-button-primary"
              label="Change Queue"
              @click="changeSizeQueue"
            />
          </div>
        </div>
        <DataTable
          :value="sizeList"
          editMode="row"
          :editingRows.sync="edditingSize"
          @row-edit-save="sizeEdditing($event)"
          :reorderableColumns="true"
          @row-reorder="onRowReorder"
        >
          <Column
            :rowReorder="true"
            :headerStyle="{ width: '3rem' }"
            :reorderableColumn="false"
          />

          <Column field="sira" header="#" />

          <Column field="ebat" header="Size">
            <template #editor="slotProps">
              <InputText v-model="slotProps.data[slotProps.column.field]" autofocus />
            </template>
          </Column>
          <Column field="fiyat" header="Price">
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
                label="Delete"
                @click="deleteSize(slotProps.data.Id)"
              />
            </template>
          </Column>
        </DataTable>
      </TabPanel>
      <TabPanel header="Filters" v-if="productId != 0">
        <div class="container">
          <h3 class="header">Colors</h3>
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
                <label for="color">Color</label>
              </div>
            </div>
            <div class="col">
              <Button
                type="button"
                class="p-button-success w-100"
                label="Add"
                @click="addColor"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <DataTable :value="colorList">
                <Column field="renk_en" header="Color (En)"></Column>
                <Column field="renk_fr" header="Color (Fr)"></Column>
                <Column field="renk_es" header="Color (Es)"></Column>
                <Column field="renk_ru" header="Color (Ru)"></Column>
                <Column>
                  <template #body="slotProps">
                    <Button
                      type="button"
                      class="p-button-danger w-100"
                      label="Delete"
                      @click="deleteColor(slotProps.data.ID)"
                    />
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>
        </div>
        <div
          class="container"
          v-if="
            selectedCategory.Id == 2 ||
            selectedCategory.Id == 1 ||
            selectedCategory.Id == 3 ||
            selectedCategory.Id == 4 ||
            selectedCategory.Id == 8
          "
        >
          <h3 class="header">Surfaces</h3>
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
                <label for="finish">Surface</label>
              </div>
            </div>
            <div class="col">
              <Button
                type="button"
                class="p-button-success w-100"
                label="Add"
                @click="addFinish"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <DataTable :value="finishList">
                <Column field="finish_en" header="Surface (En)"></Column>
                <Column field="finish_fr" header="Surface (Fr)"></Column>
                <Column field="finish_es" header="Surface (Es)"></Column>
                <Column field="finish_ru" header="Surface (Ru)"></Column>
                <Column>
                  <template #body="slotProps">
                    <Button
                      type="button"
                      class="p-button-danger w-100"
                      label="Delete"
                      @click="deleteFinish(slotProps.data.Id)"
                    />
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>
        </div>
        <div class="container">
          <h3 class="header">Areas</h3>
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
                <label for="area">Area</label>
              </div>
            </div>
            <div class="col">
              <Button
                type="button"
                class="p-button-success w-100"
                label="Add"
                @click="addArea"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <DataTable :value="areaList">
                <Column field="Areas" header="Area (En)"></Column>
                <Column field="Areas_fr" header="Area (Fr)"></Column>
                <Column field="Areas_es" header="Area (Es)"></Column>
                <Column field="Areas_ru" header="Area (Ru)"></Column>
                <Column>
                  <template #body="slotProps">
                    <Button
                      type="button"
                      class="p-button-danger w-100"
                      label="Delete"
                      @click="deleteArea(slotProps.data.ID)"
                    />
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>
        </div>
        <div
          class="container"
          v-if="
            selectedCategory.Id == 5 ||
            selectedCategory.Id == 6 ||
            selectedCategory.Id == 9 ||
            selectedCategory.Id == 11 ||
            selectedCategory.Id == 18
          "
        >
          <h3 class="header">Types</h3>
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
                <label for="tur">Type</label>
              </div>
            </div>
            <div class="col">
              <Button
                type="button"
                class="p-button-success w-100"
                label="Add"
                @click="addType"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <DataTable :value="typeList">
                <Column field="TurEn" header="Type (En)"></Column>
                <Column field="TurFr" header="Type (Fr)"></Column>
                <Column field="TurEs" header="Type (Es)"></Column>
                <Column field="TurRu" header="Type (Ru)"></Column>
                <Column>
                  <template #body="slotProps">
                    <Button
                      type="button"
                      class="p-button-danger w-100"
                      label="Delete"
                      @click="deleteType(slotProps.data.ID)"
                    />
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>
        </div>
        <div class="container" v-if="selectedCategory.Id == 2">
          <h3 class="header">Styles</h3>
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
                <label for="style">Style</label>
              </div>
            </div>
            <div class="col">
              <Button
                type="button"
                class="p-button-success w-100"
                label="Add"
                @click="addStyle"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <DataTable :value="styleList">
                <Column field="StilEn" header="Style (En)"></Column>
                <Column field="StilFr" header="Style (Fr)"></Column>
                <Column field="StilEs" header="Style (Es)"></Column>
                <Column field="StilRu" header="Style (Ru)"></Column>
                <Column>
                  <template #body="slotProps">
                    <Button
                      type="button"
                      class="p-button-danger w-100"
                      label="Delete"
                      @click="deleteStyle(slotProps.data.ID)"
                    />
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>
        </div>
        <div
          class="container"
          v-if="selectedCategory.Id == 4 || selectedCategory.Id == 7"
        >
          <h3 class="header">Materials</h3>
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
                <label for="material">Material</label>
              </div>
            </div>
            <div class="col">
              <Button
                type="button"
                class="p-button-success w-100"
                label="Add"
                @click="addMaterial"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <DataTable :value="materialList">
                <Column field="MateryalEn" header="Material (En)"></Column>
                <Column field="MateryalFr" header="Material (Fr)"></Column>
                <Column field="MateryalEs" header="Material (Es)"></Column>
                <Column field="MateryalRu" header="Material (Ru)"></Column>
                <Column>
                  <template #body="slotProps">
                    <Button
                      type="button"
                      class="p-button-danger w-100"
                      label="Delete"
                      @click="deleteMaterial(slotProps.data.ID)"
                    />
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>
        </div>
        <div class="container" v-if="selectedCategory.Id == 2">
          <h3 class="header">Edge</h3>
          <div class="row">
            <div class="col">
              <div class="p-float-label">
                <Dropdown
                  v-model="selectedEdge"
                  inputId="edge"
                  :options="edge"
                  optionLabel="KenarEn"
                  class="w-100"
                  @change="edgeChange($event)"
                />
                <label for="edge">Edge</label>
              </div>
            </div>
            <div class="col">
              <Button
                type="button"
                class="p-button-success w-100"
                label="Add"
                @click="addEdge"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <DataTable :value="edgeList">
                <Column field="KenarEn" header="Kenar (En)"></Column>
                <Column field="KenarFr" header="Kenar (Fr)"></Column>
                <Column field="KenarEs" header="Kenar (Es)"></Column>
                <Column field="KenarRu" header="Kenar (Ru)"></Column>
                <Column>
                  <template #body="slotProps">
                    <Button
                      type="button"
                      class="p-button-danger w-100"
                      label="Delete"
                      @click="deleteEdge(slotProps.data.ID)"
                    />
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Photos" v-if="productId != 0">
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
              label="Change Queue"
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
      <TabPanel header="Suggested" v-if="productId != 0">
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
      <TabPanel header="Test Report" v-if="productId != 0">
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
              label="Download"
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
    edge: {
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
    edgeList: {
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
    edgeModel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
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
      selectedEdge: null,

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
    __noneNullControl(value) {
      if (value == null || value == " " || value == undefined || value == "null") {
        return "";
      } else {
        return value;
      }
    },
    changeKeywordsEn(event) {
      const data = event.replaceAll(/\s/g, "");
      this.model.keywords_en = data;
    },
    changeKeywordsFr(event) {
      const data = event.replaceAll(/\s/g, "");
      this.model.keywords_fr = data;
    },
    changeKeywordsEs(event) {
      const data = event.replaceAll(/\s/g, "");
      this.model.keywords_es = data;
    },
    changeKeywordsRu(event) {
      const data = event.replaceAll(/\s/g, "");
      this.model.keywords_ru = data;
    },
    changeKeywordsAr(event) {
      const data = event.replaceAll(/\s/g, "");
      this.model.keywords_ar = data;
    },
    changeSizeQueue() {
      this.$store.dispatch("setpanelProductsSizeChangeQueue", this.sizeList);
    },
    onRowReorder(event) {
      let data = event.value;
      let index = 1;
      data.forEach((x) => {
        x.sira = index;
        index++;
      });
      const values = {
        first: "",
        end: "",
      };
      this.$store.dispatch("setPanelProductsSizeListUpdate", data);
    },

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
        if (this.suggestedList[1].length > 4) {
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

    deleteEdge(id) {
      this.$store.dispatch("setPanelProductEdgeDelete", id);
    },
    addEdge() {
      this.edgeModel.UrunId = this.productId;
      this.edgeModel.KategoriId = this.model.kategori_id;
      this.$store.dispatch("setPanelProductEdgeAdd", this.edgeModel);
    },
    edgeChange(event) {
      this.edgeModel.KenarId = event.value.ID;
      this.edgeModel.KenarEn = event.value.KenarEn;
      this.edgeModel.KenarFr = event.value.KenarFr;
      this.edgeModel.KenarEs = event.value.KenarEs;
      this.edgeModel.KenarRu = event.value.KenarRu;
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
      this.model.urunadi_en = this.__noneNullControl(this.model.urunadi_en);
      this.model.aciklama_en = this.__noneNullControl(this.model.aciklama_en);
      this.model.anahtarlar_en = this.__noneNullControl(this.model.anahtarlar_en);
      this.model.keywords_en = this.__noneNullControl(this.model.keywords_en);

      this.model.birim = this.__noneNullControl(this.model.birim);
      this.model.urunadi_fr = this.__noneNullControl(this.model.urunadi_fr);
      this.model.aciklama_fr = this.__noneNullControl(this.model.aciklama_fr);
      this.model.anahtarlar_fr = this.__noneNullControl(this.model.anahtarlar_fr);
      this.model.keywords_fr = this.__noneNullControl(this.model.keywords_fr);

      this.model.urunadi_es = this.__noneNullControl(this.model.urunadi_es);
      this.model.aciklama_es = this.__noneNullControl(this.model.aciklama_es);
      this.model.anahtarlar_es = this.__noneNullControl(this.model.anahtarlar_es);
      this.model.keywords_es = this.__noneNullControl(this.model.keywords_es);

      this.model.urunadi_ru = this.__noneNullControl(this.model.urunadi_ru);
      this.model.aciklama_ru = this.__noneNullControl(this.model.aciklama_ru);
      this.model.anahtarlar_ru = this.__noneNullControl(this.model.anahtarlar_ru);
      this.model.keywords_ru = this.__noneNullControl(this.model.keywords_ru);

      this.model.urunadi_ar = this.__noneNullControl(this.model.urunadi_ar);
      this.model.aciklama_ar = this.__noneNullControl(this.model.aciklama_ar);
      this.model.anahtarlar_ar = this.__noneNullControl(this.model.anahtarlar_ar);
      this.model.keywords_ar = this.__noneNullControl(this.model.keywords_ar);
    },
    deleteForm() {
      this.$emit("delete_emit", this.model.urunid);
    },
    process() {
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
  text-align: center;
}
</style>
