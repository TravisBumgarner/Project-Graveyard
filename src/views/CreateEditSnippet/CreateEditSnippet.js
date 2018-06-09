import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CreateEditSnippetForm from '../../containers/CreateEditSnippetForm';

import { CreateEditSnippetWrapper } from './CreateEditSnippet.styles';

export class CreateEditSnippet extends Component {
  render() {
    const {
      match: { params },
    } = this.props;

    return (
      <CreateEditSnippetWrapper>
        <CreateEditSnippetForm idToEdit={parseInt(params.id, 10)} />
      </CreateEditSnippetWrapper>
    );
  }
}

CreateEditSnippet.propTypes = {
  match: PropTypes.object,
};

export default connect(() => ({
}), {
})(CreateEditSnippet);
