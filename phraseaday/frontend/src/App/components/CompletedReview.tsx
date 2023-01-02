import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router'
import moment from 'moment'

import { Loading, Table, Heading, Paragraph, Breadcrumbs } from 'sharedComponents'
import { logger, dateToString } from 'utilities'
import { TWorksheet, TCompletedStudentReview } from 'types'

const STUDENT_REVIEW = gql`
query completedStudentReview($worksheetId: String!)
 {
    worksheet(worksheetId: $worksheetId){
        title,
        description,
        id,
        date,
        knownLanguage,
        newLanguage
    }
    completedStudentReview(worksheetId: $worksheetId){
        writtenFeedback,
        oralFeedback,
        audioUrl,
        knownLanguageText,
        newLanguageText,
        reviewEntryId
  }
}
`

const CompletedReview = () => {
    const { worksheetId } = useParams()
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [completedStudentReviewEntries, setCompletedStudentReviewEntries] = React.useState<TCompletedStudentReview[]>([])
    const [worksheet, setWorksheet] = React.useState<TWorksheet>()

    useQuery<{ completedStudentReview: TCompletedStudentReview[], worksheet: TWorksheet[] }>(STUDENT_REVIEW, {
        variables: {
            worksheetId,
        },
        onCompleted: (data) => {
            setCompletedStudentReviewEntries(data.completedStudentReview)
            setWorksheet(data.worksheet[0])
            setIsLoading(false)
        },
        onError: (error) => {
            logger(error)
            throw new Error('Something went wrong')
        }
    })
    if (isLoading) return <Loading />
    const { title, description, date } = worksheet
    return (
        <div>
            <Heading.H2><Breadcrumbs breadcrumbs={[{ to: '/student/dashboard', text: 'Student Dashboard' }]} /> {title} Worksheet</Heading.H2>
            <Paragraph> Description: {description}</Paragraph>
            <Paragraph> Date: {dateToString(moment(date))}</Paragraph>
            <Table.Table>
                <Table.TableHeader>
                    <Table.TableRow>
                        <Table.TableHeaderCell width="20%" scope="col">From: {worksheet.knownLanguage}</Table.TableHeaderCell>
                        <Table.TableHeaderCell width="20%" scope="col">To: {worksheet.newLanguage}</Table.TableHeaderCell>
                        <Table.TableHeaderCell style={{ textAlign: 'center' }} width="10%" scope="col">Recorded</Table.TableHeaderCell>
                        <Table.TableHeaderCell width="30%">Written Feedback</Table.TableHeaderCell>
                        <Table.TableHeaderCell style={{ textAlign: 'center' }} width="10%">Oral Feedback</Table.TableHeaderCell>
                    </Table.TableRow>
                </Table.TableHeader>
                <Table.TableBody>
                    {completedStudentReviewEntries
                        .map(({
                            knownLanguageText,
                            newLanguageText,
                            oralFeedback,
                            writtenFeedback,
                            audioUrl,
                        }) => (
                            <Table.TableRow>
                                <Table.TableBodyCell>{knownLanguageText}</Table.TableBodyCell>
                                <Table.TableBodyCell>{newLanguageText}</Table.TableBodyCell>
                                <Table.TableBodyCell><audio src={audioUrl} controls /></Table.TableBodyCell>
                                <Table.TableBodyCell>{writtenFeedback}</Table.TableBodyCell>
                                <Table.TableBodyCell>{oralFeedback.length ? <audio src={oralFeedback} controls /> : ''}</Table.TableBodyCell>
                            </Table.TableRow>
                        ))}
                </Table.TableBody>

            </Table.Table>
        </div>
    )
}

export default CompletedReview
