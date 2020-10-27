import * as React from 'react'
import styled from 'styled-components'


const Login = ({ setUser }) => {
    const [value, setValue] = React.useState('')

    return (
        <div>
            <p>What's your name?</p>
            <input value={value} onChange={(event) => setValue(event.target.value)} />
            <button onClick={() => setUser(value)}>Login!</button>
        </div >
    )
}

export default Login