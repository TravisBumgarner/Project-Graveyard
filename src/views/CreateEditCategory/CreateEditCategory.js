import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import CreateEditCategoryForm from '../../containers/CreateEditCategoryForm';

import { CreateEditCategoryWrapper } from './CreateEditCategory.styles';

export class CreateEditCategory extends Component {
  render() {
    return (
      <CreateEditCategoryWrapper>
        <CreateEditCategoryForm />
      </CreateEditCategoryWrapper>
    );
  }
}

CreateEditCategory.propTypes = {
};

export default connect(() => ({
}), {
})(CreateEditCategory);
