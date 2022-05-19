import { all } from 'redux-saga/effects';
import watchSplashScreen from './splashScreenSaga';
import watchRecordSaga from './record.saga';


export default function* sagas() {
  yield all([
    watchSplashScreen(),
    watchRecordSaga()
  ]);
}
