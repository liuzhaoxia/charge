/**
 * Created by wangtun on 2016/7/21.
 */
import { createAction } from 'redux-actions';
import { Actions } from 'react-native-router-flux';
import deepcopy from 'deepcopy';
import store from 'react-native-simple-store';
import LoginActions from '../actions/loginActions';
import { Global, appStateDefault } from '../Global';

const StartActions = {
  loadUser: (parameter) =>
    dispatch => {
      store.get('appState')
        .then(res => {
          Global.appState = res;
          if (!Global) {
            Global.appState = deepcopy(appStateDefault);
          }
          Actions.mainModule();
        });
    },
};

export default StartActions;
