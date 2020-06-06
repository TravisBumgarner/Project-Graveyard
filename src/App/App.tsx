import React from 'react'
import { GlobalStyle, PRIMARY_COLOR, SECONDARY_COLOR, media } from 'Theme'

import styled from 'styled-components'

import CAD_IMG from './media/cad.png'
import CODE_IMG from './media/code.jpg'
import CIRCUITS_IMG from './media/circuits.png'
import AUTHOR_IMG from './media/author.png'
import BACKGROUND_IMG from './media/background.jpg'

const AppWrapper = styled.div`
    max-width: 1200px;
    margin: 15px auto 30px;
    width: 100vw;
    box-sizing: border-box;
    text-align: center;
`

const H1 = styled.h1`
    font-size: 3em;
    padding: 1em;
    font-weight: 700;
`

const H2 = styled.h2`
    font-size: 1.8em;
    margin-bottom: 1em;
    font-weight: 700;
`

const H3 = styled.h3`
    font-size: 1.4em;
    margin-bottom: 0.5em;
`

const Text = styled.p`
    font-size: 1em;
    line-height: 1.3em;
    margin: 0 0 1em 0;
`

const Section = styled.div`
    text-align: left;
    flex-basis: 0;
    flex-grow: 1;
    margin: 5em 0;
    margin: 1em;
`

const SectionWrapper = styled.div`
    margin: 2em;
    display: flex;
    max-width: 100%;
    justify-content: space-between;

    ${media.tablet} {
        flex-direction: column;
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
    width: 100%;
    height: auto;
    border-radius: 1em;

    ${media.tablet} {
    }
`

const AuthorImg = styled.img`
    width: 30%;
    height: auto;
    border-radius: 1em;
    height: 0%;
    min-width: 230px;
    margin: 0 2em 0 0;

    ${media.tablet} {
        width: 150px;
        margin-right: 1em;
    }
`

const ImageAndTextWrapper = styled.div`
    width: 30%;
    & > ${H3} {
        display: none;
    }
    ${media.tablet} {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        & > ${H3} {
            display: initial;
        }
        & > * {
            width: 50%;
        }
    }

`


const App = () => {
    return (
        <>
            <GlobalStyle />
            <AppWrapper>
                <H1>Want to learn about 3D CAD, code, and circuits for free? No experience required!</H1>
                <SectionWrapper>
                    <ImageAndTextWrapper><Img src={CAD_IMG} /><H3>CAD!</H3></ImageAndTextWrapper>
                    <ImageAndTextWrapper><H3>Code!</H3><Img src={CODE_IMG} /></ImageAndTextWrapper>
                    <ImageAndTextWrapper><Img src={CIRCUITS_IMG} /><H3>Circuits!</H3></ImageAndTextWrapper>
                </SectionWrapper>
                <SectionWrapper>
                    <Section>
                        <H2>About the Author</H2>
                        <div style={{ display: 'flex' }}>
                            <AuthorImg src={AUTHOR_IMG} />
                            <div>
                                <Text>Travis Bumgarner has been a maker for almost 10 years. He studied mechanical engineering in university, launched an electrical engineering startup, and now works as a software engineer. In his free time he enjoys 3D modeling and printing, creating circuits, and programming websites and micro-controllers(mini computers).</Text>
                                <Text>Check him out on <a target="_blank" href="https://www.instagram.com/travis_the_maker">Instagram</a> and <a target="_blank" href="https://twitter.com/travis_the_makr">Twitter</a>.</Text>
                            </div>
                        </div>
                    </Section>
                </SectionWrapper>
                <SectionWrapper>
                    <Section>
                        <H2>When?</H2>
                        <Text>July 6th - July 10th</Text>
                        <Text>First Session: 10am - 12pm EST</Text>
                        <Text>Second Session: 2pm - 4pm EST</Text>
                    </Section>
                    <Section>
                        <H2>What?</H2>
                        <Text>A series of classes related to CAD, code, and circuits. Register below for more details!</Text>
                    </Section>
                    <Section>
                        <H2>Where?</H2>
                        <Text>It will be streamed live on <a target="_blank" href="https://www.twitch.tv/travis_the_maker">Twitch</a>.</Text>
                    </Section>
                </SectionWrapper>
            </AppWrapper>
            <CallToAction>
                <H2 style={{ textAlign: "center", fontWeight: 700 }}>
                    <a target="_blank" href="https://forms.gle/HuUfqtbepWBAKq1m7">Click here to Register Now!</a>
                </H2>
            </CallToAction>
            <img style={{ zIndex: -999, position: 'fixed', left: 0, top: 0, minWidth: "100vw", minHeight: "100vh", opacity: "0.1" }} src={BACKGROUND_IMG} />
        </>
    )
}

export default App
