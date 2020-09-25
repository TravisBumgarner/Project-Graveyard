import React from "react"
import styled from "styled-components"

import {
  Text,
  H2,
  H3,
  Section,
  SectionWrapper,
  SectionContent,
} from "sharedComponents"
import { IMG_11 } from "media"

const JoinUsWrapper = styled.div``

const Img = styled.img`
  width: 100%;
  height: auto;
  border-radius: 1em;
`

const JoinUs = () => {
  return (
    <JoinUsWrapper>
      <SectionWrapper>
        <H2>Join Us!</H2>
        <SectionContent>
          <Section>
            <H3>Have Ideas?</H3>
            <Text>
              Let's combine forces and build the next Painless Prototyping
              product together!
            </Text>
            <Text>Click the Let's Chat link above to get started!</Text>
          </Section>
          <Section>
            <Img src={IMG_11} />
          </Section>
        </SectionContent>
      </SectionWrapper>
    </JoinUsWrapper>
  )
}

export default JoinUs
