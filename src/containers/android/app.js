/**
 * Created by liwanchong on 2016/8/2.
 */
import React, {Component} from 'React';
import {
    View, Image, Text
} from 'react-native';

import {Provider, connect} from 'react-redux';
import {Router, Scene, Modal} from 'react-native-router-flux';

import Map from './MapContainer';
import Choose from './../../containers/android/Choose';
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
                            <Scene key="mainModule" direction="vertical" initial={true}>
                                <Scene key="map" component={Map} title="Map"
                                       hideNavBar/>
                                <Scene key="DetailInfo" component={DetailInfo} title="DetailInfo"
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