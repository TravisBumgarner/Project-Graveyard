import React, { Component } from 'react';
import {
  Text,
} from 'react-native';

import {
  LoginView
} from "./Login.styles";

type Props = {};
export default class Login extends Component<Props> {
  render() {
    return (
      <LoginView>
        <Text>Login</Text>
      </LoginView>
    );
  }
}
