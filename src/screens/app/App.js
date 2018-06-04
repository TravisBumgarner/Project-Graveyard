import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Home from '../Home';
import Login from '../Login';

const RootStack = createStackNavigator(
  {
    Home,
    Login,
  },
  {
    initialRouteName: 'Home',
  }
);


export default class App extends Component {
  render() {
    return <RootStack />;
  }
}