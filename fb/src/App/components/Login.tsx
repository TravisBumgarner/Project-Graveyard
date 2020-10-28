import * as React from 'react'
import styled from 'styled-components'

import { context } from '../components'

const Login = () => {
    const { dispatch } = React.useContext(context)
    const [value, setValue] = React.useState('')

    return (
        <div>
            <p>Login:</p>
            <input value={value} onChange={(event) => setValue(event.target.value)} />
            <button onClick={() => dispatch({ type: 'LOGIN_USER', user: value, isAuthed: true })}>Login!</button>
        </div >
    )
}

export default Login