import React from 'react'
import styled from 'styled-components'
import {
    gql,
    useMutation,
    useQuery,
} from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'

import { AudioRecorder, Heading, LabelAndInput, Paragraph, colors, Button, Loading, Modal } from 'sharedComponents'
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
    getNextWorksheetEntry: () => void
    getPrevWorksheetEntry: () => void
}

const ReviewWorksheetEntry = ({
    worksheet, worksheetEntryId, review, getNextWorksheetEntry, getPrevWorksheetEntry
}: ReviewWorksheetEntryProps) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [audioUrl, setAudioUrl] = React.useState<string>('')
    const [writtenFeedback, setWrittenFeedback] = React.useState<string>('')
    const [id, setId] = React.useState<string>('')
    const [hasReviewerBeganReviewThisSession, setHasReviewerBeganReviewThisSession] = React.useState<boolean>(false)
    const [modalDetails, setModalDetails] = React.useState<{ show: boolean, direction?: 'prev' | 'next' }>({ show: false })
    const [worksheetEntry, setWorksheetEntry] = React.useState<TWorksheetEntry>(null)
    console.log(hasReviewerBeganReviewThisSession)
    const handleWrittenFeedback = (value: string) => {
        setHasReviewerBeganReviewThisSession(true)
        setWrittenFeedback(value)
    }

    const handleOralFeedback = (value: string) => {
        setAudioUrl(value)
        setHasReviewerBeganReviewThisSession(true)
    }

    const handleNextClick = () => {
        if (hasReviewerBeganReviewThisSession) {
            setModalDetails({ show: true, direction: 'next' })
        } else {
            getNextWorksheetEntry()
        }
    }

    const handlePrevClick = () => {
        if (hasReviewerBeganReviewThisSession) {
            setModalDetails({ show: true, direction: 'prev' })
        } else {
            getPrevWorksheetEntry()
        }
    }

    const { dispatch } = React.useContext(context)

    useQuery<{ reviewEntries: TReviewEntry[], worksheetEntries: TWorksheetEntry[] }>(GET_WORKSHEET_ENTRY_AND_REVIEW_ENTRY, {
        variables: {
            worksheetEntryId,
        },
        fetchPolicy: 'no-cache',
        onCompleted: (data) => {
            setWorksheetEntry(data.worksheetEntries[0])
            if (data.reviewEntries[0]) {
                setId(data.reviewEntries[0].id)
                setAudioUrl(data.reviewEntries[0].oralFeedback)
                setWrittenFeedback(data.reviewEntries[0].writtenFeedback)
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
            id,
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
            setHasReviewerBeganReviewThisSession(false)
        }
    }

    if (isLoading) return <Loading />

    return (
        <ReviewWorksheetEntryWrapper key={id} style={{ border: '5px solid white' }}>
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
                handleChange={(value) => handleWrittenFeedback(value)}
            />
            <AudioRecorder
                audioUrl={audioUrl}
                setAudioUrl={handleOralFeedback}
            />
            <Button variation="primary" onClick={handleSubmit}>Submit Feedback</Button>
            <Button variation="primary" onClick={handlePrevClick}>Previous</Button>
            <Button variation="primary" onClick={handleNextClick}>Next</Button>
            <Modal
                contentLabel="You have unsaved changes, lose them?"
                showModal={modalDetails.show}
                closeModal={() => setModalDetails({ show: false })}
            >
                <>
                    <Button
                        variation="secondary"
                        onClick={() => setModalDetails({ show: false })}
                    >Go Back
                    </Button>
                    <Button
                        variation="alert"
                        onClick={
                            () => (modalDetails.direction === 'next' ? getNextWorksheetEntry() : getPrevWorksheetEntry())
                        }
                    >Continue
                    </Button>
                </>
            </Modal>
        </ReviewWorksheetEntryWrapper>
    )
}

export default ReviewWorksheetEntry
