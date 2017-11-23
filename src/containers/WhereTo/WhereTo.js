import React, { Component } from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import tileActions from '../../store/tile/actions';
// import axiosRequestActions from '../../store/axiosRequest/actions';


export class WhereTo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      whereTo: '',
    }
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    const { setCenterTile } = this.props;
    const { whereTo } = this.state;
    console.log(`Setting location as ${this.state.whereTo}`);
    // TODO function to handle whereTo -> Lat Long conversion.
    const whereTo2 = {lat: 5, lon: 5, src: whereTo};
    setCenterTile(whereTo2);
    this.setState({ open: false });
  };

  setWhereTo = (whereTo) => {
    this.setState({ whereTo });
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div className="WhereTo">
        <Dialog
          title="Where would you like to go?"
          modal={false}
          actions={actions}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            floatingLabelText="Ex: (lat, lon) or (city, state)"
            onChange={ (event, newValue) => this.setWhereTo(newValue) }
          /><br />
        </Dialog>
      </div>

    );
  }
}

export default connect(state => ({
}), {
  setCenterTile: tileActions.setCenterTile,
})(WhereTo);
