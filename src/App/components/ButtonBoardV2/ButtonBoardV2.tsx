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
import { IMG_5, IMG_8 } from "media"
import { Link } from "react-router-dom"

const ButtonBoardV2Wrapper = styled.div``

const Img = styled.img`
  width: 100%;
  height: auto;
  border-radius: 1em;
`

const ButtonBoardV2 = () => {
  return (
    <ButtonBoardV2Wrapper>
      <SectionWrapper>
        <H2>Button Board V2</H2>
        <SectionContent>
          <Section>
            <H3>Resources</H3>
            <List>
              <ListItem>
                <a target="_blank" href="https://youtu.be/B64QmeoK1-o">Setup Tutorial</a>
              </ListItem>
              <ListItem>
                <a target="_blank" href="https://github.com/painlessprototyping/bb_2.1_arduino_hello_world">Code Sample</a>
              </ListItem>
            </List>
            <H3>Features</H3>
            <List>
              <ListItem>
                Support for Zoom, Google Hangouts, Photoshop, and other
                applications
              </ListItem>
              <ListItem>Reprogrammable Keyboard</ListItem>
              <ListItem>Use as a keyboard for Arduino and other electronics projects</ListItem>
            </List>
            <H3>Customization</H3>
            <List>
              <ListItem>Choose from 6, 9, or 12 key layouts</ListItem>
            </List>
            <H3>Interested?</H3>
            <Text>
              <a href="https://forms.gle/Tx8pAJ92HubCoXtr8" target="_blank">
                Click here to be notified when it's available!
              </a>
            </Text>
          </Section>

          <Section>
            <Img src={IMG_8} />
          </Section>
        </SectionContent>
      </SectionWrapper>
    </ButtonBoardV2Wrapper>
  )
}

export default ButtonBoardV2
