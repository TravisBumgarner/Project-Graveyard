import React from 'react'
import styled from 'styled-components'

import { media } from 'Theme'
import { Text, H2, H3, Section, SectionWrapper, SectionContent, List, ListItem } from 'sharedComponents'

const ButtonBoardWrapper = styled.div`
`

const Img = styled.img`
    width: calc(32%);
    height: auto;
    border-radius: 1em;
    margin-bottom: 2%;

    &:nth-child(3n+2){
        margin-left: 2%;
        margin-right: 2%;
    }
`

const ImgGrid = styled.div`
`

const AuthorImg = styled.img`
    width: 30%;
    height: auto;
    border-radius: 1em;
    height: 0%;
    max-width: 230px;
    margin: 0 2em 0 0;

    ${media.tablet} {
        max-width: 150px;
        margin-right: 1em;
    }
`

const ButtonBoard = () => {
    return (
        <ButtonBoardWrapper>
            <SectionWrapper>
                <H2>Hello!</H2>
                <SectionContent>
                    <Section>
                        <H3>Features</H3>
                        <List>
                            <ListItem>Progammable with Arduino</ListItem>
                            <ListItem>Support for Macro thing X</ListItem>
                        </List>
                    </Section>

                    <Section>
                        <H3>Customization</H3>
                        <List>
                            <ListItem>Choose from 6, 9, or 12 key layouts</ListItem>
                        </List>
                    </Section>
                </SectionContent>
            </SectionWrapper>
        </ButtonBoardWrapper>
    )
}

export default ButtonBoard
