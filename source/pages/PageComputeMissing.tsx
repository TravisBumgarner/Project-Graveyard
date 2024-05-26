import { Box, Text } from "ink";
import TextInput from 'ink-text-input';
import React, { useCallback, useState } from "react";
import { useAsyncEffect } from "use-async-effect";
import { BasePageProps } from "../types.js";
import { readCache } from "../utils.js";

enum ActiveItem {
  BackupDirectoryInput = 0,
  ActiveDirectoryInput = 1,
  ComputeMenuItem = 2,
  ExitMenuItem = 3,
}


type PageProps = {

}

const ComputeMissing = ({ }: PageProps & BasePageProps) => {
  const [backupDirectory, setBackupDirectory] = useState<string>("");
  const [activeDirectory, setActiveDirectory] = useState<string>("");
  const [activeItem, setActiveItem] = useState<ActiveItem>(ActiveItem.BackupDirectoryInput);

  const onSubmit = useCallback(() => {
    setActiveItem(prev => prev + 1 + activeItem)
  }, [])

  useAsyncEffect(async () => {
    const { backupDirectory, activeDirectory } = await readCache()
    activeDirectory && setBackupDirectory(activeDirectory)
    backupDirectory && setActiveDirectory(backupDirectory)
  }, [])

  return (
    <Box flexDirection="column">
      <Box>
        <Text>Backup Directory:</Text>
        {activeItem === ActiveItem.ActiveDirectoryInput
          ? <TextInput value={backupDirectory} onChange={setBackupDirectory} onSubmit={onSubmit} />
          : <Text>{backupDirectory}</Text>
        }
      </Box>
      <Box>
        <Text>Active Directory:</Text>
        {activeItem === ActiveItem.BackupDirectoryInput
          ? <TextInput value={activeDirectory} onChange={setActiveDirectory} onSubmit={onSubmit} />
          : <Text>{activeDirectory}</Text>
        }
      </Box>
    </Box>
  );
}

export default ComputeMissing;