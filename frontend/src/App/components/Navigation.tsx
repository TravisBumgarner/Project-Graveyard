import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

const ALWAYS_VISIBLE_LINKS = [
    { text: 'Home', to: '/home' },
    { text: 'Journal', to: '/journal' },
    { text: 'Charts', to: '/charts' },
]

const NavLi = styled.li`
    font-weight: ${(props: { isActive: boolean }) => {
        return props.isActive ? 700 : 100
    }};
`

const Navigation = () => {
    const location = useLocation()
    return (
        <nav>
            {ALWAYS_VISIBLE_LINKS.map(({ text, to }) => (
                <NavLi key={to} isActive={location.pathname === to}>
                    <Link to={to}>{text}</Link>
                </NavLi>
            ))}
        </nav>
    )
}
export default Navigation
