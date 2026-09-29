<template>
  <span class="p-float-label w-100">
    <InputText
      id="freight"
      v-model="newValueData"
      @input="change($event)"
      :disabled="disabled"
      class="w-100"
      @blur="isInputActive = false"
      @focus="isInputActive = true"
    />
    <label for="freight">{{ text }}</label>
  </span>
</template>
<script>
export default {
  data() {
    return {
      isInputActive: false,
    };
  },
  computed: {
    newValueData: {
      get() {
        const num = Number(this.value) || 0;
        return this.isInputActive ? String(num) : num.toFixed(2);
      },
      set(modifiedValue) {
        let newValue = parseFloat(modifiedValue.replace(",", "."));
        if (isNaN(newValue)) {
          newValue = 0;
        }
        this.$emit("onInput", newValue);
      },
    },
  },
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
    change(event) {
      this.$emit("change", event);
    },
  },
  watch: {
    // value() {
    //   if (
    //     this.value == " " ||
    //     this.value == "" ||
    //     this.value == undefined ||
    //     this.value == null ||
    //     this.value == "NaN" ||
    //     this.value == NaN
    //   ) {
    //     this.value = 0;
    //   }
    // },
  },
  created() {},
};
</script>
