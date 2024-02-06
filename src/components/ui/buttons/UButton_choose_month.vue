<template>
  <button class="navigation_buttons" @click="changeChartMonth(number)">
    <slot></slot>
  </button>
</template>

<script>
import { changeChartMonth } from "../../../hooks/historyTransaction.js";
export default {
  name: "buttonChooseMonth",
  props: {
    number: {
      type: Number,
      required: true,
    },
  },
  setup() {
    return {
      changeChartMonth,
    };
  },
};
</script>

<style lang="scss" scoped></style>
