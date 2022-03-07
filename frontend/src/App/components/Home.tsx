import React from 'react'

import {
    H2, H3, ExternalLink, ListItem, OrderedList, Paragraph,
} from './StyleExploration'
import { context } from './Context'

const Home = () => {
    const { state } = React.useContext(context)

    return (
        <div>
            <H2>
                Welcome, {state.currentUser ? state.currentUser.phraseADay.username : 'language friend'}!
            </H2>
            <H3>Heads Up!</H3>
            <Paragraph>
                This application is currently in beta. <ExternalLink href="https://forms.gle/H16iith5PhytP5D9A">Please leave feedback!</ExternalLink> {/* eslint-disable-line */}
            </Paragraph>

            <H3>Student Instructions</H3>
            <OrderedList>
                <ListItem>Create an account and log in.</ListItem>
                <ListItem>Navigate to the Student Dashboard.</ListItem>
                <ListItem>Create a worksheet and open it</ListItem>
                <ListItem>Begin adding written and recorded entires.</ListItem>
                <ListItem>When ready, submit for review!</ListItem>

            </OrderedList>

            <H3>Reviewer Instructions</H3>
            <OrderedList>
                <ListItem>Create an account and log in.</ListItem>
                <ListItem>Navigate to the Review Dashboard</ListItem>
                <ListItem>Find a worksheet to review and give it a review!</ListItem>
            </OrderedList>

        </div>
    )
}

export default Home
