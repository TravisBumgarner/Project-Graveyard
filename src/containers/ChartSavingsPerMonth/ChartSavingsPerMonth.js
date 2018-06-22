import React, { Component, Fragment } from 'react';
import ChartistGraph from 'react-chartist';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../../components/Header';

export class ChartSavingsPerMonth extends Component {
  processData = () => {
    const {
      data,
    } = this.props;

    const chartData = {
      labels: [],
      series: [],
    };

    const savingsSeries = {
      data: [],
      className: 'savingsSeriesStackedBar'
    };
    const billSeries = {
      data: [],
      className: 'billSeriesStackedBar'
    };

    data.sort((a, b) => new Date(a.year, a.month) - new Date(b.year, b.month)).map(d => {
      chartData.labels.push(`${d.year} - ${d.month}`);
      savingsSeries.data.push(d.savings);
      billSeries.data.push(d.bill);
    });
    chartData.series.push(billSeries, savingsSeries);

    return chartData;
  };

  render() {

    const chartData = this.processData();
    const chartOptions = {
      stackBars: true,
    };

    console.log(chartData);

    return (
      <Fragment>
        <Header>Savings Per Month (red: bill, green: savings)</Header>
        <ChartistGraph data={ chartData } options={ chartOptions } type="Bar" />
      </Fragment>
    )
  }
}

ChartSavingsPerMonth.propTypes = {
};

export default connect((state, props) => ({
  data: state.measurements.all,
}), {
})(ChartSavingsPerMonth);