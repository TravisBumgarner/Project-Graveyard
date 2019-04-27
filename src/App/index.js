import React, { useState, useEffect } from 'react'

const makeFrameState = (key, content = '') => ({
    key,
    content
})

const App = () => {
    const [frameHeight, setFrameHeight] = useState(10)
    const [frameWidth, setFrameWidth] = useState(30)
    const [frames, setFrames] = useState([{ key: -1, content: 'hi' }])
    const [nextFrameKey, setNextFrameKey] = useState(1)
    const [frameRate, setFrameRate] = useState(1)
    const [visibleFrameIndex, setVisibleFrameIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [intervalKey, setIntervalKey] = useState(0)

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
                    Set Frame Rate: <input onChange={handleFrameRateChange} value={frameRate} type="number" />
                    {frames.length ? <button onClick={animate}>Animate</button> : null}
                </div>
                {isAnimating && frames.length ? (
                    <div>
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
