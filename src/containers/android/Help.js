/**
 * Created by zhongxiaoming on 2016/8/5.
 * 帮助
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Modal,
  ToolbarAndroid,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgcontainer: {
    flex: 1,
    paddingTop: 0,

  },
  toolbar: {
    flexDirection: 'row',
    backgroundColor: '#3EA8FF',
    height: 40,
  },
  bghelp: {
    flex: 1,
    resizeMode: Image.resizeMode.stretch,
  },
});

class Help extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bgcontainer}>
          <View style={styles.toolbar}>
            <Text style={{ flex: 1 }} onPress={Actions.about}>返回</Text>
            <Text style={{ color: '#fff', textAlign: 'center', flex: 9 }}>关于</Text>
          </View>
          <Image
            style={[styles.bghelp, { width: Dimensions.get('window').width }]}
            source={require('../../image/bg_help.png')}

          />
        </View>
      </View>
    );
  }
}

export default Help;
