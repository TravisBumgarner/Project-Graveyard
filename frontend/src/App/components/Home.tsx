import React from 'react'

import { Heading, ExternalLink, List, Paragraph, } from 'sharedComponents'

const Home = () => (
    <div>
        <Heading.H2>Heads Up!</Heading.H2>
        <Paragraph>
            This application is currently in beta. <ExternalLink href="https://forms.gle/H16iith5PhytP5D9A">Please leave feedback!</ExternalLink> {/* eslint-disable-line */}
        </Paragraph>

        <Heading.H2>Student Instructions</Heading.H2>
        <List.OrderedList>
            <List.ListItem>Create an account and log in.</List.ListItem>
            <List.ListItem>Navigate to the Student Dashboard.</List.ListItem>
            <List.ListItem>Create a worksheet and open it</List.ListItem>
            <List.ListItem>Begin adding written and recorded entires.</List.ListItem>
            <List.ListItem>When ready, submit for review!</List.ListItem>

        </List.OrderedList>

        <Heading.H2>Reviewer Instructions</Heading.H2>
        <List.OrderedList>
            <List.ListItem>Create an account and log in.</List.ListItem>
            <List.ListItem>Navigate to the Review Dashboard</List.ListItem>
            <List.ListItem>Find a worksheet to review and give it a review!</List.ListItem>
        </List.OrderedList>

    </div>
)

export default Home
