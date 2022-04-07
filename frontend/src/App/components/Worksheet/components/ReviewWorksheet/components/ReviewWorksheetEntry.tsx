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
import { objectUrlToBase64, logger } from 'utilities'
import { context } from 'context'

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
  ) {
    reviewEntries(
        worksheetEntryId: $worksheetEntryId,
        ){
      id,
      writtenFeedback,
      oralFeedback,
    }
    worksheetEntries(
        id: $worksheetEntryId,
        ){
      id,
      knownLanguageText,
      newLanguageText,
      audioUrl

    }
}
`

type ReviewWorksheetEntryProps = {
    worksheet: TWorksheet
    worksheetEntryId: string
    review: TReview
}

const ReviewWorksheetEntry = ({
    worksheet, worksheetEntryId, review
}: ReviewWorksheetEntryProps) => {
    const [audioUrl, setAudioUrl] = React.useState<string>('')
    const [writtenFeedback, setWrittenFeedback] = React.useState<string>('')
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [reviewEntry, setReviewEntry] = React.useState<TReviewEntry>(null)
    const [worksheetEntry, setWorksheetEntry] = React.useState<TWorksheetEntry>(null)

    const { dispatch } = React.useContext(context)

    // React.useEffect(() => {
    //     setIsLoading(true)
    // }, [worksheetEntryId])

    useQuery<{ reviewEntries: TReviewEntry[], worksheetEntries: TWorksheetEntry[] }>(GET_WORKSHEET_ENTRY_AND_REVIEW_ENTRY, {
        variables: {
            worksheetEntryId,
        },
        fetchPolicy: 'no-cache',
        onCompleted: (data) => {
            setWorksheetEntry(data.worksheetEntries[0])
            if (data.reviewEntries[0]) {
                setReviewEntry(data.reviewEntries[0])
            } else {
                setReviewEntry({
                    id: uuidv4(),
                    reviewId: review.id,
                    writtenFeedback: '',
                    oralFeedback: '',
                })
            }
            setIsLoading(false)
        },
        onError: (error) => {
            logger(JSON.stringify(error))
            dispatch({ type: 'HAS_ERRORED' })
        },
    })

    const [addReviewEntry] = useMutation<{ addReviewEntry: TReviewEntry }>(ADD_REVIEW_ENTRY)

    const handleSubmit = async () => {
        setIsLoading(true)

        const base64Audio = audioUrl.length
            ? await objectUrlToBase64(audioUrl)
            : ''

        const variables = {
            id: uuidv4(),
            reviewId: review.id,
            worksheetEntryId: worksheetEntry.id,
            oralFeedback: base64Audio as string,
            writtenFeedback
        }

        const response = await addReviewEntry({
            variables,
        })
        setIsLoading(false)
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
        <ReviewWorksheetEntryWrapper key={reviewEntry.id} style={{ border: '5px solid white' }}>
            <Heading.H3>Entry</Heading.H3>
            <WrittenTextWrapper>
                <div>
                    <Heading.H4> Written {worksheet.knownLanguage}</Heading.H4>
                    <Paragraph>{worksheetEntry.knownLanguageText}</Paragraph>
                </div>
                <div>
                    <Heading.H4> Written {worksheet.newLanguage}</Heading.H4>
                    <Paragraph>{worksheetEntry.newLanguageText}</Paragraph>
                </div>
            </WrittenTextWrapper>

            <Heading.H4>Recorded {worksheet.newLanguage}</Heading.H4>
            <audio style={{ width: '100%' }} controls src={worksheetEntry.audioUrl} />
            <LabelAndInput
                type="textarea"
                name="writtenFeedback"
                label="Written Feedback"
                value={writtenFeedback}
                handleChange={(value) => setWrittenFeedback(value)}
            />
            <AudioRecorder
                audioUrl={audioUrl}
                setAudioUrl={setAudioUrl}
            />
            <Button variation="primary" onClick={handleSubmit}>Submit Feedback</Button>
        </ReviewWorksheetEntryWrapper>
    )
}

export default ReviewWorksheetEntry
