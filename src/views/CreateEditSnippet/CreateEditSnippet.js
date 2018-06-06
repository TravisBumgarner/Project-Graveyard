import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import CreateEditSnippetForm from '../../containers/CreateEditSnippetForm';

import { CreateEditSnippetWrapper } from './CreateEditSnippet.styles';

export class CreateEditSnippet extends Component {
  render() {
    return (
      <CreateEditSnippetWrapper>
        <CreateEditSnippetForm />
      </CreateEditSnippetWrapper>
    );
  }
}

CreateEditSnippet.propTypes = {
};

export default connect(() => ({
}), {
})(CreateEditSnippet);
