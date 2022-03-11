import React from 'react'
import moment from 'moment'
import { gql, useMutation, useQuery } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import { useParams } from 'react-router'

import { Loading, Button, Heading, Paragraph, Breadcrumbs } from 'sharedComponents'
import { dateToString } from 'utilities'
import {
    TPhraseADayUser, TStudentReview, TWorksheet, TWorksheetEntry, TWorksheetStatus
} from 'types'
import { context } from 'context'
import { ReviewWorksheetEntry } from './components'

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

type ReviewState = Record<string, { oralFeedback: string, writtenFeedback: string }>

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

type ReviewAction = OralFeedbackAction | WrittenFeedbackAction | InitialStateAction
const reviewReducer = (state: ReviewState, action: ReviewAction): ReviewState => {
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

const hasReviewerReviewed = (reviewState: ReviewState) => (
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
    const [addReview] = useMutation<{ addReview: TStudentReview }>(ADD_REVIEW)

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
                <Heading.H2><Breadcrumbs breadcrumbs={[{ to: '/reviewer/dashboard', text: 'Reviewer Dashboard' }]} /> {title} Worksheet</Heading.H2>

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
                    {dateToString(moment(date))}
                </Paragraph>
                <Paragraph>
                    {' '}
                    From:
                    {knownLanguage}
                    {' '}
                    To:
                    {newLanguage}
                </Paragraph>
                {/* <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell width="5%" scope="col">{worksheet.knownLanguage}</TableHeaderCell>
                            <TableHeaderCell width="5%" scope="col">{worksheet.newLanguage}</TableHeaderCell>
                            <TableHeaderCell style={{ textAlign: 'center' }} width="5%" scope="col">Recorded</TableHeaderCell>
                            <TableHeaderCell width="5%" scope="col">Written Feedback</TableHeaderCell>
                            <TableHeaderCell style={{ textAlign: 'center' }} width="5%" scope="col">Oral Feedback</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody> */}
                {worksheetEntries.map((worksheetEntry) => (
                    <ReviewWorksheetEntry
                        key={worksheetEntry.id}
                        reviewState={reviewState}
                        dispatchReview={dispatchReview}
                        worksheetEntry={worksheetEntry}
                        worksheet={worksheet}
                    />
                ))}
                {/* </TableBody>
                </Table> */}
            </div>
            <Button variation="primary" disabled={isLoading || !hasReviewerReviewed(reviewState)} onClick={handleSubmit}>Submit Feedback</Button>
        </div>
    )
}

export default ReviewWorksheet
export { ReviewAction, ReviewState }
