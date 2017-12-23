import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import RefreshIndicator from 'material-ui/RefreshIndicator';

import tileActions from '../../store/tile/actions/index';

import { CENTER_DIRECTION } from '../../utilities/constants';

const Test = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255,255,255,0.8);
  text-align: center;
  opacity: 0;
  
  &:hover{
    background-color: #fff;
    opacity: 0.6;
  }
`;

const style = {
  gridTile: {
    position: 'relative',
    width: '30%',
    height: '30%',
    backgroundColor: 'turquoise',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  refresh: {
    display: 'inline-block',
    position: 'relative',

  },
  image: {
    width: '100%',
    height: '100%',
  },
};

export class gridTile extends Component {
  static propTypes = {
    tileDetails: PropTypes.object.isRequired,
    radius: PropTypes.number.isRequired,
    setCenterTile: PropTypes.func.isRequired,
    direction: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const {
      direction,
      setCenterTile,
      radius,
      tileDetails,
    } = this.props;

    // If Called for setCenterTile(), pass in these values.
    const { lat: centerLat, lon: centerLon, src: centerSrc } = tileDetails;
    const centerTileDetails = { centerLat, centerLon, centerSrc };

    return (
      <div
        className="gridTile"
        style={style.gridTile}
      >
        {
          !tileDetails.src
          ? (
            <RefreshIndicator
              size={40}
              left={0}
              top={0}
              style={style.refresh}
              status="loading"
            />
          ) : (
            <div>
              <Test
                onClick={direction !== CENTER_DIRECTION ? () => setCenterTile(centerTileDetails, radius) : null}
              >
                {direction}
              </Test>
              <img
                src={tileDetails.src}
                style={style.image}
                alt=""
              />
            </div>
          )
        }
      </div>
    );
  }
}


export default connect((state, ownProps) => ({
  tileDetails: state.tile.allTiles[ownProps.direction],
  radius: state.tile.meta.radius,
}), {
  setCenterTile: tileActions.setCenterTile,
})(gridTile);
