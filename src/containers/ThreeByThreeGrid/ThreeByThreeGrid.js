import React, { Component } from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import { DIRECTIONS } from '../../utilities/constants';
import GridTile from '../../components/GridTile';

export class ThreeByThreeGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  };

  render() {
    return (
      <div className="ThreeByThreeGrid">
        <GridTile />
        <GridTile />
        <GridTile />
      </div>
    );
  }
}

export default connect(state => ({
}), {

})(ThreeByThreeGrid);
