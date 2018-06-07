import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Autocomplete from 'react-autocomplete';
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

  handleNameChange = (event, value) => {
    console.log(value, event.target.value);
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
      author,
    } = this.state;

    const CategoryDropdownOptions = categories.map(c => ({ id: c.id, label: c.name }));
    const AuthorDropdownOptions = authors.map(a => ({ id: a.id, label: a.name }));


    return (
      <Fragment>
        {isEditMode ? 'Edit' : 'New'}

        <div>
          Select a Category:
          <Autocomplete
            getItemValue={item => item.label}
            items={CategoryDropdownOptions}
            renderItem={(item, isHighlighted) => (
              <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.label}
              </div>
            )}
            value={category}
            shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
            onChange={e => this.setState({ category: e.target.value })}
            onSelect={value => this.setState({ category: value })}
          />
        </div>

        <div>
          Select an Author:
          <Autocomplete
            getItemValue={item => item.label}
            items={AuthorDropdownOptions}
            renderItem={(item, isHighlighted) => (
              <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.label}
              </div>
            )}
            value={author}
            shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
            onChange={e => this.setState({ author: e.target.value })}
            onSelect={value => this.setState({ author: value })}
          />
        </div>

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
