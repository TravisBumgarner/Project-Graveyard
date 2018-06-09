import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import snippetSelectors from '../../store/snippets/selectors';

import SnippetListItem from '../../components/SnippetListItem';

import { SnippetsWrapper } from './Snippets.styles';

export class Snippets extends Component {
  handleSnippetEdit = (id) => {
    const {
      history: { push },
    } = this.props;

    push(`/snippets/edit/${id}`);
  };

  render() {
    const {
      snippets,
    } = this.props;

    const SnippetsListItems = snippets.map((s) => {
      console.log(s);
      return <SnippetListItem handleSnippetEdit={this.handleSnippetEdit} details={s} key={s.id} />;
    });

    return (
      <SnippetsWrapper>
        <Link to="/snippets/create/">Create Snippet</Link>
        { SnippetsListItems }
      </SnippetsWrapper>
    );
  }
}

Snippets.propTypes = {
  snippets: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(state => ({
  snippets: snippetSelectors.getSelectedSnippets(state),
}), {

})(Snippets);
