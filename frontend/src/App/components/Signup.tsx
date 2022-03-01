import React from 'react'
import { createUserWithEmailAndPassword, getIdToken } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'

import { context } from '.'
import { auth } from '../../firebase'
import { PandaAppUser } from '../types'
import axios from 'axios'
import { Button, LabelAndInput } from './StyleExploration'

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
                <LabelAndInput label="Username" name="username" value={username} handleChange={username => setUsername(username)} />
            </div>


            <div>
                <LabelAndInput label="Email" name="email" value={email} handleChange={email => setEmail(email)} />
            </div>

            <div>
                <LabelAndInput label="Password" type="password" name="password" value={password} handleChange={password => setPassword(password)} />
            </div>

            <div>
                <LabelAndInput type="password" label="Confirm Password" name="confirmPassword" value={passwordConfirmation} handleChange={passwordConfirmation => setPasswordConfirmation(passwordConfirmation)} />
            </div>

            <Button variation='primary' disabled={isLoading} onClick={handleSubmit}>Sign Up</Button>
            <div>
                Already signed up? <Link to="/login">Log In!</Link>
            </div>
        </div>
    )
}

export default Singup