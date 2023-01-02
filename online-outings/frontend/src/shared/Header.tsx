
import React, { Component } from 'react'

import styled, { css } from 'styled-components'

const LargeHeader = styled.h2`

`

const MediumHeader = styled.h3`

`

const SmallHeader = styled.h4`

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