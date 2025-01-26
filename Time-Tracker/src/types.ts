import { Button, TextField } from '@mui/material'
import { useCallback, useContext, useEffect, useState } from 'react'

import { context } from 'Context'
import db from 'database'
import { ButtonWrapper } from 'sharedComponents'
import { type TProjectEntry } from 'types'
import Modal from './Modal'
import { type ModalID } from './RenderModal'

export interface ConfirmationModalProps {
  id: ModalID
}

const EditEntryModal = ({ projectEntryId }: { projectEntryId: string }) => {
  const { dispatch } = useContext(context)
  const [entry, setEntry] = useState<TProjectEntry | null>(null)
  const [details, setDetails] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  useEffect(() => {
    void db.table('projectEntries').get(projectEntryId).then((entry) => {
      if (entry) {
        setEntry(entry)
        setDetails(entry.details)
        setStart(entry.start)
        setEnd(entry.end)
      }
    })
  }, [projectEntryId])

  const handleCancel = useCallback(() => {
    dispatch({ type: 'CLEAR_ACTIVE_MODAL' })
  }, [dispatch])

  const handleConfirm = useCallback(() => {
    if (entry) {
      const updatedEntry = {
        ...entry,
        details,
        start,
        end
      }
      db.table('projectEntries').put(updatedEntry)
      dispatch({ type: 'CLEAR_ACTIVE_MODAL' })
    }
  }, [dispatch, entry, details, start, end])

  return (
    <Modal
      title={'Update Entry'}
      showModal={true}
    >
      <form>
        <TextField
          label="Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Start"
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="End"
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <ButtonWrapper>
          <Button variant={'outlined'} color={'secondary'} fullWidth onClick={handleCancel}>Cancel</Button>
          <Button variant="contained" color="primary" fullWidth onClick={handleConfirm}>Save</Button>
        </ButtonWrapper>
      </form>
    </Modal>
  )
}

export default EditEntryModal