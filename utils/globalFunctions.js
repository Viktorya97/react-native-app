import {EMAIL_REGEXP} from "./constants";

export const validateEmail = (email) => {
    const sanitizedEmail = email?.trim()

    if (sanitizedEmail.length === 0) {
        return {isValid: false, errorMessage: 'Email is required.'}
    } else if (sanitizedEmail.length < 6) {
        return {isValid: false, errorMessage: 'Email should be minimum 6 characters.'}
    } else if (EMAIL_REGEXP.test(sanitizedEmail) === false) {
        return {isValid: false, errorMessage: 'Email is not correct.'}
    } else {
        return {isValid: true, errorMessage: ''}
    }
}

export const validatePassword = (password) => {
    const sanitizedPass = password?.trim()

    if (sanitizedPass.length === 0) {
        return {isValid: false, errorMessage: 'Password is required.'}
    } else if (sanitizedPass.length < 6) {
        return {isValid: false, errorMessage: 'Password should be minimum 6 characters.'}
    } else {
        return {isValid: true, errorMessage: ''}
    }
}
