import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, Text, TouchableHighlight } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
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
    width: 16,
    height: 16,
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
  textResetAndLoginContainer: {
    backgroundColor: '#1e90ff',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 2,
  },
  textResetAndLogin: {
    height: 30,
    color: '#FFFFFF',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  textBlue: {
    flex: 1,
    color: '#1e90ff',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

class FindPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      code: '',
      isCountDown: false,
      count: 0,
      isShowPassword: false,
    };

    Helper.bindMethod(this);
  }

  onShowPassword() {
    this.setState({ isShowPassword: !this.state.isShowPassword });
  }

  onResetAndLogin() {
    const parameter = {
      cellNum: this.state.userName,
      password: this.state.password,
      authenticationCode: this.state.code,
    };
    this.props.actions.updatePasswordRequest(parameter);
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

  countDown() {
    if (this.state.count > 0) {
      this.setState({ count: this.state.count - 1 });
      return;
    }
    this.setState({
      isCountDown: false,
    });
  }

  changeState(key, value) {
    this.setState({ [key]: value });
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

  renderShowPasswordImage() {
    if (this.state.isShowPassword) {
      return (
        <Image
          source={require('../../image/login_icon_password.png')}
          style={styles.smallImage}
        />
      );
    }
    return (
      <Image
        source={require('../../image/login_icon_password.png')}
        style={styles.smallImage}
      />
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
              source={require('../../image/login_icon_verifycode.png')}
              style={styles.smallImage}
            />
          </View>
          <TextInput
            ref={c => { this.passwordInput = c; }}
            placeholder="请输入短信验证码"
            placeholderTextColor="#808080"
            style={styles.textCode}
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
            placeholder="密码: 至少6位"
            placeholderTextColor="#808080"
            style={styles.textInput}
            secureTextEntry={!this.state.isShowPassword}
            underlineColorAndroid="transparent"
            keyboardType="default"
            value={this.state.password}
            onChangeText={text => { this.changeState('password', text); }}
          />
          <View style={styles.smallImageContainer}>
            <TouchableHighlight onPress={this.onShowPassword}>
              {this.renderShowPasswordImage()}
            </TouchableHighlight>
          </View>
        </View>
        <View style={[styles.rowContainer, styles.textResetAndLoginContainer]}>
          <Text
            style={styles.textResetAndLogin}
            onPress={this.onResetAndLogin}
          >
            重置并登录
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
)(FindPassword);
