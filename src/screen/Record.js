import { StyleSheet, View, Platform, PermissionsAndroid } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS } from '../theme/colors'
import { RNCamera } from 'react-native-camera';
import { Button } from '../components';
import { useDispatch } from 'react-redux';
import { CONSTANTS } from '../constants/AppConst';
var RNFS = require('react-native-fs');

export const Record = () => {
    const dispatch = useDispatch()
    const camera = useRef(null)
    const [recording, setrecording] = useState(false)
    const [processing, setprocessing] = useState(false)
    const [permission, setpermission] = useState(false)

    const checkPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const grants = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
                ]);
                if (
                    grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grants['android.permission.READ_EXTERNAL_STORAGE'] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grants['android.permission.CAMERA'] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grants['android.permission.RECORD_AUDIO'] ===
                    PermissionsAndroid.RESULTS.GRANTED
                ) {
                    const folderPath = RNFS.ExternalStorageDirectoryPath + '/' + 'RewokeTest';
                    RNFS.mkdir(folderPath);
                    setpermission(true)
                } else {
                    console.log('All required permissions not granted');
                    return;
                }
            } catch (err) {
                console.warn(err);
                return;
            }
        }
    }

    useEffect(() => {
        checkPermission()
    }, [])

    async function startRecording() {
        setrecording(true)
        const { uri = "mp4" } = await camera.current.recordAsync();
        if (uri != undefined) {
            dispatch({ type: CONSTANTS.RECORD_SAVE_REQUEST, payload: uri })
        }
    }

    function stopRecording() {
        setrecording(false)
        camera.current.stopRecording();
    }

    let button = (
        <Button
            buttonTitle={'Start Record'}
            backgroundColor={COLORS.base}
            color={COLORS.white}
            buttonStyle={styles.buttonStyle}
            onButtonPress={() => startRecording()} />
    );

    if (recording) {
        button = (
            <Button
                buttonTitle={'Stop Record'}
                backgroundColor={COLORS.base}
                color={COLORS.white}
                buttonStyle={styles.buttonStyle}
                onButtonPress={() => stopRecording()} />
        );
    }

    if (processing) {
        button = (
            <View style={styles.capture}>
                <ActivityIndicator animating size={18} />
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            {permission &&
                <RNCamera
                    ref={camera}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    permissionDialogTitle={"Permission to use camera"}
                    permissionDialogMessage={
                        "We need your permission to use your camera phone"
                    }
                />}
            <View style={styles.wrapContainer} >
                {button}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
    },
    wrapContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.white
    },
    preview: {
        width: '100%',
        height: '80%',
    },
    buttonStyle: {
        width: '50%',
        paddingHorizontal: 20,
        padding: 5,
        borderRadius: 5,
        alignSelf: 'center',
    },
})