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
});
class listView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
    };
    this.getAllList = this.getAllList.bind(this);
    this.pressRow = this.pressRow.bind(this);
  }

  componentWillMount() {
    this.props.getListRequest(1);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({});
  }

  getAllList() {
    const pageNum = this.state.pageNum;

    const pageTotal = Math.ceil(this.props.state.totalNum / 10);
    if (pageNum < pageTotal) {
      this.state.pageNum = pageNum + 1;
      this.setState({ pageNum: this.state.pageNum });
      this.props.getListRequest(pageNum + 1);
    }
  }

  pressRow(id) {
    this.props.toDesOfList(id);
  }

  render() {
    const data = this.props.state.listData;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    let dataSource = ds.cloneWithRows(data);
    return (
      <ListView
        enableEmptySections
        onEndReached={this.getAllList}
        onEndReachedThreshold={20}
        dataSource={dataSource}
        renderRow={(rowData) =>
          <TouchableHighlight onPress={() => this.pressRow(rowData.id)}>
            <View style={styles.row}>
              <View>
                <Image style={styles.thumb} source={{ uri: rowData.image }} />
              </View>
              <View>
                <View>
                  <Text style={styles.title} numberOfLines={1}>
                                  {rowData.title}
                  </Text>
                </View>
                <View>
                  <Text style={styles.desc}>
                                  {rowData.author} {rowData.date}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableHighlight>
            }
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state.listViewReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(listView);
