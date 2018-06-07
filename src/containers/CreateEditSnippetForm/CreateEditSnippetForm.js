import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

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
      categories,
      authors,
    } = this.props;

    const {
      category,
      text,
      author,
    } = this.state;


    const CategoryDropdownOptions = categories.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>);
    const AuthorsDropdownOptions = authors.map(a => <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>);


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

        <FormControl>
          <InputLabel htmlFor="category">Select a Category</InputLabel>
          <Select
            name="category"
            value={category}
            onChange={this.handleNameChange}
            inputProps={{
              name: 'category',
            }}
          >
            {CategoryDropdownOptions}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="author">Select an Author</InputLabel>
          <Select
            name="author"
            value={author}
            onChange={this.handleNameChange}
            inputProps={{
              name: 'author',
            }}
          >
            {AuthorsDropdownOptions}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Source"
          name="source"
          value={this.state.source}
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
  categories: PropTypes.array,
  authors: PropTypes.array,
};

export default withRouter(connect((state, props) => ({
  snippetData: state.snippets.all.filter(s => s.id === props.idToEdit)[0], // TODO Write this better?
  categories: state.categories.all,
  authors: state.authors.all,
}), {
  putRequest: requestActions.putRequest,
  postRequest: requestActions.postRequest,
})(CreateEditSnippetForm));
