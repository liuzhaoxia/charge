/**
 * Created by liwanchong on 2016/8/2.
 */
import React, {Component} from 'React';
import {
    View, Image, Text
} from 'react-native';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import { Router, Scene, Modal } from 'react-native-router-flux';
import map from './../../components/android/map';
import Choose from './../../containers/android/Choose';
// import ListView from './../../containers/android/ListView';
// import ImagePicker from './../../containers/android/ImagePicker';
// import main from './../../components/android/Main';
import routeReducerCreator from './../../reducers/routeReducerCreator';
// import helper from './../../utils/helper'
 import store from './../../store/store';
// import ArticleInfo from './../../containers/android/MessInfo'
import DetailInfo from '../../containers/android/Detail'

import shellsDetail from '../../containers/android/shellsDetail'

import imageViewPage from '../../containers/android/imageViewPager'

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
                            <Scene key="mainModule" direction="vertical" initial={true}>
                                <Scene key="map" component={shellsDetail} title="Map"
                                       hideNavBar/>
                                <Scene key="shellsDetail" component={shellsDetail} title="shellsDetail"
                                       hideNavBar/>
                                <Scene key="DetailInfo" component={DetailInfo} title="DetailInfo"
                                       hideNavBar/>

                                <Scene key="imageViewPage" component={imageViewPage} title="imageViewPage"
                                       hideNavBar/>

                            </Scene>
                        </Scene>
                        <Scene key="error" component={Error}/>
                    </Scene>
                </Router>
            </Provider>
        );
    }
}

export default App;