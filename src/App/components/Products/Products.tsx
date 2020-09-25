import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { SECONDARY_COLOR } from "Theme"
import {
  H2,
  H3,
  Section,
  SectionWrapper,
  SectionContent,
  TextOverImageWrapper
} from "sharedComponents"
import { IMG_5, IMG_8, IMG_11 } from "media"

const ButtonBoardWrapper = styled.div``

const Img = styled.img`
  width: 100%;
  height: auto;
  border-radius: 1em;
`

const ButtonBoard = () => {
  return (
    <ButtonBoardWrapper>
      <SectionWrapper>
        <H2>Products</H2>
        <SectionContent>
          <Section>
            <Link to="/products/buttonboardv2">
              <TextOverImageWrapper>
                <H3>Button Board V2</H3>
                <Img src={IMG_8} />
              </TextOverImageWrapper>
            </Link>
          </Section>
          <Section>
            <Link to="/products/buttonboardv1">
              <TextOverImageWrapper>
                <H3>Button Board V1</H3>
                <Img src={IMG_5} />
              </TextOverImageWrapper>
            </Link>
          </Section>
          <Section>
            <Link to="/products/joinus">
              <TextOverImageWrapper>
                <H3>Join us!</H3>
                <Img src={IMG_11} />
              </TextOverImageWrapper>
            </Link>
          </Section>
        </SectionContent>
      </SectionWrapper>
    </ButtonBoardWrapper>
  )
}

export default ButtonBoard
