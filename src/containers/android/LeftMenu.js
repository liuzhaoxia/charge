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
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import UserInfo from './UserInfo';
import { Global } from '../../Global';
import Helper from '../../utils/helper';
import UserManagementActions from '../../actions/UserManagementActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
  },
  contentitem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  splitters: {
    height: 1,
    backgroundColor: '#A9A9A9',
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
  },
});

class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationType: 'none',
      modalVisible: false,
      transparent: false,
    };
    Helper.bindMethod(this);
  }

  onLogOut() {
    this.props.actions.updateUser(null);
  }

  getChargeView() {
    Actions.chargeView();
  }

  about() {
    Actions.about();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentitem}>
          <UserInfo/>
        </View>
        <View style={styles.splitters}/>
        <View style={styles.contentitem}>
          <TouchableHighlight underlayColor="transparent">
            <Image source={require('../../image/global_days.png')}/>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="transparent">
            <Text style={styles.text} onPress={this.getChargeView}>桩家视界</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.splitters}/>
        <View style={styles.contentitem}>
          <TouchableHighlight underlayColor="transparent">
            <Image source={require('../../image/ic_menu_mark.png')}/>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="transparent">
            <Text style={styles.text}>去评分</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.contentitem}>
          <TouchableHighlight underlayColor="transparent">
            <Image source={require('../../image/ic_menu_update.png')}/>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="transparent">
            <Text style={styles.text}>检查版本</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.contentitem}>
          <TouchableHighlight underlayColor="transparent">
            <Image source={require('../../image/ic_menu_about.png')}/>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="transparent">
            <Text style={styles.text} onPress={this.about}>关于桩家</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.splitters}/>
        <View style={styles.contentitem}>
          <TouchableHighlight underlayColor="transparent">
            <Image source={require('../../image/exit.png')}/>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="transparent">
            <Text style={styles.text} onPress={this.onLogOut}>退出登录</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: {},
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserManagementActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftMenu);
