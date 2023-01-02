import styled from 'styled-components';

import { NavLink } from 'react-router-dom'

const SiteLink = styled(NavLink)`
  text-decoration: none;
  text-transform: uppercase;
  padding: 10px 0;
  color: black;
  
  &:hover {
    color: blue;
  }
`;

const activeSiteLink = {
  color: 'blue',
};

const SiteLinkList = styled.ul`
  list-style-type: none;
  margin: 30px;
  padding: 0;
`;

const SiteLinkItem = styled.li`
  display: inline;
  margin: 5px;
`;

export {
  activeSiteLink,
  SiteLink,
  SiteLinkItem,
  SiteLinkList,
}