/**
 * Created by wangtun on 2016/7/21.
 */
import { createAction } from 'redux-actions';
import { Actions } from 'react-native-router-flux';
import deepcopy from 'deepcopy';
import store from 'react-native-simple-store';
import { Global, appStateDefault } from '../Global';
import UserManagementActions from './UserManagementActions';

const StartActions = {
  loadUser: (parameter) =>
    dispatch => {
      store.get('appState')
        .then(res => {
          Global.appState = res;
          if (!Global.appState) {
            Global.appState = deepcopy(appStateDefault);
          }
          dispatch(UserManagementActions.setUser(Global.appState.user));
          Actions.mainModule();
        });
    },
};

export default StartActions;
