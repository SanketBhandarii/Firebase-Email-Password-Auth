import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);

export const Firebase = createContext();

export const useFirebase = () => useContext(Firebase);

const FireBaseProvider = (props) => {
  const signUpWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password)
  };
  const loginWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };
  return (
    <Firebase.Provider
      value={{ signUpWithEmailAndPassword, loginWithEmailAndPassword }}
    >
      {props.children}
    </Firebase.Provider>    
  );
};

export default FireBaseProvider;
