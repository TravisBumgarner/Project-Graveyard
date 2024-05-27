import { Box, Newline, Text } from "ink";
import Spinner from 'ink-spinner';
import React, { useContext, useMemo, useState } from "react";

import { useAsyncEffect } from "use-async-effect";
import findMissingFiles from "../algorithms/findMissingFiles.js";
import { walkDirectoryRecursivelyAndHash } from "../algorithms/walkDirectoryRecursivelyAndHash.js";
import { context } from "../context.js";
import { BasePageProps } from "../types.js";


type PageProps = {

}

enum Status {
  CalculatingactiveRootDirectory = "calculating-active-directory",
  CalculatingbackupRootDirectory = "calculating-backup-directory",
  Idle = "idle"
}

const PageComputeMissing = ({ }: PageProps & BasePageProps) => {
  const { state: { activeRootDirectory, backupRootDirectory } } = useContext(context)
  const [status, setStatus] = useState<Status>(Status.Idle)
  const [missingFileCount, setMissingFileCount] = useState<number | null>(null)

  const calculateactiveRootDirectory = async () => {
    const backupHashList: Record<string, string> = {};
    const activeHashList: Record<string, string> = {};

    setStatus(Status.CalculatingactiveRootDirectory);
    await walkDirectoryRecursivelyAndHash(backupRootDirectory, backupHashList);

    setStatus(Status.CalculatingbackupRootDirectory);
    await walkDirectoryRecursivelyAndHash(activeRootDirectory, activeHashList);

    const missingFiles = await findMissingFiles({ backupHashList, activeHashList })
    setMissingFileCount(missingFiles.length)
    setStatus(Status.Idle)
  }

  useAsyncEffect(async () => await calculateactiveRootDirectory(), [])

  const statusDisplay = useMemo(() => {
    switch (status) {
      case Status.CalculatingactiveRootDirectory:
        return (
          <Box>
            <Text color="green">
              <Spinner type="dots" />
            </Text>
            <Text>Calculating Active Directory</Text>
          </Box>
        )
      case Status.CalculatingbackupRootDirectory:
        return (
          <Box>
            <Text color="green">
              <Spinner type="dots" />
            </Text>
            <Text>Calculating Backup Directory</Text>
          </Box>
        )
      case Status.Idle:
        return (
          <Box>
            <Text>Idle</Text>
            <Newline /><Newline />
            <Text>Missing Files: {missingFileCount}</Text>
          </Box>
        )
    }
  }, [status])

  return (
    <Box flexDirection="column">
      <Box>
        <Text>Selected Active Directory: {activeRootDirectory}</Text>
      </Box>
      <Box>
        <Text>Select Backup Directory: {backupRootDirectory}</Text>
      </Box>
      {statusDisplay}
    </Box>
  );
}

export default PageComputeMissing;