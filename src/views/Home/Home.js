import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import ChartSavingsPerMonth from '../../containers/ChartSavingsPerMonth';
import ChartUsagePerMonth from '../../containers/ChartUsagePerMonth';

import {
  HomeCard
} from "./Home.styles";

export class Home extends Component {
  render(){

    return (
      <HomeCard>
        <CardHeader
           title="Welcome!"
        />
        <CardContent>
          <ChartSavingsPerMonth />
          <ChartUsagePerMonth />
        </CardContent>
      </HomeCard>
    )

  }
}

export default connect((state) => ({

}), {

})(Home);
