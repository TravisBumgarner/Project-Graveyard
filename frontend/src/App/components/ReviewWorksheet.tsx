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

const ActionButton = styled.button`
    background-color: transparent;
    border: 0;

`

type WorksheetEntryProps = {
    worksheetEntry: WorksheetEntry
}
const WorksheetEntry = ({ worksheetEntry }: WorksheetEntryProps) => {
    const { state, dispatch } = React.useContext(context)
    const { id, knownLanguageText, newLanguageText } = worksheetEntry


    return (
        <tr key={id} >
            <td>{knownLanguageText}</td>
            <td>{newLanguageText}</td>
            <td><audio controls src={__AUDIO_ENDPOINT__ + `/recordings/${worksheetEntry.worksheetId}/${worksheetEntry.id}.webm`} /></td>
            <td>
                <ActionButton><AiOutlineEdit /></ActionButton>
            </td>
        </tr>
    )
}

type ReviewWorksheetProps = {

}

const ReviewWorksheet = ({ }: ReviewWorksheetProps) => {
    let { worksheetId } = useParams();
    const { state, dispatch } = React.useContext(context)
    const [showModal, setShowModal] = React.useState<boolean>(false)
    const filteredWorksheetEntries = Object.values(state.worksheetEntries).filter((entry) => entry.worksheetId === worksheetId)

    const { title, description, knownLanguage, newLanguage, date } = state.worksheets[worksheetId]
    return (
        <div>
            <div style={{ border: '1px solid black', padding: '10px' }}>
                <h1>{title}</h1>
                <p>Description: {description}</p>
                <p>Date: {dateToString(moment(date))}</p>
                <p>From: {knownLanguage} To: {newLanguage}</p>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">{state.worksheets[worksheetId].knownLanguage}</th>
                            <th scope="col">{state.worksheets[worksheetId].newLanguage}</th>
                            <th scope="col">Recorded</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredWorksheetEntries.map(worksheetEntry => <WorksheetEntry worksheetEntry={worksheetEntry} />)}
                    </tbody>
                </table>
            </div>
            <button onClick={() => console.log('submitted')}>Submit Feedback</button>
        </div>
    )
}

export default ReviewWorksheet