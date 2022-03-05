import React from 'react'
import styled from 'styled-components'

import { context } from '../..'
import { StyledNavLink } from '../../StyleExploration'

const StyledNav = styled.ul`
    list-style: none;
    flex-direction: row;
    display: flex;
    padding: 0;

    li {
        padding: 10px;
    }
`

const ALWAYS_VISIBLE_LINKS = [
    { text: 'Home', to: '/' },
]

const LOGGED_IN_VISIBLE_LINKS = [
    { text: 'Student Dashboard', to: '/student/dashboard' },
    { text: 'Reviewer Dashboard', to: '/reviewer/dashboard' },
    { text: 'Profile', to: '/profile' },
    { text: 'Log Out', to: '/logout' },
]

const LOGGED_OUT_VISIBLE_LINKS = [
    { text: 'Log In', to: '/login' },
    { text: 'Sign Up', to: '/signup' },
]

const Navigation = () => {
    const { state } = React.useContext(context)

    const links = [
        ...ALWAYS_VISIBLE_LINKS,
        ...(state.currentUser ? LOGGED_IN_VISIBLE_LINKS : LOGGED_OUT_VISIBLE_LINKS),
    ]

    return (
        <StyledNav>
            {links.map(({ text, to }) => (
                <li key={to}>
                    <StyledNavLink to={to} text={text} />
                </li>
            ))}
        </StyledNav>
    )
}
export default Navigation
