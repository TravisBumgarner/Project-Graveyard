import React from 'react'
import styled from 'styled-components'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles';

import {
    Title,
    Home,
    Error,
    ScrollToTop,
} from './components'
import { Text } from 'shared'
import { GlobalStyle, materialTheme } from 'theme'


const AppWrapper = styled.div`
    max-width: 1200px;
    margin: 2em auto;
`

const App = () => {
    return (
        <ThemeProvider theme={materialTheme}>
            <AppWrapper>
                <GlobalStyle />
                <BrowserRouter>
                    <ScrollToTop />
                    <Title />
                    <Text>
                        Looking for an activity to do with friends, family, or coworkers? You've come to the right place!
                </Text>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route component={Error} />
                    </Switch>
                </BrowserRouter>
            </AppWrapper>
        </ThemeProvider>
    )
}

export default App