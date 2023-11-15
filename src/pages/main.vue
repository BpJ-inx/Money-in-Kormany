<template>
    <div class="body_main">
        <div class="menu_box">
            <span class="flex flex-row justify-center">Menu</span>
            <div>Добавить:<input type=number class="menu_data_input plus"> </div>
            <div>Вычесть:<input type=number class="menu_data_input minus"> </div>
            <div>Сумма : {{ sum }} </div>
            <button class="menu_button" @click="calculation">Расчитать</button>

        </div>
        <div class="history_box">
            <span class="flex flex-row justify-center">History</span>
            <div v-if="isHistoryExist">
                <History_point :responseHistoryPoint='history'></History_point>
            </div>

        </div>
    </div>
</template>

<script>
import History_point from '../components/History_point.vue'
export default {
    data() {
        return {
            sum: +localStorage.getItem('sum'),

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
        calculation() {
            let plus = +document.querySelector('.plus').value
            let minus = +document.querySelector('.minus').value
            let history = JSON.parse(localStorage.getItem('history'))
            let day = new Date().getDate()
            let numberOfHistoryPoint = localStorage.getItem('numberOfHistoryPoint')
            numberOfHistoryPoint++
            localStorage.setItem('numberOfHistoryPoint', numberOfHistoryPoint)

            this.isHistoryExist = true
            this.sum = this.sum + plus - minus
            localStorage.setItem('sum', this.sum)
            document.querySelector('.plus').value = ''
            document.querySelector('.minus').value = ''

            history.push([numberOfHistoryPoint,day, plus, minus]);

            localStorage.setItem('history', JSON.stringify(history))
            this.history = JSON.parse(localStorage.getItem('history'))
        },
    },
    setup() {
        let history = JSON.parse(localStorage.getItem('history'))
        let isHistoryExist = true

        if (history === null) {
            isHistoryExist = false
        }
        return {
            history,
            isHistoryExist
        }
    }

}

</script>

<style lang="scss" scoped>
@import '../assets/pages/mainStyle.scss';
</style>