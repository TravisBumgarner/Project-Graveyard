import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CreateEditCategoryForm from '../../containers/CreateEditCategoryForm';

import { CreateEditCategoryWrapper } from './CreateEditCategory.styles';

export class CreateEditCategory extends Component {
  render() {
    const {
      match: { params },
    } = this.props;

    return (
      <CreateEditCategoryWrapper>
        <CreateEditCategoryForm idToEdit={parseInt(params.id, 10)} />
      </CreateEditCategoryWrapper>
    );
  }
}

CreateEditCategory.propTypes = {
  match: PropTypes.object,
};

export default connect(() => ({
}), {
})(CreateEditCategory);
