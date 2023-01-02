import React from 'react'
import styled from 'styled-components'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import {
    Title,
    Navigation,
    Home,
    Contact,
    Questions,
    Error,
    About,
    Problem,
    ScrollToTop,
    Schedule,
    AllTheInfo,
    Participate
} from './components'
import { GlobalStyle } from 'theme'


const AppWrapper = styled.div`
`

const ContentWrapper = styled.div`
    display: flex;
    margin: 0px auto;
    max-width: 1000px;
`

const SIDEBAR_WIDTH = '250px'

const Sidebar = styled.div`
    width: ${SIDEBAR_WIDTH};
`

const Main = styled.div`
    flex-grow: 1;
`

const App = () => {
    return (
        <AppWrapper>
            <GlobalStyle />
            <BrowserRouter>
                <ScrollToTop />
                <Title />
                <ContentWrapper>
                    <Sidebar>
                        <Navigation />
                    </Sidebar>
                    <Main>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/contact" component={Contact} />
                            <Route path="/questions" component={Questions} />
                            <Route path="/about" component={About} />
                            <Route path="/problem" component={Problem} />
                            <Route path="/schedule" component={Schedule} />
                            <Route path="/alltheinfo" component={AllTheInfo} />
                            <Route path="/participate" component={Participate} />
                            <Route component={Error} />
                        </Switch>
                    </Main>
                </ContentWrapper>
            </BrowserRouter>
        </AppWrapper>
    )
}

export default App