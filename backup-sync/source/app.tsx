import React, { useState } from 'react';
import { Box, Text } from 'ink';

import { PageComputeMissing, PageMainMenu } from './pages/index.js';
import { AppPage } from './types.js';

export default function App() {
  const [currentPage, setCurrentPage] = useState(AppPage.MainMenu);

  switch (currentPage) {
    case AppPage.MainMenu:
      return <PageMainMenu setCurrentPage={setCurrentPage} />;
    case AppPage.CheckFilesSetup:
      return <PageComputeMissing setCurrentPage={setCurrentPage} />;
    case AppPage.Exit:
      return <Text>Farewell</Text>;
    default:
      return <Box><Text>You shouldn't see this.</Text></Box>;
  }
}
