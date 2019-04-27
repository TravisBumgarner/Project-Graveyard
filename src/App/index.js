import React, { useState } from 'react'

const makeTextAreaState = (key, content = '') => ({
    key,
    content
})

const App = () => {
    const [rows, setRows] = useState(10)
    const [cols, setCols] = useState(30)
    const [textAreas, setTextAreas] = useState([])
    const [nextTextAreaKey, setNextTextAreaKey] = useState(1)

    const createTextArea = () => {
        setTextAreas([...textAreas, makeTextAreaState(nextTextAreaKey)])
        setNextTextAreaKey(nextTextAreaKey + 1)
    }

    const updateTextAreaContent = (key, content) => {
        const modifiedTextAreaState = textAreas.map(textArea => {
            if (textArea.key === key) {
                return makeTextAreaState(key, content)
            } else {
                return textArea
            }
        })
        setTextAreas(modifiedTextAreaState)
    }

    const TextAreas = textAreas.map(({ content, key }) => (
        <textarea
            onChange={event => {
                updateTextAreaContent(key, event.target.value)
            }}
            key
            rows
            cols
        >
            {content}
        </textarea>
    ))
    console.log(textAreas)
    return (
        <div>
            <div>
                Text Boxes: <button onClick={() => createTextArea()}>++</button>
                Width <button onClick={() => setCols(cols + 1)}>++</button>
                <button onClick={() => setCols(cols - 1)}>--</button>
                Height <button onClick={() => setRows(rows + 1)}>++</button>
                <button onClick={() => setRows(rows - 1)}>--</button>
            </div>
            {TextAreas}
        </div>
    )
}

export default App
