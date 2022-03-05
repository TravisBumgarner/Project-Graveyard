import React from 'react'
import moment from 'moment'
import Modal from 'react-modal'
import { gql, useMutation, useQuery } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate, useParams } from 'react-router'
import styled from 'styled-components'

import { Loading, AudioRecorder } from 'sharedComponents'
import { TWorksheet, TWorksheetEntry, TWorksheetStatus } from '../../../types'
import utilities from '../../../utilities'
import { context } from '../../Context'
import { useRecorder } from '../../../hooks'
import {
    Button, H2, LabelAndInput, Paragraph, Table, TableBody, TableBodyCell, TableHeader, TableHeaderCell, TableRow,
} from '../../StyleExploration'

const GET_WORKSHEET_AND_WORKSHEET_ENTRIES = gql`
query GetWorksheets($worksheetId: String) {
  worksheet(worksheetId: $worksheetId) {
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
  worksheetEntries(worksheetId: $worksheetId) {
   id,
   knownLanguageText,
   newLanguageText,
   audioUrl, 
  }

}
`

const ActionButton = styled.button`
    background-color: transparent;
    border: 0;
    cursor: pointer;
`

const objectUrlToBase64 = async (objectUrl: string) => {
    const blob = await fetch(objectUrl).then((r) => r.blob())
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(blob)
    })
}

const ADD_WORKSHEET_ENTRY = gql`

mutation AddWorksheetEntry (
    $knownLanguageText: String!
    $newLanguageText: String!
    $id: String!
    $worksheetId: String!
    $audioUrl: String!
  ) {
    addWorksheetEntry(
        id: $id,
        worksheetId: $worksheetId,
        knownLanguageText: $knownLanguageText,
        newLanguageText: $newLanguageText,
        audioUrl: $audioUrl
    ){
      id,
      knownLanguageText,
      newLanguageText,
      worksheetId,
      audioUrl
    }
}
`

const EDIT_WORKSHEET = gql`

mutation editWorksheet (
    $id: String!
    $status: String!
  ) {
    editWorksheet(
        id: $id,
        status: $status,
    ){
      id,
      status
    }
}
`

const DELETE_WORKSHEET_ENTRY = gql`
mutation DeleteWorksheetEntry (
    $id: String!
  ) {
    deleteWorksheetEntry(id: $id){
      id,
    }
}
`

type AddWorksheetEntryModalProps = {
    closeModal: () => void
    worksheet: TWorksheet
    setWorksheetEntries: React.Dispatch<React.SetStateAction<TWorksheetEntry[]>>
}

const AddWorksheetEntryModal = ({ closeModal, worksheet, setWorksheetEntries }: AddWorksheetEntryModalProps) => {
    const [audioURL, isRecording, startRecording, stopRecording, clearAudioUrl] = useRecorder()
    const [addWorksheetEntry] = useMutation<{ addWorksheetEntry: TWorksheetEntry }>(ADD_WORKSHEET_ENTRY)
    const [knownLanguageText, setKnownLanguageText] = React.useState<string>('')
    const [newLanguageText, setNewLanguageText] = React.useState<string>('')
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const { dispatch } = React.useContext(context)

    const handleSubmit = async () => {
        setIsLoading(true)
        const base64Audio = await objectUrlToBase64(audioURL)
        const newWorksheetEntry: TWorksheetEntry = {
            knownLanguageText,
            newLanguageText,
            id: uuidv4(),
            worksheetId: worksheet.id,
            audioUrl: base64Audio as string,
        }
        await addWorksheetEntry({
            variables: newWorksheetEntry,
        })
        setWorksheetEntries((prev) => ([...prev, newWorksheetEntry]))
        setKnownLanguageText('')
        setNewLanguageText('')
        clearAudioUrl()
        setIsLoading(false)
        dispatch({ type: 'ADD_MESSAGE', data: { message: 'Submitted!', timeToLiveMS: 3000 } })
    }
    const handleCancel = () => {
        closeModal()
    }

    const handleClose = () => {
        closeModal()
    }

    return (
        <div>
            <H2>New Worksheet Entry</H2>
            <div>
                <div>
                    <LabelAndInput
                        label={worksheet.knownLanguage}
                        name="fromLanguage"
                        value={knownLanguageText}
                        handleChange={(knownLanguage) => setKnownLanguageText(knownLanguage)}
                    />
                </div>

                <div>
                    <LabelAndInput
                        label={worksheet.newLanguage}
                        name="newLanguage"
                        value={newLanguageText}
                        handleChange={(newLanguage) => setNewLanguageText(newLanguage)}
                    />
                </div>

                <div>
                    <AudioRecorder
                        stopRecording={stopRecording}
                        audioURL={audioURL}
                        startRecording={startRecording}
                        isRecording={isRecording}
                    />
                </div>

                <div>
                    <Button disabled={isLoading} variation="secondary" onClick={handleSubmit}>Submit</Button>
                    <Button variation="alert" onClick={handleCancel}>Cancel</Button>
                    <Button variation="primary" onClick={handleClose}>Close</Button>
                </div>
            </div>
        </div>
    )
}

type WorksheetEntryProps = {
    worksheetEntry: TWorksheetEntry
    worksheetStatus: TWorksheetStatus
}
const WorksheetEntry = ({ worksheetEntry, worksheetStatus }: WorksheetEntryProps) => {
    const {
        id, knownLanguageText, newLanguageText, audioUrl,
    } = worksheetEntry

    const [deleteWorksheetEntry] = useMutation<{ addWorksheetEntry: TWorksheetEntry }>(DELETE_WORKSHEET_ENTRY)

    const handleDelete = async () => {
        await deleteWorksheetEntry({ variables: { id } })
    }

    const Actions: JSX.Element[] = []

    if (worksheetStatus === TWorksheetStatus.NEW) {
        Actions.push(<ActionButton onClick={handleDelete}>Delete</ActionButton>)
    }

    return (
        <TableRow key={id}>
            <TableBodyCell>{knownLanguageText}</TableBodyCell>
            <TableBodyCell>{newLanguageText}</TableBodyCell>
            <TableBodyCell><audio controls src={audioUrl} /></TableBodyCell>
            {Actions.length ? (
                <TableBodyCell>
                    {Actions}
                </TableBodyCell>
            ) : null}
        </TableRow>
    )
}

const Worksheet = () => {
    const { worksheetId } = useParams()
    const [showModal, setShowModal] = React.useState<boolean>(false)
    const [worksheet, setWorksheet] = React.useState<TWorksheet>()
    const [workssheetEntries, setWorksheetEntries] = React.useState<TWorksheetEntry[]>()
    const navigate = useNavigate()
    const [editWorksheet] = useMutation<{ editWorksheet: { status: TWorksheetStatus, id: string } }>(EDIT_WORKSHEET)
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    useQuery<{ worksheet: TWorksheet[], worksheetEntries: TWorksheetEntry[] }>(GET_WORKSHEET_AND_WORKSHEET_ENTRIES, {
        variables: {
            worksheetId
        },
        onCompleted: (data) => {
            setWorksheet(data.worksheet[0])
            setWorksheetEntries(data.worksheetEntries)
            setIsLoading(false)
        },
    })

    if (isLoading) return <Loading />

    const { title, description, date } = worksheet

    const handleSubmit = async () => {
        await editWorksheet({ variables: { status: TWorksheetStatus.NEEDS_REVIEW, id: worksheetId } })
        navigate('/student/dashboard')
    }

    return (
        <div>
            <div>
                <H2>{title}</H2>
                <Paragraph>
                    Description: {description}
                </Paragraph>
                <Paragraph>
                    Date: {utilities.dateToString(moment(date))}
                </Paragraph>
                <Button variation="secondary" onClick={() => setShowModal(true)}>Add Entry</Button>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell scope="col">{worksheet.knownLanguage}</TableHeaderCell>
                            <TableHeaderCell scope="col">{worksheet.newLanguage}</TableHeaderCell>
                            <TableHeaderCell scope="col">Recorded</TableHeaderCell>
                            {worksheet.status === TWorksheetStatus.NEW && <TableHeaderCell scope="col">Actions</TableHeaderCell>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {workssheetEntries.map((worksheetEntry) => (
                            <WorksheetEntry worksheetStatus={worksheet.status} worksheetEntry={worksheetEntry} />
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Button variation="secondary" onClick={handleSubmit}>Submit for Feedback</Button>
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Add Worksheet Entry"
            >
                <AddWorksheetEntryModal
                    setWorksheetEntries={setWorksheetEntries}
                    worksheet={worksheet}
                    closeModal={() => setShowModal(false)}
                />
            </Modal>
        </div>
    )
}

export default Worksheet
