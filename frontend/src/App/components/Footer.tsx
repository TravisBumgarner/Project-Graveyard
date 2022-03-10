import React from 'react'
import styled from 'styled-components'

import { Paragraph, ExternalLink, colors } from 'sharedComponents'

const FooterWrapper = styled.div`
        border-top: 2px solid ${colors.PRIMARY.base};
        margin-top: 2em;
`

const Footer = () => (
    <FooterWrapper>
        <Paragraph>
            This application is currently in beta. <ExternalLink href="https://forms.gle/H16iith5PhytP5D9A">Please leave feedback!</ExternalLink>  {/* eslint-disable-line */}
        </Paragraph>
    </FooterWrapper>
)

export default Footer
