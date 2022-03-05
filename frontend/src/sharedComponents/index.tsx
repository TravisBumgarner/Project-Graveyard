import styled from 'styled-components'
import React from 'react'

import logo from '../static/logo.png'
import { H1 } from '../App/components/StyleExploration'

const LoadingWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    img {
        transform: ${({ rotation }: { rotation: number }) => `rotate(${rotation}deg)`};
        width: 200px;
        height: 200px;
    }
`

const Loading = () => {
    // const rotations = [0, 90, 180, 270]
    const [rotation, setRotation] = React.useState<number>(0)
    React.useEffect(() => {
        setInterval(() => {
            setRotation((prev) => prev + 1)
        }, 25)
    }, [])
    return (
        <LoadingWrapper rotation={rotation}>
            <img alt="logo" src={logo} />
            <H1>One moment please!</H1>
        </LoadingWrapper>
    )
}

export {
    Loading,
}
