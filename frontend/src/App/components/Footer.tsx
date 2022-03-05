import React from 'react'
import styled from 'styled-components'

import {
    Paragraph, ExternalLink, PRIMARY,
} from './StyleExploration'

const FooterWrapper = styled.div`
        border-top: 2px solid ${PRIMARY.base};
        margin-top: 2em;
`

const Footer = () => (
    <FooterWrapper>
        <Paragraph>
            This application is currently in beta.
            <ExternalLink href="https://forms.gle/H16iith5PhytP5D9A">Please leave feedback!</ExternalLink>
        </Paragraph>
    </FooterWrapper>
)

export default Footer
