import { Box, Text } from "ink";
import SelectInput from 'ink-select-input';
import React from "react";

type Option<T> = { label: string, value: T }

type Props<T> = {
  options: Option<T>[]
  callback: (value: T) => void
  label: string
}

const Menu = <T extends string | number>({ options, callback, label }: Props<T>) => {
  const handleSelect = ({ value }: Option<T>) => {
    console.log('selected', value)
    callback(value)
  }

  return (
    <Box flexDirection="column">
      <Box>
        <Text>{label}</Text>
      </Box>
      <SelectInput items={options} onSelect={handleSelect} />
    </Box>
  );
}

export default Menu;