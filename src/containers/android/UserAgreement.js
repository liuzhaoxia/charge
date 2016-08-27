import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
});

class UserAgreement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    };

    Helper.bindMethod(this);
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <Text>
          桩家用户协议
        </Text>
      </View>
    );
  }
}

export default UserAgreement;
