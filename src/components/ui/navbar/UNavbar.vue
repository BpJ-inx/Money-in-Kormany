<template>
  <nav class="navbar lg:px-4 flex flex-wrap lg:py-2">
    <label class="navbar_label pr-1">
      <img src="/label.png" class="mr-2" />
      <span class="flex m-auto">Money In Кормане</span>
    </label>

    <div class="test_funcs flex">
      <button class="test p-1" @click="demo">demo</button>
      <br />
      <button class="reset p-1" @click="reset">reset</button>
    </div>
  </nav>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "navbar",

  methods: {
    reset() {
      localStorage.clear();
      location.reload();
    },

    demo() {
      let testHistory = [];
      let i = 0;
      let month = new Date().getUTCMonth() + 1 - 1;
      let day = 1;
      let sum = 0;
      while (i < 25) {
        let plus = Math.floor(
          Math.random() * 1000 + Math.random() * 100 + Math.random() * 10
        );
        let minus = Math.floor(
          Math.random() * 1000 + Math.random() * 100 + Math.random() * 10
        );
        testHistory.push([i, [day, month, 2024], plus, minus]);
        if (i == 20 || i == 25 ) {
          month++;
          day = 1;
        }
        i++;
        day++;
        sum += plus;
        sum -= minus;
      }
      localStorage.setItem("history", JSON.stringify(testHistory));
      localStorage.setItem("sum", sum);
      localStorage.setItem("numberOfHistoryPoint", i);
      location.reload();
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/compmonents/navbarStyle.scss";

.test_funcs {
  display: flex;
  // display: none;
}

.test {
  display: flex;
  margin: 5px;
  border: solid 1px black;
}

.reset {
  display: flex;
  margin: 5px;
  border: solid 1px black;
}
</style>
