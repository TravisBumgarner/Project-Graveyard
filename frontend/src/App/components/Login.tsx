import * as React from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'

import { context } from '.'
import { auth } from '../../firebase'

type LoginProps = {
}

const Login = ({ }: LoginProps) => {
    const { dispatch } = React.useContext(context)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')

    const handleSubmit = async () => {
        setIsLoading(true)

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        } catch (error) {
            dispatch({
                type: "ADD_MESSAGE", data: {
                    message: `Failed to login: ${error.message}`
                }
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <h1>Log In</h1>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>

            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>

            <button disabled={isLoading} onClick={handleSubmit}>Log In</button>
            <div>
                <Link to="/forgottenpassword">Forgot your password?</Link>
            </div>
            <div>
                Need an account? <Link to="/signup">Sign Up!</Link>
            </div>
        </div>
    )
}

export default Login