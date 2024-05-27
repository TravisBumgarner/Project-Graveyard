import { Box, Newline, Text } from "ink";
import React, { useContext } from "react";
import { context } from "../context.js";
import { BasePageProps } from "../types.js";

type PageProps = {

}

const PageComputeMissing = ({ }: PageProps & BasePageProps) => {
  const { state: { activeDirectory, backupDirectory } } = useContext(context)
  console.log('hii', activeDirectory, backupDirectory)
  return (
    <Box flexDirection="column">
      <Box>
        <Text>Active Directory!: {activeDirectory}</Text>
        <Newline />
        <Text>Backup Directory!: {backupDirectory}</Text>
      </Box>
    </Box>
  );
}

export default PageComputeMissing;