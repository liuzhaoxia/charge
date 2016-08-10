/**
 * Created by 123 on 2016/8/9.
 */
import React, { Component } from 'react';
import {  View,
    Text,
    Image,
    Modal,
    Navigator,
    TextInput,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableHighlight} from "react-native";
import Button from "react-native-button";
import { connect } from 'react-redux';
import  {bindActionCreators} from 'redux';
import detailActions  from '../../actions/detailActions'
import { Actions } from "react-native-router-flux";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#ECECF0',
    },
    // modal的样式
    modalStyle: {
        // backgroundColor:'#ccc',
        alignItems: 'flex-end',
        justifyContent:'flex-end',
        flex:1,
    },
    // modal上子View的样式
    subView:{
        marginLeft:20,
        marginRight:20,
        backgroundColor:'#fff',
        alignSelf: 'stretch',
        justifyContent:'center',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor:'#ccc',
    },
    // 标题
    titleText:{
        marginTop:10,
        marginBottom:5,
        fontSize:16,
        fontWeight:'bold',
        textAlign:'center',
    },
    // 内容
    contentText:{
        margin:8,
        fontSize:14,
        textAlign:'center',
    },
    // 水平的分割线
    horizontalLine:{
        marginTop:5,
        height:0.5,
        backgroundColor:'#ccc',
    },
    // 按钮
    buttonView:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonStyle:{
        flex:1,
        height:44,
        alignItems: 'center',
        justifyContent:'center',
    },
    // 竖直的分割线
    verticalLine:{
        width:0.5,
        height:44,
        backgroundColor:'#ccc',
    },
    buttonText:{
        fontSize:16,
        color:'#3393F2',
        textAlign:'center',
    },
});
class shellsDetail extends Component {
// 初始化模拟数据
    constructor(props) {
        super(props);

        this.state = {
            detailData:this.props.detailData,
            show:true
        };
        this._setModalVisible=this._setModalVisible.bind(this);
        this.toDetailContainer=this.toDetailContainer.bind(this);
    }



    _setModalVisible() {
        this.setState({
            show:!this.state.show,
        });
    }
    toDetailContainer(){
        this.setState({
            show:false,
        });
        Actions.DetailInfo();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            detailData:nextProps.detailData
        });
    }

    render(){
        let data=this.state.detailData[0];
        return (
            <View style={{flex:1}}>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.show}
                    onShow={() => {}}
                    onRequestClose={() => {}} >
                    <View style={styles.modalStyle}>
                        <View style={styles.subView}>
                            <View style={{flexDirection:'row',marginTop:5}}>
                                <View>
                                    <Image source={require('../../image/charge_station_common.png')} />
                                </View>
                                <View style={{width:200}}>
                                    <Text style={styles.nameTitle}>{data.name}</Text>
                                </View>
                                <View>
                                    <Image source={data.carBrand==='3'?require('../../image/bmw.png'):require('../../image/bmw.png')}/>
                                </View>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View>
                                    <Text style={{fontSize:10,marginLeft:30}}>{data.address}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={{marginLeft:30,marginTop:5}}>
                                    <Image source={data.state===0?require('../../image/charge_avail.png'):require('../../image/charge_unavail.png')}/>
                                </View>
                                <View >
                                    <Text style={{width:200}}>慢充</Text>
                                </View>
                                <View>
                                    <Text style={{margin:4}}>{data.distance}km</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={{marginLeft:30,marginTop:5}}>
                                    <Image source={data.state===0?require('../../image/text_paytype.png'):require('../../image/charge_unavail.png')}/>
                                </View>
                                <View>
                                    <Text>{data.payment}</Text>
                                </View>
                            </View>

                            <View style={styles.horizontalLine} />
                            <View style={styles.buttonView}>
                                <TouchableHighlight underlayColor='transparent'
                                                    style={styles.buttonStyle}
                                                    onPress={this._setModalVisible.bind(this)}>
                                    <Text style={styles.buttonText}>
                                        引导
                                    </Text>
                                </TouchableHighlight>
                                <View style={styles.verticalLine} />
                                <TouchableHighlight underlayColor='transparent'
                                                    style={styles.buttonStyle}
                                                    onPress={this.toDetailContainer}>
                                    <Text style={styles.buttonText}>
                                        详情
                                    </Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>

        )
    }
}
function mapStateToProps(state) {
    return {
        detailData:state.detailReducer.detailData,
        showOrHide:state.mapReducer.showOrHide,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(detailActions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(shellsDetail)