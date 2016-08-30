import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import store from 'react-native-simple-store';
import UserManagementActions from '../../actions/UserManagementActions';
import Helper from '../../utils/helper';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F5F5F5',
    marginTop: 50,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingTop: 3,
    paddingBottom: 3,
  },
  rowBG: {
    backgroundColor: '#FFFFFF',
  },
  smallImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallImage: {
    width: 20,
    height: 20,
  },
  lineContainer: {
    backgroundColor: '#C5C1AA',
    height: 1,
  },
  vLine: {
    backgroundColor: '#C5C1AA',
    width: 1,
  },
  textInput: {
    flex: 9,
    height: 30,
    color: '#000000',
    margin: 0,
    padding: 0,
  },
  textCode: {
    flex: 6,
    height: 30,
    color: '#000000',
    margin: 0,
    padding: 0,
  },
  getCodeContainer: {
    flex: 3,
    flexDirection: 'row',
  },
  textRegistContainer: {
    backgroundColor: '#1e90ff',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 2,
  },
  textRegist: {
    height: 30,
    color: '#FFFFFF',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  textSmall: {
    flex: 1,
    height: 20,
    textAlign: 'right',
    textAlignVertical: 'center',
    fontSize: 9,
  },
  textSmallLink: {
    flex: 1,
    height: 20,
    color: '#1e90ff',
    textAlign: 'left',
    textAlignVertical: 'center',
    fontSize: 9,
  },
  textBlue: {
    flex: 1,
    color: '#1e90ff',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

class Regist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      code: '',
      isCountDown: false,
      count: 60,
      timer: null,
    };

    Helper.bindMethod(this);
  }

  componentWillUnmount() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
  }

  onRegist() {
    const parameter = {
      name: this.state.userName,
      password: this.state.password,
      authenticationCode: this.state.code,
    };
    this.props.actions.registRequest(parameter);
  }

  getCode() {
    const parameter = { cellNo: this.state.userName };
    this.props.actions.getAuthenticationCodeRequest(parameter);
    this.setState({
      isCountDown: true,
      count: 59,
    });

    this.state.timer = setInterval(this.countDown, 1000);
  }

  changeState(key, value) {
    this.setState({ [key]: value });
  }

  countDown() {
    if (this.state.count > 0) {
      this.setState({ count: this.state.count - 1 });
      return;
    }
    this.setState({
      isCountDown: false,
    });
  }

  renderGetCodeText() {
    if (!this.state.isCountDown) {
      return (
        <Text
          style={styles.textBlue}
          onPress={this.getCode}
        >
          获取验证码
        </Text>
      );
    }

    return (
      <Text
        style={styles.textBlue}
      >
        {this.state.count}秒后重试
      </Text>
    );
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={[styles.rowContainer, styles.rowBG]}>
          <View style={styles.smallImageContainer}>
            <Image
              source={require('../../image/login_icon_phonenumber.png')}
              style={styles.smallImage}
            />
          </View>
          <TextInput
            placeholder="请输入手机号"
            placeholderTextColor="#808080"
            style={styles.textInput}
            underlineColorAndroid="transparent"
            keyboardType="default"
            value={this.state.userName}
            onChangeText={text => { this.changeState('userName', text); }}
          />
        </View>
        <View
          style={styles.lineContainer}
        />
        <View style={[styles.rowContainer, styles.rowBG]}>
          <View style={styles.smallImageContainer}>
            <Image
              source={require('../../image/login_icon_password.png')}
              style={styles.smallImage}
            />
          </View>
          <TextInput
            ref={c => { this.passwordInput = c; }}
            placeholder="请输入密码"
            placeholderTextColor="#808080"
            style={styles.textInput}
            secureTextEntry
            underlineColorAndroid="transparent"
            keyboardType="default"
            value={this.state.password}
            onChangeText={text => { this.changeState('password', text); }}
          />
        </View>
        <View
          style={styles.lineContainer}
        />
        <View style={[styles.rowContainer, styles.rowBG]}>
          <View style={styles.smallImageContainer}>
            <Image
              source={require('../../image/login_icon_verifycode.png')}
              style={styles.smallImage}
            />
          </View>
          <TextInput
            ref={c => { this.passwordInput = c; }}
            placeholder="请输入短信验证码"
            placeholderTextColor="#808080"
            style={styles.textCode}
            secureTextEntry
            underlineColorAndroid="transparent"
            keyboardType="default"
            value={this.state.code}
            onChangeText={text => { this.changeState('code', text); }}
          />
          <View style={styles.getCodeContainer}>
            <View
              style={styles.vLine}
            />
            {this.renderGetCodeText()}
          </View>
        </View>
        <View style={[styles.rowContainer, styles.textRegistContainer]}>
          <Text
            style={styles.textRegist}
            onPress={this.onRegist}
          >
            立即注册
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Text
            style={styles.textSmall}
          >
            注册代表您已经阅读并同意
          </Text>
          <Text
            style={styles.textSmallLink}
            onPress={() => { Actions.userAgreement(); }}
          >
            《充电桩家用户协议和隐私条款》
          </Text>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state.UserManagementReducer,
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
)(Regist);
