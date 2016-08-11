/**
 * Created by wangtun on 2016/7/21.
 */
import { createAction } from 'redux-actions';
import { Actions } from 'react-native-router-flux';
import store from 'react-native-simple-store';
import LoginActionEnum from '../constants/loginActionEnum';
import { api, callApi } from '../apis/api';

const loginActions = {
  setUser: createAction(LoginActionEnum.SET_USER),
  loginRequest: (parameter) =>
    dispatch => {
      callApi(
        api.login(parameter),
        data => {
          dispatch(loginActions.loginRequestSuccess(data, parameter));
        },
        err => {
          dispatch(loginActions.loginRequestFail(err));
        }
      );
    },
  loginRequestSuccess: (data, user) =>
    dispatch => {
      dispatch(loginActions.setUser(user));
      store.get('user')
        .then(res => {
          if (res) {
            return store.update('user', user);
          }
          return store.save('user', user);
        });
    },
  loginRequestFail: err =>
    dispatch => {
      dispatch(loginActions.setUser(null));
      store.get('user')
        .then(res => {
          if (res) {
            store.update('user', null);
          }
        });
    },
};

export default loginActions;
