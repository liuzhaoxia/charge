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
    height: 200,
  },
  // modal上子View的样式
  subView: {
    marginLeft: 20,
    marginRight: 20,
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
      detailData: this.props.detailData,
      show: this.props.showOrHide,
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.toDetailContainer = this.toDetailContainer.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.showOrHide,
      detailData: nextProps.singeData,
    });
  }

  setModalVisible() {
    this.setState({
      show: !this.state.show,
    });

    const url = 'baidumap://map/direction?destination=39.6,116.5';
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
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

  render() {
    const data = this.state.detailData[0];
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
                      <View style={{ flexDirection: 'row' }}>
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
            <View style={{ width: 200 }}>
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
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Image style={{ marginTop: 5 }} source={require('../../image/xposition.png')} />
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

          <View style={styles.horizontalLine} />
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
            <View style={styles.verticalLine} />
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
      </Modal>
    );
  }
}
function mapStateToProps(state) {
  return {
    detailData: state.detailReducer.detailData,
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
