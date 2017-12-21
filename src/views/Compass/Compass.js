import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ThreeByThreeGrid from '../../containers/ThreeByThreeGrid';
import WhereTo from '../../containers/WhereTo';
import SideMenu from '../../containers/SideMenu';
import RecentHistory from '../../containers/RecentHistory';

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
  }
};

export class Compass extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  };

  render() {
    return (
      <div className="Compass" style={style.compass}>
        <WhereTo />
        <SideMenu />
        <div style={style.contentWrapper}>
          <ThreeByThreeGrid />
          <RecentHistory />
        </div>
      </div>
    );
  }
}

// Compass.propTypes = {
// };

export default connect(state => ({

}), {

})(Compass);
