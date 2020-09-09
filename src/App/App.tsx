import React from 'react'
import { GlobalStyle, PRIMARY_COLOR, SECONDARY_COLOR, media, TERTIARY_COLOR } from 'Theme'
import styled from 'styled-components'
import {
    FaTwitter as Twitter,
    FaLinkedin as LinkedIn,
    FaInstagram as Instagram,
} from 'react-icons/fa'

import IMG_1 from './media/1.jpg'
import IMG_2 from './media/2.jpg'
import IMG_3 from './media/3.jpg'
import IMG_4 from './media/4.jpg'
import IMG_5 from './media/5.jpg'
import IMG_6 from './media/6.jpg'
import IMG_7 from './media/7.jpg'
import IMG_8 from './media/8.jpg'
import IMG_9 from './media/9.jpg'
import IMG_LOGO from './media/logo.png'
import AUTHOR_IMG from './media/author.jpg'
import BACKGROUND_IMG from './media/background.jpg'

const AppWrapper = styled.div`
    max-width: 1000px;
    margin: 120px auto 30px;
    box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 1em 0;
`

const H1 = styled.h1`
    font-size: 3em;
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
`

const SectionContent = styled.div`
    display: flex;
    max-width: 100%;
    justify-content: space-between;

`

const Header = styled.div`
    display: flex;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    padding: 1em;
    display: flex;
    justify-content: space-between;
    background-color: ${PRIMARY_COLOR};
    color: ${SECONDARY_COLOR};

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

const ImgGrid = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    img {
        margin-bottom: 20px;
    }

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
        href: 'https://instagram.com/travis_the_maker',
        content: <Instagram size="3em" />
    },
    {
        href: 'https://www.linkedin.com/in/travisbumgarner/',
        content: <LinkedIn size="3em" />
    },
    {
        href: 'https://twitter.com/travis_the_makr',
        content: <Twitter size="3em" />
    }
]


const ExternalLinks = EXTERNAL_LINKS.map(l => <a key={l.href} target="_blank" href={l.href}>{l.content}</a>)

const ExternalLinksWrapper = styled.div`
    display: flex;
    align-items: center;
    a {
        margin: 0 1em 0 0;
    }
`

const App = () => {
    return (
        <>
            <GlobalStyle />
            <Header>
                <div>
                    <H1>Painless Prototyping</H1>
                    <p>Your one stop, prototype shop.</p>
                </div>

                <ExternalLinksWrapper>
                    <H2 style={{ display: 'inline-block', textAlign: "center", fontWeight: 700, margin: 0 }}>
                        <a target="_blank" href="https://forms.gle/eGe1DfyE8RGc1k1p8">Let's chat!</a>
                    </H2>
                    {ExternalLinks}
                </ExternalLinksWrapper>
            </Header>
            <AppWrapper>
                <SectionWrapper>
                    <H2>Hello!</H2>
                    <SectionContent>
                        <Section>
                            <Text>
                                Got an idea that you're looking to turn into a working prototype? You've come to the right place!
                            </Text>
                        </Section>
                    </SectionContent>
                </SectionWrapper>

                <SectionWrapper>
                    <H2>Services</H2>
                    <SectionContent>
                        <Section>
                            <H3>Mechanical</H3>
                            <List>
                                <ListItem>3D Modeling</ListItem>
                                <ListItem>3D Printing</ListItem>
                                <ListItem>Metal Machining</ListItem>
                                <ListItem>Laser Cutting</ListItem>
                                <ListItem>Woodworking</ListItem>
                                <ListItem>And more!</ListItem>
                            </List>
                        </Section>
                        <Section>
                            <H3>Electrical</H3>
                            <List>
                                <ListItem>Circuit Design</ListItem>
                                <ListItem>PCB Design</ListItem>
                                <ListItem>Arduino</ListItem>
                                <ListItem>Raspberry Pi</ListItem>
                                <ListItem>ESP8266</ListItem>
                                <ListItem>And more!</ListItem>
                            </List>
                        </Section>

                        <Section>
                            <H3>Digital</H3>
                            <List>
                                <ListItem>Websites</ListItem>
                                <ListItem>Desktop Applications</ListItem>
                                <ListItem>Mobile Applications</ListItem>
                                <ListItem>And more!</ListItem>
                            </List>
                        </Section>

                    </SectionContent>
                </SectionWrapper>
                <SectionWrapper>
                    <H2>Sample Work</H2>
                    <SectionContent>
                        <ImgGrid>
                            <Img src={IMG_1} />
                            <Img src={IMG_2} />
                            <Img src={IMG_3} />
                            <Img src={IMG_4} />
                            <Img src={IMG_5} />
                            <Img src={IMG_6} />
                            <Img src={IMG_7} />
                            <Img src={IMG_8} />
                            <Img src={IMG_9} />
                        </ImgGrid>
                    </SectionContent>
                    <SectionContent>
                        <H3 style={{ textAlign: "center", fontWeight: 700, margin: 0, width: '100%' }}>
                            <a target="_blank" href="https://www.instagram.com/travis_the_maker/">View more on Instagram!</a>
                        </H3>
                    </SectionContent>
                </SectionWrapper>

                <SectionWrapper>
                    <SectionContent>
                        <Section>
                            <H2>About the Makers</H2>
                            <H3>Travis Bumgarner</H3>
                            <div style={{ display: 'flex' }}>
                                <AuthorImg src={AUTHOR_IMG} />
                                <Text>Travis has been a maker for almost 10 years. If he doesn't know how to do or make something, he'll learn the skills required - as demonstrated by the diversity of his <a href="http://travisbumgarner.com/" target="_blank">Portfolio</a>. He studied mechanical engineering in university, launched an electrical engineering startup, and now works as a software engineer. In his free time he enjoys 3D modeling and printing, creating circuits, and programming websites and micro-controllers(mini computers). </Text>
                            </div>
                        </Section>
                    </SectionContent>
                </SectionWrapper>

                <SectionWrapper>
                    <SectionContent>
                        <Section>
                            <H2>Let's Chat</H2>
                            <a target="_blank" href="https://forms.gle/eGe1DfyE8RGc1k1p8">Click here</a> and let's setup a time to chat!
                        </Section>
                    </SectionContent>
                </SectionWrapper>
            </AppWrapper>

            <img style={{ zIndex: -999, position: 'fixed', left: 0, boxSizing: 'border-box', top: 0, minWidth: "100vw", minHeight: "100vh", opacity: "0.1" }} src={BACKGROUND_IMG} />
        </>
    )
}

export default App
