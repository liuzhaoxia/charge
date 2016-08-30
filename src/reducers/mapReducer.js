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
    newState.singeData = data;
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

