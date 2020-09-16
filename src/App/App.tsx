import React from 'react'
import styled from 'styled-components'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import { GlobalStyle, PRIMARY_COLOR, SECONDARY_COLOR, media, TERTIARY_COLOR } from 'Theme'
import { Header, Home } from './components'
import BACKGROUND_IMG from './media/background.jpg'

const AppWrapper = styled.div`
    max-width: 1000px;
    margin: 140px auto 30px;
    box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 1em 0;

    ${media.tablet}{
        margin-top: 150px;
    }
`

const App = () => {
    return (
        <>
            <GlobalStyle />
            <Header />
            <AppWrapper>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                    </Switch>
                </BrowserRouter>
            </AppWrapper>

            <img style={{ zIndex: -999, position: 'fixed', left: 0, boxSizing: 'border-box', top: 0, minWidth: "100vw", minHeight: "100vh", opacity: "0.1" }} src={BACKGROUND_IMG} />
        </>
    )
}

export default App
