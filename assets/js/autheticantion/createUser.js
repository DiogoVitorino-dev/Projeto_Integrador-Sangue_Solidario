import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { verifyEmail, verifyPassword } from "./verifiyCredential";

export function CreateUserWithEmail(email,password) {
  const auth = getAuth();

  // Verificar regras de formulação para email e senha
  return Promise.all([verifyEmail(email),verifyPassword(password)])
    .then(() => {

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Cadastro com sucesso
          const user = userCredential.user;
          return user
        })
        .catch((error) => {
          // Error
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode)
          console.log(errorMessage)
        });

      }).catch(error => {
        console.log(error)
      })
}
