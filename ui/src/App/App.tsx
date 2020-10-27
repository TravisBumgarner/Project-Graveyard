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
    display: flex;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
`

const Main = styled.main`
    width 60%;
    height: 100%;
    padding: 3em;
`

const Aside = styled.aside`
    width 40%;
    height: 100%;
    padding: 3em;
`

const App = () => {
    const [user, setUser] = React.useState('Bob')
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
            <Main>
                <Paint />
            </Main>
            <Aside>
                <Chat user={user} client={client} />
            </Aside>
        </Wrapper>
    )
}

export default App