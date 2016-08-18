/**
 * Created by wangtun on 2016/7/21.
 */
import { createAction } from 'redux-actions';
import { Actions } from 'react-native-router-flux';
import store from 'react-native-simple-store';
import LoginActions from '../actions/loginActions';

const StartActions = {
  loadUser: (parameter) =>
    dispatch => {
      store.get('user')
        .then(res => {
          if (res) {
            dispatch(LoginActions.setUser(res));
          }
          dispatch(LoginActions.setUser(null));
          Actions.mainModule();
        });
    },
};

export default StartActions;
