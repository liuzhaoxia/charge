/**
 * Created by liwanchong on 2016/8/2.
 */

import { combineReducers } from 'redux';
import UserManagementReducer from './UserManagementReducer';
import mapReducer from './mapReducer';
import detailReducer from './detailReducer';

const RootReducer = combineReducers({
  UserManagementReducer,
  mapReducer,
  detailReducer,
});

export default RootReducer;
