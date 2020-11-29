import React from "react"
import styled from "styled-components"

import {
  Text,
  H2,
  H3,
  Section,
  SectionWrapper,
  SectionContent,
  List,
  ListItem,

} from "sharedComponents"
import { IMG_13, IMG_14, IMG_15, IMG_16, IMG_17 } from "media"
import { Link } from "react-router-dom"
import { PRIMARY_COLOR, SECONDARY_COLOR } from 'Theme'

const ButtonBoardV2Wrapper = styled.div``

const Img = styled.img`
  width: 100%;
  height: auto;
  border-radius: 1em;
`

const CallToAction = styled.div`
  padding: 1em;
 
  background-color: ${PRIMARY_COLOR};

  h3 {
    font-size: 2em;
  }

  a {
    color: ${SECONDARY_COLOR};
    text-decoration: none;
  }

  border-radius: 1em;
`

const ButtonBoardV2 = () => {
  return (
    <ButtonBoardV2Wrapper>
      <SectionWrapper>
        <H2>Button Board V2</H2>
        <SectionContent>
          <Section>
            <CallToAction>
              <H3>
                <a href="https://forms.gle/Tx8pAJ92HubCoXtr8" target="_blank">
                  Click here to be notified when it's available!
              </a>
              </H3>
            </CallToAction>
            <H3>Learn the Basics of basics Programming and Electronics (or share with others)!</H3>
            <Text>The typical routes into programming and electronics are boring. In programming, your first task is to get the message "Hello World" to appear on the screen. In electronics, your task is to blink a light. Lame! Why not create something more interesting?
            </Text>
            <Text>With this kit, you'll learn to do some soldering and coding. When you're done you'll get to leave the experience with a completed keyboard that does what you want - from controlling video calls to your music!</Text>

            <H3>Customize Your Keyboard!</H3>
            <List>
              <ListItem>Program your keyboard to control what you want - Video Calls, Music, whatever!</ListItem>
              <ListItem>Pick from Several color schemes</ListItem>
              <ListItem>Choose 6 or 9 key layouts</ListItem>
            </List>

            <H3>I've never coded or soldered before</H3>
            <Text>
              No worries! We will provide you with video tutorials on soldering and sample code to get started. If that's not enough, we'll provide live tutorials where you can follow along and get help in real time!
            </Text>

            <H3>Resources</H3>
            <List>
              <ListItem>
                <a target="_blank" href="https://youtu.be/B64QmeoK1-o">Setup Tutorial</a>
              </ListItem>
              <ListItem>
                <a target="_blank" href="https://github.com/painlessprototyping/bb_2.1_arduino_hello_world">Code Sample</a>
              </ListItem>
            </List>
          </Section>

          <Section>
            <Img src={IMG_17} />
            <Img src={IMG_13} />
            <Img src={IMG_14} />
            <Img src={IMG_15} />
            <Img src={IMG_16} />
          </Section>
        </SectionContent>
      </SectionWrapper>
    </ButtonBoardV2Wrapper>
  )
}

export default ButtonBoardV2
