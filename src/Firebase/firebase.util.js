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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    if(!snapshot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch(error){
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj)
    });
    return await batch.commit();
}

export const convertCollectionSnapshotTOMap = (collections) => {
    const tranformedCollection = collections.docs.map(doc => {
        const {title, items } = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });

    return tranformedCollection.reduce((acc, collection) => {
        acc[collection.title.toLowerCase()] = collection;
        return acc;
    }, {})
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) =>{
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    });
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;