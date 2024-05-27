import { Box, Text } from "ink";
import TextInput from 'ink-text-input';
import React, { useContext, useState } from "react";
import { useAsyncEffect } from 'use-async-effect';

import { context } from "../context.js";
import { Menu } from "../shared/index.js";
import { AppPage, BasePageProps } from "../types.js";
import { readCache } from "../utils.js";

enum ActiveItem {
  backupRootDirectoryInput = 0,
  activeRootDirectoryInput = 1,
  ConfirmSubmit = 2,
  Submit = 3,
}

type PageProps = {

}

const PageComputeMissingSetup = ({ }: PageProps & BasePageProps) => {
  const { dispatch } = useContext(context)

  const [backupRootDirectory, setbackupRootDirectory] = useState<string>("");
  const [activeRootDirectory, setactiveRootDirectory] = useState<string>("");
  const [activeItem, setActiveItem] = useState<ActiveItem>(ActiveItem.backupRootDirectoryInput);

  const onTextInputSubmit = () => {
    setActiveItem(prev => prev + 1)
  }

  const menuCallback = (value: ActiveItem) => {
    if (value === ActiveItem.backupRootDirectoryInput) {
      setbackupRootDirectory("")
      setactiveRootDirectory("")
    }

    if (value === ActiveItem.Submit) {
      dispatch({
        type: 'SET_DIRECTORIES',
        payload: {
          activeRootDirectory,
          backupRootDirectory,
          page: AppPage.ComputeMissing
        }
      })
    }
    setActiveItem(value)
  }

  /**
   * Load paths from the cache, if they exist, on mount.
   */
  useAsyncEffect(async () => {
    const { backupRootDirectory, activeRootDirectory } = await readCache()
    activeRootDirectory && setbackupRootDirectory(activeRootDirectory)
    backupRootDirectory && setactiveRootDirectory(backupRootDirectory)
  }, [])

  return (
    <Box flexDirection="column">
      <Box>
        <Text>Backup Directory: </Text>
        {activeItem === ActiveItem.backupRootDirectoryInput
          ? <TextInput value={backupRootDirectory} onChange={setbackupRootDirectory} onSubmit={onTextInputSubmit} />
          : <Text>{backupRootDirectory}</Text>
        }
      </Box>
      <Box>
        <Text>Active Directory: </Text>
        {activeItem === ActiveItem.activeRootDirectoryInput
          ? <TextInput value={activeRootDirectory} onChange={setactiveRootDirectory} onSubmit={onTextInputSubmit} />
          : <Text>{activeRootDirectory}</Text>
        }
      </Box>
      {activeItem === ActiveItem.ConfirmSubmit && <Menu
        label="What do??"
        options={[
          { label: "submit", value: ActiveItem.Submit },
          { label: "Restart", value: ActiveItem.backupRootDirectoryInput },
        ]}
        callback={menuCallback} />
      }
    </Box>
  );
}

export default PageComputeMissingSetup;