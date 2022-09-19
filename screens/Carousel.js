import React, { useState, useRef } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Dimensions, FlatList } from 'react-native';

const viewConfigRef = { viewAreaCoveragePercentThreshold: 95 }

const { width } = Dimensions.get('window');

const Carousel = ({images}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const flatListRef = useRef(null);

    const onViewRef = useRef(({changed}) => {
        if (changed[0].isViewable) {
            setCurrentIndex(changed[0].index)
        }
    });

    const scrollToIndex = (index) => {
        flatListRef.current?.scrollToIndex({ animated: true, index: index })
    }

    const renderItems = ({item}) => {
        return (
            <View style={styles.imageBox}>
                <Image source={{uri: item}} style={styles.image} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                renderItem={renderItems}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                ref={(ref) => {flatListRef.current = ref}}
                style={styles.carousel}
                viewabilityConfig={viewConfigRef}
                onViewableItemsChanged={onViewRef.current}
            />
            <View style={styles.dotView}>
                {images?.map((img, index) => {
                    return (
                        <TouchableOpacity
                            key={index.toString()}
                            onPress={() => scrollToIndex(index)}
                            style={[styles.circle, {backgroundColor: index === currentIndex ? '#274459' : '#a2a6a3' }]}
                        />
                    )
                })}
            </View>
        </View>
    )
}

export default Carousel

const styles = StyleSheet.create({
    imageBox: {
        width: width - 32,
    },
    image: {
        height: 250,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
    },
    carousel: {
        maxHeight: 250,
    },
    dotView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    circle: {
        width: 10,
        height: 10,
        backgroundColor: 'grey',
        borderRadius: 50,
        marginHorizontal: 5,
    }
})