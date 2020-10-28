import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { context } from '../components'

const SignUp = () => {
    const { dispatch } = React.useContext(context)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState(false)

    const handleSubmit = () => {

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Email"
                    name="email"
                    type="email"
                    onChange={event => console.log(event.target.value)}
                    value={email}
                ></input>
                <input
                    placeholder="Password"
                    name="password"
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                    type="password"
                ></input>
                {error ? <p>Error!</p> : null}
                <button type="submit">Sign up</button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div >
    )
}

export default SignUp