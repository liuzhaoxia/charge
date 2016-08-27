/**
 * Created by zhongxiaoming on 2016/8/5.
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Navigator,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  DrawerLayoutAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
import Button from 'react-native-button';
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import store from 'react-native-simple-store';
import searchActions from '../../actions/searchActions';
import Helper from '../../utils/helper';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B3745',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#4EC3EE',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },

  textinput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    color: '#e5e5e5',
    fontSize: 16,
  },

  logintext: {
    color: '#FFFFFF',
    padding: 5,
    fontSize: 16,
  },
  search: {
    color: '#FFFFFF',
    padding: 5,
    fontSize: 16,
  },
});
class SearchList extends Component {
  constructor(props) {
    super(props);
    Helper.bindMethod(this);
  }

  componentDidMount() {
    console.log('search');
  }

  back() {
    Actions.pop();
  }

  search() {
    if (global.storage) {
      global.storage.load({
        key: 'searchHistory',
        autoSync: true,
        syncInBackground: true,
      }).then(
        (ret) => {
          console.log(ret);
        }
      );
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Button style={styles.logintext} onPress={this.back}>返回</Button>
          <TextInput
            placeholder="搜索地点"
            placeholderTextColor="#E0E0E0"
            onSubmitEditing={this.search}
            style={styles.textinput}
            underlineColorAndroid="transparent"
            keyboardType="default"
          />
          <Button
            style={styles.search}
            onPress={this.back}
          >
            取消
          </Button>
        </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    searchText: '',
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(searchActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchList);
