import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export class CreateEditCategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };
  }

  handleCancel = () => {
    const {
      history: { push },
    } = this.props;

    push('/categories');
  };

  handleSubmit = () => {

  };

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  render() {
    const {
      isEditMode,
    } = this.props;

    return (
      <Fragment>
        {isEditMode ? 'Edit' : 'new'}
        <TextField
          fullWidth
          id="title"
          label="Title"
          value={this.state.title}
          onChange={this.handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          id="description"
          label="Description"
          value={this.state.description}
          onChange={this.handleChange}
          margin="normal"
          multiline
        />
        <Button
          onClick={this.handleCancel}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={this.handleSubmit}
          color="primary"
          variant="raised"
        >
          { isEditMode ? 'Update' : 'Create' }
        </Button>
      </Fragment>
    );
  }
}

CreateEditCategoryForm.propTypes = {
  isEditMode: PropTypes.bool,
  history: PropTypes.object.isRequired,
};

export default withRouter(connect(() => ({
}), {
})(CreateEditCategoryForm));
