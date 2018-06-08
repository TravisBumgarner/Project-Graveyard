import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import categoryActions from '../../store/categories/actions';

import CategoryListItem from '../../components/CategoryListItem';


import { CategoriesWrapper } from './Categories.styles';

export class Categories extends Component {
  viewSnippetsForCategory = (id) => {
    const {
      setSelectedId,
      history: { push },
    } = this.props;

    setSelectedId(id);
    push('/snippets');
  };

  handleCategoryEdit = (id) => {
    const {
      history: { push },
    } = this.props;

    push(`/categories/edit/${id}`);
  };

  render() {
    const {
      categories,
    } = this.props;

    const CategoryListItems = Object.values(categories).map((c) => {
      return (
        <CategoryListItem
          key={c.id}
          details={c}
          viewSnippetsForCategory={this.viewSnippetsForCategory}
          handleCategoryEdit={this.handleCategoryEdit}
        />
      );
    });

    return (
      <CategoriesWrapper>
        <Link to="/categories/create/">Create new category </Link>
        { CategoryListItems }
      </CategoriesWrapper>
    );
  }
}

Categories.propTypes = {
  history: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  setSelectedId: PropTypes.func.isRequired,
};

export default connect(state => ({
  categories: state.categories.all,
}), {
  setSelectedId: categoryActions.setSelectedId,
})(Categories);
