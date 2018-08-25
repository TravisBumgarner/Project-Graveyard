import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { ButtonRN } from '../../components/ReactNativeComponents';

import {
  HomeView
} from "./Home.styles";

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <HomeView>
        <Text>Home Sfcreen</Text>
        <ButtonRN
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Login')}
        />
        <ButtonRN
          secondary
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </HomeView>
    );
  }
}