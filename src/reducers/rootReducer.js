/**
 * Created by liwanchong on 2016/8/2.
 */

import { combineReducers } from 'redux';
import UserManagementReducer from './UserManagementReducer';
import mapReducer from './mapReducer';
import searchListReducer from './searchListReducer';
import chargeListReducer from './chargeListReducer';

const RootReducer = combineReducers({
  UserManagementReducer,
  mapReducer,
  searchListReducer,
  chargeListReducer,
});

export default RootReducer;
