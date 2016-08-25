/**
 * Created by liwanchong on 2016/8/2.
 */
import React, {Component} from 'React';
import {
    View, Image, Text
} from 'react-native';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import { Router, Scene, Modal,ActionConst } from 'react-native-router-flux';
import Choose from './../../containers/android/Choose';
import Main from './../../containers/android/Main';
import About from './../../containers/android/About';
import routeReducerCreator from './../../reducers/routeReducerCreator';
// import helper from './../../utils/helper'
 import store from './../../store/store';
// import ArticleInfo from './../../containers/android/MessInfo'
import DetailInfo from '../../containers/android/Detail'
import Help from '../../containers/android/Help'
import shellsDetail from '../../containers/android/shellsDetail'

class App extends React.Component {
    constructor(props) {
        super(props);
        //helper.bindMethod(this);
    }
    render() {
        return (
            <Provider store={store}>
                <Router createReducer={routeReducerCreator}>
                    <Scene key="modal" component={Modal}>
                        <Scene key="root" hideNavBar hideTabBar>

                            <Scene key="mainModule"  direction="horizontal" initial={true}>
                                <Scene key="main" component={Main} title="main"
                                       hideNavBar/>
                                <Scene key="shellsDetail" component={shellsDetail} title="shellsDetail"
                                hideNavBar/>
                                <Scene key="DetailInfo" component={DetailInfo} title="DetailInfo"
                                hideNavBar/>
                            </Scene>

                            <Scene direction="horizontal" key="About" component={About}  title="About"
                                   hideNavBar/>
                            <Scene direction="horizontal" key="Help" component={Help}  title="Help"
                                   hideNavBar/>

                        </Scene>
                        <Scene key="error" component={Error}/>
                    </Scene>
                </Router>
            </Provider>
        );
    }
}

export default App;