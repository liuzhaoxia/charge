/**
 * Created by zhaohang on 2016/8/26.
 */
import { createAction } from 'redux-actions';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-root-toast';
import { api, callApi } from '../apis/api';
import { Global } from '../Global';

const appAction = {
    //setUser: createAction(UserManagementActionEnum.SET_USER),
    //getDetailByPid: (parameter)=> {
    //    return dispatch=> {
    //        callApi(
    //            api.getDetailByPid(parameter),//根据pid获取详情
    //            (data)=>dispatch(detailActions.getDetailRequest(data)),
    //            (err)=>console.warn(err)
    //        );
    //    }
    //},
};

export default appAction;
