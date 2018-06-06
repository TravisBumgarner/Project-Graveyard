import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


export default class SnippetListItem extends Component {
  handleEdit = () => {
    const {
      handleSnippetEdit,
      details: { id },
    } = this.props;

    handleSnippetEdit(id);
  };

  render() {
    const {
      details,
    } = this.props;

    return (
      <Card>
        <CardContent>
          {details.text} - { details.id }
          <Button onClick={this.handleEdit}>Edit</Button>
        </CardContent>
      </Card>
    );
  }
}

SnippetListItem.propTypes = {
  details: PropTypes.object.isRequired,
  handleSnippetEdit: PropTypes.func.isRequired,
};
