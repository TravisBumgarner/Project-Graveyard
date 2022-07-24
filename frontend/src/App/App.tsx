import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Context from 'context'
import { Navigation, Router, Header } from './components'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  NormalizedCacheObject,
} from '@apollo/client'

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache()
});

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
        <ApolloProvider client={apolloClient}>
          <Context>
            <App />
          </Context>
        </ApolloProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default InjectedApp
