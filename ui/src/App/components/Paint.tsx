import * as React from 'react'

import { sendMessage, parseMessage } from '../client'

const Paint = ({ user }) => {
    const [pixel1, setPixel1] = React.useState(0)
    const [pixel2, setPixel2] = React.useState(0)
    const [pixel3, setPixel3] = React.useState(0)

    React.useEffect(() => {
        sendMessage({ content: [pixel1, pixel2, pixel3], sender: user, messageType: 'paintMessage' })
    }, [pixel1, pixel2, pixel3])

    return <div>
        <button onClick={() => setPixel1(pixel1 === 1 ? 0 : 1)}>{pixel1 === 0 ? 'X' : 'O'}</button>
        <button onClick={() => setPixel2(pixel2 === 1 ? 0 : 1)}>{pixel2 === 0 ? 'X' : 'O'}</button>
        <button onClick={() => setPixel3(pixel3 === 1 ? 0 : 1)}>{pixel3 === 0 ? 'X' : 'O'}</button>
    </div>
}

export default Paint