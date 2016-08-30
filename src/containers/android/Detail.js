/**
 * Created by zhongxiaoming on 2016/8/5.
 * 搜索结果详情
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  IntentAndroid,
  TouchableNativeFeedback,
  TouchableHighlight,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
import DetailMapDirection from './DetailMapDirection';
import detailActions from '../../actions/detailActions';
import imageViewPager from './imageViewPager';
import DefaultTabBar from './DefaultTabBar';
import Helper from '../../utils/helper';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    height: 40,
    backgroundColor: '#00BFFF',
  },
  textTitle: {
    width: 50,
    height: 40,
    margin: 5,
    fontSize: 17,
    color: '#FFFFFF',
    alignSelf: 'center',
  },
  avatarimage: {
    width: 24,
    height: 24,
    alignSelf: 'center',
    marginTop: 3,
  },
  logoImage: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 5,
  },
  nameTitle: {
    fontSize: 15,
    color: '#FFFFFF',
  },
  content: {
    flexDirection: 'row',
    height: 30,
  },
  scrollView: {
    height: 800,
  },
  // modal的样式
  modalStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  modalHeight: {
    height: 180,
    width: 350,
  },
  // modal上子View的样式
  subView: {
    height: 180,
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonStyle: {
    flex: 1,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalLine: {
    height: 0.5,
    backgroundColor: '#ccc',
  },
  buttonView: {
    flex: 1,
    alignItems: 'center',
    height: 44,
  },
});

class Detail extends React.Component {
// 初始化模拟数据
  constructor(props) {
    super(props);

    this.state = {
      singeData: this.props.singeData,
      tabNames: ['充电插口', '服务信息'],
      thridPlug: false,
      newLinkUrls: [
        {
          url: 'baidumap://map/direction?destination=39.6,116.5',
          name: '百度',
        }, {
          url: 'androidamap://viewMap?sourceApplication=appname&poiname=abc&lat=36.2&lon=116.1&dev=0',
          name: '高德',
        }, {
          url: '',
          name: '取消',
        }],
    };
    Helper.bindMethod(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      singeData: nextProps.singeData,
    });
  }

  backShells() {
    Actions.pop();
  }

  openViewPage() {
    Actions.imageViewPage();
  }

  openMapUrl(index) {
    if (this.state.newLinkUrls[index].url === '') {
      this.setState({ thridPlug: false });
    } else {
      Linking.canOpenURL(this.state.newLinkUrls[index].url).then(supported => {
        if (supported) {
          Linking.openURL(this.state.newLinkUrls[index].url);
        } else {
          if (this.state.newLinkUrls[index].name === '百度') {
            Linking.openURL('http://shouji.baidu.com/software/9831363.html');
          }
          if (this.state.newLinkUrls[index].name === '高德') {
            Linking.openURL('http://www.autonavi.com/');
          }
        }
      });
    }
  }

  handleClick() {
    this.setState({ thridPlug: true });
  }

  renderSocker(socker, i) {
    let image = null;
    switch (socker.plugType) {
      case '0':
        image = require('../../image/socket_jiaoliudian3kongjiayong.png');
        break;
      case '1':
        image = require('../../image/socket_guobiaojiaoliudian7kong.png');
        break;
      case '2':
        image = require('../../image/socket_guobiaozhiliudian9kong.png');
        break;
      case '3':
        image = require('../../image/socket_meishijiaoliu5kong.png');
        break;
      case '4':
        image = require('../../image/socket_meishizhiliucombo.png');
        break;
      case '5':
        image = require('../../image/socket_oushijiaoliu7kong.png');
        break;
      case '6':
        image = require('../../image/socket_oshizhiliucombo.png');
        break;
      case '7':
        image = require('../../image/socket_rishizhiliuchademo.png');
        break;
      case '8':
        image = require('../../image/socket_tesilachachao.png');
        break;
      case '9':
        image = require('../../image/socket_qita.png');
        break;
      default:
        break;
    }
    return (
      <View key={i} style={{ flexDirection: 'row' }}>
        <View>
          <Image
            source={image}
            style={{ width: 25, height: 25, margin: 5 }}
          />
        </View>
        <View style={{ width: 250, flexDirection: 'row', height: 40, padding: 5 }}>
          <Text
            style={{ margin: 5 }}
          >
            {socker.mode === '0' ? '慢充' : '快充'}{socker.acdc === '0' ? '交流' : '直流'} {socker.plugType}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ margin: 5, color: 'red' }}>{socker.chargingplot_count}</Text>
          <Text style={{ margin: 5 }}>个</Text>
        </View>
      </View>);
  }

  renderCar(car, i) {
    let image = null;
    switch (car) {
      case '400F':
        image = require('../../image/bmw.png');
        break;
      case '348D':
        image = require('../../image/tesla.png');
        break;
      case '3701':
        image = require('../../image/tengshi.png');
        break;
      default:
        break;
    }
    return (
      <Image
        key={i}
        source={image}
        style={{ width: 25, height: 25, margin: 5 }}
      />
    );
  }

  render() {
    const tabNames = this.state.tabNames;
    const data = this.state.singeData;
    if (!data) {
      return null;
    }
    const picUrl = data.plotPic.length > 0 ? `http://chargingtest.navinfo.com/Charge/resources/photo/${data.plotPic[0].url}` : '';
    const serviceProIcon = data.servicePro_icon != null ? `http://chargingtest.navinfo.com/Charge${data.servicePro_icon}` : '';
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View>
            <TouchableHighlight underlayColor="transparent" onPress={this.backShells}>
              <Image source={require('../../image/back.png')} style={styles.avatarimage}/>
            </TouchableHighlight>
          </View>
          <View style={{ width: 300 }}>
            <Text style={styles.textTitle}>详情</Text>
          </View>
        </View>
        <View
          style={{ borderBottomColor: '#e5e5e5', borderBottomWidth: 1 }}
        />
        <View style={{ flexDirection: 'row', backgroundColor: '#00BFFF', height: 90 }}>
          <View>
            {
              data.plotPic.length > 0 ?
                (<TouchableHighlight
                  underlayColor="transparent"
                  onPress={this.openViewPage}
                >
                  <Image source={{ uri: picUrl }} style={styles.logoImage}/>
                </TouchableHighlight>) :
                (<TouchableHighlight underlayColor="transparent">
                  <Image source={require('../../image/noImage.jpg')} style={styles.logoImage}/>
                </TouchableHighlight>)
            }

            <View
              style={{
                backgroundColor: '#000000',
                width: 20,
                height: 20,
                marginTop: -25,
                marginLeft: 60,
              }}
            >
              <Text style={{ color: '#FFFFFF', marginLeft: 5 }}>{data.plotPic.length}</Text>
            </View>
          </View>
          <View style={{ width: 240, marginLeft: 5 }}>
            <Text style={styles.nameTitle}>{data.name}</Text>
            {
              data.carBrand.map(this.renderCar)
            }
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Image source={require('../../image/xposition.png')}/>
              <Text style={{ color: '#FFFFFF', fontSize: 13 }}>{data.distance}km</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', height: 46, padding: 4 }}>
          <View>
            <Image source={require('../../image/position.png')}/>
          </View>
          <View style={{ width: 275 }}>
            <Text style={{ margin: 5, fontSize: 14 }}>{data.address}</Text>
          </View>
          <View
            style={{
              borderLeftColor: '#e5e5e5',
              borderLeftWidth: 1,
              height: 25,
              marginTop: 2,
              marginBottom: 2,
            }}
          />
          <View >
            <TouchableNativeFeedback onPress={this.handleClick}>
              <View>
                <Text style={{ margin: 5, color: '#00BFFF' }}>前往</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, height: 200 }}>
            <DetailMapDirection />
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
          <View style={{ flexDirection: 'row', width: 90, height: 30, marginTop: 10 }}>
            <Image source={require('../../image/detail_icon_ok.png')}/>
            <Text>可充电</Text>
          </View>
          <View style={{ flexDirection: 'row', width: 90, height: 30, marginTop: 10 }}>
            <Image source={require('../../image/detail_icon_ok.png')}/>
            <Text>可停车</Text>
          </View>
          <View style={{ flexDirection: 'row', width: 90, height: 30, marginTop: 10 }}>
            <Image source={require('../../image/detail_icon_no.png')}/>
            <Text>可预约</Text>
          </View>
          <View style={{ flexDirection: 'row', width: 90, height: 30, marginTop: 10 }}>
            <Image
              source={
                data.open24H === 1 ?
                require('../../image/detail_icon_ok.png') :
                require('../../image/detail_icon_no.png')
              }
            />
            <Text>24小时</Text>
          </View>
        </View>
        <View style={{ borderBottomColor: '#e5e5e5', borderBottomWidth: 3 }}/>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginTop: 3, marginLeft: 5 }}>
            <Image source={require('../../image/socket_icon.png')}/>
          </View>
          <View style={{ width: 280 }}>
            {
              data.socker_num.sDCquick_num + data.socker_num.sACquick_num > 0 ?
                (<Text style={{ margin: 5, fontSize: 15, fontWeight: 'bold' }}>
                    快充{data.socker_num.sDCquick_num + data.socker_num.sACquick_num}个</Text>
                ) : null
            }
            {
              data.socker_num.sACslow_num + data.socker_num.sDCslow_num > 0 ?
                (<Text style={{ margin: 5, fontSize: 15, fontWeight: 'bold' }}>
                    慢充{data.socker_num.sACslow_num + data.socker_num.sDCslow_num}个</Text>
                ) : null
            }
          </View>
          <View style={{ flex: 1, marginTop: 10 }}>
            <Image
              source={
                data.state === '0' ?
                require('../../image/charge_avail.png') :
                require('../../image/charge_unavail.png')
              }
            />
          </View>
        </View>
        {
          data.telephone !== '' ?
            (<View>
              <View
                style={{ borderBottomColor: '#e5e5e5', borderBottomWidth: 1 }}
              />
              <View style={{ flexDirection: 'row' }}>
                <View style={{ marginTop: 3, marginLeft: 5 }}>
                  <Image source={require('../../image/tele_icon.png')}/>
                </View>
                <View style={{ width: 280 }}>
                  <Text style={{ margin: 5, fontSize: 15, fontWeight: 'bold' }}>
                    {data.telephone}
                  </Text>
                </View>
              </View></View>) : null
        }
        <View style={{ borderBottomColor: '#e5e5e5', borderBottomWidth: 3 }}/>
        <ScrollableTabView
          renderTabBar={() => <DefaultTabBar tabNames={tabNames}/>}
          tabBarPosition="top"
        >
          <View style={styles.content} tabLabel="key1">
            {
              data.sockerParams.map(this.renderSocker)
            }
          </View>
          <View style={{ flex: 1 }} tabLabel="key2">
            <ScrollView>
              {
                data.charge_fee === '' ? null : (
                  <View>
                    <View style={styles.content}>
                      <View style={{ width: 100 }}>
                        <Text style={{ margin: 5 }}>计费方式</Text>
                      </View>
                      <View >
                        <Text style={{ margin: 5 }}>{data.charge_fee}</Text>
                      </View>
                    </View>
                    <View
                      style={{ borderBottomColor: '#e5e5e5', borderBottomWidth: 1 }}
                    />
                  </View>
                )
              }
              <View style={styles.content}>
                <View style={{ width: 100 }}>
                  <Text style={{ margin: 5 }}>停车计费</Text>
                </View>
                <View >
                  <Text style={{ margin: 5 }}>{data.parking_fee === 1 ? '付费' : '免费'}</Text>
                </View>
              </View>
              {
                data.openHour === '' ? null : (
                  <View>
                    <View style={{ borderBottomColor: '#e5e5e5', borderBottomWidth: 1 }}/>
                    <View style={styles.content}>
                      <View style={{ width: 100 }}>
                        <Text style={{ margin: 5 }}>营业时间</Text>
                      </View>
                      <View >
                        <Text style={{ margin: 5 }}>{data.openHour}</Text>
                      </View>
                    </View>
                  </View>
                )
              }
              {
                data.payment.length === 0 ? null : (<View>
                  <View style={{ borderBottomColor: '#e5e5e5', borderBottomWidth: 1 }}/>
                  <View style={styles.content}>
                    <View style={{ width: 100 }}>
                      <Text style={{ margin: 5 }}>支付方式</Text>
                    </View>
                    <View >
                      <Text style={{ margin: 5 }}>{data.payment}</Text>
                    </View>
                  </View>
                </View>)
              }
              {
                data.servicePro.length === 0 ? null : (<View>
                  <View style={{ borderBottomColor: '#e5e5e5', borderBottomWidth: 1 }}/>
                  <View style={styles.content}>
                    <View style={{ width: 100 }}>
                      <Text style={{ margin: 5 }}>服务厂商</Text>
                    </View>
                    <View >
                      <Text style={{ margin: 5 }}>{data.servicePro}</Text>
                    </View>
                    {
                      serviceProIcon === '' ? (
                        <View />
                      ) : (
                        <View>
                          <Image source={{ uri: serviceProIcon }} style={styles.logoImage}/>
                        </View>
                      )
                    }
                  </View>
                </View>)
              }
            </ScrollView>
          </View>
        </ScrollableTabView>
        <Modal
          position={'center'}
          isOpen={this.state.thridPlug}
          style={[styles.modalStyle, styles.modalHeight]}
          backdrop={false}
          swipeArea={20}
        >
          <View style={styles.subView}>
            {
              this.state.newLinkUrls.map((linkUrl, index) =>
                (<View key={index}>
                  <TouchableHighlight
                    underlayColor="transparent"
                    key={index}
                    onPress={() => { this.openMapUrl(index); }}
                    style={styles.buttonStyle}
                  >
                    <Text key={index} style={styles.buttonText}>
                      {linkUrl.name}
                    </Text>
                  </TouchableHighlight>
                  {
                    index < this.state.newLinkUrls.length - 1 ?
                      (<View style={styles.horizontalLine}/>) : null
                  }
                </View>))
            }
          </View>
        </Modal>
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
)(Detail);
