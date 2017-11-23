import React, { Component } from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import { DIRECTIONS } from '../../utilities/constants';
import GridTile from '../GridTile';

const style = {
  width: '400px',
  height: '400px',
  background: 'black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  flexDirection: 'row',
  flexFlow: 'row wrap',
};


export class ThreeByThreeGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  };

  render() {
    const grid = DIRECTIONS.map(direction => {
      return (
        <GridTile
          key={direction}
          direction={direction}
        />
      );
    });

    return (
      <div className="ThreeByThreeGrid" style={style}>
        { grid }
      </div>
    );
  }
}

export default connect(state => ({
}), {

})(ThreeByThreeGrid);
