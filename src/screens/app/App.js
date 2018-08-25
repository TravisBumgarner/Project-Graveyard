import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Home from '../Home';
import Login from '../Login';

import { COLORS } from "../../theme";

const RootStack = createStackNavigator(
  {
    Home,
    Login,
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: `${ COLORS.SECONDARY }`,
      },
      headerTintColor: `${ COLORS.PRIMARY }`,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}