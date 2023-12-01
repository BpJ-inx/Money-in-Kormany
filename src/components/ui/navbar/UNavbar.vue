<template>
    <nav class="navbar lg:px-4 flex flex-wrap lg:py-2">
        <label class="navbar_label pr-1">
            <img src="/label.png" class="mr-2">
            <!-- <img src="/name.png" class="pt-1" alt="Momey In Кормане"> -->
            <span class="flex m-auto">Money In Кормане</span>
        </label>
        <div class="nav_button_place">
            <button class="nav_button" @click="changeTypeChart('line')">График баланса</button>
            <button class="nav_button" @click="changeTypeChart('bar')">График сравение дохода/расхода</button>
        </div>
    </nav>
</template>
  
<script>
import { changeTypeChart } from '../../../hooks/chart'

export default {
    name: 'navbar',

    setup() {
        return {
            changeTypeChart
        }
    }
}



</script>
  
<style lang="scss" scoped>
@import '../../../assets/compmonents/navbarStyle.scss';
</style>
  
  
  
  
  
  
    