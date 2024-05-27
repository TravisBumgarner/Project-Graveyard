import { Box, Text } from "ink";
import TextInput from 'ink-text-input';
import React, { useContext, useState } from "react";
import { useAsyncEffect } from 'use-async-effect';

import { context } from "../context.js";
import { Menu } from "../shared/index.js";
import { AppPage, BasePageProps } from "../types.js";
import { readCache } from "../utils.js";

enum ActiveItem {
  BackupDirectoryInput = 0,
  ActiveDirectoryInput = 1,
  ConfirmSubmit = 2,
  Submit = 3,
}

type PageProps = {

}

const PageComputeMissingSetup = ({ }: PageProps & BasePageProps) => {
  const { dispatch } = useContext(context)

  const [backupDirectory, setBackupDirectory] = useState<string>("");
  const [activeDirectory, setActiveDirectory] = useState<string>("");
  const [activeItem, setActiveItem] = useState<ActiveItem>(ActiveItem.BackupDirectoryInput);

  const onTextInputSubmit = () => {
    setActiveItem(prev => prev + 1)
  }

  const menuCallback = (value: ActiveItem) => {
    if (value === ActiveItem.BackupDirectoryInput) {
      setBackupDirectory("")
      setActiveDirectory("")
    }

    if (value === ActiveItem.Submit) {
      dispatch({
        type: 'SET_DIRECTORIES',
        payload: {
          activeDirectory,
          backupDirectory,
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
    const { backupDirectory, activeDirectory } = await readCache()
    activeDirectory && setBackupDirectory(activeDirectory)
    backupDirectory && setActiveDirectory(backupDirectory)
  }, [])

  return (
    <Box flexDirection="column">
      <Box>
        <Text>Backup Directory: </Text>
        {activeItem === ActiveItem.BackupDirectoryInput
          ? <TextInput value={backupDirectory} onChange={setBackupDirectory} onSubmit={onTextInputSubmit} />
          : <Text>{backupDirectory}</Text>
        }
      </Box>
      <Box>
        <Text>Active Directory: </Text>
        {activeItem === ActiveItem.ActiveDirectoryInput
          ? <TextInput value={activeDirectory} onChange={setActiveDirectory} onSubmit={onTextInputSubmit} />
          : <Text>{activeDirectory}</Text>
        }
      </Box>
      {activeItem === ActiveItem.ConfirmSubmit && <Menu
        label="What do??"
        options={[
          { label: "submit", value: ActiveItem.Submit },
          { label: "Restart", value: ActiveItem.BackupDirectoryInput },
        ]}
        callback={menuCallback} />
      }
    </Box>
  );
}

export default PageComputeMissingSetup;