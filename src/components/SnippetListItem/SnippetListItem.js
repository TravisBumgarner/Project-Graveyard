import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default class SnippetListItem extends Component {
  render() {
    const {
      details,
    } = this.props;

    return (
      <Card>
        <CardContent>
          Text: {details.text}<br />
          Author: {details.authorID}<br />
          Category: {details.category}
        </CardContent>
      </Card>
    );
  }
}

SnippetListItem.propTypes = {
  details: PropTypes.object.isRequired,
};
