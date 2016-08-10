/**
 * Created by liwanchong on 2016/8/2.
 */

import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import  mapReducer from "./mapReducer"
// import listViewReducer from './listViewReducer';
// import articleInfoReducer from './articleInfoReducer'
// ... other reducers

const rootReducer = combineReducers({
    loginReducer,mapReducer
    // ... other reducers
});

export default rootReducer;