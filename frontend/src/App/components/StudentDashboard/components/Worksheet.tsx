import React from 'react'
import moment from 'moment'
import { gql, useMutation, useQuery } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate, useParams } from 'react-router'

import { Loading, AudioRecorder, Modal, Button, Heading, LabelAndInput, Paragraph, Table } from 'sharedComponents'
import styled from 'styled-components'
import { TWorksheet, TWorksheetEntry, TWorksheetStatus } from '../../../types'
import utilities from '../../../utilities'
import { context } from '../../Context'
import { useRecorder } from '../../../hooks'

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

const WrittenWrapper = styled.div`
    display: flex;
    flex-direction: row;

    > div {
        width: 50%;
    }
`

type AddWorksheetEntryModalProps = {
    closeModal: () => void
    worksheet: TWorksheet
    setWorksheetEntries: React.Dispatch<React.SetStateAction<TWorksheetEntry[]>>
}

const AddWorksheetEntryModal = ({ closeModal, worksheet, setWorksheetEntries }: AddWorksheetEntryModalProps) => {
    const [audioURL, setAudioURL, isRecording, startRecording, stopRecording, clearAudioUrl] = useRecorder()
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
        const response = await addWorksheetEntry({
            variables: newWorksheetEntry,
        })

        if (response.data.addWorksheetEntry === null) {
            dispatch({ type: 'ADD_MESSAGE', data: { message: 'Failed to submit worksheet entry', timeToLiveMS: 5000 } })
        } else {
            setWorksheetEntries((prev) => ([...prev, newWorksheetEntry]))
            setKnownLanguageText('')
            setNewLanguageText('')
            clearAudioUrl()
            dispatch({ type: 'ADD_MESSAGE', data: { message: 'Submitted!', timeToLiveMS: 3000 } })
        }
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
            <Heading.H2>New Worksheet Entry</Heading.H2>
            <div>
                <WrittenWrapper>
                    <LabelAndInput
                        label={worksheet.knownLanguage}
                        name="fromLanguage"
                        value={knownLanguageText}
                        handleChange={(knownLanguage) => setKnownLanguageText(knownLanguage)}
                        type="textarea"
                    />
                    <LabelAndInput
                        label={worksheet.newLanguage}
                        name="newLanguage"
                        value={newLanguageText}
                        handleChange={(newLanguage) => setNewLanguageText(newLanguage)}
                        type="textarea"
                    />
                </WrittenWrapper>

                <div>
                    <AudioRecorder
                        stopRecording={stopRecording}
                        audioURL={audioURL}
                        startRecording={startRecording}
                        isRecording={isRecording}
                        clearAudioURL={() => setAudioURL('')}
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
    worksheetEntries: TWorksheetEntry[]
    setWorksheetEntries: React.Dispatch<React.SetStateAction<TWorksheetEntry[]>>
}
const WorksheetEntry = ({
    worksheetEntry, worksheetStatus, worksheetEntries, setWorksheetEntries
}: WorksheetEntryProps) => {
    const {
        id, knownLanguageText, newLanguageText, audioUrl,
    } = worksheetEntry

    const [deleteWorksheetEntry] = useMutation<{ addWorksheetEntry: TWorksheetEntry }>(DELETE_WORKSHEET_ENTRY)

    const handleDelete = async () => {
        const modifiedWorksheetEntries = worksheetEntries.filter((worksheet) => worksheet.id !== id)

        await deleteWorksheetEntry({ variables: { id } })
        setWorksheetEntries(modifiedWorksheetEntries)
    }

    const Actions: JSX.Element[] = []

    if (worksheetStatus === TWorksheetStatus.NEW) {
        Actions.push(<Button key="delete" variation="secondary" onClick={handleDelete}>Delete</Button>)
    }

    return (
        <Table.TableRow key={id}>
            <Table.TableBodyCell>{knownLanguageText}</Table.TableBodyCell>
            <Table.TableBodyCell>{newLanguageText}</Table.TableBodyCell>
            <Table.TableBodyCell><audio controls src={audioUrl} /></Table.TableBodyCell>
            {Actions.length ? (
                <Table.TableBodyCell>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {Actions}
                    </div>
                </Table.TableBodyCell>
            ) : null}
        </Table.TableRow>
    )
}

const Worksheet = () => {
    const { worksheetId } = useParams()
    const [showModal, setShowModal] = React.useState<boolean>(false)
    const [worksheet, setWorksheet] = React.useState<TWorksheet>()
    const [worksheetEntries, setWorksheetEntries] = React.useState<TWorksheetEntry[]>()
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
                <Heading.H2><Button variation="primary" onClick={() => navigate(-1)}>User Dashboard</Button> {'>'} {title} Worksheet</Heading.H2>
                <Paragraph>
                    Description: {description}
                </Paragraph>
                <Paragraph>
                    Date: {utilities.dateToString(moment(date))}
                </Paragraph>
                <Button variation="secondary" onClick={() => setShowModal(true)}>Add Entries</Button>
                <Table.Table>
                    <Table.TableHeader>
                        <Table.TableRow>
                            <Table.TableHeaderCell width="35%" scope="col">{worksheet.knownLanguage}</Table.TableHeaderCell>
                            <Table.TableHeaderCell width="35%" scope="col">{worksheet.newLanguage}</Table.TableHeaderCell>
                            <Table.TableHeaderCell width="20%" scope="col" style={{ textAlign: 'center' }}>Recorded</Table.TableHeaderCell>
                            {worksheet.status === TWorksheetStatus.NEW
                                ? (<Table.TableHeaderCell style={{ textAlign: 'center' }} width="10%" scope="col">Actions</Table.TableHeaderCell>)
                                : null}
                        </Table.TableRow>
                    </Table.TableHeader>
                    <Table.TableBody>
                        {worksheetEntries.map((worksheetEntry) => (
                            <WorksheetEntry
                                worksheetEntries={worksheetEntries}
                                setWorksheetEntries={setWorksheetEntries}
                                key={worksheetEntry.id}
                                worksheetStatus={worksheet.status}
                                worksheetEntry={worksheetEntry}
                            />
                        ))}
                    </Table.TableBody>
                </Table.Table>
            </div>
            <Button disabled={worksheetEntries.length === 0} variation="secondary" onClick={handleSubmit}>Submit for Feedback</Button>
            <Modal
                showModal={showModal}
                closeModal={() => setShowModal(false)}
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
