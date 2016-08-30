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
  [mapAction.getVisitorData]: (state, action)=> {
    state = Object.assign({}, state);
    state.showOrHide = false;
    state.visitorData = action.payload.data;
    return state;
  },
  [mapAction.getSingleData]: (state, action)=> {
    state = Object.assign({}, state);
    state.showOrHide = action.payload.showOrHide;
    let data = action.payload.data.data;
    state.singeData = data;
    return state;
  },
  [SearchActions.setLocationToMap]: (state, action) => {
    state = Object.assign({}, state);
    state.location = {
      latitude: action.payload.lat,
      longitude: action.payload.lng,
    };
    return state;
  },
  [SearchActions.setChargeMapList]: (state, action) => {
    state = Object.assign({}, state);
    state.mapListData = action.payload;
    state.listMapFlag = true;
    return state;
  },
}, initialState);
export default mapReducer;
