import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { signOut } from 'firebase/auth'

import { auth } from '../../firebase'
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
    { text: "Profile", to: "/profile" }
]

const LOGGED_OUT_VISIBLE_LINKS = [
    { text: "Log In", to: "/login" },
    { text: "Sign Up", to: "/signup" },
]

const Navigation = (props: Props) => {
    const { state, dispatch } = React.useContext(context)

    const links = [
        ...ALWAYS_VISIBLE_LINKS,
        ...(state.currentUser ? LOGGED_IN_VISIBLE_LINKS : LOGGED_OUT_VISIBLE_LINKS)
    ]

    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await signOut(auth)
            dispatch({ type: "USER_SIGNED_OUT", data: { currentUser: null } })
            navigate('/login')
        } catch {
            alert("something went wrong logging out")
        }
    }

    return (
        <StyledNav>
            {links.map(({ text, to }) => {
                return <li key={to} ><Link to={to}>{text}</Link></li>
            })}
            {state.currentUser ? <button onClick={handleLogout}>Log Out</button> : null}
        </StyledNav>
    )
}
export default Navigation