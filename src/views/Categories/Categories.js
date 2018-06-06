import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Link } from 'react-router-dom';

import categoryActions from '../../store/categories/actions';

import { CategoriesWrapper } from './Categories.styles';

export class Categories extends Component {
  render() {
    const {
      categories,
      setSelectedId,
    } = this.props;

    const CategoryListItems = categories.map((c) => {
      return <div key={c.id}><Link to={`/snippets?category=${c.id}`}>{ c.name }</Link></div>;
    });

    setSelectedId(1);

    return (
      <CategoriesWrapper>
        { CategoryListItems }
      </CategoriesWrapper>
    );
  }
}

export default connect(state => ({
  categories: state.categories.all,
}), {
  setSelectedId: categoryActions.setSelectedId,
})(Categories);
