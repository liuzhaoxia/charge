/**
 * Created by zhongxiaoming on 2016/8/5.
 */
import React, { Component } from 'react';
import {
  View,
  Linking,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableHighlight,
  DrawerLayoutAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import Map from './MapContainer';
import LeftMenu from './LeftMenu';
import ShellsDetail from './ShellsDetail';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B3745',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#4EC3EE',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },

  map: {
    flex: 1,
  },

  textinput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    color: '#e5e5e5',
    fontSize: 16,
  },

  logintext: {
    color: '#FFFFFF',
    padding: 5,
    fontSize: 16,
  },
  search: {
    color: '#FFFFFF',
    padding: 5,
    fontSize: 16,
  },
  image: {
    width: 50,
    height: 50,
  },
});

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      animationType: 'none',
      modalVisible: false,
      transparent: false,
      listMapFlag: false,
    };

    this.openDrawer = this.openDrawer.bind(this);
    this.imagePress = this.imagePress.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      listMapFlag: nextProps.listMapFlag,
    });
  }

  openDrawer() {
    this.drawer.openDrawer();
  }

  search() {
    Actions.searchList();
  }

  imagePress() {
    Actions.choose();
  }

  mapToList() {

  }

  button() {
    if (!this.state.listMapFlag) {
      return (
        <Button style={styles.search} onPress={this.search}>搜索</Button>
      );
    }
    return (
      <Button style={styles.search} onPress={this.mapToList}>列表</Button>
    );
  }

  render() {
    const navigationView = (
      <LeftMenu/>
    );

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        ref={(drawer) => { this.drawer = drawer; }}
        renderNavigationView={() => navigationView}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Button style={styles.logintext} onPress={this.openDrawer}>登 录</Button>
            <TextInput
              placeholder="搜索地点"
              placeholderTextColor="#E0E0E0"
              style={styles.textinput}
              underlineColorAndroid="transparent"
              keyboardType="default"
              onFocus={this.search}
            />
            {this.button()}
          </View>
          <View style={styles.map}>
            <Map/>
            <ShellsDetail/>
            <View style={{ flex: 1, top: 60, position: 'absolute', right: 10 }}>
              <TouchableHighlight
                style={{ width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}
                onPress={this.imagePress}
              >
                <Image
                  source={require('../../image/funnel.png')}
                />
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </DrawerLayoutAndroid>
    );
  }
}

function mapStateToProps(state) {
  return {
    listMapFlag: state.mapReducer.listMapFlag,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Main);
