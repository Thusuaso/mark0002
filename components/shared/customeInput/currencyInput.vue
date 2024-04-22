<template>
  <span class="p-float-label w-100">
    <InputText
      id="freight"
      v-model="newValueData"
      @input="changeInput($event)"
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
        if (this.isInputActive) {
          return this.value.toString().replace(",", ".");
        } else {
          return this.value.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)\,/g, ".");
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
    changeInput(event) {
      // if (event) {
      //   if (event[0] == 0) {
      //     event = event.substr(1);
      //     this.$emit("onInput", 0);
      //   } else {
      //     this.$emit("onInput", parseFloat(event.replace(",", ".")));
      //   }
      // } else {
      //   this.$emit("onInput", 0);
      // }
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
