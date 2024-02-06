<template>
  <div
    class="flex justify-between"
    v-for="point in responseHistoryPoint.slice().reverse()"
    :key="point[0]"
  >
    <div class="flex gap-1">
      <div>{{ point[1][0] }}.{{ point[1][1] }}.{{ point[1][2] }} :</div>
      <div>
        <span v-if="point[2] > 0">приход {{ point[2] }}</span>
        <span v-if="point[3] > 0 && point[2] > 0">,</span>
        <span v-if="point[3] > 0"> расход {{ point[3] }} </span>
      </div>
    </div>
    <buttonDelete @click="deleteHistoryPoint(point[0])"></buttonDelete>
  </div>
</template>

<script>
import { deleteHistoryPoint } from "../hooks/historyTransaction.js";
export default {
  props: {
    responseHistoryPoint: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      deleteHistoryPoint,
    };
  },
};
</script>

<style lang="scss" scoped></style>
