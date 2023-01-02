import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'
import { colors, Heading } from 'sharedComponents'
import { Navigation } from './components'

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
    return (
        <HeaderWrapper>
            <div>
                <Link style={{ textDecoration: 'none' }} to="/">
                    <Heading.H1>
                        <span style={{ color: colors.SECONDARY.base }}>phrase</span>
                        <span style={{ color: colors.PRIMARY.base }}>a</span>
                        <span style={{ color: colors.ALERT.base }}>day</span>
                    </Heading.H1>
                </Link>
            </div>
            <div>
                <Navigation />
            </div>
        </HeaderWrapper>
    )
}

export default Header
