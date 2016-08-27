/**
 * Created by wangtun on 2016/8/24.
 */
import { createAction } from 'redux-actions';
import { Actions } from 'react-native-router-flux';
import {
  api,
  callApi,
} from '../apis/api';


const searchActions = {
  toDetail: () =>
    dispatch => {
      dispatch(Actions.DetailInfo());
    },
};

export default searchActions;
