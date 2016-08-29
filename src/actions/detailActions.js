/**
 * Created by 123 on 2016/8/8.
 */

import { createAction } from 'redux-actions';
import { Actions } from 'react-native-router-flux';
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
          console.warn(err);
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
