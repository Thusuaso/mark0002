<template>
  <div class="container">
    <div class="row mb-3">
      <div class="col">
        <Button
          type="button"
          severity="success" class="w-100"
          label="Add New Project"
          @click="newProject"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          severity="warn" class="w-100"
          label="Change Queue"
          @click="changeQueue"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          severity="secondary" class="w-100"
          label="Add Faq Video"
          @click="faqOpenDialog"
        />
      </div>
    </div>

    <PanelProjectList
      :list="panelStore.getPanelProjectList"
      @panel_project_selected_emit="panelProjectSelected($event)"
    />
    <Dialog
      v-model:visible="panel_project_detail_form"
      :header="panelStore.getPanelProjectId"
      modal
    >
      <PanelProjectForm
        :photos="panelStore.getPanelProjectPhotos"
        :suggested="panelStore.getPanelProjectSuggested"
        :information="panelStore.getPanelProjectInformation"
        :video="panelStore.getPanelProjectVideo"
        :status="panelStore.getPanelProjectButtonStatus"
        :projectId="panelStore.getPanelProjectId"
        @move_to_target_project_photo_emit="moveToTargetProjectPhoto($event)"
        @panel_project_information_save_emit="
          panelProjectInformationSave($event)
        "
        @panel_project_information_update_emit="
          panelProjectInformationUpdate($event)
        "
        @panel_project_photos_upload="panelProjectPhotosUpload($event)"
        @panel_project_photo_change_product_name="
          panelProjectPhotoChangeProductName
        "
        @panel_project_suggested="panelProjectSuggested"
        @panel_project_video_emit="panelProjectVideoAdd($event)"
      />
    </Dialog>
    <Dialog
      v-model:visible="panel_project_photo_change_product_name_form"
      header=""
      modal
    >
      <div class="container">
        <DataTable
          :value="panelStore.getPanelProjectPhotos[0]"
          editMode="row"
          v-model:editingRows="edditingProjectPhotoName"
          @row-edit-save="projectPhotoNameEditing($event)"
        >
          <Column field="ImageLink" header="Image">
            <template #body="slotProps">
              <img
                :src="slotProps.data.ImageLink"
                style="width: 100px; height: 100px"
              />
            </template>
          </Column>
          <Column field="ID" header="Id">
            <template #body="slotProps">
              {{ slotProps.data.ID }}
            </template>
          </Column>
          <Column field="ProductName" header="Project Name (En)">
            <template #body="slotProps">
              {{ slotProps.data.ProductName }}
            </template>
            <template #editor="slotProps">
              <InputText
                v-model="slotProps.data[slotProps.column.field]"
                autofocus
              />
            </template>
          </Column>
          <Column field="ProductName_Fr" header="Project Name (Fr)">
            <template #body="slotProps">
              {{ slotProps.data.ProductName_Fr }}
            </template>
            <template #editor="slotProps">
              <InputText
                v-model="slotProps.data[slotProps.column.field]"
                autofocus
              />
            </template>
          </Column>
          <Column field="ProductName_Es" header="Project Name (Es)">
            <template #body="slotProps">
              {{ slotProps.data.ProductName_Es }}
            </template>
            <template #editor="slotProps">
              <InputText
                v-model="slotProps.data[slotProps.column.field]"
                autofocus
              />
            </template>
          </Column>
          <Column field="ProductName_Ru" header="Project Name (Ru)">
            <template #body="slotProps">
              {{ slotProps.data.ProductName_Ru }}
            </template>
            <template #editor="slotProps">
              <InputText
                v-model="slotProps.data[slotProps.column.field]"
                autofocus
              />
            </template>
          </Column>
          <Column field="ProductName_Ar" header="Project Name (Ar)">
            <template #body="slotProps">
              {{ slotProps.data.ProductName_Ar }}
            </template>
            <template #editor="slotProps">
              <InputText
                v-model="slotProps.data[slotProps.column.field]"
                autofocus
              />
            </template>
          </Column>
          <Column
            :rowEditor="true"
            :styles="{ width: '10%', 'min-width': '8rem' }"
            :bodyStyle="{ 'text-align': 'center' }"
          ></Column>
        </DataTable>
      </div>
    </Dialog>
    <Dialog v-model:visible="panel_project_suggested_form" header="" modal>
      <PickList
        v-model="panelStore.getPanelProjectSuggested"
        listStyle="height:342px"
        breakpoint="1400px"
        @move-to-target="moveToTargetSuggested($event)"
        @move-to-source="moveToSourceSuggested($event)"
      >
        <template #sourceheader> Available </template>
        <template #targetheader> Selected </template>
        <template #item="slotProps">
          <div class="flex flex-wrap p-2 align-items-center gap-3">
            <img
              class="w-4rem shadow-2 flex-shrink-0 border-round"
              :src="slotProps.item.Image"
              :alt="slotProps.item.ID"
            />
            <div class="flex-1 flex flex-column gap-2">
              <span>{{ slotProps.item.ProjectName }}</span>
              <div class="flex align-items-center gap-2">
                <i class="pi pi-tag text-sm"></i>
                <span>{{ slotProps.item.ID }}</span>
              </div>
            </div>
          </div>
        </template>
      </PickList>
    </Dialog>
    <Dialog v-model:visible="panel_project_new_form" header="" modal>
      <div class="row mt-3 mb-3">
        <div class="col">
          <FloatLabel>
            <InputText
              id="project_name_en"
              v-model="modelsStore.getPanelProductProjectModel.ProjectName"
            />
            <label for="project_name_en">Project Name (En)</label>
          </FloatLabel>
        </div>
        <div class="col">
          <FloatLabel>
            <InputText
              id="project_name_fr"
              v-model="modelsStore.getPanelProductProjectModel.ProjectName_Fr"
            />
            <label for="project_name_fr">Project Name (Fr)</label>
          </FloatLabel>
        </div>
        <div class="col">
          <FloatLabel>
            <InputText
              id="project_name_es"
              v-model="modelsStore.getPanelProductProjectModel.ProjectName_Es"
            />
            <label for="project_name_es">Project Name (Es)</label>
          </FloatLabel>
        </div>
        <div class="col">
          <FloatLabel>
            <InputText
              id="project_name_ru"
              v-model="modelsStore.getPanelProductProjectModel.ProjectName_Ru"
            />
            <label for="project_name_ru">Project Name (Ru)</label>
          </FloatLabel>
        </div>
        <div class="col">
          <FloatLabel>
            <InputText
              id="project_name_ru"
              v-model="modelsStore.getPanelProductProjectModel.ProjectName_Ar"
            />
            <label for="project_name_ru">Project Name (Ar)</label>
          </FloatLabel>
        </div>
        <div class="col">
          <FloatLabel>
            <AutoComplete
              v-model="selectedCountry"
              inputId="country"
              :suggestions="filteredCountry"
              @complete="searchCountry($event)"
              optionLabel="UlkeAdi"
              @item-select="countrySelected($event)"
            />
            <label for="country">Country</label>
          </FloatLabel>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <Button
            type="button"
            severity="success" class="w-100"
            label="Save"
            @click="saveProject"
            :disabled="project_save_button_disabled"
          />
        </div>
        <div class="col">
          <FileUpload
            name="demo[]"
            :customUpload="true"
            @uploader="projectPhotoUpload($event)"
            chooseLabel="Add Photo"
            mode="basic"
            class="w-100"
            :disabled="!project_save_button_disabled"
          />
        </div>
      </div>
    </Dialog>

    <Dialog
      v-model:visible="faq_video_dialog_visible"
      header="Add Faq Video"
      modal
    >
      <div class="row gap-1 mt-2">
        <div class="col-3">
          <FloatLabel>
            <InputText id="url" v-model="faqVideoModel.url" />
            <label for="url">Url</label>
          </FloatLabel>
        </div>
        <div class="col-3">
          <FloatLabel>
            <InputText id="title_en" v-model="faqVideoModel.title_en" />
            <label for="title_en">Title (En)</label>
          </FloatLabel>
        </div>
        <div class="col-3">
          <FloatLabel>
            <InputText id="title_fr" v-model="faqVideoModel.title_fr" />
            <label for="title_fr">Title Fr</label>
          </FloatLabel>
        </div>
        <div class="col-3">
          <FloatLabel>
            <InputText id="title_es" v-model="faqVideoModel.title_es" />
            <label for="title_es">Title Es</label>
          </FloatLabel>
        </div>
        <div class="col-3">
          <FloatLabel>
            <InputText id="title_ru" v-model="faqVideoModel.title_ru" />
            <label for="title_ru">Title Ru</label>
          </FloatLabel>
        </div>
        <div class="col-3">
          <FloatLabel>
            <InputText id="title_ar" v-model="faqVideoModel.title_ar" />
            <label for="title_ar">Title Ar</label>
          </FloatLabel>
        </div>
      </div>

      <div class="row gap-1">
        <div class="col">
          <Button
            type="Button"
            severity="success" class="w-100"
            label="Add"
            @click="addFaqVideo"
            :loading="faq_video_button_loading"
          />
        </div>
      </div>
      <div class="row">
        <DataTable :value="faqVideoList">
          <Column field="Url" header="Url"></Column>
          <Column field="Title_En" header="Title En"></Column>
          <Column field="Title_Fr" header="Title Fr"></Column>
          <Column field="Title_Es" header="Title Es"></Column>
          <Column field="Title_Ru" header="Title Ru"></Column>
          <Column field="Title_Ar" header="Title Ar"></Column>
          <Column header="#">
            <template #body="slotProps">
              <Button
                severity="danger"
                label="Del"
                @click="deleteFaqVideo(slotProps.data.ID)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </Dialog>
  </div>
</template>
<script>
import { useSharedStore } from "~/stores/shared"
import { useModelsStore } from "~/stores/models"
import { usePanelStore } from "~/stores/panel"
export default {
  middleware: ["authority"],
  computed: {
    modelsStore() {
      return useModelsStore()
    },
    panelStore() {
      return usePanelStore()
    },
    sharedStore() {
      return useSharedStore()
    },
  },
  data() {
    return {
      faqVideoList: [],
      faq_video_button_loading: false,
      faqVideoModel: {
        url: "",
        title_en: "",
        title_fr: "",
        title_es: "",
        title_ru: "",
        title_ar: "",
      },
      faq_video_dialog_visible: false,
      panel_project_detail_form: false,
      panel_project_photo_change_product_name_form: false,
      edditingProjectPhotoName: null,
      panel_project_suggested_form: false,
      panel_project_new_form: false,
      selectedCountry: null,
      filteredCountry: null,
      project_save_button_disabled: false,
    };
  },
  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async
   * is BEKLENMEZ ve liste BOS serialize edilir; hydration onu devralir,
   * created() bir daha calismadigi icin tablo bos kalir (bkz. commit
   * 2afc877e3). mounted() sunucuda hic calismaz.
   */
  mounted() {
    this.panelStore.setPanelProjectList();
  },
  methods: {
    async deleteFaqVideo(event) {
      await useLegacyApi()
        .delete(`/mekmar/panel/faq/video/delete/${event}`)
        .then(async (res) => {
          if (res.data.status) {
            await useAppToast().success("Başarıyla Silindi");
            await useLegacyApi().get("/mekmar/panel/faq/video/list").then((res) => {
              this.faqVideoList = res.data;
            });
          } else {
            useAppToast().error("Silme İşlemi Başarısız");
          }
        });
    },
    async faqOpenDialog() {
      await useLegacyApi().get("/mekmar/panel/faq/video/list").then((res) => {
        this.faqVideoList = res.data;
      });
      this.faq_video_dialog_visible = true;
    },
    async addFaqVideo() {
      this.faq_video_button_loading = true;
      await useLegacyApi()
        .post("/mekmar/panel/faq/video/add", this.faqVideoModel)
        .then((res) => {
          if (res.data.status) {
            useAppToast().success("Başarıyla Eklendi.");
            this.faqVideoModel = {
              url: "",
              title_en: "",
              title_fr: "",
              title_es: "",
              title_ru: "",
              title_ar: "",
            };
            this.faq_video_dialog_visible = false;
            this.faq_video_button_loading = false;
          } else {
            useAppToast().error("Hata Oluştu");
            this.faq_video_button_loading = false;
          }
        });
    },
    changeQueue() {
      this.panelStore.setPanelProjectQueueChange(this.panelStore.getPanelProjectList);
    },
    projectChangeNameMouseOver() {},
    saveProject() {
      this.project_save_button_disabled = true;
      this.panelStore.setPanelProjectSave(this.modelsStore.getPanelProductProjectModel);
    },
    countrySelected(event) {
      this.modelsStore.getPanelProductProjectModel.CountryId = event.value.Id;
      this.modelsStore.getPanelProductProjectModel.CountryName = event.value.UlkeAdi;
      this.modelsStore.getPanelProductProjectModel.CountryName_Fr = event.value.UlkeAdi_Fr;
      this.modelsStore.getPanelProductProjectModel.CountryName_Es = event.value.UlkeAdi_Es;
      this.modelsStore.getPanelProductProjectModel.CountryName_Ru = event.value.UlkeAdi_Ru;
      this.modelsStore.getPanelProductProjectModel.CountryName_Ar = event.value.UlkeAdi_Ar;
    },
    projectPhotoUpload(event) {
      const data = {
        ID: this.panelStore.getPanelProjectId,
        Image:
          "https://mekmar-image.fra1.cdn.digitaloceanspaces.com/galleria-project_photos/" +
          event.files[0].name,
      };
      useSpacesService().panelProjectSendPhoto(event.files[0]).then((response) => {
        if (response) {
          this.panelStore.setPanelProjectImageAdd(data);
          this.panel_project_new_form = false;
        } else {
          useAppToast().error("Fotoğraf Ekleme Başarısız");
        }
      });
    },
    searchCountry(event) {
      let results;
      if (event.query.length === 0) {
        results = this.sharedStore.getCountryList;
      } else {
        results = this.sharedStore.getCountryList.filter((x) => {
          return x.UlkeAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredCountry = results;
    },
    newProject() {
      this.modelsStore.setPanelProjectModel();
      this.panel_project_new_form = true;
    },
    panelProjectVideoAdd(event) {
      const data = {
        ProjectId: this.panelStore.getPanelProjectId,
        VideosLink: event,
        VideosStatus: 1,
        ImageStatus: 0,
      };
      this.panelStore.setPanelProjectVideoAdd(data);
    },
    moveToSourceSuggested(event) {
      this.panelStore.setPanelProjectSuggestedDelete(event.items[0]);
    },
    moveToTargetSuggested(event) {
      if (this.panelStore.getPanelProjectSuggested[1].length >= 2) {
        alert("Zaten İki Adet Önerilen Proje Eklenmiş.");
      } else {
        this.panelStore.setPanelProjectSuggestedAdd({
          ...event.items[0],
          ProjectId: this.panelStore.getPanelProjectId,
        });
      }
    },
    panelProjectSuggested() {
      this.panel_project_suggested_form = true;
    },
    projectPhotoNameEditing(event) {
      this.panelStore.setPanelProjectProductPhotoNameSave(event.newData);
    },
    panelProjectPhotoChangeProductName() {
      this.panel_project_photo_change_product_name_form = true;
    },
    panelProjectPhotosUpload(event) {
      let Queue = 0;
      event.files.forEach((x) => {
        useSpacesService().panelProjectProductSendPhoto(x).then((response) => {
          if (response) {
            Queue += 1;
            const data = {
              ImageLink:
                "https://mekmar-image.fra1.cdn.digitaloceanspaces.com/galleria-project_photos/photos/" +
                x.name,
              ProjectId: this.panelStore.getPanelProjectId,
              ImageStatus: 1,
              ImageName: x.name.split(".")[0],
              Queue: Queue,
            };
            this.panelStore.setPanelProjectProductPhotoSave(data);
          } else {
            useAppToast().error("Fotoğraf ekleme başarısız.");
          }
        });
      });
    },
    panelProjectInformationUpdate(event) {
      this.panelStore.panelProjectInformationUpdate(event);
    },
    panelProjectInformationSave(event) {
      this.panelStore.panelProjectInformationSave({
        ...event,
        ProjectId: this.panelStore.getPanelProjectId,
      });
    },
    moveToTargetProjectPhoto(event) {
      if (confirm("Silmek istiyor musunuz?")) {
        this.panelStore.setPanelProjectPhotoDelete(event.items[0].ID);
      }
    },
    panelProjectSelected(event) {
      this.panelStore.setPanelProjectButtonStatus(false);
      this.panelStore.setPanelProjectDetail(event);
      this.panelStore.setPanelProjectId(event);
      this.panel_project_detail_form = true;
    },
  },
};
</script>
<script setup>
/*
 * definePageMeta yalnizca <script setup> icinde cagrilabilir -> Options
 * API sayfalarinda ikinci bir script blogu gerekiyor.
 *
 * ZORUNLU: Options API'deki `middleware: [...]` anahtari Nuxt 3+'ta YOK
 * SAYILIR -- hata vermez, yetki kisitlamasi SESSIZCE kalkar
 * (bkz. commit 5fc77edb1). Yukaridaki Options blogunda duran anahtar
 * belge olarak birakildi, isi yapan BU satir.
 */
definePageMeta({ middleware: ["authority"] })

/*
 * REFERANS LISTESI -- ULKELER
 *
 * Nuxt 2'de layouts/default.vue'nun created()'i cekiyordu; pilotun
 * layout'u o 25 liste cagrisini bilerek erteledi, ama bu sayfa
 * tasinirken kendi ihtiyaci eklenmedi -- ulke AutoComplete'inin searchCountry()'si
 * `sharedStore.getCountryList` uzerinde filtreliyor, liste bos
 * oldugu icin HIC oneri cikmiyordu.
 * Hata/uyari yok: getter bos dizi donuyor.
 */
const projectSharedStore = useSharedStore()

await useReferenceData("panel-project", [
  ["countryList", () => projectSharedStore.setCountryList()],
])
</script>
