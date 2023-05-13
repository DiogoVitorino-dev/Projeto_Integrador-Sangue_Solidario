import { initializeApp } from "firebase/app";

export default function InitializeFirebase() {
    //Configuração firebase
    const firebaseConfig = {
        apiKey: "AIzaSyAAk0iV8Yo42BuIXsj5Hdd5L42LmJWW47A",
        authDomain: "siteprojetointegrador2023.firebaseapp.com",
        projectId: "siteprojetointegrador2023",
        storageBucket: "siteprojetointegrador2023.appspot.com",
        messagingSenderId: "570668315011",
        appId: "1:570668315011:web:7214434f3ca2996dc8c6b6",
        measurementId: "G-MPRYFZ7JV5",
        databaseURL: "https://siteprojetointegrador2023-default-rtdb.firebaseio.com",
      };

      // Inicializando Firebase
      return {firebaseReference:initializeApp(firebaseConfig)}
}

