import { ref } from 'vue'


const sum = ref(+localStorage.getItem('sum'))
const firstPoint = ref(0)
const lastPoint = ref(5)
const isHistoryExist = ref(true)
const history = ref(JSON.parse(localStorage.getItem('history')))
if (history.value === null) {
    isHistoryExist.value = false
} else {
    if (history.value.length >= 5) {
        history.value = history.value.slice(history.value.length - lastPoint.value, history.value.length - firstPoint.value)
    } else {
        history.value = JSON.parse(localStorage.getItem('history'))
    }
}






const calculation = () => {
    let plus = +document.querySelector('.plus').value
    let minus = +document.querySelector('.minus').value
    if (plus == 0 && minus == 0) {
        console.log('пустой ввод');
        document.querySelector('.plus').value = ''
        document.querySelector('.minus').value = ''
    } else {
        let allHistory = JSON.parse(localStorage.getItem('history'))
        let day = new Date().getDate()

        let numberOfHistoryPoint = localStorage.getItem('numberOfHistoryPoint')
        numberOfHistoryPoint++
        localStorage.setItem('numberOfHistoryPoint', numberOfHistoryPoint)

        isHistoryExist.value = true
        sum.value = sum.value + plus - minus
        localStorage.setItem('sum', sum.value)
        document.querySelector('.plus').value = ''
        document.querySelector('.minus').value = ''

        allHistory.push([numberOfHistoryPoint, day, plus, minus]);
        localStorage.setItem('history', JSON.stringify(allHistory))


        if (allHistory.length >= 5) {
            history.value = allHistory.slice(allHistory.length - lastPoint.value, allHistory.length - firstPoint.value)
        } else {
            history.value = JSON.parse(localStorage.getItem('history'))
        }


    }
}

const nextPageHistory = () => {
    let allHistory = JSON.parse(localStorage.getItem('history'))
    if (lastPoint.value - allHistory.length < 0) {


        firstPoint.value += 5
        lastPoint.value += 5
        let testkLastPoint = lastPoint.value
        if (lastPoint.value > allHistory.length) {
            lastPoint.value = allHistory.length
        }

        history.value = allHistory.slice(allHistory.length - lastPoint.value, allHistory.length - firstPoint.value)
        lastPoint.value = testkLastPoint
    }

}
const previousPageHistory = () => {
    if (firstPoint.value - 5 >= 0) {
        firstPoint.value -= 5
        lastPoint.value -= 5

        let allHistory = JSON.parse(localStorage.getItem('history'))
        history.value = allHistory.slice(allHistory.length - lastPoint.value, allHistory.length - firstPoint.value)
    }
}

export {
    sum,
    calculation,
    previousPageHistory,
    nextPageHistory,
    history,
    isHistoryExist,
    lastPoint,
    firstPoint
}    