import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as WeChat from 'react-native-wechat';
import UserManagementActions from '../../actions/UserManagementActions';
import Helper from '../../utils/helper';
import { Global } from '../../Global';

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
  topContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 3,
    marginBottom: 3,
  },
  rightRowContainer: {
    justifyContent: 'flex-end',
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
    backgroundColor: '#808080',
    height: 1,
  },
  textInput: {
    flex: 9,
    height: 30,
    color: '#FFFFFF',
    margin: 0,
    padding: 0,
  },
  forgetPassword: {
    height: 30,
    color: '#808080',
    textAlignVertical: 'center',
  },
  textLoginContainer: {
    backgroundColor: '#1e90ff',
    borderRadius: 2,
  },
  textLogin: {
    flex: 1,
    height: 30,
    color: '#ffffff',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  textWeiXinLoginContainer: {
    borderColor: '#808080',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 2,
  },
  textWeiXinLogin: {
    flex: 1,
    height: 30,
    color: '#1e90ff',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    };

    Helper.bindMethod(this);
  }

  onLogin() {
    const parameter = {
      name: this.state.userName,
      password: this.state.password,
      clientId: 2,
    };

    this.props.actions.loginRequest(parameter);
  }

  //async onWeiXinLogin() {
  //  try {
  //    const result = await WeChat.sendAuthRequest();
  //    console.log(result);
  //  } catch (e) {
  //    console.log(e);
  //  }
  //}

  //onWeiXinLogin() {
  //  //const result = await WeChat.sendAuthRequest();
  //  console.log('test');
  //}

  changeState(key, value) {
    this.setState({ [key]: value });
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <Image
          source={require('../../image/loginBackground.jpg')}
          style={styles.bgImage}
        >
          <View style={styles.topContainer}>
            <Image
              source={require('../../image/logo.png')}
              style={styles.logoImage}
            />
          </View>
          <View style={styles.mainContainer}>
            <View style={styles.rowContainer}>
              <View style={styles.smallImageContainer}>
                <Image
                  source={require('../../image/logo.png')}
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
            <View style={styles.lineContainer} />
            <View style={styles.rowContainer}>
              <View style={styles.smallImageContainer}>
                <Image
                  source={require('../../image/logo.png')}
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
            <View style={styles.lineContainer} />
            <View style={[styles.rowContainer, styles.rightRowContainer]}>
              <Text
                style={styles.forgetPassword}
                onPress={() => { Actions.findPassword() }}
              >
                忘记密码?
              </Text>
            </View>
            <View style={[styles.rowContainer, styles.textLoginContainer]}>
              <Text
                style={styles.textLogin}
                onPress={this.onLogin}
              >
                登陆
              </Text>
            </View>
            <View style={[styles.rowContainer, styles.textWeiXinLoginContainer]}>
              <Text
                style={styles.textWeiXinLogin}
                onPress={this.onWeiXinLogin}
              >
                微信登陆
              </Text>
            </View>
            <View style={[styles.rowContainer, styles.textWeiXinLoginContainer]}>
              <Text
                style={styles.textWeiXinLogin}
                onPress={() => { Actions.regist(); }}
              >
                注册
              </Text>
            </View>
          </View>
        </Image>
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
)(Login);
