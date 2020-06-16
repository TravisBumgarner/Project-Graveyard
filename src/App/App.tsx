import React from 'react'
import { GlobalStyle, PRIMARY_COLOR, SECONDARY_COLOR, media, TERTIARY_COLOR } from 'Theme'
import styled from 'styled-components'
import {
    FaTwitter as Twitter,
    FaLinkedin as LinkedIn,
    FaInstagram as Instagram,
    FaTwitch as Twitch,
    FaYoutube as YouTube
} from 'react-icons/fa'

import { Calendar } from './components'

import CAD_IMG from './media/cad.png'
import CODE_IMG from './media/code.jpg'
import CIRCUITS_IMG from './media/circuits.jpg'
import AUTHOR_IMG from './media/author.png'
import BACKGROUND_IMG from './media/background.jpg'

const AppWrapper = styled.div`
    max-width: 1000px;
    margin: 15px auto 30px;
    box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 1em 0;
`

const H1 = styled.h1`
    font-size: 3em;
    margin: 1em 0 2em;
    font-weight: 700;
`

const H2 = styled.h2`
    font-size: 2.2em;
    margin: 0.5em 0 0.5em 0;
    font-weight: 700;
`

const H3 = styled.h3`
    font-size: 1.4em;
    font-weight: 900;
    margin: 0.5em 0 0.5em 0;
`

const H4 = styled.div`
    font-size: 1em;
    margin-bottom: 0.5em;
    font-weight: 900;
    margin-top: 1.5em;
`

const Text = styled.p`
    font-size: 1em;
    line-height: 1.3em;
    margin: 0 0 1em 0;
`

const Section = styled.div`
    flex-basis: 0;
    flex-grow: 1;
    margin: 1em;

    &:first-child {
        margin-left: 0;
    }

    &:last-child {
        margin-right: 0;
    }

    ${media.tablet} {
        margin-left: 0;
        margin-right: 0;    
    }
`

const SectionWrapper = styled.div`
    margin: 4em 0 6em 0;
`

const SectionContent = styled.div`

    display: flex;
    max-width: 100%;
    justify-content: space-between;

    ${media.tablet} {
        ${(({ nowrap }: { nowrap?: boolean }) => nowrap ? '' : 'flex-direction: column;')}
    }
`

const CallToAction = styled.div`
    display: flex;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 1em;
    display: flex;
    justify-content: center;
    background-color: ${PRIMARY_COLOR};
    a {
        color: ${SECONDARY_COLOR};
    }
    & > * {
        margin-right: 1em;
    }

`

const Img = styled.img`
    width: calc(90% / 3);
    height: auto;
    border-radius: 1em;
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

const List = styled.ul`
    margin-left: 2em;
    list-style: initial;
`

const ListItem = styled.li`
    margin: 0.5em 0;
`

const EXTERNAL_LINKS = [
    {
        href: 'https://www.twitch.tv/travis_the_maker',
        content: <Twitch size="3em" />
    },
    {
        href: 'https://www.youtube.com/channel/UCFgIg95KzVg97KAeXdWbeXg',
        content: <YouTube size="3em" />
    },
    {
        href: 'https://twitter.com/travis_the_makr',
        content: <Twitter size="3em" />
    },
    {
        href: 'https://instagram.com/travis_the_maker',
        content: <Instagram size="3em" />
    },
    {
        href: 'https://www.linkedin.com/in/travisbumgarner/',
        content: <LinkedIn size="3em" />
    }
]


const ExternalLinks = EXTERNAL_LINKS.map(l => <a key={l.href} href={l.href}>{l.content}</a>)

const ExternalLinksWrapper = styled.div`
    a {
        margin: 0 1em 0 0;
    }
`

const App = () => {
    return (
        <>
            <GlobalStyle />
            <AppWrapper>
                <H1>Want to learn about 3D CAD, Code, and Circuits for free? No experience required!</H1>
                <SectionWrapper>
                    <SectionContent nowrap>
                        <Img src={CAD_IMG} />
                        <Img src={CODE_IMG} />
                        <Img src={CIRCUITS_IMG} />
                    </SectionContent>
                </SectionWrapper>
                <SectionWrapper>
                    <H2>What You'll Learn</H2>
                    <SectionContent>
                        <Section>
                            <H3>CAD!</H3>
                            <List>
                                <ListItem>Taking Measurements</ListItem>
                                <ListItem>Creating Parts in Fusion 360 and SolidWorks</ListItem>
                                <ListItem>Using External Libraries</ListItem>
                                <ListItem>And much much more!</ListItem>
                            </List>
                        </Section>
                        <Section>
                            <H3>Code!</H3>
                            <List>
                                <ListItem>Arduino Tools</ListItem>
                                <ListItem>Programming Basics with C++</ListItem>
                                <ListItem>And much much more!</ListItem>
                            </List>
                        </Section>
                        <Section>
                            <H3>Circuits!</H3>
                            <List>
                                <ListItem>Safety</ListItem>
                                <ListItem>Prototyping with Breadboards</ListItem>
                                <ListItem>PCB Design</ListItem>
                                <ListItem>And much much more!</ListItem>
                            </List>
                        </Section>
                    </SectionContent>
                </SectionWrapper>
                <SectionWrapper>
                    <SectionContent>
                        <Section>
                            <H2>Schedule</H2>
                            <Text>Workshops will be streamed live on <a target="_blank" href="https://www.twitch.tv/travis_the_maker">Twitch</a>. They'll be recorded and shared later on <a target="_blank" href="https://www.youtube.com/channel/UCFgIg95KzVg97KAeXdWbeXg">YouTube</a></Text>
                            <Text>Click on Event Names for More Details. (Schedule subject to change.)</Text>
                            <Calendar />
                        </Section>
                    </SectionContent>
                </SectionWrapper>
                <SectionWrapper>
                    <SectionContent>
                        <Section>
                            <H2>Frequently Asked Questions</H2>

                            <H3>How do I register?</H3>
                            <Text><a target="_blank" href="https://forms.gle/HuUfqtbepWBAKq1m7">Click here!</a></Text>

                            <H3>Will this be recorded?</H3>
                            <Text>Yes! Recordings will be posted on Travis the Maker's <a target="_blank" href="https://www.youtube.com/channel/UCFgIg95KzVg97KAeXdWbeXg">YouTube Channel</a>. Now would be a great time to subscribe to the channel so you don't miss out!</Text>

                            <H3>What skills do I need?</H3>
                            <Text>No previous skills needed. These talks will be very broad and I'll try and go as slow as possible. With that said, these talks will cover A LOT of information. You will walk away having an idea of next steps in your learning journey.</Text>

                            <H3>Do I need to buy anything?</H3>
                            <Text>Nope! Check out the "What do I need" question for more details.</Text>

                            <H3>What do I need?</H3>
                            <H4>CAD</H4>
                            <Text>
                                You have two options - we'll cover the basics of each in separate workshops.
                            </Text>
                            <Text>
                                The first is Fusion 360 which is free to <a target="_blank" href="https://www.autodesk.com/campaigns/fusion-360-for-hobbyists">download here</a> (Scroll to the bottom for the free version).
                            </Text>
                            <Text>
                                The second option is SolidWorks. SolidWorks is available for $40USD a year as a part of membership with the orgaization EAA. < a href="https://eaa.org/eaa/eaa-membership/eaa-member-benefits" target="_blank">Click here</a> for more details.
                            </Text>
                            <H4>Code and Circuits</H4>
                            <Text>
                                For designing PCBs, we'll be using EagleCAD which can be <a target="_blank" href="https://www.autodesk.com/products/eagle/free-download">downloaded here</a>.
                            </Text>
                            <Text>
                                You have two options we'll cover at the same time.
                            </Text>
                            <Text>
                                The first option is TinkerCAD and you can register for it <a target="_blank" href="https://www.tinkercad.com/dashboard">here</a>. TinkerCAD is a fully digital option. It lets you write code and play with digital circuits and components so you don't need to buy any parts.
                            </Text>
                            <Text>
                                The second option is to purchase an Arduino kit, <a href="https://amzn.to/3d7SBbv" target="_blank">such as this one</a>, and <a target="_blank" href="https://www.arduino.cc/en/Main/Software">download the free software</a>. If you would like to purchase your own kit or already own equipment, that's totally fine! At the very least, it is recommended that you have an Arduino, USB cable, LEDs, resistors, a breadboard, push buttons, wires, and photo reesistors. If you'd like help, please use one of the contact methods listed in the "About the Author" section.
                            </Text>
                        </Section>
                    </SectionContent>
                </SectionWrapper>
                <SectionWrapper>
                    <SectionContent>
                        <Section>
                            <H2>About the Author</H2>
                            <div style={{ display: 'flex' }}>
                                <AuthorImg src={AUTHOR_IMG} />
                                <div>
                                    <Text>Travis Bumgarner has been a maker for almost 10 years. He studied mechanical engineering in university, launched an electrical engineering startup, and now works as a software engineer. In his free time he enjoys 3D modeling and printing, creating circuits, and programming websites and micro-controllers(mini computers).</Text>
                                    <ExternalLinksWrapper>
                                        {ExternalLinks}
                                    </ExternalLinksWrapper>
                                </div>
                            </div>
                        </Section>
                    </SectionContent>
                </SectionWrapper>
            </AppWrapper>
            <CallToAction>
                <H2 style={{ textAlign: "center", fontWeight: 700, margin: 0 }}>
                    <a target="_blank" href="https://forms.gle/HuUfqtbepWBAKq1m7">Click here to Register Now!</a>
                </H2>
            </CallToAction>

            <img style={{ zIndex: -999, position: 'fixed', left: 0, boxSizing: 'border-box', top: 0, minWidth: "100vw", minHeight: "100vh", opacity: "0.1" }} src={BACKGROUND_IMG} />
        </>
    )
}

export default App
