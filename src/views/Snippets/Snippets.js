import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SnippetsWrapper } from './Snippetes.styles';

export class Snippets extends Component {
  render() {
    const {
      categories,
    } = this.props;

    const SnippetsListItems = categories.map((c) => {
      return <div key={c.name}>{ c.name }</div>;
    });

    return (
      <SnippetsWrapper>
        { SnippetsListItems }
      </SnippetsWrapper>
    );
  }
}

export default connect(state => ({
  categories: state.categories.all,
}), {

})(Snippetes);
