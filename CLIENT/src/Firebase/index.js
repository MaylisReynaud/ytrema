import firebase from "firebase/app";
import "firebase/storage";

 
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDsTv28KpIJR4uTAa5jj_ERD0dZmyqWiD8",
    authDomain: "ytrema-f6e59.firebaseapp.com",
    projectId: "ytrema-f6e59",
    storageBucket: "ytrema-f6e59.appspot.com",
    messagingSenderId: "710243884006",
    appId: "1:710243884006:web:18444b509a6f73cb05d427",
    measurementId: "G-CY5NBXJ7SD"
};
 firebase.initializeApp(firebaseConfig);
// Firebase storage reference
export const storage = firebase.storage();

export  {firebase as default};