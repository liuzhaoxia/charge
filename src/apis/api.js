/**
 * Created by liwanchong on 2016/8/2.
 */
import { FetchMethod, createFetch } from '../fetch/fetch';
import appConfig from '../constants/appConfig';
import { Global } from '../Global';

const api = {
  login: (parameter) => createFetch(
    `${appConfig.serviceRoot}Charge/charge/users/login`,
    FetchMethod.Get,
    parameter
  ),
  getVisitorData: (parameter) => {
    let token = '';
    if (Global.appState && Global.appState.user) {
      token = Global.appState.user.accessToken;
    }
    const newParameter = {
      parameter,
      access_token: token,
    };
    return createFetch(
      `${appConfig.serviceRoot}Charge/charge/wechat/query`,
      FetchMethod.Get,
      newParameter
    );
  },
  getDetailByPid: (parameter) => {
    let token = '';
    if (Global.appState && Global.appState.user) {
      token = Global.appState.user.accessToken;
    }
    const newParameter = {
      parameter,
      access_token: token,
    };
    return createFetch(
      `${appConfig.serviceRoot}app/listAll`,
      FetchMethod.Get,
      newParameter
    );
  },
  getAuthenticationCode: (parameter) => createFetch(
    `${appConfig.serviceRoot}Charge/charge/users/getAuthenticationCode`,
    FetchMethod.Get,
    parameter
  ),
  chargeList: (parameter) => createFetch(
    `${appConfig.serviceRoot}Charge/charge/wechat/associateSearch`,
    FetchMethod.Get,
    parameter
  ),
  chargeMapList: (parameter) => createFetch(
    `${appConfig.serviceRoot}Charge/charge/wechat/keyWordSearch`,
    FetchMethod.Get,
    parameter
  ),
  regist: (parameter) => createFetch(
    `${appConfig.serviceRoot}Charge/charge/users/regist/`,
    FetchMethod.Get,
    parameter
  ),
  updatePassword: (parameter) => createFetch(
    `${appConfig.serviceRoot}Charge/charge/users/updatePassword`,
    FetchMethod.Get,
    parameter
  ),
};

async function callApi(apiService, success, fail) {
  try {
    const response = await apiService;
    if (!response.ok) {
      throw new Error(`网络错误:${response.status}`);
    }

    const jsonResult = await response.json();

    if (jsonResult.errcode === 0) {
      if (success) {
        const data = jsonResult.data;
        success(data);
      }
    } else {
      throw new Error(`服务器错误:${jsonResult.errmsg}`);
    }
  } catch (error) {
    if (fail) {
      fail(error.message);
    }
  }
}

export {
  api,
  callApi,
};
