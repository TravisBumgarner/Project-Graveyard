import React, { useState } from 'react'

const App = () => {
    const [rows, setRows] = useState(10)
    const [cols, setCols] = useState(30)
    const [textAreas, setTextAreas] = useState(10)

    const TextAreas = []
    for (let i = 0; i < textAreas; i++) {
        TextAreas.push(<textarea key={i} rows={rows} cols={cols} />)
    }
    return (
        <div>
            <div>
                Text Boxes: <button onClick={() => setTextAreas(textAreas + 1)}>++</button>
                <button onClick={() => setTextAreas(textAreas - 1)}>--</button>
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
