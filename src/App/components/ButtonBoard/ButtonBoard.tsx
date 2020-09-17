import React from 'react'
import styled from 'styled-components'

import { media } from 'Theme'
import { Text, H2, H3, Section, SectionWrapper, SectionContent, List, ListItem } from 'sharedComponents'

const ButtonBoardWrapper = styled.div`
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

            <SectionWrapper>
                <H2>Button Board V1.0</H2>
                <SectionContent>
                    Kickstarter. And such. And a photo.
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
