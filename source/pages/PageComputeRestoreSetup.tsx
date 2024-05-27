import { Box, Text } from "ink";
import React, { useContext, useMemo, useState } from "react";

import { context } from "../context.js";
import ScrollableWindow from "../shared/ScrollableWindow.js";
import { Menu } from "../shared/index.js";
import { AppPage, BasePageProps } from "../types.js";

enum ActiveItem {
  FileSelection = 0,
  MenuSelection = 1
}

type PageProps = {

}

const PageComputeMissingSetup = ({ navigatePage }: PageProps & BasePageProps) => {
  const { dispatch, state: { missingFilesByDirectory } } = useContext(context)
  const [activeItem, setActiveItem] = useState<ActiveItem>(ActiveItem.FileSelection);


  const menuCallback = (appPage: AppPage) => navigatePage(appPage)


  const items = useMemo(() => {
    return missingFilesByDirectory?.map(({ directory, files }) => `${directory} - ${files.length}`)
  }, [missingFilesByDirectory])

  const fileSelectionCallback = (items: boolean[]) => {
    const itemsToRestore = missingFilesByDirectory?.filter((_, index) => items[index])

    if (itemsToRestore === undefined) {
      dispatch({
        type: 'SET_ERROR_MESSAGE',
        payload: {
          errorMessage: "No items selected."
        }
      })
    } else {
      dispatch({
        type: 'SET_FILES_BY_DIRECTORY_TO_RESTORE',
        payload: {
          filesByDirectoryToRestore: itemsToRestore
        }
      })
    }
    setActiveItem(ActiveItem.MenuSelection)
  }

  return (
    <Box flexDirection="column">
      {items !== undefined ? <ScrollableWindow isActive={activeItem === ActiveItem.FileSelection} items={items} windowSize={9} submitCallback={fileSelectionCallback} /> : <Text>No items missing.</Text>}
      <Menu
        options={[
          { label: "Restore", value: AppPage.ComputeRestore },
          { label: "Main Menu", value: AppPage.MainMenu },
          { label: "Exit", value: AppPage.Exit },
        ]}
        isFocused={activeItem === ActiveItem.MenuSelection}
        callback={menuCallback}
      />
    </Box>
  );
}

export default PageComputeMissingSetup;