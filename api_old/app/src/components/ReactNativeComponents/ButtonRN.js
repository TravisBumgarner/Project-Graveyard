import React, { Component } from 'react';
import {
  Button,
} from 'react-native';

import { COLORS } from "../../theme";

export default class ButtonRN extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      secondary,
      ...rest,
    } = this.props;

    return (
      <Button
        color={ `${ secondary ? COLORS.SECONDARY : COLORS.PRIMARY }` }
        { ...rest }
      />
    );
  }
}