import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { Loading, Heading, Table, StyledNavLink } from 'sharedComponents'

import { context } from '..'
import { TPhraseADayUser, TWorksheet } from '../../types'

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
      username,
      id
    }
  }
}
`

const Review = () => {
    const [worksheets, setWorksheets] = React.useState<Record<string, (TWorksheet & { user: TPhraseADayUser })>>({})
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const { state } = React.useContext(context)
    useQuery<{ worksheet: (TWorksheet & { user: TPhraseADayUser })[] }>(GET_WORKSHEETS, {
        onCompleted: (data) => {
            const newWorksheets: Record<string, TWorksheet & { user: TPhraseADayUser }> = {}
            data.worksheet.forEach((worksheet) => { newWorksheets[worksheet.id] = worksheet })
            setWorksheets(newWorksheets)
            setIsLoading(false)
        },
    })

    if (isLoading) return <Loading />

    return (
        <div>
            <Heading.H2>Review Dashboard</Heading.H2>
            <Table.Table>
                <Table.TableHeader>
                    <Table.TableRow>
                        <Table.TableHeaderCell width="15%">Title</Table.TableHeaderCell>
                        <Table.TableHeaderCell width="15%">Created</Table.TableHeaderCell>
                        <Table.TableHeaderCell width="15%">User</Table.TableHeaderCell>
                        <Table.TableHeaderCell width="15%">From</Table.TableHeaderCell>
                        <Table.TableHeaderCell width="15%">To</Table.TableHeaderCell>
                        <Table.TableHeaderCell width="25%">Description</Table.TableHeaderCell>
                    </Table.TableRow>
                </Table.TableHeader>
                <Table.TableBody>

                    {Object
                        .values(worksheets)
                        .filter(({ userId }) => !(userId === state.currentUser.phraseADay.id))
                        .map(({
                            title, user: { username, id: userId }, date, description, id, knownLanguage, newLanguage,
                        }) => (
                            <Table.TableRow key={id}>
                                <Table.TableBodyCell><StyledNavLink to={`/worksheet/${id}`} text={title} /></Table.TableBodyCell>
                                <Table.TableBodyCell>{date}</Table.TableBodyCell>
                                <Table.TableBodyCell><StyledNavLink text={username} to={`/profile/${userId}`} /></Table.TableBodyCell>
                                <Table.TableBodyCell>{knownLanguage}</Table.TableBodyCell>
                                <Table.TableBodyCell>{newLanguage}</Table.TableBodyCell>
                                <Table.TableBodyCell>{description}</Table.TableBodyCell>
                            </Table.TableRow>
                        ))}
                </Table.TableBody>

            </Table.Table>
        </div>
    )
}

export default Review
