<template>
  <div class="test">
    <div class="row">
      <div class="col">
        <FileUpload
          @uploader="$emit('panel_project_photos_upload', $event)"
          :multiple="true"
          accept="image/*"
          customUpload
        >
          <template #empty>
            <p>Drag and drop files to here to upload.</p>
          </template>
        </FileUpload>
      </div>
      <div class="col-2">
        <Button
          type="button"
          severity="secondary" class="w-100"
          label="Change Product Name"
          @click="$emit('panel_project_photo_change_product_name')"
        />
      </div>
      <div class="col-2">
        <Button
          type="button"
          severity="info" class="w-100"
          label="Suggested Projects"
          @click="$emit('panel_project_suggested')"
        />
      </div>
      <div class="col-2">
        <FileUpload
          mode="basic"
          accept="image/*"
          :maxFileSize="1000000"
          @select="changeProjectMainPhoto($event)"
          chooseLabel="Change Main Photo"
          class="w-100"
        />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <!--
          v-model PROP'UN KENDISINE baglanamaz (Vue 3 DERLEME HATASI);
          gerekcesi data icindeki [FOTO-1] notunda -> yerel ayna.
        -->
        <PickList
          v-model="photosLocal"
          listStyle="height:392px;width:450px;"
          breakpoint="1400px"
          @move-to-target="$emit('move_to_target_project_photo_emit', $event)"
          @reorder="re_order_project_photo($event)"
        >
          <template #sourceheader> Available </template>
          <template #targetheader> Selected </template>
          <template #item="slotProps">
            <div class="flex flex-wrap p-2 align-items-center gap-3">
              <img
                class="w-4rem shadow-2 flex-shrink-0 border-round"
                :src="slotProps.item.ImageLink"
                :alt="slotProps.item.ProductName"
                lazyload
              />
              <div class="flex-1 flex flex-column gap-2">
                <span>{{ slotProps.item.ImageName }}</span>
                <div class="flex align-items-center gap-2">
                  <i class="pi pi-tag text-sm"></i>
                  <span>{{ slotProps.item.ID }}</span>
                </div>
              </div>
            </div>
          </template>
        </PickList>
      </div>
      <div class="col" v-if="video.length == 0">
        <div class="row">
          <div class="col">
            <FloatLabel>
              <InputText id="video" v-model="videos_link" />
              <label for="video">Add Video</label>
            </FloatLabel>
          </div>
          <div class="col">
            <Button
              type="button"
              severity="success"
              label="Add Video"
              @click="$emit('panel_project_video_emit', videos_link)"
              :disabled="!videos_link"
            />
          </div>
        </div>
      </div>
      <div class="col" v-else>
        <iframe
          style="width: 550px; height: 392px"
          :src="video[0].VideosLink"
          frameborder="0"
          gesture="media"
          allow="encrypted-media"
          allowfullscreen
        ></iframe>
      </div>
    </div>
    <FloatLabel class="mt-3">
      <Textarea v-model="information.ProjectInformation" rows="8" class="w-100" />
      <label>Description (En)</label>
    </FloatLabel>
    <FloatLabel class="mt-3">
      <Textarea v-model="information.ProjectInformation_Fr" rows="8" class="w-100" />
      <label>Description (Fr)</label>
    </FloatLabel>
    <FloatLabel class="mt-3">
      <Textarea v-model="information.ProjectInformation_Es" rows="8" class="w-100" />
      <label>Description (Es)</label>
    </FloatLabel>
    <FloatLabel class="mt-3">
      <Textarea v-model="information.ProjectInformation_Ru" rows="8" class="w-100" />
      <label>Description (Ru)</label>
    </FloatLabel>
    <FloatLabel class="mt-3">
      <Textarea v-model="information.ProjectInformation_Ar" rows="8" class="w-100" />
      <label>Description (Ar)</label>
    </FloatLabel>
    <div class="row">
      <div class="col">
        <Button
          type="button"
          severity="success" class="w-100"
          label="Add Description"
          @click="$emit('panel_project_information_save_emit', information)"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          severity="warn" class="w-100"
          label="Update Description"
          @click="$emit('panel_project_information_update_emit', information)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { usePanelStore } from "~/stores/panel"

export default {
  computed: {
    panelStore() {
      return usePanelStore()
    },
  },

  props: {
    photos: {
      type: Array,
      required: false,
    },
    suggested: {
      type: Array,
      required: false,
    },
    information: {
      type: Object,
      required: false,
    },
    video: {
      type: Array,
      required: false,
    },
    status: {
      type: Boolean,
      required: true,
    },
    projectId: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      /*
       * [FOTO-1] PROP'UN YEREL AYNASI -- ZORUNLU, SECIM DEGIL.
       *
       * Kaynakta `<PickList v-model="photos">` yaziyordu ve `photos`
       * bir PROP. Vue 2'de bu sessizce yurudu (yalnizca konsolda
       * "Avoid mutating a prop directly"); Vue 3'te DERLEME HATASI:
       *
       *   v-model cannot be used on a prop, because local prop
       *   bindings are not writable
       *
       * Yani derleme bile gecmiyor. Ayni hata panel/ProductForm.vue'da
       * iki yerde vardi; bu uculu
       * tools/codemods/find-prop-mutations.mjs'e eklenen "DERLEME
       * DUSER" denetimiyle ONDEN tespit edildi.
       *
       * Cozum projedeki yerlesik kalip: yerel durum + prop'u izleyen
       * watch (ilk kullanimi AyoFormCurrency.vue, commit eaafb9e18).
       *
       * SIG KOPYA YETERLI: PickList modeli [kaynak, hedef] bicimi;
       * dis diziyi kopyalamak ic dizileri ayni nesne olarak birakir.
       */
      photosLocal: [],
      videos_link: null,
    };
  },
  watch: {
    /* Prop degisince yerel ayna esliyor; immediate -- bilesen
     * kurulurken de dolsun, yoksa PickList bos acilirdi. */
    photos: {
      immediate: true,
      handler(yeni) {
        this.photosLocal = Array.isArray(yeni) ? [...yeni] : []
      },
    },
  },

  methods: {
    changeProjectMainPhoto(event) {
      useSpacesService().panelProjectSendPhoto(event.files[0]).then((response) => {
        if (response) {
          const data = {
            id: this.projectId,
            link:
              "https://mekmar-image.fra1.cdn.digitaloceanspaces.com/galleria-project_photos/" +
              event.files[0].name,
          };
          this.panelStore.setPanelProjectMainPhotoChange(data);
        }
      });
    },
    re_order_project_photo(event) {
      let index = 1;
      event.value[0].forEach((x) => {
        x.Queue = index;
        index++;
      });
      this.panelStore.setPanelProjectPhotosQueueChange(event.value[0]);
    },
  },
};
</script>
<style scoped>
  @media screen and (max-width:575px) {
    .row{
    clear:both;
    display:block;
    width:100%;
  }
  .col{
    clear:both;
    display:block;
    width:100%;
  }
  .col-2{
    clear:both;
    display:block;
    width:100%;
  }    
  .test{
    clear:both;
    display:block;
    width:90vw;
  }
  }
</style>
