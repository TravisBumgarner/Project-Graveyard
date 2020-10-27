import * as React from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'styled-components'
import { w3cwebsocket as W3CWebSocket } from "websocket"

import { Login, Chat, Paint } from './components'

const client = new W3CWebSocket('ws://127.0.0.1:5000')

client.onopen = () => {
    console.log('WebSocket Client Connected')
}

const Wrapper = styled.div`
    margin: 20vh 20vw;
    width: 60vw;
    height: 60vw;
    display: flex;
    flex-direction: column;
`

const App = () => {
    const [user, setUser] = React.useState('')
    console.log(user)
    if (!user) {
        return (
            <Wrapper>
                <Login setUser={setUser} />
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <Chat user={user} client={client} />
            <Paint />
        </Wrapper>
    )
}

export default App