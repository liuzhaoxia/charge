/**
 * Created by liwanchong on 2016/8/2.
 */

import { combineReducers } from 'redux';
import LoginReducer from './loginReducer';
// import listViewReducer from './listViewReducer';
// import articleInfoReducer from './articleInfoReducer'
// ... other reducers

const RootReducer = combineReducers({
  LoginReducer,
  // ... other reducers
});

export default RootReducer;
