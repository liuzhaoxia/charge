/**
 * Created by wangtun on 2016/8/24.
 */
import { createAction } from 'redux-actions';
import { api, callApi } from '../apis/api'
import { Actions } from "react-native-router-flux";

const searchActions = {
    toDetail:()=>{
        return dispatch=> {
             dispatch(Actions.DetailInfo());
        }
    }
};

export default searchActions;