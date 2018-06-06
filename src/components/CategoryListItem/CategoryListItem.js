import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


export default class CategoryListItem extends Component {
  onClick = () => {
    const {
      viewSnippetsForCategory,
      details: { id },
    } = this.props;

    viewSnippetsForCategory(id);
  };

  render() {
    const {
      details,
    } = this.props;

    return (
      <Card>
        <CardContent>
          {details.name}
          <Button onClick={this.onClick}>View</Button>
        </CardContent>
      </Card>
    );
  }
}

CategoryListItem.propTypes = {
  viewSnippetsForCategory: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired,
};
