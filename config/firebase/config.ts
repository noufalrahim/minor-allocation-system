import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4PK837n_LqEK2nNfp3FeIu3FMXHLkYYM",
  authDomain: "minor-allotment-system-4761d.firebaseapp.com",
  projectId: "minor-allotment-system-4761d",
  storageBucket: "minor-allotment-system-4761d.appspot.com",
  messagingSenderId: "458005383403",
  appId: "1:458005383403:web:7ae0cf591a8f75f81c16ae",
  measurementId: "G-LDRMR8J58D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };