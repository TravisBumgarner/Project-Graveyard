import React from 'react'
import { H2, Paragraph, Link } from './StyleExploration'

const Error = () => (
    <div>
        <H2>Whoops!</H2>
        <Paragraph>Sorry, there was an error.</Paragraph>
        <Paragraph>
            <Link href="https://forms.gle/H16iith5PhytP5D9A">Please let us know what you were doing so we can improve!</Link>
        </Paragraph>
        <Paragraph><Link href="/">Return home</Link></Paragraph>

    </div>
)

export default Error
