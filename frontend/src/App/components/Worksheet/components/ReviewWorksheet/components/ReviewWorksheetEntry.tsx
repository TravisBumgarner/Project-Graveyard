import React from 'react'
import styled from 'styled-components'
import {
    gql,
    useMutation,
    useQuery,
} from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'

import { AudioRecorder, Heading, LabelAndInput, Paragraph, colors, Button, Loading } from 'sharedComponents'
import { TReview, TReviewEntry, TWorksheet, TWorksheetEntry, } from 'types'
import { objectUrlToBase64 } from 'utilities'
import { context } from 'context'
import { consoleSandbox } from '@sentry/utils'
// import { ReviewAction, ReviewState } from '../ReviewWorksheet'

const ReviewWorksheetEntryWrapper = styled.div`
    padding: 1rem;
    background-color: ${colors.PRIMARY.lightest};  
    border-radius: 1rem;
    margin: 1rem; 
`

const WrittenTextWrapper = styled.div`
    display: flex;
    flex-direction: row;

    > div {
        width: 50%;
    }
`

const ADD_REVIEW_ENTRY = gql`
mutation AddReviewEntry (
    $id: String!
    $reviewId: String!
    $worksheetEntryId: String!
    $oralFeedback: String!
    $writtenFeedback: String!
  ) {
    addReviewEntry(
        id: $id,
        reviewId: $reviewId,
        worksheetEntryId: $worksheetEntryId,
        oralFeedback: $oralFeedback,
        writtenFeedback: $writtenFeedback
        ){
      id,
    }
}
`

const GET_WORKSHEET_ENTRY_AND_REVIEW_ENTRY = gql`
query GetWorksheetEntryAndReviewEntry (
    $worksheetEntryId: String!
    $reviewEntryId: String!
  ) {
    reviewEntry(
        id: $reviewEntryId,
        ){
      id,
    }
    worksheetEntry(
        id: $worksheetEntryId,
        ){
      id,
    }
}
`

type ReviewWorksheetEntryProps = {
    worksheet: TWorksheet
    worksheetEntry: TWorksheetEntry
    // reviewState: ReviewState
    reviewId: string,
    // dispatchReview: React.Dispatch<ReviewAction>
}

const ReviewWorksheetEntry = ({
    worksheet, worksheetEntry, reviewId
}: ReviewWorksheetEntryProps) => {
    const { id, knownLanguageText, newLanguageText } = worksheetEntry
    const [audioURL, setAudioURL] = React.useState<string>('')
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    // const { dispatch } = React.useContext(context)
    console.log(reviewId)
    React.useEffect(() => {
        console.log('new audio url', audioURL)
        // dispatchReview({ type: 'ORAL_FEEDBACK_ACTION', data: { worksheetEntryId: worksheetEntry.id, oralFeedback: audioURL } })
    }, [audioURL])

    // useQuery<{ reviewEntry: TReviewEntry[], worksheetEntry: TWorksheetEntry[] }>(GET_WORKSHEET_ENTRY_AND_REVIEW_ENTRY, {
    //     variables: {
    //         worksheetEntryId,
    //         reviewEntryId
    //     },
    //     onCompleted: (data) => {
    //         setWorksheetUserId(data.worksheet[0].user.id)
    //         setIsLoading(false)
    //     },
    //     onError: (error) => {
    //         logger(JSON.stringify(error))
    //         dispatch({ type: 'HAS_ERRORED' })
    //     },
    // })

    // const [addReviewEntry] = useMutation<{ addReviewEntry: TReviewEntry }>(ADD_REVIEW_ENTRY)

    const handleSubmit = async () => {
        setIsLoading(true)

        // const base64Audio = reviewState[id].oralFeedback.length
        //     ? await objectUrlToBase64(reviewState[id].oralFeedback)
        //     : ''

        // const variables = {
        //     id: uuidv4(),
        //     reviewId,
        //     worksheetEntryId: id,
        //     oralFeedback: base64Audio as string,
        //     writtenFeedback: reviewState[id].writtenFeedback
        // }
        // console.log(variables)
        // const response = await addReviewEntry({
        //     variables,
        // })
        console.log('done')
        setIsLoading(false)
        // if (response.data.addReviewEntry === null) {
        //     dispatch({ type: 'ADD_MESSAGE', data: { message: 'Failed to submit review entry', timeToLiveMS: 5000 } })
        //     setIsLoading(false)
        // } else {
        //     setIsLoading(false)
        //     // navigate('/reviewer/dashboard')
        // }
    }

    if (isLoading) return <Loading />

    return (
        <ReviewWorksheetEntryWrapper key={id} style={{ border: '5px solid white' }}>
            <Heading.H3>Entry</Heading.H3>
            <WrittenTextWrapper>
                <div>
                    <Heading.H4> Written {worksheet.knownLanguage}</Heading.H4>
                    <Paragraph>{knownLanguageText}</Paragraph>
                </div>
                <div>
                    <Heading.H4> Written {worksheet.newLanguage}</Heading.H4>
                    <Paragraph>{newLanguageText}</Paragraph>
                </div>
            </WrittenTextWrapper>

            <Heading.H4>Recorded {worksheet.newLanguage}</Heading.H4>
            <audio style={{ width: '100%' }} controls src={worksheetEntry.audioUrl} />
            <LabelAndInput
                type="textarea"
                name="writtenFeedback"
                label="Written Feedback"
                value="Fake written feedback"
                handleChange={(value) => {
                    console.log(value)
                    // dispatchReview({
                    //     type: 'WRITTEN_FEEDBACK_ACTION',
                    //     data: {
                    //         worksheetEntryId: worksheetEntry.id,
                    //         writtenFeedback: value
                    //     }
                    // })
                }}
            />
            <AudioRecorder
                audioURL={audioURL}
                setAudioURL={setAudioURL}
            />
            <Button
                variation="alert"
                onClick={() => console.log('clearing data')}
            >
                Clear Feedback
            </Button>
            <Button variation="primary" onClick={handleSubmit}>Submit Feedback</Button>
        </ReviewWorksheetEntryWrapper>
    )
}

export default ReviewWorksheetEntry
