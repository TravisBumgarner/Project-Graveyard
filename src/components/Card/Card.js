import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { 
    CardWrapper
} from './Card.styles'
// REFACTOR - How to name components
export default class Card extends Component {
    render() {
        const {
            children,
        } = this.props

        return (
            <CardWrapper>
                {children}
            </CardWrapper>
        )
    }
}

Card.propTypes = {
    children: PropTypes.any,
}