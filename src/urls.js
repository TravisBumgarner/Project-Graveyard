import React from 'react';

import Add from '@material-ui/icons/AddBox';
import List from '@material-ui/icons/List';
import Settings from '@material-ui/icons/Settings';

const SNIPPET_LINKS = {
  title: 'Snippets',
  links: [
    {
      text: 'View',
      to: '/',
      icon: <List />,
    },
    {
      text: 'Create',
      to: '/snippets/create',
      icon: <Add />,
    },
  ],
};

const CATEGORY_LINKS = {
  title: 'Categories',
  links: [
    {
      text: 'View',
      to: '/categories',
      icon: <List />,
    },
    {
      text: 'Create',
      to: '/categories/create',
      icon: <Add />,
    },
  ],
};

const USER_LINKS = {
  title: 'User',
  links: [
    {
      text: 'Settings',
      to: '/user/settings',
      icon: <Settings />,
    },
  ],
};

export {
  USER_LINKS,
  CATEGORY_LINKS,
  SNIPPET_LINKS,
};
