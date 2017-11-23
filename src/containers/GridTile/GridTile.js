import React, { Component } from 'react';
import { connect } from 'react-redux';

import tileActions from '../../store/tile/actions/index';

import { CENTER_DIRECTION } from '../../utilities/constants';
import { getTileCoords } from '../../utilities/functions';

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
};

export class gridTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  };

  getNewImage = () => {
    const {
      direction,
    } = this.props

    getTileCoords(direction)
  }

  render() {
    const {
      direction,
      setCenterTile,
      tileDetails,
    } = this.props;
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
          : <h1>{direction}</h1>
         }
      </div>
    );
  }
}


export default connect((state, ownProps) => ({
  tileDetails: state.tile.allTiles[ownProps.direction],
}), {
  setCenterTile: tileActions.setCenterTile,
})(gridTile);
