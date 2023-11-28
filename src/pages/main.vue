<template>
    <div class="body_main">
        <div class="menu_box">
            <span class="flex flex-row justify-center">Menu</span>
            <div>Добавить:<input type=number class="menu_data_input plus"> </div>
            <div>Вычесть:<input type=number class="menu_data_input minus"> </div>
            <div class="m-auto mt-1">Сумма : {{ sum }} </div>
            <button class="menu_button" @click="calculation">Расчитать</button>
        </div>
        <div class="history_box">
            <span class="flex flex-row justify-center">History</span>
            <div class="flex flex-col h-full justify-between" v-if="isHistoryExist">
                <div>
                    <History_point :responseHistoryPoint='history'></History_point>
                </div>
                <div class="flex flex-row  bottom-0 left-0">
                    <button class="menu_button" @click="previousPageHistory"> &lt;- </button>
                    <button class="menu_button" @click="reset"> reset </button>
                    <button class="menu_button" @click="nextPageHistory"> -> </button>
                </div>
            </div>

        </div>
    </div>
    <div class="chart_place flex  ">
        <div class="canva_box_style">
            <canvas id="acquisitions"></canvas>
        </div>
        <div class="chart_place_button flex flex-col ">
            <button class="menu_button" @click="previousChartMonth">&lt;-</button>
            <button class="menu_button" @click="thisChartMonth">Нынешний месяц</button>
            <button class="menu_button" @click="nextChartMonth">-></button>
        </div>
    </div>
</template>


<script>
import History_point from '../components/History_point.vue'
import {
    sum,
    calculation,
    previousPageHistory,
    nextPageHistory,
    history,
    isHistoryExist,
    lastPoint,
    firstPoint,
    nextChartMonth,
    previousChartMonth,
    thisChartMonth
} from '../hooks/historyTransaction.js'
import { createChart } from '../hooks/chart.js'
import { onMounted } from 'vue'


export default {
    data() {
        return {
        }
    },
    components: {
        History_point
    },
    beforeCreate() {
        if (!localStorage.getItem('sum')) {
            localStorage.setItem('sum', 0)
            localStorage.setItem('numberOfHistoryPoint', 0)
            let history = []
            localStorage.setItem('history', JSON.stringify(history))
        }

    },
    methods: {

        reset() {
            localStorage.clear();
            location.reload()
        }


    },
    setup() {
        onMounted(() => {
            createChart()
        })
        return {
            sum,
            calculation,
            previousPageHistory,
            nextPageHistory,
            history,
            isHistoryExist,
            lastPoint,
            firstPoint,
            createChart,
            nextChartMonth,
            previousChartMonth,
            thisChartMonth
        }
    }

}

</script>

<style lang="scss" scoped>
@import '../assets/pages/mainStyle.scss';

.chart_place_button {
    display: flex;
    flex-direction: row;
    width: 100%;
}
</style>