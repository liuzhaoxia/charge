/**
 * Created by liwanchong on 2016/8/2.
 */
import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
} from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Scene, Modal, ActionConst } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import store from 'react-native-simple-store';
import ChargeView from './../../containers/android/ChargeView';
import routeReducerCreator from './../../reducers/routeReducerCreator';
import ReduxStore from './../../store/store';
import Login from '../../containers/android/Login';
import Start from '../../containers/android/Start';
import DetailInfo from '../../containers/android/Detail';
import Helper from '../../utils/helper';
import ShellsDetail from '../../containers/android/ShellsDetail';
import Choose from '../../containers/android/Choose';
import About from './../../containers/android/About';
import HelpView from './../../containers/android/HelpView';
import Main from './../../containers/android/Main';
import SearchList from '../../containers/android/SearchList';
import { Global } from '../../Global';
import imageViewPage from '../../containers/android/imageViewPager';
import Regist from './Regist';
import UserAgreement from './UserAgreement';
import FindPassword from './FindPassword';
import Error from './Error'

class App extends React.Component {
  componentWillUnmount() {
    store.get('appState')
      .then(res => {
        if (res) {
          store.update('appState', Global.appState);
          return;
        }
        store.save('appState', Global.appState);
      });
  }

  test1() {
    alert(111);
  }

  render() {
    return (

      <Provider store={ReduxStore}>
        <Router createReducer={routeReducerCreator}>
          <Scene key="modal" component={Modal}>
            <Scene key="root">
              <Scene key="start" component={Start} title="Start" hideNavBar hideTabBar initial />
              <Scene key="login" component={Login} title="登陆" hideNavBar={false} />
              <Scene key="regist" component={Regist} title="注册" hideNavBar={false} />
              <Scene key="userAgreement" component={UserAgreement} title="用户协议" hideNavBar={false} />
              <Scene key="findPassword" component={FindPassword} title="手机找回密码" hideNavBar={false} />
              <Scene key="mainModule" direction="horizontal">
                <Scene key="main" component={Main} title="Main" hideNavBar />
                <Scene
                  key="shellsDetail"
                  component={ShellsDetail}
                  title="shellsDetail"
                  hideNavBar
                />
                <Scene
                  key="DetailInfo"
                  component={DetailInfo}
                  title="DetailInfo"
                  hideNavBar
                />
              <Scene
                  key="imageViewPage"
                  component={imageViewPage}
                  title="imageViewPage"
                  hideNavBar/>
              </Scene>
                <Scene
                    key="Choose"
                    component={Choose}
                    title="个人定制"
                    rightTitle="重置"
                    onRight={this.test1}
                    hideNavBar={false}
                />
              <Scene
                key="SearchList"
                component={SearchList}
                title="搜索"
                hideNavBar
              />
              <Scene
                key="About" component={About}
                title="关于"
                hideNavBar={false}
              />
              <Scene
                  key="HelpView"
                  component={HelpView}
                  title="帮助"
                  hideNavBar={false}
              />
               <Scene
                    key="ChargeView"
                    component={ChargeView}
                    title="桩家视界"
                    hideNavBar={false}
               />
            </Scene>
            <Scene key="error" component={Error} />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

export default App;
