import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'

import { context } from '.'
import { TPhraseADayUser, TWorksheet } from '../types'
import { Table, TableHeader, TableBody, TableBodyCell, TableHeaderCell, TableRow, H2 } from './StyleExploration'

const GET_WORKSHEETS = gql`
query GetWorksheets {
  worksheet {
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
}
`

const Review = () => {
    const [worksheets, setWorksheets] = React.useState<Record<string, (TWorksheet & { user: TPhraseADayUser })>>({})
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const { state, dispatch } = React.useContext(context)
    useQuery<{ worksheet: (TWorksheet & { user: TPhraseADayUser })[] }>(GET_WORKSHEETS, {
        onCompleted: (data) => {
            const worksheets: Record<string, TWorksheet & { user: TPhraseADayUser }> = {}
            data.worksheet.forEach(worksheet => worksheets[worksheet.id] = worksheet)
            console.log(data.worksheet)
            setWorksheets(worksheets)
            setIsLoading(false)
        }
    })

    if (isLoading) return <div>Loading...</div>

    return (
        <div>
            <H2>Review Dashboard</H2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Title</TableHeaderCell>
                        <TableHeaderCell>Username</TableHeaderCell>
                        <TableHeaderCell>From</TableHeaderCell>
                        <TableHeaderCell>To</TableHeaderCell>
                        <TableHeaderCell>Description</TableHeaderCell>
                        <TableHeaderCell>Actions</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {Object
                        .values(worksheets)
                        .filter(({ userId }) => !(userId === state.currentUser.phraseADay.id))
                        .map(({ title, user: { username }, description, id, knownLanguage, newLanguage }) => {
                            return (
                                <TableRow key={id}>
                                    <TableBodyCell>{title}</TableBodyCell>
                                    <TableBodyCell>{username}</TableBodyCell>
                                    <TableBodyCell>{knownLanguage}</TableBodyCell>
                                    <TableBodyCell>{newLanguage}</TableBodyCell>
                                    <TableBodyCell>{description}</TableBodyCell>
                                    <TableBodyCell>
                                        <Link to={`/review/${id}`}>Review</Link>
                                    </TableBodyCell>
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