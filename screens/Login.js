import React from 'react';
import { auth } from '../firebase';

import { DEFAULT_AUTHENTICATION_ERROR, FIREBASE_EMAIL_ERRORS, FIREBASE_PASSWORD_ERRORS } from '../utils/constants';
import AuthForm from '../components/AuthForm';

const Login = () => {

    const onPressLogin = async (email, password, setEmailError, setPasswordError) => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            if (FIREBASE_EMAIL_ERRORS[error?.code]) {
                setEmailError(FIREBASE_EMAIL_ERRORS[error?.code]);
            } else if (FIREBASE_PASSWORD_ERRORS[error?.code]) {
                setPasswordError(FIREBASE_PASSWORD_ERRORS[error?.code]);
            } else {
                setEmailError(DEFAULT_AUTHENTICATION_ERROR);
            }
        }
    }

    return <AuthForm callback={onPressLogin} type={'login'} />
}

export default Login