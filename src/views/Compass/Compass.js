import React, { Component } from 'react';
import { connect } from 'react-redux';

import ThreeByThreeGrid from '../../containers/ThreeByThreeGrid';
import WhereTo from '../../containers/WhereTo';
import SideMenu from '../../containers/SideMenu';
import NavBar from '../../containers/NavBar';

const style = {
  compass: {
    width: '100vw',
    maxWidth: '1200px',
    margin: '0px auto',
    display: 'relative',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
};

export class Compass extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Compass" style={style.compass}>
        <NavBar />
        <WhereTo />
        <SideMenu />
        <div style={style.contentWrapper}>
          <ThreeByThreeGrid />
        </div>
      </div>
    );
  }
}

export default connect(state => ({

}), {

})(Compass);
