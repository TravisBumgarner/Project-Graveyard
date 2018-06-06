import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import requestActions from '../../store/requests/actions';

export class CreateEditCategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };
  }

  handleCancel = () => {
    const {
      history: { push },
    } = this.props;

    push('/categories/');
  };

  handleSubmit = () => {
    const {
      postRequest,
      history: { push },
    } = this.props;

    const {
      name,
      description,
    } = this.state;

    const postData = {
      name,
      description,
    };

    postRequest('categories/', postData);
    push('/categories/');
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
          id="name"
          label="Title"
          value={this.state.name}
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
  postRequest: PropTypes.func.isRequired,
};

export default withRouter(connect(() => ({
}), {
  postRequest: requestActions.postRequest,
})(CreateEditCategoryForm));
