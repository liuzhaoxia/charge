/**
 * Created by zhongxiaoming on 2016/8/27.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  ToastAndroid,
  ViewPagerAndroid,
  Image,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#CDCDCD',
    alignSelf: 'center',
  },
});

class NavButton extends Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#B5B5B5"
        onPress={this.props.onPress}
      >
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

NavButton.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  text: React.PropTypes.Text,
};

export default NavButton;
