import { takeEvery, put, call, delay } from 'redux-saga/effects';
import { CONSTANTS } from '../../constants/AppConst';
import { ToastAndroid } from 'react-native'
var RNFS = require('react-native-fs');
import DeviceInfo from 'react-native-device-info';
import database from '@react-native-firebase/database';

const folder_Path = RNFS.ExternalStorageDirectoryPath + '/' + 'RewokeTest';
let deviceId = DeviceInfo.getDeviceId();

export function* handleRecordSave(action) {
    const { payload } = action;
    try {
        const spilit_uri = payload.split('Camera/')[1];
        RNFS.copyFile(payload, folder_Path + '/' + spilit_uri).then(() => {
            database()
                .ref(`Users/${deviceId}/videoList`)
                .push({
                    uri: payload
                }).then(() => {
                    ToastAndroid.show("Video Recording saved successfully.", ToastAndroid.SHORT)
                }).catch((error) => {
                    console.log(error)
                })
        }, (error) => {
            console.log("error", error);
        });
        yield put({ type: CONSTANTS.RECORD_SAVE_SUCCESS });
    } catch (error) {
        yield put({ type: CONSTANTS.RECORD_SAVE_FAILURE });
    }
}

export function* handleRecordGet(action) {
    const { payload } = action;
    try {
        yield delay(2000)
        yield put({ type: CONSTANTS.RECORD_GET_SUCCESS, payload });
    } catch (error) {
        yield put({ type: CONSTANTS.RECORD_GET_FAILURE });
    }
}


export function* handleRecordDelete(action) {
    const { payload } = action;
    try {
        const spilit_uri = payload?.uri?.split('Camera/')[1];
        RNFS.unlink(folder_Path + '/' + spilit_uri).then(() => {
            database()
                .ref(`Users/${deviceId}/videoList/${payload.id}`)
                .remove().then(() => {
                    ToastAndroid.show("Recording deleted successfully.", ToastAndroid.SHORT)
                }).catch((error) => {
                    console.log(error)
                })
        }, (error) => {
            console.log("error", error);
        });
        yield put({ type: CONSTANTS.RECORD_DELETE_SUCCESS });
    } catch (error) {
        yield put({ type: CONSTANTS.RECORD_DELETE_FAILURE });
    }
}

export default function* watchRecordSaga() {
    yield takeEvery(CONSTANTS.RECORD_SAVE_REQUEST, handleRecordSave);
    yield takeEvery(CONSTANTS.RECORD_GET_REQUEST, handleRecordGet);
    yield takeEvery(CONSTANTS.RECORD_DELETE_REQUEST, handleRecordDelete);
}