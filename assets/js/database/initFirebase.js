// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export default function InitializeFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyAAk0iV8Yo42BuIXsj5Hdd5L42LmJWW47A",
        authDomain: "siteprojetointegrador2023.firebaseapp.com",
        projectId: "siteprojetointegrador2023",
        storageBucket: "siteprojetointegrador2023.appspot.com",
        messagingSenderId: "570668315011",
        appId: "1:570668315011:web:7214434f3ca2996dc8c6b6",
        measurementId: "G-MPRYFZ7JV5"
      };

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
      return analytics
}

