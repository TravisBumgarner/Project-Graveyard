import React from 'react'
import { Heading, Paragraph, ExternalLink, StyledNavLink } from 'sharedComponents'

const Error = () => (
    <div>
        <Heading.H2>Whoops!</Heading.H2>
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
