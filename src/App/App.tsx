import React from "react"
import styled from "styled-components"
import { Switch, Route, BrowserRouter } from "react-router-dom"

import { GlobalStyle, media } from "Theme"
import {
  Header,
  Home,
  Prototyping,
  Products,
  ButtonBoardV1,
  ButtonBoardV2,
  JoinUs,
} from "./components"
import { Error } from "sharedComponents"
import { BACKGROUND_IMG } from "media"

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
        <Header />
        <AppWrapper>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/prototyping" component={Prototyping} />
            <Route
              exact
              path="/buttonboardv1"
              component={ButtonBoardV1}
            />
            <Route
              exact
              path="/buttonboardv2"
              component={ButtonBoardV2}
            />
            <Route exact path="/joinus" component={JoinUs} />
            <Route
              render={(rest) => <Error showNotFoundError={true} {...rest} />}
            />
          </Switch>
        </AppWrapper>
        <img
          style={{
            zIndex: -999,
            position: "fixed",
            left: 0,
            boxSizing: "border-box",
            top: 0,
            minWidth: "100vw",
            minHeight: "100vh",
            opacity: "0.1",
          }}
          src={BACKGROUND_IMG}
        />
      </BrowserRouter>
    </>
  )
}

export default App
