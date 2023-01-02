import React from 'react'
import styled from 'styled-components'

import { Text, H2, Section, SectionWrapper, SectionContent } from 'sharedComponents'

const ErrorWrapper = styled.div`
`

const Error = ({ showNotFoundError }: { showNotFoundError: boolean }) => {
    const message = showNotFoundError
        ? "The page you were looking for could not be found."
        : "Something went wrong, please try again later."

    return (
        <ErrorWrapper>
            <SectionWrapper>
                <H2>Whoops!</H2>
                <SectionContent>
                    <Section>
                        <Text>{message}</Text>
                    </Section>
                </SectionContent>
            </SectionWrapper>
        </ErrorWrapper>
    )
}

export default Error
