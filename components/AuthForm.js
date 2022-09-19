import React, { useEffect, useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';

import { validateEmail, validatePassword } from '../utils/globalFunctions';

const AuthForm = ({callback, type}) => {
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

    const handleCallback = () => {
        const validEmail = validateEmail(email)
        const validPass = validatePassword(password)

        setEmailError(validEmail.errorMessage)
        setEmailValid(validEmail.isValid)

        setPasswordError(validPass.errorMessage)
        setPasswordValid(validPass.isValid)

        if (emailValid && passwordValid) {
            callback(email, password, setPasswordError)
        }
    }

    return (
        <View style={styles.mainBody}>
            <ScrollView
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={styles.containerContent}>
                <View>
                    <KeyboardAvoidingView enabled>
                        <View style={styles.sectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                value={email}
                                onChangeText={text => setEmail(text)}
                                placeholder='Enter Email'
                                placeholderTextColor='#8b9cb5'
                                autoCapitalize='none'
                                keyboardType='email-address'
                                returnKeyType='next'
                                underlineColorAndroid='#f000'
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.sectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                value={password}
                                onChangeText={text => setPassword(text)}
                                placeholder='Enter Password'
                                placeholderTextColor='#8b9cb5'
                                keyboardType='default'
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                secureTextEntry={true}
                                underlineColorAndroid='#f000'
                                returnKeyType='next'
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
                            onPress={() => handleCallback()}
                        >
                            <Text style={styles.buttonTextStyle}>{type === 'login' ? 'LOGIN' : 'REGISTER'}</Text>
                        </TouchableOpacity>

                        {type === 'login' && (
                            <View style={styles.haveAccountBox}>
                                <Text style={styles.haveAccountText}>Don't have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                    <Text style={styles.registerTextStyle}>
                                        Register
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}

                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    )
}

export default AuthForm

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#307ecc',
        alignContent: 'center',
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
        marginBottom: 25,
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
    haveAccountBox: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
        marginRight: 5,
        flexDirection:'row',
        justifyContent:'center',
        paddingTop:5
    },
    haveAccountText: {
        color: '#FFFFFF',
        fontWeight: '500',
        fontSize: 14,
    },
    registerTextStyle: {
        color: '#7DE24E',
        fontWeight: 'bold',
        fontSize: 14,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
})