import React, { Component } from 'react'

import styled, { css } from 'styled-components'

const LargeText = styled.p`
    font-weight: 400;
    margin: 0.5em 0;
    font-size: 1.5em;
`

const NormalText = styled.p`
    font-weight: 400;
    margin: 0.5em 0;
    font-size: 1em;
`

type Props = {
    children: React.ReactNode
    size?: 'large'
}

const Text = ({ children, size }: Props) => {
    switch (size) {
        case 'large':
            return <LargeText>{children}</LargeText>
        default:
            return <NormalText>{children}</NormalText>
    }
}

export default Text