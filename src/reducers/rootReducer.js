/**
 * Created by liwanchong on 2016/8/2.
 */

import { combineReducers } from 'redux';
import LoginReducer from './loginReducer';
import mapReducer from './mapReducer';
import detailReducer from './detailReducer';

const RootReducer = combineReducers({
  LoginReducer,
  mapReducer,
  detailReducer,
});

export default RootReducer;
