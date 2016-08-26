/**
 * Created by xujie3949 on 2016/8/26.
 */
import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import Helper from '../../utils/helper';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Error extends React.Component {
  constructor(props) {
    super(props);

    const deviceHeight = Dimensions.get('window').height;

    this.state = {
      deviceHeight,
      offset: new Animated.Value(-deviceHeight),
    };

    Helper.bindMethod(this);
  }

  componentDidMount() {
    Animated.timing(this.state.offset, {
      duration: 150,
      toValue: 0,
    }).start();
  }

  closeModal() {
    Animated.timing(this.state.offset, {
      duration: 150,
      toValue: -this.state.deviceHeight,
    }).start(Actions.pop);
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          { backgroundColor: 'rgba(52,52,52,0.5)' },
          { transform: [{ translateY: this.state.offset }] },
        ]}
      >
        <View
          style={{
            width: 250,
            height: 250,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >
          <Text>{this.props.data}</Text>
          <Button onPress={this.closeModal}>关闭</Button>
        </View>
      </Animated.View>
    );
  }
}

export default Error;

