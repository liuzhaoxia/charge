/**
 * Created by 123 on 2016/8/10.
 */
import ViewPager from 'react-native-viewpager'
import React, { Component } from 'react';
import {View, Text,TextInput ,TouchableHighlight,StyleSheet,Image,ScrollView} from "react-native";
import { connect } from 'react-redux';
import  {bindActionCreators} from 'redux';
import ScrollableTabView  from 'react-native-scrollable-tab-view';
import { Actions } from "react-native-router-flux";
import detailActions  from '../../actions/detailActions'
const dataSource = new ViewPager.DataSource({
    pageHasChanged: (p1, p2) => p1 !== p2,
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    page: {
        width: 300,
    },
    button: {
        padding: 10,
    },
    container: {
        flexDirection:'row',
        padding: 5,
        height:40,
        backgroundColor:'#00BFFF',
    },avatarimage: {
        width: 24,
        height: 24,
        alignSelf: 'center',
        marginTop:3
    },textTitle:{
        width:100,
        height:40,
        margin:5,
        fontSize: 15,
        color: '#FFFFFF',
        alignSelf: 'center'
    },
});
class imageViewPager extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            dataSource: dataSource.cloneWithPages(this.props.detailData[0].plotPic),
            page: 0
        }
        this._renderPage=this._renderPage.bind(this);
        this.backDetail=this.backDetail.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            detailData:nextProps.detailData
        });
    }



    _renderPage(data){
        console.log(data);
            return (
                <Image source={{uri: data}} style={{width:400,height:500}}/>
            )

    }
    backDetail(){
        Actions.DetailInfo();
    }

    render(){
        return(
            <View style={{flex:1}}>
                <View style={styles.container}>
                    <View>
                        <TouchableHighlight underlayColor='transparent'
                                            onPress={this.backDetail}>
                            <Image source={require('../../image/back.png')} style={styles.avatarimage}/>
                        </TouchableHighlight>
                    </View>
                    <View style={{width:300}}>
                        <Text style={styles.textTitle}>图片浏览</Text>
                    </View>
                </View>
                <ViewPager
                    dataSource={this.state.dataSource}

                    renderPage={this._renderPage}/>

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
)(imageViewPager)