import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import { HomeCard } from './Home.styles';

export class Home extends Component {
  render() {
    return (
      <HomeCard>
        <CardHeader
          title="Welcome!"
        />
        <CardContent />
      </HomeCard>
    );
  }
}

export default connect(state => ({

}), {

})(Home);
