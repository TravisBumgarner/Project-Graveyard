import React from 'react'

import { Header, Text, PageWrapper, Section } from 'shared'


const Error = () => {
    return (
        <PageWrapper>
            <Section>
                <Header size="large">Whoops</Header>
                <Text>Something went wrong.</Text>
            </Section>
        </PageWrapper>
    )
}

export default Error