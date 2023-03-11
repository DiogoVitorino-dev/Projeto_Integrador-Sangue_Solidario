import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginUserWithEmail(email,password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Login com sucesso
            return userCredential.user;
        })
        .catch((error) => {
            // Error
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

