import Chart from "chart.js/auto";
import { ref } from "vue";

const days = ref([]);
const money = ref([]);
const chartLine = ref([]);
const chartBar = ref([]);
const chart = ref([]);
const months = ref([
  ["January", [1, 31]],
  ["February", [1, 28]],
  ["March", [1, 31]],
  ["April", [1, 30]],
  ["May", [1, 31]],
  ["June", [1, 30]],
  ["July", [1, 31]],
  ["August", [1, 31]],
  ["September", [1, 30]],
  ["October", [1, 31]],
  ["November", [1, 30]],
  ["December", [1, 31]],
]);
const chooseMonth = ref(new Date().getUTCMonth());
const typeOfChart = ref("line");
const incomeExpenses = ref([]);
const pointOfChart = ref(["Expenses", "Income"]);
const chooseMonthName = ref([]);
chooseMonthName.value = months.value[chooseMonth.value][0];

const createChartWithOtherType = (e, chartId) => {
  typeOfChart.value = e;
  createChart(chartId);
  typeOfChart.value = "line";
};

function getDataHistory() {
  if (typeOfChart.value == "line") {
    let newDataHistory = JSON.parse(localStorage.getItem("history"));

    let sum = 0;

    if (newDataHistory) {
      let lastDay = 0;
      money.value = [];
      days.value = [];

      for (let i = 0; i < months.value[chooseMonth.value][1][1]; i++) {
        days.value.push(
          i + 1 + ` ${months.value[chooseMonth.value][0].slice(0, 3)}`
        );
      }

      newDataHistory = newDataHistory.filter(function (item) {
        //фильт выбранного месяца
        if (item[1][1] == chooseMonth.value + 1) {
          return item;
        } else if (item[1][1] < chooseMonth.value + 1) {
          if (item[2]) {
            sum = sum + item[2];
            if (item[3]) {
              sum = sum - item[3];
            }
          } else if (item[3]) {
            sum = sum - item[3];
          }
        }
      });

      if (newDataHistory.length == 0) {
        // Новый месяц показать только сумму
        let i = 1;
        while (i != new Date().getDate()) {
          money.value.push("-");
          i++;
        }
        money.value.push(sum);
      } else {
        let i = newDataHistory[0][1][0];
        lastDay = i - 1;
        while (i != 1) {
          ///пропустить дни в графике в начале месяца до того дня с которого началась запись
          money.value.push("-");
          --i;
        }
      }
      newDataHistory.map(function (item) {
        if (lastDay != item[1][0] - 1) {
          //пропустить дни в графике в которых не было записей
          while (lastDay != item[1][0]) {
            money.value.push(sum);
            ++lastDay;
          }
          lastDay = item[1][0];
        }
        if (lastDay != item[1][0]) {
          lastDay = item[1][0];

          if (item[2]) {
            sum = sum + item[2];
            if (item[3]) {
              sum = sum - item[3];
            }
            money.value.push(sum);
          } else if (item[3]) {
            sum = sum - item[3];
            money.value.push(sum);
          } else {
            money.value.push(sum);
          }
        } else {
          if (item[2]) {
            sum = sum + item[2];
            let perDay = item[2];
            if (item[3]) {
              sum = sum - item[3];
              perDay = perDay - item[3];
            }
            money.value[money.value.length - 1] += perDay;
          } else if (item[3]) {
            sum = sum - item[3];
            money.value[money.value.length - 1] -= item[3];
          } else {
            // money.value[money.length-1]=+sum
          }
        }
      });
    }
  } else {
    let newDataHistory = JSON.parse(localStorage.getItem("history"));
    let income = 0;
    let expenses = 0;
    incomeExpenses.value = [];

    newDataHistory = newDataHistory.filter(function (item) {
      if (item[1][1] == chooseMonth.value + 1) {
        return item;
      }
    });

    if (newDataHistory.length == 0) {
      incomeExpenses.value.push(-expenses);
      incomeExpenses.value.push(income);
    } else {
      newDataHistory.forEach((item) => {
        if (item[2]) {
          income = income + item[2];

          if (item[3]) {
            expenses = expenses + item[3];
          }
        } else if (item[3]) {
          expenses = expenses + item[3];
        }
      });
      incomeExpenses.value.push(-expenses);
      incomeExpenses.value.push(income);
    }
  }
}

const createChart = (chartId) => {
  getDataHistory();

  chart.value = new Chart(document.querySelector(chartId), {
    type: typeOfChart.value,
    data: {
      labels: typeOfChart.value == "line" ? days.value : pointOfChart.value,
      datasets: [
        {
          label:
            typeOfChart.value == "line"
              ? "Балланс"
              : months.value[chooseMonth.value][0],

          data:
            typeOfChart.value == "line" ? money.value : incomeExpenses.value,
          backgroundColor:
            typeOfChart.value == "line"
              ? "rgb(39, 255, 39)"
              : "rgba(75, 202, 87, 0.4)",
          borderColor:
            typeOfChart.value == "line"
              ? "rgb(19, 100, 19)"
              : "rgb(88, 202, 75)",
          borderWidth: 1,
          pointStyle: "circle",
          pointRadius: 5,
          pointHoverRadius: 10,
          tension: 0.3,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: typeOfChart.value == "line" ? false : true,
          fullSize: true,
          onClick() {},
          maxWidth: 100,
        },
      },
      animation: {
        duration: 100,
      },
    },
  });
  if (chartId == "#acquisitions") {
    chartLine.value = chart.value;
  } else {
    chartBar.value = chart.value;
  }
  chooseMonthName.value = months.value[chooseMonth.value][0];
};

export {
  createChart,
  chart,
  chooseMonth,
  createChartWithOtherType,
  chartLine,
  chartBar,
  chooseMonthName,
};
