import React, { Component } from 'react'
// import PropTypes from 'prop-types'

import { CreateSnippetWrapper } from './CreateSnippet.styles'
import { Textbox } from '../../components'

export default class CreateSnippet extends Component {
    constructor(props){
        super(props)
        this.state = {
            'who': 'whooo',
            'what': 'whattt',
            'where': 'wherreee',
        }
    }

    handleInputChange = (name, value) => {
        this.setState({[name]: value})
    }
    
    render() {
        const {
            who,
            what,
            where
        } = this.state

        return (
            <CreateSnippetWrapper>
                <Textbox
                    label='Who?'
                    onChange={this.handleInputChange}
                    name="who"
                    value={who}
                />
                <Textbox
                    label='Said what?'
                    onChange={this.handleInputChange}
                    name="what"
                    value={what}
                />
                <Textbox
                    label='Where?'
                    onChange={this.handleInputChange}
                    name="where"
                    value={where}
                />
            </CreateSnippetWrapper>
        )
    }
}
