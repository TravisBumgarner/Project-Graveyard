import React from 'react'

import { Header, Text, PageWrapper, GoogleForm, Section } from 'shared'

const Problem = () => {
    return <PageWrapper>
        <Section>
            <Header size="large">Submit A Problem</Header>
            <Text>Are you experiencing a problem personally or in your community in need of a solution? Fill out the form below and participants will be given the opportunity to find a solution.</Text>
            <GoogleForm
                src="https://docs.google.com/forms/d/e/1FAIpQLSdrIFWtkoT9Na4twj-8S1ydtwq5nQhc29mDsd1CdL-a2Jg7tw/viewform?embedded=true"
                height="1200"
            >
                Loading…
        </GoogleForm>
        </Section>

    </PageWrapper>
}

export default Problem