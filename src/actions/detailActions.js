/**
 * Created by 123 on 2016/8/8.
 */

import { createAction } from 'redux-actions';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-root-toast';
import { api, callApi } from '../apis/api';

const detailActions = {
  getDetailByPid: (parameter) =>
    dispatch => {
      callApi(
        api.getDetailByPid(parameter), // 根据pid获取详情
        (data) => {
          dispatch(detailActions.getDetailRequest(data));
        },
        (err) => {
          Toast.show(err, {
            duration: Toast.durations.LONG, // toast显示时长
            position: Toast.positions.CENTER, // toast位置
            shadow: true, // toast是否出现阴影
            animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
            hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
            delay: 0, // toast显示的延时
          });
        }
      );
    },
  getDetailRequest: (data) =>
    dispatch => {
      dispatch(detailActions.setDetailData(data));
      dispatch(Actions.detailInfo());  // 跳转到详情页面
    },
  toDetail: () =>
    dispatch => {
      dispatch(Actions.detailInfo());
    },
};

export default detailActions;
