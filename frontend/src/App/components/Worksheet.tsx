import * as React from 'react'
import moment from 'moment'
import Modal from 'react-modal'
import { gql, useMutation, useQuery } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import { useParams } from 'react-router'
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

import { context } from '.'
import { WorksheetEntry } from '../types'
import { dateToString } from '../utilities'
import styled from 'styled-components'

const ActionButton = styled.button`
    background-color: transparent;
    border: 0;

`

const ADD_WORKSHEET_ENTRY = gql`
mutation AddWorksheetEntry (
    $text: String!
    $id: String!
    $worksheetId: String!
  ) {
    addWorksheetEntry(id: $id, text: $text, worksheetId: $worksheetId){
      id,
      text,
      worksheetId
    }
}
`;

const DELETE_WORKSHEET_ENTRY = gql`
mutation DeleteWorksheetEntry (
    $id: String!
  ) {
    deleteWorksheetEntry(id: $id){
      id,
    }
}
`;

type AddSentenceProps = {
    closeModal: () => void
    worksheetId: string
}

const AddWorksheetEntryModal = ({ closeModal, worksheetId }: AddSentenceProps) => {
    const { state, dispatch } = React.useContext(context)
    const [addWorksheetEntry] = useMutation<{ addWorksheetEntry: WorksheetEntry }>(ADD_WORKSHEET_ENTRY)
    const [text, setText] = React.useState<string>('')
    const handleSubmit = async () => {
        const response = await addWorksheetEntry({
            variables: {
                text,
                id: uuidv4(),
                worksheetId
            }
        })
        console.log('handlesiubmit', response.data.addWorksheetEntry)
        dispatch({ type: "ADD_WORKSHEET_ENTRY", data: { worksheetEntry: response.data.addWorksheetEntry } })
        closeModal()
    }

    const handleCancel = () => {
        closeModal()
    }

    const handleDelete = () => {
        closeModal()
    }

    return <div>
        <h1>New Worksheet Entry</h1>
        <div>
            <div>
                <label htmlFor="text">Text: </label>
                <input name="text" value={text} onChange={event => setText(event.target.value)} />
            </div>

            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    </div>
}

type WorksheetEntryProps = {
    worksheetEntry: WorksheetEntry
}
const WorksheetEntry = ({ worksheetEntry }: WorksheetEntryProps) => {
    const { state, dispatch } = React.useContext(context)
    const { id, text } = worksheetEntry

    const [deleteWorksheetEntry] = useMutation<{ addWorksheetEntry: WorksheetEntry }>(DELETE_WORKSHEET_ENTRY)

    const handleDelete = async () => {
        await deleteWorksheetEntry({ variables: { id } })
        dispatch({ type: "DELETE_WORKSHEET_ENTRY", data: { id } })
    }

    return (
        <tr key={id} >
            <td>{text}</td>
            <td>Audio coming soon</td>
            <td>
                <ActionButton><AiOutlineEdit /></ActionButton>
                <ActionButton onClick={handleDelete}><AiOutlineDelete /></ActionButton>
            </td>
        </tr>
    )
}

type WorksheetProps = {

}

const Worksheet = ({ }: WorksheetProps) => {
    let { worksheetId } = useParams();
    const { state, dispatch } = React.useContext(context)
    const [showModal, setShowModal] = React.useState<boolean>(false)
    const filteredWorksheetEntries = Object.values(state.worksheetEntries).filter((entry) => entry.worksheetId === worksheetId)

    return (
        <div>
            <div style={{ border: '1px solid black', padding: '10px' }}>
                <h1>{state.worksheets[worksheetId].title}</h1>
                <p>Description: {state.worksheets[worksheetId].description}</p>
                <p>Date: {dateToString(moment(state.worksheets[worksheetId].date))}</p>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Written</th>
                            <th scope="col">Recorded</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredWorksheetEntries.map(worksheetEntry => <WorksheetEntry worksheetEntry={worksheetEntry} />)}
                    </tbody>
                </table>
                <button onClick={() => setShowModal(true)}>Add Entry</button>
            </div>
            <button onClick={() => console.log('submitted')}>Submit for Feedback</button>
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Add Worksheet"
            >
                <AddWorksheetEntryModal worksheetId={worksheetId} closeModal={() => setShowModal(false)} />
            </Modal>
        </div>
    )
}

export default Worksheet