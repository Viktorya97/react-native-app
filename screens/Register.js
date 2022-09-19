import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { validateEmail, validatePassword } from '../utils/globalFunctions';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [emailValid, setEmailValid] = useState(true)
    const [passwordValid, setPasswordValid] = useState(true)

    const navigation = useNavigation();

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate('Dashboard');
            }
        })
    }, [])

    const onPressSignUp = async () => {
        const validEmail = validateEmail(email)
        const validPass = validatePassword(password)

        setEmailError(validEmail.errorMessage)
        setEmailValid(validEmail.isValid)

        setPasswordError(validPass.errorMessage)
        setPasswordValid(validPass.isValid)

        if (emailValid && passwordValid) {
            try {
                const userCredentials = await auth.createUserWithEmailAndPassword(email, password)
                const user = await userCredentials.user;
                console.log('Logged in with: ', user.email);
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    setEmailError('This email address is already exists.')
                }

                if (error.code === 'auth/invalid-email') {
                    setEmailError('This email address is invalid.')
                }

                if (error.code === 'auth/weak-password') {
                    setEmailError('The password is too weak.');
                }

                console.error('error:', error.message);
            }
        }
    }

    return (
        <View style={styles.registerPage}>
            <ScrollView
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={styles.containerContent}>
                <KeyboardAvoidingView enabled>
                    <View style={styles.sectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            value={email}
                            onChangeText={(userEmail) => setEmail(userEmail)}
                            underlineColorAndroid='#f000'
                            placeholder='Enter Email'
                            placeholderTextColor='#8b9cb5'
                            keyboardType='email-address'
                            returnKeyType='next'
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.sectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(userPassword) =>
                                setPassword(userPassword)
                            }
                            underlineColorAndroid='#f000'
                            placeholder='Enter Password'
                            placeholderTextColor='#8b9cb5'
                            returnKeyType='next'
                            secureTextEntry={true}
                            blurOnSubmit={false}
                        />
                    </View>

                    {emailError.length > 0 &&
                        <Text style={styles.errorTextStyle}>{emailError}</Text>
                    }
                    {passwordError.length > 0 &&
                        <Text style={styles.errorTextStyle}>{passwordError}</Text>
                    }

                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={onPressSignUp}>
                        <Text style={styles.buttonTextStyle}>REGISTER</Text>
                    </TouchableOpacity>

                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    registerPage: {
        flex: 1,
        backgroundColor: '#307ecc',
    },
    containerContent: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    sectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
})