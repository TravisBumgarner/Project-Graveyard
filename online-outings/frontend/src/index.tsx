import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import * as Sentry from '@sentry/browser'

import { Error } from './App/components'
import App from './App'

Sentry.init({
    dsn: 'https://613fc54d52d9496ab1d8b68e49473f18@sentry.io/5169575'
})

class SentryWrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null
        }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error })
        Sentry.withScope(scope => {
            Object.keys(errorInfo).forEach(key => {
                scope.setExtra(key, errorInfo[key])
            })
            Sentry.captureException(error)
        })
    }

    render() {
        if (this.state.error) {
            return <Error />
        } else {
            return this.props.children
        }
    }
}

ReactDOM.render(
    <SentryWrapper>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </SentryWrapper>,
    document.getElementById('root')
)  