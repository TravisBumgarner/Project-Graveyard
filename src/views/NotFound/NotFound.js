import React, { Component } from 'react'

import { NotFoundWrapper } from './NotFound.styles'

export default class NotFound extends Component {
  render() {
    return (
      <NotFoundWrapper>
        The page you were looking for was not found.
      </NotFoundWrapper>
    )
  }
}
