import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import Clear from 'material-ui/svg-icons/content/clear';

import requestActions from '../../store/requests/actions';
import uiActions from '../../store/ui/actions';
import tileActions from '../../store/tile/actions';

import { CENTER_DIRECTION } from '../../utilities/constants';

export class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      centerLat: 0,
      centerLon: 0,
      radius: 0,
    };
  }

  static propTypes = {
    sideMenuOpen: PropTypes.bool,
    centerTileDetails: PropTypes.object,
    radius: PropTypes.number,
    toggleSideMenu: PropTypes.func,
    setMetaData: PropTypes.func,
    setCenterTile: PropTypes.func
  };

  componentWillReceiveProps(nextProps){
    const { dataLoaded } = this.state;

    if (!dataLoaded){
      const {
        centerTileDetails: {
          lat,
          lon
        },
        radius
      } = nextProps;

      this.setState({
        centerLat: lat,
        centerLon: lon,
        radius,
      });
    }
  }

  takeOff = () => {
    let {
      centerLat,
      centerLon,
      radius,
    } = this.state;

    const {
      setMetaData,
      setCenterTile,
      toggleSideMenu,
    } = this.props;

    centerLat = parseFloat(centerLat);
    centerLon = parseFloat(centerLon);
    radius = parseFloat(radius);

    const tileDetails = {centerLat, centerLon};
    setCenterTile(tileDetails, radius);

    setMetaData(radius);
    toggleSideMenu();
  };

  render() {
    const {
      sideMenuOpen,
      toggleSideMenu,
    } = this.props;

    const {
      centerLat,
      centerLon,
      radius,
    } = this.state;

    return (
      <div>
        <Drawer
          docked={false}
          width={250}
          open={sideMenuOpen}
          onRequestChange={toggleSideMenu}
          openSecondary={true}
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
            value = {radius}
            floatingLabelText="Radius"
            onChange={ (event, newValue) => this.setState({radius: newValue}) }
          />
          <RaisedButton
            label="Take Off"
            labelPosition="before"
            primary={true}
            icon={<ActionFlightTakeoff />}
            onClick={ this.takeOff }
          />
          <IconButton tooltip="Close Menu">
            <Clear onClick={toggleSideMenu} />
          </IconButton>
        </Drawer>
      </div>
    );
  }
}

export default connect(state => ({
  sideMenuOpen: state.ui.meta.sideMenuOpen,
  centerTileDetails: state.tile.allTiles[CENTER_DIRECTION],
  radius: state.tile.meta.radius,
}), {
  toggleSideMenu: uiActions.toggleSideMenu,
  setMetaData: tileActions.setMetaData,
  setCenterTile: tileActions.setCenterTile,
})(SideMenu);
