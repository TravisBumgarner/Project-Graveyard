import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardContent from '@material-ui/core/CardContent';

import { SnippetListItemCard } from './SnippetListItem.styles';

export default class SnippetListItem extends Component {
  render() {
    const {
      details,
    } = this.props;

    return (
      <SnippetListItemCard>
        <CardContent>
          Text: {details.text}<br />
          Author: {details.author}<br />
          Category: {details.category}
        </CardContent>
      </SnippetListItemCard>
    );
  }
}

SnippetListItem.propTypes = {
  details: PropTypes.object.isRequired,
};
