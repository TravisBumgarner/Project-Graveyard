import React from 'react'
import styled from 'styled-components'

import { media } from 'Theme'
import { Text, H2, H3, Section, SectionWrapper, SectionContent, List, ListItem } from 'sharedComponents'

const HomeWrapper = styled.div`
`

const AuthorImg = styled.img`
    width: 30%;
    height: auto;
    border-radius: 1em;
    height: 0%;
    max-width: 230px;
    margin: 0 2em 0 0;

    ${media.tablet} {
        max-width: 150px;
        margin-right: 1em;
    }
`

const Home = () => {
    return (
        <HomeWrapper>
            <SectionWrapper>
                <H2>What can we help you with today?</H2>
                <SectionContent>
                    <Section>
                        <H3>Prototyping Services</H3>
                    </Section>
                    <Section>
                        <H3>Features</H3>
                    </Section>
                    <Section>
                        <H3>Features</H3>
                    </Section>
                </SectionContent>
            </SectionWrapper>
        </HomeWrapper>
    )
}

export default Home
