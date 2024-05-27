import { Box, Newline, Text } from "ink";
import React, { useContext } from "react";

import { context } from "../context.js";
import { Menu } from "../shared/index.js";
import { AppPage, BasePageProps } from "../types.js";


type PageProps = {

}

const PageComputeMissingSetup = ({ navigatePage }: PageProps & BasePageProps) => {
  const { state: { filesByDirectoryToRestore } } = useContext(context)
  const menuCallback = (appPage: AppPage) => {
    navigatePage(appPage)
  }

  return (
    <Box flexDirection="column">
      <Text>Restoring {filesByDirectoryToRestore?.length} directories</Text>
      <Newline />
      <Menu
        options={[
          { label: "Restart", value: AppPage.Exit },
          { label: "Main Menu", value: AppPage.MainMenu },
        ]}
        callback={menuCallback}
      />
    </Box>
  );
}

export default PageComputeMissingSetup;