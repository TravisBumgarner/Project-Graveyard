import React, { Component } from 'react'
// import PropTypes from 'prop-types'

import { CreateSnippetWrapper } from './CreateSnippet.styles'
import { Textbox, Button } from '../../components'

export default class CreateSnippet extends Component {
    constructor(props){
        super(props)
        this.state = {
            'who': '',
            'what': '',
            'where': '',
        }
    }

    handleInputChange = (name, value) => {
        this.setState({[name]: value})
    }

    clearForm = () => {
        this.setState({
            who: '',
            what: '',
            where: '',
        })
    }

    handleSubmit = () => {
        const {
            who,
            what,
            where
        } = this.state
        console.log(`${who}\n${what}\n${where}`)
        this.clearForm()
    }

    handleCancel = () => {
        alert('canceled')
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
                <Button onClick={this.handleSubmit}>Submit</Button>
                <Button onClick={this.handleCancel}>Cancel</Button> 
            </CreateSnippetWrapper>
        )
    }
}
