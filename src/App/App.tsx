import React from "react"
import styled from "styled-components"
import { Switch, Route, BrowserRouter } from "react-router-dom"

import { GlobalStyle, media } from "Theme"
import KeyCaps from "./KeyCaps"

const AppWrapper = styled.div`
  height: 100vh;
  display flex;
  justify-content: center;
  box-sizing: border-box;
  padding: 2em;
  margin: 0px auto;
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
