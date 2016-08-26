/**
 * Created by wangtun on 2016/7/21.
 */
import { createAction } from 'redux-actions';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-root-toast';
import { api, callApi } from '../apis/api';
import { Global } from '../Global';

const UserManagementActions = {
  loginRequest: (parameter) =>
    dispatch => {
      callApi(
        api.login(parameter),
        data => {
          dispatch(UserManagementActions.loginRequestSuccess(
            data,
            parameter.userName,
            parameter.password
          ));
        },
        err => {
          dispatch(UserManagementActions.loginRequestFail(err));
        }
      );
    },
  loginRequestSuccess: (data, userName, password) =>
    dispatch => {
      const user = {
        userName,
        password,
        nickname: data.name,
        phone: data.phone,
        wechat: data.wechat,
        icon: data.icon,
        accessToken: data.access_token,
      };
      Global.appState.user = user;
      Actions.pop();
    },
  loginRequestFail: err =>
    dispatch => {
      Global.appState.user = null;
      Toast.show(err, {
        duration: Toast.durations.LONG, // toast显示时长
        position: Toast.positions.CENTER, // toast位置
        shadow: true, // toast是否出现阴影
        animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
        hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
        delay: 0, // toast显示的延时
      });
    },
  getAuthenticationCodeRequest: parameter =>
    dispatch => {
      callApi(
        api.getAuthenticationCode(parameter),
        data => {
          dispatch(UserManagementActions.getAuthenticationCodeRequestSuccess(data));
        },
        err => {
          dispatch(UserManagementActions.getAuthenticationCodeRequestFail(err));
        }
      );
    },
  getAuthenticationCodeRequestSuccess: (data) =>
    dispatch => {
      //console.log('获取验证码成功');
    },
  getAuthenticationCodeRequestFail: err =>
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
  registRequest: parameter =>
    dispatch => {
      callApi(
        api.regist(parameter),
        data => {
          dispatch(UserManagementActions.registRequestSuccess(
            data,
            parameter.userName,
            parameter.password
          ));
        },
        err => {
          dispatch(UserManagementActions.registRequestFail(err));
        }
      );
    },
  registRequestSuccess: (data, userName, password) =>
    dispatch => {
      const user = {
        userName,
        password,
        nickname: data.name,
        phone: data.phone,
        wechat: data.wechat,
        icon: data.icon,
        accessToken: data.access_token,
      };
      Global.appState.user = user;
      Actions.mainModule();
    },
  registRequestFail: err =>
    dispatch => {
      Global.appState.user = null;
      Toast.show(err, {
        duration: Toast.durations.LONG, // toast显示时长
        position: Toast.positions.CENTER, // toast位置
        shadow: true, // toast是否出现阴影
        animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
        hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
        delay: 0, // toast显示的延时
      });
    },
  updatePasswordRequest: parameter =>
    dispatch => {
      callApi(
        api.updatePassword(parameter),
        data => {
          dispatch(UserManagementActions.updatePasswordRequestSuccess(
            data,
            parameter.cellNum,
            parameter.password
          ));
        },
        err => {
          dispatch(UserManagementActions.updatePasswordRequestFail(err));
        }
      );
    },
  updatePasswordRequestSuccess: (data, userName, password) =>
    dispatch => {
      const user = {
        userName,
        password,
        nickname: data.name,
        phone: data.phone,
        wechat: data.wechat,
        icon: data.icon,
        accessToken: data.access_token,
      };
      Global.appState.user = user;
      Toast.show('修改密码成功', {
        duration: Toast.durations.LONG, // toast显示时长
        position: Toast.positions.CENTER, // toast位置
        shadow: true, // toast是否出现阴影
        animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
        hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
        delay: 0, // toast显示的延时
        onHidden: () => {
          // toast隐藏回调（动画结束时）
          Actions.mainModule();
        },
      });
    },
  updatePasswordRequestFail: err =>
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

export default UserManagementActions;
