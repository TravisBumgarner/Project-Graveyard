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
    color: ${props => props.foregroundColor};
    background-color: ${props => props.backgroundColor};
    margin: 10px;
`

const PlaceholderDiv = styled.div`
    width: ${props => {
        return props.frameWidth
    }}px;
    height: ${props => props.frameHeight}px;
    margin: 10px;
    border: 1px solid black;
`

const StyledGif = styled.img`
    width: ${props => {
        return props.frameWidth
    }}px;
    height: ${props => props.frameHeight}px;
    margin: 10px;
    border: 1px solid #f5f5f5;
`

const ConvertToGifWrapper = styled.div`
    display: flex;
    align-self: center;
`

const FrameWrapper = styled.div`
    margin: 10px;
    display: inline-block;
    padding: 10px;
    background-color: #f5f5f5;
`

const FramesWrapper = styled.div`
    overflow-x: scroll;
    width: 100%;
    white-space: nowrap;
    background-color: #dddddd;
    padding: 20px;
`

const FrameSection = styled.div`
    display: flex;
    align-items: center;
`

const ControlsWrapper = styled.div`
    max-width: 200px;
    padding: 20px;
    background-color: #f5f5f5;
`

const PreviewWrapper = styled.div`
    margin: 20px;
`

const ControlsSectionWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`
const ControlsAndFramesWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

const OutputWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px;
`
const PreviewAndOutputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-grow: 0;
    margin-top: 20px;
    text-align: center;
`

const FrameTitleBar = styled.div`
    display: flex;
    justify-content: space-between;
`

const Label = styled.label``

const Input = styled.input`
    width: 50px;
`

const Title = styled.h1`
    font-size: 24px;
    text-align: center;
    margin: 20px;
`

const SubTitle = styled.h2`
    font-size: 18px;
    /* text-align: center; */
    margin-bottom: 10px;
`

const App = () => {
    const [frameHeight, setFrameHeight] = useState(200)
    const [frameWidth, setFrameWidth] = useState(200)
    const [frames, setFrames] = useState([{ key: 0, content: 'Hello' }, { key: 1, content: '\nWorld' }])
    const [nextFrameKey, setNextFrameKey] = useState(2)
    const [frameRate, setFrameRate] = useState(10)
    const [visibleFrameIndex, setVisibleFrameIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [intervalKey, setIntervalKey] = useState(0)
    const [gifSrc, setGifSrc] = useState(null)
    const [foregroundColor, setForegroundColor] = useState('#000000')
    const [backgroundColor, setBackgroundColor] = useState('#ffffff')

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

    const duplicateFrame = key => {
        const frameIndex = frames.findIndex(frame => frame.key === key)
        const duplicateFrame = { key: nextFrameKey, content: frames[frameIndex].content }
        setNextFrameKey(nextFrameKey + 1)

        const modifiedFramesState = [...frames.slice(0, frameIndex), duplicateFrame, ...frames.slice(frameIndex)]
        setFrames(modifiedFramesState)
    }

    const removeFrame = key => {
        const modifiedFramesState = frames.filter(frame => frame.key != key)
        setFrames(modifiedFramesState)
    }

    const moveFrameRight = key => {
        const frameIndex = frames.findIndex(frame => frame.key === key)

        if (frameIndex === frames.length - 1) {
            return
        }
        const modifiedFrames = [...frames]
        const temp = modifiedFrames[frameIndex + 1]
        modifiedFrames[frameIndex + 1] = modifiedFrames[frameIndex]
        modifiedFrames[frameIndex] = temp
        setFrames(modifiedFrames)
    }

    const moveFrameLeft = key => {
        const frameIndex = frames.findIndex(frame => frame.key === key)

        if (frameIndex === 0) {
            return
        }
        const modifiedFrames = [...frames]
        const temp = modifiedFrames[frameIndex - 1]
        modifiedFrames[frameIndex - 1] = modifiedFrames[frameIndex]
        modifiedFrames[frameIndex] = temp
        setFrames(modifiedFrames)
    }

    const Frames = frames.map(({ content, key }, index) => {
        return (
            <FrameWrapper key={key}>
                <FrameTitleBar>
                    Frame: {index + 1}
                    <button tabIndex={-1} disabled={frames.length === 1} onClick={() => removeFrame(key)}>
                        X
                    </button>
                </FrameTitleBar>
                <FrameSection>
                    <button tabIndex={-1} disabled={index === 0} onClick={() => moveFrameLeft(key)}>
                        {'<'}
                    </button>
                    <TextArea
                        foregroundColor={foregroundColor}
                        backgroundColor={backgroundColor}
                        onChange={event => {
                            updateFrameText(key, event.target.value)
                        }}
                        frameHeight={frameHeight}
                        frameWidth={frameWidth}
                    >
                        {content}
                    </TextArea>
                    <button tabIndex={-1} disabled={index === frames.length - 1} onClick={() => moveFrameRight(key)}>
                        {'>'}
                    </button>
                </FrameSection>
                <button tabIndex={-1} onClick={() => duplicateFrame(key)}>
                    Duplicate
                </button>
            </FrameWrapper>
        )
    })

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

    useEffect(animate, [frameRate])

    const handleFrameRateChange = event => {
        if (event.target.value == 0) {
            alert('Frame rate cannot be 0.')
            return
        }
        setFrameRate(event.target.value)
    }

    const validateInputs = () => {
        if (
            typeof frameWidth === 'number' &&
            typeof frameHeight === 'number' &&
            typeof frameRate === 'number' &&
            frameWidth > 0 &&
            frameHeight > 0 &&
            frameRate > 0 &&
            frames.length > 0
        ) {
            return true
        }

        return false
    }

    const getGif = () => {
        const isValid = validateInputs()

        if (!isValid) {
            alert('Your inputs are invalid.')
            return
        }

        axios
            .post('http://localhost:5000/process', {
                frames: frames.map(frame => frame.content),
                width: frameWidth,
                height: frameHeight,
                frame_rate: frameRate,
                foreground_color: foregroundColor,
                background_color: backgroundColor
            })
            .then(r => setGifSrc(r.data.url))
    }
    console.log(frames)
    return (
        <>
            <div>
                <Title>Gif Maker</Title>
                <ControlsAndFramesWrapper>
                    <ControlsWrapper>
                        <SubTitle>Settings</SubTitle>
                        <ControlsSectionWrapper>
                            <button onClick={() => createFrame()}>Add Frame</button>
                        </ControlsSectionWrapper>
                        <ControlsSectionWrapper>
                            <Label for="width">Width (in PX):</Label>
                            <Input
                                onChange={event => setFrameWidth(parseFloat(event.target.value))}
                                min={10}
                                max={500}
                                step={10}
                                type="number"
                                value={frameWidth}
                                id="width"
                            />
                        </ControlsSectionWrapper>
                        <ControlsSectionWrapper>
                            <Label for="height">Height (in PX):</Label>
                            <Input
                                id="height"
                                onChange={event => {
                                    setFrameHeight(parseFloat(event.target.value))
                                }}
                                min={10}
                                max={500}
                                step={10}
                                type="number"
                                value={frameHeight}
                            />
                        </ControlsSectionWrapper>
                        <ControlsSectionWrapper>
                            <Label for="foreground">Foreground Color:</Label>
                            <Input
                                type="color"
                                value={foregroundColor}
                                id="foreground"
                                onChange={event => setForegroundColor(event.target.value)}
                            />
                        </ControlsSectionWrapper>
                        <ControlsSectionWrapper>
                            <Label for="background">Background Color:</Label>
                            <Input
                                type="color"
                                value={backgroundColor}
                                id="background"
                                onChange={event => setBackgroundColor(event.target.value)}
                            />
                        </ControlsSectionWrapper>
                        <ControlsSectionWrapper>
                            <Label for="framerate">FPS:</Label>
                            <Input
                                min={0.01}
                                max={200}
                                id="framerate"
                                onChange={event => setFrameRate(parseFloat(event.target.value))}
                                value={frameRate}
                                type="number"
                            />
                        </ControlsSectionWrapper>
                    </ControlsWrapper>
                    <FramesWrapper>
                        <SubTitle>Frames</SubTitle>
                        {Frames}
                    </FramesWrapper>
                </ControlsAndFramesWrapper>
            </div>
            <PreviewAndOutputWrapper>
                <div>
                    <SubTitle>Preview</SubTitle>
                    <PreviewWrapper>
                        <TextArea
                            value={frames[visibleFrameIndex % frames.length].content}
                            frameHeight={frameHeight}
                            frameWidth={frameWidth}
                            foregroundColor={foregroundColor}
                            backgroundColor={backgroundColor}
                        />
                    </PreviewWrapper>
                </div>
                <ConvertToGifWrapper>
                    <button onClick={getGif}>Convert to GIF</button>
                </ConvertToGifWrapper>
                <div>
                    <SubTitle>Output (right click to save)</SubTitle>
                    <OutputWrapper>
                        {gifSrc ? (
                            <>
                                <StyledGif src={gifSrc} />
                            </>
                        ) : (
                            <PlaceholderDiv frameHeight={frameHeight} frameWidth={frameWidth} />
                        )}
                    </OutputWrapper>
                </div>
            </PreviewAndOutputWrapper>
        </>
    )
}

export default App
