/**
 * Created by wangtun on 2016/7/21.
 */
import { createAction } from 'redux-actions';
import loginActionEnum from '../constants/loginActionEnum'
//import { api, callApi } from '../apis/api'
import { Actions } from "react-native-router-flux";
const loginActions = {
    login: createAction(loginActionEnum.LOGIN_REQUEST),
    loginRequest: (parameter)=> {
        return dispatch=> {
            // callApi(
            //     api.login(parameter),
            //     (data)=>Actions.ListView(),
            //     (err)=>console.warn(err)
            // );
        }
    }
};

export default loginActions;