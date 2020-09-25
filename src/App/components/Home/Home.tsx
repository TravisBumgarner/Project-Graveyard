import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { IMG_10, IMG_2, BACKGROUND_IMG } from "media"
import {
  H2,
  H3,
  Section,
  SectionWrapper,
  SectionContent,
  List,
  ListItem,
} from "sharedComponents"

const HomeWrapper = styled.div``

const Img = styled.img`
  width: 100%;
  height: auto;
  border-radius: 1em;
`

const ComingSoon = styled.div`
  width: 100%;
  height: auto;
  background-img: url("${BACKGROUND_IMG}");
`

const Home = () => {
  return (
    <HomeWrapper>
      <SectionWrapper>
        <H2>What can we help you with today?</H2>
        <SectionContent>
          <Section>
            <Link to="/prototyping">
              <H3>Prototyping Services</H3>
              <Img src={IMG_2} />
            </Link>
          </Section>
          <Section>
            <Link to="/products">
              <H3>Products</H3>
              <Img src={IMG_10} />
            </Link>
          </Section>
        </SectionContent>
      </SectionWrapper>
    </HomeWrapper>
  )
}

export default Home
