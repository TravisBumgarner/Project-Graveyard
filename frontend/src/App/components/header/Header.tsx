import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'
import { Heading, Paragraph } from 'sharedComponents'
import { context } from 'context'
import { Navigation } from './components'
import logo from '../../../static/logo.png'

const Img = styled.img`
    width: 75px;
    height: 75px;
    margin-right: 1em;
    box-sizing: border-box;
    transform: rotate(-16deg);
`

const HeaderWrapper = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;

    & > div:first-child, & > div:nth-child(2) {
        display: flex;
        align-items: center;
    }


`

const Header = () => {
    const { state } = React.useContext(context)
    return (
        <HeaderWrapper>
            <div>
                <Link to="/"> <Img src={logo} /></Link>
                <Link style={{ textDecoration: 'none' }} to="/"> <Heading.H1>phrase a day</Heading.H1></Link>
            </div>
            <div>
                <Paragraph>Welcome, {state.currentUser ? state.currentUser.phraseADay.username : 'language friend'}!</Paragraph>
                <Navigation />
            </div>
        </HeaderWrapper>
    )
}

export default Header
