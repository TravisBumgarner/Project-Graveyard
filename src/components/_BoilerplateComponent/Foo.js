import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import {
} from "./Foo.styles";

export default class Foo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text>Hello.</Text>
      </View>
    );
  }
}