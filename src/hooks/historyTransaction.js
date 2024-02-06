import { ref } from "vue";

import {
  createChart,
  chooseMonth,
  createChartWithOtherType,
  chartBar,
  chartLine,
} from "../hooks/chart.js";

const sum = ref(+localStorage.getItem("sum"));

const isHistoryExist = ref(true);
const history = ref(JSON.parse(localStorage.getItem("history")));

const refreshHistory = () => {
  history.value = JSON.parse(localStorage.getItem("history"));
  if (history.value === null || history.value.length == 0) {
    isHistoryExist.value = false;
  } else {
    history.value = JSON.parse(localStorage.getItem("history"));

    history.value = history.value.filter(
      (x) => x[1][1] == chooseMonth.value + 1
    );
  }
};
refreshHistory();

const calculation = () => {
  let plus = +document.querySelector(".plus").value;
  let minus = +document.querySelector(".minus").value;
  if (plus == 0 && minus == 0) {
    console.log("пустой ввод");
    document.querySelector(".plus").value = "";
    document.querySelector(".minus").value = "";
    return;
  } else {
    let allHistory = JSON.parse(localStorage.getItem("history"));

    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    let newDate = [day, month, year];

    let numberOfHistoryPoint = localStorage.getItem("numberOfHistoryPoint");
    numberOfHistoryPoint++;
    localStorage.setItem("numberOfHistoryPoint", numberOfHistoryPoint);

    isHistoryExist.value = true;
    sum.value = sum.value + plus - minus;
    localStorage.setItem("sum", sum.value);
    document.querySelector(".plus").value = "";
    document.querySelector(".minus").value = "";

    allHistory.push([numberOfHistoryPoint, newDate, plus, minus]);
    localStorage.setItem("history", JSON.stringify(allHistory));

    history.value = JSON.parse(localStorage.getItem("history"));
  }
  chartBar.value.destroy();
  chartLine.value.destroy();
  let chartId = "#acquisitions";
  createChart(chartId);
  chartId = "#comparison";
  createChartWithOtherType("bar", chartId);

  refreshHistory();
};

const nextChartMonth = () => {
  let newDataHistory = JSON.parse(localStorage.getItem("history"));
  let months = new Set();
  newDataHistory.map(function (item) {
    months.add(item[1][1]);
  });

  if (
    months.has(chooseMonth.value + 2) ||
    chooseMonth.value + 2 == new Date().getUTCMonth() + 1
  ) {
    ++chooseMonth.value;
    chartBar.value.destroy();
    chartLine.value.destroy();
    let chartId = "#acquisitions";
    createChart(chartId);
    chartId = "#comparison";
    createChartWithOtherType("bar", chartId);

    refreshHistory();
  }
};

const previousChartMonth = () => {
  let newDataHistory = JSON.parse(localStorage.getItem("history"));
  let months = new Set();
  newDataHistory.map(function (item) {
    months.add(item[1][1]);
  });
  if (months.has(chooseMonth.value + 1 - 1)) {
    --chooseMonth.value;
    chartBar.value.destroy();
    chartLine.value.destroy();
    let chartId = "#acquisitions";
    createChart(chartId);
    chartId = "#comparison";
    createChartWithOtherType("bar", chartId);

    refreshHistory();
  }
};
const thisChartMonth = () => {
  if (chooseMonth.value != new Date().getUTCMonth()) {
    chooseMonth.value = new Date().getUTCMonth();
    chartBar.value.destroy();
    chartLine.value.destroy();
    let chartId = "#acquisitions";
    createChart(chartId);
    chartId = "#comparison";
    createChartWithOtherType("bar", chartId);

    refreshHistory();
  }
};

const deleteHistoryPoint = (point) => {
  let allHistory = JSON.parse(localStorage.getItem("history"));
  allHistory.map((item) => {
    if (item[0] == point) {
      sum.value -= item[2];
      sum.value += item[3];
    }
  });
  allHistory = allHistory.filter((item) => item[0] != point);

  localStorage.setItem("history", JSON.stringify(allHistory));
  // ?
  history.value = JSON.parse(localStorage.getItem("history"));

  localStorage.setItem("sum", sum.value);

  chartBar.value.destroy();
  chartLine.value.destroy();
  let chartId = "#acquisitions";
  createChart(chartId);
  chartId = "#comparison";
  createChartWithOtherType("bar", chartId);

  refreshHistory();
};

const changeChartMonth = (numerOfMonth) => {
  let newDataHistory = JSON.parse(localStorage.getItem("history"));
  let months = new Set();
  newDataHistory.map(function (item) {
    months.add(item[1][1]);
  });

  // if (
  //   months.has(numerOfMonth) ||
  //   chooseMonth.value + 2 == new Date().getUTCMonth() + 1
  // ) {
  chooseMonth.value = numerOfMonth - 1;
  chartBar.value.destroy();
  chartLine.value.destroy();
  let chartId = "#acquisitions";
  createChart(chartId);
  chartId = "#comparison";
  createChartWithOtherType("bar", chartId);

  refreshHistory();
  // }
};

export {
  sum,
  calculation,
  history,
  isHistoryExist,
  nextChartMonth,
  previousChartMonth,
  thisChartMonth,
  deleteHistoryPoint,
  refreshHistory,
  changeChartMonth,
};
