import { getAuth } from "firebase/auth";

export default function LogoutUser() {
    // Deslogar o usuário
    getAuth().signOut()
}
