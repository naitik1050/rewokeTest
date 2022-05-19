import { combineReducers } from 'redux';
import splashScreenReducer from './splashScreenReducer';
import recordReducer from './record.reducer';

export default combineReducers({
  splashScreenReducer: splashScreenReducer,
  recordReducer: recordReducer
});
