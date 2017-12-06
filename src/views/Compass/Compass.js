import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ThreeByThreeGrid from '../../containers/ThreeByThreeGrid';
import WhereTo from '../../containers/WhereTo';
import SideMenu from '../../containers/SideMenu';
import NavBar from '../../containers/NavBar';

const style = {
  width: '100vw',
  maxWidth: '1200px',
  margin: '0px auto',
};

export class Compass extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  };

  render() {
    return (
      <div className="Compass" style={style}>
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
