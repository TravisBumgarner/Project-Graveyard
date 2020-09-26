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
              Know about engineering, manufacturing, sales, etc.? Let's combine forces and build the next Painless Prototyping
              product together!
            </Text>
            <Text>
              <a target="_blank" href="https://forms.gle/NcnSaG8qsPHg6iJz7">
                Let's chat!
              </a>
            </Text>
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
