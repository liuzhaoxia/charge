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

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'stretch',
  },
  bgImage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 10,

    // 需要将width和height都设置为undefined，图片尺寸才能自动缩放
    width: undefined,
    height: undefined,
  },
});

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
      <View style={styles.rootContainer}>
        <Image
          style={styles.bgImage}
          source={require('../../image/splash.png')}
        />
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
