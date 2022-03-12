import React from 'react'
import { useMutation, gql, useQuery } from '@apollo/client'

import { AudioRecorder, Breadcrumbs, Button, Heading, LabelAndInput, Loading } from 'sharedComponents'
import styled from 'styled-components'
import { TWorksheet, TWorksheetEntry } from 'types'
import { context } from 'context'
import { useNavigate, useParams } from 'react-router'
import { objectUrlToBase64 } from 'utilities'

const GET_WORKSHEET_AND_WORKSHEET_ENTRIES = gql`
query GetWorksheets(
    $id: String,
    $worksheetId: String
    ) {
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
  worksheetEntries(id: $id) {
   id,
   knownLanguageText,
   newLanguageText,
   audioUrl, 
  }

}
`

const EDIT_WORKSHEET_ENTRY = gql`

mutation EditWorksheetEntry (
    $knownLanguageText: String!
    $newLanguageText: String!
    $id: String!
    $worksheetId: String!
    $audioUrl: String
  ) {
    editWorksheetEntry(
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

const WrittenWrapper = styled.div`
display: flex;
flex-direction: row;

> div {
    width: 50%;
}
`

const EditWorksheetEntry = () => {
    const [editWorksheetEntry] = useMutation<{ editWorksheetEntry: TWorksheetEntry }>(EDIT_WORKSHEET_ENTRY)
    const [knownLanguageText, setKnownLanguageText] = React.useState<string>('')
    const [id, setId] = React.useState<string>('')
    const [newLanguageText, setNewLanguageText] = React.useState<string>('')
    const [worksheet, setWorksheet] = React.useState<TWorksheet>(null)
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const { dispatch } = React.useContext(context)
    const [audioURL, setAudioURL] = React.useState<string>('')
    const { worksheetId, worksheetEntryId } = useParams()
    const navigate = useNavigate()

    useQuery<{ worksheet: TWorksheet[], worksheetEntries: TWorksheetEntry[] }>(GET_WORKSHEET_AND_WORKSHEET_ENTRIES, {
        variables: {
            worksheetId,
            id: worksheetEntryId
        },
        onCompleted: (data) => {
            setWorksheet(data.worksheet[0])
            setKnownLanguageText(data.worksheetEntries[0].knownLanguageText)
            setNewLanguageText(data.worksheetEntries[0].newLanguageText)
            setAudioURL(data.worksheetEntries[0].audioUrl)
            setId(data.worksheetEntries[0].id)
            setIsLoading(false)
        },
    })

    const handleSubmit = async () => {
        setIsLoading(true)
        const editedWorksheetEntry: Partial<TWorksheetEntry> = {
            knownLanguageText,
            newLanguageText,
            id,
            worksheetId: worksheet.id,
        }
        if (audioURL.slice(0, 4) === 'blob') {
            editedWorksheetEntry.audioUrl = await objectUrlToBase64(audioURL) as string
        }
        const response = await editWorksheetEntry({
            variables: editedWorksheetEntry,
        })

        if (response.data.editWorksheetEntry === null) {
            dispatch({ type: 'ADD_MESSAGE', data: { message: 'Failed to submit worksheet entry', timeToLiveMS: 5000 } })
        } else {
            setKnownLanguageText('')
            setNewLanguageText('')
            setAudioURL('')
            dispatch({ type: 'ADD_MESSAGE', data: { message: 'Submitted!', timeToLiveMS: 3000 } })
            navigate(`/worksheet/${worksheetId}`)
        }
        setIsLoading(false)
    }

    const handleClose = () => {
        navigate(`/worksheet/${worksheetId}`)
    }

    if (isLoading) return <Loading />
    const breadcrumbs = [
        { text: 'User Dashboard', to: '/student/dashboard' },
        { text: 'Worksheet', to: `/worksheet/${worksheetId}` },
    ]
    return (
        <div>
            <Heading.H2><Breadcrumbs breadcrumbs={breadcrumbs} /> Edit Worksheet Entry</Heading.H2>
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
                        audioURL={audioURL}
                        setAudioURL={setAudioURL}
                    />
                </div>

                <div>
                    <Button disabled={isLoading} variation="secondary" onClick={handleSubmit}>Submit</Button>
                    <Button disabled={isLoading} variation="primary" onClick={handleClose}>Close</Button>
                </div>
            </div>
        </div>
    )
}

export default EditWorksheetEntry
