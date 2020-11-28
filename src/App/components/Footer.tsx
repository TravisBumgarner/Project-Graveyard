import styled from 'styled-components'
import React from 'react'
import { PRIMARY_COLOR, SECONDARY_COLOR, media } from 'Theme'
import { H1, H2 } from 'sharedComponents'


const FooterWrapper = styled.div`
    display: flex;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 0.5em 1em;
    display: flex;
    justify-content: center;
    background-color: ${PRIMARY_COLOR};
    
    z-index: 999;
    h2 {
        margin: 0.5em;
        
    }

    a {
        color: ${SECONDARY_COLOR};
    }
`



const Footer = () => {
    return (
        <FooterWrapper>
            <H2><a target="_blank" href="https://forms.gle/DXsBoCmJhyBsvYacA">Vote now for your favorite keyboard color schemes!</a></H2>
        </FooterWrapper>
    )
}

export default Footer