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
    const newState = Object.assign({}, state);
    newState.showOrHide = action.payload.showOrHide;
    const data = action.payload.data.data;
    if (data.servicePro === '0') {
      data.servicePro = '其它';
    } else if (data.servicePro === '1') {
      data.servicePro = '国家电网';
    } else if (data.servicePro === '2') {
      data.servicePro = '南方电网';
    } else if (data.servicePro === '3') {
      data.servicePro = '中石油';
    } else if (data.servicePro === '4') {
      data.servicePro = '中石化';
    } else if (data.servicePro === '5') {
      data.servicePro = '中海油';
    } else if (data.servicePro === '6') {
      data.servicePro = '中国普天';
    } else if (data.servicePro === '7') {
      data.servicePro = '特来电';
    } else if (data.servicePro === '8') {
      data.servicePro = '循道新能源';
    } else if (data.servicePro === '9') {
      data.servicePro = '富电科技';
    } else if (data.servicePro === '10') {
      data.servicePro = '华商三优';
    } else if (data.servicePro === '12') {
      data.servicePro = '港灯';
    } else if (data.servicePro === '13') {
      data.servicePro = '澳电';
    } else if (data.servicePro === '11') {
      data.servicePro = '中电';
    }
    // 支付方式
    for (let payment of data.payment) {
      if (payment === '0') {
        payment = '其他';
      } else if (payment === '1') {
        payment = '现金';
      } else if (payment === '2') {
        payment = '信用卡';
      } else if (payment === '3') {
        payment = '借记卡';
      } else if (payment === '4') {
        payment = '特制充值卡';
      } else if (payment === '5') {
        payment = 'APP';
      } else if (payment === '101') {
        payment = '支付宝';
      } else if (payment === '102') {
        payment = '微信';
      } else if (payment === '400') {
        payment = '其他充值卡';
      } else if (payment === '401') {
        payment = '国网普通卡';
      } else if (payment === '402') {
        payment = '南方电网卡';
      } else if (payment === '403') {
        payment = '中石油卡';
      } else if (payment === '404') {
        payment = '中石化卡';
      } else if (payment === '405') {
        payment = '中海油卡';
      } else if (payment === '406') {
        payment = '中国普天充值卡';
      }
      newState.singeData = data;
    }
    return newState;
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

