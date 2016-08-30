/**
 * Created by liwanchong on 2016/8/8.
 */
import { handleActions } from 'redux-actions';
import mapAction from '../actions/mapAction';
import SearchActions from '../actions/SearchActions';

const initialState = {
  visitorData: [],
  showOrHide: false,
  singleData: {},
  location: {
    latitude: 40.008456800067,
    longitude: 116.47474416608,
  },
  mapListData: {},
  listMapFlag: false,
};
const mapReducer = handleActions({
  [mapAction.getVisitorData]: (state, action) => {
    const newState = Object.assign({}, state);
    newState.showOrHide = false;
    newState.visitorData = action.payload.data;
    return newState;
  },
  [mapAction.getSingleData]: (state, action) => {
    const nesState = Object.assign({}, state);
    nesState.showOrHide = action.payload.showOrHide;
    const data = action.payload.data.data[0];
    switch (data.servicePro) {
      case '400F':
        data.servicePro = '宝马';
        break;
      case '348D':
        data.servicePro = '特斯拉';
        break;
      case '3701':
        data.servicePro = '腾势';
        break;
      case '0':
        data.servicePro = '其它';
        break;
      case '1':
        data.servicePro = '国家电网';
        break;
      case '2':
        data.servicePro = '南方电网';
        break;
      case '3':
        data.servicePro = '中石油';
        break;
      case '4':
        data.servicePro = '中石化';
        break;
      case '5':
        data.servicePro = '中海油';
        break;
      case '6':
        data.servicePro = '中国普天';
        break;
      case '7':
        data.servicePro = '特来电';
        break;
      case '8':
        data.servicePro = '循道新能源';
        break;
      case '9':
        data.servicePro = '富电科技';
        break;
      case '10':
        data.servicePro = '华商三优';
        break;
      case '11':
        data.servicePro = '中电';
        break;
      case '12':
        data.servicePro = '港灯';
        break;
      case '13':
        data.servicePro = '澳电';
        break;
      case '14':
        data.servicePro = '绿狗';
        break;
      case '15':
        data.servicePro = 'EVCARD';
        break;
      case '16':
        data.servicePro = '星星充电';
        break;
      case '17':
        data.servicePro = '电桩';
        break;
      case '18':
        data.servicePro = '依威能源';
        break;
      case 'ChainID':
        data.servicePro = 'ChainID';
        break;
      case '98':
        data.servicePro = '山东鲁能';
        break;
      case '99':
        data.servicePro = '1886';
        break;
      default:
        break;
    }
    for (const i of data.payment) {
      if (data.payment[i] === '0') {
        data.payment[i] = '其他';
      } else if (data.payment[i] === '1') {
        data.payment[i] = '现金';
      } else if (data.payment[i] === '2') {
        data.payment[i] = '信用卡';
      } else if (data.payment[i] === '3') {
        data.payment[i] = '借记卡';
      } else if (data.payment[i] === '4') {
        data.payment[i] = '特制充值卡';
      } else if (data.payment[i] === '5') {
        data.payment[i] = 'APP';
      } else if (data.payment[i] === '101') {
        data.payment[i] = '支付宝';
      } else if (data.payment[i] === '102') {
        data.payment[i] = '微信';
      } else if (data.payment[i] === '400') {
        data.payment[i] = '其他充值卡';
      } else if (data.payment[i] === '401') {
        data.payment[i] = '国网普通卡';
      } else if (data.payment[i] === '402') {
        data.payment[i] = '南方电网卡';
      } else if (data.payment[i] === '403') {
        data.payment[i] = '中石油卡';
      } else if (data.payment[i] === '404') {
        data.payment[i] = '中石化卡';
      } else if (data.payment[i] === '405') {
        data.payment[i] = '中海油卡';
      } else if (data.payment[i] === '406') {
        data.payment[i] = '中国普天充值卡';
      }
    }
    nesState.singeData = data;
    return nesState;
  },
  [SearchActions.setLocationToMap]: (state, action) => {
    const newState = Object.assign({}, state);
    newState.location = {
      latitude: action.payload.lat,
      longitude: action.payload.lng,
    };
    return newState;
  },
  [SearchActions.setChargeMapList]: (state, action) => {
    const newState = Object.assign({}, state);
    newState.mapListData = action.payload;
    newState.listMapFlag = true;
    return newState;
  },
}, initialState);

export default mapReducer;

