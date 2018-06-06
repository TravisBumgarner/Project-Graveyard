import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import snippetSelectors from '../../store/snippets/selectors';

import { SnippetsWrapper } from './Snippets.styles';

export class Snippets extends Component {
  render() {
    const {
      snippets,
    } = this.props;

    const SnippetsListItems = snippets.map((s) => {
      return <div key={s.id}>{ s.text }</div>;
    });

    return (
      <SnippetsWrapper>
        { SnippetsListItems }
      </SnippetsWrapper>
    );
  }
}

Snippets.propTypes = {
  snippets: PropTypes.array.isRequired,
};

export default connect(state => ({
  snippets: snippetSelectors.getSelectedSnippets(state),
}), {

})(Snippets);
