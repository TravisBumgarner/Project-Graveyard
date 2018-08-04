import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { 
    TextArea
} from './Textbox.styles'

export default class Textbox extends Component {
  onChange = () => {
      const {
          onChange,
      } = this.props
      onChange()
  }

  render() {
      const {
          input
      } = this.props

      return (
          <TextArea onChange={this.onChange}>
              {input}
          </TextArea>
      )
  }
}

Textbox.propTypes = {
    onChange: PropTypes.func.isRequired,
    input: PropTypes.string.isRequired,
}