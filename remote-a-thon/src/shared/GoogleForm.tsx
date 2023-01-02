import React from 'react'
import styled from 'styled-components'

type Props = {
    className: string
    children: React.ReactNode
    src: string
    height: string
}

const GoogleForm = styled(({ className, children, src }) => {
    return <iframe className={className} src={src}>{children}</iframe>
})`
    width: 100%;
    border: 0;
    background-color: transparent;
    min-height: 300px;
    ${
    ({ height }: { height: string }) => `height: ${parseInt(height) || 500}px`}
`

export default GoogleForm