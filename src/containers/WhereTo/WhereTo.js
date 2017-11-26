import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import Clear from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';

import tileActions from '../../store/tile/actions';
import requestActions from '../../store/requests/actions';

import { getTileCoords } from '../../utilities/functions';
import {CENTER_DIRECTION, RADIAL_DRECTIONS } from "../../utilities/constants";

export class WhereTo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      centerLat: '',
      centerLon: '',
      radius: '',
    }
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    const {
      setCenterTile,
      setMetaData,
      flickrRequest,
      setRadialTile,
    } = this.props;

    let {
      centerLat,
      centerLon,
      radius,
    } = this.state;

    centerLat = parseFloat(centerLat);
    centerLon = parseFloat(centerLon);
    radius = parseFloat(radius);

    setCenterTile(centerLat, centerLon, radius);

    setMetaData(radius);
    this.setState({ open: false });
  };

  render() {
    const {
      centerLat,
      centerLon,
      radius,
    } = this.state;

    const actions = [
      <RaisedButton
        label="Take Off"
        labelPosition="before"
        primary={true}
        icon={<ActionFlightTakeoff />}
        onClick={ this.handleClose }
      />,
      <IconButton tooltip="Close Menu">
        <Clear />
      </IconButton>
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
            type="number"
            onChange={ (event, newValue) => this.setState({centerLat: newValue}) }
          />
          <TextField
            type="number"
            value = {centerLon}
            floatingLabelText="Longitude"
            onChange={ (event, newValue) => this.setState({centerLon: newValue}) }
          />
          <TextField
            type="number"
            value = {radius}
            floatingLabelText="Radius"
            onChange={ (event, newValue) => this.setState({radius: newValue}) }
          />
        </Dialog>
      </div>

    );
  }
}

export default connect(state => ({
}), {
  setCenterTile: tileActions.setCenterTile,
  setRadialTile: tileActions.setRadialTile,
  setMetaData: tileActions.setMetaData,
  flickrRequest: requestActions.flickrRequest,
})(WhereTo);
