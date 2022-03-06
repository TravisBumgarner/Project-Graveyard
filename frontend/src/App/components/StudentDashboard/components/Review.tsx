import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { useParams, useNavigate } from 'react-router'

import { Loading } from 'sharedComponents'
import moment from 'moment'
import utilities from '../../../utilities'
import {
    Table, TableHeader, TableBody, TableBodyCell, TableHeaderCell, TableRow, H2, Paragraph, StyledNavLink, Button
} from '../../StyleExploration'
import { TStudentReview, TWorksheet } from '../../../types'

const STUDENT_REVIEW = gql`
query StudentReview($worksheetId: String!)
 {
    worksheet(worksheetId: $worksheetId){
        title,
        description,
        id,
        date
    }
    studentReview(worksheetId: $worksheetId){
        writtenFeedback,
        oralFeedback,
        audioUrl,
        knownLanguageText,
        newLanguageText,
        reviewEntryId
  }
}
`

const Review = () => {
    const { worksheetId } = useParams()
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [review, setReview] = React.useState<TStudentReview[]>([])
    const [worksheet, setWorksheet] = React.useState<TWorksheet>()
    const navigate = useNavigate()

    useQuery<{ studentReview: TStudentReview[], worksheet: TWorksheet[] }>(STUDENT_REVIEW, {
        variables: {
            worksheetId,
        },
        onCompleted: (data) => {
            setReview(data.studentReview)
            setWorksheet(data.worksheet[0])
            setIsLoading(false)
        },
        onError: (error) => {
            utilities.logger(error)
            throw new Error('Something went wrong')
        }
    })
    if (isLoading) return <Loading />

    const { title, description, date } = worksheet

    return (
        <div>
            <H2><Button variation="primary" onClick={() => navigate(-1)}>Reviews</Button> {'>'} {title} Worksheet Review</H2>
            <Paragraph> Description: {description}</Paragraph>
            <Paragraph> Date: {utilities.dateToString(moment(date))}</Paragraph>
            <Table>
                <TableHeader>
                    <TableRow>
                        {/* <TableHeaderCell scope="col">{state.worksheets[worksheetId].knownLanguage}</TableHeaderCell>
                        <TableHeaderCell scope="col">{state.worksheets[worksheetId].newLanguage}</TableHeaderCell> */}
                        <TableHeaderCell width="20%" scope="col">From</TableHeaderCell>
                        <TableHeaderCell width="20%" scope="col">To</TableHeaderCell>
                        <TableHeaderCell style={{ textAlign: 'center' }} width="10%" scope="col">Recorded</TableHeaderCell>
                        <TableHeaderCell width="30%">Written Feedback</TableHeaderCell>
                        <TableHeaderCell style={{ textAlign: 'center' }} width="10%">Oral Feedback</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {review
                        .map(({
                            knownLanguageText, newLanguageText, oralFeedback, writtenFeedback, audioUrl, reviewEntryId
                        }) => (
                            <TableRow key={reviewEntryId}>
                                <TableBodyCell>{knownLanguageText}</TableBodyCell>
                                <TableBodyCell>{newLanguageText}</TableBodyCell>
                                <TableBodyCell><audio src={audioUrl} controls /></TableBodyCell>
                                <TableBodyCell>{writtenFeedback}</TableBodyCell>
                                <TableBodyCell><audio src={oralFeedback} controls /></TableBodyCell>
                            </TableRow>
                        ))}
                </TableBody>

            </Table>
        </div>
    )
}

export default Review
