import React from 'react'
import { Link } from 'react-router-dom'

import { Header, Text, PageWrapper, Section } from 'shared'

const questions = [
    {
        question: "Do I need to be technical?",
        answer: "No! You could do anything from building a website to creating a business plan."
    },
    {
        question: "Will there be judging and prizes?",
        answer: "This is an informal hackathon. No judges or prizes - just presentations."
    },
    {
        question: "How will projects be presented?",
        answer: "Presentations will happen Sunday afternoon/evening on Zoom. For those that cannot attend, there is a deadline on the schedule for when video recordings must be submitted."
    },
    {
        question: "Do time zones matter?",
        answer: "Mostly no. Some of the events happening throughout the duration of the hackathon will be live but will also be recorded to share with others who might be busy or asleep when they happen."
    },
    {
        question: "What happened to the tracks on the home page?",
        answer: "To offer a better experience for everyone involved - we decided to focus on one challenge at a time. We will try setup reoccurring hackathons to tackle issues one at a time. Future hackathons could include Digital Diversion (having fun online), Mental Management (how to take care of yourself), Household Harmony (How to take care of your roommates, family, and friends)."
    },
]

const Questions = () => {
    const Questions = questions.map(({ question, answer }, index) => (
        <div key={index}>
            <Header size="medium">{question}</Header>
            <Text>{answer}</Text>
        </div>
    ))

    return (
        <PageWrapper>
            <Section>
                <Header size="large">Don't see an answer your question?</Header>
                <Text><Link to="/sponsor">Click here to submit a question.</Link></Text>
            </Section>

            <Section>
                <Header size="large">FAQ</Header>
                {Questions}
            </Section>
        </PageWrapper>
    )
}

export default Questions