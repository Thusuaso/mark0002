<template>
  <div class="mt-4 mb-4">
    <span class="p-float-label">
      <Textarea id="consider" v-model="model.Hata" rows="5" class="w-100" />

      <label for="consider">Point of Consider</label>
    </span>
    <div class="row">
      <div class="col">
        <Button
          type="button"
          class="p-button-success w-100"
          label="Save"
          @click="$emit('point_of_consider_process_emit', model)"
        />
      </div>
      <div class="col" v-if="!status">
        <Button
          type="button"
          class="p-button-danger w-100"
          label="Delete"
          @click="$emit('point_of_consider_delete_emit', model)"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    model: {
      type: Object,
      required: false,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
