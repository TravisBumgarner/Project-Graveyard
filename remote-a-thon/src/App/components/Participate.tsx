import React from 'react'
import styled from 'styled-components'

import { Header, Text, PageWrapper, Section } from 'shared'

const InlineImage = styled.img`
    float: left;
    width: 40%;
    padding:0 1em 1em 0;
`

const About = () => {
    return (
        <PageWrapper>
            <Section>
                <Header size="large">Registration </Header>
                <Text>
                    Registration has moved <a target="_blank" href="https://hackaday.io/hackathon/170518-remote-responsibilities-hackathon">here</a>.
                </Text>
            </Section>
        </PageWrapper>
    )
}

export default About