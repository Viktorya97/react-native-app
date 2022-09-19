import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyCT0PHdtTt3BF6qvbraAuHF7wWWLOyiB8M',
    authDomain: 'auth-firebase-7fd3a.firebaseapp.com',
    projectId: 'auth-firebase-7fd3a',
    storageBucket: 'auth-firebase-7fd3a.appspot.com',
    messagingSenderId: '12107418163',
    appId: '1:12107418163:web:5f5a57f29b826649653146'
};

let fireBase;
if (firebase.apps.length === 0) {
    fireBase = firebase.initializeApp(firebaseConfig);
} else {
    fireBase = firebase.app()
}

const auth = firebase.auth()

export { auth, fireBase };
