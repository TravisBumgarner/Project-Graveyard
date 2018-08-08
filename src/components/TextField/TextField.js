import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { 
    TextArea,
    Input,
    Label,
    TextFieldWrapper,
} from './TextField.styles'

export default class TextField extends Component {
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
            multiline,
        } = this.props

        return (
            <TextFieldWrapper>
                <Label>
                    {label}
                </Label>
                {multiline 
                    ? (
                        <TextArea
                            autoFocus={autoFocus}
                            onChange={this.onChange}
                            value={value}
                            name={name}
                        />
                    )
                    : (
                        <Input
                            autoFocus={autoFocus}
                            onChange={this.onChange}
                            value={value}
                            name={name}
                        />
                    )
                }

            </TextFieldWrapper>
        )
    }
}

TextField.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    autoFocus: PropTypes.bool,
    multiline: PropTypes.bool,
}