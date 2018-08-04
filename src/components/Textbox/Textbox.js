import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { 
    TextArea,
    Label,
    TextBoxWrapper,
} from './Textbox.styles'

// REFACTOR - Look at how the function onChange is handled in other libraries

export default class Textbox extends Component {
    onChange = (e) => {
        const {
            onChange,
        } = this.props
        onChange(e.target.name, e.target.value)
    }

    render() {
        const {
            value,
            label,
            name,
            autoFocus,
        } = this.props

        return (
            <TextBoxWrapper>
                <Label>
                    {label}
                </Label>
                <TextArea
                    autoFocus={autoFocus}
                    onChange={this.onChange}
                    value={value}
                    name={name}
                />
            </TextBoxWrapper>
        )
    }
}

Textbox.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    autoFocus: PropTypes.bool,
}