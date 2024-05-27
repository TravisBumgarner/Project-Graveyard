import { Box, Newline, Text } from "ink";
import Spinner from 'ink-spinner';
import React, { useContext, useMemo, useRef, useState } from "react";

import { useAsyncEffect } from "use-async-effect";
import findMissingFiles from "../algorithms/findMissingFiles.js";
import { walkDirectoryRecursivelyAndHash } from "../algorithms/walkDirectoryRecursivelyAndHash.js";
import { context } from "../context.js";
import Menu from "../shared/Menu.js";
import { AppPage, BasePageProps } from "../types.js";


type PageProps = {

}

enum Status {
  Idle = "idle",
  WalkingBackupDirectory = "calculating-active-directory",
  WalkingActiveDirectory = "calculating-backup-directory",
  CalculatingMissingFiles = "calculating-missing-files",
  NothingMissing = "nothing-missing",
  MoveToRestoreStep = "move-to-restore-step"
}

const PageComputeMissing = ({ navigatePage }: PageProps & BasePageProps) => {
  const { state: { activeRootDirectory, backupRootDirectory } } = useContext(context)
  const [status, setStatus] = useState<Status>(Status.Idle)
  const [missingFileCount, setMissingFileCount] = useState<number | null>(null)
  // Passing in a ref because we're only going to update the count every N files. 
  // Need to also trigger a rerender when function is done.
  const [rerender, triggerRerender] = useState(false)
  const activeFileCount = useRef<number>(0)
  const backupFileCount = useRef<number>(0)

  const rerenderHandler = () => triggerRerender(prev => !prev)

  const calculateactiveRootDirectory = async () => {
    const backupHashList: Record<string, string> = {};
    const activeHashList: Record<string, string> = {};

    setStatus(Status.WalkingBackupDirectory);
    await walkDirectoryRecursivelyAndHash(backupRootDirectory, backupHashList, rerenderHandler, activeFileCount);
    rerenderHandler()

    setStatus(Status.WalkingActiveDirectory);
    await walkDirectoryRecursivelyAndHash(activeRootDirectory, activeHashList, rerenderHandler, backupFileCount);

    setStatus(Status.CalculatingMissingFiles);
    const missingFiles = await findMissingFiles({ backupHashList, activeHashList })
    setMissingFileCount(missingFiles.length)

    if (missingFiles.length === 0) {
      setStatus(Status.NothingMissing)
    } else {
      setStatus(Status.MoveToRestoreStep)
    }
  }

  useAsyncEffect(async () => await calculateactiveRootDirectory(), [])

  const statusDisplay = useMemo(() => {
    switch (status) {
      case Status.WalkingBackupDirectory:
        console.log('setting status', status)
        return (
          <Box>
            <Text color="green">
              <Spinner type="dots" />
            </Text>
            <Text>Calculating Active Directory</Text>
          </Box>
        )
      case Status.WalkingActiveDirectory:
        console.log('setting status', status)
        return (
          <Box>
            <Text color="green">
              <Spinner type="dots" />
            </Text>
            <Text>Calculating Backup Directory</Text>
          </Box>
        )
      case Status.Idle:
        console.log('setting status', status)
        return (
          <Box>
            <Text>Idle</Text>
          </Box>
        )
      case Status.CalculatingMissingFiles:
        console.log('setting status', status)
        return (
          <Box>
            <Text color="green">
              <Spinner type="dots" />
            </Text>
            <Text>Calculating Missing Files</Text>
          </Box>
        )
      case Status.NothingMissing:
        console.log('setting status', status)
        return (
          <Menu
            label="Nothing is Missing"
            options={[
              { label: "Exit", value: AppPage.Exit },
              { label: "Main Menu", value: AppPage.MainMenu },
            ]}
            callback={navigatePage}
          />
        )
      case Status.MoveToRestoreStep:
        return (
          <Box flexDirection="column">
            <Text>{missingFileCount} files are missing. </Text>
            <Newline />
            <Menu
              options={[
                { label: "Restore", value: AppPage.ComputeRestoreSetup },
                { label: "Main Menu", value: AppPage.MainMenu },
                { label: "Exit", value: AppPage.Exit },
              ]}
              callback={navigatePage}
            />
          </Box>
        )
    }
  }, [status, rerender])

  return (
    <Box flexDirection="column">
      {statusDisplay}
    </Box>
  );
}

export default PageComputeMissing;