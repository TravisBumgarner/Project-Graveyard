import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ListIcon from '@material-ui/icons/List';

import SiteLink from '../../components/SiteLink';

// import {
// } from './MainNav.styles';

const SITE_LINKS = [
  {
    text: 'Home',
    to: '/',
    icon: <ListIcon />,
  },
  {
    text: 'Create a Snippet',
    to: '/snippets/create',
    icon: <AddBoxIcon />,
  },
];

export default class MainNav extends Component {
  render() {
    const {
      isOpen,
      toggleOpen,
    } = this.props;

    const Links = SITE_LINKS.map((s) => {
      return (
        <SiteLink to={s.to} key={s.text}>
          <ListItem button>
            <ListItemIcon>
              {s.icon}
            </ListItemIcon>
            <ListItemText primary={`${s.text}`} />
          </ListItem>
        </SiteLink>
      );
    });

    return (
      <Drawer open={isOpen} onClose={toggleOpen}>
        <div
          tabIndex={0}
          role="button"
          onClick={toggleOpen}
          onKeyDown={toggleOpen}
        >
          <List component="nav">
            {Links}
          </List>
        </div>
      </Drawer>
    );
  }
}

MainNav.propTypes = {
  toggleOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

