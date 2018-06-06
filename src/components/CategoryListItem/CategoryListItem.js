import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


export default class CategoryListItem extends Component {
  handleView = () => {
    const {
      viewSnippetsForCategory,
      details: { id },
    } = this.props;

    viewSnippetsForCategory(id);
  };

  handleEdit = () => {
    const {
      handleCategoryEdit,
      details: { id },
    } = this.props;

    handleCategoryEdit(id);
  };

  render() {
    const {
      details,
    } = this.props;

    return (
      <Card>
        <CardContent>
          {details.name} - { details.id }
          <Button onClick={this.handleView}>View</Button>
          <Button onClick={this.handleEdit}>Edit</Button>
        </CardContent>
      </Card>
    );
  }
}

CategoryListItem.propTypes = {
  viewSnippetsForCategory: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired,
  handleCategoryEdit: PropTypes.func.isRequired,
};
