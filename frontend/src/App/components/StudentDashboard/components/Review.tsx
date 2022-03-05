import React from 'react'
import moment from 'moment'
import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router'

import { Table, TableHeader, TableBody, TableBodyCell, TableHeaderCell, TableRow, H2, Paragraph } from '../../StyleExploration'
import { context } from '../..'
import { TStudentReview } from '../../../types'
import { dateToString } from '../../../utilities'
import { Loading } from 'sharedComponents'


const STUDENT_REVIEW = gql`
query StudentReview($worksheetId: String!)
 {
    worksheet(worksheetId: $worksheetId){
        title,
        description,
        id
    }
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
}

const Review = ({ }: ReviewProps) => {
    const { state, dispatch } = React.useContext(context)
    let { worksheetId } = useParams();
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [review, setReview] = React.useState<TStudentReview[]>([])
    // const { title, description, date } = state.worksheets[worksheetId]
    useQuery<{ studentReview: TStudentReview[] }>(STUDENT_REVIEW, {
        variables: {
            worksheetId
        },
        onCompleted: (data) => {
            setReview(data.studentReview)
            setIsLoading(false)
        }
    })

    if (isLoading) return <Loading />

    return (
        <div>
            {/* <H2>{title}</H2>
            <Paragraph> Description: {description}</Paragraph>
            <Paragraph> Date: {dateToString(moment(date))}</Paragraph> */}
            <Table>
                <TableHeader>
                    <TableRow>
                        {/* <TableHeaderCell scope="col">{state.worksheets[worksheetId].knownLanguage}</TableHeaderCell>
                        <TableHeaderCell scope="col">{state.worksheets[worksheetId].newLanguage}</TableHeaderCell> */}
                        <TableHeaderCell scope="col">From</TableHeaderCell>
                        <TableHeaderCell scope="col">To</TableHeaderCell>
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
