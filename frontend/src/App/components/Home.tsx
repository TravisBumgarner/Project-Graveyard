import React from 'react'

import {
    H2, ExternalLink, ListItem, OrderedList, Paragraph,
} from './StyleExploration'

const Home = () => (
    <div>
        <H2>Heads Up!</H2>
        <Paragraph>
            This application is currently in beta. <ExternalLink href="https://forms.gle/H16iith5PhytP5D9A">Please leave feedback!</ExternalLink> {/* eslint-disable-line */}
        </Paragraph>

        <H2>Student Instructions</H2>
        <OrderedList>
            <ListItem>Create an account and log in.</ListItem>
            <ListItem>Navigate to the Student Dashboard.</ListItem>
            <ListItem>Create a worksheet and open it</ListItem>
            <ListItem>Begin adding written and recorded entires.</ListItem>
            <ListItem>When ready, submit for review!</ListItem>

        </OrderedList>

        <H2>Reviewer Instructions</H2>
        <OrderedList>
            <ListItem>Create an account and log in.</ListItem>
            <ListItem>Navigate to the Review Dashboard</ListItem>
            <ListItem>Find a worksheet to review and give it a review!</ListItem>
        </OrderedList>

    </div>
)

export default Home
