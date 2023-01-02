import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { signin } from '../helpers/auth'
import { context } from '../components'

const SignIn = () => {
    const { dispatch } = React.useContext(context)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('')
        try {
            await signin(email, password);
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Email"
                    name="email"
                    type="email"
                    onChange={event => setEmail(event.target.value)}
                    value={email}
                ></input>
                <input
                    placeholder="Password"
                    name="password"
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                    type="password"
                ></input>
                {error.length ? <p>{error}</p> : null}
                <button type="submit">Sign In</button>
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </form>
        </div >
    )
}

export default SignIn