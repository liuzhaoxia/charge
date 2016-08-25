/**
 * Created by wangtun on 2016/7/21.
 */
import { createAction } from 'redux-actions';
import { Actions } from 'react-native-router-flux';
import store from 'react-native-simple-store';
import { api, callApi } from '../apis/api';
import { Global } from '../Global';

const loginActions = {
  loginRequest: (parameter) =>
    dispatch => {
      callApi(
        api.login(parameter),
        data => {
          dispatch(loginActions.loginRequestSuccess(data));
        },
        err => {
          dispatch(loginActions.loginRequestFail(err));
        }
      );
    },
  loginRequestSuccess: (data) =>
    dispatch => {
      Global.appState.user = data;
    },
  loginRequestFail: err =>
    dispatch => {
      Global.appState.user = null;
    },
};

export default loginActions;
