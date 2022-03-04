import React from 'react'
import styled from 'styled-components'

import { Navigation } from './components'
import logo from '../../../static/logo.png'
import { H1 } from '../StyleExploration'

const Img = styled.img`
    width: 75px;
    height: 75px;
    margin-right: 1em;
    margin-left: 1em;
    box-sizing: border-box;
`

const HeaderWrapper = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;

    & > div:first-child {
        display: flex;
        align-items: center;
    }
`

const Header = () => {
    return (
        <HeaderWrapper>
            <div>
                <Img src={logo} />
                <H1>phrase a day</H1>
            </div>
            <div>
                <Navigation />
            </div>
        </HeaderWrapper >
    )
}

export default Header