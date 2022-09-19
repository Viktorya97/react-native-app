import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { FIREBASE_CONFIG } from './utils/constants';

const fireBase = firebase.apps.length
    ? firebase.app()
    : firebase.initializeApp(FIREBASE_CONFIG)

const auth = firebase.auth()

export { auth, fireBase };
