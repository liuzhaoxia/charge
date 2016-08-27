import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import UserManagementActions from '../../actions/UserManagementActions';
import Helper from '../../utils/helper';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#87CEFA',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 3,
    marginBottom: 3,
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  textRole: {
    height: 30,
    color: '#808080',
    textAlignVertical: 'center',
  },
  loginContainer: {
    width: 100,
    borderColor: '#808080',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 15,
  },
  textLogin: {
    flex: 1,
    height: 30,
    color: '#1e90ff',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    };

    Helper.bindMethod(this);
  }

  renderNoLogin() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.rowContainer}>
          <Image
            source={require('../../image/header.png')}
            style={styles.logoImage}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textRole}>
            游客
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.loginContainer}>
            <Text
              style={styles.textLogin}
              onPress={() => { Actions.login(); }}
            >
              登陆
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderLogin(user) {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.rowContainer}>
          <Image
            source={require('../../image/header.png')}
            style={styles.logoImage}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textRole}>
            {user.nameName}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <View>
            <Text style={styles.textRole}>
              电话号
            </Text>
          </View>
          <View>
            <Text style={styles.textRole}>
              微信
            </Text>
          </View>
          <View>
            <Text style={styles.textRole}>
              真名
            </Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { user } = this.props.state;
    if (!user) {
      return this.renderNoLogin();
    }

    return this.renderLogin(user);
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
)(UserInfo);
