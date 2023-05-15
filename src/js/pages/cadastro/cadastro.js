import { CreateUserWithEmail } from "../../autheticantion/createUser";
import { verifyCpf, verifyFullName } from "../../autheticantion/verifiyCredential";
import UserDatabaseDao from "../../database/dao/userDatabaseDao";
import InitializeFirebase from "../../firebase/initFirebase";
import User from "../../models/userModel";

function getFormValues() {
    return new Promise((resolve,reject) => {
        const userData = new User()
        let password,checkPassword

        let form = document.getElementsByClassName('form-cadastro')[0].querySelector('form')
        form = new FormData(form)

        let select = document.getElementsByClassName('form-cadastro')[0].querySelectorAll('select')

        if (form && select) {

            for (const par of form.entries()) {

                switch (par[0]) {
                    case "Nome Completo":
                        if (par[1])
                            userData.fullName = par[1]
                        else
                            reject(new Error("Informe seu nome completo, por favor."))
                        break;

                    case "CPF":
                        if (par[1])
                            userData.cpf = par[1]
                        else
                            reject(new Error("Informe seu CPF, por favor."))
                        break;

                    case "email":
                        if (par[1])
                            userData.email = par[1]
                        else
                            reject(new Error("Informe seu Email, por favor."))
                        break;

                    case "tel":
                        if (par[1])
                            userData.telNumber = par[1]
                        else
                            reject(new Error("Informe seu numero de telefone, por favor."))
                        break;

                    case "Data de nascimento":
                        if (par[1])
                            userData.birthdayDate = par[1]
                        else
                            reject(new Error("Informe sua data de nascimnto, por favor."))
                        break;

                    case "password":
                        if (par[1])
                            password = par[1]
                        else
                            reject(new Error("Informe uma senha."))
                        break;

                    case "checkPassword":
                        if (par[1])
                            checkPassword = par[1]
                        else
                            reject(new Error("Confirme sua senha."))
                        break;

                }
            }

            select.forEach(selectElement => {
                switch (selectElement.id) {
                    case "FatorRH":
                        if (selectElement.value)
                            userData.rhFactor = selectElement.value
                        else
                            reject(new Error("Informe seu fator RH, por favor."))
                        break;

                    case "tipoSanguineo":
                        if (selectElement.value)
                            userData.bloodType = selectElement.value
                        else
                            reject(new Error("Informe seu tipo sanguíneo, por favor."))
                        break;

                    case "genero":
                        if (selectElement.value)
                            userData.genre = selectElement.value
                        else
                            reject(new Error("Informe seu gênero, por favor."))
                        break;
                }

            })
            resolve({userData,password,checkPassword})

        } else
            reject(new Error("Ocorreu um erro, Tente novamente mais tarde."))

    })
}

const createAlert = message => alert(message);

const checkPassword = (password,confirmPassword) => password === confirmPassword

const  checkTerms = () => document.getElementById("Termos").checked

function createAccount() {
    getFormValues().then(result => new Promise((resolve,reject) => {

        if (!checkPassword(result.password,result.checkPassword))
            reject(new Error("As senhas não coincidem"))

        if (!checkTerms())
            reject(new Error("Você precisa aceita os Termos"))

        Promise.all([verifyFullName(result.userData.fullName),
            verifyCpf(result.userData.cpf)])
            .then(() => {
                const {firebaseReference} = InitializeFirebase()

                CreateUserWithEmail(result.userData.email,result.password)
                .then(user => {
                    result.userData.userId = user.uid

                    new UserDatabaseDao(firebaseReference)
                    .writeUserDataDao(
                        result.userData.userId,
                        result.userData.fullName,
                        result.userData.cpf,
                        result.userData.email,
                        result.userData.telNumber,
                        result.userData.birthdayDate,
                        result.userData.genre,
                        result.userData.rhFactor,
                        result.userData.bloodType
                    )
                    .then(() => resolve({user:result.userData,password:result.password}))
                    .catch(error => reject(error))
                })
                .catch(error => reject(error))

            })
            .catch(error => reject(error))

    })).then(result => {
        sessionStorage.setItem("user",JSON.stringify(result.user))
        sessionStorage.setItem("pass",result.password)
        window.location.href = "homeUser.html"

    }).catch(error => createAlert(error.message))
}

document.getElementById("doneBtn").addEventListener("click", createAccount)