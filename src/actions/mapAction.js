/**
 * Created by liwanchong on 2016/8/2.
 */
import { createAction } from 'redux-actions';
import Toast from 'react-native-root-toast';
import actionEnum from '../constants/actionEnum';
import { api, callApi } from '../apis/api';

const mapActions = {
  setVisitorData: (parameter) =>
    dispatch => {
      callApi(
        api.getVisitorData(parameter),
        (data) => {
          dispatch(mapActions.getVisitorData(data));
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
  getVisitorData: createAction(actionEnum.GET_VISITOR_DATA),
  setSingleData: (parameter) =>
    dispatch => {
      callApi(
        api.getVisitorData(parameter),
        (data) => {
          dispatch(mapActions.getSingleData({ showOrHide: true, data }));
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
  getSingleData: createAction(actionEnum.GET_SINGLE_DATA),
};

export default mapActions;
