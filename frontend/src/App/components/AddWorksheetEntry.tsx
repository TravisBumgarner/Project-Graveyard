import React from 'react'
import { useMutation, gql, useQuery } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'

import { AudioRecorder, Breadcrumbs, Button, Heading, LabelAndInput, Loading } from 'sharedComponents'
import styled from 'styled-components'
import { TWorksheet, TWorksheetEntry } from 'types'
import { context } from 'context'
import { useNavigate, useParams } from 'react-router'

const GET_WORKSHEETS = gql`
query GetWorksheets($worksheetId: String!) {
    worksheet(worksheetId: $worksheetId) {
        id,
        newLanguage,
        knownLanguage,
        title,
        description
    }
}
`

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

const objectUrlToBase64 = async (objectUrl: string) => {
    const blob = await fetch(objectUrl).then((r) => r.blob())
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(blob)
    })
}

const WrittenWrapper = styled.div`
display: flex;
flex-direction: row;

> div {
    width: 50%;
}
`

const AddWorksheetEntry = () => {
    const [addWorksheetEntry] = useMutation<{ addWorksheetEntry: TWorksheetEntry }>(ADD_WORKSHEET_ENTRY)
    const [knownLanguageText, setKnownLanguageText] = React.useState<string>('')
    const [newLanguageText, setNewLanguageText] = React.useState<string>('')
    const [worksheet, setWorksheet] = React.useState<TWorksheet>(null)
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const { dispatch } = React.useContext(context)
    const [audioURL, setAudioURL] = React.useState<string>('')
    const { worksheetId } = useParams()
    const navigate = useNavigate()

    useQuery<{ worksheet: TWorksheet[] }>(GET_WORKSHEETS, {
        variables: {
            worksheetId
        },
        onCompleted: (data) => {
            setWorksheet(data.worksheet[0])
            setIsLoading(false)
        },
    })

    const handleSubmit = async () => {
        setIsLoading(true)
        const base64Audio = audioURL.length ? await objectUrlToBase64(audioURL) : ''
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
            setKnownLanguageText('')
            setNewLanguageText('')
            setAudioURL('')
            dispatch({ type: 'ADD_MESSAGE', data: { message: 'Submitted!', timeToLiveMS: 3000 } })
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
            <Heading.H2><Breadcrumbs breadcrumbs={breadcrumbs} /> New Worksheet Entry</Heading.H2>
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

export default AddWorksheetEntry
