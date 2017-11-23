import React, { Component } from 'react';
import { connect } from 'react-redux';

import tileActions from '../../store/tile/actions';

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
      <div className="gridTile" style={divStyle} onClick={ () => setCenterTile(tileDetails) }>
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
