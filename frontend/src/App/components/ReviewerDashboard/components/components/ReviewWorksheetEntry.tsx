import React from 'react'
import styled from 'styled-components'

import { AudioRecorder } from 'sharedComponents'
import { TWorksheet, TWorksheetEntry, } from '../../../../types'
import { useRecorder } from '../../../../hooks'
import { H3, H4, LabelAndInput, Paragraph, PRIMARY, } from '../../../StyleExploration'

const ReviewWorksheetEntryWrapper = styled.div`
    padding: 1rem;
    background-color: ${PRIMARY.lightest};  
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
    const [audioURL, isRecording, startRecording, stopRecording] = useRecorder()

    React.useEffect(() => {
        dispatchReview({ type: 'ORAL_FEEDBACK_ACTION', data: { worksheetEntryId: worksheetEntry.id, oralFeedback: audioURL } })
    }, [audioURL])

    return (
        <ReviewWorksheetEntryWrapper key={id} style={{ border: '5px solid white' }}>
            <H3>Entry</H3>
            <WrittenTextWrapper>
                <div>
                    <H4> Written {worksheet.knownLanguage}</H4>
                    <Paragraph>{knownLanguageText}</Paragraph>
                </div>
                <div>
                    <H4> Written {worksheet.newLanguage}</H4>
                    <Paragraph>{newLanguageText}</Paragraph>
                </div>
            </WrittenTextWrapper>

            <H4>Recorded {worksheet.newLanguage}</H4>
            <audio style={{ width: '100%' }} controls src={worksheetEntry.audioUrl} />
            <H3>Add Review</H3>
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
                stopRecording={stopRecording}
                audioURL={audioURL}
                startRecording={startRecording}
                isRecording={isRecording}
            />

        </ReviewWorksheetEntryWrapper>
    )
}

export default ReviewWorksheetEntry
