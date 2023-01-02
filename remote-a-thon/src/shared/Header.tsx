
import React, { Component } from 'react'

import styled, { css } from 'styled-components'

const LargeHeader = styled.h2`
    font-weight: 700;
    margin: 0.25em 0 0.5em 0;
    font-size: 2em;
`

const MediumHeader = styled.h3`
    font-weight: 400;
    margin: 1em 0 0.5em 0;
    font-size: 1.5em;
`

const SmallHeader = styled.h4`
    font-weight: 400;
    margin: 1em 0 0.5em 0;
    font-size: 1.25em;
`

type Props = {
    size: 'large' | 'medium' | 'small'
    children: React.ReactNode
}

const Header = ({ size, children }: Props) => {
    switch (size) {
        case 'large':
            return <LargeHeader>{children}</LargeHeader>
        case 'medium':
            return <MediumHeader>{children}</MediumHeader>
        case 'small':
            return <SmallHeader>{children}</SmallHeader>
    }
}

export default Header