import React, { Component } from 'react'

import { 
  PrimaryButton,
  SecondaryButton
} from './Button.styles'

export default class Button extends Component {
  render() {
    const {
      onClick,
      children,
    } = this.props;

    return (
      <PrimaryButton onClick={onClick}>
        {children}
      </PrimaryButton>
    
    )
  }
}