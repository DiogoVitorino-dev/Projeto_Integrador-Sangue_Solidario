import LogoutUser from "../../autheticantion/logoutUser"

const user = JSON.parse(sessionStorage.getItem("user"))

document.getElementById("nomeTextView").innerHTML = "Olá, " + getFirstName()
getLogoutButton()

function getLogoutButton() {
    const btns = document.getElementsByClassName("dropdown-item-logout")

    for (let index = 0; index < btns.length; index++) {
        btns[index].addEventListener("click", onClickLogout)
    }
}

function getFirstName() {
    if (user) return user.fullName.split(/\s/)[0]
    return "Doador"
}

function onClickLogout() {
    sessionStorage.setItem('user','')
    sessionStorage.setItem('pass','')
    LogoutUser().then(() => {
        window.location.href = "index.html"
    })

}