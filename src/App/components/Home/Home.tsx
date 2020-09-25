import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { IMG_10, IMG_2 } from "media"
import {
  H2,
  H3,
  Section,
  SectionWrapper,
  SectionContent,
  TextOverImageWrapper
} from "sharedComponents"

const HomeWrapper = styled.div``

const Img = styled.img`
  width: 100%;
  height: auto;
  border-radius: 1em;
`

const Home = () => {
  return (
    <HomeWrapper>
      <SectionWrapper>
        <H2>What can we help you with today?</H2>
        <SectionContent>
          <Section>
            <Link to="/prototyping">
              <TextOverImageWrapper>
                <H3>Prototyping Services</H3>
                <Img src={IMG_2} />
              </TextOverImageWrapper>
            </Link>
          </Section>
          <Section>
            <Link to="/products">
              <TextOverImageWrapper>
                <H3>Products</H3>
                <Img src={IMG_10} />
              </TextOverImageWrapper>
            </Link>
          </Section>
        </SectionContent>
      </SectionWrapper>
    </HomeWrapper>
  )
}

export default Home
