import React, { Component } from 'react';

import {
  SiteLink,
  SiteLinkList,
  SiteLinkItem,
  activeSiteLink,
} from './Nav.styles';

export default class Nav extends Component {
  render() {

    return (
      <SiteLinkList>
        <SiteLinkItem><SiteLink exact activeStyle={activeSiteLink} to="/">Home</SiteLink></SiteLinkItem>
        <SiteLinkItem><SiteLink activeStyle={activeSiteLink} to="/admin">Admin</SiteLink></SiteLinkItem>
      </SiteLinkList>
    )
  }
}