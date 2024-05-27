import React, { useContext } from 'react';

import { context } from './context.js';
import PageExit from './pages/Exit.js';
import { PageComputeMissing, PageComputeMissingSetup, PageMainMenu } from './pages/index.js';
import { AppPage } from './types.js';

export default function App() {
  const { state: { activePage } } = useContext(context)

  switch (activePage) {
    case AppPage.MainMenu:
      return <PageMainMenu />;
    case AppPage.ComputeMissingSetup:
      return <PageComputeMissingSetup />;
    case AppPage.ComputeMissing:
      return <PageComputeMissing />
    case AppPage.Exit:
      return <PageExit />
  }
}
