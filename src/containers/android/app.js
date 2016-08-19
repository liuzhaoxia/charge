/**
 * Created by liwanchong on 2016/8/2.
 */
import React, {Component} from 'React';
import {
    View, Image, Text
} from 'react-native';

import {Provider, connect} from 'react-redux';
import Choose from './../../containers/android/Choose';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Scene, Modal,ActionConst } from 'react-native-router-flux';
import Main from './../../containers/android/Main';
import About from './../../containers/android/About';
import routeReducerCreator from './../../reducers/routeReducerCreator';
import store from './../../store/store';
import DetailInfo from '../../containers/android/Detail';



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
        <Scene key="DetailInfo" component={DetailInfo} title="DetailInfo"
        hideNavBar/>
        </Scene>
        <Scene key="Choose" component={Choose} title="Choose" hideNavBar />
        <Scene direction="horizontal" key="About" component={About} schema="modal" title="About"
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