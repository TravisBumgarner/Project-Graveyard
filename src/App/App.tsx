import React from 'react'
import { } from './components'
import { GlobalStyle } from 'Theme'

import styled from 'styled-components'

const AppWrapper = styled.div`
    max-width: 1200px;
    margin: 15px auto 30px;
    width: 100vw;
    box-sizing: border-box;
`

const App = () => {
    return (
        <AppWrapper>
            <div>Hi.</div>
        </AppWrapper>
    )
}

export default App
