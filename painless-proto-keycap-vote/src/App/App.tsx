import React from "react"
import styled from "styled-components"
import { Switch, Route, BrowserRouter } from "react-router-dom"

import { GlobalStyle, media } from "Theme"
import KeyCaps from "./KeyCaps"

const AppWrapper = styled.div`
  display flex;
  justify-content: center;
  box-sizing: border-box;
  padding: 0.5em 2em;
  margin: 0px auto;
  margin-bottom: 10em;
`

const Footer = styled.div`
  background-color: white;
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 2em;
  text-align: center;
  padding: 1em;
  font-weight: 900;
  
  a {
    color: #333a4a;
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
          <Footer><a href="https://www.kickstarter.com/projects/painlessprototyping/byo-build-your-own-mechanical-keyboard?ref=c7f6pd" target="_blank">Get Your Own BYO Keyboard!</a></Footer>
        </AppWrapper>
      </BrowserRouter>
    </>
  )
}

export default App
