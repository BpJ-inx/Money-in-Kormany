import Chart from 'chart.js/auto';
import { ref } from 'vue';
import { firstPoint, lastPoint } from '../hooks/historyTransaction.js'



const days = ref([])
const money = ref([])
const chart = ref([])

function getDataHistory() {
    const newDataHistory = JSON.parse(localStorage.getItem('history'))
    // if (newDataHistory.length >= 5) {
    //     newDataHistory = newDataHistory.slice(newDataHistory.length - lastPoint.value, newDataHistory.length - firstPoint.value)
    // }
    let sum = 0

    //[[1,22,1,0],[2,23,1,0],[2,24,1,0],[2,25,1,0],[2,26,1,0],[2,27,1,0],[2,28,1,0],[2,29,1,0],[2,30,1,0],[2,31,1,0]]
    if (newDataHistory) {
        let lastDay = 0
        money.value = []
        days.value = []

        newDataHistory.map(function (item) {

            if (lastDay != item[1]) {
                lastDay = item[1]
                days.value.push(`Day ${item[1]}`)
                if (item[2]) {
                    sum = sum + item[2]
                    if (item[3]) {
                        sum = sum - item[3]
                    }
                    money.value.push(sum)
                } else if (item[3]) {
                    sum = sum - item[3]
                    money.value.push(sum)
                } else {
                    money.value.push(sum)
                }
            } else {
                if (item[2]) {
                    sum = sum + item[2]
                    let perDay = item[2]
                    if (item[3]) {
                        sum = sum - item[3]
                        perDay = perDay - item[3]
                    }
                    money.value[money.value.length - 1] += perDay
                } else if (item[3]) {
                    sum = sum - item[3]
                    money.value[money.value.length - 1] -= item[3]
                } else {
                    // money.value[money.length-1]=+sum
                }
            }


        });

    }
}

const createChart = () => {
    getDataHistory()
    // const MONTHS = [
    //     'January',
    //     'February',
    //     'March',
    //     'April',
    //     'May',
    //     'June',
    //     'July',
    //     'August',
    //     'September',
    //     'October',
    //     'November',
    //     'December'
    // ];




    chart.value = new Chart(
        document.querySelector('#acquisitions'),
        {
            type: 'line',
            data: {
                labels: days.value.map(row => row),
                datasets: [
                    {
                        label: 'Балланс',

                        data: money.value,
                        backgroundColor: 'rgb(39, 255, 39)',
                        borderColor: 'rgb(19, 100, 19)',
                        pointStyle: 'circle',
                        pointRadius: 5,
                        pointHoverRadius: 10,
                        tension: 0.3,


                    }
                ]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }

        }
    );


}





export {
    createChart,
    chart
}

