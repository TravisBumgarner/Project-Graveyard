import React, { useState } from 'react'

const makeFrameState = (key, content = '') => ({
    key,
    content
})

const App = () => {
    const [frameHeight, setFrameHeight] = useState(10)
    const [frameWidth, setFrameWidth] = useState(30)
    const [frames, setFrames] = useState([])
    const [nextFrameKey, setNextFrameKey] = useState(1)

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
    return (
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
    )
}

export default App
