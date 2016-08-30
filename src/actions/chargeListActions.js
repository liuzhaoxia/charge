/**
 * Created by zhaohang on 2016/8/29.
 */
import { createAction } from 'redux-actions';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-root-toast';
import { api, callApi } from '../apis/api';
import actionEnum from '../constants/actionEnum';

const chargeListActions = {
  setChargeList: createAction(actionEnum.SET_CHARGE_LIST),
  setLocationToMap: createAction(actionEnum.SET_LOCATION_TO_MAP),
  setChargeMapList: createAction(actionEnum.SET_CHARGE_MAP_LIST),
  getChargeList: (parameter) =>
    dispatch => {
      callApi(
        api.chargeList(parameter),
        data => {
          dispatch(chargeListActions.requestChargeListSuccess(data));
        },
        err => {
          dispatch(chargeListActions.requestChargeListFail(err));
        }
      );
    },
  requestChargeListSuccess: (data) =>
    dispatch => {
      dispatch(chargeListActions.setChargeList(data));
    },
  requestChargeListFail: (err) =>
    dispatch => {
      Toast.show(err, {
        duration: Toast.durations.LONG, // toast显示时长
        position: Toast.positions.CENTER, // toast位置
        shadow: true, // toast是否出现阴影
        animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
        hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
        delay: 0, // toast显示的延时
      });
    },
};

export default chargeListActions;
