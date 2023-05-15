document.getElementsByClassName('btn-banner')[0].addEventListener('click',goToScheduling)

const user = sessionStorage.getItem('user')
const pass = sessionStorage.getItem('pass')

if (user && pass) window.location.href = "homeUser.html"

function goToScheduling() {
    if (user && pass)
        window.location.href = "scheduling.html"
    else
        window.location.href = "login.html"
}