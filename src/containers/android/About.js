/**
 * Created by zhongxiaoming on 2016/8/5.
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
  Linking,
  TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import Toast from 'react-native-root-toast';
import { Actions } from 'react-native-router-flux';
import Helper from '../../utils/helper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
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
  content: {},
  bg: {
    flex: 2.17,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: Image.resizeMode.contain,
    width: undefined,
    height: undefined,
  },
  menuitem: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
});

const MENU = [
  {
    title: '用户帮助',
    content: '',
    arrow: '>  ',
  }, {
    title: '官网访问',
    content: '',
    arrow: '>  ',
  }, {
    title: '官方微信',
    content: 'zhuanghome2015',
    arrow: '>  ',
  }, {
    title: '官方邮箱',
    content: 'charging@navinfo.com',
    arrow: '>  ',
  },
];

class About extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows(MENU),
    };
    Helper.bindMethod(this);
  }

  test2(id, data) {
    switch (id) {
      case '0':
        Actions.helpView();
        break;
      case '3':
        {
          const url = `mailto:${data.content}`;
          Linking.canOpenURL(url).then(supported => {
            if (!supported) {
              Toast.show(`Can\'t handle url:${url}`, {
                duration: Toast.durations.LONG, // toast显示时长
                position: Toast.positions.CENTER, // toast位置
                shadow: true, // toast是否出现阴影
                animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
                hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
                delay: 0, // toast显示的延时
              });
            } else {
              Linking.openURL(url);
            }
          }).catch(err => {
            Toast.show(err, {
              duration: Toast.durations.LONG, // toast显示时长
              position: Toast.positions.CENTER, // toast位置
              shadow: true, // toast是否出现阴影
              animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
              hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
              delay: 0, // toast显示的延时
            });
          });
          break;
        }
      default:
        break;
    }
  }

  renderSeparator(sectionID:number, rowID:number, adjacentRowHighlighted:bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }

  renderRow(data, sectionID, rowID) {
    return (
      <View style={{ flex: 1 }}>
        <TouchableHighlight underlayColor="#ddd" onPress={() => { this.test2(rowID, data); }}>
          <View style={styles.menuitem}>
            <View>
              <Text
                style={{ color: '#333333', textAlign: 'left', fontSize: 16 }}
              >
                {data.title}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{ color: '#333333', textAlign: 'center', fontSize: 16 }}
              >
                {data.content}
              </Text>
            </View>
            <View>
              <Text
                style={{ color: '#333333', textAlign: 'center', fontSize: 19 }}
              >
                {data.arrow}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bgcontainer}>
          <Image
            style={styles.bg}
            source={require('../../image/bg_about.png')}
          >
            <View style={{ height: 80, alignItems: 'center', justifyContent: 'flex-end' }}>
              <View>
                <Text style={{ color: 'red', textAlign: 'center', flex: 4 }}>1.0.21</Text>
              </View>
            </View>
          </Image>

          <View style={{ flex: 2 }}>
            <View style={{ flex: 5, backgroundColor: '#FFFFFF' }}>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                renderSeparator={this.renderSeparator}
              />
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: '#e9eaed',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View>
                <Text style={{ color: 'red', textAlign: 'center', flex: 4 }}>
                  Copyright 2016 evzhuangjia.com |版权所有
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default About;
