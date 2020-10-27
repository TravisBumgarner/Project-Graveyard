import * as React from 'react'
import styled from 'styled-components'

import { context } from '../components'

const Login = () => {
    const { dispatch } = React.useContext(context)
    const [value, setValue] = React.useState('')

    return (
        <div>
            <p>What's your name?</p>
            <input value={value} onChange={(event) => setValue(event.target.value)} />
            <button onClick={() => dispatch({ type: 'SET_USER', user: value })}>Login!</button>
        </div >
    )
}

export default Login