import React from 'react'
import { createUserWithEmailAndPassword, getIdToken } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'

import { context } from '.'
import { auth } from '../../firebase'
import { PandaAppUser } from '../types'
import axios from 'axios'

type SignupProps = {}

const Singup = ({ }: SignupProps) => {
    const { dispatch } = React.useContext(context)
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [email, setEmail] = React.useState<string>('')
    const [username, setUsername] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [passwordConfirmation, setPasswordConfirmation] = React.useState<string>('')
    const handleSubmit = async () => {
        setIsLoading(true)
        if (password !== passwordConfirmation) {
            dispatch({ type: "ADD_MESSAGE", data: { message: `Passwords don't match` } })
            setIsLoading(false)
            return
        }

        try {
            const { user: firebase } = await createUserWithEmailAndPassword(auth, email, password)
            const token = await getIdToken(firebase)
            const { data: panda }: { data: PandaAppUser } = await axios.post(__API_ENDPOINT__ + '/whoami', {
                username
            }, {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ""
                }
            })

            dispatch({
                type: "USER_SIGNED_UP", data: {
                    currentUser: {
                        panda,
                        firebase
                    }
                }
            })
        } catch (error) {
            dispatch({
                type: "ADD_MESSAGE", data: {
                    message: `Failed to create account: ${error.message}`
                }
            })
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div>
            <h1>Sign Up</h1>
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" value={username} onChange={(event) => setUsername(event.target.value)} />
            </div>


            <div>
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>

            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>

            <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" name="confirmPassword" value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)} />
            </div>

            <button disabled={isLoading} onClick={handleSubmit}>Sign Up</button>
            <div>
                Already signed up? <Link to="/login">Log In!</Link>
            </div>
        </div>
    )
}

export default Singup