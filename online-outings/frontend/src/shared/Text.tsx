import React from 'react'

import styled from 'styled-components'

const NormalText = styled.p`
`

type Props = {
    children: React.ReactNode
}

const Text = ({ children, size }: Props) => {
    switch (size) {
        default:
            return <NormalText>{children}</NormalText>
    }
}

export default Text