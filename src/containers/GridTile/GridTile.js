import React, { Component } from 'react';
import { connect } from 'react-redux';

import tileActions from '../../store/tile/actions/index';
import requestActions from '../../store/requests/actions';

import { CENTER_DIRECTION } from '../../utilities/constants';

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

  render() {
    const {
      direction,
      setCenterTile,
      tileDetails,
    } = this.props;
    console.log("tileDetails", tileDetails);
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
  flickrRequest: requestActions.flickrRequest,
  setCenterTile: tileActions.setCenterTile,
})(gridTile);
