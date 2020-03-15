import React from 'react'

import {Header, Text, PageWrapper, GoogleForm, Section } from 'shared'

const Contact = () => {
    return <PageWrapper>
        <Section>
            <Header size="large">Twitter</Header>
            <Text>
                You can connect on Twitter <a target="_blank" href="https://twitter.com/travis_the_makr">here</a>.
            </Text>
        </Section>
        <Section>
            <Header size="large">Contact Us</Header>
            <GoogleForm
                src="https://docs.google.com/forms/d/e/1FAIpQLSdhpE6i0LVbYtnCzf06OttT1_lsqeYqZ88fGG3IF9cbEcFV7w/viewform?embedded=true"
                height="700"
            >Loading…
            </GoogleForm>
        </Section>
    </PageWrapper>
}

export default Contact