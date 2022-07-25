import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const HeaderWrapper = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
`

const Header = () => {
    return (
        <HeaderWrapper>
            <div>
                <Link style={{ textDecoration: 'none' }} to="/">
                    <h1>Life Experiments</h1>
                </Link>
            </div>
        </HeaderWrapper>
    )
}

export default Header
