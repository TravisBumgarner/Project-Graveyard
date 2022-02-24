import React from 'react'
import { Link } from 'react-router-dom'

import { context } from '.'

const Review = () => {
    const { state } = React.useContext(context)
    console.log(state.worksheets)
    return (
        <div>
            <h1>Review Others</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Username</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {Object
                        .values(state.worksheets)
                        .filter(({ userId }) => !(userId === state.currentUser.panda.id))
                        .map(({ title, userId, description, id, knownLanguage, newLanguage }) => {
                            return (
                                <tr key={id}>
                                    <td>{title}</td>
                                    <td>{userId}</td>
                                    <td>{knownLanguage}</td>
                                    <td>{newLanguage}</td>
                                    <td>{description}</td>
                                    <td>
                                        <Link to={`/worksheet/${id}`}>View</Link>
                                        <button>Review</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>
        </div>
    )
}

export default Review