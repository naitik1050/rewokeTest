import React from 'react';
import { View, StatusBar, LogBox, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import Configurestore from './store';
import { AppNavigation } from './navigators/AppNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react'
import { navigationRef } from './navigators/RootNavigation';

LogBox.ignoreAllLogs();

const { store, persistor } = Configurestore()

const Root = () => (
    <View style={styles.rootContainer}>
        <StatusBar
            translucent
            backgroundColor="transparent"
        />
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <SafeAreaProvider>
                    <NavigationContainer ref={navigationRef}>
                        <AppNavigation />
                    </NavigationContainer>
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    </View>
);

export default Root;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    }
});