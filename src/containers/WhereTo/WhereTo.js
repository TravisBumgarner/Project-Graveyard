import React, { Component } from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import tileActions from '../../store/tile/actions';
import requestActions from '../../store/requests/actions';

import { getTileCoords } from '../../utilities/functions';
import {CENTER_DIRECTION, RADIAL_DRECTIONS } from "../../utilities/constants";

export class WhereTo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      centerLat: 42.3736,
      centerLon: -71.1097,
      rad: 0.1,
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
      centerLat,
      centerLon,
      rad,
    } = this.state;
    flickrRequest(CENTER_DIRECTION, centerLat, centerLon);

    RADIAL_DRECTIONS.forEach( direction => {
      const coords = getTileCoords(direction, centerLat, centerLon, rad);
      flickrRequest(direction, coords.lat, coords.lon);
    });

    //setTile(CENTER_DIRECTION, lat, lon);
    setMetaData(rad);
    this.setState({ open: false });
  };

  render() {
    const {
      centerLat,
      centerLon,
      rad,
    } = this.state

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
            value = {centerLat}
            floatingLabelText="Latitude"
            onChange={ (event, newValue) => this.setState({centerLat: newValue}) }
          />
          <TextField
            value = {centerLon}
            floatingLabelText="Longitude"
            onChange={ (event, newValue) => this.setState({centerLon: newValue}) }
          />
          <TextField
            value = {rad}
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
