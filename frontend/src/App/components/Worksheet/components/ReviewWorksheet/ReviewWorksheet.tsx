import React from 'react'
import moment from 'moment'
import {
    gql,
    // useMutation,
    useQuery
} from '@apollo/client'
import {
    // useNavigate,
    useParams
} from 'react-router'

import { Loading, Button, Heading, Paragraph, Breadcrumbs } from 'sharedComponents'
import {
    dateToString,
    Exactly,
    logger,
    // objectUrlToBase64
} from 'utilities'
import {
    TPhraseADayUser,
    TReview,
    // TReviewEntry,
    TWorksheet,
    TWorksheetEntry,
    // TWorksheetStatus
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
  review(worksheetId: $worksheetId){
      id
  }

}
`

// const ADD_REVIEW = gql`
// mutation AddReview (
//     $reviewId: String!
//     $worksheetId: String!
//     $date: String!
//     $reviewEntries: [ReviewEntry]
//     $status: String!
//   ) {
//     addReview(
//         id: $reviewId,
//         worksheetId: $worksheetId,
//         date: $date,
//         reviewEntries: $reviewEntries
//         ){
//       id,
//     }
//     editWorksheet(
//         id: $worksheetId,
//         status: $status,
//     ){
//       id,
//       status
//     }
// }
// `

type ReviewState = Record<string, { oralFeedback: string, writtenFeedback: string }>

type InitialStateAction = {
    type: 'INITIAL_STATE_ACTION',
    data: Record<string, { oralFeedback: string, writtenFeedback: string }>
}

type ClearFeedbackAction = {
    type: 'CLEAR_FEEDBACK_ACTION',
    data: {
        worksheetEntryId: string
    }
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

type ReviewAction =
    | OralFeedbackAction
    | WrittenFeedbackAction
    | InitialStateAction
    | ClearFeedbackAction

const reviewReducer = (state: ReviewState, action: ReviewAction): ReviewState => {
    switch (action.type) {
        case 'INITIAL_STATE_ACTION':
            return { ...action.data }
        case 'CLEAR_FEEDBACK_ACTION': {
            const { worksheetEntryId } = action.data
            const newState = { ...state, [worksheetEntryId]: { writtenFeedback: '', oralFeedback: '' } }
            console.log(newState)
            return newState
        }
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

// const hasReviewerReviewed = (reviewState: ReviewState) => (
//     Object
//         .values(reviewState)
//         .some(({ oralFeedback, writtenFeedback }) => oralFeedback.length || writtenFeedback.length)
// )

const ReviewWorksheet = () => {
    const { dispatch } = React.useContext(context)
    const { worksheetId } = useParams()
    const [worksheet, setWorksheet] = React.useState<TWorksheet & { user: TPhraseADayUser }>()
    const [review, setReview] = React.useState<Exactly<TReview, 'id'>>()
    const [worksheetEntries, setWorksheetEntries] = React.useState<TWorksheetEntry[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [reviewState, dispatchReview] = React.useReducer(reviewReducer, {})
    const [currentWorksheetEntryIndex, setCurrentWorksheetEntryIndex] = React.useState<number>(0)
    useQuery<{ worksheet: (TWorksheet & { user: TPhraseADayUser })[], worksheetEntries: TWorksheetEntry[], review: TReview[] }>(
        GET_WORKSHEET_AND_WORKSHEET_ENTRIES, {
        variables: {
            worksheetId,
        },
        onCompleted: (data) => {
            setWorksheet(data.worksheet[0])
            setWorksheetEntries(data.worksheetEntries)
            setReview(data.review[0])
            dispatchReview({ type: 'INITIAL_STATE_ACTION', data: generateReviewState(data.worksheetEntries) })
            setIsLoading(false)
        },
        onError: (error) => {
            logger(JSON.stringify(error))
            dispatch({ type: 'HAS_ERRORED' })
        },
    })
    // const navigate = useNavigate()
    // const [addReview] = useMutation<{ addReview: TReviewEntry }>(ADD_REVIEW)

    const getNextWorksheetEntry = (direction: 'left' | 'right') => {
        const first = 0
        const last = worksheetEntries.length - 1
        let next

        if (direction === 'left') {
            next = currentWorksheetEntryIndex - 1
            if (next < first) {
                next = last
            }
        } else {
            next = currentWorksheetEntryIndex + 1
            if (next > last) {
                next = first
            }
        }
        setCurrentWorksheetEntryIndex(next)
    }

    if (isLoading) return <Loading />

    const {
        title, description, knownLanguage, newLanguage, date, user: { username },
    } = worksheet

    return (
        <div>
            <div>
                <Heading.H2><Breadcrumbs breadcrumbs={[{ to: '/reviewer/dashboard', text: 'Reviewer Dashboard' }]} /> {title} Worksheet</Heading.H2>

                <Paragraph>
                    Student: {username}
                </Paragraph>
                <Paragraph>
                    Description: {description}
                </Paragraph>
                <Paragraph>
                    Date: {dateToString(moment(date))}
                </Paragraph>
                <Paragraph>
                    From: {knownLanguage} To: {newLanguage}
                </Paragraph>
                <ReviewWorksheetEntry
                    reviewId={review.id}
                    key={worksheetEntries[currentWorksheetEntryIndex].id}
                    reviewState={reviewState}
                    dispatchReview={dispatchReview}
                    worksheetEntry={worksheetEntries[currentWorksheetEntryIndex]}
                    worksheet={worksheet}
                />
            </div>
            <Button variation="primary" disabled={isLoading} onClick={() => getNextWorksheetEntry('left')}>Previous</Button>
            <Button variation="primary" disabled={isLoading} onClick={() => getNextWorksheetEntry('right')}>Next</Button>
        </div>
    )
}

export default ReviewWorksheet
export { ReviewAction, ReviewState }
