import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBi1vvBQVuiCFjWCL0csODmC23sttWU91g",
    authDomain: "crwn-db-c9e78.firebaseapp.com",
    databaseURL: "https://crwn-db-c9e78.firebaseio.com",
    projectId: "crwn-db-c9e78",
    storageBucket: "crwn-db-c9e78.appspot.com",
    messagingSenderId: "360597554450",
    appId: "1:360597554450:web:7a66d7dec61c304c389fcb",
    measurementId: "G-1VQCCQE929"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user, error.message');
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' }) ;
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;