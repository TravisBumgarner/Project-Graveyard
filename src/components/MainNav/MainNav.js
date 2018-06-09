import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import Logo from '../Logo';
import SiteLink from '../SiteLink';

import { USER_LINKS, SNIPPET_LINKS, CATEGORY_LINKS } from '../../urls';

// import {
// } from './MainNav.styles';

export default class MainNav extends Component {
  createLinks = (linkObj) => {
    const Links = linkObj.map((s) => {
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

    return Links;
  };


  render() {
    const {
      isOpen,
      toggleOpen,
    } = this.props;

    const CategoryLinks = this.createLinks(CATEGORY_LINKS.links);
    const SnippetLinks = this.createLinks(SNIPPET_LINKS.links);
    const UserLinks = this.createLinks(USER_LINKS.links);

    return (
      <Drawer open={isOpen} onClose={toggleOpen}>
        <div
          tabIndex={0}
          role="button"
          onClick={toggleOpen}
          onKeyDown={toggleOpen}
        >
          <Logo width="250px"/>
          <List component="nav">
            <Typography variant="subheading">{CATEGORY_LINKS.title}</Typography>
            {CategoryLinks}
            <Divider />
            <Typography variant="subheading">{SNIPPET_LINKS.title}</Typography>
            {SnippetLinks}
            <Divider />
            <Typography variant="subheading">{USER_LINKS.title}</Typography>
            {UserLinks}
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

