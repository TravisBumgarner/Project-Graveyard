import React from 'react'
import styled from 'styled-components'

import {
    H1, Paragraph, Link, PRIMARY,
} from './StyleExploration'

const FooterWrapper = styled.div`
        border-top: 2px solid ${PRIMARY.base};
`

const Footer = () => (
    <FooterWrapper>
        <Paragraph>
            This application is currently in beta.
            <Link href="https://forms.gle/H16iith5PhytP5D9A">Please leave feedback!</Link>
        </Paragraph>
    </FooterWrapper>
)

export default Footer
