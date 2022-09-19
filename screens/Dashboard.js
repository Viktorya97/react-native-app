import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { auth } from '../firebase';

import Carousel from './Carousel'

const Dashboard = () => {
    const [images, setImages] = useState([]);

    const navigation = useNavigation();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true,
        });

        if (!result.cancelled) {
            let data = [];

            if (result?.selected) {
                let pickedImages = result?.selected;
                pickedImages.map((img) => {
                    data.push(img.uri)
                })
                setImages(data);
            } else {
                data.push(result?.uri)
                setImages(data);
            }
        }
    };

    const onPressSignOut = async () => {
        try {
           await auth.signOut()
           await navigation.navigate('Login')
        } catch (error) {
            console.log('error: ', error.message)
        }
    }

    return (
        <SafeAreaView style={styles.areaStyles}>
                <View style={styles.main}>
                    <View
                        style={styles.carouselBox}>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.browseButton}
                            onPress={pickImage}
                        >
                            <Text style={styles.buttonText}>Browse</Text>
                        </TouchableOpacity>

                        <Carousel images={images} />
                    </View>

                    <TouchableOpacity
                        style={styles.logOutButton}
                        activeOpacity={0.5}
                        onPress={onPressSignOut}
                    >
                        <Text style={styles.buttonText}>
                            Log Out
                        </Text>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    areaStyles: {
        flex: 1, backgroundColor: '#FFFFFF'
    },
    main: {
        flex: 1,
        padding: 16
    },
    carouselBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logOutButton: {
        backgroundColor: '#a2a6a3',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#a2a6a3',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonText: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    browseButton: {
        alignItems: 'center',
        backgroundColor: '#274459',
        padding: 5,
        marginVertical: 30,
        width: 250,
    },
})