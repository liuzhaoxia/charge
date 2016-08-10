/**
 * Created by 123 on 2016/8/8.
 */

import { createAction } from 'redux-actions';
import { api, callApi } from '../apis/api'
import { Actions } from "react-native-router-flux";
const detailActions = {
    getDetailByPid: (parameter)=> {
        return dispatch=> {
             callApi(
                 api.getDetailByPid(parameter),//根据pid获取详情
                (data)=>dispatch(detailActions.getDetailRequest(data)),
                (err)=>console.warn(err)
            );
        }
    },
    getDetailRequest: (data)=> {
        return dispatch=> {
            dispatch(
                detailActions.setDetailData(data)
            );
            dispatch(Actions.DetailInfo());  //跳转到详情页面
        }
    },
    toDetail:()=>{
        return dispatch=> {
            dispatch(Actions.DetailInfo());
        }
    }

};

export default detailActions;
