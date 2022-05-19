import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../redux/reducers';
import sagas from '../redux/sagas';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['welcomeScreenReducer', 'authReducer', 'masterReducer']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {

    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        persistedReducer,
        applyMiddleware(sagaMiddleware)
    );

    let persistor = persistStore(store)
    sagaMiddleware.run(sagas);

    return { store, persistor }
}