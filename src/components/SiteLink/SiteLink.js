import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { UnstyledLink } from './SiteLink.styles';

export default class SiteLink extends Component {
  render() {
    const {
      children,
      to,
    } = this.props;

    return (
      <UnstyledLink to={to}>
        {children}
      </UnstyledLink>
    );
  }
}

SiteLink.propTypes = {
  children: PropTypes.any,
  to: PropTypes.string.isRequired,
};
