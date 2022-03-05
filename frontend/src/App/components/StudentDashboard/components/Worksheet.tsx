import React from 'react'
import moment from 'moment'
import Modal from 'react-modal'
import { gql, useMutation, useQuery } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate, useParams } from 'react-router'

import { context } from '../..'
import { TWorksheet, TWorksheetEntry } from '../../../types'
import { dateToString } from '../../../utilities'
import styled from 'styled-components'
import { useRecorder } from '../../../hooks'
import { Button, H2, LabelAndInput, Paragraph, Table, TableBody, TableBodyCell, TableHeader, TableHeaderCell, TableRow } from '../../StyleExploration'

const GET_WORKSHEET = gql`
query GetWorksheets {
  worksheet {
    title,
    id,
    description,
    date,
    knownLanguage,
    newLanguage,
    userId,
    status,
    user {
      username
    }
  }
}
`

const ActionButton = styled.button`
    background-color: transparent;
    border: 0;
    cursor: pointer;
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

type AddWorksheetEntryModalProps = {
    closeModal: () => void
    worksheet: TWorksheet
}

const AddWorksheetEntryModal = ({ closeModal, worksheet }: AddWorksheetEntryModalProps) => {
    const { state, dispatch } = React.useContext(context)
    let [audioURL, isRecording, startRecording, stopRecording, clearAudioUrl] = useRecorder();
    const [addWorksheetEntry] = useMutation<{ addWorksheetEntry: TWorksheetEntry }>(ADD_WORKSHEET_ENTRY)
    const [knownLanguageText, setKnownLanguageText] = React.useState<string>('')
    const [newLanguageText, setNewLanguageText] = React.useState<string>('')

    const handleSubmit = async () => {
        const base64Audio = await objectUrlToBase64(audioURL)
        const response = await addWorksheetEntry({
            variables: {
                knownLanguageText,
                newLanguageText,
                id: uuidv4(),
                worksheetId: worksheet.id,
                audioUrl: base64Audio

            }
        })
        dispatch({ type: "ADD_WORKSHEET_ENTRY", data: { worksheetEntry: response.data.addWorksheetEntry } })
        setKnownLanguageText('')
        setNewLanguageText('')
        clearAudioUrl()
    }
    const handleCancel = () => {
        closeModal()
    }

    const handleClose = () => {
        closeModal()
    }

    return <div>
        <H2>New Worksheet Entry</H2>
        <div>
            <div>
                <LabelAndInput label={worksheet.knownLanguage} name="fromLanguage" value={knownLanguageText} handleChange={knownLanguage => setKnownLanguageText(knownLanguage)} />
            </div>

            <div>
                <LabelAndInput label={worksheet.newLanguage} name="newLanguage" value={newLanguageText} handleChange={newLanguage => setNewLanguageText(newLanguage)} />

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
                <Button variation="primary" onClick={handleClose}>Close</Button>
            </div>
        </div>
    </div>
}

type WorksheetEntryProps = {
    worksheetEntry: TWorksheetEntry
}
const WorksheetEntry = ({ worksheetEntry }: WorksheetEntryProps) => {
    const { state, dispatch } = React.useContext(context)
    const { id, knownLanguageText, newLanguageText, audioUrl } = worksheetEntry

    const [deleteWorksheetEntry] = useMutation<{ addWorksheetEntry: TWorksheetEntry }>(DELETE_WORKSHEET_ENTRY)

    const handleDelete = async () => {
        await deleteWorksheetEntry({ variables: { id } })
        dispatch({ type: "DELETE_WORKSHEET_ENTRY", data: { id } })
    }

    return (
        <TableRow key={id} >
            <TableBodyCell>{knownLanguageText}</TableBodyCell>
            <TableBodyCell>{newLanguageText}</TableBodyCell>
            <TableBodyCell><audio controls src={audioUrl} /></TableBodyCell>
            <TableBodyCell>

                <ActionButton onClick={handleDelete}>Delete</ActionButton>
            </TableBodyCell>
        </TableRow>
    )
}

type WorksheetProps = {

}

const Worksheet = ({ }: WorksheetProps) => {
    let { worksheetId } = useParams();
    const { state, dispatch } = React.useContext(context)
    const [showModal, setShowModal] = React.useState<boolean>(false)
    const [worksheet, setWorksheet] = React.useState<TWorksheet>()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    useQuery<{ worksheet: TWorksheet[] }>(GET_WORKSHEET, {
        onCompleted: (data) => {
            setWorksheet(data.worksheet[0])
            setIsLoading(false)
        }
    })

    if (isLoading) return <div>Loading...</div>


    const filteredWorksheetEntries = Object.values(state.worksheetEntries).filter((entry) => entry.worksheetId === worksheetId)


    const { title, description, knownLanguage, newLanguage, date } = worksheet

    return (
        <div>
            <div>
                <H2>{title}</H2>
                <Paragraph> Description: {description}</Paragraph>
                <Paragraph> Date: {dateToString(moment(date))}</Paragraph>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell scope="col">{worksheet.knownLanguage}</TableHeaderCell>
                            <TableHeaderCell scope="col">{worksheet.newLanguage}</TableHeaderCell>
                            <TableHeaderCell scope="col">Recorded</TableHeaderCell>
                            <TableHeaderCell scope="col">Actions</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredWorksheetEntries.map(worksheetEntry => <WorksheetEntry worksheetEntry={worksheetEntry} />)}
                    </TableBody>
                </Table>
                <Button variation="primary" onClick={() => setShowModal(true)}>Add Entry</Button>
            </div>
            <Button variation="primary" onClick={() => navigate('/user-dashboard')}>Submit for Feedback</Button>
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Add Worksheet"
            >
                <AddWorksheetEntryModal worksheet={worksheet} closeModal={() => setShowModal(false)} />
            </Modal>
        </div >
    )
}

export default Worksheet