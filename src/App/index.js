// TODO: Framerate will fail at 0

import React, { useState } from 'react'

const makeFrameState = (key, content = '') => ({
    key,
    content
})

const App = () => {
    const [frameHeight, setFrameHeight] = useState(10)
    const [frameWidth, setFrameWidth] = useState(30)
    const [frames, setFrames] = useState([{ key: -1, content: 'hi' }])
    const [nextFrameKey, setNextFrameKey] = useState(1)
    const [frameRate, setFrameRate] = useState(30)
    const [visibleFrameIndex, setVisibleFrameIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const createFrame = () => {
        setFrames([...frames, makeFrameState(nextFrameKey)])
        setNextFrameKey(nextFrameKey + 1)
    }

    const updateTextAreaContent = (key, content) => {
        const modifiedFramesState = frames.map(frame => {
            if (frame.key === key) {
                return makeFrameState(key, content)
            } else {
                return frame
            }
        })
        setFrames(modifiedFramesState)
    }

    const Frames = frames.map(({ content, key }) => (
        <textarea
            onChange={event => {
                updateTextAreaContent(key, event.target.value)
            }}
            key
            rows={frameHeight}
            cols={frameWidth}
        >
            {content}
        </textarea>
    ))

    const animate = () => {
        let counter = 0
        setIsAnimating(true)
        setInterval(() => {
            counter += 1
            setVisibleFrameIndex(counter)
        }, 1 / frameRate)
    }

    return (
        <>
            <div>
                <div>
                    Add Frame: <button onClick={() => createFrame()}>+</button>
                    Set Width: <button onClick={() => setFrameWidth(frameWidth + 1)}>+</button>
                    <button onClick={() => setFrameWidth(frameWidth - 1)}>-</button>
                    Set Height: <button onClick={() => setFrameHeight(frameHeight + 1)}>+</button>
                    <button onClick={() => setFrameHeight(frameHeight - 1)}>-</button>
                </div>
                {Frames}
            </div>
            <div>
                <div>
                    Frame Rate: {frameRate}
                    Set Frame Rate: <button onClick={() => setFrameRate(frameRate + 1)}>+</button>
                    <button onClick={() => setFrameRate(frameRate - 1)}>-</button>
                    {frames.length ? <button onClick={animate}>Animate</button> : null}
                </div>
                {isAnimating && frames.length ? (
                    <div>
                        {visibleFrameIndex}
                        <textarea
                            value={frames[visibleFrameIndex % frames.length].content}
                            rows={frameHeight}
                            cols={frameWidth}
                        />
                    </div>
                ) : null}
            </div>
        </>
    )
}

export default App
