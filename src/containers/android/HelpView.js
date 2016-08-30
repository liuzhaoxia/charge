/**
 * Created by zhaohang on 2016/8/25.
 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-native-button';
import Swiper from 'react-native-swiper';
import Helper from '../../utils/helper';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 50,
  },
  bgImage: {
    flex: 1,
    width: undefined,
    height: 1150,

    // 需要将width和height都设置为undefined，图片尺寸才能自动缩放
  },
});

class HelpView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    this.setState({});
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.rootContainer}>
          <Image source={require('../../image/bg_help.png')} style={styles.bgImage}/>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HelpView);

