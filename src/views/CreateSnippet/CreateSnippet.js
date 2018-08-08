import React, { Component } from 'react'
// import PropTypes from 'prop-types'

import {
    TextField,
    Button,
    Header,
} from '../../components'

import {
    CreateSnippetWrapper,
    ControlsWrapper,
    FormCard,
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
            <FormCard key={0}>
                <Header text='Who?' type='h2' />
                <TextField
                    onChange={this.handleInputChange}
                    name="who"
                    value={who}
                    autoFocus
                />
            </FormCard>,
            <FormCard key={1}>
                <Header text='Said What?' type='h2' />
                <TextField
                    onChange={this.handleInputChange}
                    name="what"
                    value={what}
                    autoFocus
                    multiline
                />
            </FormCard>,
            <FormCard key={2}>
                <Header text='Where?' type='h2' />
                <TextField
                    onChange={this.handleInputChange}
                    name="where"
                    value={where}
                    autoFocus
                />
            </FormCard>
        ]
        const minCardIndex = 0
        const maxCardIndex = AllCards.length - 1

        return (
            <CreateSnippetWrapper>
                {AllCards[activeCardIndex]}
                <ControlsWrapper>
                    <Button
                        disabled={activeCardIndex === minCardIndex}
                        onClick={this.handlePrevious}
                    >
                        Previous
                    </Button>
                    <Button onClick={this.handleCancel} tabIndex={-1}>Cancel</Button> 
                    {activeCardIndex === maxCardIndex
                        ? <Button onClick={this.handleSubmit}>Submit</Button>
                        : <Button onClick={this.handleNext}>Next</Button>
                    }
                </ControlsWrapper>
            </CreateSnippetWrapper>
        )
    }
}
