import React, { useContext } from 'react'

import { H2, H3, Link, ListItem, OrderedList, Paragraph, UnorderedList } from './StyleExploration'
import { context } from './Context'

const Home = () => {
    const { state, dispatch } = React.useContext(context)


    return (
        <div>
            <H2>Welcome, {state.currentUser ? state.currentUser.phraseADay.username : "learner"}!</H2>
            <H3>Heads Up!</H3>
            <Paragraph>This application is currently in beta. <Link href="https://forms.gle/H16iith5PhytP5D9A">Please leave feedback!</Link></Paragraph>

            <H3>Student Instructions</H3>
            <OrderedList>
                <ListItem>Create an account and log in.</ListItem>
                <ListItem>Navigate to User Dashboard</ListItem>
                <ListItem>Create a Worksheet with a title, description, the language you know, and the language you're learning.</ListItem>
                <ListItem>Click on View</ListItem>
                <ListItem>Begin adding written and recorded entires.</ListItem>
                <ListItem>When ready submit for your teacher</ListItem>

            </OrderedList>

            <H3>Teacher Instructions</H3>
            <OrderedList>
                <ListItem>Create an account and log in.</ListItem>
                <ListItem>Navigate to Review Dashboard</ListItem>
                <ListItem>Find a worksheet to review and give it a review!</ListItem>
            </OrderedList>

        </div>
    )
}

export default Home