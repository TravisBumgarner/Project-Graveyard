import React from 'react'
import styled from 'styled-components'

import { Navigation } from './components'
import logo from '../../../static/logo.png'
import { H1 } from '../StyleExploration'

const Img = styled.img`
    width: 150px;
    height: 150px;
    margin-right: 1em;
    margin-left: 1em;
    box-sizing: border-box;
`

const HeaderWrapper = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
`

const Header = () => {
    return (
        <HeaderWrapper>
            <H1>phrase a day</H1>
            <Img src={logo} />
            <Navigation />
        </HeaderWrapper >
    )
}

export default Header