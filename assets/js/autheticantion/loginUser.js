import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginUserWithEmail(email,password) {
    return new Promise((resolve, reject) => {

        signInWithEmailAndPassword(getAuth(), email, password)
            .then((userCredential) => {
                // Login com sucesso
                resolve(userCredential.user);
            })
            .catch((error) => {
                // Error
                console.log(error.code);
                switch (error.code) {
                    case "auth/user-not-found":
                        reject(new Error("Não existe uma conta registrada nesse email"))
                        break;

                    case "auth/wrong-password":
                        reject(new Error("Senha incorreta, tente novamente."))
                        break;

                    default:
                        reject(new Error("Ocorreu um erro, tente novamente mais tarde"))
                        break;
                }
            });

    })

}

