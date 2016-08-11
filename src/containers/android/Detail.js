/**
 * Created by zhongxiaoming on 2016/8/5.
 */
//搜索结果详情
import React, { Component } from 'react';
import {View, Text,TextInput ,TouchableHighlight,StyleSheet,Image,ScrollView} from "react-native";
import Button from "react-native-button";
import { connect } from 'react-redux';
import  {bindActionCreators} from 'redux';
import ScrollableTabView  from 'react-native-scrollable-tab-view';

import DefaultTabBar from './DefaultTabBar'
import detailActions  from '../../actions/detailActions'
import { Actions } from "react-native-router-flux";

import imageViewPager from './imageViewPager'
const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        padding: 5,
        height:40,
        backgroundColor:'#00BFFF',
    },
    textTitle:{
        width:50,
        height:40,
        margin:5,
        fontSize: 17,
        color: '#FFFFFF',
        alignSelf: 'center'
    },
    avatarimage: {
        width: 40,
        height: 30,
        alignSelf: 'center',
        borderRadius:126
    },
    logoImage:{
        width: 80,
        height: 80,
        alignSelf: 'center'
    },
    nameTitle:{
        margin:5,
        fontSize: 15,
        color: '#FFFFFF',
        alignSelf: 'center'
    },
    content: {
        flexDirection:'row',
        height:30,
    },scrollView: {
        height: 800,
    },

});
class Detail extends React.Component {
// 初始化模拟数据
    constructor(props) {
        super(props);

        this.state = {
            detailData:this.props.detailData,
            tabNames: ['充电插口', '服务信息'],
        };

        this.backShells=this.backShells.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            detailData:nextProps.detailData
        });
    }

    backShells(){
        Actions.shellsDetail();
    }

    render(){
        let tabNames = this.state.tabNames;
        let data=this.state.detailData[0];
        return (
            <View style={{flex:1}}>
                <View style={styles.container}>
                    <View>
                        <TouchableHighlight underlayColor='transparent'
                                            onPress={this.backShells}>
                        <Image source={require('../../image/back.jpg')} style={styles.avatarimage}/>
                        </TouchableHighlight>
                    </View>
                    <View style={{width:300}}>
                        <Text style={styles.textTitle}>详情</Text>
                    </View>
                </View>
                <View style={{borderBottomColor:'#e5e5e5',borderBottomWidth:1}}></View>
                <View style={{flexDirection:'row',backgroundColor:'#00BFFF'}}>
                    <View>
                        <TouchableHighlight underlayColor='transparent'
                                            onPress={this.openViewPage}>
                                 <Image source={require('../../image/logo.png')} style={styles.logoImage}/>
                        </TouchableHighlight>
                    </View>
                    <View style={{width:200}}>
                        <Text style={styles.nameTitle}>{data.name}</Text>
                        <Image style={{marginLeft:10}} source={data.carBrand==='3'?require('../../image/bmw.png'):require('../../image/bmw.png')}></Image>
                        <View style={{flexDirection:'row',marginTop:20}}>
                            <Image style={{marginLeft:10}} source={require('../../image/xposition.png')}></Image>
                            <Text style={{color:'#FFFFFF',margin:4}}>{data.distance}km</Text>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection:'row',height:40,padding:4}}>
                    <View>
                        <Image source={require('../../image/position.png')}></Image>
                    </View>
                    <View style={{width:275}}>
                        <Text style={{margin:5,fontSize: 14}}>{data.address}</Text>
                    </View>
                    <View style={{borderLeftColor:'#e5e5e5',borderLeftWidth:1,height:25,marginTop:2,marginBottom:2}}></View>
                    <View >
                        <Text style={{margin:5,color:'#00BFFF'}}>前往</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View>
                        <Image source={require('../../image/positionMap.jpg')} style={{flex:1}}></Image>
                    </View>
                </View>
                <View style={{flexDirection:'row',marginLeft:10}}>
                    <View style={{flexDirection:'row',width:90,height:30,marginTop:10}}>
                        <Image source={require('../../image/detail_icon_ok.png')}></Image>
                        <Text>可充电</Text>
                    </View>
                    <View style={{flexDirection:'row',width:90,height:30,marginTop:10}}>
                        <Image source={require('../../image/detail_icon_ok.png')}></Image>
                        <Text>可停车</Text>
                    </View>
                    <View style={{flexDirection:'row',width:90,height:30,marginTop:10}}>
                        <Image source={require('../../image/detail_icon_no.png')} ></Image>
                        <Text>可预约</Text>
                    </View>
                    <View style={{flexDirection:'row',width:90,height:30,marginTop:10}}>
                        <Image source={data.open24H===1?require('../../image/detail_icon_ok.png'):require('../../image/detail_icon_no.png')} ></Image>
                        <Text>24小时</Text>
                    </View>
                </View>
                <View style={{borderBottomColor:'#e5e5e5',borderBottomWidth:3}}></View>
                <View style={{flexDirection:'row'}}>
                    <View style={{marginTop:3,marginLeft:5}}>
                        <Image source={require('../../image/socket_icon.png')}></Image>
                    </View>
                    <View style={{width:280}}>
                        <Text style={{margin:5,fontSize: 15,fontWeight: 'bold'}}>慢充2</Text>
                    </View>
                    <View style={{flex:1,marginTop:10}}>
                        <Image source={data.state===0?require('../../image/charge_avail.png'):require('../../image/charge_unavail.png')}></Image>
                    </View>
                </View>
                <View style={{borderBottomColor:'#e5e5e5',borderBottomWidth:1}}></View>
                <View style={{flexDirection:'row'}}>
                    <View style={{marginTop:3,marginLeft:5}}>
                        <Image source={require('../../image/tele_icon.png')}></Image>
                    </View>
                    <View style={{width:280}}>
                        <Text style={{margin:5,fontSize: 15,fontWeight: 'bold'}}>{data.telephone}</Text>
                    </View>
                </View>
                <View style={{borderBottomColor:'#e5e5e5',borderBottomWidth:3}}></View>
                <ScrollableTabView
                    renderTabBar={() => <DefaultTabBar tabNames={tabNames}/>}
                    tabBarPosition='top'>
                    <View style={styles.content} tabLabel='key1'>
                        {
                            data.sockerParams.map((socker,i)=>{
                                return (
                                    <View key={i} style={{flexDirection:'row'}}>
                                        <View>
                                            <Image source={socker.plugType==='0'?require('../../image/socket_jiaoliudian3kongjiayong.png'):(socker.plugType==='1'?require('../../image/socket_guobiaojiaoliudian7kong.png'):(socker.plugType==='2'?require('../../image/socket_guobiaojiaoliudian9kong.png'):(socker.plugType==='3'?require('../../image/socket_meishijiaoliu5kong.png'):(socker.plugType==='4'?require('../../image/socket_meishizhiliucombo.png'):''))))} style={{width:25,height:25,margin:5}}/>
                                        </View>
                                        <View style={{width:250,flexDirection:'row'}}>
                                            <Text style={{margin:5}}>{socker.mode==='0'?'慢充':'快充'}{socker.acdc==='0'?'交流':'直流'}  {socker.plugType}</Text>
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{margin:5,color:'red'}}>{socker.chargingplot_count}</Text>
                                            <Text style={{margin:5}}>个</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }

                    </View>
                    <View style={{flex:1}} tabLabel='key2'>
                        <ScrollView>
                        <View style={styles.content}>
                            <View style={{width:100}}>
                                <Text style={{margin:5}}>计费方式</Text>
                            </View>
                            <View >
                                <Text style={{margin:5}}>{data.parking_fee}</Text>
                            </View>
                        </View>
                        <View style={{borderBottomColor:'#e5e5e5',borderBottomWidth:1}}></View>
                        <View style={styles.content}>
                            <View style={{width:100}}>
                                <Text style={{margin:5}}>支付方式</Text>
                            </View>
                            <View >
                                <Text style={{margin:5}}>{data.payment}</Text>
                            </View>
                        </View>
                        <View style={{borderBottomColor:'#e5e5e5',borderBottomWidth:1}}></View>
                        <View style={styles.content}>
                            <View style={{width:100}}>
                                <Text style={{margin:5}}>服务厂商</Text>
                            </View>
                            <View >
                                <Text style={{margin:5}}>{data.servicePro}</Text>
                            </View>
                        </View>
                            </ScrollView>
                    </View>
                </ScrollableTabView>
            </View>


        )
    }
}
function mapStateToProps(state) {
    return {
        detailData:state.detailReducer.detailData
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(detailActions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail)