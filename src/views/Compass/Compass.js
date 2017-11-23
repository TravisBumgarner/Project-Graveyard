import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ThreeByThreeGrid from '../../containers/ThreeByThreeGrid';
import DirectionTile from '../../containers/GridTile/GridTile';
import WhereTo from '../../containers/WhereTo'

export class Compass extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  };

  render() {


    return (
      <div className="Compass">
        <WhereTo />
        <ThreeByThreeGrid />
      </div>

    );
  }
}

export default connect(state => ({

}), {

})(Compass);
