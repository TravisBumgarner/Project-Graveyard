import React from 'react'
import styled from 'styled-components'
import {
    gql,
    useMutation,
} from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'

import { AudioRecorder, Heading, LabelAndInput, Paragraph, colors, Button, Loading } from 'sharedComponents'
import { TReviewEntry, TWorksheet, TWorksheetEntry, } from 'types'
import { objectUrlToBase64 } from 'utilities'
import { context } from 'context'
import { ReviewAction, ReviewState } from '../ReviewWorksheet'

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

// id: string
// reviewId: string
// worksheetEntryId: string
// oralFeedback: string
// writtenFeedback: string

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
    # editWorksheet(
    #     id: $worksheetId,
    #     status: $status,
    # ){
    #   id,
    #   status
    # }
}
`

type ReviewWorksheetEntryProps = {
    worksheet: TWorksheet
    worksheetEntry: TWorksheetEntry
    reviewState: ReviewState
    reviewId: string,
    dispatchReview: React.Dispatch<ReviewAction>
}

const ReviewWorksheetEntry = ({
    worksheet, worksheetEntry, reviewState, dispatchReview, reviewId
}: ReviewWorksheetEntryProps) => {
    const { id, knownLanguageText, newLanguageText } = worksheetEntry
    const [audioURL, setAudioURL] = React.useState<string>('')
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const { dispatch } = React.useContext(context)

    React.useEffect(() => {
        dispatchReview({ type: 'ORAL_FEEDBACK_ACTION', data: { worksheetEntryId: worksheetEntry.id, oralFeedback: audioURL } })
    }, [audioURL])

    const [addReviewEntry] = useMutation<{ addReviewEntry: TReviewEntry }>(ADD_REVIEW_ENTRY)

    const handleSubmit = async () => {
        setIsLoading(true)

        const base64Audio = reviewState[id].oralFeedback.length
            ? await objectUrlToBase64(reviewState[id].oralFeedback)
            : ''

        const variables = {
            id: uuidv4(),
            reviewId,
            worksheetEntryId: id,
            oralFeedback: base64Audio as string,
            writtenFeedback: reviewState[id].writtenFeedback
        }
        console.log(variables)
        const response = await addReviewEntry({
            variables,
        })

        if (response.data.addReviewEntry === null) {
            dispatch({ type: 'ADD_MESSAGE', data: { message: 'Failed to submit review entry', timeToLiveMS: 5000 } })
            setIsLoading(false)
        } else {
            setIsLoading(false)
            // navigate('/reviewer/dashboard')
        }
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
                value={reviewState[id].writtenFeedback}
                handleChange={(value) => {
                    dispatchReview({
                        type: 'WRITTEN_FEEDBACK_ACTION',
                        data: {
                            worksheetEntryId: worksheetEntry.id,
                            writtenFeedback: value
                        }
                    })
                }}
            />
            <AudioRecorder
                audioURL={audioURL}
                setAudioURL={setAudioURL}
            />
            <Button
                variation="alert"
                onClick={() => dispatchReview({ type: 'CLEAR_FEEDBACK_ACTION', data: { worksheetEntryId: worksheetEntry.id } })}
            >
                Clear Feedback
            </Button>
            <Button variation="primary" onClick={handleSubmit}>Submit Feedback</Button>
        </ReviewWorksheetEntryWrapper>
    )
}

export default ReviewWorksheetEntry
