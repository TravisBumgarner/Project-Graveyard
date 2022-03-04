import React from 'react'
import moment from 'moment'
import Modal from 'react-modal'
import { gql, useMutation, useQuery } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'
import { AiOutlineFolder, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import styled from 'styled-components'

import { Table, TableHeader, TableBody, TableBodyCell, TableHeaderCell, TableRow, H2, Paragraph } from '../../StyleExploration'
import { context } from '../../'
import { PhraseADayUser, Worksheet, StudentReview } from '../../../types'
import { Button, LabelAndInput } from '../../StyleExploration'
import { dateToString } from '../../../utilities'


const STUDENT_REVIEW = gql`
query StudentReview($worksheetId: String!)
 {
    studentReview(worksheetId: $worksheetId){
		writtenFeedback,
        oralFeedback,
        audioUrl,
        knownLanguageText,
        newLanguageText
  }
}
`

type ReviewProps = {
    worksheetId: string
}

const Review = ({ worksheetId }: ReviewProps) => {
    const { state, dispatch } = React.useContext(context)
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [review, setReview] = React.useState<StudentReview[]>([])
    const { title, description, date } = state.worksheets[worksheetId]
    useQuery<{ studentReview: StudentReview[] }>(STUDENT_REVIEW, {
        variables: {
            worksheetId
        },
        onCompleted: (data) => {
            setReview(data.studentReview)
            setIsLoading(false)
        }
    })
    console.log(review)
    return (
        <div>
            <H2>{title}</H2>
            <Paragraph> Description: {description}</Paragraph>
            <Paragraph> Date: {dateToString(moment(date))}</Paragraph>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell scope="col">{state.worksheets[worksheetId].knownLanguage}</TableHeaderCell>
                        <TableHeaderCell scope="col">{state.worksheets[worksheetId].newLanguage}</TableHeaderCell>
                        <TableHeaderCell scope="col">Recorded</TableHeaderCell>
                        <TableHeaderCell>Written Feedback</TableHeaderCell>
                        <TableHeaderCell>Oral Feedback</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {review
                        .map(({ knownLanguageText, newLanguageText, oralFeedback, writtenFeedback, audioUrl }, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableBodyCell>{knownLanguageText}</TableBodyCell>
                                    <TableBodyCell>{newLanguageText}</TableBodyCell>
                                    <TableBodyCell><audio src={audioUrl} controls /></TableBodyCell>
                                    <TableBodyCell>{writtenFeedback}</TableBodyCell>
                                    <TableBodyCell><audio src={oralFeedback} controls /></TableBodyCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>

            </Table>
        </div>
    )
}

export default Review
