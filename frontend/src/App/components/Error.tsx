import React from 'react'
import {
    H2, Paragraph, ExternalLink, StyledNavLink
} from './StyleExploration'

const Error = () => (
    <div>
        <H2>Whoops!</H2>
        <Paragraph>Sorry, there was an error.</Paragraph>
        <Paragraph>
            <ExternalLink
                href="https://forms.gle/H16iith5PhytP5D9A"
            >Please let us know what you were doing so we can improve!
            </ExternalLink>
        </Paragraph>
        <Paragraph><StyledNavLink to="/" text="Return Home" /></Paragraph>

    </div>
)

export default Error
