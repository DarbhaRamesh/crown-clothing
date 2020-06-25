import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBIyHutZ_-6ob8PKiGtr_l52uQbEd6R3-U",
    authDomain: "crown-clothing-c1ded.firebaseapp.com",
    databaseURL: "https://crown-clothing-c1ded.firebaseio.com",
    projectId: "crown-clothing-c1ded",
    storageBucket: "crown-clothing-c1ded.appspot.com",
    messagingSenderId: "418697605162",
    appId: "1:418697605162:web:2ef62a3a63996dc0989353",
    measurementId: "G-P0VC9EEVD2"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;