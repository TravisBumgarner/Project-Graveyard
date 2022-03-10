import styled from 'styled-components'
import React from 'react'

import { Button } from 'sharedComponents'
import { Label } from './LabelAndInput'

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

            div {
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

export default AudioRecorder
