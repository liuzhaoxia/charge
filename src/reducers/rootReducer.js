/**
 * Created by liwanchong on 2016/8/2.
 */

import { combineReducers } from 'redux';
import UserManagementReducer from './UserManagementReducer';
import mapReducer from './mapReducer';

const RootReducer = combineReducers({
  UserManagementReducer,
  mapReducer,
});

export default RootReducer;
