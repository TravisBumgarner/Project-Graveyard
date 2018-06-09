import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default class Header extends Component {
  toggleMainNav = () => {
    const {
      toggleMainNav,
    } = this.props;

    toggleMainNav();
  };

  render() {
    return (
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon onClick={this.toggleMainNav} />
          </IconButton>
          <Typography>
            re/Mind Me
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  toggleMainNav: PropTypes.func.isRequired,
};
