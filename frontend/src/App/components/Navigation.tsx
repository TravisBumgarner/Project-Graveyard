import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { context } from '.'


const StyledNav = styled.ul`
    list-style: none;
    flex-direction: row;
    display: flex;

    li {
        padding: 10px;
    }
`


type Props = {
}

const ALWAYS_VISIBLE_LINKS = [
    { text: "Home", to: "/" },
]

const LOGGED_IN_VISIBLE_LINKS = [
    { text: "User Dashboard", to: "/user-dashboard" },
    { text: "Review Dashboard", to: "/review-dashboard" },
    { text: "Profile", to: "/profile" },
    { text: "Log Out", to: "/logout" }
]

const LOGGED_OUT_VISIBLE_LINKS = [
    { text: "Log In", to: "/login" },
    { text: "Sign Up", to: "/signup" },
]

const Navigation = (props: Props) => {
    const { state } = React.useContext(context)

    const links = [
        ...ALWAYS_VISIBLE_LINKS,
        ...(state.currentUser ? LOGGED_IN_VISIBLE_LINKS : LOGGED_OUT_VISIBLE_LINKS)
    ]

    return (
        <StyledNav>
            {links.map(({ text, to }) => {
                return <li key={to} ><Link to={to}>{text}</Link></li>
            })}
        </StyledNav>
    )
}
export default Navigation