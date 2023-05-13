import { getAuth } from "firebase/auth";
import UserDatabaseDao from "../../database/dao/userDatabaseDao"
import LoginUserWithEmail from "../../autheticantion/loginUser";
import InitializeFirebase from "../../firebase/initFirebase";

function sendToDatabase(date, location, time, currentDateTime) {
    if (date && location && time && currentDateTime) {
        let user = JSON.parse(sessionStorage.getItem('user'))
        const {firebaseReference} = InitializeFirebase()

        LoginUserWithEmail(user.email, sessionStorage.getItem('pass'))
        .then(result => {
            new UserDatabaseDao(firebaseReference)
            .writeBloodDonationDao (
                result.uid,
                time,
                currentDateTime,
                location,
                date
            ).then(() => window.location.href = "../../../../index.html")
        })
    }
}

function getSelectElementValues() {
    const selectTimeValue = document.getElementById('selectTime').value
    const selectLocationValue = document.getElementById('selectLocation').value

    if (selectLocationValue && selectTimeValue)
        return {
            time:selectTimeValue,
            Location:selectLocationValue
        }

    createAlert('Campos obrigatórios não preenchidos')
    return null;
}

function getCurrentDateTime() {
    const d = new Date()
    return d.toLocaleTimeString()

}

function disableButton(buttonElement) {
    buttonElement.disabled = true
}

function createAlert(message){
    alert(message)
}

function verificationDateTime(dateSelected="",timeSelected="") {
    if (dateSelected && timeSelected) {
        const currentDt = new Date()
        const selectedDt = new Date()

        dateSelected= dateSelected.split('/')
        timeSelected= timeSelected.split(':')

        selectedDt.setDate(dateSelected[0])
        selectedDt.setMonth(dateSelected[1] - 1)
        selectedDt.setFullYear(dateSelected[2])
        selectedDt.setHours(timeSelected[0])
        selectedDt.setMinutes(timeSelected[1])

        if (selectedDt.toLocaleString() >= currentDt.toLocaleString())
            return true
    }

    return false
}

function verifyInformation() {
    let date = global.dateSelected
    const select = getSelectElementValues()

    if (select !== null && date) {
        btn.addEventListener('click',()=>disableButton(btn))

        if (verificationDateTime(date,select.time)) {
            sendToDatabase(
                date,
                select.Location,
                select.time,
                getCurrentDateTime()
            )
        } else createAlert("Selecione uma data válida")
    } else createAlert("Selecione uma data")
}

const btn = document.getElementById('doneButton')
btn.addEventListener('click',verifyInformation)
