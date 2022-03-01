import React from 'react'
import { Link } from 'react-router-dom'

import { context } from '.'
import { Table, TableHeader, TableBody, TableBodyCell, TableHeaderCell, TableRow } from './StyleExploration'


const Review = () => {
    const { state } = React.useContext(context)
    console.log(state.worksheets)
    return (
        <div>
            <h1>Review Others</h1>
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
                        .values(state.worksheets)
                        .filter(({ userId }) => !(userId === state.currentUser.panda.id))
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