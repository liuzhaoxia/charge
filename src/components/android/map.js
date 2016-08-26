/**
 * Created by liwanchong on 2016/8/2.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    StatusBar,
    View,
    ScrollView,
    DeviceEventEmitter,
    TouchableHighlight,
    Image
} from 'react-native';
import Mapbox, {MapView} from 'react-native-mapbox-gl';
import { Actions } from "react-native-router-flux";
import appConfig from '../../constants/appConfig';
import  helper from '../../utils/helper';
const accessToken = appConfig.mapBoxToken;
Mapbox.setAccessToken(accessToken);
let watchID = null;
class Map extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            initialPosition: 'unknown',
            lastPosition: 'unknown',
            center: {
                latitude: 40.008456800067,
                longitude: 116.47474416608
            },
            zoom: 11,
            userTrackingMode: Mapbox.userTrackingMode.none,
            annotations: [{
                coordinates: [39.9, 116.3],
                type: 'point',
                title: 'This is marker 1',
                subtitle: 'It has a rightCalloutAccessory too',
                rightCalloutAccessory: {
                    source: {uri: 'https://cldup.com/9Lp0EaBw5s.png'},
                    height: 25,
                    width: 25
                },
                annotationImage: {
                    source: {uri: 'https://cldup.com/CnRLZem9k9.png'},
                    height: 25,
                    width: 25
                },
                id: 'marker1'
            }, {
                coordinates: [39.9, 116.3],
                type: 'point',
                title: '',
                subtitle: 'Neat, this is a custom annotation image',
                annotationImage: {
                    source: {uri: 'https://cldup.com/7NLZklp8zS.png'},
                    height: 25,
                    width: 25
                },
                id: 'marker2'
            }, {
                coordinates: [[40.76572150042782, -73.99429321289062], [40.743485405490695, -74.00218963623047], [40.728266950429735, -74.00218963623047], [40.728266950429735, -73.99154663085938], [40.73633186448861, -73.98983001708984], [40.74465591168391, -73.98914337158203], [40.749337730454826, -73.9870834350586]],
                type: 'polyline',
                strokeColor: '#00FB00',
                strokeWidth: 4,
                strokeAlpha: .5,
                id: 'foobar'
            }, {
                coordinates: [[40.749857912194386, -73.96820068359375], [40.741924698522055, -73.9735221862793], [40.735681504432264, -73.97523880004883], [40.7315190495212, -73.97438049316406], [40.729177554196376, -73.97180557250975], [40.72345355209305, -73.97438049316406], [40.719290332250544, -73.97455215454102], [40.71369559554873, -73.97729873657227], [40.71200407096382, -73.97850036621094], [40.71031250340588, -73.98691177368163], [40.71031250340588, -73.99154663085938]],
                type: 'polygon',
                fillAlpha: 1,
                strokeColor: '#ffffff',
                fillColor: '#0000ff',
                id: 'zap'
            }],
            userLocation:{ lng: 0.0, lat: 0.0}
        };
        helper.bindMethod(this);
    }


    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var initialPosition = JSON.stringify(position);
                this.setState({initialPosition});
            },
            (error) => alert("initialPosition_error"+error.message),
            {enableHighAccuracy: false}
        );
        watchID = navigator.geolocation.watchPosition((position) => {
                var lastPosition = JSON.stringify(position);
                alert("lastPosition"+lastPosition);
                this.setState({
                    lastPosition
                })
            }
        );


        this.props.setVisitorData({
            "originLat": 40.018928097309,
            "originLng": 116.48599579179,
            "latitude": 40.018869147739,
            "longitude": 116.48619658964,
            "radius": 5000
        });




    }

    componentWillReceiveProps(nextProps) {
        let showMarkerArr = [];
        nextProps.visitorData.map(item=> {
            showMarkerArr.push({
                coordinates: [item["location"]["latitude"], item["location"]["longitude"]],
                id: item.pid.toString(),
                title: '',
                type: 'point',
                annotationImage: {
                    source: {uri: 'https://cldup.com/7NLZklp8zS.png'},
                    height: 25,
                    width: 25
                },
            })
        })
        this.setState({
            annotations: [...this.state.annotations, ...showMarkerArr]
        })
    }

    onRegionDidChange = (location) => {
        this.props.setVisitorData({
            "originLat": location.latitude,
            "originLng": location.longitude,
            "latitude": location.latitude,
            "longitude": location.longitude,
            "radius": 500
        });
        this.setState({currentZoom: location.zoomLevel});
        console.log('onRegionDidChange', location);
    };
    onRegionWillChange = (location) => {
        console.log('onRegionWillChange', location);
    };
    onUpdateUserLocation = (location) => {
        console.log('onUpdateUserLocation', location);
    };
    onOpenAnnotation = (annotation) => {
        alert("this.state.lastPosition" + this.state.lastPosition);
        this.props.setSingleData({
            pid: annotation.id
        });

        console.log('onOpenAnnotation', annotation);
    };
    onRightAnnotationTapped = (e) => {
        console.log('onRightAnnotationTapped', e);
    };
    onLongPress = (location) => {
        console.log('onLongPress', location);
    };
    onTap = (location) => {
        console.log('onTap', location);
    };
    onChangeUserTrackingMode = (userTrackingMode) => {
        this.setState({userTrackingMode});
        console.log('onChangeUserTrackingMode', userTrackingMode);
    };

    componentWillMount() {
        this._offlineProgressSubscription = Mapbox.addOfflinePackProgressListener(progress => {
            console.log('offline pack progress', progress);
        });
        this._offlineMaxTilesSubscription = Mapbox.addOfflineMaxAllowedTilesListener(tiles => {
            console.log('offline max allowed tiles', tiles);
        });
        this._offlineErrorSubscription = Mapbox.addOfflineErrorListener(error => {
            console.log('offline error', error);
        });
    }

    componentWillUnmount() {
        this._offlineProgressSubscription.remove();
        this._offlineMaxTilesSubscription.remove();
        this._offlineErrorSubscription.remove();
        navigator.geolocation.clearWatch(watchID);
    }

    addNewMarkers = () => {
        // Treat annotations as immutable and create a new one instead of using .push()
        this.setState({
            annotations: [...this.state.annotations, {
                coordinates: [40.73312, -73.989],
                type: 'point',
                title: 'This is a new marker',
                id: 'foo'
            }, {
                'coordinates': [[40.749857912194386, -73.96820068359375], [40.741924698522055, -73.9735221862793], [40.735681504432264, -73.97523880004883], [40.7315190495212, -73.97438049316406], [40.729177554196376, -73.97180557250975], [40.72345355209305, -73.97438049316406], [40.719290332250544, -73.97455215454102], [40.71369559554873, -73.97729873657227], [40.71200407096382, -73.97850036621094], [40.71031250340588, -73.98691177368163], [40.71031250340588, -73.99154663085938]],
                'type': 'polygon',
                'fillAlpha': 1,
                'fillColor': '#000000',
                'strokeAlpha': 1,
                'id': 'new-black-polygon'
            }]
        });
    };

    updateMarker2 = () => {
        // Treat annotations as immutable and use .map() instead of changing the array
        this.setState({
            annotations: this.state.annotations.map(annotation => {
                if (annotation.id !== 'marker2') {
                    return annotation;
                }
                return {
                    coordinates: [39.9, 116.3],
                    'type': 'point',
                    title: 'New Title!',
                    subtitle: 'New Subtitle',
                    annotationImage: {
                        source: {uri: 'https://cldup.com/7NLZklp8zS.png'},
                        height: 25,
                        width: 25
                    },
                    id: 'marker2'
                };
            })
        });
    };

    removeMarker2 = () => {
        this.setState({
            annotations: this.state.annotations.filter(a => a.id !== 'marker2')
        });
    };

    goZoom(level){
        console.log(this.state.zoom)
        this._map.setZoomLevel(this.state.zoom+level);
        this.setState({zoom:this.state.zoom+level})
    }

    render() {
        StatusBar.setHidden(true);
        return (
            <View style={styles.container}>
                <MapView
                    ref={map => { this._map = map; }}
                    style={styles.map}
                    initialCenterCoordinate={this.state.center}
                    initialZoomLevel={this.state.zoom}
                    initialDirection={0}
                    rotateEnabled={false}
                    scrollEnabled={true}
                    logoIsHidden={true}
                    attributionButtonIsHidden={true}
                    zoomEnabled={false}
                    showsUserLocation={true}
                    styleURL={Mapbox.mapStyles.streets}
                    userTrackingMode={this.state.userTrackingMode}
                    annotations={this.state.annotations}
                    annotationsAreImmutable
                    onChangeUserTrackingMode={this.onChangeUserTrackingMode}
                    onRegionDidChange={this.onRegionDidChange}
                    onRegionWillChange={this.onRegionWillChange}
                    onOpenAnnotation={this.onOpenAnnotation}
                    onRightAnnotationTapped={this.onRightAnnotationTapped}
                    onUpdateUserLocation={this.onUpdateUserLocation}
                    onLongPress={this.onLongPress}
                    onTap={this.onTap}
                />
                <View style={{flex: 1,bottom: 50,position:"absolute",right:10}}>
                    <TouchableHighlight style={{  width: 24, height: 24, justifyContent: 'center', alignItems: 'center'}}
                                        onPress={()=> {return this.goZoom(1)}}  >
                        <Image
                            source={require('../../image/zoomout_normal.png')} />

                    </TouchableHighlight>
                    <TouchableHighlight style={{  width: 24, height: 24, justifyContent: 'center', alignItems: 'center'}}
                                        onPress={()=> {return this.goZoom(-1)}}  >
                        <Image
                            source={require('../../image/zoomin_normal.png')} />

                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    map: {
        flex: 1
    },
    scrollView: {
        flex: 1
    }
});
export  default Map;