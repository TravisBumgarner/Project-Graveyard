import React from 'react'
import styled from 'styled-components'
import {
    gql,
    useMutation,
    useQuery,
} from '@apollo/client'

import { AudioRecorder, Heading, LabelAndInput, Paragraph, Button, Loading, Modal, colors, ButtonWrapper } from 'sharedComponents'
import { TReview, TReviewEntry, TWorksheet, TWorksheetEntry, } from 'types'
import { objectUrlToBase64, logger } from 'utilities'
import { context } from 'context'

const StudentWrapper = styled.div`
    border: 2px solid;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    border-color: ${colors.PRIMARY.base};
    margin: 0.5rem;
`

const ReviewWorksheetEntryWrapper = styled.div`
`

const WrittenTextWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    > div {
        width: 45%;
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
        <ReviewWorksheetEntryWrapper key={id}>
            <Heading.H3>Worksheet Entry</Heading.H3>
            <StudentWrapper>

                <WrittenTextWrapper>
                    <div>
                        <Heading.H4>{worksheet.newLanguage}</Heading.H4>
                        <Paragraph>{worksheetEntry.newLanguageText}</Paragraph>
                    </div>
                    <div>
                        <Heading.H4>{worksheet.knownLanguage}</Heading.H4>
                        <Paragraph>{worksheetEntry.knownLanguageText}</Paragraph>
                    </div>
                </WrittenTextWrapper>

                <Heading.H4>Audio</Heading.H4>
                <audio style={{ width: '100%' }} controls src={worksheetEntry.audioUrl} />
            </StudentWrapper>
            <Heading.H3>Feedback</Heading.H3>
            <LabelAndInput
                type="textarea"
                name="writtenFeedback"
                label="Written"
                value={writtenFeedback}
                handleChange={(value) => handleWrittenFeedback(value)}
            />
            <AudioRecorder
                audioUrl={audioUrl}
                setAudioUrl={handleOralFeedback}
            />
            <ButtonWrapper
                left={[
                    <Button variation="primary" onClick={handlePrevClick}>Previous Entry</Button>,
                    <Button variation="primary" onClick={handleNextClick}>Next Entry</Button>
                ]}
                right={[<Button variation="secondary" onClick={handleSubmit}>Submit Feedback</Button>]}
            />
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
