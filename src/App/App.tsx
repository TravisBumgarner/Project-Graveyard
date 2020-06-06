import React from 'react'
import { GlobalStyle, PRIMARY_COLOR, SECONDARY_COLOR } from 'Theme'

import styled from 'styled-components'

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
`

const H2 = styled.h2`
    font-size: 1.8em;
    margin-bottom: 0.5em;
`

const H3 = styled.h3`
    font-size: 1.4em;
    margin-bottom: 0.5em;
`

const Text = styled.p`
    font-size: 1em;
    line-height: 1.3em;
`

const Section = styled.div`
    text-align: left;
    flex-basis: 0;
    flex-grow: 1;
    margin: 1em;
`

const SectionWrapper = styled.div`
    margin: 2em;
    display: flex;
`

const CallToAction = styled.div`
    display: flex;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 1em;
    background-color: ${PRIMARY_COLOR};
    color: ${SECONDARY_COLOR};

    & > * {
        margin-right: 1em;
    }

`

const App = () => {
    const [email, setEmail] = React.useState('')
    const handleSubmit = () => console.log(email)

    return (
        <>
            <GlobalStyle />
            <AppWrapper>
                <H1>Want to learn about 3D CAD, code, and circuits from scratch?</H1>
                <SectionWrapper>
                    <div style={{ width: '400px', height: '400px', backgroundColor: 'white' }}></div>
                    <div style={{ width: '400px', height: '400px', backgroundColor: 'green' }}></div>
                    <div style={{ width: '400px', height: '400px', backgroundColor: 'red' }}></div>
                </SectionWrapper>
                <SectionWrapper>
                    <Section>
                        <H2>About the Author</H2>
                        <Text>Travis Bumgarner has been a maker for almost 10 years. He studied mechanical engineering in university, launched an electrical engineering startup, and now works as a software engineer. In his free time he enjoys 3D modeling and printing, creating circuits, and programming websites and microcontrollers.</Text>
                    </Section>
                </SectionWrapper>
                <SectionWrapper>
                    <Section>
                        <H2>When?</H2>
                        <ul>
                            <li>July 6th - July 10th</li>
                            <li>First Session: 10am - 12pm EST</li>
                            <li>Second Session: 2pm - 12pm EST</li>
                        </ul>
                    </Section>
                    <Section>
                        <H2>What?</H2>
                        <Text>A series of classes related to CAD, code, and circuits. Sign up below for more details!</Text>
                    </Section>
                    <Section>
                        <H2>Where?</H2>
                        <Text>It will be streamed live on Twitch.</Text>
                    </Section>
                </SectionWrapper>
            </AppWrapper>
            <CallToAction>
                <H2 style={{ margin: '0 0.5em 0 0' }}>Register Now!</H2>
                <input
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    value={email}
                    placeholder="Email Address"
                />
                <input onClick={handleSubmit} type="submit" />
            </CallToAction>
        </>
    )
}

export default App
