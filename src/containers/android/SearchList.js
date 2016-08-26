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
import searchActions from '../../actions/searchActions';
import Helper from '../../utils/helper';
import store from 'react-native-simple-store';
import { Global } from '../../Global';

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
      history:Global.appState.searchHistory || {list:[]},
    };
    Helper.bindMethod(this);
  }

  componentDidMount() {
    if(!Global.appState.searchHistory){
      Global.appState.searchHistory = {
        list:[]
      }
    }
  }

  changeState(key,value){
    this.setState({ [key]: value });
  }

  back(){
    Actions.pop();
  }

  search(){
    if(Global.appState.searchHistory){
      Global.appState.searchHistory.list.push(this.state.searchText);
    }
    this.setState({"history":Global.appState.searchHistory});
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
        <View>
          {
            this.state.history.list.map((text,i)=>{
              return (
                <View style={{flexDirection:"row"}}>
                   <View style={{flex:1}}>
                   <Image
                      source={require('../../image/history.png')}
                    />
                   </View>
                   <View style={{flex:8,underlineColorAndroid:"gray"}}>
                      <Text key={text+i} style={{color:"#000000"}}>{text}</Text>
                   </View>
                   <View style={{flex:1}}>
                   <Image
                      source={require('../../image/arrow.png')}
                    />
                   </View>
                </View>
              )
            })
          }
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