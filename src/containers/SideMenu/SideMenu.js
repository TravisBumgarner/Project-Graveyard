import React, { Component } from 'react';
import { connect } from 'react-redux';

import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import uiActions from '../../store/ui/actions';

export class SideMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleToggle = () => {
    const { toggleSideMenu } = this.props;
    toggleSideMenu();
  };

  render() {
    const {
      sideMenuOpen,
      toggleSideMenu,
    } = this.props;

    return (
      <div>
        <Drawer
          docked={false}
          width={200}
          open={sideMenuOpen}
          onRequestChange={toggleSideMenu}
        >
          <TextField
            value = {5}
            floatingLabelText="Latitude"
            onChange={ (event, newValue) => this.setState({centerLat: newValue}) }
          />
          <TextField
            value = {6}
            floatingLabelText="Longitude"
            onChange={ (event, newValue) => this.setState({centerLon: newValue}) }
          />
          <TextField
            value = {7}
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
}), {
  toggleSideMenu: uiActions.toggleSideMenu,
})(SideMenu);
