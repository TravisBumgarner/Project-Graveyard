import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import Clear from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';

import tileActions from '../../store/tile/actions';

export class WhereTo extends Component {
  static propTypes = {
    setCenterTile: PropTypes.func.isRequired,
    setMetaData: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      centerLat: '40.7128',
      centerLon: '-74.0060',
      radius: '0.001',
    };
  }

  handleClose = () => {
    const {
      setCenterTile,
      setMetaData,
    } = this.props;

    let {
      centerLat,
      centerLon,
      radius,
    } = this.state;

    centerLat = parseFloat(centerLat);
    centerLon = parseFloat(centerLon);
    radius = parseFloat(radius);

    const tileDetails = { centerLat, centerLon };
    setCenterTile(tileDetails, radius);

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
        primary
        icon={<ActionFlightTakeoff />}
        onClick={this.handleClose}
      />,
      <IconButton tooltip="Close Menu">
        <Clear />
      </IconButton>,
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
            value={centerLat}
            floatingLabelText="Latitude"
            type="number"
            onChange={(event, newValue) => this.setState({ centerLat: newValue })}
          />
          <TextField
            type="number"
            value={centerLon}
            floatingLabelText="Longitude"
            onChange={(event, newValue) => this.setState({ centerLon: newValue })}
          />
          <TextField
            type="number"
            value={radius}
            floatingLabelText="Radius"
            onChange={(event, newValue) => this.setState({ radius: newValue })}
          />
        </Dialog>
      </div>

    );
  }
}

export default connect(() => ({
}), {
  setCenterTile: tileActions.setCenterTile,
  setMetaData: tileActions.setMetaData,
})(WhereTo);
