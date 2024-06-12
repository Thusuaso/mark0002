<template>
  <span class="p-float-label w-100">
    <InputText id="freight" v-model="newValueData" @input="change($event)" :disabled="disabled" class="w-100"
      @blur="isInputActive = false" @focus="isInputActive = true" />
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
        if (this.isInputActive) {
          return this.value.toString().replace(",", ".");
        } else {
          if (
            this.value == null ||
            this.value == undefined ||
            this.value == "" ||
            this.value == " "
          ) {
            this.value = 0;
            return this.value.toFixed(4).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)\,/g, ".");
          } else {
            return this.value.toFixed(4).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)\,/g, ".");
          }
        }
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
      this.$emit('change',event)
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
  created() {
    console.log(this.text);
  },
};
</script>
