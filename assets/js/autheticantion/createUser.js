import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { verifyEmail, verifyPassword } from "./verifiyCredential";

export function CreateUserWithEmail(email,password) {
  // Verificar regras de formulação para email e senha
  return Promise.all([verifyEmail(email),verifyPassword(password)])

    .then(() => new Promise((resolve,reject) => {

      createUserWithEmailAndPassword(getAuth(), email, password)
        .then(userCredential => {
          resolve(userCredential) // Cadastro com sucesso
        })
        .catch(error => {
          // Error
          switch (error.code) {
            case "auth/invalid-email":
                reject(new Error("Email não e válido"))
                break;

            case "auth/email-already-in-use":
                reject(new Error("Já existe uma conta registrada neste email!"))
                break;

            default:
                reject(new Error("Ocorreu um erro, tente novamente mais tarde"))
                break;
          }
        })
      })
    )
}