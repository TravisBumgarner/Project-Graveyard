import React from 'react'
import moment from 'moment'
import {
    gql,
    useQuery
} from '@apollo/client'
import {
    useParams
} from 'react-router'

import { Loading, Button, Heading, Paragraph, Breadcrumbs } from 'sharedComponents'
import {
    dateToString,
    logger,
} from 'utilities'
import {
    TPhraseADayUser,
    TReview,
    TWorksheet,
    TWorksheetEntry,
} from 'types'
import { context } from 'context'
import { ReviewWorksheetEntry } from './components'

const GET_WORKSHEET_AND_WORKSHEET_ENTRIES = gql`
query GetWorksheets($worksheetId: String) {
  worksheet(worksheetId: $worksheetId) {
    title,
    id,
    description,
    date,
    knownLanguage,
    newLanguage,
    userId,
    status,
    user {
      username
    }
  }
  worksheetEntries(worksheetId: $worksheetId) {
   id,
  }
  review(worksheetId: $worksheetId){
      id
  }

}
`

const ReviewWorksheet = () => {
    const { dispatch } = React.useContext(context)
    const { worksheetId } = useParams()
    const [review, setReview] = React.useState<TReview>()
    const [worksheet, setWorksheet] = React.useState<TWorksheet & { user: TPhraseADayUser }>()
    const [worksheetEntryIds, setWorksheetEntryIds] = React.useState<string[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [currentWorksheetEntryIndex, setCurrentWorksheetEntryIndex] = React.useState<number>(0)

    useQuery<{ worksheet: (TWorksheet & { user: TPhraseADayUser })[], worksheetEntries: TWorksheetEntry[], review: TReview[] }>(
        GET_WORKSHEET_AND_WORKSHEET_ENTRIES, {
        variables: {
            worksheetId,
        },
        onCompleted: (data) => {
            setWorksheet(data.worksheet[0])
            setReview(data.review[0])
            setWorksheetEntryIds(data.worksheetEntries.map(({ id }) => id))
            setIsLoading(false)
        },
        onError: (error) => {
            logger(JSON.stringify(error))
            dispatch({ type: 'HAS_ERRORED' })
        },
    })

    const getNextWorksheetEntry = () => setCurrentWorksheetEntryIndex(
        currentWorksheetEntryIndex + 1 === worksheetEntryIds.length
            ? 0
            : currentWorksheetEntryIndex + 1
    )
    const getPrevWorksheetEntry = () => setCurrentWorksheetEntryIndex(
        currentWorksheetEntryIndex - 1 === -1
            ? worksheetEntryIds.length - 1
            : currentWorksheetEntryIndex - 1
    )

    if (isLoading) return <Loading />

    const {
        title, description, knownLanguage, newLanguage, date, user: { username },
    } = worksheet

    return (
        <div>
            <div>
                <Heading.H2><Breadcrumbs breadcrumbs={[{ to: '/reviewer/dashboard', text: 'Reviewer Dashboard' }]} /> {title} Worksheet</Heading.H2>

                <Paragraph>
                    Student: {username}
                </Paragraph>
                <Paragraph>
                    Description: {description}
                </Paragraph>
                <Paragraph>
                    Date: {dateToString(moment(date))}
                </Paragraph>
                <Paragraph>
                    From: {knownLanguage} To: {newLanguage}
                </Paragraph>
                <ReviewWorksheetEntry
                    key={worksheetEntryIds[currentWorksheetEntryIndex]}
                    worksheetEntryId={worksheetEntryIds[currentWorksheetEntryIndex]}
                    worksheet={worksheet}
                    review={review}
                    getPrevWorksheetEntry={getPrevWorksheetEntry}
                    getNextWorksheetEntry={getNextWorksheetEntry}
                />
            </div>
        </div>
    )
}

export default ReviewWorksheet
