import React, { Component } from 'react'
// import PropTypes from 'prop-types'

import { ViewWrapper } from './View.styles'

import { Textbox } from '../../components'

export default class View extends Component {
    render() {
        return (
            <ViewWrapper>
                <Textbox onChange = {() => {console.log('hi')}} />
            </ViewWrapper>
        )
    }
}
