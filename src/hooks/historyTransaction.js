import { ref } from 'vue'
import { createChart, chart, chooseMonth } from '../hooks/chart.js'


const sum = ref(+localStorage.getItem('sum'))
const firstPoint = ref(0)
const lastPoint = ref(5)
const isHistoryExist = ref(true)
const history = ref(JSON.parse(localStorage.getItem('history')))
if (history.value === null || history.value.length == 0) {
    isHistoryExist.value = false
} else {
    if (history.value.length >= 5) {
        history.value = history.value.slice(history.value.length - lastPoint.value, history.value.length - firstPoint.value)
    } else {
        history.value = JSON.parse(localStorage.getItem('history'))
    }
}

let allHistory = JSON.parse(localStorage.getItem('history'))
if (allHistory) {
    for (let i = 0; i < allHistory.length; i++) {
        sum.value += allHistory[i][2]
        sum.value -= allHistory[i][3]
    }
}



const calculation = () => {
    let plus = +document.querySelector('.plus').value
    let minus = +document.querySelector('.minus').value
    if (plus == 0 && minus == 0) {
        console.log('пустой ввод');
        document.querySelector('.plus').value = ''
        document.querySelector('.minus').value = ''
        return
    } else {
        let allHistory = JSON.parse(localStorage.getItem('history'))

        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1;
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();

        let newDate = [day, month, year]

        let numberOfHistoryPoint = localStorage.getItem('numberOfHistoryPoint')
        numberOfHistoryPoint++
        localStorage.setItem('numberOfHistoryPoint', numberOfHistoryPoint)

        isHistoryExist.value = true
        sum.value = sum.value + plus - minus
        localStorage.setItem('sum', sum.value)
        document.querySelector('.plus').value = ''
        document.querySelector('.minus').value = ''

        allHistory.push([numberOfHistoryPoint, newDate, plus, minus]);
        localStorage.setItem('history', JSON.stringify(allHistory))


        if (allHistory.length >= 5) {
            history.value = allHistory.slice(allHistory.length - lastPoint.value, allHistory.length - firstPoint.value)
        } else {
            history.value = JSON.parse(localStorage.getItem('history'))
        }


    }
    chart.value.destroy();
    createChart()


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

const nextChartMonth = () => {

    let newDataHistory = JSON.parse(localStorage.getItem('history'))
    let months = new Set()
    newDataHistory.map(function (item) {
        months.add(item[1][1])
    })

    if (months.has(chooseMonth.value + 2)) {
        chart.value.destroy();
        ++chooseMonth.value
        createChart()
    }

}

const previousChartMonth = () => {
    let newDataHistory = JSON.parse(localStorage.getItem('history'))
    let months = new Set()
    newDataHistory.map(function (item) {
        months.add(item[1][1])
    })

    if (months.has(chooseMonth.value)) {
        chart.value.destroy();
        --chooseMonth.value
        createChart()
    }
}
const thisChartMonth = () => {
    if (chooseMonth.value != new Date().getUTCMonth()) {
        chart.value.destroy();
        chooseMonth.value = new Date().getUTCMonth()
        createChart()
    }
}


const deleteHistoryPoint = (point) => {
    sum.value = localStorage.getItem('sum')
    let allHistory = JSON.parse(localStorage.getItem('history'))
    allHistory.map((item) => {
        if (item[0] == point) {
            sum.value -= item[2]
            sum.value += item[3]
        }
    })
    allHistory = allHistory.filter(item => item[0] != point)

    localStorage.setItem('history', JSON.stringify(allHistory))

    if (allHistory.length >= 5) {
        history.value = allHistory.slice(allHistory.length - lastPoint.value, allHistory.length - firstPoint.value)
    } else {
        history.value = JSON.parse(localStorage.getItem('history'))
    }
    localStorage.setItem('sum', sum.value)
    chart.value.destroy();
    createChart()
}

export {
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
    thisChartMonth,
    deleteHistoryPoint
}    