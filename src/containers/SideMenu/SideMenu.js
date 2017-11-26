import React, { Component } from 'react';
import { connect } from 'react-redux';

import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import uiActions from '../../store/ui/actions';

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

  handleToggle = () => {
    const { toggleSideMenu } = this.props;
    toggleSideMenu();
  };

  render() {
    console.log("state", this.state);

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
          width={200}
          open={sideMenuOpen}
          onRequestChange={toggleSideMenu}
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
})(SideMenu);
