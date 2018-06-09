import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import snippetActions from '../../store/snippets/actions';

const OLD_TO_NEW = 'OLD_TO_NEW';
const NEW_TO_OLD = 'NEW_TO_OLD';

const sortSnippets = (sortMethod, a, b) => {
  let result;
  if (sortMethod === NEW_TO_OLD) {
    result = a.id - b.id;
  } else if (sortMethod === OLD_TO_NEW) {
    result = b.id - a.id;
  }
  return result;
};

export class SnippetSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortMethod: NEW_TO_OLD,
    };
  }

  handleChange = (event) => {
    const {
      snippets,
      changeSnippetOrdering,
    } = this.props;

    const {
      sortMethod,
    } = this.state;

    // TODO code smell here
    this.setState({ sortMethod: event.target.value });

    const newSortOrderById = Object.values(snippets).sort((a, b) => sortSnippets(sortMethod, a, b)).map(s => s.id);
    console.log(sortMethod, newSortOrderById);
    changeSnippetOrdering(newSortOrderById);
  };

  render() {
    console.log(this.state);
    return (
      <Select value={this.state.sortMethod} onChange={this.handleChange}>
        <MenuItem value={NEW_TO_OLD} key={0}>New to Old</MenuItem>
        <MenuItem value={OLD_TO_NEW} key={1}>Old to New</MenuItem>
      </Select>
    );
  }
}

SnippetSort.propTypes = {
  changeSnippetOrdering: PropTypes.func.isRequired,
  snippets: PropTypes.object,
};

export default withRouter(connect(state => ({
  snippets: state.snippets.all,
}), {
  changeSnippetOrdering: snippetActions.changeSnippetOrdering,
})(SnippetSort));
