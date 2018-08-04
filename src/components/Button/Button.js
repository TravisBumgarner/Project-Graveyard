import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { 
    PrimaryButton
} from './Button.styles'

export default class Button extends Component {
    render() {
        const {
            onClick,
            children,
            disabled,
        } = this.props

        return (
            <PrimaryButton
                disabled={disabled}
                onClick={onClick}
            >
                {children}
            </PrimaryButton>
        )
    }
}

Button.propTypes = {
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
}