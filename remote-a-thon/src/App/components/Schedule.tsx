import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Header, Text, PageWrapper, Section } from 'shared'

const Calendar = styled.iframe`
    width: 100%;
    height: 1000px;
    border: 0;
    margin: 20px 0;
`

const Schedule = () => {
    return (
        <PageWrapper>
            <Section>
                <Header size="large">Tentative Schedule</Header>
                <Text>This schedule is still a work in progress. </Text>
                <Calendar src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FNew_York&amp;src=bmc0aGgxa2pvOWkzdDVubmdzcXFyYzFvc2NAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%23616161&amp;mode=AGENDA&amp;title" >Loading...</Calendar>
            </Section>
        </PageWrapper>
    )
}

export default Schedule