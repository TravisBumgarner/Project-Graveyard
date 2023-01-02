import * as React from 'react'

import { context } from '../components'
import { client } from '../App'

const Paint = () => {
    const { state } = React.useContext(context)

    const submit = (value, pixel) => {
        const encodedMessage = JSON.stringify({
            value,
            pixel,
            type: 'SET_PIXEL'
        })
        client.send(encodedMessage)
    }

    const Pixels = state.pixels.map((value, pixel) => {
        return (
            <button
                key={pixel}
                onClick={() => submit(1 - value, pixel)}
            >
                { value}
            </button>
        )
    })

    return <div>
        {Pixels}
    </div>
}

export default Paint