import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Header, Text, PageWrapper, Section } from 'shared'
import travis from 'images/travisbumgarner.png'
import melissa from 'images/melissalabbe.jpeg'

const InlineImage = styled.img`
    float: left;
    width: 40%;
    padding:0 1em 1em 0;
`

const About = () => {
    return (
        <PageWrapper>
            <Section>
                <Header size="large">Travis Bumgarner</Header>
                <InlineImage src={travis} />
                <Text>
                    Links - <a target="_blank" href="https://www.linkedin.com/in/travisbumgarner/">LinkedIn</a>, <a target="_blank" href="https://www.instagram.com/travis_the_maker/">Instagram</a>, <a target="_blank" href="https://www.instagram.com/travis_the_maker/">Blog</a>
                </Text>
                <Text>
                    Travis Bumgarner is the founder of this event.
                </Text>
                <Text>
                    During the day Travis works as a software engineer in online education. Prior to getting into software engineering, he served as a Peace Corps Volunteer in Panama. Nowadays, he likes to give back to the community in his free time. This has included mentoring with Hack.Diversity, MIT Sandbox, MIT D-Lab, and MIT IDEAS Global Challenge.
                </Text>
                <Text>
                    In Travis's free time he enjoys making (woodworking, circuits, etc.), blogging, photographing, and snowboarding.
                </Text>
                <div style={{ clear: "both" }} />
            </Section>
            <Section>
                <Header size="large">Melissa Labbe</Header>
                <InlineImage src={melissa} />
                <Text>
                    Links - <a target="_blank" href="https://www.linkedin.com/in/melissalabbe/">LinkedIn</a>
                </Text>
                <Text>
                    Melissa Labbe is a Software Engineer at Pluralsight. A firm believer in the transformative power of education and technology, she has dedicated herself to building tools that enable learners to gain valuable tech skills. Melissa actively promotes diversity and inclusion in tech by mentoring Girls Who Code and Hack.Diversity students. When she's not writing or thinking about code, she can be found running, hiking, practicing yoga, or meditating.
                </Text>
                <div style={{ clear: "both" }} />
            </Section>
        </PageWrapper>
    )
}

export default About