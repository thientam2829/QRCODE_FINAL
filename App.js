import React, { useEffect } from "react";
import { getApps, initializeApp } from "firebase/app";
import AppNavigator from "./components/Navigation";
import { firebaseConfig } from "./firebaseConfig";
import firebase from "firebase/app";
import "firebase/auth";
import { auth } from "./firebaseConfig";
const App = () => {
  const authState = async (userFnc) => {
    onAuthStateChanged(auth, userFnc);
  };

  return <AppNavigator />;
};
export default App;
