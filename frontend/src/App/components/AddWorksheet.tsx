import React from 'react'
import moment from 'moment'
import { gql, useMutation } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'

import { Heading, Button, LabelAndInput, Divider, ButtonWrapper, LanguageDropdown } from 'sharedComponents'
import { dateToString } from 'utilities'
import { TWorksheetStatus, TWorksheet } from 'types'
import { context } from 'context'
import { useNavigate } from 'react-router'

const ADD_WORKSHEET = gql`
mutation AddWorksheet (
    $title: String!
    $description: String!,
    $id: String!
    $date: String!
    $knownLanguage: String!
    $newLanguage: String!
  ) {
    addWorksheet(
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

const AddWorksheet = () => {
    const { state, dispatch } = React.useContext(context)
    const [addWorksheet] = useMutation<{ addWorksheet: TWorksheet }>(ADD_WORKSHEET)
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState<string>('')
    const [knownLanguage, setKnownLanguage] = React.useState<string>('')
    const [newLanguage, setNewLanguage] = React.useState<string>('')
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const navigate = useNavigate()

    const handleSubmit = async () => {
        if (!title || !description || !knownLanguage || !newLanguage) {
            dispatch({ type: 'ADD_MESSAGE', data: { message: 'Please fully complete the form.' } })
            return
        }
        setIsLoading(true)

        const newWorksheet: TWorksheet = {
            date: dateToString(moment()),
            id: uuidv4(),
            description,
            title,
            knownLanguage,
            newLanguage,
            status: TWorksheetStatus.NEW,
            userId: state.currentUser.phraseADay.id,
        }
        const response = await addWorksheet({
            variables: newWorksheet,
        })
        if (response.data.addWorksheet === null) {
            dispatch({ type: 'ADD_MESSAGE', data: { message: 'Failed to submit worksheet', timeToLiveMS: 5000 } })
            setIsLoading(false)
        } else {
            setIsLoading(false)
            navigate(`/worksheet/${response.data.addWorksheet.id}`)
        }
    }

    return (
        <div>
            <Heading.H2>Add a Worksheet</Heading.H2>
            <Divider />
            <div>
                <div>
                    <LabelAndInput label="Title" name="title" value={title} handleChange={(data) => setTitle(data)} />
                </div>

                <div>
                    <LabelAndInput
                        label="Description (Optional)"
                        name="description"
                        value={description}
                        handleChange={(data) => setDescription(data)}
                    />
                </div>

                <div>
                    <LabelAndInput
                        label="Language You're Learning"
                        name="newLanguage"
                        value={newLanguage}
                        handleChange={(data) => setNewLanguage(data)}
                    />
                    {/* <LanguageDropdown label="Language You're Learning" /> */}
                </div>

                <div>
                    <LabelAndInput
                        label="Language You're Starting From"
                        name="knowLanguage"
                        value={knownLanguage}
                        handleChange={(data) => setKnownLanguage(data)}
                    />
                </div>
                <ButtonWrapper
                    right={[
                        <Button alignRight disabled={isLoading} variation="alert" onClick={() => navigate('/student/dashboard')}>Cancel</Button>,
                        <Button alignRight disabled={isLoading} variation="secondary" onClick={handleSubmit}>Submit</Button>,
                    ]}
                />
            </div>
        </div>
    )
}

export default AddWorksheet
