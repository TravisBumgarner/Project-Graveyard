import React, { Component } from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import tileActions from '../../store/tile/actions';
import requestActions from '../../store/requests/actions';

import {CENTER_DIRECTION } from "../../utilities/constants";

export class WhereTo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      lat: 0,
      lon: 0,
      rad: 0,
    }
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    const {
      setTile,
      setMetaData,
      flickrRequest,
    } = this.props;

    const {
      lat,
      lon,
      rad,
    } = this.state;
    flickrRequest(CENTER_DIRECTION, lat, lon);

    setTile(CENTER_DIRECTION, lat, lon);
    setMetaData(rad);
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCancel}
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
            floatingLabelText="Latitude"
            onChange={ (event, newValue) => this.setState({lat: newValue}) }
          />
          <TextField
            floatingLabelText="Longitude"
            onChange={ (event, newValue) => this.setState({lon: newValue}) }
          />
          <TextField
            floatingLabelText="Radius"
            onChange={ (event, newValue) => this.setState({rad: newValue}) }
          />
        </Dialog>
      </div>

    );
  }
}

export default connect(state => ({
}), {
  setTile: tileActions.setTile,
  setMetaData: tileActions.setMetaData,
  flickrRequest: requestActions.flickrRequest,
})(WhereTo);
