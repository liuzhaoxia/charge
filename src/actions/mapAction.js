/**
 * Created by liwanchong on 2016/8/2.
 */
import {createAction} from 'redux-actions';
import actionEnum from '../constants/actionEnum'
import {api,callApi} from "../apis/api";
const mapActions = {
    setVisitorData: (data)=> {
        return dispatch=> {
            callApi(
                api.getVisitorData(data),
                (data)=>dispatch(mapActions.getVisitorData(data)),
                (err)=>console.warn(err)
            );

        }
    },
    getVisitorData: createAction(actionEnum.GET_VISITOR_DATA),
    setSingleData:(data)=>{
        return dispatch=>{
            callApi(
                api.getVisitorData(data),
                (data)=>{
                    dispatch(mapActions.getSingleData({showOrHide:true,data}))},
                (err)=>console.warn(err)
            )
        }
    },
    getSingleData:createAction(actionEnum.GET_SINGLE_DATA)
    
};
export  default mapActions;