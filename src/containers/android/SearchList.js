/**
 * Created by zhongxiaoming on 2016/8/5.
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
} from 'react-native';
import Button from 'react-native-button';
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import store from 'react-native-simple-store';
import searchActions from '../../actions/SearchActions';
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
    width: 26,
    height: 26,
    marginTop: 10,
  },
  title: {
    marginTop: 5,
    marginLeft: 3,
    width: 300,
    color: 'black',
    flex: 1,
  },
  num: {
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 5,
  },
  desc: {
    marginTop: 8,
    marginLeft: 3,
  },
  container1: {
    height: 50,
    flex: 1,
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 1,
  },
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
  search: {
    color: '#FFFFFF',
    padding: 5,
    fontSize: 16,
  },
});

class SearchList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      history: Global.appState.searchHistory || { list: [] },
      searchListData: [],
    };
    Helper.bindMethod(this);
  }

  componentDidMount() {
    if (!Global.appState.searchHistory) {
      Global.appState.searchHistory = {
        list: [],
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      searchListData: nextProps.searchListData,
    });
  }

  changeState(key, value) {
    this.props.getChargeList({
      access_token: Global.appState.user.accessToken,
      parameter: {
        radius: 5000,
        name: value,
        region: '北京',
      },
    });
    this.setState({ [key]: value });
  }

  back() {
    Actions.pop();
  }

  search() {
    if (Global.appState.searchHistory) {
      Global.appState.searchHistory.list.push(this.state.searchText);
    }
    this.setState({ history: Global.appState.searchHistory });
  }

  pressData(data) {
    Actions.pop();
    this.props.getListOfCharge(data.location, {
      access_token: Global.appState.user.accessToken,
      parameter: {
        radius: 5000,
        name: data.name,
        region: '北京',
        latitude: data.location.lat,
        longitude: data.location.lng,
        originLat: 40.008456800067,
        originLng: 116.47474416608,
      },
    });
  }

  list(data, index) {
    return (
      <TouchableHighlight onPress={() => this.pressData(data)} key={index}>
        <View style={styles.row}>
          <View>
            <Image style={styles.thumb} source={require('../../image/logo.png')}/>
          </View>
          <View style={{ width: 250 }}>
            <View>
              <Text style={styles.title} numberOfLines={1}>
                {data.name}
              </Text>
            </View>
            <View>
              <Text style={styles.desc}>
                {data.address}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.num}>
              {data.num}个结果
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Button style={styles.logintext} onPress={this.back}>返回</Button>
          <TextInput
            value={this.state.searchText}
            onChangeText={text => {
              this.changeState('searchText', text);
            }}
            placeholder="搜索地点"
            placeholderTextColor="#E0E0E0"
            onSubmitEditing={this.search}
            style={styles.textinput}
            underlineColorAndroid="transparent"
            keyboardType="default"
            autoFocus
          />
          <Button style={styles.search} onPress={this.back}>取消</Button>
        </View>
        <ScrollView>
          <View>
            {this.state.searchListData.map(this.list)}
          </View>
        </ScrollView>
        <View>
          {
            this.state.history.list.map((text, i) =>
              (<View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Image
                    source={require('../../image/history.png')}
                  />
                </View>
                <View style={{ flex: 8, underlineColorAndroid: 'gray' }}>
                  <Text key={text + i} style={{ color: '#000000' }}>{text}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Image
                    source={require('../../image/arrow.png')}
                  />
                </View>
              </View>)
            )
          }
        </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    searchText: '',
    searchListData: state.searchListReducer.searchListData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(searchActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchList);
