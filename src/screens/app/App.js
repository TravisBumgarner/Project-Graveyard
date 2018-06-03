import React, { Component } from 'react';

import {
  Header,
  AppView
} from "./App.styles";

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <AppView>
        <Header>
          Sup.
        </Header>
      </AppView>
    );
  }
}
