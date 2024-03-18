<template>
  <div class="container">
    <div class="row mb-3">
      <div class="col">
        <Button
          type="button"
          class="p-button-success w-100"
          label="Add New Project"
          @click="newProject"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          class="p-button-warning w-100"
          label="Change Queue"
          @click="changeQueue"
        />
      </div>
    </div>

    <panelProjectList
      :list="getPanelProjectList"
      @panel_project_selected_emit="panelProjectSelected($event)"
      :loading="getLoading"
    />
    <Dialog :visible.sync="panel_project_detail_form" :header="getPanelProjectId" modal>
      <panelProjectForm
        :photos="getPanelProjectPhotos"
        :suggested="getPanelProjectSuggested"
        :information="getPanelProjectInformation"
        :video="getPanelProjectVideo"
        :status="getPanelProjectButtonStatus"
        :projectId="getPanelProjectId"
        @move_to_target_project_photo_emit="moveToTargetProjectPhoto($event)"
        @panel_project_information_save_emit="panelProjectInformationSave($event)"
        @panel_project_information_update_emit="panelProjectInformationUpdate($event)"
        @panel_project_photos_upload="panelProjectPhotosUpload($event)"
        @panel_project_photo_change_product_name="panelProjectPhotoChangeProductName"
        @panel_project_suggested="panelProjectSuggested"
        @panel_project_video_emit="panelProjectVideoAdd($event)"
      />
    </Dialog>
    <Dialog :visible.sync="panel_project_photo_change_product_name_form" header="" modal>
      <div class="container">
        <DataTable
          :value="getPanelProjectPhotos[0]"
          editMode="row"
          :editingRows.sync="edditingProjectPhotoName"
          @row-edit-save="projectPhotoNameEditing($event)"
        >
          <Column field="ImageLink" header="Image">
            <template #body="slotProps">
              <img :src="slotProps.data.ImageLink" style="width: 100px; height: 100px" />
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
              <InputText v-model="slotProps.data[slotProps.column.field]" autofocus />
            </template>
          </Column>
          <Column field="ProductName_Fr" header="Project Name (Fr)">
            <template #body="slotProps">
              {{ slotProps.data.ProductName_Fr }}
            </template>
            <template #editor="slotProps">
              <InputText v-model="slotProps.data[slotProps.column.field]" autofocus />
            </template>
          </Column>
          <Column field="ProductName_Es" header="Project Name (Es)">
            <template #body="slotProps">
              {{ slotProps.data.ProductName_Es }}
            </template>
            <template #editor="slotProps">
              <InputText v-model="slotProps.data[slotProps.column.field]" autofocus />
            </template>
          </Column>
          <Column field="ProductName_Ru" header="Project Name (Ru)">
            <template #body="slotProps">
              {{ slotProps.data.ProductName_Ru }}
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
        </DataTable>
      </div>
    </Dialog>
    <Dialog :visible.sync="panel_project_suggested_form" header="" modal>
      <PickList
        v-model="getPanelProjectSuggested"
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
              <span class="font-bold">{{ slotProps.item.ProjectName }}</span>
              <div class="flex align-items-center gap-2">
                <i class="pi pi-tag text-sm"></i>
                <span>{{ slotProps.item.ID }}</span>
              </div>
            </div>
          </div>
        </template>
      </PickList>
    </Dialog>
    <Dialog :visible.sync="panel_project_new_form" header="" modal>
      <div class="row mt-3 mb-3">
        <div class="col">
          <span class="p-float-label">
            <InputText
              id="project_name_en"
              v-model="getPanelProductProjectModel.ProjectName"
            />
            <label for="project_name_en">Project Name (En)</label>
          </span>
        </div>
        <div class="col">
          <span class="p-float-label">
            <InputText
              id="project_name_fr"
              v-model="getPanelProductProjectModel.ProjectName_Fr"
            />
            <label for="project_name_fr">Project Name (Fr)</label>
          </span>
        </div>
        <div class="col">
          <span class="p-float-label">
            <InputText
              id="project_name_es"
              v-model="getPanelProductProjectModel.ProjectName_Es"
            />
            <label for="project_name_es">Project Name (Es)</label>
          </span>
        </div>
        <div class="col">
          <span class="p-float-label">
            <InputText
              id="project_name_ru"
              v-model="getPanelProductProjectModel.ProjectName_Ru"
            />
            <label for="project_name_ru">Project Name (Ru)</label>
          </span>
        </div>
        <div class="col">
          <span class="p-float-label">
            <AutoComplete
              v-model="selectedCountry"
              inputId="country"
              :suggestions="filteredCountry"
              @complete="searchCountry($event)"
              field="UlkeAdi"
              @item-select="countrySelected($event)"
            />
            <label for="country">Country</label>
          </span>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <Button
            type="button"
            class="p-button-success w-100"
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
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import oceanservice from "../../../plugins/digitalocean";
export default {
  computed: {
    ...mapGetters([
      "getPanelProjectList",
      "getPanelProjectPhotos",
      "getPanelProjectSuggested",
      "getPanelProjectInformation",
      "getPanelProjectVideo",
      "getPanelProjectButtonStatus",
      "getPanelProjectId",
      "getPanelProductProjectModel",
      "getCountryList",
      "getLoading",
    ]),
  },
  data() {
    return {
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
  created() {
    this.$store.dispatch("setPanelProjectList");
  },
  methods: {
    changeQueue() {
      this.$store.dispatch("setPanelProjectQueueChange", this.getPanelProjectList);
    },
    projectChangeNameMouseOver() {
      console.log("projectChangeNameMouseOver");
    },
    saveProject() {
      this.project_save_button_disabled = true;
      this.$store.dispatch("setPanelProjectSave", this.getPanelProductProjectModel);
    },
    countrySelected(event) {
      this.getPanelProductProjectModel.CountryId = event.value.Id;
      this.getPanelProductProjectModel.CountryName = event.value.UlkeAdi;
    },
    projectPhotoUpload(event) {
      const data = {
        ID: this.getPanelProjectId,
        Image:
          "https://mekmar-image.fra1.cdn.digitaloceanspaces.com/galleria-project_photos/" +
          event.files[0].name,
      };
      oceanservice.panelProjectSendPhoto(event.files[0]).then((response) => {
        if (response) {
          this.$store.dispatch("setPanelProjectImageAdd", data);
          this.panel_project_new_form = false;
        } else {
          this.$toast.error("Fotoğraf Ekleme Başarısız");
        }
      });
    },
    searchCountry(event) {
      let results;
      if (event.query.length === 0) {
        results = this.getCountryList;
      } else {
        results = this.getCountryList.filter((x) => {
          return x.UlkeAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredCountry = results;
    },
    newProject() {
      this.$store.dispatch("setPanelProjectModel");
      this.panel_project_new_form = true;
    },
    panelProjectVideoAdd(event) {
      const data = {
        ProjectId: this.getPanelProjectId,
        VideosLink: event,
        VideosStatus: 1,
        ImageStatus: 0,
      };
      this.$store.dispatch("setPanelProjectVideoAdd", data);
    },
    moveToSourceSuggested(event) {
      this.$store.dispatch("setPanelProjectSuggestedDelete", event.items[0]);
    },
    moveToTargetSuggested(event) {
      if (this.getPanelProjectSuggested[1].length >= 2) {
        alert("Zaten İki Adet Önerilen Proje Eklenmiş.");
      } else {
        this.$store.dispatch("setPanelProjectSuggestedAdd", {
          ...event.items[0],
          ProjectId: this.getPanelProjectId,
        });
      }
    },
    panelProjectSuggested() {
      this.panel_project_suggested_form = true;
    },
    projectPhotoNameEditing(event) {
      this.$store.dispatch("setPanelProjectProductPhotoNameSave", event.newData);
    },
    panelProjectPhotoChangeProductName() {
      this.panel_project_photo_change_product_name_form = true;
    },
    panelProjectPhotosUpload(event) {
      let Queue = 0;
      event.files.forEach((x) => {
        oceanservice.panelProjectProductSendPhoto(x).then((response) => {
          if (response) {
            Queue += 1;
            const data = {
              ImageLink:
                "https://mekmar-image.fra1.cdn.digitaloceanspaces.com/galleria-project_photos/photos/" +
                x.name,
              ProjectId: this.getPanelProjectId,
              ImageStatus: 1,
              ImageName: x.name.split(".")[0],
              Queue: Queue,
            };
            this.$store.dispatch("setPanelProjectProductPhotoSave", data);
          } else {
            this.$toast.error("Fotoğraf ekleme başarısız.");
          }
        });
      });
    },
    panelProjectInformationUpdate(event) {
      this.$store.dispatch("panelProjectInformationUpdate", event);
    },
    panelProjectInformationSave(event) {
      this.$store.dispatch("panelProjectInformationSave", {
        ...event,
        ProjectId: this.getPanelProjectId,
      });
    },
    moveToTargetProjectPhoto(event) {
      if (confirm("Silmek istiyor musunuz?")) {
        this.$store.dispatch("setPanelProjectPhotoDelete", event.items[0].ID);
      }
    },
    panelProjectSelected(event) {
      this.$store.dispatch("setPanelProjectButtonStatus", false);
      this.$store.dispatch("setPanelProjectDetail", event);
      this.$store.dispatch("setPanelProjectId", event);
      this.panel_project_detail_form = true;
    },
  },
};
</script>
