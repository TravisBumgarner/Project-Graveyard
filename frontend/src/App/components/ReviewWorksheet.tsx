import React from 'react'
import moment from 'moment'
import { gql, useMutation, useQuery } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import { useParams } from 'react-router'

import { Loading } from 'sharedComponents'
import { context } from '.'
import { TPhraseADayUser, TWorksheet, TWorksheetEntry } from '../types'
import utilities from '../utilities'
import { useRecorder } from '../hooks'
import {
    Button, H2, Input, Paragraph, Table, TableBody, TableBodyCell, TableHeader, TableHeaderCell, TableRow,
} from './StyleExploration'

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

const ADD_REVIEW = gql`
mutation AddReview (
    $id: String!
    $worksheetId: String!
    $date: String!
    $reviewEntries: [ReviewEntry]
  ) {
    addReview(
        id: $id,
        worksheetId: $worksheetId,
        date: $date,
        reviewEntries: $reviewEntries
        ){
      id,
    }
}
`

type WorksheetReviewEntryProps = {
    worksheetEntry: TWorksheetEntry
    reviewState: any
    dispatchReview: any
}
const WorksheetReviewEntry = ({ worksheetEntry, reviewState, dispatchReview }: WorksheetReviewEntryProps) => {
    const { id, knownLanguageText, newLanguageText } = worksheetEntry
    const [audioURL, isRecording, startRecording, stopRecording] = useRecorder()

    React.useEffect(() => {
        dispatchReview({ type: 'ORAL_FEEDBACK_ACTION', data: { worksheetEntryId: worksheetEntry.id, oralFeedback: audioURL } })
    }, [audioURL])
    return (
        <TableRow key={id}>
            <TableBodyCell>{knownLanguageText}</TableBodyCell>
            <TableBodyCell>{newLanguageText}</TableBodyCell>
            <TableBodyCell><audio controls src={worksheetEntry.audioUrl} /></TableBodyCell>
            <TableBodyCell>
                <Input
                    value={reviewState[worksheetEntry.id].writtenFeedback}
                    onChange={(event) => {
                        dispatchReview({
                            type: 'WRITTEN_FEEDBACK_ACTION',
                            data: {
                                worksheetEntryId: worksheetEntry.id,
                                writtenFeedback: event.target.value
                            }
                        })
                    }}
                />
            </TableBodyCell>
            <TableBodyCell>
                <audio src={reviewState[worksheetEntry.id].oralFeedback} controls />
                <div>
                    <Button variation="primary" onClick={startRecording} disabled={isRecording}>
                        Record
                    </Button>
                    <Button variation="primary" onClick={stopRecording} disabled={!isRecording}>
                        Stop
                    </Button>
                </div>
            </TableBodyCell>
        </TableRow>
    )
}

type State = Record<string, { oralFeedback: string, writtenFeedback: string }>

type OralFeedbackAction = {
    type: 'ORAL_FEEDBACK_ACTION',
    data: {
        oralFeedback: string
        worksheetEntryId: string
    }
}

type WrittenFeedbackAction = {
    type: 'WRITTEN_FEEDBACK_ACTION',
    data: {
        writtenFeedback: string
        worksheetEntryId: string
    }
}

const reviewReducer = (state: State, action: OralFeedbackAction | WrittenFeedbackAction): State => {
    const { worksheetEntryId } = action.data
    switch (action.type) {
        case 'ORAL_FEEDBACK_ACTION': {
            const { oralFeedback } = action.data
            return { ...state, [worksheetEntryId]: { ...state[worksheetEntryId], oralFeedback } }
        }
        case 'WRITTEN_FEEDBACK_ACTION': {
            const { writtenFeedback } = action.data
            return { ...state, [worksheetEntryId]: { ...state[worksheetEntryId], writtenFeedback } }
        }
    }
}

const ReviewWorksheet = () => {
    const { worksheetId } = useParams()
    const { state } = React.useContext(context)
    const filteredWorksheetEntries = Object.values(state.worksheetEntries).filter((entry) => entry.worksheetId === worksheetId)
    const [worksheet, setWorksheet] = React.useState<TWorksheet & { user: TPhraseADayUser }>()
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    useQuery<{ worksheet: (TWorksheet & { user: TPhraseADayUser })[] }>(GET_WORKSHEET, {
        variables: {
            worksheetId,
        },
        onCompleted: (data) => {
            setWorksheet(data.worksheet[0])
            setIsLoading(false)
        },
    })

    if (isLoading) return <Loading />
    const {
        title, description, knownLanguage, newLanguage, date, user: { username },
    } = worksheet

    const [reviewState, dispatchReview] = React.useReducer(reviewReducer, filteredWorksheetEntries.reduce((accum, { id }) => {
        accum[id] = { // eslint-disable-line
            writtenFeedback: '',
            oralFeedback: '',
        }
        return accum
    }, {} as Record<string, { oralFeedback: string, writtenFeedback: string }>))
    const [addReview] = useMutation<any>(ADD_REVIEW)
    const handleSubmit = async () => {
        const variables = {
            date: moment(),
            id: uuidv4(),
            worksheetId,
            reviewEntries: Object.keys(reviewState).map((worksheetEntryId) => ({
                id: uuidv4(),
                worksheetEntryId,
                ...reviewState[worksheetEntryId],
            })),
        }
        await addReview({
            variables,
        })
    }
    return (
        <div>
            <div style={{ border: '1px solid black', padding: '10px' }}>
                <H2>{title}</H2>
                <Paragraph>
                    {' '}
                    Student:
                    {username}
                </Paragraph>
                <Paragraph>
                    {' '}
                    Description:
                    {description}
                </Paragraph>
                <Paragraph>
                    {' '}
                    Date:
                    {utilities.dateToString(moment(date))}
                </Paragraph>
                <Paragraph>
                    {' '}
                    From:
                    {knownLanguage}
                    {' '}
                    To:
                    {newLanguage}
                </Paragraph>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell scope="col">{worksheet.knownLanguage}</TableHeaderCell>
                            <TableHeaderCell scope="col">{worksheet.newLanguage}</TableHeaderCell>
                            <TableHeaderCell scope="col">Recorded</TableHeaderCell>
                            <TableHeaderCell scope="col">Written Feedback</TableHeaderCell>
                            <TableHeaderCell scope="col">Oral Feedback</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredWorksheetEntries.map((worksheetEntry) => (
                            <WorksheetReviewEntry
                                reviewState={reviewState}
                                dispatchReview={dispatchReview}
                                worksheetEntry={worksheetEntry}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Button variation="primary" onClick={handleSubmit}>Submit Feedback</Button>
        </div>
    )
}

export default ReviewWorksheet
