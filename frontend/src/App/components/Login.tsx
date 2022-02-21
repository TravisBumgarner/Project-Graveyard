import React from 'react'
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'

import { context } from '.'
import { auth } from '../../firebase'
import { PandaAppUser } from '../types'
import axios from 'axios'

type LoginProps = {
}

const Login = ({ }: LoginProps) => {
    const { dispatch } = React.useContext(context)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [email, setEmail] = React.useState<string>('bbb@bbb.com')
    const [password, setPassword] = React.useState<string>('bbbbbb')

    const handleSubmit = async () => {
        setIsLoading(true)

        try {
            const { user: firebase } = await signInWithEmailAndPassword(auth, email, password)
            const token = await getIdToken(firebase)
            const { data: panda }: { data: PandaAppUser } = await axios.get(__API_ENDPOINT__ + '/whoami', {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ""
                }
            })
            dispatch({
                type: "USER_LOGGED_IN", data: {
                    currentUser: {
                        panda,
                        firebase
                    }
                }
            })
            return navigate('/')
        } catch (error) {
            dispatch({
                type: "ADD_MESSAGE", data: {
                    message: `Failed to login: ${error.message}`
                }
            })
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