import { getAuth, inMemoryPersistence, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginUserWithEmail(email,password) {
    return new Promise((resolve, reject) => {
        let auth = getAuth()
        auth.setPersistence(inMemoryPersistence)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Login com sucesso
                resolve(userCredential.user);
            })
            .catch(error => {
                // Error
                switch (error.code) {
                    case "auth/user-not-found":
                        reject(new Error("Não existe uma conta registrada nesse email"))
                        break;

                    case "auth/invalid-email":
                        reject(new Error("Email ou senha incorreta. Digite o email e a senha corretas e tente novamente."))
                        break;

                    case "auth/wrong-password":
                        reject(new Error("Email ou senha incorreta. Digite o email e a senha corretas e tente novamente."))
                        break;

                    case "auth/too-many-requests":
                        reject(new Error("Muitas tentativas incorretas, por favor, tente novamente mais tarde"))
                        break;

                    default:
                        reject(new Error("Ocorreu um erro, tente novamente mais tarde"))
                        break;
                }
            });

    })

}

