import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Header, Text, PageWrapper, Section } from 'shared'

const AllTheInfo = () => {
    return (
        <PageWrapper>
            <Section>
                <Header size="large">All The Info</Header>
                <Text>This page is a work in progress. </Text>
            </Section>
            <Section>
                <Header size="large">Code of Conduct</Header>
                <Text>To be discussed.</Text>
            </Section>
            <Section>
                <Header size="large">How We'll Hack</Header>
                <Header size="medium">Tools Required</Header>
                <Text>Please make sure you've joined Slack and signed up as a participant. You can do both via the links in the navigation. Please make sure to also download Zoom video conferencing software.</Text>

                <Header size="medium">Team Formation</Header>
                <Text>Team formation will happen on Slack in the #general channel. Post what you're working on there. You'll also be able to request team members if you need any.</Text>

                <Header size="medium">Projects</Header>
                <Text>Once your team is formed, you can register it on Hackaday <a target="_blank" href="https://hackaday.io/hackathon/170518/details/">here</a>.</Text>

                <Header size="medium">Presentations</Header>
                <Text>Presentations will happen on Sunday afternoon. Check the calendar for the exact time. If you can't make it - be sure to create a video recording of your project ahead of time so we can share it.</Text>
            </Section>
        </PageWrapper>
    )
}

export default AllTheInfo