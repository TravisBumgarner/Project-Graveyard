import React from 'react'
import styled from 'styled-components'

import { Paragraph, Button, QUATERNARY } from './StyleExploration'
import { context } from './Context'

const AlertMessagePositioner = styled.div`
    z-index: 999;
    position: fixed;
    bottom: 5vw;
    left: 5vw;
    right: 5vw;
    display: flex;
    justify-content: center;
    opacity: 1;
`

const AlertMessageWrapper = styled.div`
    display: inline-block;
    font-family: 'Comfortaa',cursive;
    font-size: 1rem;
    border: 2px solid;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    background-color: transparent;
    font-weight: 700;
    margin: 0.5rem;
    color: ${QUATERNARY.darkest};
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

const AlertMessage = () => {
    const { state, dispatch } = React.useContext(context)

    const handleSubmit = () => {
        dispatch({ type: 'DELETE_MESSAGE' })
    }

    React.useEffect(() => {
        if (state.message.timeToLiveMS) {
            setTimeout(() => {
                dispatch({ type: 'DELETE_MESSAGE' })
            }, state.message.timeToLiveMS)
        }
    }, [])

    return (
        <AlertMessagePositioner>
            <AlertMessageWrapper timeToLiveMS={state.message.timeToLiveMS}>
                <Paragraph>FYI! - {state.message.body}</Paragraph>
                <Button onClick={handleSubmit} variation="primary">Ok!</Button>
            </AlertMessageWrapper>
        </AlertMessagePositioner>
    )
}

export default AlertMessage
