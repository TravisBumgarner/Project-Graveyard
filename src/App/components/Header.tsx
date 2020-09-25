import styled from 'styled-components'
import React from 'react'
import { Link } from 'react-router-dom'
import {
    FaTwitter as Twitter,
    FaLinkedin as LinkedIn,
    FaInstagram as Instagram,
} from 'react-icons/fa'

import { PRIMARY_COLOR, SECONDARY_COLOR, media } from 'Theme'
import { H1, H2 } from 'sharedComponents'


const HeaderWrapper = styled.div`
    display: flex;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    padding: 0.5em 1em;
    display: flex;
    justify-content: space-between;
    background-color: ${PRIMARY_COLOR};
    color: ${SECONDARY_COLOR};

    a {
        color: ${SECONDARY_COLOR};
    }
    
    & > * {
        margin-right: 1em;
    }

    ${media.tablet} {
        flex-direction: column;
        align-items: center;
        text-align: center;

    }
`

const EXTERNAL_LINKS = [
    {
        href: 'https://instagram.com/travis_the_maker',
        content: <Instagram size="2em" />
    },
    {
        href: 'https://www.linkedin.com/in/travisbumgarner/',
        content: <LinkedIn size="2em" />
    },
    {
        href: 'https://twitter.com/travis_the_makr',
        content: <Twitter size="2em" />
    }
]


const ExternalLinks = EXTERNAL_LINKS.map(l => <a key={l.href} target="_blank" href={l.href}>{l.content}</a>)

const ExternalLinksWrapper = styled.div`
    display: flex;
    align-items: center;
    a {
        margin: 0 0.5em 0 0;
    }
`

const Header = () => {
    return (
        <HeaderWrapper>
            <div>
                <Link to="/"><H1>Painless Prototyping</H1></Link>
                <p>Your one stop, prototype shop.</p>
            </div>

            <ExternalLinksWrapper>
                <H2 style={{ display: 'inline-block', textAlign: "center", fontWeight: 700, margin: 0 }}>
                    <a target="_blank" href="https://forms.gle/NcnSaG8qsPHg6iJz7">Let's chat!</a>
                </H2>
                {ExternalLinks}
            </ExternalLinksWrapper>
        </HeaderWrapper>
    )
}

export default Header