import React from 'react'
import { Link } from 'react-router-dom'

import { context } from '.'

const Review = () => {
    const { state, dispatch } = React.useContext(context)

    const [showModal, setShowModal] = React.useState<boolean>(false)
    console.log(state.currentUser.panda.id)
    console.log(state)
    return (
        <div>
            <h1>Review Others</h1>
            <ul>
                {Object.values(state.worksheets).filter(({ userId }) => userId !== state.currentUser.panda.id).map(({ title, description, id, knownLanguage, newLanguage }) => <li key={id}><Link to={`/review/${id}`}>{title} - {description} - {knownLanguage} - {newLanguage}</Link></li>)}
            </ul>
        </div>
    )
}

export default Review