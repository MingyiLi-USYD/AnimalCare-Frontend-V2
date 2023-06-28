// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD0ajGMy5b9kG9200W6FKq4LymQzdOFh-g",
    authDomain: "petbook-react-springboot.firebaseapp.com",
    projectId: "petbook-react-springboot",
    storageBucket: "petbook-react-springboot.appspot.com",
    messagingSenderId: "1067998688265",
    appId: "1:1067998688265:web:6fb5c31cafb3d7143e34d8",
    measurementId: "G-8WZM98QX14"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {analytics,auth,storage,app}