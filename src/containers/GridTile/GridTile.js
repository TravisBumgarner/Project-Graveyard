import React, { Component } from 'react';
import { connect } from 'react-redux';

import tileActions from '../../store/tile/actions/index';

import { CENTER_DIRECTION } from '../../utilities/constants';
import { getTileCoords, getPhoto } from '../../utilities/functions';

import RefreshIndicator from 'material-ui/RefreshIndicator';


const style = {
  gridTile: {
    position: 'relative',
    width: '30%',
    height: '30%',
    backgroundColor: 'turquoise',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
  image: {
    maxWidth: '120px',
    maxHeight: '120px',
  }
};

export class gridTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  };

  getPhoto = () => {
    const {
      direction,
      centerTileDetails,
      tileDetails,
      radius,
    } = this.props;

    const coords = getTileCoords(direction, centerTileDetails.lat, centerTileDetails.lon, radius);
    getPhoto(direction, coords.lat, coords.lon);

    // TODO wire this up once I've figured out a way to get an image for center tile.
  }

  // componentWillReceiveProps(nextProps){
  //   // Check if centerTileDetails has an image and this tile's image has been deleted..
  //   if (nextProps.centerTileDetails.src.length && nextProps.tileDetails.src == '')
  //     this.getPhoto();
  //   // TODO wire this up once I've figured out a way to get an image for center tile.
  // }

  render() {
    const {
      direction,
      setCenterTile,
      tileDetails,
    } = this.props;
    console.log("loading", tileDetails.isLoading);
    return (
      <div
        className="gridTile"
        style={style.gridTile}
        onClick={ direction !== CENTER_DIRECTION ? () => setCenterTile(tileDetails) : null }
      >
        {
          tileDetails.isLoading
          ? <RefreshIndicator
              size={40}
              left={10}
              top={0}
              style={style.refresh}
              status="loading"
            />
          : tileDetails.src.length
            ? <img src={tileDetails.src} style={style.image}/>
            : <h1>{direction}</h1>
         }
      </div>
    );
  }
}


export default connect((state, ownProps) => ({
  tileDetails: state.tile.allTiles[ownProps.direction],
  centerTileDetails: state.tile.allTiles[CENTER_DIRECTION],
  radius: state.tile.meta.radius,
}), {
  setCenterTile: tileActions.setCenterTile,
})(gridTile);
