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
import uiActions from '../../store/ui/actions';

export class WhereTo extends Component {
  static propTypes = {
    setCenterTile: PropTypes.func.isRequired,
    setMetaData: PropTypes.func.isRequired,
    toggleWhereTo: PropTypes.func.isRequired,
    isWhereToOpen: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      centerLat: '40.7128',
      centerLon: '-74.0060',
      radius: '0.001',
    };
  }

  handleClose = () => {
    const {
      setCenterTile,
      setMetaData,
      toggleWhereTo,
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
    toggleWhereTo();
  };

  render() {
    const {
      centerLat,
      centerLon,
      radius,
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
          open={isWhereToOpen}
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

export default connect(state => ({
  isWhereToOpen: state.ui.meta.isWhereToOpen,
}), {
  setCenterTile: tileActions.setCenterTile,
  setMetaData: tileActions.setMetaData,
  toggleWhereTo: uiActions.toggleWhereTo,
})(WhereTo);
