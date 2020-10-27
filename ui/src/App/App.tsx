import * as React from 'react'
import styled from 'styled-components'

import { Login, Chat, Paint } from './components'
import { establishConnection } from './client'

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
    const [isConnected, setIsConnected] = React.useState(false)
    const [user, setUser] = React.useState('Bob')

    if (!isConnected) {
        establishConnection(setIsConnected)
        return <p>Loading</p>
    }

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
                <Paint user={user} />
            </Main>
            <Aside>
                <Chat user={user} />
            </Aside>
        </Wrapper>
    )
}

export default App