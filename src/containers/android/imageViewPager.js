/**
 * Created by 123 on 2016/8/10.
 */
import ViewPager from 'react-native-viewpager';
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Actions } from 'react-native-router-flux';
import detailActions from '../../actions/detailActions';
import Helper from '../../utils/helper';

const dataSource = new ViewPager.DataSource({
  pageHasChanged: (p1, p2) => p1 !== p2,
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    height: 40,
    backgroundColor: '#00BFFF',
  },
  page: {
    width: 300,
  },
  button: {
    padding: 10,
  },
  avatarimage: {
    width: 24,
    height: 24,
    alignSelf: 'center',
    marginTop: 3,
  },
  textTitle: {
    width: 100,
    height: 40,
    margin: 5,
    fontSize: 15,
    color: '#FFFFFF',
    alignSelf: 'center',
    lineHeight: 30,
    textAlign: 'center',
  },
});

class imageViewPager extends React.Component {
  constructor(props) {
    super(props);
    const pic = [];
    this.props.singeData.plotPic.forEach(data => {
      pic.push(`http://chargingtest.navinfo.com/Charge/resources/photo/${data.url}`);
    });

    this.state = {
      dataSource: dataSource.cloneWithPages(pic),
      page: 0,
    };
    Helper.bindMethod(this);
  }

  componentWillReceiveProps(nextProps) {
    const pic = [];
    if (this.state.singeData !== nextProps.singeData) {
      nextProps.singeData.plotPic.forEach(data => {
        pic.push(`http://chargingtest.navinfo.com/Charge/resources/photo/${data.url}`);
      });
    }
    this.setState({
      singeData: nextProps.singeData,
    });
  }

  backDetail() {
    Actions.pop();
  }

  renderPage(data) {
    return (
      <Image source={{ uri: data }} style={{ width: 400, height: 500 }}/>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View>
            <TouchableHighlight underlayColor="transparent" onPress={this.backDetail}>
              <Image source={require('../../image/back.png')} style={styles.avatarimage}/>
            </TouchableHighlight>
          </View>
          <View style={{ alignItems: 'center', width: 300 }}>
            <Text style={styles.textTitle}>图片浏览</Text>
          </View>
        </View>
        <ViewPager
          dataSource={this.state.dataSource}
          renderPage={this.renderPage}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    singeData: state.mapReducer.singeData,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(detailActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(imageViewPager);
