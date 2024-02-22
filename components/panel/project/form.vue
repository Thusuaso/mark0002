<template>
  <div>
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
      <div class="col">
        <Button
          type="button"
          class="p-button-secondary w-100"
          label="Change Product Name"
          @click="$emit('panel_project_photo_change_product_name')"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          class="p-button-info w-100"
          label="Suggested"
          @click="$emit('panel_project_suggested')"
        />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <PickList
          v-model="photos"
          listStyle="height:392px;width:450px;"
          breakpoint="1400px"
          @move-to-target="$emit('move_to_target_project_photo_emit', $event)"
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
                <span class="font-bold">{{ slotProps.item.ImageName }}</span>
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
            <span class="p-float-label">
              <InputText id="video" v-model="videos_link" />
              <label for="video">Video Link</label>
            </span>
          </div>
          <div class="col">
            <Button
              type="button"
              class="p-button-success"
              label="Add"
              @click="$emit('panel_project_video_emit', videos_link)"
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
    <span class="p-float-label mt-3">
      <Textarea v-model="information.ProjectInformation" rows="8" class="w-100" />
      <label>Description (En)</label>
    </span>
    <span class="p-float-label mt-3">
      <Textarea v-model="information.ProjectInformation_Fr" rows="8" class="w-100" />
      <label>Description (Fr)</label>
    </span>
    <span class="p-float-label mt-3">
      <Textarea v-model="information.ProjectInformation_Es" rows="8" class="w-100" />
      <label>Description (Es)</label>
    </span>
    <span class="p-float-label mt-3">
      <Textarea v-model="information.ProjectInformation_Ru" rows="8" class="w-100" />
      <label>Description (Ru)</label>
    </span>
    <div class="row">
      <div class="col">
        <Button
          type="button"
          class="p-button-success w-100"
          label="Save"
          @click="$emit('panel_project_information_save_emit', information)"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          class="p-button-warning w-100"
          label="Update"
          @click="$emit('panel_project_information_update_emit', information)"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
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
  },
  data() {
    return {
      videos_link: null,
    };
  },
  methods: {},
};
</script>
