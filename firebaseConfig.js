import { initializeApp } from "firebase/app";
import { getFirestore, collection,doc, addDoc, getDoc,updateDoc } from "firebase/firestore";
import {  query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB5kN9BmoXnJLBozGf_gyw5EAtnE0KT3kQ",
  authDomain: "qrcode-c6f21.firebaseapp.com",
  databaseURL:
    "https://qrcode-c6f21-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "qrcode-c6f21",
  storageBucket: "qrcode-c6f21.appspot.com",
  messagingSenderId: "369629935562",
  appId: "1:369629935562:web:8a71c3790db58493f90133",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const database = getFirestore(app);
const getNameFromFirestore = async (email) => {
  const db = getFirestore();
  const usersCollection = collection(db, "USER"); 
  const q = query(usersCollection, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.size > 0) {
    
    const user = querySnapshot.docs[0].data();
    return user.name;
  } else {
    console.error("User not found in the database.");
    return null;
  }
};
const getPhoneFromFirestore = async (email) => {
  const db = getFirestore();
  const usersRef = collection(db, 'USER'); 

  const q = query(usersRef, where('email', '==', email));

  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      return userData.phone; 
    } else {
      console.error('User not found in Firestore.');
      return null;
    }
  } catch (error) {
    console.error('Error getting phone from Firestore:', error);
    throw error;
  }
};
const firestore = getFirestore(app);

export { firestore };
export { getPhoneFromFirestore };
export { getNameFromFirestore };
export { addDoc, db, collection, auth };
export { database };