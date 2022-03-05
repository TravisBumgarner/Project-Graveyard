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
        width: 200px;
        height: 200px;

    }
`

const Loading = () => {
    return (
        <LoadingWrapper>
            <img src={logo} />
            <H1>One moment please!</H1>
        </LoadingWrapper>
    )
}

export {
    Loading
}
