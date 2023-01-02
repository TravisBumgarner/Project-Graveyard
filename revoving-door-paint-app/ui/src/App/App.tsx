import * as React from 'react'
import styled from 'styled-components'
import { w3cwebsocket as W3CWebSocket } from "websocket"

import { Paint, Chat, Login, Context, context } from './components'

const client = new W3CWebSocket('ws://127.0.0.1:5000')

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

    client.onmessage = (message) => {
        const action = JSON.parse(message.data);
        console.log(action)
        switch (action.type as 'TRANSMIT_MESSAGE' | 'SETUP_PIXELS' | 'SET_PIXEL') {
            case 'TRANSMIT_MESSAGE':
                console.log('why')
                dispatch(action)
                break
            case 'SETUP_PIXELS':
                dispatch(action)
                break
            case 'SET_PIXEL':
                console.log('reducer app', action)
                dispatch(action)
                break
            default:
                console.log('uncaught action')
                break
        }
    }

    if (!state.hasConnected) {
        client.onopen = (message) => {
            dispatch({ type: 'CONNECTED', })
        }
        return <p>Loading</p>
    }

    if (!state.user) {
        return (
            <Wrapper>
                <Login />
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <h1>Hello {state.user}</h1>
            <Main>
                <Paint />
            </Main>
            <Aside>
                <Chat />
            </Aside>
        </Wrapper>
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
export { client }