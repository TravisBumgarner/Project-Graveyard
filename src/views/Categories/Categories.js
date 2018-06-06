import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import { CategoriesCard } from './Categories.styles';

export class Categories extends Component {
  render() {
    const {
      categories,
    } = this.props;

    const CategoryListItems = categories.map((c) => {
      return <div key={c.name}>{ c.name }</div>;
    });

    return (
      <CategoriesCard>
        <CardHeader
          title="Categories"
        />
        <CardContent>
          { CategoryListItems }
        </CardContent>
      </CategoriesCard>
    );
  }
}

export default connect(state => ({
  categories: state.categories.all,
}), {

})(Categories);
