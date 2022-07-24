import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

import Context from 'Context'
import { Navigation, Router, Header } from './components'

const App = () => {
  React.useEffect(() => {
    axios
      .get('http://localhost:5001/ping')
      .then(r => console.log(r.data))
  }, [])


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
        <Context>
          <App />
        </Context>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default InjectedApp
