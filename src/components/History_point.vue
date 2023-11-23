<template>
    <div class='flex gap-1' v-for="point in responseHistoryPoint.slice().reverse()" :key="point[0]">
        <div> {{ point[1][0] }}.{{ point[1][1] }}.{{ point[1][2] }} : </div>
        <div>
            <span v-if="point[2] > 0">приход {{ point[2] }}</span>
            <span v-if="point[3] > 0 && point[2] > 0">,</span>
            <span v-if="point[3] > 0"> расход {{ point[3] }} </span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        responseHistoryPoint: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped></style>