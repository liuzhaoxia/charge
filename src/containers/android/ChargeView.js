/**
 * Created by zhaohang on 2016/8/24.
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ListView,
  TouchableHighlight,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  ToolbarAndroid,
  Linking,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-native-button';
import Swiper from 'react-native-swiper';
import Toast from 'react-native-root-toast';
import Helper from '../../utils/helper';

const styles = StyleSheet.create({
  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },

  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

  image: {
    flex: 1,
  },
  image1: {
    width: 363,
    height: 180,
  },
  image1View: {
    marginTop: 10,
    marginLeft: 10,
  },
});

class ChargeView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onPressButton = this.onPressButton.bind(this);
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    this.setState({});
  }

  onPressButton(url) {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        Toast.show(`Can not handle url:${url}`, {
          duration: Toast.durations.LONG, // toast显示时长
          position: Toast.positions.CENTER, // toast位置
          shadow: true, // toast是否出现阴影
          animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
          hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
          delay: 0, // toast显示的延时
        });
      }
      Linking.openURL(url);
    }).catch(err => {
      Toast.show(`An error occurred${err}`, {
        duration: Toast.durations.LONG, // toast显示时长
        position: Toast.positions.CENTER, // toast位置
        shadow: true, // toast是否出现阴影
        animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
        hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
        delay: 0, // toast显示的延时
      });
    });
  }

  render() {
    return (
      <ScrollView>
        <View style={{ marginTop: 40 }}>
          <Swiper
            style={styles.wrapper}
            height={240}
            paginationStyle={{ bottom: 10, right: 60 }}
            loop
            autoplay
          >
            <View style={styles.slide}>
              <Image
                style={styles.image}
                source={{
                  uri: 'http://c.hiphotos.baidu.com/image/w%3D310/sign=0dff10a81c30e924cfa4' +
                   '9a307c096e66/7acb0a46f21fbe096194ceb468600c338644ad43.jpg',
                }}
              >
                <Text
                  style={{ height: 240 }}
                  onPress={() => { this.onPressButton('http://sina.cn/?from=wap'); }}
                />
              </Image>
            </View>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                source={{
                  uri: 'http://a.hiphotos.baidu.com/image/w%3D310/sign=4459912736a85ed' +
                   'ffa8cf822795509d8/bba1cd11728b4710417a05bbc1cec3fdfc032374.jpg',
                }}
              >
                <Text
                  style={{ height: 240 }}
                  onPress={() => { this.onPressButton('http://sina.cn/?from=wap'); }}
                />
              </Image>
            </View>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                source={{
                  uri: 'http://e.hiphotos.baidu.com/image/w%3D310/sign=9a8b4d497ed98' +
                   'd1076d40a30113eb807/0823dd54564e9258655f5d5b9e82d158ccbf4e18.jpg',
                }}
              >
                <Text
                  style={{ height: 240 }}
                  onPress={() => { this.onPressButton('http://sina.cn/?from=wap'); }}
                />
              </Image>

            </View>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                source={{
                  uri: 'http://e.hiphotos.baidu.com/image/w%3D310/sign=2da0245f' +
                   '79ec54e741ec1c1f89399bfd/9d82d158ccbf6c818c958589be3eb13533fa4034.jpg',
                }}
              >
                <Text
                  style={{ height: 240 }}
                  onPress={() => { this.onPressButton('http://sina.cn/?from=wap'); }}
                />
              </Image>
            </View>
          </Swiper>
          <View style={styles.image1View}>
            <TouchableHighlight onPress={() => { this.onPressButton('http://sina.cn/?from=wap'); }}>
              <Image
                style={styles.image1}
                source={{
                  uri: 'http://e.hiphotos.baidu.com/image/w%3D310/sign=2da0245f79ec54e' +
                 '741ec1c1f89399bfd/9d82d158ccbf6c818c958589be3eb13533fa4034.jpg',
                }}
              />
            </TouchableHighlight>
          </View>
          <View style={styles.image1View}>
            <TouchableHighlight onPress={() => { this.onPressButton('http://sina.cn/?from=wap'); }}>
              <Image
                style={styles.image1}
                source={{
                  uri: 'http://e.hiphotos.baidu.com/image/w%3D310/sign=2da0245f79' +
                   'ec54e741ec1c1f89399bfd/9d82d158ccbf6c818c958589be3eb13533fa4034.jpg',
                }}
              />
            </TouchableHighlight>
          </View>
          <View style={styles.image1View}>
            <TouchableHighlight onPress={() => { this.onPressButton('http://sina.cn/?from=wap'); }}>
              <Image
                style={styles.image1}
                source={{
                  uri: 'http://e.hiphotos.baidu.com/image/w%3D310/sign=2da0245f79ec' +
                   '54e741ec1c1f89399bfd/9d82d158ccbf6c818c958589be3eb13533fa4034.jpg',
                }}
              />
            </TouchableHighlight>
          </View>
          <View style={styles.image1View}>
            <TouchableHighlight onPress={() => { this.onPressButton('http://sina.cn/?from=wap'); }}>
              <Image
                style={styles.image1}
                source={{
                  uri: 'http://e.hiphotos.baidu.com/image/w%3D310/sign=2da0245f79ec' +
                 '54e741ec1c1f89399bfd/9d82d158ccbf6c818c958589be3eb13533fa4034.jpg',
                }}
              />
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChargeView);
