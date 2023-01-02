import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import ThreeByThreeGrid from '../../containers/ThreeByThreeGrid';
import WhereTo from '../../containers/WhereTo';
import SideMenu from '../../containers/SideMenu';
import Map from '../../components/Map';

const MapWrapper = styled.div`
  width: 200px;
  height: 200px;
`;

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
  render() {
    return (
      <div className="Compass" style={style.compass}>
        <WhereTo />
        <SideMenu />
        <div style={style.contentWrapper}>
          <ThreeByThreeGrid />
          <MapWrapper >
            <Map />
          </MapWrapper>
        </div>
      </div>
    );
  }
}

export default connect(() => ({

}), {

})(Compass);
