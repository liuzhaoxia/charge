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
} from 'react-native';
import Button from 'react-native-button';
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import store from 'react-native-simple-store';
import Helper from '../../utils/helper';
import { Global } from '../../Global';

const styles = StyleSheet.create({
  row: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 5,
  },
  thumb: {
    width: 56,
    height: 56,
  },
  title: {
    marginTop: 8,
    marginLeft: 3,
    width: 300,
    color: 'black',
    flex: 1,
  },
  desc: {
    marginTop: 8,
    marginLeft: 3,
  },
  wrapper: {
    flex: 1,
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
class listView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
    };
    this.getAllList = this.getAllList.bind(this);
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    this.setState({});
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

  render() {
    const data = this.props.state.mapListData;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    let dataSource = ds.cloneWithRows(data);
    return (
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
                     data.carBrand === '1' ?
                    require('../../image/bmw.png') :
                    require('../../image/tesla.png')
                    }
              />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Text style={{ fontSize: 10, marginLeft: 30 }}>{data.address.substring(0,8)}</Text>
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
          >
            <Text style={styles.buttonText}>
              引导
            </Text>
          </TouchableHighlight>
          <View style={styles.verticalLine}/>
          <TouchableHighlight
            underlayColor="transparent"
            style={styles.buttonStyle}
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
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(listView);
