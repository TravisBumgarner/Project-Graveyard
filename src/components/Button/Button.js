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
        } = this.props

        return (
            <PrimaryButton onClick={onClick}>
                {children}
            </PrimaryButton>
        )
    }
}

Button.propTypes = {
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}