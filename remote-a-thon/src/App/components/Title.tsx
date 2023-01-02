import React from 'react'
import styled from 'styled-components'

import { Text } from 'shared'

const LargeHeader = styled.h1`
    text-transform: uppercase;
    font-weight: 700;
    margin: 1em 0 0.25em 0;
    font-size: 2.5em;
`

const TitleWrapper = styled.div`
    width: 100%;
    max-width: 800px;
    text-align: center;
    margin: 0px auto;
`

const Title = () => {
    return <TitleWrapper>
        <LargeHeader>Remote Responsibilities Hackathon</LargeHeader>
        <Text size="large">
            A remote hackathon focused on building tools to help those that find themselves working, studying, and living remotely full time.
        </Text>
    </TitleWrapper>
}

export default Title