import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import Create from '../Create'
import View from '../View'
import NotFound from '../NotFound'

import { AppWrapper } from './App.styles'

export default class App extends Component {
  render() {

    return (
      <AppWrapper>
        <Switch>
          <Route exact path="/" component={View} />
          <Route path="/create" component={Create} />
          <Route path="/view" component={View} />
          <Route component={NotFound} />
        </Switch>
      </AppWrapper>
    )
  }
}

// App.propTypes = {
// }
