import React, { Component } from 'react';
import { connect } from 'react-redux';

import tileActions from '../../store/tile/actions';

import { CENTER_DIRECTION } from '../../utilities/constants';


const divStyle = {
  width: '30%',
  height: '30%',
  backgroundColor: 'turquoise',
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
    return (
      <div
        className="gridTile"
        style={divStyle}
        onClick={
          direction !== CENTER_DIRECTION
            ? () => setCenterTile(tileDetails)
            : null
          }
        >
        <h1>{ direction } { tileDetails.foo }</h1>
      </div>
    );
  }
}


export default connect((state, ownProps) => ({
  tileDetails: state.tile.allTiles[ownProps.direction],
}), {
  setCenterTile: tileActions.setCenterTile,
})(gridTile);
