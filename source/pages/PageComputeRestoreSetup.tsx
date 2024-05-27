import { Box, Text } from "ink";
import TextInput from 'ink-text-input';
import React, { useContext, useState } from "react";
import { useAsyncEffect } from 'use-async-effect';

import fs from "fs";
import { context } from "../context.js";
import { Menu } from "../shared/index.js";
import { BasePageProps } from "../types.js";
import { readCache } from "../utils.js";

function verifyDirectoryExists(directoryPath: string): boolean {
  return fs.existsSync(directoryPath);
}

enum ActiveItem {
  BackupRootDirectoryInput = 0,
  ActiveRootDirectoryInput = 1,
  ConfirmSubmit = 2,
  Submit = 3
}

type PageProps = {

}

const PageComputeMissingSetup = ({ }: PageProps & BasePageProps) => {
  const { dispatch } = useContext(context)

  const [backupRootDirectory, setBackupRootDirectory] = useState<string>("");
  const [activeRootDirectory, setActiveRootDirectory] = useState<string>("");
  const [activeItem, setActiveItem] = useState<ActiveItem>(ActiveItem.BackupRootDirectoryInput);
  const [errorMessage, setErrorMessage] = useState<string>("")

  const onTextInputSubmit = () => {
    setActiveItem(prev => prev + 1)
  }

  const menuCallback = (value: ActiveItem) => {
    if (value === ActiveItem.BackupRootDirectoryInput) {
      setBackupRootDirectory("")
      setActiveRootDirectory("")
    }

    if (value === ActiveItem.Submit) {
      const backupExists = verifyDirectoryExists(backupRootDirectory)
      const activeExists = verifyDirectoryExists(activeRootDirectory)

      if (!backupExists || !activeExists) {
        let newErrorMessage = ""
        backupExists || (newErrorMessage += "Backup directory does not exist. ")
        activeExists || (newErrorMessage += "Active directory does not exist. ")

        setErrorMessage(newErrorMessage)
        setActiveItem(ActiveItem.BackupRootDirectoryInput)
        return
      }

      dispatch({
        type: 'SET_DIRECTORIES',
        payload: {
          activeRootDirectory,
          backupRootDirectory,
        }
      })
      // page: AppPage
    }
    setActiveItem(value)

  }

  /**
   * Load paths from the cache, if they exist, on mount.
   */
  useAsyncEffect(async () => {
    const { backupRootDirectory, activeRootDirectory } = await readCache()
    activeRootDirectory && setBackupRootDirectory(activeRootDirectory)
    backupRootDirectory && setActiveRootDirectory(backupRootDirectory)
  }, [])

  return (
    <Box flexDirection="column">
      <Text>Error: {errorMessage}</Text>
      <Box>
        <Text>Backup Directory: </Text>
        {activeItem === ActiveItem.BackupRootDirectoryInput
          ? <TextInput value={backupRootDirectory} onChange={setBackupRootDirectory} onSubmit={onTextInputSubmit} />
          : <Text>{backupRootDirectory}</Text>
        }
      </Box>
      <Box>
        <Text>Active Directory: </Text>
        {activeItem === ActiveItem.ActiveRootDirectoryInput
          ? <TextInput value={activeRootDirectory} onChange={setActiveRootDirectory} onSubmit={onTextInputSubmit} />
          : <Text>{activeRootDirectory}</Text>
        }
      </Box>
      {activeItem === ActiveItem.ConfirmSubmit && <Menu
        label="What do??"
        options={[
          { label: "submit", value: ActiveItem.Submit },
          { label: "Restart", value: ActiveItem.BackupRootDirectoryInput },
        ]}
        callback={menuCallback} />
      }
    </Box>
  );
}

export default PageComputeMissingSetup;