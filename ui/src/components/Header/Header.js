import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { 
    H1,
    H2,
    H3
} from './Header.styles'

const allHeaders = {
    h1: H1,
    h2: H2,
    h3: H3,
}

export default class Header extends Component {
    render() {
        const {
            type,
            text
        } = this.props

        const SelectedHeader = allHeaders[type]

        return (
            <SelectedHeader>
                {text}
            </SelectedHeader>
        )
    }
}

Header.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string.isRequired
}