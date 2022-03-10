import styled from 'styled-components'
import React from 'react'

import logo from '../static/logo.png'
import { Heading } from '.'

type LoadingProps = {
    fullscreen?: boolean
}

const LoadingWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    ${({ fullscreen }: { fullscreen: boolean }) => (fullscreen ? `
        width: 100vw;
        position:fixed;
        top: 0;
        left: 0;
        height: 100vh;
        position: fixed;
    ` : `
        margin: 7rem;
    `)}

    img {
    width: 200px;
    height: 200px;
    margin-bottom: 1em;
}
`

const Loading = ({ fullscreen }: LoadingProps) => {
    // const rotations = [0, 90, 180, 270]
    const [rotation, setRotation] = React.useState<number>(0)
    React.useEffect(() => {
        const rotationIntervalId = setInterval(() => {
            setRotation((prev) => prev + 1)
        }, 25)

        return () => clearInterval(rotationIntervalId)
    }, [])
    return (
        <LoadingWrapper fullscreen={fullscreen}>
            <img style={{ transform: `rotate(${rotation}deg)` }} alt="logo" src={logo} />
            <Heading.H1>One moment please!</Heading.H1>
        </LoadingWrapper>
    )
}

export default Loading
