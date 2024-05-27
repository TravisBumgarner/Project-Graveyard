import { Box, Text } from "ink";
import React, { useContext, useEffect } from "react";
import { context } from "../context.js";
import { BasePageProps } from "../types.js";
import { cacheData } from "../utils.js";

type PageProps = {

}

const PageExit = ({ }: PageProps & Omit<BasePageProps, 'setCurrentPage'>) => {
  const { state: { activeRootDirectory, backupRootDirectory } } = useContext(context)

  useEffect(() => {
    cacheData({ activeRootDirectory, backupRootDirectory })
  }, [])

  return (
    <Box flexDirection="column">
      <Text>Exiting...</Text>
    </Box>
  );
}

export default PageExit;