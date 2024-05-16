import { Box, FormControl, InputLabel, MenuItem, Select, Typography, css, type SelectChangeEvent } from '@mui/material'
import { useCallback, useContext } from 'react'

import { context } from 'Context'
import { EColorTheme } from 'types'
import { colorThemeOptionLabels } from 'utilities'
import Modal from './Modal'

const Settings = () => {
  const { state, dispatch } = useContext(context)

  const handleThemeChange = useCallback((event: SelectChangeEvent<EColorTheme>) => {
    dispatch({ type: 'EDIT_USER_SETTING', payload: { key: 'colorTheme', value: event.target.value } })
  }, [dispatch])

  return (
    <Modal
      title="Settings"
      showModal={true}
    >
      <Box css={sectionWrapperCSS}>
        <Typography variant="h3">Theme</Typography>
        <FormControl fullWidth margin='normal'>
          <InputLabel id="setting-modal-color-theme">Color Theme</InputLabel>
          <Select
            fullWidth
            labelId="setting-modal-color-theme"
            value={state.settings.colorTheme}
            label="Color Theme"
            onChange={handleThemeChange}
          >
            {Object.keys(EColorTheme).map(key => <MenuItem key={key} value={key}>{colorThemeOptionLabels[key as EColorTheme]}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>
    </Modal >
  )
}

const sectionWrapperCSS = css`
  border-radius: 1rem;
  padding: 1rem;
  margin: 1rem 0;
  background-color: var(--mui-palette-background-paper);
`

const fileNameCSS = css`
  margin: 0.5rem 0;
`

const sectionHeaderWrapperCSS = css`
  display: flex;
  justify-content: space-between;
`

export default Settings
