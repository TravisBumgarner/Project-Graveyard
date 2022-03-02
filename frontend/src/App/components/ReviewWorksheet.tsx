import React from 'react'
import moment from 'moment'
import Modal from 'react-modal'
import { gql, useMutation, useQuery } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import { useParams } from 'react-router'
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

import { context } from '.'
import { WorksheetEntry } from '../types'
import { dateToString } from '../utilities'
import styled from 'styled-components'
import { useRecorder } from '../hooks'
import { Button, Input, Table, TableBody, TableBodyCell, TableHeader, TableHeaderCell, TableRow } from './StyleExploration'


const ActionButton = styled.button`
    background-color: transparent;
    border: 0;
    cursor: pointer;

`

const ADD_REVIEW = gql`
mutation AddReview (
    $id: String!
    $worksheetId: String!
    $date: String!
    $reviewEntries: [ReviewEntry]
  ) {
    addReview(
        id: $id,
        worksheetId: $worksheetId,
        date: $date,
        reviewEntries: $reviewEntries
        ){
      id,
    }
}
`;

type WorksheetEntryProps = {
    worksheetEntry: WorksheetEntry
    reviewState: any
    dispatchReview: any
}
const WorksheetEntry = ({ worksheetEntry, reviewState, dispatchReview }: WorksheetEntryProps) => {
    const { id, knownLanguageText, newLanguageText } = worksheetEntry
    const [showModal, setShowModal] = React.useState<boolean>(false)
    let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();

    React.useEffect(() => {
        dispatchReview({ type: "ORAL_FEEDBACK_ACTION", data: { worksheetEntryId: worksheetEntry.id, oralFeedback: audioURL } })
    }, [audioURL])

    return (
        <>
            <TableRow key={id} >
                <TableBodyCell>{knownLanguageText}</TableBodyCell>
                <TableBodyCell>{newLanguageText}</TableBodyCell>
                <TableBodyCell><audio controls src={__AUDIO_ENDPOINT__ + `/recordings/${worksheetEntry.worksheetId}/${worksheetEntry.id}.webm`} /></TableBodyCell>
                <TableBodyCell>
                    <Input value={reviewState[worksheetEntry.id].writtenFeedback} onChange={(event) => {
                        dispatchReview({ type: "WRITTEN_FEEDBACK_ACTION", data: { worksheetEntryId: worksheetEntry.id, writtenFeedback: event.target.value } })
                    }
                    } />
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
        </>
    )
}

type State = Record<string, { oralFeedback: string, writtenFeedback: string }>


type OralFeedbackAction = {
    type: "ORAL_FEEDBACK_ACTION",
    data: {
        oralFeedback: string
        worksheetEntryId: string
    }
}

type WrittenFeedbackAction = {
    type: "WRITTEN_FEEDBACK_ACTION",
    data: {
        writtenFeedback: string
        worksheetEntryId: string
    }
}

const reviewReducer = (state: State, action: OralFeedbackAction | WrittenFeedbackAction): State => {
    const { worksheetEntryId } = action.data
    switch (action.type) {
        case 'ORAL_FEEDBACK_ACTION': {
            const { oralFeedback } = action.data
            return { ...state, [worksheetEntryId]: { ...state[worksheetEntryId], oralFeedback } }
        }
        case 'WRITTEN_FEEDBACK_ACTION': {
            const { writtenFeedback } = action.data
            return { ...state, [worksheetEntryId]: { ...state[worksheetEntryId], writtenFeedback } }
        }
    }
}

type ReviewWorksheetProps = {

}

const ReviewWorksheet = ({ }: ReviewWorksheetProps) => {
    let { worksheetId } = useParams();
    const { state, dispatch } = React.useContext(context)
    const filteredWorksheetEntries = Object.values(state.worksheetEntries).filter((entry) => entry.worksheetId === worksheetId)
    const { title, description, knownLanguage, newLanguage, date, user: { username } } = state.worksheets[worksheetId]
    const [reviewState, dispatchReview] = React.useReducer(reviewReducer, filteredWorksheetEntries.reduce((accum, { id }) => {
        accum[id] = {
            writtenFeedback: "",
            oralFeedback: ""
        }
        return accum
    }, {} as Record<string, { oralFeedback: string, writtenFeedback: string }>))
    const [addReview] = useMutation<any>(ADD_REVIEW)
    const handleSubmit = async () => {
        const variables = {
            date: moment(),
            id: uuidv4(),
            worksheetId,
            reviewEntries: Object.keys(reviewState).map(worksheetEntryId => ({
                id: uuidv4(),
                worksheetEntryId,
                ...reviewState[worksheetEntryId],
            }))
        }
        console.log('variables', variables)
        const response = await addReview({
            variables
        })
    }
    return (
        <div>
            <div style={{ border: '1px solid black', padding: '10px' }}>
                <h1>{title}</h1>
                <p>Student: {username}</p>
                <p>Description: {description}</p>
                <p>Date: {dateToString(moment(date))}</p>
                <p>From: {knownLanguage} To: {newLanguage}</p>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell scope="col">{state.worksheets[worksheetId].knownLanguage}</TableHeaderCell>
                            <TableHeaderCell scope="col">{state.worksheets[worksheetId].newLanguage}</TableHeaderCell>
                            <TableHeaderCell scope="col">Recorded</TableHeaderCell>
                            <TableHeaderCell scope="col">Written Feedback</TableHeaderCell>
                            <TableHeaderCell scope="col">Oral Feedback</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredWorksheetEntries.map(worksheetEntry => (
                            <WorksheetEntry
                                reviewState={reviewState}
                                dispatchReview={dispatchReview}
                                worksheetEntry={worksheetEntry}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Button variation="primary" onClick={handleSubmit}>Submit Feedback</Button>
        </div>
    )
}

export default ReviewWorksheet