import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import requestActions from '../../store/requests/actions';

export class CreateEditSnippetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      category: '',
      author: '',
      source: '',
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
      text,
      category,
      author,
      source,
    } = this.state;

    const postData = {
      text,
      category: parseInt(category, 10),
      author: parseInt(author, 10),
      source: parseInt(source, 10),
    };

    postRequest('snippets/', postData);
    push('/snippets/');
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
          id="text"
          label="Quote"
          value={this.state.text}
          onChange={this.handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          id="category"
          label="Category"
          value={this.state.category}
          onChange={this.handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          id="author"
          label="Author"
          value={this.state.author}
          onChange={this.handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          id="source"
          label="Source"
          value={this.state.source}
          onChange={this.handleChange}
          margin="normal"
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

CreateEditSnippetForm.propTypes = {
  isEditMode: PropTypes.bool,
  history: PropTypes.object.isRequired,
  postRequest: PropTypes.func.isRequired,
};

export default withRouter(connect(() => ({
}), {
  postRequest: requestActions.postRequest,
})(CreateEditSnippetForm));
