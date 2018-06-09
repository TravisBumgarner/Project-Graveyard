import React, { Component } from 'react';
import PropTypes from 'prop-types';

import mainLogo from '../../img/logo.png';

import { Img } from './Logo.styles';

export default class Logo extends Component {
  render() {
    const {
      width,
    } = this.props;

    return (
      <Img src={mainLogo} width={width} alt="Site Logo" />
    );
  }
}

Logo.propTypes = {
  width: PropTypes.string.isRequired,
};

