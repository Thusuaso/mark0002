<template>
  <span class="p-float-label w-100">
    <InputText
      id="freight"
      v-model="value"
      @input="changeInput($event)"
      :disabled="disabled"
      class="w-100"
    />
    <label for="freight">{{ text }}</label>
  </span>
</template>
<script>
export default {
  props: {
    value: {
      type: Number,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    changeInput(event) {
      if (event) {
        if (event[0] == 0) {
          event = event.substr(1);
          this.$emit("onInput", 0);
        } else {
          this.$emit("onInput", parseFloat(event.replace(",", ".")));
        }
      } else {
        this.$emit("onInput", 0);
      }
    },
  },
  watch: {
    value() {
      if (
        this.value == " " ||
        this.value == "" ||
        this.value == undefined ||
        this.value == null ||
        this.value == 0 ||
        this.value == "NaN" ||
        this.value == NaN
      ) {
        this.value = 0;
      }
    },
  },
};
</script>
