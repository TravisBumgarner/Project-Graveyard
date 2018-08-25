import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import { CreateSnippet, NotFound } from '../'

import { AppWrapper } from './App.styles'

export default class App extends Component {
    render() {

        return (
            <AppWrapper>
                <Switch>
                    <Route exact path="/" component={CreateSnippet} />
                    <Route path="/create" component={CreateSnippet} />
                    <Route component={NotFound} />
                </Switch>
            </AppWrapper>
        )
    }
}

// App.propTypes = {
// }
