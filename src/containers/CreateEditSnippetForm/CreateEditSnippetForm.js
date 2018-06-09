import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import requestActions from '../../store/requests/actions';

import { AuthorFormControl, CategoryFormControl } from './CreateEditSnippetForm.styles';

const NEW_AUTHOR_ID = -1;
const NEW_CATEGORY_ID = -1;

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
      newAuthorName: '',
      newCategoryName: '',
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

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      isEditMode,
      authors,
      categories,
    } = this.props;

    const {
      category,
      author,
      text,
      newAuthorName,
      newCategoryName,
    } = this.state;
    // TODO Code smell
    const AuthorSelectMenuItems = Object.values(authors).map((a) => {
      return <MenuItem value={a.id} key={a.id}>{a.name}</MenuItem>;
    });
    AuthorSelectMenuItems.unshift(<MenuItem value={NEW_AUTHOR_ID} key={NEW_AUTHOR_ID}>Create New Author</MenuItem>);

    const CategorySelectMenuItems = Object.values(categories).map((c) => {
      return <MenuItem value={c.id} key={c.id}>{c.name}</MenuItem>;
    });
    CategorySelectMenuItems.unshift(<MenuItem value={NEW_CATEGORY_ID} key={NEW_CATEGORY_ID}>Create New Category</MenuItem>);


    return (
      <Fragment>
        {isEditMode ? 'Edit' : 'New'}

        <TextField
          fullWidth
          label="Text"
          name="text"
          value={text}
          onChange={this.handleChange}
          margin="normal"
        />

        <AuthorFormControl>
          <InputLabel htmlFor="author">Select Author</InputLabel>
          <Select
            value={author}
            onChange={this.handleChange}
            inputProps={{
              name: 'author',
              id: 'author',
            }}
          >
            {AuthorSelectMenuItems}
          </Select>
        </AuthorFormControl>

        { author === NEW_AUTHOR_ID && (
          <TextField
            fullWidth
            label="New Author Name"
            name="newAuthorName"
            value={newAuthorName}
            onChange={this.handleChange}
            margin="normal"
          />
        )}

        <CategoryFormControl>
          <InputLabel htmlFor="category">Select Category</InputLabel>
          <Select
            value={category}
            onChange={this.handleChange}
            inputProps={{
              name: 'category',
              id: 'category',
            }}
          >
            {CategorySelectMenuItems}
          </Select>
        </CategoryFormControl>

        { category === NEW_AUTHOR_ID && (
          <TextField
            fullWidth
            label="New Category Name"
            name="newCategoryName"
            value={newCategoryName}
            onChange={this.handleChange}
            margin="normal"
          />
        )}

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
  authors: PropTypes.object,
  categories: PropTypes.object,
};

export default withRouter(connect((state, props) => ({
  snippetData: state.snippets.all[props.idToEdit],
  authors: state.authors.all,
  categories: state.categories.all,
}), {
  putRequest: requestActions.putRequest,
  postRequest: requestActions.postRequest,
})(CreateEditSnippetForm));
