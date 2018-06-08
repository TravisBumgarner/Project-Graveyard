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

    const {
      snippetData,
    } = this.props;

    this.state = {
      text: '',
      category: '',
      author: '',
      source: '',
      ...snippetData,
    };
  }

  handleCancel = () => {
    const {
      history: { push },
    } = this.props;

    push('/snippets/');
  };

  handleSubmit = () => {
    const {
      postRequest,
      putRequest,
      isEditMode,
      idToEdit,
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

    const submit = isEditMode ? putRequest : postRequest;
    const url = isEditMode ? `snippets/${idToEdit}/` : 'snippets/';
    submit(url, postData);

    push('/snippets/');
  };

  handleNameChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      isEditMode,
    } = this.props;

    const {
      category,
      author,
      text,
    } = this.state;

    return (
      <Fragment>
        {isEditMode ? 'Edit' : 'New'}

        <TextField
          fullWidth
          label="Text"
          name="text"
          value={text}
          onChange={this.handleNameChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Author"
          name="author"
          value={author}
          onChange={this.handleNameChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Category"
          name="category"
          value={category}
          onChange={this.handleNameChange}
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
  idToEdit: PropTypes.number,
  history: PropTypes.object.isRequired,
  postRequest: PropTypes.func.isRequired,
  putRequest: PropTypes.func.isRequired,
  snippetData: PropTypes.object,
};

export default withRouter(connect((state, props) => ({
  snippetData: state.snippets.all.filter(s => s.id === props.idToEdit)[0], // TODO Write this better?
}), {
  putRequest: requestActions.putRequest,
  postRequest: requestActions.postRequest,
})(CreateEditSnippetForm));
