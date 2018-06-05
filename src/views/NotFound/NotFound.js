import React, { Component } from 'react';

import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import { NotFoundCard } from './NotFound.styles';

export default class NotFound extends Component {
  render() {
    return (
      <NotFoundCard>
        <CardHeader
          title="404 Error"
        />
        <CardContent>
          The page you were looking for was not found.
        </CardContent>
      </NotFoundCard>
    );
  }
}
