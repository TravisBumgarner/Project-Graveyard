import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import { UserSettingsWrapper } from './UserSettings.styles';

export class UserSettings extends Component {
  render() {
    return (
      <UserSettingsWrapper>
        Hi.
      </UserSettingsWrapper>
    );
  }
}

UserSettings.propTypes = {
};

export default connect(() => ({
}), {

})(UserSettings);
