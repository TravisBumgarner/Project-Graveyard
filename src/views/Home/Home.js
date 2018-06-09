import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SnippetListItem from '../../components/SnippetListItem';

import { HomeWrapper } from './Home.styles';

export class Home extends Component {
  render() {
    const {
      snippets,
      authors,
      categories,
      snippetsById,
    } = this.props;

    const Snippets = snippetsById.map((s) => {
      const snippetData = {
        ...snippets[s],
        author: authors[snippets[s].author].name,
        category: categories[snippets[s].category].name,
        color: categories[snippets[s].category].color,
      };
      // TODO better way to do this?
      return <SnippetListItem key={s} details={snippetData} />;
    });

    return (
      <HomeWrapper>
        {Snippets}
      </HomeWrapper>
    );
  }
}

Home.propTypes = {
  snippets: PropTypes.object,
  snippetsById: PropTypes.array,
  categories: PropTypes.object,
  authors: PropTypes.object,
};

export default connect(state => ({
  snippets: state.snippets.all,
  snippetsById: state.snippets.byId,
  categories: state.categories.all,
  authors: state.authors.all,
}), {

})(Home);
