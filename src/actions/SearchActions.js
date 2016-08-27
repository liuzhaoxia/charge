/**
 * Created by wangtun on 2016/8/24.
 */
import { createAction } from 'redux-actions';
import { Actions } from 'react-native-router-flux';
import { api, callApi } from '../apis/api';
import actionEnum from '../constants/actionEnum';

const searchActions = {
  setChargeList: createAction(actionEnum.SET_CHARGE_LIST),
  toDetail: () => {
    return dispatch => {
      dispatch(Actions.DetailInfo);
    };
  },
  getChargeList: (parameter) => {
    return dispatch => {
      callApi(
        api.chargeList(parameter),
        data => {
          dispatch(searchActions.requestChargeListSuccess(data));
        },
        err => {
          dispatch(searchActions.requestChargeListFail(err));
        }
      );
    };
  },
  requestChargeListSuccess: (data) => {
    return dispatch => {
      dispatch(searchActions.setChargeList(data));
    };
  },
  requestChargeListFail: (data) => {
    return dispatch => {
      alert(data);
    };
  },
};

export default searchActions;
