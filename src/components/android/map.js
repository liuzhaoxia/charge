/**
 * Created by liwanchong on 2016/8/2.
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  DeviceEventEmitter,
  TouchableHighlight,
  Image,
} from 'react-native';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-root-toast';
import appConfig from '../../constants/appConfig';
import Helper from '../../utils/helper';

const accessToken = appConfig.mapBoxToken;
Mapbox.setAccessToken(accessToken);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  map: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});

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
        longitude: 116.47474416608,
      },
      zoom: 11,
      userTrackingMode: Mapbox.userTrackingMode.none,
      annotations: [],
      userLocation: { lng: 0.0, lat: 0.0 },
      watchID: null,
    };
    Helper.bindMethod(this);
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const initialPosition = JSON.stringify(position);
        this.setState({ initialPosition });
      },
      error => {
        Toast.show(`initialPosition_error${error.message}`, {
          duration: Toast.durations.LONG, // toast显示时长
          position: Toast.positions.CENTER, // toast位置
          shadow: true, // toast是否出现阴影
          animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
          hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
          delay: 0, // toast显示的延时
        });
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    const newWatchID = navigator.geolocation.watchPosition(
      position => {
        const lastPosition = JSON.stringify(position);
        if (lastPosition !== 'unknown') {
          this.setState({
            userLocation: {
              lng: lastPosition.coords.longitude,
              lat: lastPosition.coords.latitude,
            },
            lastPosition,
          });
        }
      }
    );

    this.setState({ watchID: newWatchID });
  }

  componentWillReceiveProps(nextProps) {
    const showMarkerArr = [];
    nextProps.visitorData.forEach(item => {
      const mark = {
        coordinates: [item.location.latitude, item.location.longitude],
        id: item.pid.toString(),
        title: '',
        type: 'point',
        annotationImage: {
          source: {},
          height: 25,
          width: 25,
        },
      };
      if (item.plotKind === 0) { // 0:公共1：专用
        if (item.kindCode === '1') { // 1（充电站） 2（充换电站） 4（换电站） 5（充电桩）
          mark.annotationImage.source = { uri: 'charge_station_common' };
        }
        if (item.kindCode === '5') {
          mark.annotationImage.source = { uri: 'charge_pole_common' };
        }
      } else {
        if (item.kindCode === '1') { // 1（充电站） 2（充换电站） 4（换电站） 5（充电桩）
          mark.annotationImage.source = { uri: 'charge_station_special' };
        }
        if (item.kindCode === '5') {
          mark.annotationImage.source = { uri: 'charge_pole_special' };
        }
      }
      showMarkerArr.push(mark);
    });

    this.setState({
      annotations: [...this.state.annotations, ...showMarkerArr],
    });
    if (this.props.location.latitude !== nextProps.location.latitude &&
      this.props.location.longitude !== nextProps.location.longitude) {
      this.map.setCenterCoordinate(nextProps.location.latitude, nextProps.location.longitude);
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.state.watchID);
  }

  onRegionDidChange(location) {
    this.props.setVisitorData({
      originLat: location.latitude,
      originLng: location.longitude,
      latitude: location.latitude,
      longitude: location.longitude,
      radius: 5000,
    });
    this.setState({ currentZoom: location.zoomLevel });
  }

  onOpenAnnotation(annotation) {
    this.props.setSingleData({
      pid: annotation.id,
    });
  }

  onChangeUserTrackingMode(userTrackingMode) {
    this.setState({ userTrackingMode });
  }

  goZoom(level) {
    this.map.setZoomLevel(this.state.zoom + level);
    this.setState({ zoom: this.state.zoom + level });
  }

  render() {
    StatusBar.setHidden(true);
    return (
      <View style={styles.container}>
        <MapView
          ref={map => { this.map = map; }}
          style={styles.map}
          initialCenterCoordinate={this.state.center}
          initialZoomLevel={this.state.zoom}
          initialDirection={0}
          rotateEnabled={false}
          scrollEnabled
          logoIsHidden
          attributionButtonIsHidden
          zoomEnabled={false}
          showsUserLocation
          styleURL={Mapbox.mapStyles.streets}
          userTrackingMode={this.state.userTrackingMode}
          annotations={this.state.annotations}
          annotationsAreImmutable
          onChangeUserTrackingMode={this.onChangeUserTrackingMode}
          onRegionDidChange={this.onRegionDidChange}
          onOpenAnnotation={this.onOpenAnnotation}
        />
        <View style={{ flex: 1, bottom: 50, position: 'absolute', right: 10 }}>
          <TouchableHighlight
            style={{ width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => { this.goZoom(1); }}
          >
            <Image
              source={require('../../image/zoomout_normal.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight
            style={{ width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => { this.goZoom(-1); }}
          >
            <Image
              source={require('../../image/zoomin_normal.png')}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default Map;
