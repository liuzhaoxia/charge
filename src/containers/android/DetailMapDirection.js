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
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import { Actions } from 'react-native-router-flux';
import appConfig from '../../constants/appConfig';
import Helper from '../../utils/helper';
import detailActions from '../../actions/detailActions';

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

class DetailMapDirection extends Component {
  // 构造
  constructor(props) {
    super(props);

    const annotations = [];
    const showMarkerArr = [];
    this.props.singeData.forEach(item => {
      showMarkerArr.push({
        coordinates: [item.location.latitude, item.location.longitude],
        id: item.pid.toString(),
        title: '',
        type: 'point',
        annotationImage: {
          source: { uri: 'https://cldup.com/7NLZklp8zS.png' },
          height: 25,
          width: 25,
        },
      });
    });
    // 初始状态
    this.state = {
      singeData: this.props.singeData,
      center: {
        latitude: this.props.singeData[0].location.latitude,
        longitude: this.props.singeData[0].location.longitude,
      },
      zoom: 11,
      userTrackingMode: Mapbox.userTrackingMode.none,
      annotations: [...annotations, ...showMarkerArr],
    };
    Helper.bindMethod(this);
  }

  componentWillReceiveProps(nextProps) {
    const showMarkerArr = [];
    nextProps.singeData.forEach(item => {
      showMarkerArr.push({
        coordinates: [item.location.latitude, item.location.longitude],
        id: item.pid.toString(),
        title: '',
        type: 'point',
        annotationImage: {
          source: { uri: 'https://cldup.com/7NLZklp8zS.png' },
          height: 25,
          width: 25,
        },
      });
    });
    this.setState({
      annotations: [...this.state.annotations, ...showMarkerArr],
    });
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
          rotateEnabled
          scrollEnabled
          logoIsHidden
          attributionButtonIsHidden
          zoomEnabled
          showsUserLocation
          styleURL={Mapbox.mapStyles.streets}
          annotationsAreImmutable
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    singeData: state.mapReducer.singeData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(detailActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailMapDirection);
