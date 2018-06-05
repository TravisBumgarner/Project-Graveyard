import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  HeaderWrapper,
} from './Header.styles';

export default class Header extends Component {
  render() {
    const {
      children
    } = this.props;

    return (
      <HeaderWrapper>{ children }</HeaderWrapper>
    )
  }
}

Header.propTypes = {
  children: PropTypes.string.isRequired,
};