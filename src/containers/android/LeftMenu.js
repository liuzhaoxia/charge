/**
 * Created by zhongxiaoming on 2016/8/5.
 */
import React,{Component} from 'react';
import {View, Text, StyleSheet,TextInput,Image,TouchableHighlight} from "react-native";
import { connect } from 'react-redux'
import  {bindActionCreators} from 'redux'
import Button from "react-native-button";
import { Actions} from 'react-native-router-flux';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FF'
    },
    contentitem:{
        flexDirection: 'row',
        alignItems: 'center',
       
        padding:15
    },
    splitters:{
        height:1,
        backgroundColor:"#A9A9A9"
    },
    text:{
        fontSize:18,
        marginLeft:10
    }
});


class LeftMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animationType: 'none',
            modalVisible: false,
            transparent: false,
        };
        this.about = this.about.bind(this);

    }
    about() {
        Actions.About()
    }

    render(){
        return(
            <View style={styles.container}>

                <View  style={styles.contentitem} >

                    <TouchableHighlight underlayColor='transparent'>
                        <Image source={require('../../image/header.png')} />
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='transparent'>
                        <Text style={styles.text}>请点击登录</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.splitters}/>

                <View style={styles.contentitem}>
                    <TouchableHighlight underlayColor='transparent'>
                        <Image source={require('../../image/global_days.png')} />
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='transparent'>
                        <Text style={styles.text} >桩家视界</Text>
                    </TouchableHighlight>

                </View>
                <View style={styles.splitters}/>

                <View style={styles.contentitem}>
                    <TouchableHighlight underlayColor='transparent'>
                        <Image source={require('../../image/ic_menu_mark.png')}  />
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='transparent'>
                        <Text style={styles.text} >去评分</Text>
                    </TouchableHighlight>

                </View>

                <View style={styles.contentitem}>

                    <TouchableHighlight underlayColor='transparent'>
                        <Image source={require('../../image/ic_menu_update.png')} />
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='transparent'>
                        <Text style={styles.text} >检查版本</Text>
                    </TouchableHighlight>

                </View>

                <View style={styles.contentitem}>

                    <TouchableHighlight underlayColor='transparent'>
                        <Image source={require('../../image/ic_menu_about.png')} />
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='transparent'>
                        <Text style={styles.text} onPress={this.about}>关于桩家</Text>
                    </TouchableHighlight>

                </View>
                <View style={styles.splitters}/>
                <View style={styles.contentitem}>

                    <TouchableHighlight underlayColor='transparent'>
                        <Image source={require('../../image/exit.png')} />
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='transparent'>
                        <Text style={styles.text} >退出登录</Text>
                    </TouchableHighlight>

                </View>
            </View>
        )

    }

}

export default LeftMenu