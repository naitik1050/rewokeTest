import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants/AppRoutes'
import { useSelector, useDispatch } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PlayList, Record, Splashscreen } from '../screen';
import { COLORS } from '../theme/colors';

const Stack = createStackNavigator();

const AppNavigation = () => {

    const splashVisible = useSelector(state => state.splashScreenReducer.visible)

    if (splashVisible) {
        return <Splashscreen />
    }

    const Tab = createBottomTabNavigator();
    function BottomNavigation() {
        return (
            <Tab.Navigator
                screenOptions={{ tabBarStyle: { height: 55 }, tabBarLabelStyle: { marginBottom: 4 }, tabBarActiveTintColor: 'red', tabBarInactiveTintColor: 'grey' }}>
                <Tab.Screen
                    name={ROUTES.RECORD}
                    component={Record}
                    options={{
                        headerStyle: { backgroundColor: COLORS.base, elevation: 0 },
                        headerTitleStyle: { color: COLORS.white },
                        headerTitleAlign: 'center',
                        tabBarIcon: ({ color, size }) => (
                            <Image source={require('../assets/video-recorder.png')} style={styles.imageView} />
                        ),
                    }}
                />

                <Tab.Screen
                    name={ROUTES.PLAYLIST}
                    component={PlayList}
                    options={{
                        headerStyle: { backgroundColor: COLORS.base, elevation: 0 },
                        headerTitleStyle: { color: COLORS.white },
                        headerTitleAlign: 'center',
                        tabBarIcon: ({ color, size }) => (
                            <Image source={require('../assets/play.png')} style={styles.imageView} />
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }

    return (
        <Stack.Navigator>
            <Stack.Screen name={ROUTES.BOTTOM_TAB} component={BottomNavigation} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export { AppNavigation };

const styles = StyleSheet.create({
    imageView: {
        resizeMode: 'center',
        width: 22,
        height: 22,
    },
});