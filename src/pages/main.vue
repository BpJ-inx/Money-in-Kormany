<template>
    <div class="body_main">
        <div class="menu_box">
            <span class="flex flex-row justify-center">Menu</span>
            <div>Добавить:<input type=number class="menu_data_input plus"> </div>
            <div>Вычесть:<input type=number class="menu_data_input minus"> </div>
            <div>Сумма : {{ sum }} </div>
            <button class="menu_button" @click="calculation">Расчитать</button>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sum: +localStorage.getItem('sum'),
        }
    },
    beforeCreate() {
        if (!localStorage.getItem('sum')) {
            localStorage.setItem('sum', 0)
        }
    },
    methods: {
        calculation() {
            let plus = +document.querySelector('.plus').value
            let minus = +document.querySelector('.minus').value
            this.sum = this.sum + plus - minus
            localStorage.setItem('sum', this.sum )
            document.querySelector('.plus').value = ''
            document.querySelector('.minus').value = ''
        },
    },
}

</script>

<style lang="scss" scoped>
@import '../assets/pages/main.scss';
</style>