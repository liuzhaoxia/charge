/**
 * Created by zhongxiaoming on 2016/8/5.
 */
//主页面
import React,{Component} from 'react';
import {View, Text, StyleSheet,TextInput,Image,TouchableHighlight,DrawerLayoutAndroid,TouchableWithoutFeedback} from "react-native";
import { connect } from 'react-redux'
import  {bindActionCreators} from 'redux'
import Button from "react-native-button";
import Map from './MapContainer';
import LeftMenu from './LeftMenu';
import { Actions } from "react-native-router-flux";
<<<<<<< HEAD

=======
>>>>>>> charge/master
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B3745'
    },
    header:{
        height:40,
        //flex:1,
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems: 'center',
    },

    map:{
        flex:1
    },

    textinput: {
        flex: 1,
        borderBottomColor:'#FFFFFF',
        borderBottomWidth:1,
        color: '#FFFFFF',
        fontSize: 16
    },

    logintext: {
        color: '#FFFFFF',
        fontSize: 16
    },
    search:{
        color: '#FFFFFF',
        fontSize: 16
    },
    image:{
        width:50,
        height:50,
        left:320,
        top:100

    }
});


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animationType: 'none',
            modalVisible: false,
            transparent: false,
        };

        this.openDrawer = this.openDrawer.bind(this);
        this.imagePress = this.imagePress.bind(this);
    }

    openDrawer() {
        this.drawer.openDrawer();
    }

    search() {
        console.log("search");

        Actions.shellsDetail();
    }
    imagePress() {
        Actions.Choose();
    }

    render(){
        var navigationView = (
            <LeftMenu></LeftMenu>
        );

        return (

            <DrawerLayoutAndroid
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                ref={(drawer) => { this.drawer = drawer; }}
                renderNavigationView={() => navigationView}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Button style={styles.logintext} onPress={this.openDrawer}>登 录</Button>
                        <TextInput placeholder="搜索地点" placeholderTextColor ='#E0E0E0'  style={styles.textinput} underlineColorAndroid='transparent'
                                   keyboardType = 'default'>
                        </TextInput>
                        <Button style={styles.search} onPress={this.search} >搜索</Button>
                    </View>
                    <View style={styles.map}>
<<<<<<< HEAD
=======
                        <Map></Map>
                        <TouchableWithoutFeedback  onPress={this.imagePress}>
                            <Image style={styles.image}
                                   source={require('../../image/custom_icon_normal.png')} />
                        </TouchableWithoutFeedback  >
>>>>>>> charge/master

                    </View>

                </View>
            </DrawerLayoutAndroid>
        );
    }
}

export  default Main;