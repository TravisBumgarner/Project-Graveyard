import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const makeFrameState = (key, content = '') => ({
    key,
    content
})

const TextArea = styled.textarea`
    resize: none;
    width: ${props => {
        return props.frameWidth
    }}px;
    height: ${props => props.frameHeight}px;
`

const FrameWrapper = styled.div`
    margin: 10px;
    display: inline-block;
`

const FramesWrapper = styled.div`
    overflow-x: scroll;
    width: 100%;
    white-space: nowrap;
`

const ControlsWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px;
`

const OutputWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px;
`

const FrameTitleBar = styled.div`
    display: flex;
    justify-content: space-between;
`

const Label = styled.label`
    margin-left: 20px;
`

const NumberInput = styled.input`
    width: 100px;
    margin-left: 20px;
    margin-right: 5px;
`

const Title = styled.h1`
    font-size: 24px;
    text-align: center;
    margin: 20px;
`

const SubTitle = styled.h2`
    font-size: 18px;
    text-align: center;
    margin: 20px;
`

const App = () => {
    const [frameHeight, setFrameHeight] = useState(100)
    const [frameWidth, setFrameWidth] = useState(100)
    const [frames, setFrames] = useState([{ key: -1, content: 'hi' }])
    const [nextFrameKey, setNextFrameKey] = useState(1)
    const [frameRate, setFrameRate] = useState(1)
    const [visibleFrameIndex, setVisibleFrameIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [intervalKey, setIntervalKey] = useState(0)
    const [gifSrc, setGifSrc] = useState(null)

    const createFrame = () => {
        setFrames([...frames, makeFrameState(nextFrameKey)])
        setNextFrameKey(nextFrameKey + 1)
    }

    const updateFrameText = (key, content) => {
        const modifiedFramesState = frames.map(frame => {
            if (frame.key === key) {
                return makeFrameState(key, content)
            } else {
                return frame
            }
        })
        setFrames(modifiedFramesState)
    }

    const removeFrame = key => {
        if (frames.length === 1) {
            alert('There must be one frame!')
            return
        } else {
            const modifiedFramesState = frames.filter(frame => frame.key != key)
            setFrames(modifiedFramesState)
        }
    }

    const Frames = frames.map(({ content, key }, index) => (
        <FrameWrapper key>
            <FrameTitleBar>
                Frame: {index + 1}
                <button tabIndex={-1} onClick={() => removeFrame(key)}>
                    X
                </button>
            </FrameTitleBar>
            <TextArea
                onChange={event => {
                    updateFrameText(key, event.target.value)
                }}
                frameHeight={frameHeight}
                frameWidth={frameWidth}
            >
                {content}
            </TextArea>
        </FrameWrapper>
    ))

    const animate = () => {
        !isAnimating && setIsAnimating(true)

        let counter = 0
        clearInterval(intervalKey)

        const newIntervalKey = setInterval(() => {
            counter += 1
            setVisibleFrameIndex(counter)
        }, (1 / frameRate) * 1000)

        setIntervalKey(newIntervalKey)
    }

    useEffect(animate, [isAnimating, frameRate])

    const handleFrameRateChange = event => {
        if (event.target.value == 0) {
            alert('Frame rate cannot be 0.')
            return
        }
        setFrameRate(event.target.value)
    }

    const getGif = () => {
        axios
            .post('http://localhost:5000/process', {
                frames: frames.map(frame => frame.content),
                width: frameWidth,
                height: frameHeight,
                frame_rate: frameRate
            })
            .then(r => setGifSrc(r.data.url))
    }

    return (
        <>
            <div>
                <Title>Gif Maker</Title>
                <ControlsWrapper>
                    <button onClick={() => createFrame()}>Add Frame</button>
                    <Label for="width">Width (in PX):</Label>
                    <NumberInput
                        onChange={event => setFrameWidth(event.target.value)}
                        min={10}
                        max={500}
                        step={10}
                        type="number"
                        value={frameWidth}
                        id="width"
                    />
                    <Label for="height">Height (in PX):</Label>
                    <NumberInput
                        id="height"
                        onChange={event => setFrameHeight(event.target.value)}
                        min={10}
                        max={500}
                        step={10}
                        type="number"
                        value={frameHeight}
                    />
                </ControlsWrapper>
                <FramesWrapper>{Frames}</FramesWrapper>
            </div>
            <div>
                <ControlsWrapper>
                    <Label for="framerate">Frame Rate (frames per second):</Label>
                    <NumberInput
                        min={0.01}
                        max={200}
                        id="framerate"
                        onChange={event => setFrameRate(event.target.value)}
                        value={frameRate}
                        type="number"
                    />
                </ControlsWrapper>
                <SubTitle>Preview</SubTitle>
                <ControlsWrapper>
                    <TextArea
                        value={frames[visibleFrameIndex % frames.length].content}
                        frameHeight={frameHeight}
                        frameWidth={frameWidth}
                    />
                </ControlsWrapper>
                <ControlsWrapper>
                    <button onClick={getGif}>Convert to GIF</button>
                </ControlsWrapper>
                <SubTitle>Output</SubTitle>
                <OutputWrapper>
                    {gifSrc ? (
                        <>
                            <img src={gifSrc} />
                        </>
                    ) : null}
                </OutputWrapper>
            </div>
        </>
    )
}

export default App
