import React, { Component } from 'react'
// import PropTypes from 'prop-types'

import Button from '../../components/Button'

import { CreateWrapper } from './Create.styles'

export default class Create extends Component {
  render() {
    return (
      <CreateWrapper>
        Create
        <Button />
      </CreateWrapper>
    )
  }
}
