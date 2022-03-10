import React from 'react'
import moment from 'moment'
import { gql, useMutation, useQuery } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import { useParams } from 'react-router'

import { Loading } from 'sharedComponents'
import {
    TPhraseADayUser, TWorksheet, TWorksheetEntry, TWorksheetStatus
} from '../../../types'
import utilities from '../../../utilities'
import { useRecorder } from '../../../hooks'
import {
    Button, H2, Input, Paragraph, Table, TableBody, TableBodyCell, TableHeader, TableHeaderCell, TableRow,
} from '../../StyleExploration'
import { context } from '../../Context'

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

const ADD_REVIEW = gql`
mutation AddReview (
    $reviewId: String!
    $worksheetId: String!
    $date: String!
    $reviewEntries: [ReviewEntry]
    $status: String!
  ) {
    addReview(
        id: $reviewId,
        worksheetId: $worksheetId,
        date: $date,
        reviewEntries: $reviewEntries
        ){
      id,
    }
    editWorksheet(
        id: $worksheetId,
        status: $status,
    ){
      id,
      status
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
                    value={reviewState[id].writtenFeedback}
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

type InitialStateAction = {
    type: 'INITIAL_STATE_ACTION',
    data: Record<string, { oralFeedback: string, writtenFeedback: string }>
}

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

const reviewReducer = (state: State, action: OralFeedbackAction | WrittenFeedbackAction | InitialStateAction): State => {
    switch (action.type) {
        case 'INITIAL_STATE_ACTION':
            return { ...action.data }
        case 'ORAL_FEEDBACK_ACTION': {
            const { worksheetEntryId } = action.data
            const { oralFeedback } = action.data
            return { ...state, [worksheetEntryId]: { ...state[worksheetEntryId], oralFeedback } }
        }
        case 'WRITTEN_FEEDBACK_ACTION': {
            const { worksheetEntryId } = action.data
            const { writtenFeedback } = action.data
            return { ...state, [worksheetEntryId]: { ...state[worksheetEntryId], writtenFeedback } }
        }
    }
}

const generateReviewState = (worksheetEntries: TWorksheetEntry[]) => worksheetEntries.reduce((accum, { id }) => {
    accum[id] = { // eslint-disable-line
        writtenFeedback: '',
        oralFeedback: '',
    }
    return accum
}, {} as Record<string, { oralFeedback: string, writtenFeedback: string }>)

const hasReviewerReviewed = (reviewState: State) => (
    Object
        .values(reviewState)
        .some(({ oralFeedback, writtenFeedback }) => oralFeedback.length || writtenFeedback.length)
)

const ReviewWorksheet = () => {
    const { dispatch } = React.useContext(context)
    const { worksheetId } = useParams()
    const [worksheet, setWorksheet] = React.useState<TWorksheet & { user: TPhraseADayUser }>()
    const [worksheetEntries, setWorksheetEntries] = React.useState<TWorksheetEntry[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [reviewState, dispatchReview] = React.useReducer(reviewReducer, {})

    useQuery<{ worksheet: (TWorksheet & { user: TPhraseADayUser })[], worksheetEntries: TWorksheetEntry[] }>(GET_WORKSHEET_AND_WORKSHEET_ENTRIES, {
        variables: {
            worksheetId,
        },
        onCompleted: (data) => {
            setWorksheet(data.worksheet[0])
            setWorksheetEntries(data.worksheetEntries)
            dispatchReview({ type: 'INITIAL_STATE_ACTION', data: generateReviewState(data.worksheetEntries) })
            setIsLoading(false)
        },
    })
    const [addReview] = useMutation<any>(ADD_REVIEW)

    if (isLoading) return <Loading />

    const {
        title, description, knownLanguage, newLanguage, date, user: { username },
    } = worksheet

    const handleSubmit = async () => {
        setIsLoading(true)

        const variables = {
            date: moment(),
            reviewId: uuidv4(),
            worksheetId,
            reviewEntries: Object.keys(reviewState).map((worksheetEntryId) => ({
                id: uuidv4(),
                worksheetEntryId,
                ...reviewState[worksheetEntryId],
            })),
            status: TWorksheetStatus.HAS_REVIEWS
        }
        const response = await addReview({
            variables,
        })

        if (response.data.addReview === null) {
            dispatch({ type: 'ADD_MESSAGE', data: { message: 'Failed to submit review', timeToLiveMS: 5000 } })
        }

        setIsLoading(false)
    }

    return (
        <div>
            <div>
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
                            <TableHeaderCell width="5%" scope="col">{worksheet.knownLanguage}</TableHeaderCell>
                            <TableHeaderCell width="5%" scope="col">{worksheet.newLanguage}</TableHeaderCell>
                            <TableHeaderCell style={{ textAlign: 'center' }} width="5%" scope="col">Recorded</TableHeaderCell>
                            <TableHeaderCell width="5%" scope="col">Written Feedback</TableHeaderCell>
                            <TableHeaderCell style={{ textAlign: 'center' }} width="5%" scope="col">Oral Feedback</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {worksheetEntries.map((worksheetEntry) => (
                            <WorksheetReviewEntry
                                key={worksheetEntry.id}
                                reviewState={reviewState}
                                dispatchReview={dispatchReview}
                                worksheetEntry={worksheetEntry}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Button variation="primary" disabled={isLoading || !hasReviewerReviewed(reviewState)} onClick={handleSubmit}>Submit Feedback</Button>
        </div>
    )
}

export default ReviewWorksheet
