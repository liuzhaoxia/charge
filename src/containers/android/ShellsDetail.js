/**
 * Created by 123 on 2016/8/9.
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Navigator,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Linking,
} from 'react-native';
import Modal from 'react-native-modalbox';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import detailActions from '../../actions/detailActions';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  // modal的样式
  modalStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeight: {
    height: 180,
    width: 350,
    borderRadius: 10,
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
  // 标题
  titleText: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // 内容
  contentText: {
    margin: 8,
    fontSize: 14,
    textAlign: 'center',
  },
  // 水平的分割线
  horizontalLine: {
    marginTop: 5,
    height: 0.5,
    backgroundColor: '#ccc',
  },
  // 按钮
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonStyle: {
    flex: 1,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // 竖直的分割线
  verticalLine: {
    width: 0.5,
    height: 44,
    backgroundColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    color: '#3393F2',
    textAlign: 'center',
  },
});
class ShellsDetail extends Component {
// 初始化模拟数据
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      show: this.props.showOrHide,
      isOpen: false,
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
    this.setModalVisible = this.setModalVisible.bind(this);
    this.toDetailContainer = this.toDetailContainer.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.showOrHide,
      data: nextProps.singeData[0],
    });
  }

  setModalVisible() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  toDetailContainer() {
    this.setState({
      show: false,
    });
    Actions.detailInfo();
  }

  closeModal() {
    this.setState({ show: false });
  }

  openMapUrl(index) {
    if (this.state.newLinkUrls[index].url === '') {
      this.setState({ isOpen: false });
    } else {
      Linking.canOpenURL(this.state.newLinkUrls[index].url).then(supported => {
        if (supported) {
          return Linking.openURL(this.state.newLinkUrls[index].url);
        }
        if (this.state.newLinkUrls[index].name === '百度') {
          return Linking.openURL('http://shouji.baidu.com/software/9831363.html');
        }
        if (this.state.newLinkUrls[index].name === '高德') {
          return Linking.openURL('http://www.autonavi.com/');
        }
        return null;
      });
    }
  }

  render() {
    const data = this.state.data;
    if (!data) {
      return null;
    }
    return (
      <Modal
        position={"bottom"}
        isOpen={this.state.show}
        style={[styles.modalStyle, styles.modalHeight]}
        onClosed={this.closeModal}
        backdrop={false}
        swipeArea={20}
      >
        <View style={styles.subView}>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View>
              <Image
                source={
                  data.plotKind === 0 ?
                  require('../../image/charge_station_common.png') :
                  require('../../image/ex_station_special.png')}
              />
            </View>
            <View style={{ width: 200 }}>
              <Text style={styles.nameTitle}>{data.name}</Text>
            </View>
            <View>
              {
                data.carBrand.map(
                  (car, i) => {
                    if (car === '') {
                      return null;
                    }

                    return (
                      <View key={i} style={{ flexDirection: 'row' }}>
                        <Image
                          source={
                            car === '1' ?
                            require('../../image/bmw.png') :
                            require('../../image/tesla.png')
                            }
                        />
                      </View>
                    );
                  }
                )
              }
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Text style={{ fontSize: 10, marginLeft: 30 }}>{data.address}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginLeft: 30, marginTop: 5 }}>
              <Image
                source={
                  data.state === 0 ?
                  require('../../image/charge_avail.png') :
                  require('../../image/charge_unavail.png')}
              />
            </View>
            <View style={{ width: 150, flexDirection: 'row' }}>
              {
                data.sockerParams.map((socker, i) =>
                  (<View key={i} style={{ flexDirection: 'row', marginLeft: 5 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text >{socker.mode === '0' ? '慢充' : '快充'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text >{socker.chargingplot_count}</Text>
                      <Text >个</Text>
                    </View>
                  </View>)
                )
              }
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Image style={{ marginTop: 5 }} source={require('../../image/xposition.png')}/>
              <Text style={{ margin: 4 }}>{data.distance}km</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginLeft: 30, marginTop: 5 }}>
              <Image
                source={data.state === 0 ?
                  require('../../image/text_paytype.png') :
                  require('../../image/charge_unavail.png')}
              />
            </View>
            <View>
              <Text>{data.payment}</Text>
            </View>
          </View>

          <View style={styles.horizontalLine}/>
          <View style={styles.buttonView}>
            <TouchableHighlight
              underlayColor="transparent"
              style={styles.buttonStyle}
              onPress={this.setModalVisible}
            >
              <Text style={styles.buttonText}>
                引导
              </Text>
            </TouchableHighlight>
            <View style={styles.verticalLine}/>
            <TouchableHighlight
              underlayColor="transparent"
              style={styles.buttonStyle}
              onPress={this.toDetailContainer}
            >
              <Text style={styles.buttonText}>
                详情
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <Modal
          position={"center"}
          isOpen={this.state.isOpen}
          style={[styles.modalStyle, styles.modalHeight]}
          backdrop={false}
          swipeArea={20}
        >
          <View style={styles.subView}>
            {
              this.state.newLinkUrls.map(
                (linkUrl, index) =>
                (
                  <View key={index}>
                    <TouchableHighlight
                      underlayColor="transparent"
                      key={index}
                      onPress={() => { this.openMapUrl(index); }} style={styles.buttonStyle}
                    >
                      <Text key={index} style={styles.buttonText}>
                        {linkUrl.name}
                      </Text>

                    </TouchableHighlight>
                    {
                      index < this.state.newLinkUrls.length - 1 ?
                        (<View style={styles.horizontalLine}/>) : (<View />)
                    }
                  </View>
                )
              )
            }
          </View>
        </Modal>
      </Modal>
    );
  }
}
function mapStateToProps(state) {
  return {
    singeData: state.mapReducer.singeData,
    showOrHide: state.mapReducer.showOrHide,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(detailActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShellsDetail);
