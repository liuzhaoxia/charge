/**
 * Created by zhaohang on 2016/8/8.
 */
import React, { Component } from 'react';
import { View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ListView,
  TouchableHighlight,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  ToolbarAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-native-button';
import Helper from '../../utils/helper';

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
    borderWidth: 1,
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
    borderWidth: 1,
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
    borderWidth: 1,
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
    borderWidth: 1,
  },
  image: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  text: {
    alignSelf: 'center',
    marginTop: 5,
    fontSize: 10,
    color: '#282828',
  },
  text1: {
    alignSelf: 'center',
    marginTop: 5,
    fontSize: 10,
    color: '#3366FF',
  },
  flexContainer: {
    flexDirection: 'row',
  },
  brand: {
    marginLeft: 13,
    marginTop: 10,
  },
  container: {
    height: 250,
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8',
    marginTop: 45,
  },
  chargeContainer: {
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8',
  },
  payContainer: {
    height: 310,
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8',
  },
  chargeText: {
    alignSelf: 'center',
    fontSize: 10,
    color: '#282828',
  },
  chargeText1: {
    alignSelf: 'center',
    fontSize: 10,
    color: '#3366FF',
  },
  testObj: {
    position: 'absolute',
    left: 100,
    top: 100,
  },
  toolbar: {
    backgroundColor: '#e9eaed',
    height: 56,
  },
});

class Choose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [
        [
          {
            name: '全部',
            select: true,
          },
          {
            name: '特斯拉',
            select: false,
          },
          {
            name: '腾势',
            select: false,
          },
          {
            name: '宝马',
            select: false,
          },
        ],
        [
          {
            name: '比亚迪(电动)',
            select: false,
          },
          {
            name: '荣威',
            select: false,
          },
          {
            name: '北汽',
            select: false,
          },
          {
            name: '众泰',
            select: false,
          },
        ],
        [
          {
            name: '比亚迪(混动)',
            select: false,
          },
          {
            name: '江铃',
            select: false,
          },
          {
            name: '江淮',
            select: false,
          },
          {
            name: '其他',
            select: false,
          },
        ],
      ],
      chargeType: [
        {
          name: '全部',
          select: true,
        },
        {
          name: '快冲',
          select: false,
        },
        {
          name: '慢充',
          select: false,
        },
      ],
      parking: [
        {
          name: '全部',
          select: true,
        },
        {
          name: '免费',
          select: false,
        },
        {
          name: '付费',
          select: false,
        },
      ],
      property: [
        {
          name: '全部',
          select: true,
        },
        {
          name: '共用',
          select: false,
        },
        {
          name: '专用',
          select: false,
        },
      ],
      allPay: [
        {
          name: '全部',
          select: true,
        },
      ],
      quickPay: [
        [
          {
            name: '免费',
            select: false,
          },
          {
            name: '现金',
            select: false,
          },
          {
            name: '微信',
            select: false,
          },
        ],
        [
          {
            name: '支付宝',
            select: false,
          },
          {
            name: '星星APP',
            select: false,
          },
          {
            name: '特来电APP',
            select: false,
          },
        ],
        [
          {
            name: '聚电桩APP',
            select: false,
          },
          {
            name: '电桩APP',
            select: false,
          },
          {
            name: '绿狗APP',
            select: false,
          },
        ],
        [
          {
            name: '依威能源APP',
            select: false,
          },
          {
            name: 'E APP',
            select: false,
          },
          {
            name: '其他APP',
            select: false,
          },
        ],
      ],
      payCard: [
        [
          {
            name: '国网普通卡',
            select: false,
          },
          {
            name: 'SGCC HW. card',
            select: false,
          },
          {
            name: '中国普天充值卡',
            select: false,
          },
        ],
        [
          {
            name: '小易充值卡',
            select: false,
          },
          {
            name: '易冲卡',
            select: false,
          },
          {
            name: '其他充值卡',
            select: false,
          },
        ],
      ],
      toolbar: {
        backgroundColor: '#e9eaed',
        height: 56,
      },
    };
    Helper.bindMethod(this);
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    this.setState({});
  }

  handlePress(name) {
    for (const row of this.state.brands) {
      for (const brand of row) {
        if (brand.name === name) {
          brand.select = true;
        } else {
          brand.select = false;
        }
      }
    }
    this.setState({ brands: this.state.brands });
  }

  handleChargePress(name) {
    for (const type of this.state.chargeType) {
      if (type.name === name) {
        type.select = true;
      } else {
        type.select = false;
      }
    }
    this.setState({ chargeType: this.state.chargeType });
  }

  handleParkingPress(name) {
    for (const park of this.state.parking) {
      if (park.name === name) {
        park.select = true;
      } else {
        park.select = false;
      }
    }
    this.setState({ parking: this.state.parking });
  }

  handlePropertyPress(name) {
    for (const property of this.state.property) {
      if (property.name === name) {
        property.select = true;
      } else {
        property.select = false;
      }
    }
    this.setState({ property: this.state.property });
  }

  handleAllPayPress(name) {
    this.state.allPay[0].select = true;
    for (const row of this.state.quickPay) {
      for (const pay of row) {
        pay.select = false;
      }
    }
    for (const row of this.state.payCard) {
      for (const card of row) {
        card.select = false;
      }
    }
    this.setState({ allPay: this.state.allPay });
    this.setState({ quickPay: this.state.quickPay });
    this.setState({ payCard: this.state.payCard });
  }

  handleQuickPayPress(name) {
    for (const row of this.state.quickPay) {
      for (const pay of row) {
        if (pay.name === name) {
          pay.select = !pay.select;
          this.state.allPay[0].select = false;
        }
      }
    }
    this.setState({ allPay: this.state.allPay });
    this.setState({ quickPay: this.state.quickPay });
  }

  handlePayCardPress(name) {
    for (const row of this.state.payCard) {
      for (const card of row) {
        if (card.name === name) {
          card.select = !card.select;
          this.state.allPay[0].select = false;
        }
      }
    }
    this.setState({ allPay: this.state.allPay });
    this.setState({ payCard: this.state.payCard });
  }

  allPay(data, index) {
    if (data.select) {
      return (
        <Button
          containerStyle={styles.longButton1}
          key={index}
          activeOpacity={1}
        >
          <View>
            <Text style={styles.chargeText1}>{data.name}</Text>
          </View>
        </Button>
      );
    }
    return (
      <Button
        containerStyle={styles.longButton}
        key={index}
        onPress={() => { this.handleAllPayPress(data.name); }}
        activeOpacity={1}
      >
        <View>
          <Text style={styles.chargeText}>{data.name}</Text>
        </View>
      </Button>
    );
  }

  property(data, index) {
    if (data.select) {
      return (
        <Button
          containerStyle={styles.longButton1}
          key={index}
          activeOpacity={1}
        >
          <View>
            <Text style={styles.chargeText1}>{data.name}</Text>
          </View>
        </Button>
      );
    }
    return (
      <Button
        containerStyle={styles.longButton}
        key={index}
        onPress={() => { this.handlePropertyPress(data.name); }}
        activeOpacity={1}
      >
        <View>
          <Text style={styles.chargeText}>{data.name}</Text>
        </View>
      </Button>
    );
  }

  parking(data, index) {
    if (data.select) {
      return (
        <Button
          containerStyle={styles.longButton1}
          key={index}
          activeOpacity={1}
        >
          <View>
            <Text style={styles.chargeText1}>{data.name}</Text>
          </View>
        </Button>
      );
    }
    return (
      <Button
        containerStyle={styles.longButton}
        key={index}
        onPress={() => { this.handleParkingPress(data.name); }}
        activeOpacity={1}
      >
        <View>
          <Text style={styles.chargeText}>{data.name}</Text>
        </View>
      </Button>
    );
  }

  charge(data, index) {
    if (data.select) {
      return (
        <Button
          containerStyle={styles.longButton1}
          key={index}
          activeOpacity={1}
        >
          <View>
            <Text style={styles.chargeText1}>{data.name}</Text>
          </View>
        </Button>
      );
    }
    return (
      <Button
        containerStyle={styles.longButton}
        key={index}
        onPress={() => { this.handleChargePress(data.name); }}
        activeOpacity={1}
      >
        <View>
          <Text style={styles.chargeText}>{data.name}</Text>
        </View>
      </Button>
    );
  }

  test(data, index) {
    return (
      <View style={styles.flexContainer} key={index}>
        {data.map(this.renderTask)}
      </View>
    );
  }

  quickPay(data, index) {
    return (
      <View style={styles.flexContainer} key={index}>
        {data.map(this.renderQuickPay)}
      </View>
    );
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
          onPress={() => { this.handlePayCardPress(payCard.name); }}
          activeOpacity={1}
        >
          <View>
            <Text style={styles.chargeText1}>{payCard.name}</Text>
          </View>
        </Button>
      );
    }
    return (
      <Button
        containerStyle={styles.longButton}
        key={index}
        onPress={() => { this.handlePayCardPress(payCard.name); }}
        activeOpacity={1}
      >
        <View>
          <Text style={styles.chargeText}>{payCard.name}</Text>
        </View>
      </Button>
    );
  }

  renderTask(brand, index) {
    const randomImages = [
      require('../../image/logo.png'),
      require('../../image/login.png'),
    ];

    if (brand.select) {
      return (
        <Button
          containerStyle={styles.thumb1}
          key={index}
          activeOpacity={1}
        >
          <View>
            <Image
              style={styles.image}
              source={randomImages[Math.floor(Math.random() * randomImages.length)]}
            />
            <Text style={styles.text1}>{brand.name}</Text>
          </View>
        </Button>
      );
    }
    return (
      <Button
        containerStyle={styles.thumb}
        key={index}
        onPress={() => { this.handlePress(brand.name); }}
        activeOpacity={1}
      >
        <View>
          <Image
            style={styles.image}
            source={randomImages[Math.floor(Math.random() * randomImages.length)]}
          />
          <Text style={styles.text}>{brand.name}</Text>
        </View>
      </Button>
    );
  }

  renderQuickPay(quickPay, index) {
    if (quickPay.select) {
      return (
        <Button
          containerStyle={styles.longButton1}
          key={index}
          onPress={() => { this.handleQuickPayPress(quickPay.name); }}
          activeOpacity={1}
        >
          <View>
            <Text style={styles.chargeText1}>{quickPay.name}</Text>
          </View>
        </Button>
      );
    }
    return (
      <Button
        containerStyle={styles.longButton}
        key={index}
        onPress={() => { this.handleQuickPayPress(quickPay.name); }}
        activeOpacity={1}
      >
        <View>
          <Text style={styles.chargeText}>{quickPay.name}</Text>
        </View>
      </Button>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
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
        <ToolbarAndroid
          style={styles.toolbar}
        >
          <View style={{ height: 56, flexDirection: 'row', alignItems: 'center' }}>
            <Button>保存</Button>
          </View>
        </ToolbarAndroid>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Choose);

