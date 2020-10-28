import * as React from 'react'
import styled from 'styled-components'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import { w3cwebsocket as W3CWebSocket } from "websocket"

import { firebase } from './services'
import { PublicRoute, PrivateRoute } from './hocComponents'
import { Paint, Signup, Login, Context, context, Home } from './components'

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
`

const Main = styled.main`
    width: 60%;
    height: 100%;
    padding: 3em;
`

const Aside = styled.aside`
    width: 40%;
    height: 100%;
    padding: 3em;
`

const App = () => {
    const { state, dispatch } = React.useContext(context)

    React.useEffect(() => firebase.auth().onAuthStateChanged((user) => {
        console.log(user.email)
        dispatch({ type: 'AUTH_USER', user: user.email, isAuthed: !!user })
    }), [])

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Paint}></Route>
                <PrivateRoute path="/paint" authenticated={state.isAuthed} component={Paint}></PrivateRoute>
                <PublicRoute path="/signup" authenticated={state.isAuthed} component={Signup}></PublicRoute>
                <PublicRoute path="/login" authenticated={state.isAuthed} component={Login}></PublicRoute>
            </Switch>
        </BrowserRouter>
    )
}

const AppWithContext = () => {
    return (
        <Context>
            <App />
        </Context>
    )
}

export default AppWithContext
