/**
 * Created by 123 on 2016/8/5.
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  ListView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Helper from '../../utils/helper';

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00BFFF',
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: '#ccc',
  },
  tabItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

class DefaultTabBar extends React.Component {
  // 初始化模拟数据
  constructor(props) {
    super(props);
    this.state = {};
    Helper.bindMethod(this);
  }

  componentDidMount() {
    // Animated.Value监听范围 [0, tab数量-1]
    this.props.scrollValue.addListener(this.setAnimationValue);
  }

  setAnimationValue({ value }) {
    // console.log(value);
  }

  renderTabOption(tab, i) {
    const tabColor = this.props.activeTab === i ? '#FFFFFF' : '#000000'; // 判断i是否是当前选中的tab，设置不同的颜色
    return (
      <TouchableOpacity key={i} onPress={() => { this.props.goToPage(i); }} style={styles.tab}>
        <View style={styles.tabItem}>
          <Text style={{ color: tabColor }}>
            {this.props.tabNames[i]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.tabs}>
        {this.props.tabNames.map((tab, i) => this.renderTabOption(tab, i))}
      </View>
    );
  }
}

export default DefaultTabBar;

