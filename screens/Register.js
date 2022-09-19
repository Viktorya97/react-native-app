import React from 'react';
import { auth } from '../firebase';

import {
    DEFAULT_REGISTRATION_ERROR,
    FIREBASE_EMAIL_ERRORS,
    FIREBASE_PASSWORD_ERRORS
} from '../utils/constants';
import AuthForm from '../components/AuthForm';

const Register = () => {

    const onPressSignUp = async (email, password, setEmailError, setPasswordError) => {
         try {
            await auth.createUserWithEmailAndPassword(email, password);
        } catch (error) {
            if (FIREBASE_EMAIL_ERRORS[error?.code]) {
                setEmailError(FIREBASE_EMAIL_ERRORS[error?.code]);
            } else if (FIREBASE_PASSWORD_ERRORS[error?.code]) {
                setPasswordError(FIREBASE_PASSWORD_ERRORS[error?.code]);
            } else {
                setEmailError(DEFAULT_REGISTRATION_ERROR);
            }
        }
    }

    return <AuthForm callback={onPressSignUp} type={'register'} />
}

export default Register