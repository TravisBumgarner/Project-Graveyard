import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from '../../components/Map';

class RecentHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <Map />
    );
  }
}

export default connect(() => ({
}), {
})(RecentHistory);
