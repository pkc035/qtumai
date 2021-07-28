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
import { Ionicons, Entypo, FontAwesome5 } from '@expo/vector-icons';

export default class FloatingButton extends React.Component {
  animation = new Animated.Value(0);

  toggleMenu = () => {
    const toValue = this.open ? false : true;
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
            <Ionicons
              name="person"
              size={24}
              color="#e63D11"
              onPress={() => this.props.navigation.navigate('Who')}
            />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <Animated.View style={[styles.button, styles.secondary, where]}>
            <Entypo
              name="location-pin"
              size={26}
              color="#e63D11"
              onPress={() => this.props.navigation.navigate('Where')}
            />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this.toggleMenu}>
          <Animated.View style={[styles.button, styles.menu, rotation]}>
            <FontAwesome5 name="plus" size={24} color="#fff" />
          </Animated.View>
        </TouchableWithoutFeedback>
      </FloatingButtonContainer>
    );
  }
}

const FloatingButtonContainer = styled.View`
  align-items: center;
  position: absolute;
`;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 60 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: { height: 50 },
    elevation: 5,
    zIndex: 1000,
  },
  menu: {
    backgroundColor: '#e63D11',
  },
  secondary: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    backgroundColor: '#fff',
  },
});
