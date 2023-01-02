import React from 'react'
import styled from 'styled-components'
import { Tune, Close } from '@material-ui/icons'

const SIDEBAR_WIDTH = '200px'

const Sidebar = styled.div`
    z-index: 999;
    width: ${SIDEBAR_WIDTH};
    max-width: ${SIDEBAR_WIDTH};
    padding: 15px;
    margin-right: 15px;
    background-color: var(--background-color);

    ${({ showSidebar }: { showSidebar: boolean }) => showSidebar ? `display: block;` : `display: none;`}

    @media (max-width: 950px) {
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 0;
        height: 100vh;
        overflow-y: scroll;
        border-right: 5px solid var(--accent-color);
    }

    @media (min-width: 950px) {
        display: block;
        border-radius: 15px;
        background-color: var(--accent-color);
    }
`

const CloseSidebar = styled(Close)`
    display: none !important;

    @media (max-width: 950px) {
        display: block !important;
    }
`

export default Sidebar
export { CloseSidebar }