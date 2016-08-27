/**
 * Created by xujie3949 on 2016/8/10.
 */
import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import * as WeChat from 'react-native-wechat';
import { connect } from 'react-redux';
import StartActions from '../../actions/StartActions';
import Helper from '../../utils/helper';

class Start extends Component {
  constructor(props) {
    super(props);

    Helper.bindMethod(this);
  }

  componentWillMount() {
    this.props.actions.loadUser();
  }

  componentDidMount() {
    // WeChat.registerApp('wx248881ad9815ad88');
  }

  render() {
    return (
      <View >
        <Text>
          这是启动页面
        </Text>
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
    actions: bindActionCreators(StartActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Start);
