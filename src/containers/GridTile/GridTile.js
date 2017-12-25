import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RefreshIndicator from 'material-ui/RefreshIndicator';

import TileHover from '../../components/TileHover';

import tileActions from '../../store/tile/actions/index';

import CENTER_DIRECTION from '../../utilities/constants';

const style = {
  gridTile: {
    position: 'relative',
    width: '30%',
    height: '30%',
    backgroundColor: 'turquoise',
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
    direction: PropTypes.string.isRequired,
    radius: PropTypes.number.isRequired,
    setCenterTile: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const {
      tileDetails,
      direction,
      setCenterTile,
      radius,
    } = this.props;

    const {
      lat: centerLat,
      lon: centerLon,
      src: centerSrc,
      flickrPage,
    } = tileDetails;
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
              <TileHover
                direction={direction}
                flickrPage={flickrPage}
                onClick={direction !== CENTER_DIRECTION ? () => setCenterTile(centerTileDetails, radius) : null}
              />
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
