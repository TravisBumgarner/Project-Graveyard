import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import SnippetListItem from '../../components/SnippetListItem';

import { HomeWrapper } from './Home.styles';

export class Home extends Component {
  render() {
    const {
      snippets,
      authors,
      categories,
    } = this.props;

    const Snippets = Object.values(snippets).map((s) => {
      const snippetData = {
        ...s,
        author: authors[s.author].name,
        category: categories[s.category].name,
      };
      // TODO better way to do this?
      return <SnippetListItem key={s.id} details={snippetData} />;
    });

    return (
      <HomeWrapper>
        <Link to="/snippets/create">Create a snippet.</Link>
        {Snippets}
      </HomeWrapper>
    );
  }
}

Home.propTypes = {
  snippets: PropTypes.object,
  categories: PropTypes.object,
  authors: PropTypes.object,
};

export default connect(state => ({
  snippets: state.snippets.all,
  categories: state.categories.all,
  authors: state.authors.all,
}), {

})(Home);
