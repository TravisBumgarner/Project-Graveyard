import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { IMG_8, IMG_2, IMG_11, IMG_5 } from "media"
import {
  H2,
  H3,
  Section,
  SectionWrapper,
  SectionContent,
  TextOverImageWrapper
} from "sharedComponents"

const HomeWrapper = styled.div`
  max-width: 600px;
  margin:0px auto;
`

const Img = styled.img`
  width: 100%;
  height: auto;
  border-radius: 1em;
`

const Home = () => {
  return (
    <HomeWrapper>
      <SectionWrapper>
        <H2>What are you looking for?</H2>
      </SectionWrapper>
      <SectionWrapper>
        <SectionContent>

          <Section>
            <Link to="/buttonboardv2">
              <TextOverImageWrapper>
                <H3>Button Board V2 [NEW!]</H3>
                <Img src={IMG_8} />
              </TextOverImageWrapper>
            </Link>
          </Section>

          <Section>
            <Link to="/prototyping">
              <TextOverImageWrapper>
                <H3>Prototyping & Consulting</H3>
                <Img src={IMG_2} />
              </TextOverImageWrapper>
            </Link>
          </Section>

        </SectionContent>
      </SectionWrapper>
      <SectionWrapper>
        <SectionContent>

          <Section>
            <a target="blank" href="https://www.tindie.com/stores/painless_prototyping/">
              <TextOverImageWrapper>
                <H3>Online Store</H3>
                <Img src={IMG_5} />
              </TextOverImageWrapper>
            </a>
          </Section>

          <Section>
            <Link to="/joinus">
              <TextOverImageWrapper>
                <H3>Join Us!</H3>
                <Img src={IMG_11} />
              </TextOverImageWrapper>
            </Link>
          </Section>

        </SectionContent>
      </SectionWrapper>
    </HomeWrapper>
  )
}

export default Home
