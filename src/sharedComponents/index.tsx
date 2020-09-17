import styled from 'styled-components'

import Error from './Error'
import { GlobalStyle, PRIMARY_COLOR, SECONDARY_COLOR, media } from 'Theme'

const H1 = styled.h1`
    font-size: 2.5em;
    font-weight: 700;

    ${media.desktop}{
        font-size: 2em;
    }
`

const H2 = styled.h2`
    font-size: 2em;
    margin: 0.5em 0 1em 0;
    font-weight: 700;

    ${media.desktop}{
        font-size: 1.4em;
    }
`

const H3 = styled.h3`
    font-size: 1.4em;
    font-weight: 900;
    margin: 0.5em 0 0.5em 0;

    ${media.desktop}{
        font-size: 1em;
    }
`

const Text = styled.p`
    font-size: 1em;
    line-height: 1.3em;
    margin: 0 0 1em 0;
`

const Section = styled.div`
    flex-basis: 0;
    flex-grow: 1;
    margin: 0 1em;

    &:first-child {
        margin-left: 0;
    }

    &:last-child {
        margin-right: 0;
    }

    ${media.tablet} {
        margin-left: 0;
        margin-right: 0;    
    }
`

const SectionWrapper = styled.div`
    margin: 3em 0;
`

const SectionContent = styled.div`
    display: flex;
    max-width: 100%;
    justify-content: space-between;

    ${media.tablet} {
        flex-direction: column;
    }
`

const List = styled.ul`
    margin-left: 2em;
    list-style: initial;
`

const ListItem = styled.li`
    margin: 0.5em 0;
`

export {
    H1,
    H2,
    H3,
    Text,
    SectionContent,
    Section,
    SectionWrapper,
    List,
    ListItem,
    Error
}