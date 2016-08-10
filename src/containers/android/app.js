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
// import ListView from './../../containers/android/ListView';
// import ImagePicker from './../../containers/android/ImagePicker';
import Main from './../../containers/android/Main';
import map from './../../components/android/map';

import About from './../../containers/android/About';
import routeReducerCreator from './../../reducers/routeReducerCreator';
// import helper from './../../utils/helper'
 import store from './../../store/store';
// import ArticleInfo from './../../containers/android/MessInfo'


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
                            </Scene>

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