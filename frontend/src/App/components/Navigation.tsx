import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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

const LINKS = [
    { text: "Worksheets", to: "/" },
]

const Navigation = (props: Props) => {
    return (
        <StyledNav>
            {LINKS.map(({ text, to }) => {
                return <li key={to} ><Link to={to}>{text}</Link></li>
            })}
        </StyledNav>
    )
}
export default Navigation