import { Box, Text } from "ink";
import React, { useContext } from "react";

import { context } from "../context.js";
import { Menu } from "../shared/index.js";
import { AppPage, BasePageProps } from "../types.js";

const DisplayTree = ({ tree, indent = "" }: { tree: any, indent?: string }) => {
  return (
    <Box flexDirection="column">
      {Object.entries(tree).map(([key, value]) => {
        if (typeof value === 'string') {
          return <Text key={key}>{`${indent}${key}`}</Text>;
        } else if (Array.isArray(value)) {
          return (
            <Box key={key} flexDirection="column">
              <Text>{`${indent}${key}`} - {value.length} files missing</Text>
              {/* {value.map(file => <Text>{`${indent}  ${file}`}</Text>)} */}
            </Box>
          );
        } else {
          return (
            <Box key={key} flexDirection="column">
              <Text>{`${indent}${key}/`}</Text>
              <DisplayTree tree={value} indent={`${indent}  `} />
            </Box>
          );
        }
      })}
    </Box>
  );
};

type PageProps = {

}

const PageComputeMissingSetup = ({ navigatePage }: PageProps & BasePageProps) => {
  const { state: { missingFileTree } } = useContext(context)
  const menuCallback = (appPage: AppPage) => {
    navigatePage(appPage)
  }

  return (
    <Box flexDirection="column">
      <DisplayTree tree={missingFileTree} />
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