import { NavLink } from 'react-router-dom'
import React from 'react'

import colors from './colors'

type StyledNavLinkProps = {
    to: string
    text: string
    addWeightForActiveLink?: boolean
}

const StyledNavLink = ({ to, text, addWeightForActiveLink }: StyledNavLinkProps) => (
    <NavLink
        style={({ isActive }) => ({
            fontWeight: addWeightForActiveLink && isActive ? 700 : 100,
            color: colors.TERTIARY.darken,
        })}
        to={to}
    >
        {text}
    </NavLink>
)

export default StyledNavLink
