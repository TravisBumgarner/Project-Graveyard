import React from "react"
import styled from "styled-components"
import { Switch, Route, BrowserRouter } from "react-router-dom"

import { GlobalStyle, media } from "Theme"
import KeyCaps from "./KeyCaps"

const AppWrapper = styled.div`
  max-width: 1000px;
  margin: 140px auto 30px;
  box-sizing: border-box;
  box-sizing: border-box;
  padding: 0 1em 0;

  ${media.tablet} {
    margin-top: 150px;
  }
`

const App = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <AppWrapper>
          <Switch>
            <Route component={KeyCaps} />
          </Switch>
        </AppWrapper>
      </BrowserRouter>
    </>
  )
}

export default App
