import { getAuth } from "firebase/auth";

export default async function LogoutUser(firebaseReference) {
    // Deslogar o usuário
    if (firebaseReference)
        return getAuth(firebaseReference).signOut()

    return false
}
