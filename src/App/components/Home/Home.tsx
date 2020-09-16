import React from 'react'
import styled from 'styled-components'

import { media } from 'Theme'
import IMG_1 from './media/1.jpg'
import IMG_2 from './media/2.jpg'
import IMG_3 from './media/3.jpg'
import IMG_4 from './media/4.jpg'
import IMG_5 from './media/5.jpg'
import IMG_6 from './media/6.jpg'
import IMG_7 from './media/7.jpg'
import IMG_8 from './media/8.jpg'
import IMG_9 from './media/9.jpg'
import AUTHOR_IMG from './media/author.jpg'
import { Text, H2, H3, Section, SectionWrapper, SectionContent, List, ListItem } from 'sharedComponents'

const HomeWrapper = styled.div`
`

const Img = styled.img`
    width: calc(32%);
    height: auto;
    border-radius: 1em;
    margin-bottom: 2%;

    &:nth-child(3n+2){
        margin-left: 2%;
        margin-right: 2%;
    }
`

const ImgGrid = styled.div`
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

const Home = () => {
    return (
        <HomeWrapper>
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
        </HomeWrapper>
    )
}

export default Home
