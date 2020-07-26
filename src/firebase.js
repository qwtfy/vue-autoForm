import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyDVXQ1UGQAmgBTf-0adO4RmfLL1qaG4xuE",
    authDomain: "form-test-3fdbe.firebaseapp.com",
    databaseURL: "https://form-test-3fdbe.firebaseio.com",
    projectId: "form-test-3fdbe",
    storageBucket: "form-test-3fdbe.appspot.com",
    messagingSenderId: "517383449060",
    appId: "1:517383449060:web:3ac064c9f56fff1b7bbff1",
    measurementId: "G-X3F4YKNDEC"
});

const db=firebaseApp.firestore();

export{db};