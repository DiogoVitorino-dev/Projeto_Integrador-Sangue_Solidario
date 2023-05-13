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

