<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="body_main">
    <div class="menu_place">
      <div class="menu_box">
        <span class="flex flex-row justify-center">Меню</span>

        <div class="menu_box_balance">
          <span class="balance_text">Баланс</span>
          <div class="balance_sum">{{ sum }}</div>
        </div>
        <div>Добавить:<input type="number" class="menu_data_input plus" /></div>
        <div>Вычесть:<input type="number" class="menu_data_input minus" /></div>

        <button class="menu_button" @click="calculation">Расчитать</button>
      </div>
      <div class="menu_place_navigation">
        <div class="menu_place_navigation_buttons mb-3">
          <span class="flex flex-row justify-center">Навигация</span>
          <div class="line"></div>
          <div class="flex flex-row gap-1">
            <button class="menu_button" @click="previousChartMonth">
              <back_icon />
            </button>
            <button class="menu_button" @click="nextChartMonth">
              <next_icon />
            </button>
          </div>
          <button class="menu_button" @click="thisChartMonth">
            Текущий месяц
          </button>
        </div>

        <div class="menu_place_navigation_months flex flex-col gap-1">
          <span class="flex justify-center"> Год : 2024</span>
          <buttonChooseMonth :number="1"> Январь</buttonChooseMonth>
          <buttonChooseMonth :number="2"> Февраль</buttonChooseMonth>
          <buttonChooseMonth :number="3"> Март</buttonChooseMonth>
          <buttonChooseMonth :number="4"> Апрель</buttonChooseMonth>
          <buttonChooseMonth :number="5"> Май</buttonChooseMonth>
          <buttonChooseMonth :number="6"> Июнь</buttonChooseMonth>
          <buttonChooseMonth :number="7"> Июль</buttonChooseMonth>
          <buttonChooseMonth :number="8"> Август</buttonChooseMonth>
          <buttonChooseMonth :number="9"> Сентябрь</buttonChooseMonth>
          <buttonChooseMonth :number="10"> Октябрь</buttonChooseMonth>
          <buttonChooseMonth :number="11"> Ноябрь</buttonChooseMonth>
          <buttonChooseMonth :number="12"> Декабрь</buttonChooseMonth>
        </div>
      </div>
    </div>

    <div class="chart_place">
      <span class="canvas_name_chart"
        >График баланса за {{ chooseMonthName }}</span
      >
      <div class="line"></div>
      <div class="canva_box_style">
        <canvas id="acquisitions"></canvas>
      </div>

      <span class="canvas_name_chart">График сравение дохода/расхода</span>
      <div class="line"></div>
      <div class="canva_box_style">
        <canvas id="comparison"></canvas>
      </div>
    </div>

    <div class="history_box">
      <span class="flex flex-row justify-center">История</span>

      <div
        class="flex flex-col w-full h-full justify-between"
        v-if="isHistoryExist"
      >
        <div>
          <History_point :responseHistoryPoint="history"></History_point>
        </div>
      </div>
      <div class="flex flex-col h-full justify-center m-auto" v-else>
        Нет записей в истории
      </div>
    </div>
  </div>
</template>

<script>
import History_point from "../components/history_point.vue";

import {
  sum,
  calculation,
  history,
  isHistoryExist,
  nextChartMonth,
  previousChartMonth,
  thisChartMonth,
} from "../hooks/historyTransaction.js";
import {
  createChart,
  createChartWithOtherType,
  chooseMonthName,
} from "../hooks/chart.js";
import { onMounted } from "vue";
import back_icon from "../assets/svgs/back_icon.vue";
import next_icon from "../assets/svgs/next_icon.vue";

export default {
  data() {
    return {};
  },
  components: {
    History_point,
    back_icon,
    next_icon,
  },
  beforeCreate() {
    if (!localStorage.getItem("sum")) {
      localStorage.setItem("sum", 0);
      localStorage.setItem("numberOfHistoryPoint", 0);
      let history = [];
      localStorage.setItem("history", JSON.stringify(history));
    }
  },
  methods: {
    reset() {
      localStorage.clear();
      location.reload();
    },
  },
  setup() {
    onMounted(() => {
      let chartId = "#acquisitions";
      createChart(chartId);
      chartId = "#comparison";
      createChartWithOtherType("bar", chartId);
    });
    return {
      sum,
      calculation,
      history,
      isHistoryExist,
      createChart,
      nextChartMonth,
      previousChartMonth,
      thisChartMonth,
      createChartWithOtherType,
      chooseMonthName,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/pages/mainStyle.scss";
</style>
