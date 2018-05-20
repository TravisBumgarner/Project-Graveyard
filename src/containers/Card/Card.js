import React, { Component } from 'react';

import {
  Divider,
  CardTitle,
  CardContent,
  CardWrapper,
  BackButton,
} from "./Card.styles";

export default class Card extends Component {

  render() {
    const {
      title,
      children,
      className,
      onClick,
    } = this.props;

    return (
      <CardWrapper className={className}>

        <CardTitle>
          { onClick && <BackButton size={ 29 } onClick={ onClick }/> }
          { title }
        </CardTitle>

        <Divider primary/>

        <CardContent>
          { children }
        </CardContent>

        <Divider primary/>

      </CardWrapper>

    )

  }
}
