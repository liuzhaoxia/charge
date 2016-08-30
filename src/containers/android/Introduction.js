/**
 * Created by zhongxiaoming on 2016/8/25.
 * 登录之后的总体介绍页面
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  ToastAndroid,
  ViewPagerAndroid,
  Image,
  View,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import NavButton from './NavButton';

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  pageStyle: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',

    resizeMode: Image.resizeMode.stretch,
    width: undefined,
    height: undefined,
  },
  startBtn: {
    position: 'relative',
    width: 200,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',

  },
  messageText: {
    fontSize: 27,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },

  buttonView: {
    paddingBottom: 50,
  },

});

class Introduction extends Component {

  render() {
    return (
      <ViewPagerAndroid
        style={styles.viewPager}
        initialPage={0}
      >
        <View style={styles.pageStyle}>
          <Image
            source={require('../../image/first_show_1.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.pageStyle}>
          <Image
            source={require('../../image/first_show_2.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.pageStyle}>
          <Image
            source={require('../../image/first_show_3.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.pageStyle}>
          <Image
            source={require('../../image/first_show_4.png')}
            style={styles.image}
          >
            <View style={styles.buttonView}>
              <NavButton
                onPress={() => {
                  ToastAndroid.show('启动应用', ToastAndroid.SHORT);
                }}
                text="启动应用"
                style={styles.startBtn}
              />
            </View>
          </Image>
        </View>
      </ViewPagerAndroid>
    );
  }
}

export default Introduction;

