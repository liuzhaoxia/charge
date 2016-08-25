/**
 * Created by liwanchong on 2016/8/8.
 */
import { handleActions } from 'redux-actions'
import mapAction  from '../actions/mapAction'

const initialState = {
    visitorData: [],
    showOrHide:false,
    singleData:{}
};
const mapReducer =handleActions ({
    [mapAction.getVisitorData]: (state, action)=> {
        state = Object.assign({}, state);
        state.showOrHide = false;
        state.visitorData = action.payload.data;
        return state;
    },
    [mapAction.getSingleData]:(state,action)=>{
        state = Object.assign({}, state);
        state.showOrHide=action.payload.showOrHide;
        state.singeData = action.payload.data.data;
        return state;
    }


}, initialState);
export  default mapReducer;