import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { media } from "Theme"
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
import { IMG_5, IMG_8, IMG_11 } from "media"

const ButtonBoardWrapper = styled.div``

const Img = styled.img`
  width: 100%;
  height: auto;
  border-radius: 1em;
`

const ProductTile = styled.img`
  width: calc(32%);
  height: auto;
  border-radius: 1em;
  margin-bottom: 2%;

  &:nth-child(3n + 2) {
    margin-left: 2%;
    margin-right: 2%;
  }
`

const ImgGrid = styled.div``

const ButtonBoard = () => {
  return (
    <ButtonBoardWrapper>
      <SectionWrapper>
        <H2>Products</H2>
        <SectionContent>
          <Section>
            <Link to="/products/buttonboardv2">
              <H3>Button Board V2</H3>
              <Img src={IMG_8} />
            </Link>
          </Section>
          <Section>
            <H3>Button Board V1 (Coming Soon)</H3>
            <Img src={IMG_5} />
          </Section>
          <Section>
            <Link to="/products/joinus">
              <H3>Join us!</H3>
              <Img src={IMG_11} />
            </Link>
          </Section>
        </SectionContent>
      </SectionWrapper>
    </ButtonBoardWrapper>
  )
}

export default ButtonBoard
