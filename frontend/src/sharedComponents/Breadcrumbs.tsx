import React from 'react'
import styled from 'styled-components'

import { StyledNavLink } from 'sharedComponents'
import Paragraph from './Paragraph'

type BreadcrumbsProps = {
    breadcrumbs: { text: string, to: string }[]
}

const BreadcrumbsWrapper = styled.div`
    display: inline-block;

    ${Paragraph}{
        display: inline-block;
        padding: 0 1rem;
        margin: 0;
    }
`

const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
    return (
        <BreadcrumbsWrapper>
            {
                breadcrumbs.map(({ text, to }) => (
                    <span key={to}>
                        <StyledNavLink to={to} text={text} />
                        <Paragraph>{' > '}</Paragraph>
                    </span>
                ))
            }
        </BreadcrumbsWrapper>
    )
}

export default Breadcrumbs
