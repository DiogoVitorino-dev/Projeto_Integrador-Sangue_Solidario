function lastDayMouth(month,year) {
    var d = new Date(year, month, 0);
    return {lastDay:d.getDate(),dayOfWeek:d.getDay()}
}

function getFirstDayOfweekOnMonth(month,year) {
    var d = new Date(year, month - 1, 1);
    return d.getDay()
}

function adjustFirstDayPosition(dayOfWeekNumber) {
    let count = 0
    let adjustElements = []

    while (count < dayOfWeekNumber) {
        const element = document.createElement("div")
        element.className = "adjust-dayOfMonth"
        adjustElements.push(element)
        count++
    }
    return adjustElements
}

function generateListDaysOfMonth(month,year) {
    const {lastDay} = lastDayMouth(month,year)

    let dayCount = 1
    let dayList = []

    while (dayCount <= lastDay) {
        dayList.push({
            day:dayCount,
            fullDate:`${dayCount}/${month}/${year}`,
        })
        dayCount++
    }

    return dayList
}

function onClickDayOfMonthItem() {
    replaceDateSelected()
    this.className = String(this.className).replace("btn-calendar","btn-selected")
    global.dateSelected = String(this.value)
}

function replaceDateSelected() {
    let itemSelected = document.getElementsByClassName("btn-selected")[0]

    if(itemSelected) {
        let classes = String(itemSelected.className).replace("btn-selected","btn-calendar")
        itemSelected.className =  classes;
    }
}

function createDayOfMonthContainer(){
    let ct = document.createElement('div')
    ct.className = "containerBtn"
    return ct
}

function createDayOfMonthItems(daysOfMonthList=[]){
    if (daysOfMonthList.length > 0) {

        daysOfMonthList = daysOfMonthList.map(element => {
            let btn = document.createElement('button')

            btn.innerHTML = element.day
            btn.value = element.fullDate
            btn.className="btn-calendar"
            btn.addEventListener("click",onClickDayOfMonthItem)

            let container = createDayOfMonthContainer()
            container.appendChild(btn)

            return container
        })

        let adjustElements = adjustFirstDayPosition(
            getFirstDayOfweekOnMonth(month,year)
        )
        adjustElements = adjustElements.concat(daysOfMonthList)

        return adjustElements
    }

    return null

}

function assignListItems(list=[], nodeFather) {
    if (list.length)
        list.forEach(element => nodeFather.appendChild(element));
}

function createMonth(monthValue,yearValue){
    if (!document.getElementById("container-dayOfMonth")) {
        const daysOfMonth = generateListDaysOfMonth(monthValue,yearValue)
        const items = createDayOfMonthItems(daysOfMonth)

        const element = document.createElement("div")
        element.id = "container-dayOfMonth"
        assignListItems(items, element)

        document.getElementById('month').appendChild(element)
    }

}

function removeCurrentMonth() {
    document.getElementById("month").removeChild(document.getElementById("container-dayOfMonth"))

}

function onclickNextMonth(step) {
    if (month) {
        month += step
        verificationMonth()
        removeCurrentMonth()
        updateCalendarText()
        createMonth(month,year)
    }
}

function verificationMonth() {
    if (month > 12) {
        month = 1
        year += 1
    } else if(month < 1) {
        month = 12
        year-=1
    }
}

function updateCalendarText() {
    document.getElementById("month-text").innerHTML = getMonthFullName(month)
    document.getElementById("year-text").innerHTML = year
}

function getMonthFullName(monthNumber) {
    return nomeMeses[monthNumber - 1]
}

function assignClickListenerButton() {
    document.getElementById("prevMonthBtn")
    .addEventListener("click",() => onclickNextMonth(-1))

    document.getElementById("nextMonthBtn")
    .addEventListener("click", () => onclickNextMonth(1))
}

let month,year
let nomeMeses = ["Janeiro","Fevereiro","Março","Abril","Maio","Julho","Junho","Agosto","Setembro","Outobro","Novembro","Dezembro"]


if (!month && !year) {
    const t = new Date()
    month = t.getMonth() + 1
    year = t.getFullYear()

    assignClickListenerButton()
    createMonth(month,year)
    updateCalendarText()
}
