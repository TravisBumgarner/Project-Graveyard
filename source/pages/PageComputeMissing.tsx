import { Box, Text } from "ink";
import Spinner from 'ink-spinner';
import React, { useContext, useMemo, useState } from "react";

import { useAsyncEffect } from "use-async-effect";
import { context } from "../context.js";
import { BasePageProps } from "../types.js";

type PageProps = {

}

enum Status {
  CalculatingActiveDirectory = "calculating-active-directory",
  CalculatingBackupDirectory = "calculating-backup-directory",
  Idle = "idle"
}

function pauseFiveSeconds() {
  return new Promise(resolve => setTimeout(resolve, 5000));
}

const PageComputeMissing = ({ }: PageProps & BasePageProps) => {
  const { state: { activeDirectory, backupDirectory } } = useContext(context)
  const [status, setStatus] = useState<Status>(Status.Idle)

  const calculateActiveDirectory = async () => {
    setStatus(Status.CalculatingActiveDirectory)
    await pauseFiveSeconds()
    setStatus(Status.CalculatingBackupDirectory)
    await pauseFiveSeconds()
    setStatus(Status.Idle)
  }

  useAsyncEffect(async () => await calculateActiveDirectory(), [])

  const statusDisplay = useMemo(() => {
    switch (status) {
      case Status.CalculatingActiveDirectory:
        return (
          <Box>
            <Text color="green">
              <Spinner type="dots" />
            </Text>
            <Text>Calculating Active Directory</Text>
          </Box>
        )
      case Status.CalculatingBackupDirectory:
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
          </Box>
        )
    }
  }, [status])

  return (
    <Box flexDirection="column">
      <Box>
        <Text>Selected Active Directory: {activeDirectory}</Text>
      </Box>
      <Box>
        <Text>Select Backup Directory: {backupDirectory}</Text>
      </Box>
      {statusDisplay}
    </Box>
  );
}

export default PageComputeMissing;