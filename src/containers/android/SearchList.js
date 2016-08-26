/**
 * Created by zhongxiaoming on 2016/8/5.
 */
import React, { Component } from 'react';
import {  View,
    Text,
    Image,
    Navigator,
    TextInput,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    DrawerLayoutAndroid,
    TouchableWithoutFeedback
    } from "react-native";
import Button from "react-native-button";
import Modal from "react-native-modalbox";
import { connect } from 'react-redux';
import  {bindActionCreators} from 'redux';
import { Actions } from "react-native-router-flux";
import searchActions from '../../actions/SearchActions';
import Helper from '../../utils/helper';
import store from 'react-native-simple-store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  header:{
    height:50,
    flexDirection: 'row',
    backgroundColor:'#4EC3EE',
    alignItems: 'center',
    paddingTop:5,
    paddingBottom:5
  },

  textinput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    color: '#e5e5e5',
    fontSize: 16
  },

  logintext: {
    color: '#FFFFFF',
    padding:5,
    fontSize: 16
  },
  search:{
    color: '#FFFFFF',
    padding:5,
    fontSize: 16
  }
});
class SearchList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      history:null,
    };
    Helper.bindMethod(this);
  }

  componentDidMount() {

  }
  
  changeState(key,value){
    this.setState({ [key]: value });
  }

  back(){
    Actions.pop();
  }

  search(){

  }

  componentWillReceiveProps(nextProps) {

  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Button style={styles.logintext} onPress={this.back}>返回</Button>
             <TextInput
                value={this.state.searchText}
                onChangeText={text => {
                   this.changeState('searchText', text);
                }}
               placeholder="搜索地点"
               placeholderTextColor ='#E0E0E0'
               onSubmitEditing={this.search}
               style={styles.textinput}
               underlineColorAndroid='transparent'
               keyboardType = 'default' />

          <Button style={styles.search} onPress={this.back} >取消</Button>
        </View>
      </View>
    )
  }
}
function mapStateToProps(state) {
    return {
        searchText:""
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(searchActions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchList)