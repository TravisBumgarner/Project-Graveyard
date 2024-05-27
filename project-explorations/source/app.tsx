import React, { useMemo, useState } from 'react';
import { Box, Text, useInput } from 'ink';


const items = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
]

const WINDOW_SIZE = 9
const INITIAL_INDEX = Math.floor(WINDOW_SIZE / 2)


export default function App() {
  const [windowStart, setWindowStart] = useState(0)
  const [windowEnd, setWindowEnd] = useState(WINDOW_SIZE)
  const [selectedIndex, setSelectedIndex] = useState(INITIAL_INDEX)
  // console.log('selectedIndex', selectedIndex)
  useInput((_input, key) => {
    if (key.upArrow) {
      // If the selected index is not in the center, center it first.
      if (selectedIndex > INITIAL_INDEX) {
        setSelectedIndex(selectedIndex - 1)
        return
      }

      if (windowStart === 0) {
        if (selectedIndex > 0) {
          setSelectedIndex(selectedIndex - 1)
        }
        return
      }

      setWindowStart(windowStart - 1)
      setWindowEnd(windowEnd - 1)
    }

    if (key.downArrow) {
      // If the selected index is not in the center, center it first.
      if (selectedIndex < INITIAL_INDEX) {
        setSelectedIndex(selectedIndex + 1)
        return
      }

      if (windowEnd === items.length) {
        if (selectedIndex < WINDOW_SIZE - 1) {
          setSelectedIndex(selectedIndex + 1)
        }
        return
      }

      setWindowStart(windowStart + 1)
      setWindowEnd(windowEnd + 1)
    }
  });

  const displayedItems = useMemo(() => {
    return items.slice(windowStart, windowEnd).map((item, index) => (
      <Text color={selectedIndex === index ? 'red' : 'black'} key={index}>{item}</Text>
    ));
  }, [windowStart, windowEnd, selectedIndex]);

  return (
    <Box flexDirection='column'>
      {displayedItems}
    </Box>
  );
}

