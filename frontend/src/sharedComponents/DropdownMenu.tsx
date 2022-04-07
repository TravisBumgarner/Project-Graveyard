import React from 'react'
import styled from 'styled-components'

import { Button, colors } from 'sharedComponents'

const StyledNav = styled.ul`
    z-index: 998;
    position: absolute;
    width: 240px;
    border-radius: 1rem;
    right: 0;
    display: ${({ showMenu }: { showMenu: boolean }) => (showMenu ? 'block' : 'none')};
    list-style: none;
    flex-direction: row;
    padding: 0.5rem;
    background-color: ${colors.PRIMARY.lightest};
    border: 2px solid rgb(87, 226, 229);
    margin: 0.5rem;
`

type DropdownMenuProps = {
    title: string
    children: any[]
}

const DropdownMenu = ({ title, children }: DropdownMenuProps) => {
    const [showMenu, setShowMenu] = React.useState<boolean>(false)

    const handleClose = () => setShowMenu(false)

    React.useEffect(() => {
        if (showMenu) {
            window.addEventListener('click', handleClose)
        }
        return () => window.removeEventListener('click', handleClose)
    }, [showMenu])

    return (
        <div style={{ position: 'relative' }}>
            <Button variation="primary" onClick={() => setShowMenu(!showMenu)}>{title}</Button>
            <StyledNav showMenu={showMenu}>
                {children.map((child, index) => <li key={index}>{child}</li>)} {/* eslint-disable-line */}
            </StyledNav>
        </div>
    )
}
export default DropdownMenu
