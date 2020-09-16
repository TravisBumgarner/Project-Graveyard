import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/browser'

import App from './App'
import { Error } from './sharedComponents'

Sentry.init({
    dsn: 'https://a2cb1dd305a943f1bf84b1ce8032124a@o196886.ingest.sentry.io/5431447'
})

interface IProps {
}

interface IState {
    error: ErrorEvent | null
}

class SentryWrapper extends Component<IProps, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            error: null
        }
    }

    componentDidCatch(error: any, errorInfo: any) {
        this.setState({ error })
        Sentry.withScope(scope => {
            Object.keys(errorInfo).forEach((key: string) => {
                scope.setExtra(key, errorInfo[key])
            })
            Sentry.captureException(error)
        })
    }

    render() {
        if (this.state.error) {
            return <Error value="500" />
        } else {
            return this.props.children
        }
    }
}

ReactDOM.render(
    <SentryWrapper>
        <App />
    </SentryWrapper>,
    document.getElementById('root')
)
