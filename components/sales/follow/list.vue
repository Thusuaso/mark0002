<template>
  <div class="col-4">
    <div class="card text-center h-100">
      <div class="card-header">{{ follow.FirmaAdi }} ({{ follow.Oncelik }})</div>
      <div class="card-body">
        <h5 class="card-title">{{ follow.Temsilci }}</h5>

        <p class="card-text">{{ follow.baslik }}</p>
      </div>
      <div class="card-footer text-body-secondary">
        <button
          type="button"
          class="btn btn-primary w-100"
          @click="$emit('followDetail', follow)"
        >
          Detail
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    follow: {
      type: Object,
      required: true,
    },
  },
};
</script>
