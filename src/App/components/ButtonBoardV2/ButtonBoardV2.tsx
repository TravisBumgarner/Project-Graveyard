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
            <H3>Features</H3>
            <List>
              <ListItem>
                Support for Zoom, Google Hangouts, Photoshop, and other
                applications
              </ListItem>
              <ListItem>Reprogrammable Keyboard</ListItem>
            </List>
            <H3>Customization</H3>
            <List>
              <ListItem>Choose from 6, 9, or 12 key layouts</ListItem>
            </List>
            <H3>Interested?</H3>
            <Text>
              <a href="https://forms.gle/Tx8pAJ92HubCoXtr8" target="_blank">
                Sign up to be notified when it's available
              </a>
            </Text>
          </Section>

          <Section>
            <Img src={IMG_8} />
          </Section>
        </SectionContent>
      </SectionWrapper>

      <SectionWrapper>
        <H2>History</H2>
        <SectionContent>
          <Section>
            <Img src={IMG_5} />
          </Section>
          <Section>The adventures began with the Button Board V1.0.</Section>
        </SectionContent>
      </SectionWrapper>

      <SectionWrapper>
        <H2>Interested?</H2>
        <SectionContent>
          Do the thing. Signup! Fill out the form completely to win a thing Form
          - How many buttons - What would you use this for?
        </SectionContent>
      </SectionWrapper>
    </ButtonBoardV2Wrapper>
  )
}

export default ButtonBoardV2
