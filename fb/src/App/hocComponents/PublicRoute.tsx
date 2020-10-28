import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => authenticated === false
                ? <Component {...props} />
                : <Redirect to='/paint' />}
        />
    )
}

export default PublicRoute