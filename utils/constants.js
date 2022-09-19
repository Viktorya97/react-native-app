export const EMAIL_REGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

export const FIREBASE_EMAIL_ERRORS = {
    'auth/email-already-in-use': 'This email address is already exists.',
    'auth/invalid-email': 'The email address is not valid.',
    'auth/user-disabled': 'The user corresponding to the given email has been disabled.',
    'auth/user-not-found': 'There is no user corresponding to the given email.',
}

export const FIREBASE_PASSWORD_ERRORS = {
    'auth/weak-password' : 'The password is too weak.',
    'auth/wrong-password': 'The password is invalid for the given email.'
}

export const DEFAULT_REGISTRATION_ERROR = 'Something went wrong during registration'
export const DEFAULT_AUTHENTICATION_ERROR = 'Something went wrong during authentication'

export const FIREBASE_CONFIG = {
    apiKey: 'AIzaSyCT0PHdtTt3BF6qvbraAuHF7wWWLOyiB8M',
    authDomain: 'auth-firebase-7fd3a.firebaseapp.com',
    projectId: 'auth-firebase-7fd3a',
    storageBucket: 'auth-firebase-7fd3a.appspot.com',
    messagingSenderId: '12107418163',
    appId: '1:12107418163:web:5f5a57f29b826649653146'
};