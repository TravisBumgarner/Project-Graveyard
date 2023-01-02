import React, { Component } from 'react'

import styled, { css } from 'styled-components'

const NormalWrapper = styled.div`
    width: 100%;
    max-width: 800px;
`

type Props = {
    children: React.ReactNode
}

const PageWrapper = ({ children }: Props) => {
    return <NormalWrapper>{children}</NormalWrapper>
}

export default PageWrapper

