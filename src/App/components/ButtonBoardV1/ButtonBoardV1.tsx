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
import { IMG_5, IMG_12 } from "media"

const ButtonBoardV1Wrapper = styled.div``

const Img = styled.img`
  width: 100%;
  height: auto;
  border-radius: 1em;
`

const ButtonBoardV1 = () => {
  return (
    <ButtonBoardV1Wrapper>
      <SectionWrapper>
        <H2>Button Board V1</H2>
        <SectionContent>
          <Section>
            <H3>Features</H3>
            <List>
              <ListItem>Compatible with Arduino, Raspberry Pi, and many other boards as well! (Code Samples: <a target="_blank" href="https://github.com/painlessprototyping/bb_rasp_pi_hello_world/blob/master/button_board_hello_world.py">Raspberry Pi</a>, <a target="_blank" href="https://github.com/painlessprototyping/bb_arduino_hello_world/blob/master/helloworld.ino">Arduino</a></ListItem>
              <ListItem>Interchangeable and removable button caps</ListItem>
              <ListItem>Stickers for labeling buttons</ListItem>
              <ListItem>LED Power Indicator</ListItem>
            </List>
            <H3>Kickstarter</H3>
            <Text>Check out the original Kickstarter project <a target="_blank" href="https://www.kickstarter.com/projects/267560573/button-board-prototyping-electronics-the-painless">here</a></Text>

            <H3>Interested?</H3>
            <Text>We're currently out of stock but you can signup  <a target="_blank" href="https://forms.gle/d3zMo8zL6owpWwbMA">here</a> to be notified when we're back in stock.</Text>
          </Section>

          <Section>
            <Img src={IMG_5} />
          </Section>
        </SectionContent>
      </SectionWrapper>

      <SectionWrapper>
        <SectionContent>
          <Section>
            <Img src={IMG_12} />
          </Section>
        </SectionContent>
      </SectionWrapper>
    </ButtonBoardV1Wrapper >
  )
}

export default ButtonBoardV1
