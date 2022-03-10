import styled from 'styled-components'
import React from 'react'

import { Button } from 'sharedComponents'
import { Label } from './LabelAndInput'
import colors from './colors'

const AudioRecorderWrapper = styled.div`
    margin: 0.5rem;

        > div {
        border-radius: 1rem;
        border: 2px solid #57E2E5;
        padding: 0.5rem 1rem;
        display: flex;
        justify-content: space - between;

            audio {
            flex-grow: 1;
            margin-left: 1.5rem;
        }

            > div {
                min-width: 120px;
                ${Button} {
                width: 100%;
            }
        }

        ${Label} {
            display: block;
            box-sizing: border-box;
        }
    }
`

const Pulsing = styled.div`
    display: inline-block;
    animation-name: opacity;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    color: ${colors.ALERT.base};

    @keyframes opacity {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
`

type AudioRecorderProps = {
    startRecording: () => void
    isRecording: boolean
    audioURL: string
    stopRecording: () => void
    clearAudioURL: () => void
}

const AudioRecorder = ({
    startRecording, isRecording, audioURL, stopRecording, clearAudioURL,
}: AudioRecorderProps) => (
    <AudioRecorderWrapper>
        <Label>Audio:</Label>
        <div>
            <div>
                {isRecording ? (
                    <Button variation="secondary" onClick={stopRecording} disabled={!isRecording}>
                        Stop <Pulsing>●</Pulsing>
                    </Button>
                ) : (
                    <Button variation="secondary" onClick={startRecording} disabled={isRecording}>
                        Record
                    </Button>
                )}
                {
                    audioURL ? (
                        <Button onClick={clearAudioURL} variation="alert">Clear</Button>
                    ) : null
                }
            </div>
            <audio src={audioURL} controls />

        </div>
    </AudioRecorderWrapper>
)

export default AudioRecorder
