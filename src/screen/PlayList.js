import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { CONSTANTS } from '../constants/AppConst';
import { Loader } from '../components';
import database from '@react-native-firebase/database';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../theme/colors';

let deviceId = DeviceInfo.getDeviceId();

export const PlayList = () => {

    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const { data, getData } = useSelector(state => state.recordReducer)
    const [loading, setloading] = useState(false)

    useEffect(() => {
        if (isFocused || getData) {
            database()
                .ref(`Users/${deviceId}/videoList`)
                .once('value', function (snapshot) {
                    const vals = snapshot.val();
                    let _records = [];
                    for (var key in vals) {
                        _records.push({
                            ...vals[key],
                            id: key
                        });
                    }
                    dispatch({ type: CONSTANTS.RECORD_GET_REQUEST, payload: _records })
                    setloading(false)
                });
        }
    }, [isFocused, getData])


    useEffect(() => {
        setloading(true)
    }, [isFocused])


    const deleteRecord = (item) => {
        dispatch({ type: CONSTANTS.RECORD_DELETE_REQUEST, payload: item })
    }

    return (
        <>
            {loading ?
                <View style={styles.loaderContainer}>
                    <Loader status={loading} />
                </View>
                :
                <View
                    style={styles.mainContainer}>
                    {data?.length > 0 ?
                        <ScrollView
                            contentContainerStyle={styles.contentContainerStyle}>
                            {data?.map((item, index) => {
                                return (
                                    <>
                                        <View
                                            key={index}
                                            style={styles.listMainWrap}>
                                            <View
                                                style={styles.listFlexWrap}>
                                                <View style={styles.flexView}>
                                                    <Text
                                                        style={styles.headTextStyle}>
                                                        {item?.id}
                                                    </Text>
                                                    <Text
                                                        style={styles.lableTextStyle}>
                                                        {item?.uri}
                                                    </Text>
                                                </View>
                                                <Icon
                                                    onPress={() => deleteRecord(item)}
                                                    name="delete"
                                                    size={22}
                                                    color={COLORS.red}
                                                    style={styles.iconStyle} />
                                            </View>
                                        </View>
                                    </>
                                )
                            })}
                        </ScrollView> :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', fontSize: 20 }}>No Record Found!</Text>
                        </View>
                    }
                </View>}
        </>
    )
}


const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    contentContainerStyle: {
        paddingBottom: 30
    },
    listMainWrap: {
        borderColor: COLORS.grey,
        borderWidth: 1,
        borderTopWidth: 0
    },
    listFlexWrap: {
        margin: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headTextStyle: {
        color: COLORS.base,
        fontSize: 18
    },
    lableTextStyle: {
        fontSize: 14,
    },
    flexView: {
        flex: 0.9
    },
    iconStyle: {
        flex: 0.1,
        alignSelf: 'center',
    }
})