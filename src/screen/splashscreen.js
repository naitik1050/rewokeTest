import React, { useEffect } from 'react';
import { View, Image, StatusBar, StyleSheet } from 'react-native';
import { CONSTANTS } from '../constants/AppConst';
import { COLORS } from '../theme/colors';
import { useDispatch } from 'react-redux';

export const Splashscreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: CONSTANTS.SPLASH_SCREEN_HIDE_REQUEST })
        }, 2500);
    }, [])

    return (
        <View style={styles.mainView}>
            <StatusBar hidden />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/app_logo.png')} style={styles.imageView} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center'
    },
    imageView: {
        resizeMode: 'center',
        width: 250,
        height: 250,
        position: 'absolute'
    }
});