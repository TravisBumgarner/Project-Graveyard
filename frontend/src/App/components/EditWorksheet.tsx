import React from 'react'
import moment from 'moment'
import { gql, useMutation, useQuery } from '@apollo/client'

import { Heading, Button, LabelAndInput, Loading, } from 'sharedComponents'
import { dateToString } from 'utilities'
import { TWorksheetStatus, TWorksheet } from 'types'
import { context } from 'context'
import { useNavigate, useParams } from 'react-router'

const GET_WORKSHEETS = gql`
query GetWorksheets($worksheetId: String!) {
    worksheet(worksheetId: $worksheetId) {
       title,
       description,
       id,
       date,
       knownLanguage,
       newLanguage
    }
}
`

const EDIT_WORKSHEET = gql`
mutation editWorksheet (
    $title: String!
    $description: String!,
    $id: String!
    $date: String!
    $knownLanguage: String!
    $newLanguage: String!
  ) {
    editWorksheet(
        id: $id,
        title: $title,
        description: $description,
        date: $date,
        knownLanguage: $knownLanguage,
        newLanguage: $newLanguage,
        status: "${TWorksheetStatus.NEW}"){
      id
    }
}
`

const EditWorksheet = () => {
    const { state, dispatch } = React.useContext(context)
    const [editWorksheet] = useMutation<{ editWorksheet: TWorksheet }>(EDIT_WORKSHEET)
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState<string>('')
    const [knownLanguage, setknownLanguage] = React.useState<string>('')
    const [newLanguage, setnewLanguage] = React.useState<string>('')
    const [id, setId] = React.useState<string>('')
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const navigate = useNavigate()
    const { worksheetId } = useParams()

    useQuery<{ worksheet: TWorksheet[] }>(GET_WORKSHEETS, {
        variables: {
            worksheetId
        },
        onCompleted: (data) => {
            setTitle(data.worksheet[0].title)
            setDescription(data.worksheet[0].description)
            setknownLanguage(data.worksheet[0].knownLanguage)
            setnewLanguage(data.worksheet[0].newLanguage)
            setnewLanguage(data.worksheet[0].newLanguage)
            setId(data.worksheet[0].id)
            setIsLoading(false)
        },
    })

    const handleSubmit = async () => {
        if (!title || !description || !knownLanguage || !newLanguage) {
            dispatch({ type: 'ADD_MESSAGE', data: { message: 'Please fully complete the form.' } })
            return
        }
        setIsLoading(true)

        const editedWorksheet: TWorksheet = {
            date: dateToString(moment()),
            id,
            description,
            title,
            knownLanguage,
            newLanguage,
            status: TWorksheetStatus.NEW,
            userId: state.currentUser.phraseADay.id,
        }
        const response = await editWorksheet({
            variables: editedWorksheet,
        })
        if (response.data.editWorksheet === null) {
            dispatch({ type: 'ADD_MESSAGE', data: { message: 'Failed to edit worksheet', timeToLiveMS: 5000 } })
            setIsLoading(false)
        } else {
            setIsLoading(false)
            navigate('/student/dashboard')
        }
    }

    if (isLoading) return <Loading />

    return (
        <div>
            <Heading.H2>Worksheets</Heading.H2>
            <div>
                <div>
                    <LabelAndInput label="Title" name="title" value={title} handleChange={(data) => setTitle(data)} />
                </div>

                <div>
                    <LabelAndInput
                        label="Description"
                        name="description"
                        value={description}
                        handleChange={(data) => setDescription(data)}
                    />
                </div>

                <div>
                    <LabelAndInput
                        label="Language you're learning:"
                        name="newLanguage"
                        value={newLanguage}
                        handleChange={(data) => setnewLanguage(data)}
                    />
                </div>

                <div>
                    <LabelAndInput
                        label="Language your'e starting from:"
                        name="knowLanguage"
                        value={knownLanguage}
                        handleChange={(data) => setknownLanguage(data)}
                    />
                </div>
                <Button disabled={isLoading} variation="secondary" onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    )
}

export default EditWorksheet
