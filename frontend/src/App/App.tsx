import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'

import { Body, Title } from 'sharedComponents'
import { Navigation, Router, Header } from './components'

const App = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Header />
        <Navigation />
      </div>
      <Router />
    </div>
  )
}

class ErrorBoundary extends React.Component<{}, { hasError: boolean, error: string }> {
  constructor(props: any) {
      super(props)
      this.state = {
          hasError: false,
          error: ''
      }
  }

  static getDerivedStateFromError() {
      return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
      this.setState({ error: `${JSON.stringify(error.message)}\n${JSON.stringify(errorInfo)}` })
  }

  render() {
      if (this.state.hasError) {
          return (
              <>
                  <h1>Something went wrong.</h1>
                  <p>Message: ${this.state.error}</p>
              </>
          )
      }

      return this.props.children
  }
}

const InjectedApp = () => {
  return (
      <ErrorBoundary>
          <BrowserRouter>
                  <App />
          </BrowserRouter>
      </ErrorBoundary>
  )
}

export default InjectedApp
