import styled from 'styled-components'
import React from 'react'

import logo from '../static/logo.png'
import { H1, Button, Label } from '../App/components/StyleExploration'

const LoadingWrapper = styled.div`
    width: 100vw;
    position:fixed;
    top: 0;
    left: 0;
    height: 100vh;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    img {
        transform: ${({ rotation }: { rotation: number }) => `rotate(${rotation}deg)`};
        width: 200px;
        height: 200px;
        margin-bottom: 1em;
    }
`

const Loading = () => {
    // const rotations = [0, 90, 180, 270]
    const [rotation, setRotation] = React.useState<number>(0)
    React.useEffect(() => {
        const rotationIntervalId = setInterval(() => {
            setRotation((prev) => prev + 1)
        }, 25)

        return () => clearInterval(rotationIntervalId)
    }, [])
    return (
        <LoadingWrapper rotation={rotation}>
            <img alt="logo" src={logo} />
            <H1>One moment please!</H1>
        </LoadingWrapper>
    )
}

const AudioRecorderWrapper = styled.div`
    margin: 0.5rem;

    > div {
        border-radius: 1rem;
        border: 2px solid #57E2E5;
        padding: 0.5rem 1rem;
        display: flex;
        justify-content: space-between;

        audio {
            flex-grow: 1;
            margin-left: 1.5rem;
        }

        div {
            min-width: 120px;
            ${Button} {
                width: 100%;
            }
        }
    }



    ${Label}{
        display: block;
        box-sizing: border-box;
    }
`
type AudioRecorderProps = {
    startRecording: any
    isRecording: any
    audioURL: any
    stopRecording: any
}

const AudioRecorder = ({
    startRecording, isRecording, audioURL, stopRecording
}: AudioRecorderProps) => (
    <AudioRecorderWrapper>
        <Label>Audio:</Label>
        <div>
            <div>
                {isRecording ? (
                    <Button variation="secondary" onClick={stopRecording} disabled={!isRecording}>
                        Stop
                    </Button>
                ) : (
                    <Button variation="secondary" onClick={startRecording} disabled={isRecording}>
                        Record
                    </Button>
                )}
            </div>
            <audio src={audioURL} controls />

        </div>
    </AudioRecorderWrapper>
)

export {
    Loading,
    AudioRecorder
}
