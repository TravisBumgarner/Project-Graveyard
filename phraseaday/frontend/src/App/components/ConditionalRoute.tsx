import React from 'react'
import { Navigate } from 'react-router-dom'

import { context } from '.'

type ConditionalRouteProps = {
    authedComponent: JSX.Element,
    unauthedComponent?: JSX.Element
}

const ConditionalRoute = ({ authedComponent, unauthedComponent }: ConditionalRouteProps) => {
    const { state } = React.useContext(context)
    if (state.currentUser) {
        return authedComponent
    }
    return unauthedComponent || <Navigate to="/login" />
}

export default ConditionalRoute
