import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ThreeByThreeGrid from '../../containers/ThreeByThreeGrid';
import WhereTo from '../../containers/WhereTo';
import SideMenu from '../../containers/SideMenu';
import NavBar from '../../containers/NavBar';

export class Compass extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  };

  render() {
    return (
      <div className="Compass">
        <NavBar />
        <WhereTo />
        <SideMenu />
        <ThreeByThreeGrid />
      </div>
    );
  }
}

export default connect(state => ({

}), {

})(Compass);
