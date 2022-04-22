import styled from 'styled-components'
import React from 'react'
import { BiMicrophone, } from 'react-icons/bi'
import { BsFillRecordFill, } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'

import { Button } from 'sharedComponents'
import { logger } from 'utilities'
import { Label } from './LabelAndInput'
import colors from './colors'

// https://codesandbox.io/s/81zkxw8qnl?file=/src/index.tsx

const Audio = styled.audio`
    width: 100%;
`

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
    audioUrl: string
    setAudioUrl: React.Dispatch<React.SetStateAction<string>>
}

const AudioRecorder = ({
    setAudioUrl, audioUrl
}: AudioRecorderProps) => {
    const [isRecording, setIsRecording] = React.useState<boolean>(false)
    const [recorder, setRecorder] = React.useState(null)
    // const [stream, setStream] = React.useState<MediaStream>(null)

    React.useEffect(() => {
        const requestRecorder = async () => {
            const newStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            // setStream(newStream)
            return new MediaRecorder(newStream)
        }

        if (recorder === null) {
            if (isRecording) {
                requestRecorder().then(setRecorder, logger)
            }
            return
        }

        if (isRecording) {
            recorder.start()
        } else {
            recorder.stop()
            // stream.getAudioTracks().forEach((track) => track.stop())
            // setStream(null)
            // setRecorder(null)
        }

        const handleData = (e: { data: Blob | MediaSource }) => {
            setAudioUrl(URL.createObjectURL(e.data))
        }

        recorder.addEventListener('dataavailable', handleData)
        return () => recorder.removeEventListener('dataavailable', handleData)
    }, [recorder, isRecording])

    const startRecording = () => {
        setIsRecording(true)
    }

    const stopRecording = async () => {
        setIsRecording(false)
    }

    const clearAudioUrl = () => {
        setAudioUrl('')
    }

    return (
        <AudioRecorderWrapper>
            <Label>Audio</Label>
            <div>
                {isRecording ? (
                    <Button variation="secondary" onClick={stopRecording}>
                        <Pulsing><BsFillRecordFill fill={colors.ALERT.base} /></Pulsing>
                    </Button>
                ) : (
                    <Button variation="secondary" onClick={startRecording}>
                        <BiMicrophone />
                    </Button>
                )}
                {
                    audioUrl ? (
                        <Button disabled={audioUrl.length === 0} onClick={clearAudioUrl} variation="alert"><AiFillDelete /></Button>
                    ) : null
                }
                <Audio src={audioUrl} controls />
            </div>
        </AudioRecorderWrapper>
    )
}

export default AudioRecorder
