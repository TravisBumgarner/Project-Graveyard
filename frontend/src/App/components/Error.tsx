import React from 'react'
import { H2, Paragraph, Link } from './StyleExploration'

const Error = () => {
    return (
        <div>
            <H2>Whoops!</H2>
            <Paragraph>Sorry, there was an error, please try again later.</Paragraph>
            <Paragraph> <Link href="https://forms.gle/H16iith5PhytP5D9A">Please let us know what you were doing so we can improve!</Link></Paragraph>

        </div>
    )
}

export default Error