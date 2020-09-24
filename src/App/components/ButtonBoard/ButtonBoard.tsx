import React from 'react'
import styled from 'styled-components'

import { media } from 'Theme'
import { Text, H2, H3, Section, SectionWrapper, SectionContent, List, ListItem } from 'sharedComponents'
import { IMG_5, IMG_8 } from 'media'

const ButtonBoardWrapper = styled.div`
`

const Img = styled.img`
    width: 100%;
    height: auto;
    border-radius: 1em;
`

const ButtonBoard = () => {
    return (
        <ButtonBoardWrapper>
            <SectionWrapper>
                <H2>Button Board V2.0</H2>
                <SectionContent>
                    <Section>
                        <H3>Features</H3>
                        <List>
                            <ListItem>Progammable with Arduino</ListItem>
                            <ListItem>Support for Macro thing X</ListItem>
                        </List>
                        <H3>Customization</H3>
                        <List>
                            <ListItem>Choose from 6, 9, or 12 key layouts</ListItem>
                        </List>
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
                    <Section>
                        The adventures began with the Button Board V1.0.
                    </Section>

                </SectionContent>
            </SectionWrapper>

            <SectionWrapper>
                <H2>Interested?</H2>
                <SectionContent>
                    Do the thing. Signup!
                    Fill out the form completely to win a thing

                    Form
                    - How many buttons
                    - What would you use this for?
                </SectionContent>
            </SectionWrapper>
        </ButtonBoardWrapper>
    )
}

export default ButtonBoard
