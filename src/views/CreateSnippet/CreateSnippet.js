import React, { Component } from 'react'
// import PropTypes from 'prop-types'

import {
    Textbox,
    Button,
    Card
} from '../../components'

import {
    CreateSnippetWrapper,
    ControlsWrapper,
} from './CreateSnippet.styles'

export default class CreateSnippet extends Component {
    constructor(props){
        super(props)
        this.state = {
            who: '',
            what: '',
            where: '',
            activeCardIndex: 0,
            
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
            activeCardIndex: 0,
        })
    }

    handleNext = () => {
        this.setState({activeCardIndex: this.state.activeCardIndex + 1})
    }

    handlePrevious = () => {
        this.setState({activeCardIndex: this.state.activeCardIndex - 1})
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
        this.clearForm()
    }
    
    render() {
        const {
            who,
            what,
            where,
            activeCardIndex
        } = this.state

        const AllCards = [
            <Card key={0}>
                <Textbox
                    label='Who?'
                    onChange={this.handleInputChange}
                    name="who"
                    value={who}
                />
            </Card>,
            <Card key={1}>
                <Textbox
                    label='Said what?'
                    onChange={this.handleInputChange}
                    name="what"
                    value={what}
                />
            </Card>,
            <Card key={2}>
                <Textbox
                    label='Where?'
                    onChange={this.handleInputChange}
                    name="where"
                    value={where}
                />
            </Card>
        ]
        const minCardIndex = 0
        const maxCardIndex = AllCards.length - 1

        return (
            <CreateSnippetWrapper>
                {AllCards[activeCardIndex]}
                <ControlsWrapper>
                    <Button disabled={activeCardIndex === minCardIndex} onClick={this.handlePrevious}>Previous</Button>
                    <Button onClick={this.handleCancel}>Cancel</Button> 
                    {activeCardIndex === maxCardIndex
                        ? <Button onClick={this.handleSubmit}>Submit</Button>
                        : <Button onClick={this.handleNext}>Next</Button>
                    }
                </ControlsWrapper>
            </CreateSnippetWrapper>
        )
    }
}
