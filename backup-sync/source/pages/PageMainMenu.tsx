import React, { useCallback } from "react";
import SelectInput from 'ink-select-input';
import { AppPage } from "../types.js";
import { Box, Text } from "ink";
import { BasePageProps } from "../types.js";

type MenuItem = { label: string, value: AppPage }

type PageProps = {

}

const MainMenu = ({ setCurrentPage }: PageProps & BasePageProps) => {
  const handleSelect = useCallback((selection: MenuItem) => {
    setCurrentPage(selection.value)
  }, [])

  const items: MenuItem[] = [
    {
      label: "Check files",
      value: AppPage.CheckFilesSetup
    },
    {
      label: "Exit",
      value: AppPage.Exit
    },
  ];

  return (
    <Box flexDirection="column">
      <Box>
        <Text>What to do?</Text>
      </Box>
      <SelectInput items={items} onSelect={handleSelect} />
    </Box>
  );
}

export default MainMenu;