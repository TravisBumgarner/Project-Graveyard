import React from 'react'
import styled from 'styled-components'

import { AudioRecorder, Heading, LabelAndInput, Paragraph, colors } from 'sharedComponents'
import { TWorksheet, TWorksheetEntry, } from '../../../../../types'

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

type ReviewWorksheetEntryProps = {
    worksheet: TWorksheet
    worksheetEntry: TWorksheetEntry
    reviewState: any
    dispatchReview: any
}

const ReviewWorksheetEntry = ({
    worksheet, worksheetEntry, reviewState, dispatchReview
}: ReviewWorksheetEntryProps) => {
    const { id, knownLanguageText, newLanguageText } = worksheetEntry
    const [audioURL, setAudioURL] = React.useState<string>('')

    React.useEffect(() => {
        dispatchReview({ type: 'ORAL_FEEDBACK_ACTION', data: { worksheetEntryId: worksheetEntry.id, oralFeedback: audioURL } })
    }, [audioURL])

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
            <Heading.H3>Add Review</Heading.H3>
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

        </ReviewWorksheetEntryWrapper>
    )
}

export default ReviewWorksheetEntry
