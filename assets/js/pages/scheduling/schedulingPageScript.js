function createOptionsItem(text,value) {
    const item = document.createElement('option')
    item.innerHTML = text
    item.value = value
    return item
}

function assignOptionOnSelect(item=[],id) {
    const select = document.getElementById(id)

    if (item.length) { // Lista
        item.forEach(element => {
            select.appendChild(element)
        })
    } else // Item unico
        select.appendChild(item)

}

function createListOptionItem(values = []) {
    const listItem = []
    values.forEach(place => {
        listItem.push(createOptionsItem(place,place))
    })

    return listItem
}

function createTimeList(startHour, startMinute, endHour, endMinute, step) {
    return new Promise((resolve) => {
        const d = new Date(2008, 4 + 1, 0,startHour,startMinute);
        const dEnd = new Date(2008, 4 + 1, 0,endHour,endMinute);

        const listTime = []

        while (d.toLocaleTimeString() <= dEnd.toLocaleTimeString()) {
            let localeTime = d.toLocaleTimeString();
            let timeFormated = localeTime.substring(0,localeTime.lastIndexOf(':'))
            listTime.push(timeFormated)

            d.setMinutes(d.getMinutes() + step)
        }
        resolve(listTime);
    })
}

function schudelingOptionsEntries() {
    const locationsItems = createListOptionItem(['HEMOPE','IHENE','GSH'])
    assignOptionOnSelect(locationsItems,'selectLocation')

    createTimeList(8,0,18,0,30).then(listTime =>{
        const items = createListOptionItem(listTime)
        assignOptionOnSelect(items,'selectTime')
    })

}

schudelingOptionsEntries()