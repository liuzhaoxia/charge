/**
 * Created by zhaohang on 2016/8/29.
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
  DrawerLayoutAndroid,
  TouchableWithoutFeedback,
  ListView,
  Linking,
} from 'react-native';
import Button from 'react-native-button';
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import store from 'react-native-simple-store';
import Helper from '../../utils/helper';
import { Global } from '../../Global';
import chargeListActions from '../../actions/chargeListActions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#4EC3EE',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
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
  row: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 5,
  },
  wrapper: {
    flex: 1,
  },
  // modal上子View的样式
  subView: {
    flex: 1,
    height: 160,
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
  modalStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeight: {
    height: 180,
    width: 350,
    borderRadius: 10,
  },
});
class listView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
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
    this.getAllList = this.getAllList.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.toDetailContainer = this.toDetailContainer.bind(this);

  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    this.setState({});
  }

  setModalVisible() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
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
  toDetailContainer(pid) {
    this.props.getChargeDesc({
      pid,
    });
    Actions.detailInfo();
  }
  getAllList() {
    console.log(1111);
    //const pageNum = this.state.pageNum;
    //
    //const pageTotal = Math.ceil(this.props.state.totalNum / 10);
    //if (pageNum < pageTotal) {
    //  this.state.pageNum = pageNum + 1;
    //  this.setState({ pageNum: this.state.pageNum });
    //  this.props.getListRequest(pageNum + 1);
    //}
  }

  back() {
    Actions.pop();
  }

  render() {
    const data = this.props.state.mapListData;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    let dataSource = ds.cloneWithRows(data);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Button style={styles.logintext} onPress={this.back}>返回</Button>
          <TextInput
            placeholderTextColor="#E0E0E0"
            style={styles.textinput}
            underlineColorAndroid="transparent"
            keyboardType="default"
          />
          <Button style={styles.search} onPress={this.back}>地图</Button>
        </View>
        <ListView
          enableEmptySections
          onEndReached={this.getAllList}
          onEndReachedThreshold={20}
          dataSource={dataSource}
          renderRow={(rowData) =>
          <View style={styles.row}>
           {this.renderList(rowData)}
          </View>
            }
        />
        <Modal
          position={"bottom"}
          isOpen={this.state.isOpen}
          style={[styles.modalStyle, styles.modalHeight]}
          backdrop={false}
          swipeArea={20}
        >
          <View style={styles.subView}>
            {
              this.state.newLinkUrls.map(
                (linkUrl, index) =>
                  (<View key={index}>
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
                  </View>)
              )
            }
          </View>
        </Modal>
      </View>
    );
  }

  renderList(data) {
    return (
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
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={
                     data.carBrand === '348D' ?
                    require('../../image/tesla.png') :
                     data.carBrand === '400F' ?
                      require('../../image/bmw.png') :
                      data.carBrand === '3701' ?
                      require('../../image/tengshi.png') :
                       require('../../image/tesla.png')
                    }
              />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Text style={{ fontSize: 10, marginLeft: 30 }}>{data.address.substring(0, 8)}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginLeft: 30, marginTop: 5 }}>
            <Image source={require('../../image/charge_avail.png')}/>
          </View>
          <View style={{ width: 150, flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row', marginLeft: 5 }}>
              <View style={{ flexDirection: 'row' }}>
                {
                  data.socker_num.sDCquick_num + data.socker_num.sACquick_num > 0 ?
                    <Text>快冲 {data.socker_num.sDCquick_num + data.socker_num.sACquick_num }个</Text>
                    : <Text/>
                }
                {
                  data.socker_num.sACslow_num + data.socker_num.sDCslow_num > 0 ?
                    <Text>慢冲 {data.socker_num.sACslow_num + data.socker_num.sDCslow_num }个</Text>
                    : <Text/>
                }
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Image style={{ marginTop: 5 }} source={require('../../image/xposition.png')}/>
            <Text style={{ margin: 4 }}>{data.distance}km</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginLeft: 30, marginTop: 5 }}>
            <Image source={require('../../image/text_paytype.png')}/>
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
            onPress={() => this.toDetailContainer(data.pid)}
          >
            <Text style={styles.buttonText}>
              详情
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state.chargeListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(chargeListActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(listView);
