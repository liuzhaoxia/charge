/**
 * Created by liwanchong on 2016/8/2.
 */
import { FetchMethod, createFetch } from '../fetch/fetch';
import appConfig from '../constants/appConfig';

const api = {
  login: (parameter) => createFetch(
    `${appConfig.serviceRoot}Charge/charge/users/login`,
    FetchMethod.Get,
    parameter
  ),
  getVisitorData: (parameter) => createFetch(
    `${appConfig.serviceRoot}Charge/charge/wechat/query`,
    FetchMethod.Get,
    { parameter }
  ),
  getDetailByPid: (parameter) => createFetch(
    `${appConfig.serviceRoot}app/listAll`,
    FetchMethod.Get,
    { parameter }
  ),
  getAuthenticationCode: (parameter) => createFetch(
    `${appConfig.serviceRoot}Charge/charge/users/getAuthenticationCode`,
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
    console.log('response.json');

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
    console.log(error);
    if (fail) {
      fail(error.message);
    }
  }
}

export {
  api,
  callApi,
};
