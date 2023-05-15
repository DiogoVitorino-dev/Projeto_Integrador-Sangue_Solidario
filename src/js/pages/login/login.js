import LoginUserWithEmail from "../../autheticantion/loginUser";
import UserDatabaseDao from "../../database/dao/userDatabaseDao";
import InitializeFirebase from "../../firebase/initFirebase";


function getFormValues() {
    let email, password;
    let form = new FormData(document.getElementById('login-form'));

    for (const par of form.entries()) {
        if (par[0] === "email")
            email = par[1]
        else if (par[0] === "senha")
            password = par[1]
    }

    return {email,password}
}

function disabledButton(disable) {
    let btn = document.getElementById('login-btn')

    if (disable) btn.disabled = true
    else btn.disabled = false
}

function send() {
    const {email,password} = getFormValues()
    disabledButton(true)

    if (email && password)
        LoginUserWithEmail(email,password).then(result => {

            new UserDatabaseDao(firebaseReference).readUserDataDao(result.uid)
            .then(user => {
                sessionStorage.setItem("user",JSON.stringify(user))
                sessionStorage.setItem("pass",password)
                window.location.href = "index.html"
            })

        }).catch(error => alert(error.message))

    disabledButton(false)
}

document.getElementById('login-btn').addEventListener('click',send);
const {firebaseReference} = InitializeFirebase()
