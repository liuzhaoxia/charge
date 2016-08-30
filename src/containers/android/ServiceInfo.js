/**
 * Created by 123 on 2016/8/8.
 * 服务信息
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  ListView,
  StyleSheet,
  Picker,
  Image,
  NativeModules,
  Platform,
} from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ServiceInfo extends React.Component {
  render() {
    return (
      <Text>服务信息</Text>
    );
  }
}

export default ServiceInfo;
