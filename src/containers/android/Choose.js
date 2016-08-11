/**
 * Created by zhaohang on 2016/8/8.
 */
import React ,{Component}from 'react';
import {View, Text, StyleSheet,TextInput,Image,ListView,TouchableHighlight,Platform,TouchableWithoutFeedback,ScrollView} from "react-native";
import { connect } from 'react-redux'
import  {bindActionCreators} from 'redux'
import Button from "react-native-button";
const styles = StyleSheet.create({
    thumb: {
        padding: 10,
        height: 60,
        overflow: 'hidden',
        backgroundColor: 'white',
        width: 80,
        marginLeft: 13,
        marginTop: 10,
        borderColor: '#D8D8D8',
        borderWidth: 1
    },
    thumb1: {
        padding: 10,
        height: 60,
        overflow: 'hidden',
        backgroundColor: 'white',
        width: 80,
        marginLeft: 13,
        marginTop: 10,
        borderColor: '#3366FF',
        borderWidth: 1
    },
    longButton: {
        padding: 2,
        height: 20,
        overflow: 'hidden',
        backgroundColor: 'white',
        width: 111,
        marginLeft: 13,
        marginTop: 10,
        borderColor: '#D8D8D8',
        borderWidth: 1
    },
    longButton1: {
        padding: 2,
        height: 20,
        overflow: 'hidden',
        backgroundColor: 'white',
        width: 111,
        marginLeft: 13,
        marginTop: 10,
        borderColor: '#3366FF',
        borderWidth: 1
    },
    image: {
        width: 20,
        height: 20,
        alignSelf: 'center'
    },
    text: {
        alignSelf: 'center',
        marginTop: 5,
        fontSize: 10,
        color: '#282828'
    },
    text1: {
        alignSelf: 'center',
        marginTop: 5,
        fontSize: 10,
        color: '#3366FF'
    },
    flexContainer: {
        flexDirection: 'row'
    },
    brand: {
        marginLeft: 13,
        marginTop: 10,
    },
    container: {
        height: 250,
        borderBottomWidth: 1,
        borderBottomColor: '#D8D8D8'
    },
    chargeContainer: {
        height: 70,
        borderBottomWidth: 1,
        borderBottomColor: '#D8D8D8'
    },
    payContainer: {
        height: 310,
        borderBottomWidth: 1,
        borderBottomColor: '#D8D8D8'
    },
    chargeText: {
        alignSelf: 'center',
        fontSize: 10,
        color: '#282828'
    },
    chargeText1: {
        alignSelf: 'center',
        fontSize: 10,
        color: '#3366FF'
    },testObj:{
        position:'absolute',
        left :100,
        top:100
    }
});
class Choose extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brands: [
                [
                    {
                        name: '全部',
                        select: true
                    },
                    {
                        name: '特斯拉',
                        select: false
                    },
                    {
                        name: '腾势',
                        select: false
                    },
                    {
                        name: '宝马',
                        select: false
                    }
                ],
                [
                    {
                        name: '比亚迪(电动)',
                        select: false
                    },
                    {
                        name: '荣威',
                        select: false
                    },
                    {
                        name: '北汽',
                        select: false
                    },
                    {
                        name: '众泰',
                        select: false
                    }
                ],
                [
                    {
                        name: '比亚迪(混动)',
                        select: false
                    },
                    {
                        name: '江铃',
                        select: false
                    },
                    {
                        name: '江淮',
                        select: false
                    },
                    {
                        name: '其他',
                        select: false
                    }
                ]
            ],
            chargeType: [
                {
                    name: '全部',
                    select: true
                },
                {
                    name: '快冲',
                    select: false
                },
                {
                    name: '慢充',
                    select: false
                }
            ],
            parking: [
                {
                    name: '全部',
                    select: true
                },
                {
                    name: '免费',
                    select: false
                },
                {
                    name: '付费',
                    select: false
                }
            ],
            property: [
                {
                    name: '全部',
                    select: true
                },
                {
                    name: '共用',
                    select: false
                },
                {
                    name: '专用',
                    select: false
                }
            ],
            allPay: [
                {
                    name: '全部',
                    select: true
                }
            ],
            quickPay: [
                [
                    {
                        name: '免费',
                        select: false
                    },
                    {
                        name: '现金',
                        select: false
                    },
                    {
                        name: '微信',
                        select: false
                    }
                ],
                [
                    {
                        name: '支付宝',
                        select: false
                    },
                    {
                        name: '星星APP',
                        select: false
                    },
                    {
                        name: '特来电APP',
                        select: false
                    }
                ],
                [
                    {
                        name: '聚电桩APP',
                        select: false
                    },
                    {
                        name: '电桩APP',
                        select: false
                    },
                    {
                        name: '绿狗APP',
                        select: false
                    }
                ],
                [
                    {
                        name: '依威能源APP',
                        select: false
                    },
                    {
                        name: 'E APP',
                        select: false
                    },
                    {
                        name: '其他APP',
                        select: false
                    }
                ]
            ],payCard: [
                [
                    {
                        name: '国网普通卡',
                        select: false
                    },
                    {
                        name: 'SGCC HW. card',
                        select: false
                    },
                    {
                        name: '中国普天充值卡',
                        select: false
                    }
                ],
                [
                    {
                        name: '小易充值卡',
                        select: false
                    },
                    {
                        name: '易冲卡',
                        select: false
                    },
                    {
                        name: '其他充值卡',
                        select: false
                    }
                ]
            ]
        };
        this.test = this.test.bind(this);
        this.renderTask = this.renderTask.bind(this);
        this.handlePress = this.handlePress.bind(this);
        this.charge = this.charge.bind(this);
        this.handleChargePress = this.handleChargePress.bind(this);
        this.parking = this.parking.bind(this);
        this.handleParkingPress = this.handleParkingPress.bind(this);
        this.property = this.property.bind(this);
        this.handlePropertyPress = this.handlePropertyPress.bind(this);
        this.allPay = this.allPay.bind(this);
        this.handleAllPayPress = this.handleAllPayPress.bind(this);
        this.handleQuickPayPress = this.handleQuickPayPress.bind(this);
        this.handlePayCardPress = this.handlePayCardPress.bind(this);
        this.quickPay = this.quickPay.bind(this);
        this.renderQuickPay = this.renderQuickPay.bind(this);
        this.payCard = this.payCard.bind(this);
        this.renderPayCard = this.renderPayCard.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({});
    }

    componentWillMount() {

    }

    handlePress(name) {
        let brands = this.state.brands;
        for (var i in brands) {
            for (var j in brands[i]) {
                if (brands[i][j].name == name) {
                    brands[i][j].select = true;
                } else {
                    brands[i][j].select = false;
                }
            }
        }
        this.setState({brands: brands});
    }

    handleChargePress(name) {
        let charge = this.state.chargeType;
        for (var i in charge) {
            if (charge[i].name == name) {
                charge[i].select = true;
            } else {
                charge[i].select = false;
            }
        }
        this.setState({chargeType: charge});
    }

    handleParkingPress(name) {
        let parking = this.state.parking;
        for (var i in parking) {
            if (parking[i].name == name) {
                parking[i].select = true;
            } else {
                parking[i].select = false;
            }
        }
        this.setState({parking: parking});
    }

    handlePropertyPress(name) {
        let property = this.state.property;
        for (var i in property) {
            if (property[i].name == name) {
                property[i].select = true;
            } else {
                property[i].select = false;
            }
        }
        this.setState({property: property});
    }
    handleAllPayPress(name) {
        let allPay = this.state.allPay;
        let quickPay = this.state.quickPay;
        let payCard = this.state.payCard;
        allPay[0].select = true;
        for (var i in quickPay) {
            for (var j in quickPay[i]) {
                quickPay[i][j].select = false;
            }
        }
        for (var n in payCard) {
            for (var m in payCard[n]) {
                payCard[n][m].select = false;
            }
        }
        this.setState({allPay: allPay});
        this.setState({quickPay: quickPay});
        this.setState({payCard: payCard});
    }
    handleQuickPayPress(name) {
        let allPay = this.state.allPay;
        let quickPay = this.state.quickPay;
        for (var i in quickPay) {
            for (var j in quickPay[i]) {
                if (quickPay[i][j].name == name) {
                    quickPay[i][j].select = !quickPay[i][j].select;
                    allPay[0].select = false;
                }
            }
        }
        this.setState({allPay: allPay});
        this.setState({quickPay: quickPay});
    }
    handlePayCardPress(name) {
        let allPay = this.state.allPay;
        let payCard = this.state.payCard;
        for (var i in payCard) {
            for (var j in payCard[i]) {
                if (payCard[i][j].name == name) {
                    payCard[i][j].select = !payCard[i][j].select;
                    allPay[0].select = false;
                }
            }
        }
        this.setState({allPay: allPay});
        this.setState({payCard: payCard});
    }

    render() {
        return (
            <ScrollView >
            <View>
                <View style={styles.container}>
                    <Text style={styles.brand}>按车辆品牌</Text>
                    <View>
                        {this.state.brands.map(this.test)}
                    </View>
                </View>
                <View style={styles.chargeContainer}>
                    <Text style={styles.brand}>按快冲慢充</Text>
                    <View style={styles.flexContainer}>
                        {this.state.chargeType.map(this.charge)}
                    </View>
                </View>
                <View style={styles.chargeContainer}>
                    <Text style={styles.brand}>按停车收费（元/小时）</Text>
                    <View style={styles.flexContainer}>
                        {this.state.parking.map(this.parking)}
                    </View>
                </View>
                <View style={styles.chargeContainer}>
                    <Text style={styles.brand}>按属性</Text>
                    <View style={styles.flexContainer}>
                        {this.state.property.map(this.property)}
                    </View>
                </View>
                <View style={styles.payContainer}>
                    <Text style={styles.brand}>按支付方式（可多选）</Text>
                    <View style={styles.flexContainer}>
                        {this.state.allPay.map(this.allPay)}
                    </View>
                    <Text style={styles.brand}>便捷支付</Text>
                    <View>
                        {this.state.quickPay.map(this.quickPay)}
                    </View>
                    <Text style={styles.brand}>充值卡</Text>
                    <View>
                        {this.state.payCard.map(this.payCard)}
                    </View>
                </View>
            </View>
            </ScrollView>
        )
    }
    allPay(data, index) {
        if (data.select) {
            return (
                <Button
                    containerStyle={styles.longButton1}
                    key={index}
                >
                    <View>
                        <Text style={styles.chargeText1}>{data.name}</Text>
                    </View>
                </Button>
            );
        } else {
            return (
                <Button
                    containerStyle={styles.longButton}
                    key={index}
                    onPress={() => this.handleAllPayPress(data.name)}
                >
                    <View>
                        <Text style={styles.chargeText}>{data.name}</Text>
                    </View>
                </Button>
            );
        }
    }
    property(data, index) {
        if (data.select) {
            return (
                <Button
                    containerStyle={styles.longButton1}
                    key={index}
                >
                    <View>
                        <Text style={styles.chargeText1}>{data.name}</Text>
                    </View>
                </Button>
            );
        } else {
            return (
                <Button
                    containerStyle={styles.longButton}
                    key={index}
                    onPress={() => this.handlePropertyPress(data.name)}
                >
                    <View>
                        <Text style={styles.chargeText}>{data.name}</Text>
                    </View>
                </Button>
            );
        }
    }

    parking(data, index) {
        if (data.select) {
            return (
                <Button
                    containerStyle={styles.longButton1}
                    key={index}
                >
                    <View>
                        <Text style={styles.chargeText1}>{data.name}</Text>
                    </View>
                </Button>
            );
        } else {
            return (
                <Button
                    containerStyle={styles.longButton}
                    key={index}
                    onPress={() => this.handleParkingPress(data.name)}
                >
                    <View>
                        <Text style={styles.chargeText}>{data.name}</Text>
                    </View>
                </Button>
            );
        }
    }

    charge(data, index) {
        if (data.select) {
            return (
                <Button
                    containerStyle={styles.longButton1}
                    key={index}
                >
                    <View>
                        <Text style={styles.chargeText1}>{data.name}</Text>
                    </View>
                </Button>
            );
        } else {
            return (
                <Button
                    containerStyle={styles.longButton}
                    key={index}
                    onPress={() => this.handleChargePress(data.name)}
                >
                    <View>
                        <Text style={styles.chargeText}>{data.name}</Text>
                    </View>
                </Button>
            );
        }
    }

    test(data, index) {
        return (
            <View style={styles.flexContainer} key={index}>
                {data.map(this.renderTask)}
            </View>
        );
    }

    renderTask(brand, index) {
        const randomImages = [
            require('../../image/logo.png'),
            require('../../image/login.png')
        ];
        if (brand.select) {
            return (
                <Button
                    containerStyle={styles.thumb1}
                    key={index}
                >
                    <View>
                        <Image style={styles.image}
                               source={randomImages[Math.floor(Math.random()*randomImages.length)]}/>
                        <Text style={styles.text1}>{brand.name}</Text>
                    </View>
                </Button>
            );
        } else {
            return (
                <Button
                    containerStyle={styles.thumb}
                    key={index}
                    onPress={() => this.handlePress(brand.name)}
                >
                    <View>
                        <Image style={styles.image}
                               source={randomImages[Math.floor(Math.random()*randomImages.length)]}/>
                        <Text style={styles.text}>{brand.name}</Text>
                    </View>
                </Button>
            );
        }

    }

    quickPay(data, index) {
        return (
            <View style={styles.flexContainer} key={index}>
                {data.map(this.renderQuickPay)}
            </View>
        );
    }

    renderQuickPay(quickPay, index) {
        if (quickPay.select) {
            return (
                <Button
                    containerStyle={styles.longButton1}
                    key={index}
                    onPress={() => this.handleQuickPayPress(quickPay.name)}
                >
                    <View>
                        <Text style={styles.chargeText1}>{quickPay.name}</Text>
                    </View>
                </Button>
            );
        } else {
            return (
                <Button
                    containerStyle={styles.longButton}
                    key={index}
                    onPress={() => this.handleQuickPayPress(quickPay.name)}
                >
                    <View>
                        <Text style={styles.chargeText}>{quickPay.name}</Text>
                    </View>
                </Button>
            );
        }

    }
    payCard(data, index) {
        return (
            <View style={styles.flexContainer} key={index}>
                {data.map(this.renderPayCard)}
            </View>
        );
    }

    renderPayCard(payCard, index) {
        if (payCard.select) {
            return (
                <Button
                    containerStyle={styles.longButton1}
                    key={index}
                    onPress={() => this.handlePayCardPress(payCard.name)}
                >
                    <View>
                        <Text style={styles.chargeText1}>{payCard.name}</Text>
                    </View>
                </Button>
            );
        } else {
            return (
                <Button
                    containerStyle={styles.longButton}
                    key={index}
                    onPress={() => this.handlePayCardPress(payCard.name)}
                >
                    <View>
                        <Text style={styles.chargeText}>{payCard.name}</Text>
                    </View>
                </Button>
            );
        }

    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Choose)
