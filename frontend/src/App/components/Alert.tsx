import React from 'react'
import styled from 'styled-components'

import { Paragraph, Button } from 'sharedComponents'
import { context } from 'context'

const AlertPositioner = styled.div`
    z-index: 999;
    position: fixed;
    bottom: 5vw;
    left: 5vw;
    right: 5vw;
    display: flex;
    justify-content: center;
    opacity: 1;
`

const AlertWrapper = styled.div`
    display: inline-block;
    font-family: 'Comfortaa',cursive;
    font-size: 1rem;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    background-color: transparent;
    font-weight: 700;
    margin: 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    @keyframes fade {
        0%,100% { opacity: 0 }
        10%,90% { opacity: 1 }
    }

    ${({ timeToLiveMS }: { timeToLiveMS: number }) => `
            animation: fade ${timeToLiveMS / 1000}s linear;
        `}
`

const Alert = () => {
    const { state, dispatch } = React.useContext(context)

    const handleSubmit = () => {
        dispatch({ type: 'REMOVE_ALERT' })
    }

    React.useEffect(() => {
        if (state.message.timeToLiveMS) {
            setTimeout(() => {
                dispatch({ type: 'REMOVE_ALERT' })
            }, state.message.timeToLiveMS)
        }
    }, [])

    return (
        <AlertPositioner>
            <AlertWrapper timeToLiveMS={state.message.timeToLiveMS}>
                <Paragraph>{state.message.body}</Paragraph>
                <Button onClick={handleSubmit} variation="INTERACTION">Ok!</Button>
            </AlertWrapper>
        </AlertPositioner>
    )
}

export default Alert
