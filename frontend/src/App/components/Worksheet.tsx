import React from 'react'
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
import { useRecorder } from '../hooks'
import { Button, LabelAndInput } from './StyleExploration'

const ActionButton = styled.button`
    background-color: transparent;
    border: 0;

`

const objectUrlToBase64 = async (objectUrl: string) => {
    const blob = await fetch(objectUrl).then(r => r.blob())
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}

const ADD_WORKSHEET_ENTRY = gql`

mutation AddWorksheetEntry (
    $knownLanguageText: String!
    $newLanguageText: String!
    $id: String!
    $worksheetId: String!
    $audioUrl: String!
  ) {
    addWorksheetEntry(id: $id, worksheetId: $worksheetId, knownLanguageText: $knownLanguageText, newLanguageText: $newLanguageText, audioUrl: $audioUrl){
      id,
      knownLanguageText,
      newLanguageText,
      worksheetId,
      audioUrl
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
    let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
    const [addWorksheetEntry] = useMutation<{ addWorksheetEntry: WorksheetEntry }>(ADD_WORKSHEET_ENTRY)
    const [knownLanguageText, setKnownLanguageText] = React.useState<string>('')
    const [newLanguageText, setNewLanguageText] = React.useState<string>('')
    const handleSubmit = async () => {
        const base64Audio = await objectUrlToBase64(audioURL)
        const response = await addWorksheetEntry({
            variables: {
                knownLanguageText,
                newLanguageText,
                id: uuidv4(),
                worksheetId,
                audioUrl: base64Audio

            }
        })
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
                <LabelAndInput label="From" name="fromLanguage" value={knownLanguageText} handleChange={knownLanguage => setKnownLanguageText(knownLanguage)} />
            </div>

            <div>
                <LabelAndInput label="To" name="fnewLanguage" value={newLanguageText} handleChange={newLanguage => setNewLanguageText(newLanguage)} />

            </div>

            <audio src={audioURL} controls />
            <div>
                <button onClick={startRecording} disabled={isRecording}>
                    Record
                </button>
                <button onClick={stopRecording} disabled={!isRecording}>
                    Stop
                </button>
            </div>

            <div>
                <Button variation="primary" onClick={handleSubmit}>Submit</Button>
                <Button variation="primary" onClick={handleCancel}>Cancel</Button>
                <Button variation="primary" onClick={handleDelete}>Delete</Button>
            </div>
        </div>
    </div>
}

type WorksheetEntryProps = {
    worksheetEntry: WorksheetEntry
}
const WorksheetEntry = ({ worksheetEntry }: WorksheetEntryProps) => {
    const { state, dispatch } = React.useContext(context)
    const { id, knownLanguageText, newLanguageText } = worksheetEntry

    const [deleteWorksheetEntry] = useMutation<{ addWorksheetEntry: WorksheetEntry }>(DELETE_WORKSHEET_ENTRY)

    const handleDelete = async () => {
        await deleteWorksheetEntry({ variables: { id } })
        dispatch({ type: "DELETE_WORKSHEET_ENTRY", data: { id } })
    }

    return (
        <tr key={id} >
            <td>{knownLanguageText}</td>
            <td>{newLanguageText}</td>
            <td><audio controls src={__AUDIO_ENDPOINT__ + `/recordings/${worksheetEntry.worksheetId}/${worksheetEntry.id}.webm`} /></td>
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

    const { title, description, knownLanguage, newLanguage, date } = state.worksheets[worksheetId]
    return (
        <div>
            <div style={{ border: '1px solid black', padding: '10px' }}>
                <h1>{title}</h1>
                <p>Description: {description}</p>
                <p>Date: {dateToString(moment(date))}</p>
                <p>From: {knownLanguage} To: {newLanguage}</p>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">{state.worksheets[worksheetId].knownLanguage}</th>
                            <th scope="col">{state.worksheets[worksheetId].newLanguage}</th>
                            <th scope="col">Recorded</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredWorksheetEntries.map(worksheetEntry => <WorksheetEntry worksheetEntry={worksheetEntry} />)}
                    </tbody>
                </table>
                <Button variation="primary" onClick={() => setShowModal(true)}>Add Entry</Button>
            </div>
            <Button variation="primary" onClick={() => console.log('submitted')}>Submit for Feedback</Button>
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