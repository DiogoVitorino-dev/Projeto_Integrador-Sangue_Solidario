document.getElementById('btnAgendar').addEventListener('click',goToScheduling)

const user = JSON.parse(sessionStorage.getItem('user'))
const pass = sessionStorage.getItem('pass')

function goToScheduling() {
    if (user && pass)
        window.location.href = "../../pages/scheduling/index.html"
    else
        window.location.href = "../../pages/login/login.html"
}