import React, { Component } from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';

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
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </HomeView>
    );
  }
}