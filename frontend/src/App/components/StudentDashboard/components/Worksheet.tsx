import React from 'react'
import moment from 'moment'
import Modal from 'react-modal'
import { gql, useMutation, useQuery } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate, useParams } from 'react-router'

import styled from 'styled-components'
import { Loading } from 'sharedComponents'
import { TWorksheet, TWorksheetEntry } from '../../../types'
import utilities from '../../../utilities'
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
}

const AddWorksheetEntryModal = ({ closeModal, worksheet }: AddWorksheetEntryModalProps) => {
    const [audioURL, isRecording, startRecording, stopRecording, clearAudioUrl] = useRecorder()
    const [addWorksheetEntry] = useMutation<{ addWorksheetEntry: TWorksheetEntry }>(ADD_WORKSHEET_ENTRY)
    const [knownLanguageText, setKnownLanguageText] = React.useState<string>('')
    const [newLanguageText, setNewLanguageText] = React.useState<string>('')
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const handleSubmit = async () => {
        setIsLoading(true)
        const base64Audio = await objectUrlToBase64(audioURL)
        await addWorksheetEntry({
            variables: {
                knownLanguageText,
                newLanguageText,
                id: uuidv4(),
                worksheetId: worksheet.id,
                audioUrl: base64Audio,

            },
        })
        setKnownLanguageText('')
        setNewLanguageText('')
        clearAudioUrl()
        setIsLoading(false)
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

                <audio src={audioURL} controls />
                <div>
                    <Button variation="primary" onClick={startRecording} disabled={isRecording}>
                        Record
                    </Button>
                    <Button variation="primary" onClick={stopRecording} disabled={!isRecording}>
                        Stop
                    </Button>
                </div>

                <div>
                    <Button disabled={isLoading} variation="primary" onClick={handleSubmit}>Submit</Button>
                    <Button variation="primary" onClick={handleCancel}>Cancel</Button>
                    <Button variation="primary" onClick={handleClose}>Close</Button>
                </div>
            </div>
        </div>
    )
}

type WorksheetEntryProps = {
    worksheetEntry: TWorksheetEntry
}
const WorksheetEntry = ({ worksheetEntry }: WorksheetEntryProps) => {
    const {
        id, knownLanguageText, newLanguageText, audioUrl,
    } = worksheetEntry

    const [deleteWorksheetEntry] = useMutation<{ addWorksheetEntry: TWorksheetEntry }>(DELETE_WORKSHEET_ENTRY)

    const handleDelete = async () => {
        await deleteWorksheetEntry({ variables: { id } })
    }

    return (
        <TableRow key={id}>
            <TableBodyCell>{knownLanguageText}</TableBodyCell>
            <TableBodyCell>{newLanguageText}</TableBodyCell>
            <TableBodyCell><audio controls src={audioUrl} /></TableBodyCell>
            <TableBodyCell>

                <ActionButton onClick={handleDelete}>Delete</ActionButton>
            </TableBodyCell>
        </TableRow>
    )
}

const Worksheet = () => {
    const { worksheetId } = useParams()
    const [showModal, setShowModal] = React.useState<boolean>(false)
    const [worksheet, setWorksheet] = React.useState<TWorksheet>()
    const [workssheetEntries, setWorksheetEntries] = React.useState<TWorksheetEntry[]>()
    const navigate = useNavigate()

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
                        {workssheetEntries.map((worksheetEntry) => <WorksheetEntry worksheetEntry={worksheetEntry} />)}
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
        </div>
    )
}

export default Worksheet
