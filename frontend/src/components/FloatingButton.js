import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components/native';
import { AntDesign, Entypo } from '@expo/vector-icons';

export default class FloatingButton extends React.Component {
  animation = new Animated.Value(0);

  toggleMenu = () => {
    const toValue = this.open ? 1 : 0;

    Animated.spring(this.animation, { toValue, friction: 8 }).start();
    this.open = !this.open;
  };

  render() {
    const who = {
      transform: [
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -120],
          }),
        },
      ],
    };
    const where = {
      transform: [
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -60],
          }),
        },
      ],
    };
    const rotation = {
      transform: [
        {
          rotate: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '45deg'],
          }),
        },
      ],
    };

    return (
      <FloatingButtonContainer style={this.props.position}>
        <TouchableWithoutFeedback>
          <Animated.View style={[styles.button, styles.secondary, who]}>
            <Entypo
              name='location-pin'
              size={20}
              color='#f02a4b'
              onPress={() => this.props.navigation.navigate('Who')}
            />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <Animated.View style={[styles.button, styles.secondary, where]}>
            <Entypo
              name='thumbs-up'
              size={20}
              color='#f02a4b'
              onPress={() => this.props.navigation.navigate('Where')}
            />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this.toggleMenu}>
          <Animated.View style={[styles.button, styles.menu, rotation]}>
            <AntDesign name='plus' size={24} color='#fff' />
          </Animated.View>
        </TouchableWithoutFeedback>
      </FloatingButtonContainer>
    );
  }
}

const FloatingButtonContainer = styled.View`
  align-items: center;
  /* position: absolute; */
  /* z-index: 1000; */
`;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 10,
    shadowColor: '#f02a4b',
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 },
    zIndex: 1000,
  },
  menu: {
    backgroundColor: '#f02a4b',
  },
  secondary: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    backgroundColor: '#fff',
  },
});
