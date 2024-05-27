import { Box, Text } from "ink";
import React, { useContext, useMemo } from "react";

import { context } from "../context.js";
import ScrollableWindow from "../shared/ScrollableWindow.js";
import { Menu } from "../shared/index.js";
import { AppPage, BasePageProps } from "../types.js";

type PageProps = {

}

const PageComputeMissingSetup = ({ navigatePage }: PageProps & BasePageProps) => {
  const { state: { missingFilesByDirectory } } = useContext(context)
  const menuCallback = (appPage: AppPage) => {
    navigatePage(appPage)
  }

  const items = useMemo(() => {
    return missingFilesByDirectory?.map(({ directory, files }) => `${directory} - ${files.length}`)
  }, [missingFilesByDirectory])

  


  return (
    <Box flexDirection="column">
      {items !== undefined ? <ScrollableWindow items={items} windowSize={9} /> : <Text>No items missing.</Text>}
      <Menu
        options={[
          { label: "Restore", value: AppPage.ComputeRestore },
          { label: "Main Menu", value: AppPage.MainMenu },
          { label: "Exit", value: AppPage.Exit },
        ]}
        callback={menuCallback}
      />
    </Box>
  );
}

export default PageComputeMissingSetup;