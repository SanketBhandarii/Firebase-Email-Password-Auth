import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
export const db = getFirestore(app);

const firebaseAuth = getAuth(app);

export const Firebase = createContext();

export const useFirebase = () => useContext(Firebase);

const FireBaseProvider = (props) => {
  const signUpWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };
  const loginWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };
  const logout = () => {
    return signOut(firebaseAuth);
  };
  return (
    <Firebase.Provider
      value={{
        signUpWithEmailAndPassword,
        loginWithEmailAndPassword,
        logout,
        firebaseAuth,
      }}
    >
      {props.children}
    </Firebase.Provider>
  );
};

export default FireBaseProvider;
