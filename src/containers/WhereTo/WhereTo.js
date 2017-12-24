import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';

import tileActions from '../../store/tile/actions';
import uiActions from '../../store/ui/actions';

export class WhereTo extends Component {
  static propTypes = {
    setCenterTile: PropTypes.func.isRequired,
    setMetaData: PropTypes.func.isRequired,
    toggleWhereTo: PropTypes.func.isRequired,
    isWhereToOpen: PropTypes.bool.isRequired,
    googleMapsRequest: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      centerLat: '',
      centerLon: '',
      radius: '0.001',
      address: '',
    };
  }

  handleClose = () => {
    const {
      setCenterTile,
      setMetaData,
      toggleWhereTo,
      googleMapsRequest,
    } = this.props;

    let {
      centerLat,
      centerLon,
      radius,
    } = this.state;

    const {
      address,
    } = this.state;

    if (centerLat && centerLon && !address) {
      centerLat = parseFloat(centerLat);
      centerLon = parseFloat(centerLon);
      radius = parseFloat(radius);

      const tileDetails = { centerLat, centerLon };
      setCenterTile(tileDetails, radius);

      setMetaData(radius);
      toggleWhereTo();
    } else if (!centerLat && !centerLon && address) {
      googleMapsRequest(address);
      toggleWhereTo();
    } else {
      alert('You must enter either an address or a latitude and longitude. (Not both.)');
    }
  };

  render() {
    const {
      centerLat,
      centerLon,
      address,
    } = this.state;

    const {
      isWhereToOpen,
    } = this.props;

    const actions = [
      <RaisedButton
        label="Take Off"
        labelPosition="before"
        primary
        icon={<ActionFlightTakeoff />}
        onClick={this.handleClose}
      />,
    ];
    return (
      <div className="WhereTo">
        <Dialog
          title="Where would you like to go?"
          modal={false}
          actions={actions}
          open={isWhereToOpen}
          onRequestClose={this.handleClose}
        >
          <p>Enter an address:</p>
          <TextField
            value={address}
            floatingLabelText="Address"
            type="string"
            onChange={(event, newValue) => this.setState({ address: newValue })}
          />
          <p>Or a latitude and longitude:</p>
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
        </Dialog>
      </div>

    );
  }
}

export default connect(state => ({
  isWhereToOpen: state.ui.meta.isWhereToOpen,
}), {
  setCenterTile: tileActions.setCenterTile,
  setMetaData: tileActions.setMetaData,
  toggleWhereTo: uiActions.toggleWhereTo,
  googleMapsRequest: tileActions.googleMapsRequest,
})(WhereTo);
