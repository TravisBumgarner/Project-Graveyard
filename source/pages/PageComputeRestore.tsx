import { Box, Newline, Text } from "ink";
import React from "react";

import { Menu } from "../shared/index.js";
import { AppPage, BasePageProps } from "../types.js";


type PageProps = {

}

const PageComputeMissingSetup = ({ navigatePage }: PageProps & BasePageProps) => {
  const menuCallback = (appPage: AppPage) => {
    navigatePage(appPage)
  }

  return (
    <Box flexDirection="column">
      <Text>Restored 2 files. (This is currently a placeholder)</Text>
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