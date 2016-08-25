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
import ChargeView from './../../containers/android/ChargeView';
import routeReducerCreator from './../../reducers/routeReducerCreator';
import store from './../../store/store';
import DetailInfo from '../../containers/android/Detail';
import Helper from '../../utils/helper';


class App extends React.Component {
    constructor(props) {
        super(props);
        Helper.bindMethod(this);
    }
    test1(){
        alert(111);
    }
    render() {
        return (
            <Provider store={store}>
                <Router createReducer={routeReducerCreator}>
                        <Scene key="modal" component={Modal}>
                            <Scene key="root">
                                <Scene key="mainModule"  direction="horizontal" initial={true}>
                                <Scene key="main" component={Main} title="main" hideNavBar/>
                                <Scene key="DetailInfo" component={DetailInfo} title="DetailInfo" hideNavBar/>
                            </Scene>
                            <Scene key="Choose" component={Choose} title="个人定制" rightTitle="重置" onRight={this.test1}/>
                            <Scene direction="horizontal" key="About" component={About} schema="modal" title="About" hideNavBar/>
                            <Scene  key="ChargeView" component={ChargeView}  title="桩家视界" hideNavBar/>
                       </Scene>
                       <Scene key="error" component={Error}/>
                    </Scene>
                </Router>
            </Provider>
        );
    }
}

export default App;