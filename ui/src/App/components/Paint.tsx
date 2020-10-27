import * as React from 'react'


const Paint = () => {
    const [pixel1, setPixel1] = React.useState(0)
    const [pixel2, setPixel2] = React.useState(0)
    const [pixel3, setPixel3] = React.useState(0)

    return <div>
        <button  onClick={() => setPixel1(pixel1 === 1 ? 0 : 1)}>{pixel1 === 0 ? 'X' : 'O'}</button>
        <button  onClick={() => setPixel2(pixel2 === 1 ? 0 : 1)}>{pixel2 === 0 ? 'X' : 'O'}</button>
        <button  onClick={() => setPixel3(pixel3 === 1 ? 0 : 1)}>{pixel3 === 0 ? 'X' : 'O'}</button>
    </div>
}

export default Paint