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
  const { dispatch, state } = useContext(context)
  const [entry, setEntry] = useState<TProjectEntry | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [hours, setHours] = useState('')

  useEffect(() => {
    void db.table('projectEntries').get(projectEntryId).then((entry) => {
      if (entry) {
        setEntry(entry)
        setTitle(entry.title)
        setDescription(entry.description)
        setDate(entry.date)
        setHours(entry.hours.toString())
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
        title,
        description,
        date,
        hours: parseFloat(hours)
      }
      void db.table('projectEntries').put(updatedEntry)
      dispatch({ type: 'CLEAR_ACTIVE_MODAL' })
    }
  }, [dispatch, entry, title, description, date, hours])

  return (
    <Modal
      title={'Update Entry'}
      showModal={true}
    >
      <form>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => { setTitle(e.target.value) }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => { setDescription(e.target.value) }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => { setDate(e.target.value) }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          label="Hours"
          type="number"
          value={hours}
          onChange={(e) => { setHours(e.target.value) }}
          fullWidth
          margin="normal"
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
