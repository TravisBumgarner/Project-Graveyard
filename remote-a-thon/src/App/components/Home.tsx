import React from 'react'
import { Link } from 'react-router-dom'

import { Header, Text, PageWrapper, Section, List } from 'shared'


const Home = () => {
    return (
        <PageWrapper>
            <Section>
                <Header size="large">Welcome!</Header>
                <Text>Com join us on <a target="_blank" href="https://join.slack.com/t/lets-pair-online/shared_invite/zt-cmfomldv-F6mtvfedSVtYwlKusjIRaw">Slack</a>!</Text>
            </Section>
            <Section>
                <Header size="large">Motivation</Header>
                <Text>There's a lot going on in the world right now and many of us are facing challenges we've never experienced before. Employees and students are going completely remote. Social events are being canceled. Medical centers are being overwhelmed. These events are the motivation for the Let's Pair Online Hackathon. Many of us find ourselves stranded in our homes with diverse skill sets, hoping to help and but are unsure of how to do so. This event will be a starting point for us to come together and contribute our skills to build a stronger community as we face a "new normal".</Text>
            </Section>
            <Section>
                <Header size="large">Potential Ideas to Hack On</Header>

                <Header size="small">
                    Problem: How can we engender the kind of spontaneous connection and collaboration that takes place in the office while everyone is remote working?
                </Header>
                <List>
                    <List.Item>
                        Create a virtual water cooler space that employees can join when they need a break. Co-workers can choose to be notified when a friend is at the water cooler.
                    </List.Item>
                    <List.Item>
                        Use speech-to-text and natural language processing to create real-time word clouds from video conference calls
                    </List.Item>
                    <List.Item>
                        Build tools to simplify hosting of virtual meetups and enable attendees to find others in their meetup group with common interests
                    </List.Item>
                    <List.Item>
                        Make a Slack integration that randomly pairs members in a channel and gives them a conversational prompt so people can connect with someone they might not otherwise have a chance to interact with and learn something about them
                    </List.Item>
                </List>

                <Header size="small">
                    Problem: With fewer opportunities to get up and walk around employees could become less physically active. What could be done to encourage active, healthy habits when working from home?
                </Header>
                <List>
                    <List.Item>Aggregate online exercise resources and create a tool that allows people to find and build an at-home fitness routine from multiple sources.</List.Item>
                    <List.Item>Build a dashboard that allows companies to set office-wide fitness goals. This could have a leaderboard and track individual as well as collective progress.</List.Item>
                    <List.Item>Create a Slack integration that lets people share their fitness goal to a channel and update when they’ve made progress on that goal. Creates a sense of accountability and channel members can encourage each other to stay on track.</List.Item>
                </List>

                <Header size="small">
                    Don't see your problem listed or want to work on your own problem? <Link to="/problem">Click here to submit your idea!</Link>
                </Header>

            </Section>
            <Section>
                <Header size="large">This isn't a medical hackathon</Header>
                <Text>There are many professionals across the world focused on everything from medical aid to supply chain management. There are also other hackathons doing this as well. Perform a search for "COVID hackathon" and look at all the results. People are doing amazing work. That said - this hackathon is not focused on those issues. As noted by the tracks above, it's about how we maintain daily routines with ourselves and our communities throughout this time.</Text>
            </Section>
            <Section>
                <Header size="large">Schedule</Header>
                <Text>Friday April 3th, 2020 - Sunday April 5th, 2020</Text>
                <Text>Schedule of events coming soon!</Text>
            </Section>
            <Section>
                <Header size="large">Location</Header>
                <Text>Remotely distributed throughout the world.</Text>
            </Section>
            <Section>
                <Header size="large">Interested?</Header>
                <Text><Link to="/participate">Click here to signup!</Link></Text>
            </Section>
            <Section>
                <Header size="large">Don't see an answer your question?</Header>
                <Text><Link to="/sponsor">Click here to submit a question.</Link></Text>
            </Section>
        </PageWrapper >
    )
}

export default Home